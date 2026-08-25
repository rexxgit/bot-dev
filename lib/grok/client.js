// lib/grok/client.js - Updated to support OVHcloud AI Endpoints
// ============================================================
// Purpose: API client for Grok with OVHcloud AI Endpoints support
// ============================================================

// ============================================================
// SECTION 1: CONFIGURATION CONSTANTS
// ============================================================

var CONFIG = {
  // API Configuration
  API: {
    // OVHcloud AI Endpoints (free tier)
    OVH_BASE_URL: 'https://oai.endpoints.kepler.ai.cloud.ovh.net/v1',
    OVH_MODEL: 'gpt-oss-120b',
    
    // Groq API (fallback - requires API key)
    GROQ_BASE_URL: 'https://api.groq.com/openai/v1/chat/completions',
    GROQ_MODEL: 'llama-3.3-70b-versatile',
    
    DEFAULT_TEMPERATURE: 0.25,
    DEFAULT_MAX_TOKENS: 2500,
    DEFAULT_TOP_P: 0.95,
    TIMEOUT_MS: 30000,
    MAX_RETRIES: 2,
    RETRY_DELAY_MS: 1000
  },

  // Logging Levels
  LOGGING: {
    LEVELS: {
      ERROR: 0,
      WARN: 1,
      INFO: 2,
      DEBUG: 3
    },
    CURRENT_LEVEL: 2
  }
};

// ============================================================
// SECTION 2: GROK CLIENT CLASS
// ============================================================

export var GrokClient = function(apiKey, options) {
  options = options || {};

  // API Configuration - support both Groq and OVHcloud
  this.useOvh = options.useOvh !== undefined ? options.useOvh : true; // Default to OVHcloud (free)
  
  // OVHcloud configuration (free tier - no API key required)
  this.ovhBaseUrl = options.ovhBaseUrl || CONFIG.API.OVH_BASE_URL;
  this.ovhModel = options.ovhModel || CONFIG.API.OVH_MODEL;
  
  // Groq configuration (requires API key)
  this.apiKey = apiKey;
  this.groqBaseUrl = options.groqBaseUrl || CONFIG.API.GROQ_BASE_URL;
  this.groqModel = options.groqModel || CONFIG.API.GROQ_MODEL;
  
  // Shared configuration
  this.timeoutMs = options.timeoutMs || CONFIG.API.TIMEOUT_MS;
  this.maxRetries = options.maxRetries || CONFIG.API.MAX_RETRIES;
  this.retryDelayMs = options.retryDelayMs || CONFIG.API.RETRY_DELAY_MS;
  
  // State Management
  this.requestCount = 0;
  this.successCount = 0;
  this.errorCount = 0;
  this.lastRequestTime = null;
  this._startTime = new Date();

  // Logging Configuration
  this.logLevel = options.logLevel || CONFIG.LOGGING.CURRENT_LEVEL;

  // Log initialization
  var provider = this.useOvh ? 'OVHcloud (free)' : 'Groq';
  this._log('info', '[GrokClient] Initialized with provider: ' + provider);
  this._log('info', '[GrokClient] Model: ' + (this.useOvh ? this.ovhModel : this.groqModel));
};

// ============================================================
// SECTION 3: CORE API METHODS
// ============================================================

GrokClient.prototype.generateResponse = function(promptData, options) {
  options = options || {};
  var startTime = Date.now();
  this.requestCount++;

  if (!promptData || typeof promptData !== 'object') {
    return Promise.resolve(this._createErrorResponse('Invalid prompt data'));
  }

  if (!promptData.system || !promptData.user) {
    return Promise.resolve(this._createErrorResponse('Missing system or user message'));
  }

  var self = this;

  try {
    // Build request
    var request = this._buildRequest(promptData, options);
    this._log('debug', '[GrokClient] Sending request #' + this.requestCount);

    // Determine which provider to use
    var provider = this._selectProvider();
    
    return this._sendRequest(request, provider)
      .then(function(response) {
        var processedResponse = self._processResponse(response, startTime);
        self.successCount++;
        self.lastRequestTime = new Date();
        return processedResponse;
      })
      .catch(function(error) {
        self.errorCount++;
        self._log('error', '[GrokClient] Request #' + self.requestCount + ' failed:', error);
        return self._createErrorResponse(error.message, {
          requestCount: self.requestCount,
          errorCode: error.code || 'UNKNOWN_ERROR'
        });
      });

  } catch (error) {
    this.errorCount++;
    this._log('error', '[GrokClient] Request #' + this.requestCount + ' failed:', error);
    return Promise.resolve(this._createErrorResponse(error.message));
  }
};

// ============================================================
// SECTION 4: PROVIDER SELECTION
// ============================================================

GrokClient.prototype._selectProvider = function() {
  // If OVHcloud is enabled, use it (free tier)
  if (this.useOvh) {
    return 'ovh';
  }
  
  // Otherwise try Groq if API key is available
  if (this.apiKey) {
    return 'groq';
  }
  
  // Fallback to OVHcloud (free) if Groq key is missing
  this._log('warn', '[GrokClient] No API key, falling back to OVHcloud (free)');
  return 'ovh';
};

// ============================================================
// SECTION 5: REQUEST BUILDING
// ============================================================

GrokClient.prototype._buildRequest = function(promptData, options) {
  var messages = [
    { role: 'system', content: promptData.system },
    { role: 'user', content: promptData.user }
  ];

  if (promptData.messages && Array.isArray(promptData.messages)) {
    var contextMessages = promptData.messages.filter(function(m) {
      return m.role !== 'system' && m.role !== 'user';
    });
    messages.splice.apply(messages, [1, 0].concat(contextMessages));
  }

  var request = {
    messages: messages,
    temperature: options.temperature !== undefined ? options.temperature : CONFIG.API.DEFAULT_TEMPERATURE,
    max_tokens: options.maxTokens || CONFIG.API.DEFAULT_MAX_TOKENS,
    top_p: options.topP !== undefined ? options.topP : CONFIG.API.DEFAULT_TOP_P,
    stream: options.stream || false
  };

  // Add metadata if needed
  if (options.requireSynthesis || options.requireContextualAnalysis || options.frameworkMode) {
    request.metadata = {
      requireSynthesis: options.requireSynthesis || false,
      requireContextualAnalysis: options.requireContextualAnalysis || false,
      frameworkMode: options.frameworkMode || false,
      timestamp: new Date().toISOString()
    };
  }

  return request;
};

// ============================================================
// SECTION 6: SEND REQUEST
// ============================================================

GrokClient.prototype._sendRequest = function(request, provider) {
  var self = this;
  var controller = new AbortController();
  var timeoutId = setTimeout(function() {
    controller.abort();
  }, this.timeoutMs);

  var url, headers, body;

  if (provider === 'ovh') {
    // OVHcloud AI Endpoints (free tier - no API key needed)
    url = this.ovhBaseUrl + '/chat/completions';
    headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    // Add model to request body for OVH
    body = JSON.stringify({
      model: this.ovhModel,
      ...request
    });
    this._log('info', '[GrokClient] Using OVHcloud (free) endpoint');
  } else {
    // Groq API (requires API key)
    url = this.groqBaseUrl;
    headers = {
      'Authorization': 'Bearer ' + this.apiKey,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    body = JSON.stringify({
      model: this.groqModel,
      ...request
    });
    this._log('info', '[GrokClient] Using Groq API');
  }

  return fetch(url, {
    method: 'POST',
    headers: headers,
    body: body,
    signal: controller.signal
  })
  .then(function(response) {
    clearTimeout(timeoutId);

    if (!response.ok) {
      return self._parseErrorResponse(response).then(function(errorData) {
        var error = new Error('API error: ' + response.status + ' - ' + (errorData.message || 'Unknown error'));
        error.code = errorData.code || 'HTTP_' + response.status;
        error.status = response.status;
        error.data = errorData;
        throw error;
      });
    }

    return response.json();
  })
  .catch(function(error) {
    clearTimeout(timeoutId);
    
    if (error.name === 'AbortError') {
      var timeoutError = new Error('Request timed out after ' + self.timeoutMs + 'ms');
      timeoutError.code = 'TIMEOUT_ERROR';
      throw timeoutError;
    }

    if (error.message && (error.message.includes('fetch') || error.message.includes('network'))) {
      var networkError = new Error('Network error: Failed to connect to API');
      networkError.code = 'NETWORK_ERROR';
      throw networkError;
    }

    throw error;
  });
};

// ============================================================
// SECTION 7: RESPONSE PROCESSING
// ============================================================

GrokClient.prototype._processResponse = function(response, startTime) {
  var elapsedMs = Date.now() - startTime;

  var content = response.choices && response.choices[0] && response.choices[0].message ? 
    response.choices[0].message.content || '' : '';

  var processed = {
    success: true,
    response: content,
    model: response.model || 'unknown',
    usage: response.usage || null,
    metadata: {
      requestId: response.id || null,
      created: response.created || null,
      elapsedMs: elapsedMs,
      responseLength: content.length,
      finishReason: response.choices && response.choices[0] ? response.choices[0].finish_reason || null : null
    }
  };

  this._log('debug', '[GrokClient] Response processed in ' + elapsedMs + 'ms');

  return processed;
};

// ============================================================
// SECTION 8: ERROR HANDLING
// ============================================================

GrokClient.prototype._parseErrorResponse = function(response) {
  try {
    var contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return response.json();
    } else {
      return response.text().then(function(text) {
        return { message: text.substring(0, 200) };
      });
    }
  } catch (e) {
    return Promise.resolve({ message: 'Unable to parse error response' });
  }
};

GrokClient.prototype._createErrorResponse = function(message, details) {
  details = details || {};
  return {
    success: false,
    error: message,
    errorCode: details.errorCode || 'UNKNOWN_ERROR',
    details: details,
    timestamp: new Date().toISOString()
  };
};

// ============================================================
// SECTION 9: UTILITY METHODS
// ============================================================

GrokClient.prototype._log = function(level, args) {
  var levelMap = {
    error: CONFIG.LOGGING.LEVELS.ERROR,
    warn: CONFIG.LOGGING.LEVELS.WARN,
    info: CONFIG.LOGGING.LEVELS.INFO,
    debug: CONFIG.LOGGING.LEVELS.DEBUG
  };

  var currentLevel = this.logLevel || CONFIG.LOGGING.CURRENT_LEVEL;
  var messageLevel = levelMap[level] || CONFIG.LOGGING.LEVELS.INFO;

  if (messageLevel <= currentLevel) {
    var prefix = '[' + level.toUpperCase() + ']';
    var argsArray = Array.prototype.slice.call(arguments, 1);
    console.log.apply(console, [prefix].concat(argsArray));
  }
};

GrokClient.prototype.getStats = function() {
  var successRate = this.requestCount > 0 ? 
    ((this.successCount / this.requestCount) * 100).toFixed(2) + '%' : 
    '0%';
  
  return {
    requestCount: this.requestCount,
    successCount: this.successCount,
    errorCount: this.errorCount,
    successRate: successRate,
    lastRequestTime: this.lastRequestTime,
    provider: this.useOvh ? 'OVHcloud (free)' : 'Groq',
    model: this.useOvh ? this.ovhModel : this.groqModel
  };
};

// ============================================================
// SECTION 10: EXPORTS
// ============================================================

export default GrokClient;
