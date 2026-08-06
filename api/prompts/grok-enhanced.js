// api/prompts/grok-enhanced.js - Grok-Enhanced Prompt System
// Works WITH your existing prompts, not replace them

import { systemPrompts } from './system.js';
import { expertPersonas } from './personas.js';
import { selectCOTTemplate } from './cot.js';

export class GrokPromptEnhancer {
  constructor() {
    // Import your existing prompts
    this.existingPrompts = systemPrompts;
    this.existingPersonas = expertPersonas;
    this.cotTemplates = selectCOTTemplate;
  }

  // ============================================
  // ENHANCE EXISTING PROMPTS WITH GROK CAPABILITIES
  // ============================================
  enhancePrompt(queryType, query, context) {
    // Get your existing prompt
    const existingPrompt = this.existingPrompts[queryType] || this.existingPrompts.factual;
    
    // Get the appropriate persona
    const persona = this.selectPersona(queryType, query);
    
    // Build enhanced system prompt
    const enhancedSystem = this.buildEnhancedSystem(existingPrompt, persona);
    
    // Build user prompt with context
    const enhancedUser = this.buildEnhancedUser(query, context, queryType);
    
    return {
      system: enhancedSystem,
      user: enhancedUser,
      temperature: existingPrompt.temperature || 0.3,
      maxTokens: existingPrompt.max_tokens || 1500
    };
  }

  // ============================================
  // BUILD ENHANCED SYSTEM PROMPT
  // ============================================
  buildEnhancedSystem(existingPrompt, persona) {
    const personaPrompt = persona?.systemPrompt || '';
    
    return `
${personaPrompt}

${existingPrompt.system || ''}

ADDITIONAL GROK CAPABILITIES:
- Chain-of-Thought reasoning for complex problems
- Multi-source synthesis and integration
- Professional formatting with clear sections
- Confidence scoring for all claims
- Source attribution with specific citations

RESPONSE FORMAT:
${this.getResponseFormat()}

GUIDELINES:
- Use technical terminology precisely
- Provide specific metrics and benchmarks
- Include confidence levels (High/Medium/Low)
- Structure responses with clear headings
- Synthesize multiple sources when applicable`;
  }

  // ============================================
  // GET RESPONSE FORMAT
  // ============================================
  getResponseFormat() {
    return `
**Executive Summary:** [2-3 sentence overview]
**Analysis:** [Detailed breakdown]
**Key Findings:** [3-5 bullet points]
**Confidence:** [High/Medium/Low]
**Sources:** [Citations with specific references]`;
  }

  // ============================================
  // BUILD ENHANCED USER PROMPT
  // ============================================
  buildEnhancedUser(query, context, queryType) {
    const baseTemplate = `
USER QUERY: ${query}

RELEVANT CONTEXT:
${context}

TASK: Provide a comprehensive, professional response using the available information.

REQUIREMENTS:
1. Synthesize information from all sources
2. Provide specific insights with evidence
3. Use professional, technical language
4. Cite sources appropriately
5. Structure response with clear sections

RESPONSE:`;

    return baseTemplate;
  }

  // ============================================
  // SELECT PERSONA (uses your existing system)
  // ============================================
  selectPersona(queryType, query) {
    const lower = query.toLowerCase();
    
    // Match your existing persona selection logic
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
    } else {
      // Use your existing mapping
      const typeMap = {
        'analytical': 'research_analyst',
        'comparative': 'strategy_consultant',
        'exploratory': 'trend_forecaster',
        'technical': 'technical_architect'
      };
      personaId = typeMap[queryType] || 'research_analyst';
    }
    
    return this.existingPersonas[personaId] || this.existingPersonas.research_analyst;
  }

  // ============================================
  // ENHANCE WITH CHAIN-OF-THOUGHT
  // ============================================
  enhanceWithCoT(query, context) {
    const cotTemplate = this.cotTemplates('analytical');
    
    return {
      system: `
${cotTemplate.system}

CHAIN-OF-THOUGHT REASONING:
1. **Step 1 - Decompose:** Break the problem down
2. **Step 2 - Analyze:** Examine each component
3. **Step 3 - Relate:** Connect to broader context
4. **Step 4 - Evaluate:** Assess evidence
5. **Step 5 - Synthesize:** Combine insights

FORMAT:
**Step 1 - Decomposition:** [Detailed breakdown]
**Step 2 - Analysis:** [Component analysis]
**Step 3 - Relationships:** [Key connections]
**Step 4 - Evaluation:** [Evidence assessment]
**Step 5 - Synthesis:** [Final conclusion]`,
      user: `
QUESTION: ${query}

CONTEXT:
${context}

Please use Chain-of-Thought reasoning to analyze this question thoroughly. Show each step clearly.`
    };
  }
}
