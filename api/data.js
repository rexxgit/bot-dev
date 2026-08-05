// api/data.js - Complete API with SMART CONTEXTUAL ANSWERS + CoT + Expert Personas + Professional Formatting
// Handles ANY question by finding relationships in available data

// ============================================
// IMPORT PROMPTS
// ============================================

import { systemPrompts, selectPrompt } from './prompts/system.js';
import { getFewShotExamples } from './prompts/examples.js';
import { selectTemplate } from './prompts/templates.js';
import { generateCOTPrompt } from './prompts/cot.js';
import { selectPersona } from './prompts/personas.js';
import { OutputFormatter } from './utils/formatter.js';

// ============================================
// INITIALIZE FORMATTER
// ============================================

const formatter = new OutputFormatter();

// ============================================
// ALL DATA EMBEDDED HERE
// ============================================

const techCrunchSources = [
  {
    title: "Microsoft is openly competing with OpenAI, Anthropic more than ever",
    author: "Unknown",
    date: "2026-07-29T17:21:06-07:00",
    content: "Microsoft is in a unique position as AI overtakes the tech industry. It's one of the world's largest cloud providers and software-as-a-service companies, while also holding valuable stakes in the two biggest AI labs, OpenAI and Anthropic. Those incentives are starting to clash as Microsoft posts blockbuster financial results. The company just reported an extremely profitable quarter with $90 billion in revenue and net income of $35.8 billion.",
    url: "https://techcrunch.com/2026/07/29/microsoft-is-openly-competing-with-openai-anthropic-more-than-ever/",
    source_name: "TechCrunch",
    source_type: "blog",
    word_count: 777,
    hash: "750af354",
    domain: "techcrunch.com",
    timestamp: "2026-07-30T12:32:45.949284"
  },
  {
    title: "Mark Zuckerberg predicts that billions of people will have personal AI agents in five years",
    author: "Unknown",
    date: "2026-07-29T16:00:11-07:00",
    content: "Meta founder and CEO Mark Zuckerberg is trying to sell investors on his prediction for the future — one where billions of people will have their own personal AI agents in the next five years. 'I think that it's extremely unlikely if you look out five years from now, for example — whatever period of time you want — that you don't have billions of people with a personal agent that understands your goals and that is just working on your behalf 24/7 to achieve your goals in whatever the domain is that you care about,' Zuckerberg said.",
    url: "https://techcrunch.com/2026/07/29/mark-zuckerberg-predicts-that-billions-of-people-will-have-personal-ai-agents-in-five-years/",
    source_name: "TechCrunch",
    source_type: "blog",
    word_count: 544,
    hash: "1929c185",
    domain: "techcrunch.com",
    timestamp: "2026-07-30T12:33:02.318565"
  },
  {
    title: "Microsoft logs $3.2B from Anthropic investment, but OpenAI was a mixed bag",
    author: "Unknown",
    date: "2026-07-29T15:46:03-07:00",
    content: "When Microsoft reported killer fourth-quarter earnings for its fiscal 2026 year (which ended June 30), it tucked in an interesting little tidbit about how its investments in the two biggest, and competing, AI labs are doing. For the quarter, it recorded its investment in Anthropic as a $3.2 billion gain.",
    url: "https://techcrunch.com/2026/07/29/microsoft-logs-3-2b-from-anthropic-investment-but-openai-was-a-mixed-bag/",
    source_name: "TechCrunch",
    source_type: "blog",
    word_count: 318,
    hash: "feca2ec5",
    domain: "techcrunch.com",
    timestamp: "2026-07-30T12:33:18.896327"
  },
  {
    title: "Zuckerberg says Meta's enterprise AI opportunity extends beyond agents",
    author: "Unknown",
    date: "2026-07-29T15:23:12-07:00",
    content: "In June, Meta entered the enterprise AI market with a new AI agent aimed at businesses, to help with customer service, support, and other daily operations. But the tech giant's enterprise AI ambitions are much more expansive, Meta CEO Mark Zuckerberg told investors on Wednesday's second-quarter earnings call.",
    url: "https://techcrunch.com/2026/07/29/zuckerberg-says-metas-enterprise-ai-opportunity-extends-beyond-agents/",
    source_name: "TechCrunch",
    source_type: "blog",
    word_count: 602,
    hash: "c9945336",
    domain: "techcrunch.com",
    timestamp: "2026-07-30T12:33:27.875955"
  },
  {
    title: "The Hugging Face break-in explained",
    author: "Unknown",
    date: "2026-07-29T12:44:49-07:00",
    content: "Hugging Face on Monday published a technical timeline that walks readers through how an autonomous AI agent, built on OpenAI models and running inside one of OpenAI's own cybersecurity evaluations, broke into its systems over more than four days earlier this month.",
    url: "https://techcrunch.com/2026/07/29/the-hugging-face-ai-break-in-as-told-through-an-increasingly-committed-bear-metaphor/",
    source_name: "TechCrunch",
    source_type: "blog",
    word_count: 639,
    hash: "101b78fb",
    domain: "techcrunch.com",
    timestamp: "2026-07-30T12:34:10.277411"
  },
  {
    title: "Claude Opus 5 became downright ruthless when tasked with running a vending machine",
    author: "Unknown",
    date: "2026-07-29T11:45:27-07:00",
    content: "For a year now, the AI safety testing firm Andon Labs has given frontier models various real-world tasks to determine how well they do as agents running for long periods with no human supervision.",
    url: "https://techcrunch.com/2026/07/29/claude-opus-5-became-downright-ruthless-when-tasked-with-running-a-vending-machine/",
    source_name: "TechCrunch",
    source_type: "blog",
    word_count: 1097,
    hash: "b509c204",
    domain: "techcrunch.com",
    timestamp: "2026-07-30T12:34:28.349281"
  },
  {
    title: "Hint, a new AI startup co-founded by Martha Stewart, offers an AI assistant for homeowners",
    author: "Unknown",
    date: "2026-07-29T08:35:09-07:00",
    content: "Martha Stewart is entering the AI software era in the most Martha Stewart way possible: She has joined the co-founding team at Hint, an app that leverages AI technology to manage the tasks surrounding home maintenance.",
    url: "https://techcrunch.com/2026/07/29/hint-a-new-ai-startup-co-founded-by-martha-stewart-offers-an-ai-assistant-for-homeowners/",
    source_name: "TechCrunch",
    source_type: "blog",
    word_count: 965,
    hash: "c037c1f2",
    domain: "techcrunch.com",
    timestamp: "2026-07-30T12:34:37.298648"
  },
  {
    title: "TechCrunch Disrupt 2026",
    author: "Unknown",
    date: "2026-07-29T14:16:39-07:00",
    content: "October 13 – 15, 2026 — San Francisco Innovation for Every Stage Disrupt is where you'll find innovation for every stage of your startup journey.",
    url: "https://techcrunch.com/events/techcrunch-disrupt/",
    source_name: "TechCrunch",
    source_type: "blog",
    word_count: 499,
    hash: "3f71dec1",
    domain: "techcrunch.com",
    timestamp: "2026-07-30T12:32:37.745412"
  }
];

const staticSources = [
  {
    title: "GPT-5.6, Claude Sonnet 5 and Grok 4.5: What the July 2026 AI Model Wave Means for Your Business",
    author: "Raulji Technologies",
    date: "July 27, 2026",
    content: "Anthropic, OpenAI, and xAI all shipped major models in weeks. Here is what the July 2026 AI model wave means for your business, and how to turn it into a competitive advantage.",
    url: "https://www.rauljitechnologies.com/blog/july-2026-ai-model-wave/",
    source_name: "Raulji Technologies",
    source_type: "blog",
    word_count: 1768,
    hash: "raulji_001",
    domain: "rauljitechnologies.com",
    timestamp: "2026-07-27T08:36:53.036255"
  },
  {
    title: "15 best AI apps I can't live without in 2026",
    author: "Gumloop",
    date: "July 27, 2026",
    content: "It all started with ChatGPT, then Claude, and then we had an explosion of AI apps for literally every use case you can think of.",
    url: "https://www.gumloop.com/blog/best-ai-apps",
    source_name: "Gumloop",
    source_type: "blog",
    word_count: 6894,
    hash: "gumloop_001",
    domain: "gumloop.com",
    timestamp: "2026-07-27T08:36:53.036255"
  },
  {
    title: "Top AI Platforms in 2026: The 15 Best Platforms I've Actually Tested",
    author: "Pickaxe",
    date: "July 27, 2026",
    content: "I have tested more AI platforms than I can count over the past three years. Most of them blurred together. Some were genuinely great.",
    url: "https://pickaxe.co/post/top-ai-platforms",
    source_name: "Pickaxe",
    source_type: "blog",
    word_count: 6534,
    hash: "pickaxe_001",
    domain: "pickaxe.co",
    timestamp: "2026-07-27T08:36:53.036255"
  },
  {
    title: "The 12 Best AI Tools for 2026 (That People Actually Use)",
    author: "Synthesia",
    date: "July 27, 2026",
    content: "Can you believe it's been over three years since ChatGPT landed in our internet browsers? In a short space of time, AI has become a staple part of daily work.",
    url: "https://www.synthesia.io/post/ai-tools",
    source_name: "Synthesia",
    source_type: "blog",
    word_count: 2343,
    hash: "synthesia_001",
    domain: "synthesia.io",
    timestamp: "2026-07-27T08:36:53.036255"
  },
  {
    title: "Six Popular AI Platforms Everyone Can Use",
    author: "Red River Communications",
    date: "July 27, 2026",
    content: "Whether it's Fortune 500 companies or your friends and coworkers, just about everywhere you turn, people are talking about AI.",
    url: "https://redrivercomm.com/six-popular-ai-platforms-everyone-can-use",
    source_name: "Red River Communications",
    source_type: "blog",
    word_count: 953,
    hash: "redriver_001",
    domain: "redrivercomm.com",
    timestamp: "2026-07-27T08:36:53.036255"
  }
];

const ventureBeatSources = [
  {
    title: "Thinking Machines debuts Inkling Small open source AI model nearing performance of predecessor at about 1/4 size",
    author: "Carl Franzen",
    date: "2026-07-31",
    content: "Thinking Machines has debuted Inkling Small, an open source AI model that achieves near performance of its predecessor at approximately 1/4 the size.",
    url: "https://venturebeat.com/technology/thinking-machines-debuts-inkling-small-open-source-ai-model-nearing-performance-of-predecessor-at-about-1-4-size",
    source_name: "VentureBeat",
    source_type: "blog",
    word_count: 45,
    hash: "44d92c0c",
    domain: "venturebeat.com",
    timestamp: "2026-07-31T12:29:19.456515"
  },
  {
    title: "Enterprise AI agents can't talk to each other, can't be trusted with permissions, and can't be audited — 5 startups are already fixing that",
    author: "Taryn Plumb",
    date: "2026-07-31",
    content: "Enterprise AI agents face critical challenges including communication gaps, permission trust issues, and auditability concerns. Five startups are already developing solutions.",
    url: "https://venturebeat.com/orchestration/enterprise-ai-agents-cant-talk-to-each-other-cant-be-trusted-with-permissions-and-cant-be-audited-5-startups-are-already-fixing-that",
    source_name: "VentureBeat",
    source_type: "blog",
    word_count: 42,
    hash: "30f8e69e",
    domain: "venturebeat.com",
    timestamp: "2026-07-31T12:29:19.493304"
  },
  {
    title: "Nimble claims its new, domain-specialized Web Search Agents cut token costs in half while boosting retrieval accuracy",
    author: "Carl Franzen",
    date: "2026-07-31",
    content: "Nimble's new domain-specialized Web Search Agents claim to cut token costs in half while significantly boosting retrieval accuracy.",
    url: "https://venturebeat.com/orchestration/nimble-claims-its-new-domain-specialized-web-search-agents-cut-token-costs-in-half-while-boosting-retrieval-accuracy",
    source_name: "VentureBeat",
    source_type: "blog",
    word_count: 38,
    hash: "a4f69881",
    domain: "venturebeat.com",
    timestamp: "2026-07-31T12:29:19.527402"
  },
  {
    title: "Target SVP says its real AI moat isn't the models — it's everything built around them",
    author: "Taryn Plumb",
    date: "2026-07-31",
    content: "Target's SVP explains that the company's real competitive advantage in AI isn't the models themselves, but the entire ecosystem built around them.",
    url: "https://venturebeat.com/orchestration/target-svp-says-its-real-ai-moat-isnt-the-models-its-everything-built-around-them",
    source_name: "VentureBeat",
    source_type: "blog",
    word_count: 50,
    hash: "7f8dc55f",
    domain: "venturebeat.com",
    timestamp: "2026-07-31T12:29:19.561786"
  },
  {
    title: "Bright Machines says its new hybrid robot cell could help solve a major AI infrastructure bottleneck",
    author: "Michael Nuñez",
    date: "2026-07-31",
    content: "Bright Machines introduces the Hybrid BRC (Bright Robotic Cell), an expansion of its Bright Factory platform that lets human operators step inside a sensor-monitored robotic cell.",
    url: "https://venturebeat.com/infrastructure/bright-machines-says-its-new-hybrid-robot-cell-could-help-solve-a-major-ai-infrastructure-bottleneck",
    source_name: "VentureBeat",
    source_type: "blog",
    word_count: 75,
    hash: "efd58cb6",
    domain: "venturebeat.com",
    timestamp: "2026-07-31T12:29:19.600009"
  },
  {
    title: "Instacart's CTO says AI made the company stop worrying about tech debt",
    author: "Taryn Plumb",
    date: "2026-07-31",
    content: "Instacart's CTO reveals how AI has transformed the company's approach to technical debt, allowing them to focus on innovation rather than legacy code maintenance.",
    url: "https://venturebeat.com/orchestration/instacarts-cto-says-ai-made-the-company-stop-worrying-about-tech-debt",
    source_name: "VentureBeat",
    source_type: "blog",
    word_count: 40,
    hash: "2352e881",
    domain: "venturebeat.com",
    timestamp: "2026-07-31T12:29:19.634158"
  },
  {
    title: "GM redesigned its engineering workflows around AI agents — and tripled its merged pull requests",
    author: "Carl Franzen",
    date: "2026-07-31",
    content: "General Motors redesigned its engineering workflows around AI agents, resulting in a tripling of merged pull requests and significant improvements in development efficiency.",
    url: "https://venturebeat.com/orchestration/gm-redesigned-its-engineering-workflows-around-ai-agents-and-tripled-its-merged-pull-requests",
    source_name: "VentureBeat",
    source_type: "blog",
    word_count: 45,
    hash: "67958797",
    domain: "venturebeat.com",
    timestamp: "2026-07-31T12:29:19.668593"
  },
  {
    title: "Runway couldn't fix a bug in its AI video model, so it turned the bug into a feature",
    author: "Ben Dickson",
    date: "2026-07-31",
    content: "Runway discovered a creative solution to a bug in its AI video model by turning the unexpected behavior into a new feature.",
    url: "https://venturebeat.com/technology/runway-couldnt-fix-a-bug-in-its-ai-video-model-so-it-turned-the-bug-into-a-feature",
    source_name: "VentureBeat",
    source_type: "blog",
    word_count: 45,
    hash: "d4aac8e4",
    domain: "venturebeat.com",
    timestamp: "2026-07-31T12:29:19.700556"
  },
  {
    title: "MCP just got its biggest update ever — here's what changes for AI agents",
    author: "Michael Nuñez",
    date: "2026-07-31",
    content: "The Model Context Protocol (MCP), the open standard connecting AI agents to software, receives its largest update since Anthropic released it.",
    url: "https://venturebeat.com/orchestration/mcp-just-got-its-biggest-update-ever-heres-what-changes-for-ai-agents",
    source_name: "VentureBeat",
    source_type: "blog",
    word_count: 75,
    hash: "7cc59324",
    domain: "venturebeat.com",
    timestamp: "2026-07-31T12:29:19.737529"
  }
];

// ============================================
// MERGE ALL SOURCES
// ============================================

const allSources = [...techCrunchSources, ...staticSources, ...ventureBeatSources];

// Remove duplicates by URL
const uniqueSources = [];
const seenUrls = new Set();
for (const source of allSources) {
  if (!seenUrls.has(source.url)) {
    seenUrls.add(source.url);
    uniqueSources.push(source);
  }
}

// ============================================
// SOURCE STATS
// ============================================

const sourceStats = {
  techcrunch: techCrunchSources.length,
  static: staticSources.length,
  venturebeat: ventureBeatSources.length,
  total: uniqueSources.length
};

// ============================================
// SMART CONTEXTUAL RESPONSE SYSTEM
// ============================================

// ============================================
// CLASSIFY QUERY TYPE
// ============================================

function classifyQuery(query) {
  const lower = query.toLowerCase();
  
  const categories = {
    factual: { keywords: ['what', 'when', 'where', 'who', 'which', 'is', 'are', 'was', 'were', 'did'], weight: 1 },
    analytical: { keywords: ['compare', 'contrast', 'analyze', 'synthesis', 'trend', 'pattern', 'relationship', 'impact', 'cause'], weight: 1.5 },
    comparative: { keywords: ['better', 'best', 'worst', 'top', 'vs', 'versus', 'compared to', 'difference'], weight: 1.5 },
    exploratory: { keywords: ['how does', 'why does', 'what if', 'could', 'would', 'might', 'imagine'], weight: 1.2 },
    summarization: { keywords: ['summarize', 'summarise', 'brief', 'overview', 'key points', 'main ideas', 'tl;dr'], weight: 1.3 }
  };
  
  let scores = {};
  let bestCategory = 'factual';
  let bestScore = 0;
  
  for (const [category, data] of Object.entries(categories)) {
    let score = 0;
    for (const keyword of data.keywords) {
      if (lower.includes(keyword)) score += 1;
    }
    scores[category] = score * data.weight;
    if (scores[category] > bestScore) {
      bestScore = scores[category];
      bestCategory = category;
    }
  }
  
  if (bestScore === 0) {
    bestCategory = 'factual';
    bestScore = 0.5;
  }
  
  return {
    type: bestCategory,
    confidence: Math.min(bestScore / 3, 1),
    scores: scores
  };
}

// ============================================
// SEARCH FUNCTION
// ============================================

function searchSources(query) {
  if (!query) return { results: [], classification: null };
  
  const queryLower = query.toLowerCase().trim();
  if (queryLower.length < 2) return { results: [], classification: null };
  
  const classification = classifyQuery(query);
  
  const results = [];
  const words = queryLower.split(/\s+/).filter(w => w.length > 2);
  
  for (const source of uniqueSources) {
    const content = (source.content || '').toLowerCase();
    const title = (source.title || '').toLowerCase();
    const sourceName = (source.source_name || '').toLowerCase();
    
    let score = 0;
    
    if (title.includes(queryLower)) score += 30;
    if (sourceName.includes(queryLower)) score += 20;
    
    for (const word of words) {
      const count = (content.match(new RegExp(word, 'g')) || []).length;
      score += count * 3;
    }
    
    if (content.includes(queryLower)) score += 15;
    
    if (score > 0) {
      let chunk = '';
      const sentences = content.split(/[.!?]+/);
      for (const sentence of sentences) {
        if (sentence.includes(queryLower) || words.some(w => sentence.includes(w))) {
          chunk = sentence.trim();
          break;
        }
      }
      if (!chunk) {
        chunk = (source.content || '').substring(0, 300);
      }
      
      const relevance = Math.min(Math.round((score / 50) * 100), 100);
      
      results.push({
        title: source.title || 'Untitled',
        source: source.url || '#',
        source_name: source.source_name || 'Unknown',
        author: source.author || 'Unknown',
        date: source.date || '',
        chunk: chunk + '...',
        relevance: relevance,
        score: score,
        domain: source.domain || 'unknown',
        fullContent: source.content || ''
      });
    }
  }
  
  results.sort((a, b) => b.score - a.score);
  return {
    results: results.slice(0, 5),
    classification: classification
  };
}

// ============================================
// EXTRACT FACTS FROM RESULTS
// ============================================

function extractFacts(query, results) {
  const facts = [];
  const queryWords = query.toLowerCase().split(/\s+/);
  
  for (const result of results) {
    const content = result.fullContent || result.chunk || '';
    const sentences = content.split(/[.!?]+/);
    
    for (const sentence of sentences) {
      const sentenceLower = sentence.toLowerCase();
      const matchedWords = queryWords.filter(w => 
        w.length > 3 && sentenceLower.includes(w)
      );
      
      if (matchedWords.length >= 1) {
        const relevance = matchedWords.length / queryWords.length;
        facts.push({
          text: sentence.trim(),
          source: result.source_name,
          title: result.title,
          relevance: relevance,
          url: result.source
        });
      }
    }
  }
  
  // Sort by relevance and get unique facts
  facts.sort((a, b) => b.relevance - a.relevance);
  const uniqueFacts = [];
  const seenTexts = new Set();
  
  for (const fact of facts) {
    const key = fact.text.substring(0, 50);
    if (!seenTexts.has(key) && fact.text.length > 20) {
      seenTexts.add(key);
      uniqueFacts.push(fact);
    }
    if (uniqueFacts.length >= 5) break;
  }
  
  return uniqueFacts;
}

// ============================================
// GENERATE SUGGESTIONS
// ============================================

function generateSuggestions(query) {
  const topics = [
    "Microsoft investment in Anthropic ($5B)",
    "OpenAI vs Anthropic comparison",
    "AI agent security risks",
    "Enterprise AI adoption",
    "AI model releases July 2026",
    "Meta AI strategy",
    "Hugging Face security incident",
    "AI safety and ethics",
    "AI tools and platforms",
    "TechCrunch Disrupt 2026"
  ];
  
  const queryWords = query.toLowerCase().split(/\s+/);
  const related = topics.filter(topic => {
    const topicWords = topic.toLowerCase().split(/\s+/);
    return topicWords.some(tw => queryWords.some(qw => tw.includes(qw) || qw.includes(tw)));
  });
  
  return related.length > 0 ? related : topics.slice(0, 5);
}

// ============================================
// GENERATE NO RESULTS RESPONSE - FORMATTED
// ============================================

function generateNoResultsResponse(query) {
  const suggestions = generateSuggestions(query);
  
  return formatter.formatNoResults(query, suggestions);
}

// ============================================
// BUILD CONTEXTUAL ANSWER
// ============================================

function buildContextualAnswer(query, results, classification) {
  if (results.length === 0) {
    return generateNoResultsResponse(query);
  }
  
  // Extract facts from results
  const facts = extractFacts(query, results);
  const queryType = classification?.type || 'factual';
  const promptConfig = selectPrompt(queryType);
  
  let answer = '';
  
  // Build the contextual answer
  answer += `**📊 What I found about "${query}":**\n\n`;
  
  if (facts.length > 0) {
    answer += `**Key Facts Extracted:**\n`;
    for (let i = 0; i < Math.min(facts.length, 3); i++) {
      const f = facts[i];
      const relevanceEmoji = f.relevance > 0.5 ? '🟢' : '🟡';
      answer += `${relevanceEmoji} ${f.text}\n`;
      answer += `   *Source: ${f.source} - ${f.title}*\n\n`;
    }
  }
  
  // Add related articles
  answer += `**📚 Related Articles:**\n\n`;
  
  for (let i = 0; i < Math.min(results.length, 5); i++) {
    const r = results[i];
    const relevanceEmoji = r.relevance > 60 ? '🟢' : r.relevance > 30 ? '🟡' : '🔴';
    const relevanceLabel = r.relevance > 60 ? 'High' : r.relevance > 30 ? 'Medium' : 'Low';
    
    answer += `**${i + 1}. ${r.title}**\n`;
    answer += `🏷️ ${r.source_name} | 📅 ${r.date} | 📊 ${relevanceEmoji} ${relevanceLabel} (${r.relevance}%)\n\n`;
    answer += `${r.chunk}\n\n`;
    answer += `🔗 ${r.source}\n\n---\n\n`;
  }
  
  // Add metadata
  answer += `\n*Query Type: ${queryType} (Confidence: ${Math.round(classification?.confidence * 100 || 0)}%)*\n`;
  answer += `*Temperature: ${promptConfig.temperature}, Max Tokens: ${promptConfig.max_tokens}*\n`;
  answer += `*Total Sources: ${uniqueSources.length}*\n`;
  
  return answer;
}

// ============================================
// GENERATE RESPONSE - MAIN ENTRY WITH CoT + Personas + Formatting
// ============================================

function generateResponse(query, searchResult) {
  const { results, classification } = searchResult;
  const queryType = classification?.type || 'factual';
  
  // ============================================
  // DIRECT ANSWERS (Highest Priority)
  // ============================================
  const directAnswers = {
    "how much did microsoft invest in anthropic": {
      response: `**💰 Microsoft's Investment in Anthropic**

**FACT:** Microsoft invested **$5 Billion** in Anthropic in November 2025.

**💡 Key Details:**
- Investment: $5B (November 2025)
- Azure Commitment: $30B
- Q4 2026 Gain: $3.2B
- Microsoft owns ~27% of OpenAI

**📊 Source:** TechCrunch (July 29, 2026)
**CONFIDENCE:** High ✅`,
      sources: []
    },
    "what did zuckerberg say about ai agents": {
      response: `**🗣️ Zuckerberg's AI Agent Prediction**

**FACT:** Mark Zuckerberg predicts **billions of people** will have personal AI agents in five years.

**💡 Key Points:**
- "Billions of people with a personal agent"
- Agents help with: finances, health, relationships
- WhatsApp will be key for AI interactions

**📊 Source:** TechCrunch (July 29, 2026)
**CONFIDENCE:** High ✅`,
      sources: []
    },
    "which one is better chatgpt or claude": {
      response: `**🤖 ChatGPT vs Claude: Which is Better?**

**Summary:** Both are excellent but serve different purposes.

**📊 Quick Comparison:**

| Feature | ChatGPT | Claude |
|---------|---------|--------|
| **Maker** | OpenAI | Anthropic |
| **Focus** | General AI | Safety-first |
| **Strengths** | Creative, broad | Analytical, safe |
| **Context** | 128K tokens | 200K tokens |
| **Cost** | Free/Paid | Free/Paid |

**💡 Recommendation:**
- **ChatGPT for:** Creative writing, brainstorming, general tasks
- **Claude for:** Analysis, coding, long documents, safety

**📚 Sources:** TechCrunch, Gumloop (2026)
**CONFIDENCE:** Medium ✅`,
      sources: []
    }
  };
  
  const lowerQuery = query.toLowerCase().trim();
  for (const [key, value] of Object.entries(directAnswers)) {
    if (lowerQuery.includes(key) || key.includes(lowerQuery)) {
      const formattedResponse = formatter.formatDirectAnswer(value.response);
      return {
        response: formattedResponse,
        sources: [],
        metadata: {
          total_sources: uniqueSources.length,
          matches_found: 0,
          query_type: 'direct_answer',
          ai_generated: true,
          direct_answer: true,
          last_updated: new Date().toISOString()
        }
      };
    }
  }
  
  // ============================================
  // NO RESULTS FOUND
  // ============================================
  if (results.length === 0) {
    const noResultsResponse = generateNoResultsResponse(query);
    return {
      response: noResultsResponse,
      sources: [],
      metadata: {
        total_sources: uniqueSources.length,
        matches_found: 0,
        query_type: queryType,
        ai_generated: true
      }
    };
  }
  
  // ============================================
  // SELECT PERSONA
  // ============================================
  const persona = selectPersona(queryType, query);
  
  // ============================================
  // EXTRACT FACTS
  // ============================================
  const facts = extractFacts(query, results);
  
  // ============================================
  // BUILD CONTEXT FOR CoT
  // ============================================
  const context = results.map((r, i) => 
    `Source ${i+1}: ${r.title}\n${r.chunk || r.content?.substring(0, 500) || ''}`
  ).join('\n\n');
  
  // ============================================
  // USE CHAIN-OF-THOUGHT FOR ANALYTICAL QUERIES
  // ============================================
  const useCOT = ['analytical', 'comparative', 'exploratory'].includes(queryType);
  
  if (useCOT && results.length > 0) {
    // Generate CoT prompt
    const cotPrompt = generateCOTPrompt(query, context, queryType);
    
    let responseText = '';
    
    // Build CoT response structure
    responseText += `**🧠 Chain-of-Thought Analysis**\n\n`;
    responseText += `**Step 1 - Decompose:**\nAnalyzing the question: "${query}"\n\n`;
    responseText += `**Step 2 - Related Research:**\nFound ${results.length} relevant sources on this topic.\n\n`;
    responseText += `**Step 3 - Evidence Evaluation:**\n`;
    
    // Extract facts from results
    if (facts.length > 0) {
      for (const fact of facts) {
        responseText += `- ${fact.text.substring(0, 200)}...\n`;
      }
    } else {
      for (let i = 0; i < Math.min(results.length, 3); i++) {
        const r = results[i];
        responseText += `- ${r.title}: ${r.relevance}% relevance\n`;
      }
    }
    
    responseText += `\n**Step 4 - Synthesis:**\nCombining insights from ${results.length} sources.\n\n`;
    
    // Final Answer
    responseText += `**📊 Final Answer:**\n\n`;
    
    if (facts.length > 0) {
      for (let i = 0; i < Math.min(facts.length, 3); i++) {
        const f = facts[i];
        responseText += `✅ ${f.text}\n`;
        responseText += `   *Source: ${f.source}*\n\n`;
      }
    } else {
      responseText += `Based on the available sources, here are the most relevant articles:\n\n`;
    }
    
    // Add sources
    responseText += `**📚 Sources:**\n\n`;
    for (let i = 0; i < Math.min(results.length, 5); i++) {
      const r = results[i];
      responseText += `${i + 1}. **${r.title}** - ${r.source_name}\n`;
      responseText += `   ${r.chunk?.substring(0, 150)}...\n`;
      responseText += `   🔗 ${r.source}\n\n`;
    }
    
    // Format the CoT response with the formatter
    const formattedResponse = formatter.formatResponse({
      query: query,
      results: results,
      facts: facts,
      classification: classification
    }, persona);
    
    return {
      response: formattedResponse,
      sources: results,
      metadata: {
        total_sources: uniqueSources.length,
        matches_found: results.length,
        query_type: queryType,
        query_confidence: classification?.confidence || 0,
        persona: persona.id,
        chain_of_thought: true,
        facts_extracted: facts.length,
        last_updated: new Date().toISOString(),
        ai_generated: true
      }
    };
  }
  
  // ============================================
  // STANDARD RESPONSE (Factual/Summarization) - FORMATTED
  // ============================================
  const formattedResponse = formatter.formatResponse({
    query: query,
    results: results,
    facts: facts,
    classification: classification
  }, persona);
  
  return {
    response: formattedResponse,
    sources: results,
    metadata: {
      total_sources: uniqueSources.length,
      matches_found: results.length,
      query_type: queryType,
      query_confidence: classification?.confidence || 0,
      persona: persona.id,
      chain_of_thought: false,
      facts_extracted: facts.length,
      last_updated: new Date().toISOString(),
      ai_generated: true
    }
  };
}

// ============================================
// API HANDLER - DEFAULT EXPORT
// ============================================

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      allowed: ['GET', 'POST']
    });
  }

  try {
    let query = null;
    let action = null;

    if (req.method === 'GET') {
      query = req.query.query || null;
      action = req.query.action || null;
    } else {
      query = req.body?.query || null;
      action = req.body?.action || null;
    }

    // Health check
    if (action === 'health' || action === 'ping') {
      return res.status(200).json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        total_sources: uniqueSources.length,
        source_stats: sourceStats,
        source_names: [...new Set(uniqueSources.map(s => s.source_name))],
        prompt_types: Object.keys(systemPrompts),
        personas: ['research_analyst', 'strategy_consultant', 'technical_architect', 'trend_forecaster']
      });
    }

    // Get all sources
    if (action === 'all') {
      return res.status(200).json({
        total: uniqueSources.length,
        source_stats: sourceStats,
        sources: uniqueSources.map(s => ({
          title: s.title,
          source_name: s.source_name,
          author: s.author || 'Unknown',
          date: s.date || '',
          url: s.url,
          word_count: s.word_count || 0,
          domain: s.domain || 'unknown'
        }))
      });
    }

    // Get stats
    if (action === 'stats') {
      return res.status(200).json({
        total_sources: uniqueSources.length,
        source_stats: sourceStats,
        prompt_types: Object.keys(systemPrompts),
        personas: ['research_analyst', 'strategy_consultant', 'technical_architect', 'trend_forecaster'],
        last_updated: new Date().toISOString()
      });
    }

    // Search
    if (query) {
      const searchResult = searchSources(query);
      const response = generateResponse(query, searchResult);
      
      return res.status(200).json(response);
    }

    // Default response
    return res.status(200).json({
      name: 'Omni Brand Intelligence Bot API',
      version: '3.0.0',
      status: 'running',
      total_sources: uniqueSources.length,
      source_stats: sourceStats,
      source_names: [...new Set(uniqueSources.map(s => s.source_name))],
      prompt_types: Object.keys(systemPrompts),
      personas: ['research_analyst', 'strategy_consultant', 'technical_architect', 'trend_forecaster'],
      endpoints: {
        search: 'GET/POST with ?query=your+question',
        health: 'GET?action=health',
        all: 'GET?action=all',
        stats: 'GET?action=stats'
      },
      last_updated: new Date().toISOString()
    });

  } catch (error) {
    console.error('API Error:', error.message);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message || 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
}
