// lib/prompts/grok-enhanced.js - Grok-Enhanced Prompt System

import { systemPrompts } from './system.js';
import { expertPersonas } from './personas.js';

export class GrokPromptEnhancer {
  constructor() {
    this.existingPrompts = systemPrompts;
    this.existingPersonas = expertPersonas;
  }

  enhancePrompt(queryType, query, context) {
    const existingPrompt = this.existingPrompts[queryType] || this.existingPrompts.factual;
    const persona = this.selectPersona(queryType, query);
    
    const enhancedSystem = `
${persona?.systemPrompt || ''}

${existingPrompt.system || ''}

ADDITIONAL CAPABILITIES:
- Chain-of-Thought reasoning
- Multi-source synthesis
- Professional formatting
- Confidence scoring

RESPONSE FORMAT:
**Executive Summary:** [Overview]
**Analysis:** [Breakdown]
**Key Findings:** [Bullet points]
**Confidence:** [High/Medium/Low]
**Sources:** [Citations]`;

    const enhancedUser = `
USER QUERY: ${query}

RELEVANT CONTEXT:
${context}

Provide a comprehensive, professional response.`;

    return {
      system: enhancedSystem,
      user: enhancedUser,
      temperature: existingPrompt.temperature || 0.3,
      maxTokens: existingPrompt.max_tokens || 1500
    };
  }

  selectPersona(queryType, query) {
    const lower = query.toLowerCase();
    const technicalTerms = ['architecture', 'deployment', 'implementation', 'code', 'api'];
    const strategyTerms = ['strategy', 'business', 'roi', 'competitive', 'market'];
    const trendTerms = ['trend', 'future', 'prediction', 'forecast', 'emerging'];
    const researchTerms = ['research', 'paper', 'study', 'findings', 'analysis'];
    
    let personaId = 'research_analyst';
    if (technicalTerms.some(term => lower.includes(term))) {
      personaId = 'technical_architect';
    } else if (strategyTerms.some(term => lower.includes(term))) {
      personaId = 'strategy_consultant';
    } else if (trendTerms.some(term => lower.includes(term))) {
      personaId = 'trend_forecaster';
    } else if (researchTerms.some(term => lower.includes(term))) {
      personaId = 'research_analyst';
    }
    
    return this.existingPersonas[personaId] || this.existingPersonas.research_analyst;
  }

  enhanceWithCoT(query, context) {
    return {
      system: `
You are a reasoning expert. Use Chain-of-Thought reasoning.

REASONING STEPS:
1. Decompose the problem
2. Analyze each component
3. Evaluate evidence
4. Synthesize insights

FORMAT:
**Step 1 - Decompose:** [Breakdown]
**Step 2 - Analyze:** [Deep dive]
**Step 3 - Evaluate:** [Evidence]
**Step 4 - Synthesize:** [Final answer]`,
      user: `
QUESTION: ${query}

CONTEXT:
${context}

Use Chain-of-Thought reasoning.`
    };
  }
}
