// ============================================================
// GROK INTEGRATION LAYER - Conscientiousness Edition v2.0
// ============================================================
// Purpose: Bridge between frontend and Grok API with personality
// support, intent routing, and structured response formatting.
//
// Author: Omni Brand Intelligence Team
// Last Updated: 2026-01-20
// Version: 2.0.0
// Dependencies: GrokClient from './client.js'
// ============================================================

import { GrokClient } from './client.js';
import { 
  grokPrompts, 
  getPromptForIntent, 
  getPersonalityProfile,
  buildGrokRequest 
} from './prompts.js';

// ============================================================
// SECTION 1: CONFIGURATION CONSTANTS
// ============================================================

const CONFIG = {
  // Default Settings
  DEFAULTS: {
    PERSONALITY: 'balanced',
    INTENT: 'informational',
    TEMPERATURE: 0.3,
    MAX_TOKENS: 1500,
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
    personality: 'personalityEnhanced'
  },

  // Response Formatting
  FORMATTING: {
    MAX_SOURCES: 10,
    INCLUDE_CONFIDENCE: true,
    INCLUDE_USAGE: true,
    INCLUDE_TIMESTAMPS: true
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
      logLevel: options.logLevel || 2
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

    // State tracking
    this.requestCount = 0;
    this.fallbackCount = 0;

    // Log initialization
    console.log(`[GrokIntegration] Initialized with personality: ${this.defaultPersonality}, intent: ${this.defaultIntent}`);
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

      // Validate personality
      const personalityProfile = getPersonalityProfile(personality);
      if (!personalityProfile) {
        console.warn(`[GrokIntegration] Invalid personality "${personality}", falling back to "balanced"`);
        options.personality = 'balanced';
      }

      // Build the prompt
      const promptData = this._buildPrompt(query, context, intent, personality);

      // Add additional options
      const requestOptions = {
        temperature: options.temperature !== undefined ? options.temperature : CONFIG.DEFAULTS.TEMPERATURE,
        maxTokens: options.maxTokens || CONFIG.DEFAULTS.MAX_TOKENS,
        topP: options.topP || 0.95,
        stream: options.stream || false
      };

      // Generate response
      const result = await this.client.generateResponse(promptData, requestOptions);

      // Process and format the response
      const formattedResponse = this._formatResponse(result, {
        query: query,
        intent: intent,
        personality: personality,
        contextLength: context.length,
        elapsedMs: Date.now() - startTime
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
   * Generate a response using Chain-of-Thought reasoning
   * @param {string} query - User's question
   * @param {string} context - Retrieved context
   * @param {object} options - Additional options
   * @returns {Promise<object>} Structured response with reasoning
   */
  async generateWithCoT(query, context, options = {}) {
    const startTime = Date.now();

    try {
      // Validate inputs
      if (!query || !context) {
        return this._createFallbackResponse(CONFIG.FALLBACK.NO_CONTEXT);
      }

      // Build Chain-of-Thought prompt
      const promptData = {
        system: this._buildCoTSystemPrompt(),
        user: this._buildCoTUserPrompt(query, context),
        temperature: 0.3,
        maxTokens: 2000
      };

      // Generate response
      const result = await this.client.generateResponse(promptData, {
        temperature: options.temperature || 0.3,
        maxTokens: options.maxTokens || 2000
      });

      // Format CoT response
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
   * @param {string} personality - Personality ID (openness, conscientiousness, etc.)
   * @param {object} options - Additional options
   * @returns {Promise<object>} Personality-infused response
   */
  async generateWithPersonality(query, context, personality = 'balanced', options = {}) {
    return this.generateResponse(query, context, {
      ...options,
      personality: personality,
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
   * @returns {object} Complete prompt data
   */
  _buildPrompt(query, context, intent, personality) {
    // Get the prompt configuration
    const prompt = getPromptForIntent(intent);
    const profile = getPersonalityProfile(personality);

    // Combine system prompts
    const combinedSystem = `${profile.systemPrompt}\n\n${prompt.system}`;

    // Build user message with context
    const userMessage = `QUESTION: ${query}

CONTEXT FROM SOURCES:
${context}

PERSONALITY: ${profile.label}
ANALYSIS TYPE: ${intent.toUpperCase()}

Please provide your response following the format guidelines and personality characteristics.`;

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
    return `You are an AI reasoning expert using Chain-of-Thought methodology.

REASONING FRAMEWORK:
Step 1 - DECOMPOSE: Break the question into components
Step 2 - ANALYZE: Examine each component with evidence
Step 3 - EVALUATE: Assess the quality and relevance of evidence
Step 4 - SYNTHESIZE: Combine insights into a coherent conclusion

RESPONSE FORMAT:
**Step 1 - Decompose:** 
[Breakdown of the question]

**Step 2 - Analyze:** 
[Deep analysis of each component with evidence]

**Step 3 - Evaluate:** 
[Assessment of evidence quality and relevance]

**Step 4 - Synthesize:** 
[Final synthesis with confidence level]

**FINAL ANSWER:** 
[Clear, concise conclusion]

GUIDELINES:
• Be thorough in each step
• Cite specific evidence from context
• Acknowledge uncertainties
• Provide confidence level (High/Medium/Low)`;
  }

  /**
   * Build Chain-of-Thought user prompt
   * @param {string} query - User's question
   * @param {string} context - Retrieved context
   * @returns {string} CoT user prompt
   */
  _buildCoTUserPrompt(query, context) {
    return `QUESTION: ${query}

CONTEXT:
${context}

Apply the Chain-of-Thought reasoning framework to answer this question thoroughly.`;
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

    // Check if it's a valid intent directly
    if (grokPrompts[intent]) {
      return intent;
    }

    // Check mapping
    const mappedIntent = CONFIG.INTENT_MAP[intent.toLowerCase()];
    if (mappedIntent && grokPrompts[mappedIntent]) {
      return mappedIntent;
    }

    // Check for partial matches
    const intentKeys = Object.keys(grokPrompts);
    const partialMatch = intentKeys.find(key => 
      key.includes(intent.toLowerCase()) || intent.toLowerCase().includes(key)
    );

    if (partialMatch) {
      return partialMatch;
    }

    // Fallback to default
    console.warn(`[GrokIntegration] Unknown intent "${intent}", using default "${CONFIG.DEFAULTS.INTENT}"`);
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
  _formatResponse(result, metadata = {}) {
    if (!result.success) {
      return this._createFallbackResponse(
        result.error || CONFIG.FALLBACK.ERROR,
        { ...metadata, clientError: result.error }
      );
    }

    // Extract sources from response
    const sources = this._extractSources(result.response);

    // Build the response object
    const formatted = {
      response: result.response,
      sources: sources,
      metadata: {
        ai_generated: true,
        model: result.model || 'grok-enhanced',
        personality: metadata.personality || this.defaultPersonality,
        intent: metadata.intent || this.defaultIntent,
        generated_at: new Date().toISOString(),
        elapsed_ms: metadata.elapsedMs || 0,
        response_length: result.response?.length || 0,
        source_count: sources.length,
        context_length: metadata.contextLength || 0
      }
    };

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
  _formatCoTResponse(result, metadata = {}) {
    const baseResponse = this._formatResponse(result, metadata);
    
    // Add CoT-specific metadata
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
  _createFallbackResponse(message, details = {}) {
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

    const sources = [];
    const seenNames = new Set();

    // Pattern 1: (Source: Name, Date)
    const pattern1 = /\(Source:\s*([^,]+),\s*([^)]+)\)/g;
    let match;
    while ((match = pattern1.exec(content)) !== null) {
      const name = match[1].trim();
      if (!seenNames.has(name)) {
        seenNames.add(name);
        sources.push({
          name: name,
          date: match[2].trim(),
          type: 'citation'
        });
      }
    }

    // Pattern 2: [Name] - Relevance: X/10
    const pattern2 = /\[([^\]]+)\]\s*-\s*Relevance:\s*([\d.]+)\/10/g;
    while ((match = pattern2.exec(content)) !== null) {
      const name = match[1].trim();
      if (!seenNames.has(name)) {
        seenNames.add(name);
        sources.push({
          name: name,
          relevance: parseFloat(match[2]),
          type: 'reference'
        });
      }
    }

    // Pattern 3: Markdown links that look like sources
    const pattern3 = /\[([^\]]+)\]\(([^)]+)\)/g;
    while ((match = pattern3.exec(content)) !== null) {
      const linkText = match[1].toLowerCase();
      if (linkText.includes('source') || linkText.includes('reference') || linkText.includes('citation')) {
        const name = match[1].trim();
        if (!seenNames.has(name)) {
          seenNames.add(name);
          sources.push({
            name: name,
            url: match[2].trim(),
            type: 'url'
          });
        }
      }
    }

    // Limit sources
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
    let score = 0;
    const contentLength = content?.length || 0;

    // Source-based scoring
    if (sources.length >= 5) score += 30;
    else if (sources.length >= 3) score += 20;
    else if (sources.length >= 1) score += 10;

    // Content quality indicators
    if (contentLength > 500) score += 20;
    else if (contentLength > 200) score += 10;

    // Look for confidence indicators in content
    if (content) {
      const lowerContent = content.toLowerCase();
      if (lowerContent.includes('high confidence')) score += 20;
      if (lowerContent.includes('medium confidence')) score += 10;
      if (lowerContent.includes('source')) score += 10;
      if (lowerContent.includes('evidence')) score += 10;
    }

    // Determine confidence level
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
    const stepPattern = /\*\*Step\s*\d+\s*-\s*/gi;
    const matches = content.match(stepPattern);
    return matches ? matches.length : 0;
  }

  /**
   * Get integration statistics
   * @returns {object} Usage statistics
   */
  getStats() {
    return {
      requestCount: this.requestCount,
      fallbackCount: this.fallbackCount,
      fallbackRate: this.requestCount > 0 ? 
        ((this.fallbackCount / this.requestCount) * 100).toFixed(2) + '%' : 
        '0%',
      clientStats: this.client.getStats ? this.client.getStats() : null
    };
  }

  /**
   * Reset integration statistics
   */
  resetStats() {
    this.requestCount = 0;
    this.fallbackCount = 0;
    if (this.client.reset) {
      this.client.reset();
    }
    console.log('[GrokIntegration] Statistics reset');
  }
}

// ============================================================
// SECTION 10: EXPORTS
// ============================================================

export default GrokIntegration;
