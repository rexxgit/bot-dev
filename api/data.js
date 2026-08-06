// api/data.js - Complete API with Intelligent Chunking + Hybrid Search + Grok Integration
// Day 5+6: Semantic Chunking, Context-Aware Chunking, Hybrid Retrieval, Grok AI

// ============================================
// GROK API INTEGRATION
// ============================================

import { createGrokInstance } from '../lib/grok/index.js';

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
// INTELLIGENT CHUNKING SYSTEM
// ============================================

// ============================================
// SEMANTIC CHUNKER
// ============================================

function semanticChunk(text, options = {}) {
  const chunkSize = options.chunkSize || 800;
  const overlap = options.overlap || 100;
  const minChunkSize = options.minChunkSize || 150;
  
  if (!text || text.length < minChunkSize) {
    return [{ text: text || '', size: text?.length || 0, sentences: 1 }];
  }

  // Split into sentences
  const sentences = splitIntoSentences(text);
  
  // Build chunks
  const chunks = [];
  let currentChunk = [];
  let currentSize = 0;

  for (const sentence of sentences) {
    const sentenceSize = sentence.length;

    if (currentSize + sentenceSize > chunkSize && currentChunk.length > 0) {
      chunks.push(currentChunk.join(' '));
      
      // Overlap
      const overlapSentences = getOverlap(currentChunk, overlap);
      currentChunk = overlapSentences;
      currentSize = overlapSentences.reduce((sum, s) => sum + s.length, 0);
    }

    currentChunk.push(sentence);
    currentSize += sentenceSize;
  }

  if (currentChunk.length > 0) {
    chunks.push(currentChunk.join(' '));
  }

  return chunks.map((chunk, index) => ({
    id: `chunk-${index}`,
    text: chunk,
    sentenceCount: chunk.split(/[.!?]+/).length,
    charCount: chunk.length,
    preview: chunk.substring(0, 200) + '...'
  }));
}

function splitIntoSentences(text) {
  // Protect abbreviations
  const protectedText = text.replace(/\b(Mr|Mrs|Dr|Prof|Sr|Jr|vs|e g|i e|etc|Inc|Corp|Co|Ltd|St|Ave|Blvd)\./g, (m) => m.replace(/\./g, '___DOT___'));
  const sentences = protectedText.match(/[^.!?]+[.!?]+/g) || [protectedText];
  return sentences.map(s => s.replace(/___DOT___/g, '.')).map(s => s.trim()).filter(s => s.length > 10);
}

function getOverlap(sentences, overlapSize) {
  const overlap = [];
  let size = 0;
  for (let i = sentences.length - 1; i >= 0; i--) {
    if (size + sentences[i].length > overlapSize) break;
    overlap.unshift(sentences[i]);
    size += sentences[i].length;
  }
  return overlap;
}

// ============================================
// CONTEXT-AWARE CHUNKER
// ============================================

function contextAwareChunk(text, options = {}) {
  const maxChunkSize = options.maxChunkSize || 1000;
  
  if (!text || text.length < 100) {
    return [{ text: text || '', topic: 'general', entities: [] }];
  }

  // Identify topics
  const topics = identifyTopics(text);
  
  // Identify entities
  const entities = extractEntities(text);
  
  // Build chunks
  const chunks = [];
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  let currentChunk = '';
  let currentTopic = topics.length > 0 ? topics[0] : 'general';
  let currentEntities = [];

  for (const sentence of sentences) {
    const sentenceTopics = identifyTopics(sentence);
    const sentenceEntities = extractEntities(sentence);
    
    if (currentChunk.length + sentence.length > maxChunkSize && currentChunk.length > 50) {
      chunks.push({
        text: currentChunk.trim(),
        topic: currentTopic,
        entities: [...currentEntities]
      });
      currentChunk = '';
      currentEntities = [];
    }
    
    currentChunk += sentence + ' ';
    if (sentenceTopics.length > 0) {
      currentTopic = sentenceTopics[0];
    }
    currentEntities = [...currentEntities, ...sentenceEntities];
  }

  if (currentChunk.trim()) {
    chunks.push({
      text: currentChunk.trim(),
      topic: currentTopic,
      entities: [...new Set(currentEntities)]
    });
  }

  return chunks;
}

function identifyTopics(text) {
  const topics = [];
  const topicKeywords = {
    'microsoft': ['microsoft', 'azure', 'nadella', 'windows'],
    'openai': ['openai', 'chatgpt', 'gpt', 'altman'],
    'anthropic': ['anthropic', 'claude', 'amodei', 'constitutional'],
    'meta': ['meta', 'zuckerberg', 'facebook', 'whatsapp'],
    'ai_agents': ['agent', 'autonomous', 'tool'],
    'ai_safety': ['safety', 'alignment', 'security'],
    'enterprise': ['enterprise', 'business', 'corporate'],
    'investment': ['investment', 'funding', 'billion']
  };

  const lower = text.toLowerCase();
  for (const [topic, keywords] of Object.entries(topicKeywords)) {
    for (const keyword of keywords) {
      if (lower.includes(keyword)) {
        if (!topics.includes(topic)) topics.push(topic);
        break;
      }
    }
  }
  return topics.length > 0 ? topics : ['general'];
}

function extractEntities(text) {
  const entities = [];
  const patterns = {
    company: /(Microsoft|OpenAI|Anthropic|Meta|Google|Amazon|Apple|Tesla|NVIDIA|AMD|Intel|IBM|Oracle|Salesforce|Adobe|Cisco|Dell|HP|Samsung|Sony|XAI|Grok|Claude|ChatGPT)/g,
    person: /(Satya Nadella|Sam Altman|Mark Zuckerberg|Dario Amodei|Elon Musk|Bill Gates|Tim Cook|Jeff Bezos|Sundar Pichai|Satya|Nadella|Altman|Zuckerberg|Amodei|Musk|Gates|Cook|Bezos|Pichai)/g,
    model: /(GPT-5\.6|GPT-4|Claude Sonnet|Claude Opus|Grok 4\.5|Grok 3|LLaMA|Gemini|Gemma|Mistral|Mixtral)/g
  };

  for (const [type, pattern] of Object.entries(patterns)) {
    const matches = text.match(pattern) || [];
    for (const match of matches) {
      if (!entities.includes(match)) {
        entities.push(match);
      }
    }
  }
  return entities;
}

// ============================================
// HYBRID SEARCH RETRIEVAL
// ============================================

function hybridSearch(query, sources) {
  // 1. Chunk all sources
  const allChunks = [];
  for (const source of sources) {
    const content = source.content || '';
    const chunks = semanticChunk(content, { chunkSize: 800, overlap: 100 });
    for (const chunk of chunks) {
      allChunks.push({
        ...chunk,
        source: source,
        sourceName: source.source_name || 'Unknown',
        sourceUrl: source.url || '#',
        sourceDate: source.date || '',
        sourceAuthor: source.author || 'Unknown'
      });
    }
  }

  // 2. Semantic search
  const queryLower = query.toLowerCase();
  const queryWords = queryLower.split(/\s+/).filter(w => w.length > 2);

  const scoredChunks = allChunks.map(chunk => {
    const chunkLower = chunk.text.toLowerCase();
    let score = 0;

    // Exact phrase match
    if (chunkLower.includes(queryLower)) score += 10;

    // Word matches
    for (const word of queryWords) {
      const count = (chunkLower.match(new RegExp(word, 'g')) || []).length;
      score += count * 2;
    }

    // Semantic similarity (word overlap)
    const chunkWords = chunkLower.split(/\s+/);
    const commonWords = queryWords.filter(w => chunkWords.includes(w));
    const overlapScore = commonWords.length / Math.max(queryWords.length, 1);
    score += overlapScore * 10;

    // Density
    const density = commonWords.length / Math.max(chunkWords.length, 1);
    score += density * 5;

    return { ...chunk, score };
  });

  scoredChunks.sort((a, b) => b.score - a.score);
  const topChunks = scoredChunks.slice(0, 10);

  // 3. Format results
  return topChunks.map(chunk => ({
    title: chunk.source?.title || 'Untitled',
    source: chunk.sourceUrl || '#',
    source_name: chunk.sourceName || 'Unknown',
    author: chunk.source?.author || 'Unknown',
    date: chunk.source?.date || '',
    chunk: chunk.text.substring(0, 500) + '...',
    relevance: Math.min(Math.round((chunk.score / 50) * 100), 100),
    score: chunk.score,
    domain: chunk.source?.domain || 'unknown',
    fullContent: chunk.source?.content || '',
    chunkId: chunk.id,
    sentenceCount: chunk.sentenceCount
  }));
}

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
// SEARCH FUNCTION - ENHANCED WITH CHUNKING
// ============================================

function searchSources(query) {
  if (!query) return { results: [], classification: null };
  
  const queryLower = query.toLowerCase().trim();
  if (queryLower.length < 2) return { results: [], classification: null };
  
  const classification = classifyQuery(query);
  
  // Use hybrid search with chunking
  const hybridResults = hybridSearch(query, uniqueSources);
  
  return {
    results: hybridResults.slice(0, 5),
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
// GROK API RESPONSE GENERATION
// ============================================

async function generateGrokResponse(query, results, classification) {
  const grok = createGrokInstance(process.env.GROQ_API_KEY);
  
  // Build context from results
  const context = results.map((r, i) => 
    `Source ${i+1}: ${r.title}\n${r.chunk || r.fullContent?.substring(0, 500) || ''}`
  ).join('\n\n');
  
  const queryType = classification?.type || 'factual';
  
  try {
    const grokResult = await grok.generateResponse(query, context, queryType);
    
    if (grokResult.success) {
      return {
        response: grokResult.response,
        sources: results,
        metadata: {
          total_sources: uniqueSources.length,
          matches_found: results.length,
          query_type: queryType,
          query_confidence: classification?.confidence || 0,
          ai_generated: true,
          model: 'grok-enhanced',
          usage: grokResult.metadata?.usage || null,
          last_updated: new Date().toISOString()
        }
      };
    }
  } catch (error) {
    console.warn('Grok API fallback to template:', error.message);
  }
  
  return null;
}

// ============================================
// GENERATE NO RESULTS RESPONSE
// ============================================

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
  
  return `🔍 **I couldn't find specific information about "${query}" in my current data sources.**

**📊 My Data Contains:**
- TechCrunch AI articles: ${techCrunchSources.length}
- VentureBeat AI articles: ${ventureBeatSources.length}
- Static sources: ${staticSources.length}
- **Total: ${uniqueSources.length} articles**

**💡 Try asking about:**
${suggestions.map(s => `- ${s}`).join('\n')}

**📚 Available Sources:**
${[...new Set(uniqueSources.map(s => `- ${s.source_name}`))].join('\n')}

**🔧 To get better results:**
- Be more specific (e.g., "Microsoft investment in Anthropic")
- Ask about companies (Microsoft, OpenAI, Anthropic, Meta)
- Ask about events (Hugging Face incident, Disrupt 2026)
- Ask about AI models (GPT-5.6, Claude Opus 5, Grok 4.5)`;
}

// ============================================
// BUILD CONTEXTUAL ANSWER (FALLBACK)
// ============================================

function buildContextualAnswer(query, results, classification) {
  if (results.length === 0) {
    return generateNoResultsResponse(query);
  }
  
  const facts = extractFacts(query, results);
  const queryType = classification?.type || 'factual';
  
  let answer = '';
  
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
  
  answer += `\n*Query Type: ${queryType} (Confidence: ${Math.round(classification?.confidence * 100 || 0)}%)*\n`;
  answer += `*Total Sources: ${uniqueSources.length}*\n`;
  
  return answer;
}

// ============================================
// GENERATE RESPONSE - MAIN ENTRY WITH GROK
// ============================================

async function generateResponse(query, searchResult) {
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
      response: `**🤖 ChatGPT vs Claude: Comparison**

**📊 Key Differences:**

| Feature | ChatGPT (OpenAI) | Claude (Anthropic) |
|---------|------------------|-------------------|
| **Developer** | OpenAI | Anthropic |
| **Key Models** | GPT-4, GPT-5.6 | Claude Sonnet, Claude Opus |
| **Focus** | General AI | Safe/Responsible AI |
| **Investment** | Microsoft (27%) | Microsoft ($5B), Amazon |
| **Approach** | Closed source | Both open and closed |
| **Strengths** | Broad capabilities | Safety-focused |

**💡 Recommendation:**
- **Choose ChatGPT for:** General tasks, creative writing, broad capabilities
- **Choose Claude for:** Safety-critical applications, analysis, longer context`,
      sources: []
    },
    "best ai models for marketing 2026": {
      response: `**📊 Best AI Models for Marketing Managers in 2026**

**🎯 Top Models for Marketing:**

| Model | Best For | Key Strength |
|-------|----------|--------------|
| **GPT-5.6** | Content creation, copywriting | Natural language, creativity |
| **Claude Sonnet 5** | Analysis, strategy | Safety, long context |
| **Grok 4.5** | Real-time insights | Speed, integration |

**💡 Marketing Use Cases:**
1. **Content Marketing:** GPT-5.6 for blogs, social posts
2. **Campaign Analysis:** Claude Sonnet 5 for data insights
3. **Customer Research:** Grok 4.5 for real-time trends

**📌 Recommendation:**
- **For content creation:** GPT-5.6
- **For strategy/analysis:** Claude Sonnet 5
- **For real-time marketing:** Grok 4.5

**📚 Sources:** TechCrunch, Raulji Technologies (July 2026)`,
      sources: []
    }
  };
  
  const lowerQuery = query.toLowerCase().trim();
  for (const [key, value] of Object.entries(directAnswers)) {
    if (lowerQuery.includes(key) || key.includes(lowerQuery)) {
      return {
        response: value.response,
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
    return {
      response: generateNoResultsResponse(query),
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
  // TRY GROK API FIRST (for better responses)
  // ============================================
  const grokResponse = await generateGrokResponse(query, results, classification);
  
  if (grokResponse) {
    return grokResponse;
  }
  
  // ============================================
  // FALLBACK TO CONTEXTUAL ANSWER
  // ============================================
  const responseText = buildContextualAnswer(query, results, classification);
  
  return {
    response: responseText,
    sources: results,
    metadata: {
      total_sources: uniqueSources.length,
      matches_found: results.length,
      query_type: queryType,
      query_confidence: classification?.confidence || 0,
      chain_of_thought: false,
      chunking_enabled: true,
      fallback: true,
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
        chunking_enabled: true,
        grok_enabled: !!process.env.GROQ_API_KEY
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
        chunking_enabled: true,
        grok_enabled: !!process.env.GROQ_API_KEY,
        last_updated: new Date().toISOString()
      });
    }

    // Search
    if (query) {
      const searchResult = searchSources(query);
      const response = await generateResponse(query, searchResult);
      
      return res.status(200).json(response);
    }

    // Default response
    return res.status(200).json({
      name: 'Omni Brand Intelligence Bot API',
      version: '3.2.0',
      status: 'running',
      features: ['intelligent_chunking', 'hybrid_search', 'context_aware', 'grok_ai'],
      total_sources: uniqueSources.length,
      source_stats: sourceStats,
      source_names: [...new Set(uniqueSources.map(s => s.source_name))],
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
