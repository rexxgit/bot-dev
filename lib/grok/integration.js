// lib/grok/integration.js - Complete Working Version

import { GrokClient } from './client.js';

export class GrokIntegration {
  constructor(apiKey) {
    this.client = new GrokClient(apiKey);
  }

  async generateResponse(query, context, queryType = 'factual') {
    const systemPrompts = {
      factual: `You are an AI research analyst. Provide clear, factual answers based on the context.

RULES:
1. Cite specific sources
2. Be accurate and concise
3. If uncertain, say "I don't have enough information"
4. Use the provided context only

FORMAT:
FACT: [Your answer]
SOURCE: [Citation]
CONFIDENCE: [High/Medium/Low]`,

      analytical: `You are an AI strategy consultant. Provide deep analysis with insights.

FORMAT:
EXECUTIVE SUMMARY: [1-2 sentence overview]
ANALYSIS: [Detailed breakdown]
KEY INSIGHTS: [3-5 bullet points]
RECOMMENDATIONS: [Actionable advice]
SOURCES: [Citations]`,

      comparative: `You are an AI comparison expert. Provide balanced comparisons.

FORMAT:
OVERVIEW: [What's being compared]
COMPARISON MATRIX: [Table format]
STRENGTHS & WEAKNESSES: [Balanced assessment]
RECOMMENDATION: [Based on context]
SOURCES: [Citations]`
    };

    const system = systemPrompts[queryType] || systemPrompts.factual;

    const user = `QUESTION: ${query}

CONTEXT:
${context}

Provide a comprehensive, professional response based on the context.`;

    const promptData = {
      system: system,
      user: user,
      temperature: 0.3,
      maxTokens: 1500
    };

    return this.client.generateResponse(promptData);
  }

  async generateWithCoT(query, context) {
    const system = `You are an AI reasoning expert. Use Chain-of-Thought reasoning.

REASONING STEPS:
Step 1 - Decompose: Break down the question
Step 2 - Analyze: Examine each component
Step 3 - Evaluate: Assess evidence
Step 4 - Synthesize: Combine insights

FORMAT:
**Step 1 - Decompose:** [Analysis]
**Step 2 - Analyze:** [Deep dive]
**Step 3 - Evaluate:** [Evidence assessment]
**Step 4 - Synthesize:** [Final answer with confidence]

Then provide: **Final Answer:** [Clear conclusion]`;

    const user = `QUESTION: ${query}

CONTEXT:
${context}

Use Chain-of-Thought reasoning to answer.`;

    const promptData = {
      system: system,
      user: user,
      temperature: 0.3,
      maxTokens: 2000
    };

    return this.client.generateResponse(promptData);
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

export default GrokIntegration;
