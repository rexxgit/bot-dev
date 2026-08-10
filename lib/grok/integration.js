// lib/grok/integration.js - Fixed

import { GrokClient } from './client.js';
import { GrokPromptEnhancer } from '../prompts/grok-enhanced.js';

export class GrokIntegration {
  constructor(apiKey) {
    this.client = new GrokClient(apiKey);
    this.enhancer = new GrokPromptEnhancer();
  }

  async generateResponse(query, context, queryType = 'factual') {
    const enhancedPrompt = this.enhancer.enhancePrompt(queryType, query, context);
    return this.client.generateResponse(enhancedPrompt);
  }

  async generateWithCoT(query, context) {
    const cotPrompt = this.enhancer.enhanceWithCoT(query, context);
    return this.client.generateResponse(cotPrompt);
  }

  async generateWithPersona(query, context, personaId) {
    const persona = this.enhancer.existingPersonas[personaId];
    if (!persona) {
      return this.generateResponse(query, context);
    }
    
    const prompt = {
      system: `${persona.systemPrompt}\n\nProvide a professional, detailed response.`,
      user: `QUESTION: ${query}\n\nCONTEXT:\n${context}`,
      temperature: persona.temperature || 0.3,
      maxTokens: persona.max_tokens || 1500
    };
    
    return this.client.generateResponse(prompt);
  }

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
        model: 'grok-enhanced',
        usage: result.metadata?.usage || null,
        generated_at: new Date().toISOString()
      }
    };
  }
}
