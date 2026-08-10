// api/prompts/system.js - Add CoT Support

export const systemPrompts = {
  // ... existing prompts ...

  // NEW: Chain-of-Thought Prompting
  chain_of_thought: {
    system: `You are a reasoning-focused AI analyst. Think step by step before answering.

RULES:
1. Break down complex questions into logical steps
2. Show your reasoning process
3. Identify assumptions and dependencies
4. Reach conclusions based on evidence
5. Always cite sources

FORMAT:
STEP 1: Identify key components
STEP 2: Analyze relationships
STEP 3: Evaluate implications
STEP 4: Synthesize answer
STEP 5: Cite sources and provide confidence`,

    temperature: 0.3,
    max_tokens: 1000
  }
};

export function selectPrompt(queryType) {
  const defaults = {
    factual: { temperature: 0.3, max_tokens: 500 },
    analytical: { temperature: 0.3, max_tokens: 1000 },
    comparative: { temperature: 0.4, max_tokens: 800 },
    exploratory: { temperature: 0.7, max_tokens: 800 },
    summarization: { temperature: 0.2, max_tokens: 400 },
    chain_of_thought: { temperature: 0.3, max_tokens: 1000 }
  };

  // Use CoT for analytical, comparative, and exploratory queries
  if (['analytical', 'comparative', 'exploratory'].includes(queryType)) {
    return systemPrompts.chain_of_thought;
  }

  return systemPrompts[queryType] || defaults.factual;
}

export function getPromptConfig(queryType) {
  const configs = {
    factual: { temperature: 0.3, max_tokens: 500 },
    analytical: { temperature: 0.3, max_tokens: 1000 },
    comparative: { temperature: 0.4, max_tokens: 800 },
    exploratory: { temperature: 0.7, max_tokens: 800 },
    summarization: { temperature: 0.2, max_tokens: 400 },
    chain_of_thought: { temperature: 0.3, max_tokens: 1000 }
  };
  
  return configs[queryType] || configs.factual;
}
