// api/data.js - Minimal Working Version
// ============================================================
// Purpose: API handler using OVHcloud gpt-oss-120b
// ============================================================

import GrokClient from '../lib/grok/client.js';

// ============================================
// DATA
// ============================================

var techCrunchSources = [
  {
    title: "Microsoft is openly competing with OpenAI, Anthropic more than ever",
    author: "Unknown",
    date: "2026-07-29T17:21:06-07:00",
    content: "Microsoft is in a unique position as AI overtakes the tech industry.",
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
    content: "Meta founder and CEO Mark Zuckerberg is trying to sell investors on his prediction for the future.",
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
    content: "When Microsoft reported killer fourth-quarter earnings for its fiscal 2026 year.",
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
    content: "In June, Meta entered the enterprise AI market with a new AI agent aimed at businesses.",
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
    content: "Hugging Face on Monday published a technical timeline.",
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
    content: "For a year now, the AI safety testing firm Andon Labs has given frontier models various real-world tasks.",
    url: "https://techcrunch.com/2026/07/29/claude-opus-5-became-downright-ruthless-when-tasked-with-running-a-vending-machine/",
    source_name: "TechCrunch",
    source_type: "blog",
    word_count: 1097,
    hash: "b509c204",
    domain: "techcrunch.com",
    timestamp: "2026-07-30T12:34:28.349281"
  },
  {
    title: "Hint, a new AI startup co-founded by Martha Stewart",
    author: "Unknown",
    date: "2026-07-29T08:35:09-07:00",
    content: "Martha Stewart is entering the AI software era.",
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
    content: "October 13 - 15, 2026 - San Francisco Innovation for Every Stage.",
    url: "https://techcrunch.com/events/techcrunch-disrupt/",
    source_name: "TechCrunch",
    source_type: "blog",
    word_count: 499,
    hash: "3f71dec1",
    domain: "techcrunch.com",
    timestamp: "2026-07-30T12:32:37.745412"
  }
];

var staticSources = [
  {
    title: "GPT-5.6, Claude Sonnet 5 and Grok 4.5: What the July 2026 AI Model Wave Means for Your Business",
    author: "Raulji Technologies",
    date: "July 27, 2026",
    content: "Anthropic, OpenAI, and xAI all shipped major models in weeks.",
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
    content: "It all started with ChatGPT, then Claude, and then we had an explosion of AI apps.",
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
    content: "I have tested more AI platforms than I can count over the past three years.",
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
    content: "Can you believe it's been over three years since ChatGPT landed in our internet browsers?",
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
    content: "Whether it's Fortune 500 companies or your friends and coworkers, people are talking about AI.",
    url: "https://redrivercomm.com/six-popular-ai-platforms-everyone-can-use",
    source_name: "Red River Communications",
    source_type: "blog",
    word_count: 953,
    hash: "redriver_001",
    domain: "redrivercomm.com",
    timestamp: "2026-07-27T08:36:53.036255"
  }
];

var ventureBeatSources = [
  {
    title: "Thinking Machines debuts Inkling Small open source AI model",
    author: "Carl Franzen",
    date: "2026-07-31",
    content: "Thinking Machines has debuted Inkling Small, an open source AI model.",
    url: "https://venturebeat.com/technology/thinking-machines-debuts-inkling-small-open-source-ai-model-nearing-performance-of-predecessor-at-about-1-4-size",
    source_name: "VentureBeat",
    source_type: "blog",
    word_count: 45,
    hash: "44d92c0c",
    domain: "venturebeat.com",
    timestamp: "2026-07-31T12:29:19.456515"
  },
  {
    title: "Enterprise AI agents can't talk to each other",
    author: "Taryn Plumb",
    date: "2026-07-31",
    content: "Enterprise AI agents face critical challenges including communication gaps.",
    url: "https://venturebeat.com/orchestration/enterprise-ai-agents-cant-talk-to-each-other-cant-be-trusted-with-permissions-and-cant-be-audited-5-startups-are-already-fixing-that",
    source_name: "VentureBeat",
    source_type: "blog",
    word_count: 42,
    hash: "30f8e69e",
    domain: "venturebeat.com",
    timestamp: "2026-07-31T12:29:19.493304"
  },
  {
    title: "MCP just got its biggest update ever",
    author: "Michael Nunez",
    date: "2026-07-31",
    content: "The Model Context Protocol (MCP) receives its largest update since Anthropic released it.",
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
// MERGE SOURCES
// ============================================

var allSources = techCrunchSources.concat(staticSources).concat(ventureBeatSources);

var uniqueSources = [];
var seenUrls = new Set();
for (var i = 0; i < allSources.length; i++) {
  var source = allSources[i];
  if (!seenUrls.has(source.url)) {
    seenUrls.add(source.url);
    uniqueSources.push(source);
  }
}

var sourceStats = {
  techcrunch: techCrunchSources.length,
  static: staticSources.length,
  venturebeat: ventureBeatSources.length,
  total: uniqueSources.length
};

// ============================================
// SEARCH
// ============================================

function searchSources(query) {
  if (!query) return { results: [] };
  
  var queryLower = query.toLowerCase().trim();
  if (queryLower.length < 2) return { results: [] };
  
  var queryWords = queryLower.split(/\s+/).filter(function(w) { return w.length > 2; });
  
  var scoredResults = uniqueSources.map(function(source) {
    var content = (source.content || '').toLowerCase();
    var title = (source.title || '').toLowerCase();
    var sourceName = (source.source_name || '').toLowerCase();
    
    var score = 0;
    
    for (var i = 0; i < queryWords.length; i++) {
      var word = queryWords[i];
      if (title.indexOf(word) !== -1) score += 15;
      if (content.indexOf(word) !== -1) score += 5;
      if (sourceName.indexOf(word) !== -1) score += 8;
    }
    
    if (title.indexOf(queryLower) !== -1) score += 30;
    if (content.indexOf(queryLower) !== -1) score += 15;
    
    var maxScore = queryWords.length * 15 + 45;
    var relevance = Math.min(Math.round((score / Math.max(maxScore, 1)) * 100), 100);
    
    return {
      title: source.title || 'Untitled',
      source: source.url || '#',
      source_name: source.source_name || 'Unknown',
      author: source.author || 'Unknown',
      date: source.date || '',
      chunk: (source.content || '').substring(0, 500) + '...',
      fullContent: source.content || '',
      relevance: relevance,
      score: score
    };
  });
  
  scoredResults.sort(function(a, b) {
    return b.score - a.score;
  });
  
  var results = scoredResults.filter(function(r) { return r.score > 0; }).slice(0, 5);
  
  if (results.length === 0) {
    results = scoredResults.slice(0, 5);
  }
  
  return { results: results };
}

// ============================================
// BUILD PROMPT
// ============================================

function buildChainOfThoughtPrompt(query, sources) {
  var context = sources.map(function(s, i) {
    return 'Source ' + (i + 1) + ':\n' +
           'Title: ' + s.title + '\n' +
           'Content: ' + (s.fullContent || s.chunk || '').substring(0, 500) + '\n' +
           'URL: ' + s.source + '\n' +
           'Relevance: ' + s.relevance + '%\n';
  }).join('\n---\n\n');
  
  return {
    system: 'You are a Senior Technical Analyst. Use Chain-of-Thought reasoning.\n\nREASONING STEPS:\n1. Decompose the question\n2. Examine each source\n3. Synthesize insights\n4. Interpret findings\n5. Conclude with recommendations\n\nRESPONSE STRUCTURE:\n## Grok API Reasoning Block\n## Explanation\n## Interpretation\n## Conclusion\n## Suggestions\n## Source References\n## Assessment\n\nUse ## for headers. Use bullet points. Use **bold** for emphasis. Hyperlink sources as [Source Name](URL).',
    
    user: 'QUESTION: ' + query + '\n\nCONTEXT:\n' + context + '\n\nApply Chain-of-Thought reasoning. Hyperlink every factual claim using [Source Name](URL).'
  };
}

// ============================================
// CALL OVHCLOUD
// ============================================

async function callOVHCloudAI(query, sources) {
  try {
    var client = new GrokClient(null, {
      timeoutMs: 30000,
      maxRetries: 2
    });
    
    var promptData = buildChainOfThoughtPrompt(query, sources);
    
    var result = await client.generateResponse(promptData, {
      temperature: 0.25,
      maxTokens: 2500
    });
    
    return result;
  } catch (error) {
    console.warn('OVHcloud error:', error.message);
    return null;
  }
}

// ============================================
// FALLBACK
// ============================================

function generateFallback(query, results) {
  var output = [];
  
  output.push('## Grok API Reasoning Block');
  output.push('');
  output.push('Query: ' + query);
  output.push('');
  output.push('Found ' + results.length + ' relevant sources.');
  output.push('');
  
  output.push('## Explanation');
  output.push('');
  if (results && results.length > 0) {
    for (var i = 0; i < Math.min(results.length, 3); i++) {
      var r = results[i];
      output.push('**' + (i + 1) + '. ' + r.title + '**');
      output.push(r.chunk.substring(0, 200) + '...');
      output.push('Source: [' + r.source_name + '](' + r.source + ')');
      output.push('');
    }
  } else {
    output.push('No sources found.');
    output.push('');
  }
  
  output.push('## Conclusion');
  output.push('');
  if (results && results.length > 0) {
    output.push('Analysis based on ' + results.length + ' sources.');
  } else {
    output.push('No conclusive findings.');
  }
  output.push('');
  
  output.push('## Source References');
  output.push('');
  if (results && results.length > 0) {
    for (var k = 0; k < Math.min(results.length, 5); k++) {
      var src = results[k];
      output.push((k + 1) + '. **' + src.title + '**');
      output.push('   Source: [' + src.source_name + '](' + src.source + ')');
      output.push('   Relevance: ' + src.relevance + '%');
      output.push('');
    }
  }
  
  output.push('## Assessment');
  output.push('');
  var confidence = results && results.length >= 3 ? 'High' : results && results.length >= 1 ? 'Medium' : 'Low';
  output.push('**Confidence:** ' + confidence);
  output.push('');
  
  output.push('---');
  output.push('');
  output.push('*Generated on ' + new Date().toLocaleString() + '*');
  output.push('*Sources: ' + (results ? results.length : 0) + '*');
  
  return output.join('\n');
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

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    var query = req.body ? req.body.query : null;
    
    if (!query || query.trim().length === 0) {
      return res.status(200).json({
        response: 'Please provide a valid query.',
        sources: [],
        metadata: { fallback: true }
      });
    }

    var searchResult = searchSources(query);
    var results = searchResult.results || [];
    
    var aiResponse = await callOVHCloudAI(query, results);
    
    var formattedResponse;
    var modelUsed;
    var usingOVHcloud = false;
    
    if (aiResponse && aiResponse.success && aiResponse.response) {
      formattedResponse = aiResponse.response;
      modelUsed = 'gpt-oss-120b (OVHcloud)';
      usingOVHcloud = true;
    } else {
      formattedResponse = generateFallback(query, results);
      modelUsed = 'fallback';
      usingOVHcloud = false;
    }
    
    var qualityScore = 0;
    if (results && results.length > 0) {
      var total = 0;
      for (var i = 0; i < results.length; i++) {
        total += results[i].relevance || 0;
      }
      qualityScore = Math.round(total / results.length);
    }
    
    if (usingOVHcloud) {
      qualityScore = Math.min(qualityScore + 20, 100);
    }
    
    return res.status(200).json({
      response: formattedResponse,
      sources: results,
      metadata: {
        total_sources: uniqueSources.length,
        matches_found: results.length,
        ai_generated: true,
        model: modelUsed,
        provider: usingOVHcloud ? 'OVHcloud AI Endpoints' : 'Fallback',
        formatted: true,
        chain_of_thought: true,
        last_updated: new Date().toISOString(),
        confidence: results.length >= 3 ? 'High' : results.length >= 1 ? 'Medium' : 'Low',
        quality_score: qualityScore,
        ovhcloud_used: usingOVHcloud
      }
    });
    
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({
      response: 'An error occurred. Please try again.',
      sources: [],
      metadata: { error: error.message, fallback: true }
    });
  }
}
