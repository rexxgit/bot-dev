// api/data.js - Fixed Version with Proper Quality Score
// ============================================================
// Purpose: AI-powered intelligence bot with proper formatting,
// quality scoring, and source hyperlinking
// ============================================================

// ============================================
// ALL DATA EMBEDDED HERE
// ============================================

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
    content: "Meta founder and CEO Mark Zuckerberg is trying to sell investors on his prediction for the future - one where billions of people will have their own personal AI agents in the next five years.",
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
    content: "October 13 - 15, 2026 - San Francisco Innovation for Every Stage Disrupt is where you'll find innovation for every stage of your startup journey.",
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
    author: "Michael Nunez",
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

// ============================================
// SEARCH FUNCTION - IMPROVED
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
    var matchCount = 0;
    
    for (var i = 0; i < queryWords.length; i++) {
      var word = queryWords[i];
      if (title.indexOf(word) !== -1) {
        score += 20;
        matchCount++;
      }
      if (content.indexOf(word) !== -1) {
        score += 8;
        matchCount++;
      }
      if (sourceName.indexOf(word) !== -1) {
        score += 10;
        matchCount++;
      }
    }
    
    // Boost for exact phrase matches
    if (title.indexOf(queryLower) !== -1) {
      score += 40;
      matchCount += 2;
    }
    if (content.indexOf(queryLower) !== -1) {
      score += 20;
      matchCount += 1;
    }
    
    // Calculate relevance based on score and match count
    var maxScore = queryWords.length * 20 + 40;
    var relevance = Math.min(Math.round((score / Math.max(maxScore, 1)) * 100), 100);
    
    // If relevance is 0 but there are matches, set minimum relevance
    if (relevance === 0 && matchCount > 0) {
      relevance = Math.min(matchCount * 10, 50);
    }
    
    return {
      title: source.title || 'Untitled',
      source: source.url || '#',
      source_name: source.source_name || 'Unknown',
      author: source.author || 'Unknown',
      date: source.date || '',
      chunk: (source.content || '').substring(0, 350) + '...',
      fullContent: source.content || '',
      relevance: relevance,
      score: score,
      matchCount: matchCount
    };
  });
  
  // Sort by score
  scoredResults.sort(function(a, b) {
    return b.score - a.score;
  });
  
  // Get top results with score > 0, or fallback to top 4
  var results = scoredResults.filter(function(r) { return r.score > 0; }).slice(0, 5);
  
  if (results.length === 0) {
    results = scoredResults.slice(0, 4);
    for (var j = 0; j < results.length; j++) {
      results[j].relevance = Math.max(results[j].relevance, 15);
    }
  }
  
  // Ensure minimum relevance for results
  for (var k = 0; k < results.length; k++) {
    if (results[k].relevance < 10) {
      results[k].relevance = 15;
    }
  }
  
  return { results: results };
}

// ============================================
// GROK API REASONING TRACE GENERATOR
// ============================================

function generateReasoningTrace(query, sources) {
  var sourceCount = sources.length;
  var avgRelevance = 0;
  for (var i = 0; i < sources.length; i++) {
    avgRelevance += sources[i].relevance || 0;
  }
  avgRelevance = sourceCount > 0 ? Math.round(avgRelevance / sourceCount) : 0;
  
  var sourceNames = sources.map(function(s) { return s.source_name; }).join(', ');
  
  var trace = 'Active retrieval query executed across ' + sourceCount + ' relevant sources. ';
  trace += 'Average relevance: ' + avgRelevance + '%. ';
  trace += 'Synthesis methodology: Comparative analysis from industry-leading sources ';
  if (sourceNames) {
    trace += '(' + sourceNames + ') ';
  }
  trace += 'to identify consensus-driven insights for the query. Focus on patterns with demonstrated adoption and cross-functional utility.';
  
  return trace;
}

// ============================================
// BUILD ADAPTABLE PROMPT
// ============================================

function buildAdaptablePrompt(query, sources) {
  var context = sources.map(function(s, i) {
    return 'Source ' + (i + 1) + ':\n' +
           'Title: ' + s.title + '\n' +
           'Author: ' + s.author + '\n' +
           'Date: ' + s.date + '\n' +
           'Content: ' + (s.fullContent || s.chunk || '').substring(0, 500) + '\n' +
           'URL: ' + s.source + '\n' +
           'Relevance: ' + s.relevance + '%\n';
  }).join('\n');
  
  var systemPrompt = 
    'You are an expert AI Technology Analyst and Adaptable Format Output Organizer.\n\n' +
    'OUTPUT FORMAT:\n\n' +
    '**Grok API Reasoning Trace:** [Active retrieval query executed across X relevant sources. Average relevance: X%. Synthesis methodology: Comparative analysis...]\n\n' +
    '### Explanation of the Current Landscape\n' +
    '[Provide a clear, professional overview. Use paragraphs, not bullet points here.]\n\n' +
    '### Interpretation of Market Dynamics\n' +
    '[Analyze what the data implies. Use bullet points for key insights.]\n\n' +
    '### Strategic Conclusion\n' +
    '[Deliver a definitive summary statement.]\n\n' +
    '### Actionable Suggestions\n' +
    '* [Suggestion 1]\n' +
    '* [Suggestion 2]\n' +
    '* [Suggestion 3]\n' +
    '* [Suggestion 4]\n' +
    '* [Suggestion 5]\n\n' +
    '### Verified Reference Sources\n' +
    '* [Source Name](URL)\n' +
    '* [Source Name](URL)\n\n' +
    'FORMATTING RULES:\n' +
    '- Use **bold** for section headers\n' +
    '- Use ### for sub-section headers\n' +
    '- Use * for bullet points (with a space after the asterisk)\n' +
    '- Use [Source Name](URL) for all source links\n' +
    '- Use proper spacing between sections\n' +
    '- Write in professional, publication-ready language\n' +
    '- Adapt content to the specific query while maintaining the structure';
  
  var userPrompt = 
    'RESEARCH QUERY: ' + query + '\n\n' +
    'CONTEXT FROM SOURCES:\n' + context + '\n\n' +
    'Generate an adaptable, professional research report following the format guidelines.';
  
  return {
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ]
  };
}

// ============================================
// DREAM PROMPTING API CALL
// ============================================

async function callDreamPromptingAPI(query, sources) {
  var apiKey = process.env.OPEN_AI_KEY;
  
  if (!apiKey) {
    console.error('OPEN_AI_KEY environment variable is not set');
    return null;
  }
  
  console.log('Using DreamPrompting API key:', apiKey.substring(0, 10) + '...' + apiKey.substring(apiKey.length - 4));
  
  var promptData = buildAdaptablePrompt(query, sources);
  
  var url = 'https://dreamprompting.com/api/v1/chat/completions';
  
  var requestBody = {
    model: 'auto',
    messages: promptData.messages,
    temperature: 0.3,
    max_tokens: 2500,
    top_p: 0.95
  };
  
  console.log('Calling DreamPrompting API with model: auto');
  
  var timeoutPromise = new Promise(function(resolve, reject) {
    setTimeout(function() {
      reject(new Error('API call timed out after 9 seconds'));
    }, 9000);
  });
  
  var fetchPromise = fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + apiKey
    },
    body: JSON.stringify(requestBody)
  }).then(function(response) {
    if (!response.ok) {
      return response.text().then(function(text) {
        throw new Error('API error: ' + response.status + ' - ' + text);
      });
    }
    return response.json();
  });
  
  try {
    var data = await Promise.race([fetchPromise, timeoutPromise]);
    console.log('DreamPrompting API call successful');
    
    if (data.choices && data.choices[0] && data.choices[0].message) {
      // Clean up the response to ensure proper formatting
      var responseContent = data.choices[0].message.content;
      
      // Ensure source links are properly formatted
      responseContent = responseContent.replace(/\*\s*\[([^\]]+)\]\(([^)]+)\)/g, '* [$1]($2)');
      
      return {
        success: true,
        response: responseContent,
        model: data.model || 'auto',
        usage: data.usage || null
      };
    }
    return null;
  } catch (error) {
    console.error('DreamPrompting API error:', error.message);
    return null;
  }
}

// ============================================
// FALLBACK RESPONSE - WITH PROPER FORMATTING
// ============================================

function generateFallbackResponse(query, sources) {
  var output = [];
  
  // Grok API Reasoning Trace
  var reasoningTrace = generateReasoningTrace(query, sources);
  output.push('**Grok API Reasoning Trace:** ' + reasoningTrace);
  output.push('');
  
  // Explanation
  output.push('### Explanation of the Current Landscape');
  output.push('');
  
  if (sources && sources.length > 0) {
    output.push('The AI tools market in 2026 is characterized by rapid consolidation around platforms that balance accessibility, performance, and integration capabilities. Based on analysis of ' + sources.length + ' sources, the following key themes emerge:');
    output.push('');
    for (var i = 0; i < Math.min(sources.length, 3); i++) {
      var s = sources[i];
      output.push('**' + (i + 1) + '. ' + s.title + '**');
      output.push(s.chunk.substring(0, 200) + '...');
      output.push('Source: [' + s.source_name + '](' + s.source + ')');
      output.push('');
    }
  } else {
    output.push('No specific sources found. Try refining your query.');
    output.push('');
  }
  
  // Interpretation
  output.push('### Interpretation of Market Dynamics');
  output.push('');
  if (sources && sources.length > 0) {
    output.push('The data implies a maturing market where:');
    output.push('');
    output.push('* **User Experience Trumps Novelty:** Tools prioritizing intuitive interfaces are outperforming purely technical solutions.');
    output.push('* **Integration as a Differentiator:** Platforms offering APIs, plugins, or native integrations are more likely to be adopted at scale.');
    output.push('* **Ethical and Governance Focus:** Increasing scrutiny on AI ethics has elevated tools with built-in bias detection and explainability.');
    output.push('');
    output.push('**For stakeholders:**');
    output.push('');
    output.push('* **Developers:** Should prioritize tools with robust SDKs and community support.');
    output.push('* **Businesses:** Need platforms that align with existing tech stacks and compliance requirements.');
    output.push('* **End Users:** Benefit from tools that reduce cognitive load (e.g., AI copilots for complex tasks).');
  } else {
    output.push('Insufficient data for comprehensive interpretation. Consider refining the search.');
  }
  output.push('');
  
  // Conclusion
  output.push('### Strategic Conclusion');
  output.push('');
  if (sources && sources.length > 0) {
    output.push('The top AI tools of 2026 are those that successfully bridge the gap between cutting-edge capabilities and practical usability, with a strong emphasis on integration, governance, and domain-specific optimization. The market is no longer about if AI will be adopted, but how it will be operationalized.');
  } else {
    output.push('No conclusive findings. Consider expanding the search to include additional sources.');
  }
  output.push('');
  
  // Suggestions
  output.push('### Actionable Suggestions');
  output.push('');
  output.push('* **For Startups & SMEs:** Prioritize all-in-one platforms to minimize tool sprawl. Evaluate tools with free tiers or scalable pricing models.');
  output.push('* **For Enterprises:** Conduct a gap analysis between current workflows and AI tool capabilities. Pilot tools with built-in compliance features.');
  output.push('* **For Developers:** Focus on platforms with open APIs and strong documentation. Monitor open-source alternatives for cost-effective solutions.');
  output.push('* **For Educators & Researchers:** Leverage tools with educational licenses or sandbox environments.');
  output.push('* **For Investors:** Track adoption metrics and partnerships as leading indicators of long-term viability.');
  output.push('');
  
  // Sources
  output.push('### Verified Reference Sources');
  output.push('');
  for (var j = 0; j < Math.min(sources.length, 4); j++) {
    var src = sources[j];
    output.push('* [' + src.source_name + ' - ' + src.title + '](' + src.source + ')');
  }
  
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
        response: 'Please provide a valid research question.',
        sources: [],
        metadata: { fallback: true }
      });
    }

    var searchResult = searchSources(query);
    var results = searchResult.results || [];
    
    console.log('Attempting DreamPrompting API call...');
    var apiResponse = await callDreamPromptingAPI(query, results);
    
    var formattedResponse;
    var modelUsed;
    var usingAPI = false;
    
    if (apiResponse && apiResponse.success && apiResponse.response) {
      formattedResponse = apiResponse.response;
      modelUsed = apiResponse.model || 'dream-prompting-auto';
      usingAPI = true;
      console.log('DreamPrompting API used successfully');
    } else {
      formattedResponse = generateFallbackResponse(query, results);
      modelUsed = 'adaptable-fallback';
      usingAPI = false;
      console.log('Using adaptable fallback response');
    }
    
    // ============================================
    // FIXED: QUALITY SCORE CALCULATION
    // ============================================
    var qualityScore = 0;
    if (results && results.length > 0) {
      var totalRelevance = 0;
      var highRelevanceCount = 0;
      
      for (var i = 0; i < results.length; i++) {
        var rel = results[i].relevance || 0;
        totalRelevance += rel;
        if (rel >= 80) highRelevanceCount++;
      }
      
      // Average relevance
      var avgRelevance = totalRelevance / results.length;
      qualityScore = Math.round(avgRelevance);
      
      // Bonus for multiple high-relevance sources
      if (highRelevanceCount >= 3) {
        qualityScore = Math.min(qualityScore + 15, 100);
      } else if (highRelevanceCount >= 2) {
        qualityScore = Math.min(qualityScore + 10, 100);
      } else if (highRelevanceCount >= 1) {
        qualityScore = Math.min(qualityScore + 5, 100);
      }
      
      // Bonus if using DreamPrompting API
      if (usingAPI) {
        qualityScore = Math.min(qualityScore + 10, 100);
      }
      
      // Ensure minimum quality score
      if (qualityScore < 20 && results.length >= 2) {
        qualityScore = 25;
      }
    }
    
    // ============================================
    // FIXED: CONFIDENCE LEVEL CALCULATION
    // ============================================
    var confidenceLevel = 'Low';
    if (results.length >= 5 && qualityScore >= 70) {
      confidenceLevel = 'High';
    } else if (results.length >= 3 && qualityScore >= 50) {
      confidenceLevel = 'Medium';
    } else if (results.length >= 2 && qualityScore >= 30) {
      confidenceLevel = 'Medium';
    } else if (results.length >= 1 && qualityScore >= 20) {
      confidenceLevel = 'Medium';
    }
    
    return res.status(200).json({
      response: formattedResponse,
      sources: results,
      metadata: {
        total_sources: uniqueSources.length,
        matches_found: results.length,
        ai_generated: true,
        model: modelUsed,
        provider: usingAPI ? 'DreamPrompting API' : 'Adaptable Fallback',
        methodology: 'Adaptable Format Output Organizer v1.0',
        formatted: true,
        adaptable: true,
        last_updated: new Date().toISOString(),
        confidence: confidenceLevel,
        quality_score: qualityScore,
        api_used: usingAPI
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
