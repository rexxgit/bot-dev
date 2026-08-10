// api/data.js - Self-Contained API

// ============================================
// IMPORT GROK
// ============================================

import { createGrokInstance } from '../lib/grok/index.js';
import { buildGrokRequest } from '../lib/grok/prompts.js';

// ============================================
// ALL DATA EMBEDDED HERE
// ============================================

const sources = [
  {
    title: "Microsoft is openly competing with OpenAI, Anthropic more than ever",
    author: "Unknown",
    date: "2026-07-29T17:21:06-07:00",
    content: "Microsoft is in a unique position as AI overtakes the tech industry. It's one of the world's largest cloud providers and software-as-a-service companies, while also holding valuable stakes in the two biggest AI labs, OpenAI and Anthropic.",
    url: "https://techcrunch.com/2026/07/29/microsoft-is-openly-competing-with-openai-anthropic-more-than-ever/",
    source_name: "TechCrunch",
    word_count: 777,
    hash: "750af354",
    domain: "techcrunch.com",
    timestamp: "2026-07-30T12:32:45.949284"
  },
  {
    title: "Mark Zuckerberg predicts that billions of people will have personal AI agents in five years",
    author: "Unknown",
    date: "2026-07-29T16:00:11-07:00",
    content: "Meta founder and CEO Mark Zuckerberg is trying to sell investors on his prediction for the future — one where billions of people will have their own personal AI agents in the next five years.",
    url: "https://techcrunch.com/2026/07/29/mark-zuckerberg-predicts-that-billions-of-people-will-have-personal-ai-agents-in-five-years/",
    source_name: "TechCrunch",
    word_count: 544,
    hash: "1929c185",
    domain: "techcrunch.com",
    timestamp: "2026-07-30T12:33:02.318565"
  },
  {
    title: "Microsoft logs $3.2B from Anthropic investment, but OpenAI was a mixed bag",
    author: "Unknown",
    date: "2026-07-29T15:46:03-07:00",
    content: "When Microsoft reported killer fourth-quarter earnings for its fiscal 2026 year (which ended June 30), it tucked in an interesting little tidbit about how its investments in the two biggest, and competing, AI labs are doing.",
    url: "https://techcrunch.com/2026/07/29/microsoft-logs-3-2b-from-anthropic-investment-but-openai-was-a-mixed-bag/",
    source_name: "TechCrunch",
    word_count: 318,
    hash: "feca2ec5",
    domain: "techcrunch.com",
    timestamp: "2026-07-30T12:33:18.896327"
  },
  {
    title: "Zuckerberg says Meta's enterprise AI opportunity extends beyond agents",
    author: "Unknown",
    date: "2026-07-29T15:23:12-07:00",
    content: "In June, Meta entered the enterprise AI market with a new AI agent aimed at businesses, to help with customer service, support, and other daily operations.",
    url: "https://techcrunch.com/2026/07/29/zuckerberg-says-metas-enterprise-ai-opportunity-extends-beyond-agents/",
    source_name: "TechCrunch",
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
    word_count: 499,
    hash: "3f71dec1",
    domain: "techcrunch.com",
    timestamp: "2026-07-30T12:32:37.745412"
  },
  {
    title: "GPT-5.6, Claude Sonnet 5 and Grok 4.5: What the July 2026 AI Model Wave Means for Your Business",
    author: "Raulji Technologies",
    date: "July 27, 2026",
    content: "Anthropic, OpenAI, and xAI all shipped major models in weeks. Here is what the July 2026 AI model wave means for your business.",
    url: "https://www.rauljitechnologies.com/blog/july-2026-ai-model-wave/",
    source_name: "Raulji Technologies",
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
    word_count: 953,
    hash: "redriver_001",
    domain: "redrivercomm.com",
    timestamp: "2026-07-27T08:36:53.036255"
  },
  {
    title: "Thinking Machines debuts Inkling Small open source AI model nearing performance of predecessor at about 1/4 size",
    author: "Carl Franzen",
    date: "2026-07-31",
    content: "Thinking Machines has debuted Inkling Small, an open source AI model that achieves near performance of its predecessor at approximately 1/4 the size.",
    url: "https://venturebeat.com/technology/thinking-machines-debuts-inkling-small-open-source-ai-model-nearing-performance-of-predecessor-at-about-1-4-size",
    source_name: "VentureBeat",
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
    word_count: 50,
    hash: "7f8dc55f",
    domain: "venturebeat.com",
    timestamp: "2026-07-31T12:29:19.561786"
  },
  {
    title: "MCP just got its biggest update ever — here's what changes for AI agents",
    author: "Michael Nuñez",
    date: "2026-07-31",
    content: "The Model Context Protocol (MCP), the open standard connecting AI agents to software, receives its largest update since Anthropic released it.",
    url: "https://venturebeat.com/orchestration/mcp-just-got-its-biggest-update-ever-heres-what-changes-for-ai-agents",
    source_name: "VentureBeat",
    word_count: 75,
    hash: "7cc59324",
    domain: "venturebeat.com",
    timestamp: "2026-07-31T12:29:19.737529"
  }
];

// ============================================
// SEARCH FUNCTION
// ============================================

function searchSources(query, sourcesList) {
  if (!query) return [];
  
  const queryLower = query.toLowerCase().trim();
  if (queryLower.length < 2) return [];
  
  const words = queryLower.split(/\s+/).filter(w => w.length > 2);
  const results = [];
  
  for (const source of sourcesList) {
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
  return results.slice(0, 5);
}

// ============================================
// GENERATE RESPONSE - WITH GROK
// ============================================

async function generateResponse(query) {
  const results = searchSources(query, sources);
  
  // Build context
  let context = '';
  if (results.length > 0) {
    context = results.map((r, i) => 
      `Source ${i+1}: ${r.title}\n${r.chunk || r.fullContent?.substring(0, 500) || ''}`
    ).join('\n\n');
  } else {
    context = 'No specific sources found. Provide a general response.';
  }
  
  let grokResponse = null;
  
  try {
    const apiKey = process.env.GROQ_API_KEY;
    if (apiKey) {
      const grok = createGrokInstance(apiKey);
      const grokResult = await grok.generateResponse(query, context, 'informational');
      if (grokResult.success) {
        grokResponse = grokResult.response;
      }
    }
  } catch (error) {
    console.warn('Grok failed:', error.message);
  }
  
  // Build response
  let responseText = '';
  
  if (grokResponse) {
    responseText = grokResponse;
  } else {
    // Fallback
    if (results.length === 0) {
      responseText = 'No results found. Please try a different question.';
    } else {
      responseText = results.map((r, i) => 
        `Source ${i+1}: ${r.title}\n${r.chunk}\nURL: ${r.source}\n`
      ).join('\n');
    }
  }
  
  return {
    response: responseText,
    sources: results,
    metadata: {
      total_sources: sources.length,
      matches_found: results.length,
      ai_generated: !!grokResponse,
      model: grokResponse ? 'grok' : 'fallback'
    }
  };
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
    return res.status(405).json({ error: 'Method not allowed' });
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
        total_sources: sources.length
      });
    }

    // Stats
    if (action === 'stats') {
      return res.status(200).json({
        total_sources: sources.length,
        last_updated: new Date().toISOString()
      });
    }

    // Search
    if (query) {
      const response = await generateResponse(query);
      return res.status(200).json(response);
    }

    // Default
    return res.status(200).json({
      name: 'Omni Brand Intelligence Bot API',
      version: '1.0.0',
      status: 'running',
      total_sources: sources.length,
      endpoints: {
        search: 'GET/POST with ?query=your+question',
        health: 'GET?action=health',
        stats: 'GET?action=stats'
      }
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
