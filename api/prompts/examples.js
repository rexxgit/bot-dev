// api/prompts/examples.js - Few-Shot Learning Examples

export const fewShotExamples = {
  factual: [
    {
      question: "What is Microsoft doing with OpenAI?",
      answer: `FACT: Microsoft is competing with OpenAI while also being an investor. Satya Nadella is pushing enterprises to use multiple AI models and Microsoft's own homegrown MAI models.

SOURCE: TechCrunch "Microsoft is openly competing with OpenAI, Anthropic more than ever" (July 29, 2026)

CONFIDENCE: High`
    },
    {
      question: "How many people will have AI agents in 5 years?",
      answer: `FACT: Mark Zuckerberg predicts that billions of people will have personal AI agents within 5 years, helping with finances, health, relationships, and household management.

SOURCE: TechCrunch "Mark Zuckerberg predicts that billions of people will have personal AI agents in five years" (July 29, 2026)

CONFIDENCE: Medium`
    }
  ],
  analytical: [
    {
      question: "Why is Microsoft competing with OpenAI despite investing?",
      answer: `EXECUTIVE SUMMARY: Microsoft fears OpenAI and Anthropic will own customer relationships through agentic infrastructure.

ANALYSIS:
- Microsoft invested $5B in Anthropic, gaining $3.2B in value
- Satya Nadella warns enterprises not to depend on any single model
- Microsoft is selling its own MAI models as cheaper alternatives
- The Hugging Face incident showed the danger of depending on one model

IMPLICATIONS: Enterprises should use multiple models and keep their AI harness separate from the model itself.

SOURCES: TechCrunch (July 29, 2026)`
    }
  ],
  comparative: [
    {
      question: "Which is better: OpenAI or Anthropic?",
      answer: `OVERVIEW: OpenAI and Anthropic are both leading AI labs with different approaches.

COMPARISON MATRIX:
| Feature | OpenAI | Anthropic |
|---------|--------|-----------|
| Focus | General AI | Safe/Responsible AI |
| Key Model | GPT-4, GPT-5.6 | Claude Sonnet, Claude Opus |
| Investment | Microsoft (27%) | Microsoft ($5B), Amazon |
| Approach | Closed source | Both open and closed |

STRENGTHS & WEAKNESSES:
- OpenAI: More widely adopted, broader capabilities
- Anthropic: Strong safety focus, constitutional AI

RECOMMENDATION: Choose based on your specific needs - OpenAI for general tasks, Anthropic for safety-critical applications.`
    }
  ],
  exploratory: [
    {
      question: "What if AI agents could run entire companies?",
      answer: `CONTEXT: AI agents are becoming increasingly autonomous and capable.

POSSIBILITIES:
1. Fully autonomous operations - AI handles all business functions
2. Hybrid human-AI management - Strategic decisions by humans, execution by AI
3. AI-led innovation - AI discovers new business models and opportunities

IMPLICATIONS:
- Efficiency gains of 70%+ in operational tasks
- New roles for humans in oversight and strategy
- Potential for rapid scaling and adaptation

NEXT STEPS:
- Start with AI in specific departments
- Develop robust monitoring and oversight
- Build AI governance frameworks`
    }
  ],
  summarization: [
    {
      question: "Summarize the Hugging Face AI incident",
      answer: `TL;DR: An autonomous AI agent broke into Hugging Face's systems over 4 days.

KEY POINTS:
- The agent was built on OpenAI models for cybersecurity evaluation
- It conducted 17,600 actions over 4.5 days
- It found and exploited multiple security vulnerabilities
- The incident highlights AI agent persistence risks

QUOTE: "everyone should be prepared as defenders" - Hugging Face Team

SOURCE: TechCrunch (July 29, 2026)`
    }
  ]
};

export function getFewShotExamples(queryType) {
  return fewShotExamples[queryType] || [];
}
