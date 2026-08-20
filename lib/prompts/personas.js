// ============================================================
// GROK-ENHANCED PROMPT SYSTEM - Conscientiousness Edition v2.0
// ============================================================
// Purpose: Advanced prompt enhancement system with personality
// integration, Chain-of-Thought reasoning, and structured formatting.
//
// Author: Omni Brand Intelligence Team
// Last Updated: 2026-01-20
// Version: 2.0.0
// Dependencies: system.js, personas.js
// ============================================================

import { systemPrompts } from './system.js';
import { expertPersonas } from './personas.js';

// ============================================================
// SECTION 1: CONFIGURATION CONSTANTS
// ============================================================

const CONFIG = {
  // Default Settings
  DEFAULTS: {
    TEMPERATURE: 0.3,
    MAX_TOKENS: 1500,
    PERSONA: 'research_analyst'
  },

  // Persona Selection Criteria
  PERSONA_SELECTION: {
    TECHNICAL: ['architecture', 'deployment', 'implementation', 'code', 'api', 'developer', 'engineering', 'pipeline', 'workflow'],
    STRATEGY: ['strategy', 'business', 'roi', 'competitive', 'market', 'enterprise', 'investment', 'growth'],
    TRENDS: ['trend', 'future', 'prediction', 'forecast', 'emerging', 'roadmap', 'vision', 'next-generation'],
    RESEARCH: ['research', 'paper', 'study', 'findings', 'analysis', 'methodology', 'experiment', 'hypothesis'],
    COMPARATIVE: ['compare', 'versus', 'vs', 'against', 'better', 'difference', 'pros', 'cons', 'evaluation']
  },

  // Response Formatting
  FORMATTING: {
    SECTIONS: ['Executive Summary', 'Analysis', 'Key Findings', 'Confidence', 'Sources'],
    MAX_SOURCES: 10,
    INCLUDE_TIMESTAMPS: true
  },

  // Chain-of-Thought Configuration
  COT: {
    STEPS: ['Decompose', 'Analyze', 'Evaluate', 'Synthesize'],
    TEMPLATE: '**Step {step} - {name}:** {content}'
  }
};

// ============================================================
// SECTION 2: GROK PROMPT ENHANCER CLASS
// ============================================================

export class GrokPromptEnhancer {
  /**
   * Initialize the Prompt Enhancer
   * @param {object} options - Configuration options
   */
  constructor(options = {}) {
    // Load existing prompts and personas
    this.existingPrompts = systemPrompts || {};
    this.existingPersonas = expertPersonas || {};

    // Configuration
    this.defaultTemperature = options.defaultTemperature || CONFIG.DEFAULTS.TEMPERATURE;
    this.defaultMaxTokens = options.defaultMaxTokens || CONFIG.DEFAULTS.MAX_TOKENS;
    this.defaultPersona = options.defaultPersona || CONFIG.DEFAULTS.PERSONA;
    this.maxSources = options.maxSources || CONFIG.FORMATTING.MAX_SOURCES;
    this.includeTimestamps = options.includeTimestamps !== undefined ? 
      options.includeTimestamps : CONFIG.FORMATTING.INCLUDE_TIMESTAMPS;

    // Cache for persona selections
    this._personaCache = new Map();

    // Log initialization
    console.log(`[GrokPromptEnhancer] Initialized with default persona: ${this.defaultPersona}`);
  }

  // ============================================================
  // SECTION 3: CORE ENHANCEMENT METHODS
  // ============================================================

  /**
   * Enhance a prompt with personality and structure
   * @param {string} queryType - Type of query (factual, analytical, etc.)
   * @param {string} query - User's question
   * @param {string} context - Retrieved context
   * @param {object} options - Enhancement options
   * @returns {object} Enhanced prompt configuration
   */
  enhancePrompt(queryType, query, context, options = {}) {
    // Validate inputs
    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      throw new Error('[GrokPromptEnhancer] Invalid query: must be a non-empty string');
    }

    if (!context || typeof context !== 'string' || context.trim().length === 0) {
      throw new Error('[GrokPromptEnhancer] Invalid context: must be a non-empty string');
    }

    // Get existing prompt with fallback
    const existingPrompt = this._getExistingPrompt(queryType);

    // Select appropriate persona
    const persona = this._selectPersona(queryType, query, options.persona);

    // Determine if Chain-of-Thought should be used
    const useCoT = options.useCoT !== undefined ? options.useCoT : this._shouldUseCoT(query);

    // Build enhanced system prompt
    const enhancedSystem = this._buildEnhancedSystem(existingPrompt, persona, useCoT);

    // Build enhanced user prompt
    const enhancedUser = this._buildEnhancedUser(query, context, options);

    // Determine temperature and max tokens
    const temperature = options.temperature || existingPrompt.temperature || this.defaultTemperature;
    const maxTokens = options.maxTokens || existingPrompt.max_tokens || this.defaultMaxTokens;

    // Return complete prompt configuration
    return {
      system: enhancedSystem,
      user: enhancedUser,
      temperature: temperature,
      maxTokens: maxTokens,
      metadata: {
        persona: persona?.id || this.defaultPersona,
        queryType: queryType,
        useCoT: useCoT,
        contextLength: context.length,
        enhanced: true,
        version: '2.0.0'
      }
    };
  }

  /**
   * Enhance a prompt specifically for Chain-of-Thought reasoning
   * @param {string} query - User's question
   * @param {string} context - Retrieved context
   * @param {object} options - Enhancement options
   * @returns {object} CoT-enhanced prompt configuration
   */
  enhanceWithCoT(query, context, options = {}) {
    // Validate inputs
    if (!query || !context) {
      throw new Error('[GrokPromptEnhancer] Query and context are required for CoT enhancement');
    }

    // Build CoT system prompt
    const systemPrompt = this._buildCoTSystemPrompt();

    // Build CoT user prompt
    const userPrompt = this._buildCoTUserPrompt(query, context);

    // Get temperature and max tokens from options or defaults
    const temperature = options.temperature || 0.3;
    const maxTokens = options.maxTokens || 2000;

    return {
      system: systemPrompt,
      user: userPrompt,
      temperature: temperature,
      maxTokens: maxTokens,
      metadata: {
        reasoning_type: 'chain_of_thought',
        steps: CONFIG.COT.STEPS.length,
        enhanced: true,
        version: '2.0.0'
      }
    };
  }

  /**
   * Select a persona based on query analysis
   * @param {string} queryType - Type of query
   * @param {string} query - User's question
   * @param {string} preferredPersona - Optional preferred persona
   * @returns {object} Selected persona object
   */
  selectPersona(queryType, query, preferredPersona = null) {
    return this._selectPersona(queryType, query, preferredPersona);
  }

  // ============================================================
  // SECTION 4: PERSONA SELECTION
  // ============================================================

  /**
   * Select an appropriate persona for the query
   * @param {string} queryType - Type of query
   * @param {string} query - User's question
   * @param {string} preferredPersona - Optional preferred persona
   * @returns {object} Selected persona
   */
  _selectPersona(queryType, query, preferredPersona = null) {
    // If a preferred persona is specified, use it
    if (preferredPersona && this.existingPersonas[preferredPersona]) {
      return this.existingPersonas[preferredPersona];
    }

    // Check cache for this query
    const cacheKey = `${queryType}:${query.substring(0, 50)}`;
    if (this._personaCache.has(cacheKey)) {
      return this._personaCache.get(cacheKey);
    }

    // Analyze query to determine persona
    const lower = query.toLowerCase();
    let personaId = this.defaultPersona;

    // Check each category
    const categories = [
      { terms: CONFIG.PERSONA_SELECTION.TECHNICAL, persona: 'technical_architect' },
      { terms: CONFIG.PERSONA_SELECTION.STRATEGY, persona: 'strategy_consultant' },
      { terms: CONFIG.PERSONA_SELECTION.TRENDS, persona: 'trend_forecaster' },
      { terms: CONFIG.PERSONA_SELECTION.RESEARCH, persona: 'research_analyst' },
      { terms: CONFIG.PERSONA_SELECTION.COMPARATIVE, persona: 'comparative_analyst' }
    ];

    // Score each category
    const scores = categories.map(category => {
      const matches = category.terms.filter(term => lower.includes(term)).length;
      return { ...category, score: matches };
    });

    // Find the best match
    const bestMatch = scores.reduce((best, current) => {
      return current.score > best.score ? current : best;
    }, scores[0]);

    if (bestMatch.score > 0) {
      personaId = bestMatch.persona;
    }

    // Get the persona object
    const persona = this.existingPersonas[personaId] || this.existingPersonas[this.defaultPersona];

    // Cache the result
    this._personaCache.set(cacheKey, persona);

    return persona;
  }

  // ============================================================
  // SECTION 5: PROMPT BUILDING
  // ============================================================

  /**
   * Get existing prompt with fallback
   * @param {string} queryType - Type of query
   * @returns {object} Prompt configuration
   */
  _getExistingPrompt(queryType) {
    if (queryType && this.existingPrompts[queryType]) {
      return this.existingPrompts[queryType];
    }
    
    // Try to find a matching prompt
    const promptKeys = Object.keys(this.existingPrompts);
    const matchingKey = promptKeys.find(key => 
      key.includes(queryType) || queryType.includes(key)
    );
    
    if (matchingKey) {
      return this.existingPrompts[matchingKey];
    }

    // Fallback to factual
    console.warn(`[GrokPromptEnhancer] Query type "${queryType}" not found, using "factual" fallback`);
    return this.existingPrompts.factual || this.existingPrompts.informational || { system: '' };
  }

  /**
   * Build enhanced system prompt
   * @param {object} existingPrompt - Existing prompt configuration
   * @param {object} persona - Selected persona
   * @param {boolean} useCoT - Whether to use Chain-of-Thought
   * @returns {string} Enhanced system prompt
   */
  _buildEnhancedSystem(existingPrompt, persona, useCoT) {
    const parts = [];

    // Add persona system prompt
    if (persona?.systemPrompt) {
      parts.push(persona.systemPrompt);
      parts.push('---');
    }

    // Add existing system prompt
    if (existingPrompt?.system) {
      parts.push(existingPrompt.system);
      parts.push('---');
    }

    // Add enhanced capabilities
    parts.push('ENHANCED CAPABILITIES:');
    parts.push('• Chain-of-Thought reasoning for complex queries');
    parts.push('• Multi-source synthesis and cross-referencing');
    parts.push('• Professional formatting with clear structure');
    parts.push('• Confidence scoring with evidence weighting');
    parts.push('• Source attribution with relevance assessment');

    // Add CoT instructions if enabled
    if (useCoT) {
      parts.push('---');
      parts.push('CHAIN-OF-THOUGHT REASONING:');
      parts.push('1. Decompose the question into components');
      parts.push('2. Analyze each component systematically');
      parts.push('3. Evaluate evidence quality and relevance');
      parts.push('4. Synthesize insights into a coherent answer');
    }

    // Add response format
    parts.push('---');
    parts.push('RESPONSE FORMAT:');
    parts.push('**Executive Summary:** [2-3 sentence overview]');
    parts.push('**Analysis:** [Detailed breakdown with evidence]');
    parts.push('**Key Findings:** [3-5 bullet points with supporting evidence]');
    parts.push('**Confidence:** [High/Medium/Low with reasoning]');
    parts.push('**Sources:** [Citations with relevance scores]');

    // Add timestamp instructions
    if (this.includeTimestamps) {
      parts.push('**Generated:** [Current timestamp]');
    }

    // Add final guidelines
    parts.push('---');
    parts.push('GUIDELINES:');
    parts.push('• Be accurate and cite specific sources');
    parts.push('• Acknowledge limitations and uncertainties');
    parts.push('• Use professional, clear language');
    parts.push('• Structure content for easy scanning');

    return parts.join('\n');
  }

  /**
   * Build enhanced user prompt
   * @param {string} query - User's question
   * @param {string} context - Retrieved context
   * @param {object} options - Enhancement options
   * @returns {string} Enhanced user prompt
   */
  _buildEnhancedUser(query, context, options = {}) {
    const parts = [];

    // Add query
    parts.push(`USER QUERY: ${query}`);
    parts.push('---');

    // Add context
    parts.push('RELEVANT CONTEXT:');
    parts.push(context);
    parts.push('---');

    // Add instructions
    parts.push('INSTRUCTIONS:');
    parts.push('1. Analyze the query and context thoroughly');
    parts.push('2. Follow the response format precisely');
    parts.push('3. Cite specific sources from the context');
    parts.push('4. Provide confidence levels for key claims');
    parts.push('5. Structure for readability and impact');

    // Add additional options
    if (options.focus) {
      parts.push(`FOCUS AREA: ${options.focus}`);
    }

    if (options.audience) {
      parts.push(`TARGET AUDIENCE: ${options.audience}`);
    }

    if (this.includeTimestamps) {
      parts.push(`REQUEST TIMESTAMP: ${new Date().toISOString()}`);
    }

    // Add final instruction
    parts.push('---');
    parts.push('Provide a comprehensive, professional response following the format guidelines.');

    return parts.join('\n');
  }

  // ============================================================
  // SECTION 6: CHAIN-OF-THOUGHT BUILDING
  // ============================================================

  /**
   * Build Chain-of-Thought system prompt
   * @returns {string} CoT system prompt
   */
  _buildCoTSystemPrompt() {
    const steps = CONFIG.COT.STEPS;
    const stepDescriptions = {
      'Decompose': 'Break the question into logical components',
      'Analyze': 'Examine each component with evidence',
      'Evaluate': 'Assess evidence quality and relevance',
      'Synthesize': 'Combine insights into a coherent answer'
    };

    const parts = [
      'You are a reasoning expert using Chain-of-Thought methodology.',
      '',
      'REASONING FRAMEWORK:',
      ...steps.map((step, index) => {
        const description = stepDescriptions[step] || 'Analyze the component';
        return `Step ${index + 1} - ${step}: ${description}`;
      }),
      '',
      'RESPONSE FORMAT:',
      ...steps.map((step, index) => {
        return `**Step ${index + 1} - ${step}:** [${stepDescriptions[step] || 'Analysis'}]`;
      }),
      '',
      '**FINAL ANSWER:** [Clear, concise conclusion]',
      '**CONFIDENCE:** [High/Medium/Low]',
      '**SOURCES:** [Citations]',
      '',
      'GUIDELINES:',
      '• Be thorough in each step',
      '• Cite specific evidence from context',
      '• Acknowledge uncertainties',
      '• Show your reasoning process'
    ];

    return parts.join('\n');
  }

  /**
   * Build Chain-of-Thought user prompt
   * @param {string} query - User's question
   * @param {string} context - Retrieved context
   * @returns {string} CoT user prompt
   */
  _buildCoTUserPrompt(query, context) {
    const parts = [
      `QUESTION: ${query}`,
      '',
      'CONTEXT:',
      context,
      '',
      'Apply the Chain-of-Thought reasoning framework to answer this question.',
      '',
      'Follow the reasoning steps:',
      ...CONFIG.COT.STEPS.map((step, index) => {
        return `${index + 1}. ${step} the question and provide reasoning`;
      }),
      '',
      'Provide your complete reasoning process and final answer.'
    ];

    return parts.join('\n');
  }

  // ============================================================
  // SECTION 7: UTILITY METHODS
  // ============================================================

  /**
   * Determine if Chain-of-Thought should be used
   * @param {string} query - User's question
   * @returns {boolean} True if CoT should be used
   */
  _shouldUseCoT(query) {
    if (!query) return false;

    const lower = query.toLowerCase();
    const cotTriggers = [
      'how', 'why', 'explain', 'compare', 'contrast',
      'analyze', 'evaluate', 'assess', 'determine',
      'understand', 'calculate', 'compute', 'derive'
    ];

    return cotTriggers.some(trigger => lower.includes(trigger));
  }

  /**
   * Get available personas
   * @returns {object} Map of available personas
   */
  getAvailablePersonas() {
    return Object.keys(this.existingPersonas).map(id => ({
      id: id,
      name: this.existingPersonas[id]?.name || id,
      description: this.existingPersonas[id]?.description || 'No description available'
    }));
  }

  /**
   * Get available prompt types
   * @returns {Array} List of available prompt types
   */
  getAvailablePromptTypes() {
    return Object.keys(this.existingPrompts);
  }

  /**
   * Clear the persona cache
   */
  clearCache() {
    this._personaCache.clear();
    console.log('[GrokPromptEnhancer] Persona cache cleared');
  }

  /**
   * Get enhancement statistics
   * @returns {object} Usage statistics
   */
  getStats() {
    return {
      cacheSize: this._personaCache.size,
      availablePersonas: Object.keys(this.existingPersonas).length,
      availablePromptTypes: Object.keys(this.existingPrompts).length,
      defaultPersona: this.defaultPersona,
      defaultTemperature: this.defaultTemperature,
      defaultMaxTokens: this.defaultMaxTokens
    };
  }

  /**
   * Validate a prompt configuration
   * @param {object} prompt - Prompt configuration to validate
   * @returns {object} Validation result
   */
  validatePrompt(prompt) {
    const errors = [];
    const warnings = [];

    // Check required fields
    if (!prompt) {
      return { valid: false, errors: ['Prompt configuration is null or undefined'] };
    }

    if (!prompt.system || typeof prompt.system !== 'string') {
      errors.push('System prompt is missing or invalid');
    }

    if (!prompt.user || typeof prompt.user !== 'string') {
      errors.push('User prompt is missing or invalid');
    }

    // Check optional fields
    if (prompt.temperature !== undefined) {
      if (typeof prompt.temperature !== 'number' || prompt.temperature < 0 || prompt.temperature > 2) {
        warnings.push('Temperature should be between 0 and 2');
      }
    }

    if (prompt.maxTokens !== undefined) {
      if (typeof prompt.maxTokens !== 'number' || prompt.maxTokens < 1) {
        warnings.push('maxTokens should be a positive number');
      }
    }

    return {
      valid: errors.length === 0,
      errors: errors,
      warnings: warnings
    };
  }
}

// ============================================================
// SECTION 8: FACTORY FUNCTION
// ============================================================

/**
 * Create a new GrokPromptEnhancer instance
 * @param {object} options - Configuration options
 * @returns {GrokPromptEnhancer} New enhancer instance
 */
export function createPromptEnhancer(options = {}) {
  return new GrokPromptEnhancer(options);
}

// ============================================================
// SECTION 9: EXPORTS
// ============================================================

export default GrokPromptEnhancer;
