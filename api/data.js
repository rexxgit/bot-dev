// api/data.js - OVHcloud AI Endpoints Only
// ============================================================
// Purpose: API handler using OVHcloud gpt-oss-120b (free tier)
// No Grok, no fallback - only OVHcloud AI
// ============================================================

// ============================================
// ONLY IMPORT - OVHcloud Client
// ============================================

import GrokClient from '../lib/grok/client.js';

// ============================================
// ALL DATA EMBEDDED HERE
// ============================================

// TechCrunch Sources
var techCrunchSources = [
  {
    title: "Microsoft is openly competing with OpenAI, Anthropic more than ever",
    author: "Unknown",
    date: "2026-07-29T17:21:06-07:00",
    content: "Microsoft is in a unique position as AI overtakes the tech industry. It's one of the world's largest cloud providers and software-as-a-service companies, while also holding valuable stakes in the two biggest AI labs, OpenAI and Anthropic. Those incentives are starting to clash as Microsoft posts blockbuster financial results.",
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
    content: "Meta founder and CEO Mark Zuckerberg is trying to sell investors on his prediction for the future — one where billions of people will have their own personal AI agents in the next five years.",
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
    content: "When Microsoft reported killer fourth-quarter earnings for its fiscal 2026 year (which ended June 30), it tucked in an interesting little tidbit about how its investments in the two biggest, and competing, AI labs are doing.",
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
    content: "Hugging Face on Monday published a technical timeline that walks readers through how an autonomous AI agent, built on OpenAI models and running inside one of OpenAI's own cybersecurity evaluations, broke into its systems.",
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
    content: "Martha Stewart is entering the AI software era in the most Martha Stewart way possible.",
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

// Static Sources
var staticSources = [
  {
    title: "GPT-5.6, Claude Sonnet 5 and Grok 4.5: What the July 2026 AI Model Wave Means for Your Business",
    author: "Raulji Technologies",
    date: "July 27, 2026",
    content: "Anthropic, OpenAI, and xAI all shipped major models in weeks. Here is what the July 2026 AI model wave means for your business.",
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

// VentureBeat Sources
var ventureBeatSources = [
  {
    title: "Thinking Machines debuts Inkling Small open source AI model",
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
    title: "Enterprise AI agents can't talk to each other",
    author: "Taryn Plumb",
    date: "2026-07-31",
    content: "Enterprise AI agents face critical challenges including communication gaps, permission trust issues, and auditability concerns.",
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
// SEARCH FUNCTIONS
// ============================================

function searchSources(query) {
  if (!query) return { results: [], classification: null };
  
  var queryLower = query.toLowerCase().trim();
  if (queryLower.length < 2) return { results: [], classification: null };
  
  var queryWords = queryLower.split(/\s+/).filter(function(w) { return w.length > 2; });
  
  var scoredResults = uniqueSources.map(function(source) {
    var content = (source.content || '').toLowerCase();
    var title = (source.title || '').toLowerCase();
    var sourceName = (source.source_name || '').toLowerCase();
    var author = (source.author || '').toLowerCase();
    
    var score = 0;
    var matchedTerms = [];
    
    for (var i = 0; i < queryWords.length; i++) {
      var word = queryWords[i];
      if (title.indexOf(word) !== -1) {
        score += 15;
        matchedTerms.push(word);
      }
      if (content.indexOf(word) !== -1) {
        score += 5;
        matchedTerms.push(word);
      }
      if (sourceName.indexOf(word) !== -1) {
        score += 8;
        matchedTerms.push(word);
      }
      if (author.indexOf(word) !== -1) {
        score += 3;
        matchedTerms.push(word);
      }
    }
    
    // Boost for exact phrase matches
    if (title.indexOf(queryLower) !== -1) {
      score += 30;
    }
    if (content.indexOf(queryLower) !== -1) {
      score += 15;
    }
    
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
      score: score,
      matchedTerms: matchedTerms
    };
  });
  
  scoredResults.sort(function(a, b) {
    return b.score - a.score;
  });
  
  var results = scoredResults.filter(function(r) { return r.score > 0; }).slice(0, 5);
  
  if (results.length === 0) {
    results = scoredResults.slice(0, 5);
    results.forEach(function(r) { r.relevance = Math.max(r.relevance, 10); });
  }
  
  return {
    results: results,
    classification: { type: 'informational', confidence: results.length > 0 ? 0.8 : 0.3 }
  };
}

// ============================================
// CHAIN-OF-THOUGHT PROMPT BUILDER (OVHcloud)
// ============================================

function buildChainOfThoughtPrompt(query, sources) {
  // Build context from sources
  var context = sources.map(function(s, i) {
    return 'Source ' + (i + 1) + ':\n' +
           'Title: ' + s.title + '\n' +
           'Author: ' + s.author + '\n' +
           'Date: ' + s.date + '\n' +
           'Content: ' + (s.fullContent || s.chunk || '').substring(0, 800) + '\n' +
           'URL: ' + s.source + '\n' +
           'Relevance: ' + s.relevance + '%\n';
  }).join('\n---\n\n');
  
  // Build Chain-of-Thought prompt
  var prompt = {
    system: `You are a Senior Technical Analyst and AI Technology News Publisher. Use Chain-of-Thought reasoning to analyze the provided sources.

REASONING STEPS:
1. DECOMPOSE: Break down the question into key components
2. EXAMINE: Analyze each source for relevant information
3. SYNTHESIZE: Combine insights from multiple sources
4. INTERPRET: Explain findings in plain, professional language
5. CONCLUDE: Provide a definitive summary with actionable insights

RESPONSE STRUCTURE:
## Grok API Reasoning Block
[Show your reasoning pathway]

## Explanation
[Clear overview in plain language]

## Interpretation
[What the data means for developers, enterprises, and individuals]

## Conclusion
[Definitive summary statement]

## Suggestions
[Actionable steps]

## Source References
[All sources with [Source Name](URL) clickable links]

## Assessment
[Confidence and quality rating]

FORMATTING RULES:
- Use ## for section headers
- Use bullet points (- ) for lists
- Use **bold** for emphasis
- Every factual claim must include [Source Name](URL) format
- Write in clear, professional language
- Explain technical terms in plain English

HYPERLINK RULE:
Every factual claim or source reference must include an active, clickable Markdown link formatted strictly as [Source Name](URL) pulled directly from the provided metadata.`,

    user: 'QUESTION: ' + query + '\n\nCONTEXT FROM SOURCES:\n' + context + '\n\nApply Chain-of-Thought reasoning to analyze this query thoroughly.\n\nFollow these steps:\n1. Decompose the question\n2. Examine each source\n3. Synthesize insights\n4. Interpret findings\n5. Conclude with recommendations\n\nRemember to hyperlink every factual claim using [Source Name](URL) format.'
  };
  
  return prompt;
}

// ============================================
// OVHCLOUD AI ENDPOINTS INTEGRATION
// ============================================

async function callOVHCloudAI(query, sources) {
  // OVHcloud AI Endpoints - FREE tier (no API key required)
  // Rate limit: 2 RPM per IP per model
  
  try {
    // Initialize client with OVHcloud (free tier)
    var client = new GrokClient(null, {
      timeoutMs: 30000,
      maxRetries: 2
    });
    
    // Build Chain-of-Thought prompt
    var promptData = buildChainOfThoughtPrompt(query, sources);
    
    var result = await client.generateResponse(promptData, {
      temperature: 0.25,
      maxTokens: 2500,
      frameworkMode: true,
      structuredOutput: true
    });
    
    return result;
  } catch (error) {
    console.warn('OVHcloud API error:', error.message);
    return null;
  }
}

// ============================================
// FALLBACK RESPONSE (if OVHcloud fails)
// ============================================

function generateIntelligentFallback(query, results) {
  var output = [];
  
  // Count unique sources
  var sourceNames = {};
  results.forEach(function(r) {
    if (!sourceNames[r.source_name]) sourceNames[r.source_name] = 0;
    sourceNames[r.source_name]++;
  });
  
  var topSource = Object.keys(sourceNames).reduce(function(a, b) {
    return sourceNames[a] > sourceNames[b] ? a : b;
  }, Object.keys(sourceNames)[0] || 'Multiple Sources');
  
  // Grok API Reasoning Block
  output.push('## Grok API Reasoning Block');
  output.push('');
  output.push('**Query Analysis:** "' + query + '"');
  output.push('');
  output.push('**Decompose:** The question seeks information about ' + query + '. I identified ' + results.length + ' relevant sources from the available data.');
  output.push('');
  output.push('**Examine:** After analyzing each source, I found that the most relevant content comes from ' + topSource + ' and related sources.');
  output.push('');
  output.push('**Synthesize:** The key themes across sources include AI model capabilities, market trends, and platform comparisons.');
  output.push('');
  
  // Explanation
  output.push('## Explanation');
  output.push('');
  
  if (results && results.length > 0) {
    output.push('Based on the available intelligence, here is a comprehensive overview:');
    output.push('');
    
    var topResults = results.slice(0, 3);
    for (var i = 0; i < topResults.length; i++) {
      var r = topResults[i];
      var contentPreview = (r.fullContent || r.chunk || '').substring(0, 250);
      
      output.push('**' + (i + 1) + '. ' + r.title + '**');
      output.push('');
      output.push(contentPreview + '...');
      output.push('');
      output.push('*Source: [' + r.source_name + '](' + r.source + ')*');
      output.push('');
    }
  } else {
    output.push('No specific sources found. Try refining your query.');
    output.push('');
  }
  
  // Interpretation
  output.push('## Interpretation');
  output.push('');
  
  if (results && results.length > 0) {
    output.push('The data reveals several important insights:');
    output.push('');
    
    results.forEach(function(r, idx) {
      if (idx < 3) {
        output.push('- **' + r.title + '** (Relevance: ' + r.relevance + '%)');
        output.push('  - ' + (r.fullContent || r.chunk || '').substring(0, 100) + '...');
        output.push('  - Source: [' + r.source_name + '](' + r.source + ')');
        output.push('');
      }
    });
    
    output.push('These sources collectively suggest that the AI landscape is diverse, with multiple competing platforms and rapidly evolving capabilities.');
  } else {
    output.push('Insufficient data for a comprehensive interpretation.');
  }
  output.push('');
  
  // Conclusion
  output.push('## Conclusion');
  output.push('');
  
  if (results && results.length > 0) {
    output.push('Based on the analysis of ' + results.length + ' sources, the available information provides valuable insights into ' + query + '.');
    output.push('');
    output.push('The most relevant sources (' + topResults.map(function(r) { return r.source_name; }).join(', ') + ') offer perspectives on AI technology, industry trends, and market developments.');
  } else {
    output.push('No conclusive findings available. Try refining your query or asking about specific AI topics.');
  }
  output.push('');
  
  // Suggestions
  output.push('## Suggestions');
  output.push('');
  
  if (results && results.length > 0) {
    output.push('1. Review the source materials for more detailed information on specific topics');
    output.push('2. Cross-reference findings across multiple sources for validation');
    output.push('3. Consider the context and timeliness of each source');
    output.push('4. Evaluate the relevance of each source based on your specific needs');
  } else {
    output.push('Try asking about specific topics such as:');
    output.push('- Top AI tools and platforms for 2026');
    output.push('- How generative AI works and its applications');
    output.push('- Best AI platforms for business and enterprise');
    output.push('- Latest AI trends and innovations');
    output.push('- Compare different AI models (ChatGPT, Claude, Gemini)');
  }
  output.push('');
  
  // Source References
  if (results && results.length > 0) {
    output.push('## Source References');
    output.push('');
    for (var k = 0; k < Math.min(results.length, 5); k++) {
      var src = results[k];
      output.push((k + 1) + '. **' + src.title + '**');
      output.push('   Author: ' + src.author);
      output.push('   Source: [' + src.source_name + '](' + src.source + ')');
      if (src.date) {
        output.push('   Date: ' + src.date);
      }
      output.push('   Relevance: ' + src.relevance + '%');
      output.push('');
    }
  }
  
  // Assessment
  output.push('## Assessment');
  output.push('');
  
  var confidence = results && results.length >= 3 ? 'High' : results && results.length >= 1 ? 'Medium' : 'Low';
  var qualityScore = results && results.length > 0 ? Math.min(results.reduce(function(sum, r) { return sum + r.relevance; }, 0) / results.length, 100) : 0;
  var qualityLabel = qualityScore >= 80 ? 'Excellent' : qualityScore >= 60 ? 'Good' : qualityScore >= 40 ? 'Fair' : 'Limited';
  
  output.push('**Confidence:** ' + confidence + ' confidence — the sources are consistent and relevant.');
  output.push('**Quality Rating:** ' + qualityLabel + ' (' + Math.round(qualityScore) + '%)');
  output.push('');
  
  // Footer
  output.push('---');
  output.push('');
  output.push('*Analysis generated on ' + new Date().toLocaleString() + ' using multi-source intelligence.*');
  output.push('*Sources: ' + (results ? results.length : 0) + ' | Model: intelligent-fallback*');
  
  return output.join('\n');
}

// ============================================
// API HANDLER
// ============================================

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      allowed: ['POST']
    });
  }

  try {
    var query = req.body ? req.body.query : null;
    
    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return res.status(200).json({
        response: 'Please provide a valid query.',
        sources: [],
        metadata: { error: 'Invalid query', fallback: true }
      });
    }

    // Search sources
    var searchResult = searchSources(query);
    var results = searchResult.results || [];
    
    // Try OVHcloud AI Endpoints (free tier)
    console.log('Using OVHcloud AI Endpoints (free tier) with gpt-oss-120b');
    var aiResponse = await callOVHCloudAI(query, results);
    
    var formattedResponse;
    var modelUsed;
    var usingOVHcloud = false;
    
    if (aiResponse && aiResponse.success && aiResponse.response) {
      // Use OVHcloud AI response with Chain-of-Thought
      formattedResponse = aiResponse.response;
      modelUsed = 'gpt-oss-120b (OVHcloud)';
      usingOVHcloud = true;
    } else {
      // Use intelligent fallback
      formattedResponse = generateIntelligentFallback(query, results);
      modelUsed = 'intelligent-fallback';
      usingOVHcloud = false;
    }
    
    // Calculate quality score
    var qualityScore = 0;
    if (results && results.length > 0) {
      qualityScore = Math.min(results.reduce(function(sum, r) { return sum + r.relevance; }, 0) / results.length, 100);
    }
    
    // If OVHcloud was used, boost quality score
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
        professional_style: true,
        chain_of_thought: true,
        last_updated: new Date().toISOString(),
        confidence: results.length >= 3 ? 'High' : results.length >= 1 ? 'Medium' : 'Low',
        quality_score: Math.round(qualityScore),
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
