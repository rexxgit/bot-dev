// ============================================================
// GROK INTEGRATION LAYER - Conscientiousness Edition v2.1
// ============================================================
// Purpose: Bridge between frontend and Grok API with personality
// support, intent routing, and structured response formatting.
//
// Author: Omni Brand Intelligence Team
// Last Updated: 2026-01-20
// Version: 2.1.0
// Dependencies: GrokClient from './client.js'
// ============================================================

import { GrokClient } from './client.js';
import { 
  grokPrompts, 
  getPromptForIntent, 
  getPersonalityProfile,
  buildGrokRequest,
  buildContextualRequest,
  getContextualPrompt,
  getSynthesisPrompt
} from './prompts.js';

// ============================================================
// SECTION 1: CONFIGURATION CONSTANTS
// ============================================================

const CONFIG = {
  // Default Settings
  DEFAULTS: {
    PERSONALITY: 'conscientiousness',
    INTENT: 'contextual',
    TEMPERATURE: 0.25,
    MAX_TOKENS: 2000,
    TIMEOUT_MS: 30000
  },

  // Intent Mapping
  INTENT_MAP: {
    factual: 'informational',
    informational: 'informational',
    analytical: 'analytical',
    deep: 'analytical',
    compare: 'comparative',
    comparative: 'comparative',
    explore: 'exploratory',
    exploratory: 'exploratory',
    summarize: 'summarization',
    summarization: 'summarization',
    personality: 'personalityEnhanced',
    contextual: 'contextual',
    synthesis: 'synthesis',
    cot: 'cotContextual'
  },

  // Response Formatting
  FORMATTING: {
    MAX_SOURCES: 10,
    INCLUDE_CONFIDENCE: true,
    INCLUDE_USAGE: true,
    INCLUDE_TIMESTAMPS: true,
    INCLUDE_THEMES: true,
    INCLUDE_ENTITIES: true
  },

  // Fallback Messages
  FALLBACK: {
    ERROR: 'Unable to generate a response at this time. Please try again.',
    TIMEOUT: 'The request timed out. Please try a shorter query.',
    NO_CONTEXT: 'Insufficient context provided. Please provide more information.',
    RATE_LIMIT: 'Rate limit exceeded. Please wait a moment and try again.'
  }
};

// ============================================================
// SECTION 2: GROK INTEGRATION CLASS
// ============================================================

export class GrokIntegration {
  /**
   * Initialize the Grok Integration layer
   * @param {string} apiKey - Grok API key (required)
   * @param {object} options - Optional configuration overrides
   */
  constructor(apiKey, options = {}) {
    // Validate API key
    if (!apiKey) {
      throw new Error('[GrokIntegration] API key is required. Please provide a valid Grok API key.');
    }

    // Initialize Grok Client with options
    this.client = new GrokClient(apiKey, {
      timeoutMs: options.timeoutMs || CONFIG.DEFAULTS.TIMEOUT_MS,
      maxRetries: options.maxRetries || 3,
      logLevel: options.logLevel || 2,
      enableContextualAnalysis: options.enableContextualAnalysis !== undefined ? 
        options.enableContextualAnalysis : true,
      enableSynthesis: options.enableSynthesis !== undefined ? 
        options.enableSynthesis : true,
      enableThemeExtraction: options.enableThemeExtraction !== undefined ? 
        options.enableThemeExtraction : true,
      enableEntityExtraction: options.enableEntityExtraction !== undefined ? 
        options.enableEntityExtraction : true
    });

    // Store configuration
    this.defaultPersonality = options.defaultPersonality || CONFIG.DEFAULTS.PERSONALITY;
    this.defaultIntent = options.defaultIntent || CONFIG.DEFAULTS.INTENT;
    this.maxSources = options.maxSources || CONFIG.FORMATTING.MAX_SOURCES;
    this.includeConfidence = options.includeConfidence !== undefined ? 
      options.includeConfidence : CONFIG.FORMATTING.INCLUDE_CONFIDENCE;
    this.includeUsage = options.includeUsage !== undefined ? 
      options.includeUsage : CONFIG.FORMATTING.INCLUDE_USAGE;
    this.includeTimestamps = options.includeTimestamps !== undefined ? 
      options.includeTimestamps : CONFIG.FORMATTING.INCLUDE_TIMESTAMPS;
    this.includeThemes = options.includeThemes !== undefined ? 
      options.includeThemes : CONFIG.FORMATTING.INCLUDE_THEMES;
    this.includeEntities = options.includeEntities !== undefined ? 
      options.includeEntities : CONFIG.FORMATTING.INCLUDE_ENTITIES;

    // State tracking
    this.requestCount = 0;
    this.fallbackCount = 0;
    this.contextualRequestCount = 0;
    this.synthesisRequestCount = 0;

    // Log initialization
    console.log('[GrokIntegration] Initialized with personality: ' + this.defaultPersonality + ', intent: ' + this.defaultIntent);
  }

  // ============================================================
  // SECTION 3: CORE GENERATION METHODS
  // ============================================================

  /**
   * Generate a response with personality and intent support
   * @param {string} query - User's question
   * @param {string} context - Retrieved context from sources
   * @param {object} options - Generation options
   * @returns {Promise<object>} Structured response
   */
  async generateResponse(query, context, options = {}) {
    this.requestCount++;
    const startTime = Date.now();

    try {
      // Validate required parameters
      if (!query || typeof query !== 'string' || query.trim().length === 0) {
        return this._createFallbackResponse(CONFIG.FALLBACK.NO_CONTEXT, {
          error: 'Empty query provided',
          query: query
        });
      }

      if (!context || typeof context !== 'string' || context.trim().length === 0) {
        return this._createFallbackResponse(CONFIG.FALLBACK.NO_CONTEXT, {
          error: 'Empty context provided',
          query: query
        });
      }

      // Determine intent and personality
      const intent = this._resolveIntent(options.intent || this.defaultIntent);
      const personality = options.personality || this.defaultPersonality;

      // Check for enhanced features
      const requireSynthesis = options.requireSynthesis || false;
      const requireContextualAnalysis = options.requireContextualAnalysis || false;
      const useCoT = options.useCoT || false;

      // Validate personality
      const personalityProfile = getPersonalityProfile(personality);
      if (!personalityProfile) {
        console.warn('[GrokIntegration] Invalid personality "' + personality + '", falling back to "' + CONFIG.DEFAULTS.PERSONALITY + '"');
        options.personality = CONFIG.DEFAULTS.PERSONALITY;
      }

      // Build the prompt with enhanced options
      const promptData = this._buildPrompt(query, context, intent, personality, {
        requireSynthesis: requireSynthesis,
        requireContextualAnalysis: requireContextualAnalysis,
        useCoT: useCoT
      });

      // Track enhanced requests
      if (requireContextualAnalysis) {
        this.contextualRequestCount++;
      }
      if (requireSynthesis) {
        this.synthesisRequestCount++;
      }

      // Additional options for the client
      const requestOptions = {
        temperature: options.temperature !== undefined ? options.temperature : CONFIG.DEFAULTS.TEMPERATURE,
        maxTokens: options.maxTokens || CONFIG.DEFAULTS.MAX_TOKENS,
        topP: options.topP || 0.95,
        stream: options.stream || false,
        requireSynthesis: requireSynthesis,
        requireContextualAnalysis: requireContextualAnalysis,
        personality: personality,
        intent: intent
      };

      // Generate response
      const result = await this.client.generateResponse(promptData, requestOptions);

      // Process and format the response
      const formattedResponse = this._formatResponse(result, {
        query: query,
        intent: intent,
        personality: personality,
        contextLength: context.length,
        elapsedMs: Date.now() - startTime,
        requireSynthesis: requireSynthesis,
        requireContextualAnalysis: requireContextualAnalysis,
        useCoT: useCoT
      });

      return formattedResponse;

    } catch (error) {
      console.error('[GrokIntegration] Error in generateResponse:', error);
      return this._createFallbackResponse(CONFIG.FALLBACK.ERROR, {
        error: error.message,
        query: query,
        requestCount: this.requestCount
      });
    }
  }

  // ============================================================
  // SECTION 4: SPECIALIZED GENERATION METHODS
  // ============================================================

  /**
   * Generate a response with contextual analysis
   * @param {string} query - User's question
   * @param {string} context - Retrieved context
   * @param {object} options - Additional options
   * @returns {Promise<object>} Contextual analysis response
   */
  async generateWithContextualAnalysis(query, context, options = {}) {
    return this.generateResponse(query, context, {
      ...options,
      intent: 'contextual',
      personality: options.personality || 'conscientiousness',
      requireContextualAnalysis: true,
      requireSynthesis: options.requireSynthesis || true,
      useCoT: options.useCoT || false
    });
  }

  /**
   * Generate a synthesized response from multiple sources
   * @param {string} query - User's question
   * @param {string} context - Retrieved context
   * @param {object} options - Additional options
   * @returns {Promise<object>} Synthesized response
   */
  async generateWithSynthesis(query, context, options = {}) {
    return this.generateResponse(query, context, {
      ...options,
      intent: 'synthesis',
      personality: options.personality || 'conscientiousness',
      requireSynthesis: true,
      requireContextualAnalysis: options.requireContextualAnalysis || true
    });
  }

  /**
   * Generate a response using Chain-of-Thought reasoning
   * @param {string} query - User's question
   * @param {string} context - Retrieved context
   * @param {object} options - Additional options
   * @returns {Promise<object>} Structured response with reasoning
   */
  async generateWithCoT(query, context, options = {}) {
    const startTime = Date.now();

    try {
      if (!query || !context) {
        return this._createFallbackResponse(CONFIG.FALLBACK.NO_CONTEXT);
      }

      // Use the contextual CoT prompt
      const promptData = {
        system: this._buildCoTSystemPrompt(),
        user: this._buildCoTUserPrompt(query, context),
        temperature: options.temperature || 0.25,
        maxTokens: options.maxTokens || 2500
      };

      const result = await this.client.generateResponse(promptData, {
        temperature: options.temperature || 0.25,
        maxTokens: options.maxTokens || 2500,
        requireContextualAnalysis: true,
        requireSynthesis: options.requireSynthesis || true
      });

      return this._formatCoTResponse(result, {
        query: query,
        elapsedMs: Date.now() - startTime
      });

    } catch (error) {
      console.error('[GrokIntegration] CoT generation error:', error);
      return this._createFallbackResponse(CONFIG.FALLBACK.ERROR, {
        error: error.message,
        query: query
      });
    }
  }

  /**
   * Generate a response using personality-enhanced prompts
   * @param {string} query - User's question
   * @param {string} context - Retrieved context
   * @param {string} personality - Personality ID
   * @param {object} options - Additional options
   * @returns {Promise<object>} Personality-infused response
   */
  async generateWithPersonality(query, context, personality, options = {}) {
    return this.generateResponse(query, context, {
      ...options,
      personality: personality || 'conscientiousness',
      intent: 'personalityEnhanced'
    });
  }

  // ============================================================
  // SECTION 5: PROMPT BUILDING
  // ============================================================

  /**
   * Build a complete prompt using personality and intent
   * @param {string} query - User's question
   * @param {string} context - Retrieved context
   * @param {string} intent - Intent type
   * @param {string} personality - Personality ID
   * @param {object} options - Additional options
   * @returns {object} Complete prompt data
   */
  _buildPrompt(query, context, intent, personality, options) {
    options = options || {};
    
    // If contextual analysis or synthesis is requested, use the contextual builder
    if (options.requireContextualAnalysis || options.requireSynthesis || intent === 'contextual' || intent === 'synthesis') {
      return buildContextualRequest(query, context, {
        useCoT: options.useCoT || false,
        personality: personality,
        requireSynthesis: options.requireSynthesis || false,
        requireContextualAnalysis: options.requireContextualAnalysis || false
      });
    }

    // Otherwise use the standard builder
    const prompt = getPromptForIntent(intent);
    const profile = getPersonalityProfile(personality);

    const combinedSystem = profile.systemPrompt + '\n\n' + prompt.system;

    let userMessage = 'QUESTION: ' + query + '\n\nCONTEXT FROM SOURCES:\n' + context + '\n\nPERSONALITY: ' + profile.label + '\nANALYSIS TYPE: ' + intent.toUpperCase() + '\n\nPlease provide your response following the format guidelines and personality characteristics.';

    return {
      system: combinedSystem,
      user: userMessage,
      messages: [
        { role: 'system', content: combinedSystem },
        { role: 'user', content: userMessage }
      ],
      temperature: prompt.temperature || CONFIG.DEFAULTS.TEMPERATURE,
      maxTokens: prompt.maxTokens || CONFIG.DEFAULTS.MAX_TOKENS
    };
  }

  /**
   * Build Chain-of-Thought system prompt
   * @returns {string} CoT system prompt
   */
  _buildCoTSystemPrompt() {
    return `You are an AI reasoning expert using Chain-of-Thought with contextual awareness.

REASONING FRAMEWORK:
Step 1 - DECOMPOSE: Break the question into components
Step 2 - CONTEXTUALIZE: Connect to broader trends and themes
Step 3 - ANALYZE: Examine each component with evidence
Step 4 - SYNTHESIZE: Combine insights into a coherent answer

RESPONSE FORMAT:
Step 1 - Decompose:
[Breakdown of the question]

Step 2 - Contextualize:
[Connections to broader themes and trends]

Step 3 - Analyze:
[Deep analysis with evidence]

Step 4 - Synthesize:
[Final synthesis with confidence level]

FINAL ANSWER:
[Clear, concise conclusion with bullet points]

CONTEXTUAL INSIGHTS:
• [Insight 1]
• [Insight 2]
• [Insight 3]

GUIDELINES:
• Be thorough in each step
• Cite specific evidence from context
• Acknowledge uncertainties
• Provide confidence level (High/Medium/Low)
• Use proper formatting with paragraphs and bullet points`;
  }

  /**
   * Build Chain-of-Thought user prompt
   * @param {string} query - User's question
   * @param {string} context - Retrieved context
   * @returns {string} CoT user prompt
   */
  _buildCoTUserPrompt(query, context) {
    return 'QUESTION: ' + query + '\n\nCONTEXT:\n' + context + '\n\nApply the Chain-of-Thought reasoning framework to answer this question thoroughly.';
  }

  // ============================================================
  // SECTION 6: INTENT RESOLUTION
  // ============================================================

  /**
   * Resolve intent from various input types
   * @param {string} intent - Raw intent input
   * @returns {string} Resolved intent
   */
  _resolveIntent(intent) {
    if (!intent) return CONFIG.DEFAULTS.INTENT;

    if (grokPrompts[intent]) {
      return intent;
    }

    var mappedIntent = CONFIG.INTENT_MAP[intent.toLowerCase()];
    if (mappedIntent && grokPrompts[mappedIntent]) {
      return mappedIntent;
    }

    var intentKeys = Object.keys(grokPrompts);
    var partialMatch = intentKeys.find(function(key) {
      return key.indexOf(intent.toLowerCase()) !== -1 || intent.toLowerCase().indexOf(key) !== -1;
    });

    if (partialMatch) {
      return partialMatch;
    }

    console.warn('[GrokIntegration] Unknown intent "' + intent + '", using default "' + CONFIG.DEFAULTS.INTENT + '"');
    return CONFIG.DEFAULTS.INTENT;
  }

  // ============================================================
  // SECTION 7: RESPONSE FORMATTING
  // ============================================================

  /**
   * Format the response for frontend consumption
   * @param {object} result - Result from GrokClient
   * @param {object} metadata - Generation metadata
   * @returns {object} Formatted response
   */
  _formatResponse(result, metadata) {
    metadata = metadata || {};

    if (!result.success) {
      return this._createFallbackResponse(
        result.error || CONFIG.FALLBACK.ERROR,
        { 
          ...metadata, 
          clientError: result.error,
          timestamp: new Date().toISOString()
        }
      );
    }

    // Extract sources from response
    var sources = this._extractSources(result.response);

    // Build the response object
    var formatted = {
      response: result.response,
      sources: sources,
      metadata: {
        ai_generated: true,
        model: result.model || 'grok-enhanced',
        personality: metadata.personality || this.defaultPersonality,
        intent: metadata.intent || this.defaultIntent,
        generated_at: new Date().toISOString(),
        elapsed_ms: metadata.elapsedMs || 0,
        response_length: result.response ? result.response.length : 0,
        source_count: sources.length,
        context_length: metadata.contextLength || 0,
        requireSynthesis: metadata.requireSynthesis || false,
        requireContextualAnalysis: metadata.requireContextualAnalysis || false,
        useCoT: metadata.useCoT || false
      }
    };

    // Add themes if enabled and available
    if (this.includeThemes && result.themes && result.themes.length > 0) {
      formatted.metadata.themes = result.themes;
    }

    // Add entities if enabled and available
    if (this.includeEntities && result.entities && result.entities.length > 0) {
      formatted.metadata.entities = result.entities;
    }

    // Add usage information if available
    if (this.includeUsage && result.usage) {
      formatted.metadata.usage = {
        prompt_tokens: result.usage.prompt_tokens || 0,
        completion_tokens: result.usage.completion_tokens || 0,
        total_tokens: result.usage.total_tokens || 0
      };
    }

    // Add confidence if available
    if (this.includeConfidence) {
      formatted.metadata.confidence = this._calculateConfidence(result.response, sources);
    }

    return formatted;
  }

  /**
   * Format Chain-of-Thought response
   * @param {object} result - Result from GrokClient
   * @param {object} metadata - Generation metadata
   * @returns {object} Formatted CoT response
   */
  _formatCoTResponse(result, metadata) {
    metadata = metadata || {};
    var baseResponse = this._formatResponse(result, metadata);
    
    baseResponse.metadata = {
      ...baseResponse.metadata,
      reasoning_type: 'chain_of_thought',
      steps_completed: this._countCoTSteps(result.response || '')
    };

    return baseResponse;
  }

  /**
   * Create a fallback response for error cases
   * @param {string} message - User-friendly error message
   * @param {object} details - Additional error details
   * @returns {object} Fallback response
   */
  _createFallbackResponse(message, details) {
    details = details || {};
    this.fallbackCount++;

    return {
      response: message,
      sources: [],
      metadata: {
        ai_generated: false,
        fallback: true,
        fallback_count: this.fallbackCount,
        error: details.error || 'Unknown error',
        generated_at: new Date().toISOString(),
        ...details
      }
    };
  }

  // ============================================================
  // SECTION 8: SOURCE EXTRACTION
  // ============================================================

  /**
   * Extract sources from response content
   * @param {string} content - Response content
   * @returns {Array} Array of source objects
   */
  _extractSources(content) {
    if (!content) return [];

    var sources = [];
    var seenNames = new Set();

    var pattern1 = /\(Source:\s*([^,]+),\s*([^)]+)\)/g;
    var match;
    while ((match = pattern1.exec(content)) !== null) {
      var name = match[1].trim();
      if (!seenNames.has(name)) {
        seenNames.add(name);
        sources.push({
          name: name,
          date: match[2].trim(),
          type: 'citation'
        });
      }
    }

    var pattern2 = /\[([^\]]+)\]\s*-\s*Relevance:\s*([\d.]+)\/10/g;
    while ((match = pattern2.exec(content)) !== null) {
      var name2 = match[1].trim();
      if (!seenNames.has(name2)) {
        seenNames.add(name2);
        sources.push({
          name: name2,
          relevance: parseFloat(match[2]),
          type: 'reference'
        });
      }
    }

    var pattern3 = /\[([^\]]+)\]\(([^)]+)\)/g;
    while ((match = pattern3.exec(content)) !== null) {
      var linkText = match[1].toLowerCase();
      if (linkText.indexOf('source') !== -1 || linkText.indexOf('reference') !== -1 || linkText.indexOf('citation') !== -1) {
        var name3 = match[1].trim();
        if (!seenNames.has(name3)) {
          seenNames.add(name3);
          sources.push({
            name: name3,
            url: match[2].trim(),
            type: 'url'
          });
        }
      }
    }

    return sources.slice(0, this.maxSources);
  }

  // ============================================================
  // SECTION 9: UTILITY METHODS
  // ============================================================

  /**
   * Calculate confidence level based on response quality
   * @param {string} content - Response content
   * @param {Array} sources - Extracted sources
   * @returns {string} Confidence level (High/Medium/Low)
   */
  _calculateConfidence(content, sources) {
    var score = 0;
    var contentLength = content ? content.length : 0;

    if (sources.length >= 5) score += 30;
    else if (sources.length >= 3) score += 20;
    else if (sources.length >= 1) score += 10;

    if (contentLength > 500) score += 20;
    else if (contentLength > 200) score += 10;

    if (content) {
      var lowerContent = content.toLowerCase();
      if (lowerContent.indexOf('high confidence') !== -1) score += 20;
      if (lowerContent.indexOf('medium confidence') !== -1) score += 10;
      if (lowerContent.indexOf('source') !== -1) score += 10;
      if (lowerContent.indexOf('evidence') !== -1) score += 10;
    }

    if (score >= 70) return 'High';
    if (score >= 40) return 'Medium';
    return 'Low';
  }

  /**
   * Count the number of CoT steps in a response
   * @param {string} content - Response content
   * @returns {number} Number of steps identified
   */
  _countCoTSteps(content) {
    if (!content) return 0;
    var stepPattern = /\*\*Step\s*\d+\s*-\s*/gi;
    var matches = content.match(stepPattern);
    return matches ? matches.length : 0;
  }

  /**
   * Get integration statistics
   * @returns {object} Usage statistics
   */
  getStats() {
    var fallbackRate = this.requestCount > 0 ? 
      ((this.fallbackCount / this.requestCount) * 100).toFixed(2) + '%' : 
      '0%';
    
    return {
      requestCount: this.requestCount,
      fallbackCount: this.fallbackCount,
      fallbackRate: fallbackRate,
      contextualRequestCount: this.contextualRequestCount,
      synthesisRequestCount: this.synthesisRequestCount,
      clientStats: this.client.getStats ? this.client.getStats() : null
    };
  }

  /**
   * Reset integration statistics
   */
  resetStats() {
    this.requestCount = 0;
    this.fallbackCount = 0;
    this.contextualRequestCount = 0;
    this.synthesisRequestCount = 0;
    if (this.client.reset) {
      this.client.reset();
    }
    console.log('[GrokIntegration] Statistics reset');
  }

  /**
   * Get enhanced features status
   * @returns {object} Enhanced features configuration
   */
  getEnhancedFeatures() {
    return this.client.getEnhancedFeatures ? this.client.getEnhancedFeatures() : {
      contextualAnalysis: true,
      synthesis: true,
      themeExtraction: true,
      entityExtraction: true
    };
  }
}

// ============================================================
// SECTION 10: EXPORTS
// ============================================================

export default GrokIntegration;
