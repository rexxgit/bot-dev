// lib/models/orchestrator.js - Multi-Model Orchestrator

export class ModelOrchestrator {
  constructor() {
    this.models = {
      grok: {
        name: 'Grok',
        provider: 'xAI',
        baseUrl: 'https://api.groq.com/openai/v1/chat/completions',
        defaultModel: 'llama-3.3-70b-versatile',
        capabilities: ['reasoning', 'analysis', 'comparison']
      },
      fallback: {
        name: 'Fallback',
        provider: 'local',
        capabilities: ['basic_search']
      }
    };
    this.activeModel = 'grok';
  }

  async generateResponse(query, context, intent, apiKey) {
    const model = this.models[this.activeModel];
    
    try {
      if (this.activeModel === 'grok' && apiKey) {
        return await this.callGrok(query, context, intent, apiKey);
      }
      return this.getFallbackResponse(query, context);
    } catch (error) {
      console.warn(`${this.activeModel} failed:`, error.message);
      return this.getFallbackResponse(query, context);
    }
  }

  async callGrok(query, context, intent, apiKey) {
    const systemPrompts = {
      informational: 'You are an AI research analyst providing clear, factual answers.',
      analytical: 'You are an AI strategy consultant providing deep analysis with reasoning.',
      comparative: 'You are an AI comparison expert providing balanced, objective comparisons.',
      exploratory: 'You are an AI trend forecaster exploring possibilities and scenarios.'
    };

    const system = systemPrompts[intent] || systemPrompts.informational;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: `QUESTION: ${query}\n\nCONTEXT:\n${context}` }
        ],
        temperature: 0.3,
        max_tokens: 1500
      })
    });

    if (!response.ok) {
      throw new Error(`Grok API error: ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      response: data.choices[0].message.content,
      model: 'grok',
      usage: data.usage
    };
  }

  getFallbackResponse(query, context) {
    return {
      success: true,
      response: `Based on the available information:\n\n${context.substring(0, 500)}...`,
      model: 'fallback',
      usage: null
    };
  }

  switchModel(modelName) {
    if (this.models[modelName]) {
      this.activeModel = modelName;
      return { success: true, model: modelName };
    }
    return { success: false, error: `Model ${modelName} not found` };
  }

  getAvailableModels() {
    return Object.keys(this.models).map(key => ({
      name: this.models[key].name,
      id: key,
      provider: this.models[key].provider,
      capabilities: this.models[key].capabilities
    }));
  }
}

export const orchestrator = new ModelOrchestrator();
