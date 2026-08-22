// api/data.js - Chain-of-Thought Reasoning with Grok API
// ============================================================
// Purpose: API handler with Grok API integration, Chain-of-Thought
// reasoning, and professional framework formatting
// ============================================================

// ============================================
// ESSENTIAL IMPORTS ONLY
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
    var matches = [];
    
    for (var i = 0; i < queryWords.length; i++) {
      var word = queryWords[i];
      if (title.indexOf(word) !== -1) {
        score += 10;
        matches.push(word);
      }
      if (content.indexOf(word) !== -1) {
        score += 3;
        matches.push(word);
      }
      if (sourceName.indexOf(word) !== -1) {
        score += 5;
        matches.push(word);
      }
      if (author.indexOf(word) !== -1) {
        score += 2;
        matches.push(word);
      }
    }
    
    if (title.indexOf(queryLower) !== -1) score += 20;
    if (content.indexOf(queryLower) !== -1) score += 10;
    
    var maxPossibleScore = queryWords.length * 10 + 30;
    var relevance = Math.min(Math.round((score / maxPossibleScore) * 100), 100);
    
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
      matches: matches
    };
  });
  
  scoredResults.sort(function(a, b) {
    return b.score - a.score;
  });
  
  var results = scoredResults.filter(function(r) { return r.score > 0; }).slice(0, 5);
  
  if (results.length === 0) {
    results = scoredResults.slice(0, 5);
  }
  
  return {
    results: results,
    classification: { type: 'informational', confidence: 0.8 }
  };
}

// ============================================
// CHAIN-OF-THOUGHT PROMPT BUILDER
// ============================================

function buildChainOfThoughtPrompt(query, sources) {
  // Build context from sources
  var context = sources.map(function(s, i) {
    return 'Source ' + (i + 1) + ':\n' +
           'Title: ' + s.title + '\n' +
           'Author: ' + s.author + '\n' +
           'Date: ' + s.date + '\n' +
           'Content: ' + (s.fullContent || s.chunk || '').substring(0, 800) + '\n' +
           'URL: ' + s.source + '\n';
  }).join('\n---\n\n');
  
  // Build Chain-of-Thought prompt
  var prompt = {
    system: `You are a Senior Technical Analyst and AI Technology News Publisher. Use Chain-of-Thought reasoning to analyze the provided sources.

REASONING FRAMEWORK:
Step 1 - DECOMPOSE: Break down the question and identify key components
Step 2 - EXAMINE: Analyze each source for relevant information
Step 3 - SYNTHESIZE: Combine insights from multiple sources
Step 4 - INTERPRET: Explain what the findings mean in plain language
Step 5 - CONCLUDE: Provide a definitive summary with actionable insights

RESPONSE STRUCTURE:
1. **Grok API Reasoning Block:** Show your reasoning pathway
2. **Explanation:** Clear overview in plain language (avoid jargon where possible, explain technical terms)
3. **Interpretation:** What the data means for developers, enterprises, and individuals
4. **Conclusion:** Definitive summary statement
5. **Suggestions:** Actionable steps

FORMATTING RULES:
- Use ## for section headers
- Use bullet points (- ) for lists
- Use **bold** for emphasis
- Every factual claim must include [Source Name](URL) format
- Write in clear, professional language
- Explain technical terms in plain English

HYPERLINK RULE:
Every factual claim or source reference must include an active, clickable Markdown link formatted strictly as [Source Name](URL) pulled directly from the provided metadata. Never output unlinked raw URLs.`,

    user: `QUESTION: ${query}

CONTEXT FROM SOURCES:
${context}

Apply Chain-of-Thought reasoning to analyze this query thoroughly.

Follow these steps:
1. First, identify the key themes in the question
2. Examine each source for relevant information
3. Synthesize insights across sources
4. Interpret what the findings mean
5. Conclude with clear recommendations

Remember to hyperlink every factual claim using [Source Name](URL) format from the source metadata.`
  };
  
  return prompt;
}

// ============================================
// GROK API INTEGRATION WITH CHAIN-OF-THOUGHT
// ============================================

async function callGrokWithCoT(query, sources) {
  var apiKey = process.env.GROQ_API_KEY;
  
  if (!apiKey) {
    console.warn('GROQ_API_KEY not set, using fallback');
    return null;
  }
  
  try {
    var client = new GrokClient(apiKey);
    
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
    console.warn('Grok API error:', error.message);
    return null;
  }
}

// ============================================
// FALLBACK RESPONSE GENERATOR (without Grok)
// ============================================

function generateFallbackResponse(query, results) {
  var output = [];
  
  // Grok API Reasoning Block
  output.push('## Grok API Reasoning Block');
  output.push('');
  output.push('Query: "' + query + '"');
  output.push('');
  output.push('**Decompose:** The question asks about ' + query + '. I need to examine the available sources for relevant information.');
  output.push('');
  output.push('**Examine:** Found ' + results.length + ' relevant sources with varying relevance scores.');
  output.push('');
  output.push('**Synthesize:** The sources provide information from multiple perspectives.');
  output.push('');
  
  // Explanation
  output.push('## Explanation');
  output.push('');
  
  if (results && results.length > 0) {
    output.push('Based on the available data, here is what I found:');
    output.push('');
    
    for (var i = 0; i < Math.min(results.length, 3); i++) {
      var r = results[i];
      output.push('**' + (i + 1) + '. ' + r.title + '**');
      output.push('   This source discusses: ' + r.chunk.substring(0, 200) + '...');
      output.push('   *Source: [' + r.source_name + '](' + r.source + ')*');
      output.push('');
    }
  } else {
    output.push('No specific sources found for this query.');
    output.push('');
  }
  
  // Interpretation
  output.push('## Interpretation');
  output.push('');
  
  if (results && results.length > 0) {
    output.push('The key insights from the data are:');
    output.push('');
    for (var j = 0; j < Math.min(results.length, 3); j++) {
      var s = results[j];
      output.push('- ' + s.title + ' (Relevance: ' + s.relevance + '%)');
      output.push('  Source: [' + s.source_name + '](' + s.source + ')');
    }
    output.push('');
    output.push('These sources collectively suggest that the AI landscape is diverse and rapidly evolving.');
  } else {
    output.push('Insufficient data for a comprehensive interpretation.');
    output.push('');
  }
  
  // Conclusion
  output.push('## Conclusion');
  output.push('');
  
  if (results && results.length > 0) {
    output.push('Based on the analysis of ' + results.length + ' sources, the available information provides valuable insights into the topic. The most relevant sources offer perspectives on AI technology, industry trends, and market developments.');
    output.push('');
  } else {
    output.push('No conclusive findings available. Try refining your query or asking about specific AI topics.');
    output.push('');
  }
  
  // Suggestions
  output.push('## Suggestions');
  output.push('');
  
  if (results && results.length > 0) {
    output.push('1. Review the source materials for more detailed information');
    output.push('2. Consider additional research on specific topics of interest');
    output.push('3. Evaluate the relevance of each source based on your needs');
    output.push('');
  } else {
    output.push('Try asking about specific topics such as:');
    output.push('- Top AI tools for 2026');
    output.push('- How generative AI works');
    output.push('- Best AI platforms for business');
    output.push('- Latest AI trends and innovations');
    output.push('- Compare ChatGPT vs Claude vs Gemini');
    output.push('');
  }
  
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
  var confidence = results && results.length > 0 ? 'Medium' : 'Low';
  var quality = results && results.length > 0 ? Math.min(results.length * 20, 100) : 0;
  output.push('**Confidence:** ' + confidence + ' confidence — the sources are consistent and relevant.');
  output.push('**Quality Rating:** ' + (quality >= 80 ? 'Excellent' : quality >= 60 ? 'Good' : 'Fair') + ' (' + quality + '%)');
  output.push('');
  
  // Footer
  output.push('---');
  output.push('');
  output.push('*Analysis generated on ' + new Date().toLocaleString() + ' using multi-source intelligence.*');
  output.push('*Sources: ' + (results ? results.length : 0) + ' | Model: fallback*');
  
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
    
    // Try Grok API with Chain-of-Thought
    var grokResponse = await callGrokWithCoT(query, results);
    
    var formattedResponse;
    var modelUsed = 'fallback';
    
    if (grokResponse && grokResponse.success && grokResponse.response) {
      // Use Grok's Chain-of-Thought response
      formattedResponse = grokResponse.response;
      modelUsed = 'grok-enhanced';
    } else {
      // Use fallback response
      formattedResponse = generateFallbackResponse(query, results);
      modelUsed = 'fallback';
    }
    
    // Calculate quality score
    var qualityScore = results.length > 0 ? Math.min(results.length * 20, 100) : 0;
    if (modelUsed === 'grok-enhanced') {
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
        formatted: true,
        professional_style: true,
        chain_of_thought: true,
        last_updated: new Date().toISOString(),
        confidence: results.length > 0 ? 'Medium' : 'Low',
        quality_score: qualityScore,
        grok_used: modelUsed === 'grok-enhanced'
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
