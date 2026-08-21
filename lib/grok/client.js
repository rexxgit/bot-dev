// ============================================================
// GROK API CLIENT - Conscientiousness Edition v2.2
// ============================================================
// Purpose: Robust API client for Grok with personality support,
// comprehensive error handling, and structured response processing.
//
// Author: Omni Brand Intelligence Team
// Last Updated: 2026-01-21
// Version: 2.2.0
// Dependencies: None (uses native fetch)
// ============================================================

// ============================================================
// SECTION 1: CONFIGURATION CONSTANTS
// ============================================================
// Centralized configuration for maintainability
// ============================================================

var CONFIG = {
  // API Configuration
  API: {
    BASE_URL: 'https://api.groq.com/openai/v1/chat/completions',
    DEFAULT_MODEL: 'llama-3.3-70b-versatile',
    DEFAULT_TEMPERATURE: 0.3,
    DEFAULT_MAX_TOKENS: 1500,
    DEFAULT_TOP_P: 0.95,
    TIMEOUT_MS: 30000,
    MAX_RETRIES: 3,
    RETRY_DELAY_MS: 1000
  },

  // Response Processing
  PROCESSING: {
    MAX_RESPONSE_LENGTH: 10000,
    TRIM_THRESHOLD: 9500,
    EXTRACT_SOURCES: true,
    EXTRACT_METADATA: true,
    EXTRACT_THEMES: true,
    EXTRACT_ENTITIES: true,
    EXTRACT_SECTIONS: true
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
  },

  // Framework Configuration
  FRAMEWORK: {
    SECTIONS: ['reasoning', 'explanation', 'interpretation', 'conclusion', 'suggestions'],
    HYPERLINK_PATTERN: /\[([^\]]+)\]\(([^)]+)\)/g,
    SECTION_PATTERNS: {
      reasoning: /reasoning|logic pathway|retrieval context/i,
      explanation: /explanation|overview|current leading/i,
      interpretation: /interpretation|implies|meaning|analysis/i,
      conclusion: /conclusion|summary statement|definitive summary/i,
      suggestions: /suggestions|actionable steps|recommendations/i
    }
  }
};

// ============================================================
// SECTION 2: GROK CLIENT CLASS
// ============================================================
// Main client class with comprehensive functionality
// ============================================================

export var GrokClient = function(apiKey, options) {
  options = options || {};

  // Validate required parameters
  if (!apiKey) {
    throw new Error('[GrokClient] API key is required. Please provide a valid Grok API key.');
  }

  // API Configuration
  this.apiKey = apiKey;
  this.baseUrl = options.baseUrl || CONFIG.API.BASE_URL;
  this.model = options.model || CONFIG.API.DEFAULT_MODEL;
  this.timeoutMs = options.timeoutMs || CONFIG.API.TIMEOUT_MS;
  this.maxRetries = options.maxRetries || CONFIG.API.MAX_RETRIES;
  this.retryDelayMs = options.retryDelayMs || CONFIG.API.RETRY_DELAY_MS;

  // Response Processing
  this.maxResponseLength = options.maxResponseLength || CONFIG.PROCESSING.MAX_RESPONSE_LENGTH;
  this.extractSources = options.extractSources !== undefined ? options.extractSources : CONFIG.PROCESSING.EXTRACT_SOURCES;
  this.extractMetadata = options.extractMetadata !== undefined ? options.extractMetadata : CONFIG.PROCESSING.EXTRACT_METADATA;
  this.extractThemes = options.extractThemes !== undefined ? options.extractThemes : CONFIG.PROCESSING.EXTRACT_THEMES;
  this.extractEntities = options.extractEntities !== undefined ? options.extractEntities : CONFIG.PROCESSING.EXTRACT_ENTITIES;
  this.extractSections = options.extractSections !== undefined ? options.extractSections : CONFIG.PROCESSING.EXTRACT_SECTIONS;

  // State Management
  this.requestCount = 0;
  this.successCount = 0;
  this.errorCount = 0;
  this.frameworkRequestCount = 0;
  this.lastRequestTime = null;
  this._startTime = new Date();

  // Logging Configuration
  this.logLevel = options.logLevel || CONFIG.LOGGING.CURRENT_LEVEL;

  // Enhanced features tracking
  this.enhancedFeatures = {
    contextualAnalysis: options.enableContextualAnalysis !== undefined ? options.enableContextualAnalysis : true,
    synthesis: options.enableSynthesis !== undefined ? options.enableSynthesis : true,
    themeExtraction: options.enableThemeExtraction !== undefined ? options.enableThemeExtraction : true,
    entityExtraction: options.enableEntityExtraction !== undefined ? options.enableEntityExtraction : true,
    frameworkMode: options.enableFrameworkMode !== undefined ? options.enableFrameworkMode : true,
    structuredOutput: options.enableStructuredOutput !== undefined ? options.enableStructuredOutput : true
  };

  // Log initialization
  this._log('info', '[GrokClient] Initialized with model: ' + this.model);
  this._log('info', '[GrokClient] Enhanced features: ' + JSON.stringify(this.enhancedFeatures));
};

// ============================================================
// SECTION 3: CORE API METHODS
// ============================================================

/**
 * Generate a response using the Grok API with personality support
 * @param {object} promptData - Complete prompt configuration
 * @param {object} options - Request options (temperature, maxTokens, etc.)
 * @returns {Promise<object>} Structured response with success status
 */
GrokClient.prototype.generateResponse = function(promptData, options) {
  options = options || {};
  var startTime = Date.now();
  this.requestCount++;

  // Validate input
  if (!promptData || typeof promptData !== 'object') {
    return Promise.resolve(this._createErrorResponse('Invalid prompt data: must be an object'));
  }

  if (!promptData.system || !promptData.user) {
    return Promise.resolve(this._createErrorResponse('Invalid prompt data: missing system or user message'));
  }

  var self = this;

  try {
    // Build complete request with enhanced options
    var request = this._buildRequest(promptData, options);
    this._log('debug', '[GrokClient] Sending request #' + this.requestCount + ':', request);

    // Execute request with retry logic
    return this._executeWithRetry(request)
      .then(function(response) {
        // Process successful response
        var processedResponse = self._processResponse(response, startTime);
        
        // Add enhanced metadata if enabled
        if (options.requireSynthesis || options.requireContextualAnalysis) {
          processedResponse.metadata = processedResponse.metadata || {};
          processedResponse.metadata.synthesized = options.requireSynthesis || false;
          processedResponse.metadata.contextual_analysis = options.requireContextualAnalysis || false;
          processedResponse.metadata.personality = options.personality || 'balanced';
        }

        // Add framework metadata if enabled
        if (options.frameworkMode || options.structuredOutput) {
          self.frameworkRequestCount++;
          processedResponse.metadata = processedResponse.metadata || {};
          processedResponse.metadata.framework_mode = true;
          processedResponse.metadata.structured = true;
          processedResponse.metadata.format = 'professional_framework';
          
          // Extract sections if enabled
          if (self.extractSections) {
            processedResponse.sections = self._extractFrameworkSections(processedResponse.response);
          }
        }

        // Extract themes if enabled
        if (self.extractThemes && processedResponse.response) {
          processedResponse.themes = self._extractThemes(processedResponse.response);
        }

        // Extract entities if enabled
        if (self.extractEntities && processedResponse.response) {
          processedResponse.entities = self._extractEntities(processedResponse.response);
        }

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

    return Promise.resolve(this._createErrorResponse(error.message, {
      requestCount: this.requestCount,
      errorCode: error.code || 'UNKNOWN_ERROR'
    }));
  }
};

// ============================================================
// SECTION 4: REQUEST BUILDING
// ============================================================

/**
 * Build a complete API request object
 * @param {object} promptData - Prompt configuration
 * @param {object} options - Request options
 * @returns {object} Complete request configuration
 */
GrokClient.prototype._buildRequest = function(promptData, options) {
  // Prepare messages array
  var messages = [
    {
      role: 'system',
      content: promptData.system
    },
    {
      role: 'user',
      content: promptData.user
    }
  ];

  // Add optional conversation context if provided
  if (promptData.messages && Array.isArray(promptData.messages)) {
    var contextMessages = promptData.messages.filter(function(m) {
      return m.role !== 'system' && m.role !== 'user';
    });
    messages.splice.apply(messages, [1, 0].concat(contextMessages));
  }

  // Build complete request
  var request = {
    model: options.model || this.model,
    messages: messages,
    temperature: options.temperature !== undefined ? options.temperature : CONFIG.API.DEFAULT_TEMPERATURE,
    max_tokens: options.maxTokens || CONFIG.API.DEFAULT_MAX_TOKENS,
    top_p: options.topP !== undefined ? options.topP : CONFIG.API.DEFAULT_TOP_P,
    response_format: options.responseFormat || { type: 'text' },
    stream: options.stream || false
  };

  // Add metadata if enhanced features are enabled
  if (options.requireSynthesis || options.requireContextualAnalysis || options.frameworkMode || options.structuredOutput) {
    request.metadata = request.metadata || {};
    request.metadata.requireSynthesis = options.requireSynthesis || false;
    request.metadata.requireContextualAnalysis = options.requireContextualAnalysis || false;
    request.metadata.personality = options.personality || 'balanced';
    request.metadata.frameworkMode = options.frameworkMode || false;
    request.metadata.structuredOutput = options.structuredOutput || false;
    request.metadata.timestamp = new Date().toISOString();
    
    // If framework mode, add section requirements
    if (options.frameworkMode) {
      request.metadata.sections = CONFIG.FRAMEWORK.SECTIONS;
      request.metadata.format = 'professional_framework';
    }
  }

  return request;
};

// ============================================================
// SECTION 5: RETRY LOGIC
// ============================================================

/**
 * Execute API request with retry logic
 * @param {object} request - Complete request configuration
 * @param {number} attempt - Current attempt number
 * @returns {Promise<object>} API response
 */
GrokClient.prototype._executeWithRetry = function(request, attempt) {
  attempt = attempt || 1;
  var self = this;

  return this._sendRequest(request)
    .catch(function(error) {
      var shouldRetry = self._shouldRetry(error, attempt);
      
      if (shouldRetry) {
        var delay = self.retryDelayMs * Math.pow(2, attempt - 1);
        self._log('warn', '[GrokClient] Request failed, retrying in ' + delay + 'ms (attempt ' + attempt + '/' + self.maxRetries + ')');
        
        return self._sleep(delay).then(function() {
          return self._executeWithRetry(request, attempt + 1);
        });
      }

      throw error;
    });
};

/**
 * Send the actual API request
 * @param {object} request - Complete request configuration
 * @returns {Promise<object>} API response
 */
GrokClient.prototype._sendRequest = function(request) {
  var self = this;
  var controller = new AbortController();
  var timeoutId = setTimeout(function() {
    controller.abort();
  }, this.timeoutMs);

  return fetch(this.baseUrl, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + this.apiKey,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(request),
    signal: controller.signal
  })
  .then(function(response) {
    clearTimeout(timeoutId);

    if (!response.ok) {
      return self._parseErrorResponse(response).then(function(errorData) {
        var error = new Error('Grok API error: ' + response.status + ' - ' + (errorData.message || 'Unknown error'));
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
      var networkError = new Error('Network error: Failed to connect to Grok API');
      networkError.code = 'NETWORK_ERROR';
      throw networkError;
    }

    throw error;
  });
};

/**
 * Parse error response from API
 * @param {Response} response - Fetch Response object
 * @returns {Promise<object>} Parsed error data
 */
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

/**
 * Determine if a request should be retried
 * @param {Error} error - The error that occurred
 * @param {number} attempt - Current attempt number
 * @returns {boolean} True if should retry
 */
GrokClient.prototype._shouldRetry = function(error, attempt) {
  if (attempt >= this.maxRetries) return false;

  var retryableCodes = [
    'TIMEOUT_ERROR',
    'NETWORK_ERROR',
    'HTTP_429',
    'HTTP_500',
    'HTTP_502',
    'HTTP_503',
    'HTTP_504'
  ];

  if (error.code && retryableCodes.indexOf(error.code) !== -1) {
    return true;
  }

  var retryableMessages = [
    'timeout',
    'rate limit',
    'server error',
    'unavailable',
    'network'
  ];

  var message = (error.message || '').toLowerCase();
  return retryableMessages.some(function(msg) {
    return message.indexOf(msg) !== -1;
  });
};

// ============================================================
// SECTION 6: RESPONSE PROCESSING
// ============================================================

/**
 * Process a successful API response
 * @param {object} response - Raw API response data
 * @param {number} startTime - Request start timestamp
 * @returns {object} Processed response
 */
GrokClient.prototype._processResponse = function(response, startTime) {
  var elapsedMs = Date.now() - startTime;

  var content = response.choices && response.choices[0] && response.choices[0].message ? 
    response.choices[0].message.content || '' : '';
  
  var truncatedContent = this._truncateResponse(content);

  var processed = {
    success: true,
    response: truncatedContent,
    model: response.model || this.model,
    usage: response.usage || null,
    metadata: {
      requestId: response.id || null,
      created: response.created || null,
      elapsedMs: elapsedMs,
      responseLength: truncatedContent.length,
      finishReason: response.choices && response.choices[0] ? response.choices[0].finish_reason || null : null
    }
  };

  // Extract sources if enabled
  if (this.extractSources) {
    processed.sources = this._extractSources(truncatedContent);
  }

  // Extract metadata if enabled
  if (this.extractMetadata) {
    processed.metadata.sourceCount = processed.sources ? processed.sources.length : 0;
  }

  // Extract sections if enabled and framework mode is detected
  if (this.extractSections && this._isFrameworkResponse(truncatedContent)) {
    processed.sections = this._extractFrameworkSections(truncatedContent);
    processed.metadata.framework_mode = true;
    processed.metadata.structured = true;
  }

  this._log('debug', '[GrokClient] Response processed in ' + elapsedMs + 'ms');

  return processed;
};

/**
 * Truncate response if it exceeds maximum length
 * @param {string} content - Raw response content
 * @returns {string} Truncated content
 */
GrokClient.prototype._truncateResponse = function(content) {
  if (!content || content.length <= this.maxResponseLength) {
    return content;
  }

  var trimmed = content.substring(0, CONFIG.PROCESSING.TRIM_THRESHOLD);
  var lastSentenceEnd = Math.max(
    trimmed.lastIndexOf('. '),
    trimmed.lastIndexOf('! '),
    trimmed.lastIndexOf('? ')
  );

  if (lastSentenceEnd > 0) {
    return trimmed.substring(0, lastSentenceEnd + 2) + '\n\n[Response truncated due to length...]';
  }

  return trimmed + '\n\n[Response truncated due to length...]';
};

// ============================================================
// SECTION 7: SOURCE EXTRACTION
// ============================================================

/**
 * Extract source references from response
 * @param {string} content - Response content
 * @returns {Array} Array of source objects
 */
GrokClient.prototype._extractSources = function(content) {
  var sources = [];
  
  // Pattern 1: (Source: Name, Date)
  var sourcePattern1 = /\(Source:\s*([^,]+),\s*([^)]+)\)/g;
  var match;
  while ((match = sourcePattern1.exec(content)) !== null) {
    sources.push({
      name: match[1].trim(),
      date: match[2].trim(),
      type: 'citation'
    });
  }

  // Pattern 2: [Name] - Relevance: X/10
  var sourcePattern2 = /\[([^\]]+)\]\s*-\s*Relevance:\s*([\d.]+)\/10/g;
  while ((match = sourcePattern2.exec(content)) !== null) {
    sources.push({
      name: match[1].trim(),
      relevance: parseFloat(match[2]),
      type: 'reference'
    });
  }

  // Pattern 3: Markdown links [Name](URL)
  var urlPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  while ((match = urlPattern.exec(content)) !== null) {
    var linkText = match[1].toLowerCase();
    if (linkText.indexOf('source') !== -1 || linkText.indexOf('reference') !== -1 || linkText.indexOf('citation') !== -1) {
      sources.push({
        name: match[1].trim(),
        url: match[2].trim(),
        type: 'url'
      });
    }
  }

  // Remove duplicates
  var uniqueSources = sources.filter(function(source, index, self) {
    return index === self.findIndex(function(s) {
      return s.name === source.name;
    });
  });

  return uniqueSources.slice(0, 10);
};

// ============================================================
// SECTION 8: FRAMEWORK SECTION EXTRACTION
// ============================================================

/**
 * Check if response is a framework response
 * @param {string} content - Response content
 * @returns {boolean} True if framework response
 */
GrokClient.prototype._isFrameworkResponse = function(content) {
  if (!content) return false;
  
  var lowerContent = content.toLowerCase();
  var frameworkIndicators = [
    'reasoning block',
    'logic pathway',
    'retrieval context',
    'explanation',
    'interpretation',
    'conclusion',
    'suggestions',
    'actionable steps'
  ];
  
  var indicatorCount = 0;
  for (var i = 0; i < frameworkIndicators.length; i++) {
    if (lowerContent.indexOf(frameworkIndicators[i]) !== -1) {
      indicatorCount++;
    }
  }
  
  return indicatorCount >= 3;
};

/**
 * Extract framework sections from response
 * @param {string} content - Response content
 * @returns {object} Object with extracted sections
 */
GrokClient.prototype._extractFrameworkSections = function(content) {
  var sections = {
    reasoning: '',
    explanation: '',
    interpretation: '',
    conclusion: '',
    suggestions: ''
  };
  
  if (!content) return sections;
  
  var lines = content.split('\n');
  var currentSection = null;
  var currentContent = [];
  
  var sectionPatterns = {
    reasoning: ['reasoning block', 'grok api reasoning', 'logic pathway', 'retrieval context'],
    explanation: ['explanation', 'overview', 'current leading', 'technology landscape'],
    interpretation: ['interpretation', 'implies', 'meaning for', 'analysis of'],
    conclusion: ['conclusion', 'summary statement', 'definitive summary', 'bottom line'],
    suggestions: ['suggestions', 'actionable steps', 'recommendations', 'next steps']
  };
  
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i].trim();
    if (!line) continue;
    
    var lowerLine = line.toLowerCase();
    var sectionDetected = false;
    
    // Check if line contains a section header
    for (var section in sectionPatterns) {
      if (sectionPatterns.hasOwnProperty(section)) {
        var keywords = sectionPatterns[section];
        for (var j = 0; j < keywords.length; j++) {
          if (lowerLine.indexOf(keywords[j]) !== -1) {
            // Save previous section
            if (currentSection && currentContent.length > 0) {
              sections[currentSection] = currentContent.join('\n').trim();
            }
            currentSection = section;
            currentContent = [];
            sectionDetected = true;
            break;
          }
        }
        if (sectionDetected) break;
      }
    }
    
    // Add content to current section
    if (!sectionDetected && currentSection) {
      // Clean the line
      var cleanLine = line;
      // Remove markdown headers
      cleanLine = cleanLine.replace(/^#{1,3}\s*/, '');
      // Remove bullet markers
      cleanLine = cleanLine.replace(/^[•\-*]\s*/, '');
      // Remove numbered markers
      cleanLine = cleanLine.replace(/^[0-9]+\.\s*/, '');
      
      if (cleanLine.length > 0) {
        currentContent.push(cleanLine);
      }
    }
  }
  
  // Save the last section
  if (currentSection && currentContent.length > 0) {
    sections[currentSection] = currentContent.join('\n').trim();
  }
  
  // Clean up sections
  for (var sec in sections) {
    if (sections.hasOwnProperty(sec)) {
      sections[sec] = sections[sec].replace(/\s{2,}/g, ' ');
    }
  }
  
  return sections;
};

// ============================================================
// SECTION 9: ENHANCED FEATURE EXTRACTION
// ============================================================

/**
 * Extract themes from response content
 * @param {string} content - Response content
 * @returns {Array} Array of identified themes
 */
GrokClient.prototype._extractThemes = function(content) {
  var themes = [];
  var themeKeywords = {
    'Investment': ['investment', 'invested', 'funding', 'capital', 'billion', 'million', 'financial'],
    'Competition': ['competing', 'competition', 'competitive', 'vs', 'versus', 'against', 'rivalry'],
    'Innovation': ['innovate', 'innovation', 'new', 'breakthrough', 'emerging', 'cutting-edge', 'revolution'],
    'Safety': ['safety', 'security', 'risk', 'protect', 'vulnerability', 'breach', 'threat'],
    'Enterprise': ['enterprise', 'business', 'commercial', 'corporate', 'industry', 'market'],
    'Consumer': ['consumer', 'user', 'customer', 'personal', 'individual'],
    'Technology': ['model', 'platform', 'tool', 'application', 'system', 'architecture'],
    'Regulation': ['regulation', 'policy', 'governance', 'compliance', 'oversight'],
    'Ethics': ['ethical', 'ethics', 'responsible', 'transparent', 'fairness'],
    'Development': ['development', 'deployment', 'implementation', 'rollout', 'launch']
  };
  
  var lowerContent = (content || '').toLowerCase();
  for (var theme in themeKeywords) {
    if (themeKeywords.hasOwnProperty(theme)) {
      var keywords = themeKeywords[theme];
      for (var i = 0; i < keywords.length; i++) {
        if (lowerContent.indexOf(keywords[i]) !== -1) {
          if (themes.indexOf(theme) === -1) {
            themes.push(theme);
          }
          break;
        }
      }
    }
  }
  
  return themes;
};

/**
 * Extract entities from response content
 * @param {string} content - Response content
 * @returns {Array} Array of identified entities
 */
GrokClient.prototype._extractEntities = function(content) {
  var entities = [];
  var patterns = [
    /(Microsoft|OpenAI|Anthropic|Meta|Google|Amazon|Apple|Tesla|NVIDIA|AMD|Intel|IBM|Oracle|Salesforce|Adobe|Cisco|Dell|HP|Samsung|Sony|XAI|Grok|Claude|ChatGPT|Gemini|Gemma|Mistral|LLaMA|Pickaxe|Synthesia|Raulji|Gumloop|Red River)/g,
    /(GPT-5\.6|GPT-4|Claude Sonnet|Claude Opus|Grok 4\.5|Grok 3|LLaMA|Gemini|Gemma|Mistral|Mixtral)/g,
    /(Satya Nadella|Sam Altman|Mark Zuckerberg|Dario Amodei|Elon Musk|Bill Gates|Tim Cook|Jeff Bezos|Sundar Pichai|Carl Franzen|Taryn Plumb|Michael Nuñez)/g
  ];
  
  for (var i = 0; i < patterns.length; i++) {
    var matches = (content || '').match(patterns[i]) || [];
    for (var j = 0; j < matches.length; j++) {
      if (entities.indexOf(matches[j]) === -1) {
        entities.push(matches[j]);
      }
    }
  }
  
  return entities;
};

// ============================================================
// SECTION 10: ERROR HANDLING
// ============================================================

/**
 * Create a standardized error response
 * @param {string} message - Error message
 * @param {object} details - Additional error details
 * @returns {object} Standardized error response
 */
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
// SECTION 11: UTILITY METHODS
// ============================================================

/**
 * Sleep/delay for specified milliseconds
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise} Promise that resolves after delay
 */
GrokClient.prototype._sleep = function(ms) {
  return new Promise(function(resolve) {
    setTimeout(resolve, ms);
  });
};

/**
 * Log messages based on current log level
 * @param {string} level - Log level (error, warn, info, debug)
 * @param {...any} args - Arguments to log
 */
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

/**
 * Get client statistics
 * @returns {object} Usage statistics
 */
GrokClient.prototype.getStats = function() {
  var successRate = this.requestCount > 0 ? 
    ((this.successCount / this.requestCount) * 100).toFixed(2) + '%' : 
    '0%';
  
  return {
    requestCount: this.requestCount,
    successCount: this.successCount,
    errorCount: this.errorCount,
    frameworkRequestCount: this.frameworkRequestCount,
    successRate: successRate,
    lastRequestTime: this.lastRequestTime,
    model: this.model,
    uptime: this._getUptime()
  };
};

/**
 * Calculate client uptime
 * @returns {string} Human-readable uptime
 */
GrokClient.prototype._getUptime = function() {
  var elapsedMs = new Date() - this._startTime;
  var seconds = Math.floor(elapsedMs / 1000);
  var minutes = Math.floor(seconds / 60);
  var hours = Math.floor(minutes / 60);
  var days = Math.floor(hours / 24);

  if (days > 0) return days + 'd ' + (hours % 24) + 'h';
  if (hours > 0) return hours + 'h ' + (minutes % 60) + 'm';
  if (minutes > 0) return minutes + 'm ' + (seconds % 60) + 's';
  return seconds + 's';
};

/**
 * Reset the client (clear statistics)
 */
GrokClient.prototype.reset = function() {
  this.requestCount = 0;
  this.successCount = 0;
  this.errorCount = 0;
  this.frameworkRequestCount = 0;
  this.lastRequestTime = null;
  this._startTime = new Date();
  this._log('info', '[GrokClient] Statistics reset');
};

/**
 * Update client configuration
 * @param {object} config - Configuration updates
 */
GrokClient.prototype.updateConfig = function(config) {
  if (config.apiKey) {
    this.apiKey = config.apiKey;
  }
  if (config.model) {
    this.model = config.model;
    this._log('info', '[GrokClient] Model updated to: ' + this.model);
  }
  if (config.timeoutMs) {
    this.timeoutMs = config.timeoutMs;
  }
  if (config.maxRetries) {
    this.maxRetries = config.maxRetries;
  }
  if (config.logLevel !== undefined) {
    this.logLevel = config.logLevel;
  }
  if (config.enableContextualAnalysis !== undefined) {
    this.enhancedFeatures.contextualAnalysis = config.enableContextualAnalysis;
  }
  if (config.enableSynthesis !== undefined) {
    this.enhancedFeatures.synthesis = config.enableSynthesis;
  }
  if (config.enableFrameworkMode !== undefined) {
    this.enhancedFeatures.frameworkMode = config.enableFrameworkMode;
  }
  if (config.enableStructuredOutput !== undefined) {
    this.enhancedFeatures.structuredOutput = config.enableStructuredOutput;
  }
  this._log('info', '[GrokClient] Configuration updated');
};

/**
 * Get enhanced features status
 * @returns {object} Enhanced features configuration
 */
GrokClient.prototype.getEnhancedFeatures = function() {
  return this.enhancedFeatures;
};

// ============================================================
// SECTION 12: EXPORTS
// ============================================================

export default GrokClient;
