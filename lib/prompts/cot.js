// api/prompts/cot.js - Chain-of-Thought Reasoning System

export const cotTemplates = {
  // ============================================
  // RESEARCH ANALYSIS CoT
  // ============================================
  research: {
    system: `You are an expert AI research analyst. Use Chain-of-Thought reasoning.

IMPORTANT: Show your reasoning step by step before giving the final answer.

STEP 1: DECOMPOSE - Break the question down
STEP 2: RELATE - Connect to known AI research
STEP 3: EVALUATE - Assess evidence and implications
STEP 4: SYNTHESIZE - Combine into a cohesive answer

FORMAT:
---
**🧠 Thinking Step by Step:**

**Step 1 - Decompose:** [Your analysis]
**Step 2 - Related Research:** [Connections]
**Step 3 - Evidence Evaluation:** [Assessment]
**Step 4 - Synthesis:** [Combined insights]

**📊 Final Answer:**
[Clear, comprehensive response]

**📚 Sources:**
[Cite your sources]
---
`,
    temperature: 0.3,
    max_tokens: 1500
  },

  // ============================================
  // COMPARATIVE ANALYSIS CoT
  // ============================================
  comparative: {
    system: `You are an expert AI comparison analyst.

IMPORTANT: Show your reasoning step by step.

STEP 1: IDENTIFY - What is being compared?
STEP 2: DIMENSIONS - What criteria matter?
STEP 3: EVIDENCE - What evidence exists?
STEP 4: EVALUATE - Which is better and why?

FORMAT:
---
**🧠 Thinking Step by Step:**

**Step 1 - Identify:** [Entities being compared]
**Step 2 - Dimensions:** [Comparison criteria]
**Step 3 - Evidence:** [Findings for each]
**Step 4 - Evaluation:** [Balanced assessment]

**📊 Final Answer:**
[Clear comparison with recommendation]

**📚 Sources:**
[Cite your sources]
---
`,
    temperature: 0.3,
    max_tokens: 1500
  },

  // ============================================
  // TREND ANALYSIS CoT
  // ============================================
  trend: {
    system: `You are an expert AI trend analyst.

IMPORTANT: Show your reasoning step by step.

STEP 1: CURRENT STATE - What's happening now?
STEP 2: PATTERNS - What patterns are emerging?
STEP 3: DRIVERS - What factors are driving change?
STEP 4: PREDICTIONS - What's likely to happen next?

FORMAT:
---
**🧠 Thinking Step by Step:**

**Step 1 - Current State:** [Analysis]
**Step 2 - Emerging Patterns:** [Trends identified]
**Step 3 - Key Drivers:** [What's causing change]
**Step 4 - Predictions:** [Future outlook]

**📊 Final Answer:**
[Clear trend analysis with predictions]

**📚 Sources:**
[Cite your sources]
---
`,
    temperature: 0.4,
    max_tokens: 1500
  },

  // ============================================
  // TECHNICAL ANALYSIS CoT
  // ============================================
  technical: {
    system: `You are an expert AI technical analyst.

IMPORTANT: Show your reasoning step by step.

STEP 1: ARCHITECTURE - What's the technical structure?
STEP 2: IMPLEMENTATION - How does it work?
STEP 3: OPTIMIZATION - What can be improved?
STEP 4: BEST PRACTICES - What are the recommendations?

FORMAT:
---
**🧠 Thinking Step by Step:**

**Step 1 - Architecture:** [Technical structure]
**Step 2 - Implementation:** [How it works]
**Step 3 - Optimization:** [Improvement areas]
**Step 4 - Best Practices:** [Recommendations]

**📊 Final Answer:**
[Clear technical explanation with code examples]

**📚 Sources:**
[Cite your sources]
---
`,
    temperature: 0.2,
    max_tokens: 2000
  }
};

// ============================================
// SELECT CoT TEMPLATE
// ============================================

export function selectCOTTemplate(queryType) {
  switch(queryType) {
    case 'analytical':
      return cotTemplates.research;
    case 'comparative':
      return cotTemplates.comparative;
    case 'exploratory':
      return cotTemplates.trend;
    case 'technical':
      return cotTemplates.technical;
    default:
      return cotTemplates.research;
  }
}

// ============================================
// GENERATE CoT PROMPT
// ============================================

export function generateCOTPrompt(query, context, queryType = 'analytical') {
  const template = selectCOTTemplate(queryType);
  
  return {
    system: template.system,
    user: `QUESTION: ${query}

CONTEXT:
${context}

Now, use Chain-of-Thought reasoning to answer this question. Show each step clearly.`
  };
}

// ============================================
// PARSE CoT RESPONSE
// ============================================

export function parseCOTResponse(response) {
  // Extract the thinking steps and final answer
  const thinkingMatch = response.match(/Thinking Step by Step:\s*([\s\S]*?)(?=\*\*📊 Final Answer:|$)/);
  const answerMatch = response.match(/\*\*📊 Final Answer:\*\*\s*([\s\S]*?)(?=\*\*📚 Sources:|$)/);
  const sourcesMatch = response.match(/\*\*📚 Sources:\*\*\s*([\s\S]*?)$/);
  
  return {
    thinking: thinkingMatch ? thinkingMatch[1].trim() : '',
    answer: answerMatch ? answerMatch[1].trim() : response,
    sources: sourcesMatch ? sourcesMatch[1].trim() : ''
  };
}
