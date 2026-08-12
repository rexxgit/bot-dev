// api/data.js - Complete Self-Contained API with Human-Written Style

// ============================================
// IMPORTS - All from lib/
// ============================================

import { semanticChunk } from '../lib/chunking/semantic.js';
import { systemPrompts, selectPrompt } from '../lib/prompts/system.js';
import { getFewShotExamples } from '../lib/prompts/examples.js';
import { selectTemplate } from '../lib/prompts/templates.js';
import { generateCOTPrompt } from '../lib/prompts/cot.js';
import { selectPersona } from '../lib/prompts/personas.js';
import { intentDetector } from '../lib/response/intent.js';
import { confidenceScorer } from '../lib/response/confidence.js';
import { responseFormatter } from '../lib/response/formatter.js';
import { responseCache } from '../lib/response/cache.js';
import { advancedSearch } from '../lib/search/hybrid.js';
import { createGrokInstance } from '../lib/grok/index.js';
import { buildGrokRequest } from '../lib/grok/prompts.js';

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

const uniqueSources = [];
const seenUrls = new Set();
for (const source of allSources) {
  if (!seenUrls.has(source.url)) {
    seenUrls.add(source.url);
    uniqueSources.push(source);
  }
}

const sourceStats = {
  techcrunch: techCrunchSources.length,
  static: staticSources.length,
  venturebeat: ventureBeatSources.length,
  total: uniqueSources.length
};

// ============================================
// SEARCH FUNCTIONS
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

function searchSources(query) {
  if (!query) return { results: [], classification: null };
  
  const queryLower = query.toLowerCase().trim();
  if (queryLower.length < 2) return { results: [], classification: null };
  
  const classification = classifyQuery(query);
  const searchResults = advancedSearch.search(query, uniqueSources);
  
  const results = searchResults.slice(0, 5).map(item => ({
    title: item.source?.title || 'Untitled',
    source: item.source?.url || '#',
    source_name: item.source?.source_name || 'Unknown',
    author: item.source?.author || 'Unknown',
    date: item.source?.date || '',
    chunk: (item.bestChunk || item.source?.content || '').substring(0, 500) + '...',
    relevance: Math.min(Math.round((item.hybridScore || 0) * 100), 100),
    score: item.hybridScore || 0,
    domain: item.source?.domain || 'unknown',
    fullContent: item.source?.content || '',
    methodCount: item.methodCount || 1
  }));
  
  return {
    results: results,
    classification: classification
  };
}

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

function generateNoResultsResponse(query) {
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
  
  const suggestions = related.length > 0 ? related : topics.slice(0, 5);
  
  return `NO RESULTS FOUND

Query: "${query}"

Data Available:
- TechCrunch AI articles: ${techCrunchSources.length}
- VentureBeat AI articles: ${ventureBeatSources.length}
- Static sources: ${staticSources.length}
- Total: ${uniqueSources.length} articles

Try asking about:
${suggestions.map(s => `- ${s}`).join('\n')}

Available Sources:
${[...new Set(uniqueSources.map(s => `- ${s.source_name}`))].join('\n')}`;
}

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
// SEMANTIC ENHANCEMENT SYSTEM
// ============================================

function extractEntities(text) {
  const entities = [];
  const patterns = {
    company: /(Microsoft|OpenAI|Anthropic|Meta|Google|Amazon|Apple|Tesla|NVIDIA|AMD|Intel|IBM|Oracle|Salesforce|Adobe|Cisco|Dell|HP|Samsung|Sony|XAI|Grok|Claude|ChatGPT)/g,
    person: /(Satya Nadella|Sam Altman|Mark Zuckerberg|Dario Amodei|Elon Musk|Bill Gates|Tim Cook|Jeff Bezos|Sundar Pichai|Satya|Nadella|Altman|Zuckerberg|Amodei|Musk|Gates|Cook|Bezos|Pichai)/g,
    model: /(GPT-5\.6|GPT-4|Claude Sonnet|Claude Opus|Grok 4\.5|Grok 3|LLaMA|Gemini|Gemma|Mistral|Mixtral)/g,
    topic: /(AI|artificial intelligence|machine learning|deep learning|neural network|agent|automation|safety|security|investment|enterprise|startup)/gi
  };
  
  for (const [type, pattern] of Object.entries(patterns)) {
    const matches = text.match(pattern) || [];
    for (const match of matches) {
      if (!entities.includes(match)) {
        entities.push(match);
      }
    }
  }
  
  return [...new Set(entities)];
}

function enhanceSemanticContext(query, grokResponse, results) {
  if (!grokResponse || !results || results.length === 0) {
    return grokResponse;
  }

  const entities = extractEntities(query);
  let enhancedResponse = grokResponse;
  
  for (const entity of entities) {
    if (!enhancedResponse.toLowerCase().includes(entity.toLowerCase())) {
      const relevantSource = results.find(r => 
        (r.fullContent || r.content || '').toLowerCase().includes(entity.toLowerCase())
      );
      if (relevantSource) {
        const contextChunk = relevantSource.chunk || relevantSource.fullContent?.substring(0, 300) || '';
        if (contextChunk) {
          enhancedResponse += `\n\nAbout ${entity}: ${contextChunk}`;
          break;
        }
      }
    }
  }
  
  return enhancedResponse;
}

function scoreResponseQuality(response, sources, confidence) {
  let score = 0;
  
  const wordCount = (response || '').split(' ').length;
  if (wordCount > 200) score += 30;
  else if (wordCount > 100) score += 20;
  else if (wordCount > 50) score += 10;
  
  if (sources && sources.length >= 3) score += 25;
  else if (sources && sources.length >= 2) score += 15;
  else if (sources && sources.length >= 1) score += 8;
  
  if (confidence && confidence.score >= 80) score += 25;
  else if (confidence && confidence.score >= 50) score += 15;
  else if (confidence && confidence.score >= 30) score += 10;
  
  const entities = extractEntities(response || '');
  if (entities.length >= 3) score += 20;
  else if (entities.length >= 2) score += 15;
  else if (entities.length >= 1) score += 10;
  
  return {
    score: Math.min(score, 100),
    level: score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : score >= 40 ? 'Fair' : 'Needs Improvement',
    breakdown: {
      completeness: Math.min((wordCount > 200 ? 30 : wordCount > 100 ? 20 : 10), 30),
      sources: Math.min((sources && sources.length >= 3 ? 25 : sources && sources.length >= 2 ? 15 : 8), 25),
      confidence: Math.min((confidence && confidence.score >= 80 ? 25 : confidence && confidence.score >= 50 ? 15 : 10), 25),
      entities: Math.min((entities.length >= 3 ? 20 : entities.length >= 2 ? 15 : 10), 20)
    }
  };
}

// ============================================
// HUMAN-WRITTEN STYLE FORMATTER - Embedded Links
// ============================================

function formatHumanResponse(query, response, sources, confidence, qualityScore) {
  let output = [];
  
  // ============================================
  // RESPONSE BODY - Clean, indented paragraphs
  // ============================================
  if (response) {
    let cleanResponse = response;
    cleanResponse = cleanResponse.replace(/\*\*/g, '');
    cleanResponse = cleanResponse.replace(/\*/g, '');
    cleanResponse = cleanResponse.replace(/Summary:|Executive Summary:|Overview:/gi, '');
    cleanResponse = cleanResponse.replace(/Key Facts:|What you need to know:/gi, '');
    cleanResponse = cleanResponse.replace(/•/g, '  -');
    
    const paragraphs = cleanResponse.split('\n\n');
    let formattedParagraphs = [];
    
    for (const para of paragraphs) {
      if (para.trim()) {
        const words = para.trim().split(' ');
        let line = '';
        let wrappedLines = [];
        for (const word of words) {
          if ((line + word).length > 70) {
            wrappedLines.push(`  ${line.trim()}`);
            line = '';
          }
          line += word + ' ';
        }
        if (line.trim()) {
          wrappedLines.push(`  ${line.trim()}`);
        }
        formattedParagraphs.push(wrappedLines.join('\n'));
      }
    }
    
    output.push(formattedParagraphs.join('\n\n'));
    output.push('');
  }
  
  // ============================================
  // KEY FACTS - Bullet points with embedded links
  // ============================================
  const facts = extractFacts(query, sources || []);
  if (facts && facts.length > 0) {
    output.push('  Key findings:');
    for (let i = 0; i < Math.min(facts.length, 4); i++) {
      const f = facts[i];
      let factText = f.text;
      if (!factText.endsWith('.') && !factText.endsWith('!') && !factText.endsWith('?')) {
        factText += '.';
      }
      
      const sourceMatch = sources.find(s => s.source_name === f.source);
      const sourceUrl = sourceMatch?.source || sourceMatch?.url || '#';
      const sourceDisplay = sourceMatch?.source_name || f.source || 'Unknown';
      const linkedSource = `[${sourceDisplay}](${sourceUrl})`;
      
      output.push(`    ${i+1}. ${factText}`);
      output.push(`       Source: ${linkedSource}`);
      output.push('');
    }
  }
  
  // ============================================
  // CONFIDENCE - Natural language
  // ============================================
  if (confidence) {
    const score = confidence.score || 0;
    let confidenceText = '';
    
    if (score >= 80) {
      confidenceText = 'I have high confidence in this information. The sources are consistent and authoritative.';
    } else if (score >= 50) {
      confidenceText = 'I have moderate confidence in this information. The data is solid but not overwhelming.';
    } else {
      confidenceText = 'I have limited confidence in this information. The evidence is suggestive but not conclusive.';
    }
    
    output.push(`  ${confidenceText}`);
    output.push('');
  }
  
  // ============================================
  // SOURCES - Embedded links
  // ============================================
  if (sources && sources.length > 0) {
    output.push('  References:');
    for (let i = 0; i < Math.min(sources.length, 4); i++) {
      const s = sources[i];
      const url = s.source || s.url || '#';
      const sourceName = s.source_name || 'Unknown';
      const linkedSource = `[${sourceName}](${url})`;
      
      output.push(`    ${i+1}. ${s.title || 'Untitled'}`);
      output.push(`       ${linkedSource}${s.date ? `, ${s.date}` : ''}`);
      output.push('');
    }
  }
  
  // ============================================
  // QUALITY NOTE - Brief and natural
  // ============================================
  if (qualityScore) {
    const level = qualityScore.level || 'Good';
    const score = qualityScore.score || 0;
    output.push(`  Note: This response is rated as ${level.toLowerCase()} (${score}%) based on source quality and coverage.`);
  }
  
  return output.join('\n');
}

// ============================================
// GENERATE RESPONSE - ENHANCED WITH HUMAN FORMATTING
// ============================================

async function generateResponse(query, searchResult) {
  const { results, classification } = searchResult;
  const queryType = classification?.type || 'factual';
  
  const cached = responseCache.get(query);
  if (cached) {
    return cached;
  }
  
  const intentInfo = intentDetector.detectIntent(query);
  
  let context = '';
  if (results && results.length > 0) {
    context = results.map((r, i) => 
      `Source ${i+1}: ${r.title}\n${r.chunk || r.fullContent?.substring(0, 500) || ''}`
    ).join('\n\n');
  } else {
    context = 'No specific sources found. Provide a general response based on your knowledge.';
  }
  
  const confidence = results && results.length > 0 
    ? confidenceScorer.calculateConfidence(results, results, classification)
    : { level: 'Low', score: 20, breakdown: { relevance: 0, authority: 0, diversity: 0 } };
  
  let grokResponse = null;
  try {
    const apiKey = process.env.GROQ_API_KEY;
    if (apiKey) {
      const grokRequest = buildGrokRequest(query, context, intentInfo.primary);
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: grokRequest.messages,
          temperature: grokRequest.temperature,
          max_tokens: grokRequest.maxTokens
        })
      });

      if (response.ok) {
        const data = await response.json();
        grokResponse = data.choices[0].message.content;
      }
    }
  } catch (error) {
    console.warn('Grok failed:', error.message);
    grokResponse = null;
  }
  
  let enhancedResponse = grokResponse;
  if (grokResponse) {
    enhancedResponse = enhanceSemanticContext(query, grokResponse, results);
  }
  
  const qualityScore = scoreResponseQuality(
    enhancedResponse || '', 
    results || [], 
    confidence
  );
  
  const formattedOutput = formatHumanResponse(
    query,
    enhancedResponse || 'Unable to generate a response at this time.',
    results || [],
    confidence,
    qualityScore
  );
  
  const finalResponse = {
    response: formattedOutput,
    sources: results || [],
    metadata: {
      total_sources: uniqueSources.length,
      matches_found: results?.length || 0,
      query_type: queryType,
      query_confidence: classification?.confidence || 0,
      intent: intentInfo.primary,
      intent_confidence: Math.round(intentInfo.confidence * 100),
      confidence: confidence,
      quality_score: qualityScore,
      ai_generated: true,
      model: grokResponse ? 'grok' : 'fallback',
      formatted: true,
      enhanced: true,
      human_style: true,
      last_updated: new Date().toISOString()
    }
  };
  
  responseCache.set(query, finalResponse);
  return finalResponse;
}

// ============================================
// API HANDLER
// ============================================

export default async function handler(req, res) {
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

  let query = null;
  let action = null;

  if (req.method === 'GET') {
    query = req.query.query || null;
    action = req.query.action || null;
  } else {
    query = req.body?.query || null;
    action = req.body?.action || null;
  }

  if (action === 'health' || action === 'ping') {
    return res.status(200).json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      total_sources: uniqueSources.length,
      source_stats: sourceStats,
      source_names: [...new Set(uniqueSources.map(s => s.source_name))],
      grok_available: !!process.env.GROQ_API_KEY,
      cache_stats: responseCache.getStats(),
      features: ['grok_ai', 'intent_detection', 'confidence_scoring', 'advanced_search', 'human_written_style', 'embedded_links', 'semantic_enhancement', 'quality_scoring']
    });
  }

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

  if (action === 'stats') {
    return res.status(200).json({
      total_sources: uniqueSources.length,
      source_stats: sourceStats,
      grok_available: !!process.env.GROQ_API_KEY,
      cache_stats: responseCache.getStats(),
      features: ['human_written_style', 'embedded_links', 'semantic_enhancement', 'quality_scoring'],
      last_updated: new Date().toISOString()
    });
  }

  if (action === 'clear-cache') {
    responseCache.clear();
    return res.status(200).json({
      status: 'ok',
      message: 'Cache cleared',
      cache_stats: responseCache.getStats()
    });
  }

  if (query) {
    const searchResult = searchSources(query);
    const response = await generateResponse(query, searchResult);
    return res.status(200).json(response);
  }

  return res.status(200).json({
    name: 'Omni Brand Intelligence Bot API',
    version: '4.3.0',
    status: 'running',
    features: ['grok_ai', 'intent_detection', 'confidence_scoring', 'advanced_search', 'human_written_style', 'embedded_links', 'semantic_enhancement', 'quality_scoring'],
    total_sources: uniqueSources.length,
    source_stats: sourceStats,
    source_names: [...new Set(uniqueSources.map(s => s.source_name))],
    grok_available: !!process.env.GROQ_API_KEY,
    cache_stats: responseCache.getStats(),
    endpoints: {
      search: 'GET/POST with ?query=your+question',
      health: 'GET?action=health',
      all: 'GET?action=all',
      stats: 'GET?action=stats',
      clear_cache: 'GET?action=clear-cache'
    },
    last_updated: new Date().toISOString()
  });
}
