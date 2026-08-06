// api/grok/integration.js - Integration with Your Existing System
// Works WITH your existing prompts, personas, and templates

import { GrokClient } from './client.js';
import { GrokPromptEnhancer } from '../prompts/grok-enhanced.js';

export class GrokIntegration {
  constructor(apiKey) {
    this.client = new GrokClient(apiKey);
    this.enhancer = new GrokPromptEnhancer();
  }

  // ============================================
  // GENERATE RESPONSE USING YOUR EXISTING PROMPTS
  // ============================================
  async generateResponse(query, context, queryType = 'factual') {
    // Use your existing prompt system with Grok enhancement
    const enhancedPrompt = this.enhancer.enhancePrompt(queryType, query, context);
    
    // Send to Grok
    const result = await this.client.generateResponse(enhancedPrompt);
    
    if (!result.success) {
      return {
        success: false,
        error: result.error,
        fallback: this.generateFallback(query, context)
      };
    }
    
    return {
      success: true,
      response: result.response,
      metadata: {
        model: result.model,
        usage: result.usage
      }
    };
  }

  // ============================================
  // GENERATE WITH CHAIN-OF-THOUGHT
  // ============================================
  async generateWithCoT(query, context) {
    const cotPrompt = this.enhancer.enhanceWithCoT(query, context);
    return this.client.generateWithCoT(cotPrompt);
  }

  // ============================================
  // GENERATE WITH SPECIFIC PERSONA
  // ============================================
  async generateWithPersona(query, context, personaId) {
    const persona = this.enhancer.existingPersonas[personaId];
    if (!persona) {
      return this.generateResponse(query, context);
    }
    
    const prompt = {
      system: `${persona.systemPrompt}\n\nUse your expertise to provide a professional, detailed response.`,
      user: `QUESTION: ${query}\n\nCONTEXT:\n${context}\n\nPlease provide your expert analysis.`,
      temperature: persona.temperature || 0.3,
      maxTokens: persona.max_tokens || 1500
    };
    
    return this.client.generateResponse(prompt);
  }

  // ============================================
  // FALLBACK RESPONSE
  // ============================================
  generateFallback(query, context) {
    return `Based on the available information:

${context.substring(0, 500)}...

For a more detailed response, please try again later.`;
  }

  // ============================================
  // FORMAT RESPONSE FOR FRONTEND
  // ============================================
  formatForFrontend(result, sources) {
    if (!result.success) {
      return {
        response: result.fallback || 'Unable to generate response.',
        sources: sources,
        metadata: {
          ai_generated: false,
          error: result.error,
          fallback: true
        }
      };
    }

    return {
      response: result.response,
      sources: sources,
      metadata: {
        ai_generated: true,
        model: result.metadata?.model || 'grok-enhanced',
        usage: result.metadata?.usage || null,
        generated_at: new Date().toISOString()
      }
    };
  }
}
