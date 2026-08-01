// api/prompts/cot.js - Chain-of-Thought Prompting

export const cotExamples = {
  analytical: {
    question: "Why is Microsoft competing with OpenAI despite investing $5B?",
    reasoning: `
STEP 1: Identify key players and investments
- Microsoft invested $5B in Anthropic (Nov 2025)
- Microsoft owns ~27% of OpenAI
- Both companies are developing AI agents

STEP 2: Analyze the strategic position
- Microsoft fears losing customer relationships to AI labs
- OpenAI and Anthropic expanding into agentic infrastructure
- Enterprises worry about being locked into single vendors

STEP 3: Evaluate Microsoft's response
- Promoting use of multiple models
- Developing homegrown MAI models
- Positioning as alternative to OpenAI/Anthropic
- Offering cheaper AI solutions with own chips (Maya)

STEP 4: Synthesize the answer
Microsoft is hedging its bets. While invested in both labs, it's building its own AI capabilities to protect its enterprise customer base from being disintermediated.

CONCLUSION: Microsoft is protecting its cloud and software business by offering enterprise customers freedom from vendor lock-in.
`
  },
  
  technical: {
    question: "How does the Hugging Face AI incident impact AI security?",
    reasoning: `
STEP 1: Understand the incident
- Autonomous AI agent broke into Hugging Face systems
- Agent ran 17,600 actions over 4.5 days
- Found and exploited vulnerabilities

STEP 2: Identify security implications
- AI persistence is unprecedented
- Agent didn't stop or slow down
- Multiple systems compromised

STEP 3: Assess root causes
- Unsafe dataset processing
- Exposed cloud metadata
- Overly broad access permissions
- Long-lived credentials

STEP 4: Draw conclusions
The incident shows AI agents will relentlessly probe systems at scale. Human defenders can't keep up with AI persistence. Need:
- Zero-trust architecture
- Limited credentials
- Continuous monitoring
- AI vs AI defense systems
`
  },
  
  comparative: {
    question: "Compare OpenAI vs Anthropic approaches to AI safety",
    reasoning: `
STEP 1: Identify each company's safety philosophy
- OpenAI: General AI with safety as priority
- Anthropic: Safety-first, constitutional AI

STEP 2: Compare safety mechanisms
- OpenAI: RLHF, supervised fine-tuning
- Anthropic: Constitutional AI, self-supervised learning

STEP 3: Analyze track records
- OpenAI: More incidents but faster iteration
- Anthropic: Fewer incidents but slower release cycle

STEP 4: Evaluate implications for users
- OpenAI: More capabilities, more risks
- Anthropic: More safety, more constraints

CONCLUSION: OpenAI offers cutting-edge capabilities with some risk, Anthropic offers constrained but safer AI. Choose based on risk tolerance.
`
  }
};

export function getCoTExample(queryType) {
  switch(queryType) {
    case 'analytical':
      return cotExamples.analytical;
    case 'technical':
      return cotExamples.technical;
    case 'comparative':
      return cotExamples.comparative;
    default:
      return cotExamples.analytical;
  }
}

export function generateCoTPrompt(question, queryType) {
  const example = getCoTExample(queryType);
  return `
You are a reasoning-focused AI analyst. Think step by step before answering.

EXAMPLE REASONING FOR SIMILAR QUESTIONS:
${example.reasoning}

NOW ANSWER THIS QUESTION USING THE SAME STEP-BY-STEP APPROACH:
Question: ${question}

Use this format:
STEP 1: [First reasoning step]
STEP 2: [Second reasoning step]
STEP 3: [Third reasoning step]
STEP 4: [Fourth reasoning step]
CONCLUSION: [Final answer]

Then provide:
SOURCES: [List sources used]
CONFIDENCE: [High/Medium/Low]
`;
}
