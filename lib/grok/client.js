// ============================================================
// GROK API CLIENT - Conscientiousness Edition v2.0
// ============================================================
// Purpose: Robust API client for Grok with personality support,
// comprehensive error handling, and structured response processing.
//
// Author: Omni Brand Intelligence Team
// Last Updated: 2026-01-20
// Version: 2.0.0
// Dependencies: None (uses native fetch)
// ============================================================

// ============================================================
// SECTION 1: CONFIGURATION CONSTANTS
// ============================================================
// Centralized configuration for maintainability
// ============================================================

const CONFIG = {
  // API Configuration
  API: {
    BASE_URL: 'https://api.groq.com/openai/v1/chat/completions',
    DEFAULT_MODEL: 'llama-3.3-70b-versatile',
    DEFAULT_TEMPERATURE: 0.3,
    DEFAULT_MAX_TOKENS: 1500,
    DEFAULT_TOP_P: 0.95,
    TIMEOUT_MS: 30000, // 30 seconds
    MAX_RETRIES: 3,
    RETRY_DELAY_MS: 1000
  },

  // Response Processing
  PROCESSING: {
    MAX_RESPONSE_LENGTH: 8000,
    TRIM_THRESHOLD: 7500,
    EXTRACT_SOURCES: true,
    EXTRACT_METADATA: true
  },

  // Logging Levels
  LOGGING: {
    LEVELS: {
      ERROR: 0,
      WARN: 1,
      INFO: 2,
      DEBUG: 3
    },
    CURRENT_LEVEL: 2 // INFO by default
  }
};

// ============================================================
// SECTION 2: GROK CLIENT CLASS
// ============================================================
// Main client class with comprehensive functionality
// ============================================================

export class GrokClient {
  /**
   * Initialize the Grok API client
   * @param {string} apiKey - Grok API key (required)
   * @param {object} options - Optional configuration overrides
   */
  constructor(apiKey, options = {}) {
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

    // State Management
    this.requestCount = 0;
    this.successCount = 0;
    this.errorCount = 0;
    this.lastRequestTime = null;

    // Logging Configuration
    this.logLevel = options.logLevel || CONFIG.LOGGING.CURRENT_LEVEL;

    // Log initialization
    this._log('info', `[GrokClient] Initialized with model: ${this.model}`);
  }

  // ============================================================
  // SECTION 3: CORE API METHODS
  // ============================================================

  /**
   * Generate a response using the Grok API with personality support
   * @param {object} promptData - Complete prompt configuration
   * @param {object} options - Request options (temperature, maxTokens, etc.)
   * @returns {Promise<object>} Structured response with success status
   */
  async generateResponse(promptData, options = {}) {
    const startTime = Date.now();
    this.requestCount++;

    // Validate input
    if (!promptData || typeof promptData !== 'object') {
      return this._createErrorResponse('Invalid prompt data: must be an object');
    }

    if (!promptData.system || !promptData.user) {
      return this._createErrorResponse('Invalid prompt data: missing system or user message');
    }

    try {
      // Build complete request
      const request = this._buildRequest(promptData, options);
      this._log('debug', `[GrokClient] Sending request #${this.requestCount}:`, request);

      // Execute request with retry logic
      const response = await this._executeWithRetry(request);

      // Process successful response
      const processedResponse = this._processResponse(response, startTime);
      this.successCount++;
      this.lastRequestTime = new Date();

      return processedResponse;

    } catch (error) {
      this.errorCount++;
      this._log('error', `[GrokClient] Request #${this.requestCount} failed:`, error);

      return this._createErrorResponse(error.message, {
        requestCount: this.requestCount,
        errorCode: error.code || 'UNKNOWN_ERROR'
      });
    }
  }

  // ============================================================
  // SECTION 4: REQUEST BUILDING
  // ============================================================

  /**
   * Build a complete API request object
   * @param {object} promptData - Prompt configuration
   * @param {object} options - Request options
   * @returns {object} Complete request configuration
   */
  _buildRequest(promptData, options) {
    // Prepare messages array
    const messages = [
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
      // Insert context messages between system and user
      const contextMessages = promptData.messages.filter(m => 
        m.role !== 'system' && m.role !== 'user'
      );
      messages.splice(1, 0, ...contextMessages);
    }

    // Build complete request
    return {
      model: options.model || this.model,
      messages: messages,
      temperature: options.temperature !== undefined ? options.temperature : CONFIG.API.DEFAULT_TEMPERATURE,
      max_tokens: options.maxTokens || CONFIG.API.DEFAULT_MAX_TOKENS,
      top_p: options.topP !== undefined ? options.topP : CONFIG.API.DEFAULT_TOP_P,
      response_format: options.responseFormat || { type: 'text' },
      stream: options.stream || false
    };
  }

  // ============================================================
  // SECTION 5: RETRY LOGIC
  // ============================================================

  /**
   * Execute API request with retry logic
   * @param {object} request - Complete request configuration
   * @param {number} attempt - Current attempt number
   * @returns {Promise<object>} API response
   */
  async _executeWithRetry(request, attempt = 1) {
    try {
      // Send the request
      const response = await this._sendRequest(request);
      return response;

    } catch (error) {
      // Check if we should retry
      const shouldRetry = this._shouldRetry(error, attempt);
      
      if (shouldRetry) {
        const delay = this.retryDelayMs * Math.pow(2, attempt - 1); // Exponential backoff
        this._log('warn', `[GrokClient] Request failed, retrying in ${delay}ms (attempt ${attempt}/${this.maxRetries})`);
        
        await this._sleep(delay);
        return this._executeWithRetry(request, attempt + 1);
      }

      // Max retries exceeded or non-retryable error
      throw error;
    }
  }

  /**
   * Send the actual API request
   * @param {object} request - Complete request configuration
   * @returns {Promise<object>} API response
   */
  async _sendRequest(request) {
    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, this.timeoutMs);

    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(request),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      // Handle non-200 responses
      if (!response.ok) {
        const errorData = await this._parseErrorResponse(response);
        const error = new Error(`Grok API error: ${response.status} - ${errorData.message || 'Unknown error'}`);
        error.code = errorData.code || `HTTP_${response.status}`;
        error.status = response.status;
        error.data = errorData;
        throw error;
      }

      // Parse successful response
      const data = await response.json();
      return data;

    } catch (error) {
      clearTimeout(timeoutId);
      
      // Handle abort errors (timeout)
      if (error.name === 'AbortError') {
        const timeoutError = new Error(`Request timed out after ${this.timeoutMs}ms`);
        timeoutError.code = 'TIMEOUT_ERROR';
        throw timeoutError;
      }

      // Network errors
      if (error.message.includes('fetch') || error.message.includes('network')) {
        const networkError = new Error('Network error: Failed to connect to Grok API');
        networkError.code = 'NETWORK_ERROR';
        throw networkError;
      }

      throw error;
    }
  }

  /**
   * Parse error response from API
   * @param {Response} response - Fetch Response object
   * @returns {Promise<object>} Parsed error data
   */
  async _parseErrorResponse(response) {
    try {
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      } else {
        const text = await response.text();
        return { message: text.substring(0, 200) };
      }
    } catch (e) {
      return { message: 'Unable to parse error response' };
    }
  }

  /**
   * Determine if a request should be retried
   * @param {Error} error - The error that occurred
   * @param {number} attempt - Current attempt number
   * @returns {boolean} True if should retry
   */
  _shouldRetry(error, attempt) {
    // Don't retry if max attempts exceeded
    if (attempt >= this.maxRetries) return false;

    // Retryable error codes
    const retryableCodes = [
      'TIMEOUT_ERROR',
      'NETWORK_ERROR',
      'HTTP_429', // Rate limit
      'HTTP_500', // Internal server error
      'HTTP_502', // Bad gateway
      'HTTP_503', // Service unavailable
      'HTTP_504'  // Gateway timeout
    ];

    // Check if error code is retryable
    if (error.code && retryableCodes.includes(error.code)) {
      return true;
    }

    // Check if error message indicates retryable condition
    const retryableMessages = [
      'timeout',
      'rate limit',
      'server error',
      'unavailable',
      'network'
    ];

    const message = error.message.toLowerCase();
    return retryableMessages.some(msg => message.includes(msg));
  }

  // ============================================================
  // SECTION 6: RESPONSE PROCESSING
  // ============================================================

  /**
   * Process a successful API response
   * @param {object} response - Raw API response data
   * @param {number} startTime - Request start timestamp
   * @returns {object} Processed response
   */
  _processResponse(response, startTime) {
    const elapsedMs = Date.now() - startTime;

    // Extract core response
    const content = response.choices?.[0]?.message?.content || '';
    
    // Truncate if too long
    const truncatedContent = this._truncateResponse(content);

    // Build structured response
    const processed = {
      success: true,
      response: truncatedContent,
      model: response.model || this.model,
      usage: response.usage || null,
      metadata: {
        requestId: response.id || null,
        created: response.created || null,
        elapsedMs: elapsedMs,
        responseLength: truncatedContent.length,
        finishReason: response.choices?.[0]?.finish_reason || null
      }
    };

    // Extract sources and additional metadata if enabled
    if (this.extractSources) {
      processed.sources = this._extractSources(truncatedContent);
    }

    if (this.extractMetadata) {
      processed.metadata = {
        ...processed.metadata,
        sourceCount: processed.sources?.length || 0
      };
    }

    this._log('debug', `[GrokClient] Response processed in ${elapsedMs}ms`);

    return processed;
  }

  /**
   * Truncate response if it exceeds maximum length
   * @param {string} content - Raw response content
   * @returns {string} Truncated content
   */
  _truncateResponse(content) {
    if (!content || content.length <= this.maxResponseLength) {
      return content;
    }

    const trimmed = content.substring(0, CONFIG.PROCESSING.TRIM_THRESHOLD);
    const lastSentenceEnd = Math.max(
      trimmed.lastIndexOf('. '),
      trimmed.lastIndexOf('! '),
      trimmed.lastIndexOf('? ')
    );

    if (lastSentenceEnd > 0) {
      return trimmed.substring(0, lastSentenceEnd + 2) + '\n\n[Response truncated due to length...]';
    }

    return trimmed + '\n\n[Response truncated due to length...]';
  }

  /**
   * Extract source references from response
   * @param {string} content - Response content
   * @returns {Array} Array of source objects
   */
  _extractSources(content) {
    const sources = [];
    
    // Look for source patterns in the content
    // Pattern 1: (Source: [Name], [Date])
    const sourcePattern1 = /\(Source:\s*([^,]+),\s*([^)]+)\)/g;
    let match;
    while ((match = sourcePattern1.exec(content)) !== null) {
      sources.push({
        name: match[1].trim(),
        date: match[2].trim(),
        type: 'citation'
      });
    }

    // Pattern 2: [Source Name] - [Relevance: X/10]
    const sourcePattern2 = /\[([^\]]+)\]\s*-\s*Relevance:\s*([\d.]+)\/10/g;
    while ((match = sourcePattern2.exec(content)) !== null) {
      sources.push({
        name: match[1].trim(),
        relevance: parseFloat(match[2]),
        type: 'reference'
      });
    }

    // Pattern 3: URLs in markdown format
    const urlPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
    while ((match = urlPattern.exec(content)) !== null) {
      // Check if it's a source link (contains source-related keywords)
      const linkText = match[1].toLowerCase();
      if (linkText.includes('source') || linkText.includes('reference') || linkText.includes('citation')) {
        sources.push({
          name: match[1].trim(),
          url: match[2].trim(),
          type: 'url'
        });
      }
    }

    // Remove duplicates
    const uniqueSources = sources.filter((source, index, self) => 
      index === self.findIndex(s => s.name === source.name)
    );

    return uniqueSources.slice(0, 10); // Limit to 10 sources
  }

  // ============================================================
  // SECTION 7: ERROR HANDLING
  // ============================================================

  /**
   * Create a standardized error response
   * @param {string} message - Error message
   * @param {object} details - Additional error details
   * @returns {object} Standardized error response
   */
  _createErrorResponse(message, details = {}) {
    return {
      success: false,
      error: message,
      errorCode: details.errorCode || 'UNKNOWN_ERROR',
      details: details,
      timestamp: new Date().toISOString()
    };
  }

  // ============================================================
  // SECTION 8: UTILITY METHODS
  // ============================================================

  /**
   * Sleep/delay for specified milliseconds
   * @param {number} ms - Milliseconds to sleep
   * @returns {Promise} Promise that resolves after delay
   */
  _sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Log messages based on current log level
   * @param {string} level - Log level (error, warn, info, debug)
   * @param {...any} args - Arguments to log
   */
  _log(level, ...args) {
    const levelMap = {
      error: CONFIG.LOGGING.LEVELS.ERROR,
      warn: CONFIG.LOGGING.LEVELS.WARN,
      info: CONFIG.LOGGING.LEVELS.INFO,
      debug: CONFIG.LOGGING.LEVELS.DEBUG
    };

    const currentLevel = this.logLevel || CONFIG.LOGGING.CURRENT_LEVEL;
    const messageLevel = levelMap[level] || CONFIG.LOGGING.LEVELS.INFO;

    if (messageLevel <= currentLevel) {
      const prefix = `[${level.toUpperCase()}]`;
      console.log(prefix, ...args);
    }
  }

  /**
   * Get client statistics
   * @returns {object} Usage statistics
   */
  getStats() {
    return {
      requestCount: this.requestCount,
      successCount: this.successCount,
      errorCount: this.errorCount,
      successRate: this.requestCount > 0 ? 
        ((this.successCount / this.requestCount) * 100).toFixed(2) + '%' : 
        '0%',
      lastRequestTime: this.lastRequestTime,
      model: this.model,
      uptime: this._getUptime()
    };
  }

  /**
   * Calculate client uptime
   * @returns {string} Human-readable uptime
   */
  _getUptime() {
    if (!this._startTime) {
      this._startTime = new Date();
    }
    const elapsedMs = new Date() - this._startTime;
    const seconds = Math.floor(elapsedMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ${hours % 24}h`;
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
  }

  /**
   * Reset the client (clear statistics)
   */
  reset() {
    this.requestCount = 0;
    this.successCount = 0;
    this.errorCount = 0;
    this.lastRequestTime = null;
    this._startTime = new Date();
    this._log('info', '[GrokClient] Statistics reset');
  }

  /**
   * Update client configuration
   * @param {object} config - Configuration updates
   */
  updateConfig(config) {
    if (config.apiKey) {
      this.apiKey = config.apiKey;
    }
    if (config.model) {
      this.model = config.model;
      this._log('info', `[GrokClient] Model updated to: ${this.model}`);
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
    this._log('info', '[GrokClient] Configuration updated');
  }
}

// ============================================================
// SECTION 9: EXPORTS
// ============================================================

export default GrokClient;
