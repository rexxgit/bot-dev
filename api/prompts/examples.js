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
  ]
};

export function getFewShotExamples(queryType) {
  return fewShotExamples[queryType] || [];
}
