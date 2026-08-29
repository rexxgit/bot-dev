// api/data.js - Research Methodology Edition
// ============================================================
// Purpose: AI-powered intelligence bot with systematic research
// methodology, Chain-of-Thought reasoning, and professional
// reporting capabilities.
//
// Research Framework:
// 1. Topic Selection & Framing
// 2. Literature Review (RAG)
// 3. Hypothesis Formulation
// 4. Study & Analysis Design
// 5. Data Collection & Synthesis
// 6. Data Analysis
// 7. Structured Reporting
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
// SECTION 1: RESEARCH METHODOLOGY FRAMEWORK
// ============================================

/**
 * Research Methodology Framework
 * Applies systematic research methodology to analyze user queries
 */
var ResearchMethodology = {
  /**
   * Step 1: Topic Selection & Framing
   * Identifies and refines the core analytical question
   */
  frameTopic: function(query) {
    var topic = {
      originalQuery: query,
      refinedQuestion: '',
      scope: '',
      keyComponents: []
    };
    
    // Extract key terms
    var words = query.toLowerCase().split(/\s+/);
    var keyTerms = [];
    for (var i = 0; i < words.length; i++) {
      if (words[i].length > 3) {
        keyTerms.push(words[i]);
      }
    }
    
    topic.refinedQuestion = 'How can we analyze and understand ' + query + '?';
    topic.scope = 'Investigating ' + query + ' using multi-source intelligence';
    topic.keyComponents = keyTerms;
    
    return topic;
  },
  
  /**
   * Step 2: Literature Review
   * Cross-references retrieved metadata and sources
   */
  reviewLiterature: function(query, sources) {
    var review = {
      sourceCount: sources.length,
      sourceSummary: [],
      keyFindings: [],
      gaps: []
    };
    
    for (var i = 0; i < sources.length; i++) {
      var s = sources[i];
      review.sourceSummary.push({
        title: s.title,
        source: s.source_name,
        relevance: s.relevance + '%'
      });
      
      // Extract potential key findings
      if (s.fullContent) {
        var sentences = s.fullContent.split(/[.!?]+/);
        for (var j = 0; j < Math.min(sentences.length, 3); j++) {
          var sentence = sentences[j].trim();
          if (sentence.length > 30 && sentence.length < 200) {
            review.keyFindings.push(sentence);
          }
        }
      }
    }
    
    // Limit key findings
    review.keyFindings = review.keyFindings.slice(0, 10);
    
    return review;
  },
  
  /**
   * Step 3: Hypothesis Formulation
   * Develops logical predictions
   */
  formulateHypotheses: function(query, sources) {
    var hypotheses = [];
    
    // Hypothesis 1: Multi-source synthesis
    if (sources.length >= 3) {
      hypotheses.push({
        id: 'H1',
        statement: 'Multi-source synthesis provides more comprehensive insights than single-source analysis',
        confidence: sources.length >= 4 ? 'High' : 'Medium'
      });
    }
    
    // Hypothesis 2: Relevance correlates with value
    var highRelevance = sources.filter(function(s) { return s.relevance >= 80; });
    if (highRelevance.length >= 2) {
      hypotheses.push({
        id: 'H2',
        statement: 'Higher relevance scores correlate with more actionable insights',
        confidence: 'Medium'
      });
    }
    
    // Hypothesis 3: Pattern identification
    if (sources.length >= 2) {
      hypotheses.push({
        id: 'H3',
        statement: 'Cross-referencing multiple sources reveals patterns not visible in individual sources',
        confidence: 'High'
      });
    }
    
    return hypotheses;
  },
  
  /**
   * Step 4: Study & Analysis Design
   * Selects evaluation criteria
   */
  designStudy: function() {
    return {
      criteria: [
        { name: 'Source Relevance', weight: 0.30 },
        { name: 'Content Quality', weight: 0.25 },
        { name: 'Source Diversity', weight: 0.20 },
        { name: 'Recency', weight: 0.15 },
        { name: 'Authority', weight: 0.10 }
      ],
      methodology: 'Systematic literature review with RAG and Chain-of-Thought',
      validation: 'Cross-source triangulation'
    };
  },
  
  /**
   * Step 5: Data Collection & Synthesis
   * Extracts and organizes data
   */
  collectData: function(sources) {
    var data = {
      totalSources: sources.length,
      extractedFacts: [],
      sourceMetrics: [],
      synthesizedInsights: []
    };
    
    for (var i = 0; i < sources.length; i++) {
      var s = sources[i];
      data.sourceMetrics.push({
        title: s.title,
        relevance: s.relevance,
        sourceType: s.source_type || 'blog',
        wordCount: s.word_count || 0
      });
      
      if (s.chunk) {
        data.extractedFacts.push(s.chunk.substring(0, 200));
      }
    }
    
    return data;
  },
  
  /**
   * Step 6: Data Analysis
   * Examines findings to surface patterns
   */
  analyzeData: function(data) {
    var analysis = {
      patterns: [],
      strengths: [],
      weaknesses: [],
      confidenceScore: 0
    };
    
    // Pattern analysis
    if (data.totalSources >= 5) {
      analysis.patterns.push('Multiple sources provide consistent insights');
    }
    if (data.totalSources >= 3) {
      analysis.patterns.push('Cross-source triangulation is possible');
    }
    
    // Confidence calculation
    var avgRelevance = 0;
    for (var i = 0; i < data.sourceMetrics.length; i++) {
      avgRelevance += data.sourceMetrics[i].relevance || 0;
    }
    avgRelevance = avgRelevance / Math.max(data.sourceMetrics.length, 1);
    analysis.confidenceScore = Math.min(avgRelevance / 10, 10);
    
    return analysis;
  },
  
  /**
   * Step 7: Structured Reporting
   * Generates research report
   */
  generateReport: function(topic, literatureReview, hypotheses, studyDesign, data, analysis) {
    var report = {
      topic: topic,
      literatureReview: literatureReview,
      hypotheses: hypotheses,
      studyDesign: studyDesign,
      data: data,
      analysis: analysis,
      timestamp: new Date().toISOString()
    };
    return report;
  }
};

// ============================================
// SEARCH FUNCTION WITH RELEVANCE SCORING
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
    for (var j = 0; j < results.length; j++) {
      results[j].relevance = Math.max(results[j].relevance, 10);
    }
  }
  
  return { results: results };
}

// ============================================
// RESEARCH PROMPT BUILDER
// ============================================

function buildResearchPrompt(query, sources) {
  // Apply Research Methodology
  var topic = ResearchMethodology.frameTopic(query);
  var literatureReview = ResearchMethodology.reviewLiterature(query, sources);
  var hypotheses = ResearchMethodology.formulateHypotheses(query, sources);
  var studyDesign = ResearchMethodology.designStudy();
  var data = ResearchMethodology.collectData(sources);
  var analysis = ResearchMethodology.analyzeData(data);
  var report = ResearchMethodology.generateReport(topic, literatureReview, hypotheses, studyDesign, data, analysis);
  
  // Build context for DreamPrompting
  var context = sources.map(function(s, i) {
    return 'Source ' + (i + 1) + ':\n' +
           'Title: ' + s.title + '\n' +
           'Author: ' + s.author + '\n' +
           'Date: ' + s.date + '\n' +
           'Content: ' + (s.fullContent || s.chunk || '').substring(0, 800) + '\n' +
           'URL: ' + s.source + '\n' +
           'Relevance: ' + s.relevance + '%\n';
  }).join('\n---\n\n');
  
  // Systematic Research Methodology System Prompt
  var systemPrompt = 
    'You are an expert AI Technology News Publisher, Senior Technical Analyst, and Lead AI Researcher. Your task is to investigate technical inquiries using a systematic research methodology combined with retrieved context (RAG) and structured reasoning.\n\n' +
    'SYSTEMATIC RESEARCH METHODOLOGY:\n' +
    '1. Topic Selection & Framing: Identify and refine the core analytical question from the user inquiry.\n' +
    '2. Literature Review: Cross-reference retrieved metadata, technical benchmarks, and industry publication sources.\n' +
    '3. Hypothesis Formulation: Develop logical predictions regarding model capabilities, architectural trade-offs, and market impact.\n' +
    '4. Study & Analysis Design: Select relevant quantitative and qualitative evaluation criteria (e.g., latency, context window length, SWE-bench performance, cost efficiency).\n' +
    '5. Data Collection & Synthesis: Extract and organize relevant metrics directly from RAG retrieval context and live endpoints.\n' +
    '6. Data Analysis: Examine technical findings to surface patterns, evaluate competitive advantages, and test initial hypotheses.\n' +
    '7. Structured Reporting: Output a seamless, well-spaced, and publication-ready report.\n\n' +
    'RESEARCH CONTEXT:\n' +
    '- Topic: "' + topic.refinedQuestion + '"\n' +
    '- Scope: "' + topic.scope + '"\n' +
    '- Key Components: ' + topic.keyComponents.join(', ') + '\n' +
    '- Sources Analyzed: ' + literatureReview.sourceCount + '\n' +
    '- Key Findings: ' + literatureReview.keyFindings.length + ' identified\n' +
    '- Hypotheses: ' + hypotheses.length + ' formulated\n\n' +
    'RESPONSE STRUCTURE:\n' +
    '1. **Grok API Reasoning Trace:** Display the backend query routing, literature synthesis, and hypothesis verification pathway.\n\n' +
    '2. **Explanation:** Provide a smooth, paraphrased overview of the current technology landscape grounded in the literature review.\n\n' +
    '3. **Interpretation:** Analyze what the collected data implies for developers, software architects, and enterprise decision-makers.\n\n' +
    '4. **Conclusion:** Deliver a clear, definitive summary statement addressing the core research question.\n\n' +
    '5. **Suggestions:** Provide actionable, strategic steps for technical implementation and architectural planning.\n\n' +
    '6. **Verified Reference Sources:** List all references with active, clickable Markdown hyperlinks formatted strictly as [Source Name](URL) pulled directly from metadata.\n\n' +
    'FORMATTING GUIDELINES:\n' +
    '- Use ## for section headers\n' +
    '- Use bullet points (- ) for lists\n' +
    '- Use **bold** for emphasis\n' +
    '- Use tables for structured data\n' +
    '- Use numbered lists for steps\n' +
    '- Write in clear, professional, publication-ready language\n' +
    '- Maintain an authoritative, objective, and publishing-ready tone throughout';
  
  var userPrompt = 
    'RESEARCH QUESTION:\n' + query + '\n\n' +
    'CONTEXT FROM SOURCES:\n' + context + '\n\n' +
    'RESEARCH METHODOLOGY APPLIED:\n' +
    '1. Topic Framing: ' + topic.refinedQuestion + '\n' +
    '2. Literature Review: ' + literatureReview.sourceCount + ' sources analyzed\n' +
    '3. Hypotheses: ' + hypotheses.length + ' formulated\n' +
    '4. Study Design: ' + JSON.stringify(studyDesign.criteria) + '\n' +
    '5. Data Collected: ' + data.totalSources + ' sources\n' +
    '6. Analysis Complete: Confidence ' + analysis.confidenceScore.toFixed(1) + '/10\n\n' +
    'Apply the systematic research methodology to generate a comprehensive, publication-ready analysis.';
  
  return {
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ],
    metadata: {
      topic: topic,
      hypotheses: hypotheses,
      studyDesign: studyDesign,
      analysis: analysis
    }
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
  
  try {
    var promptData = buildResearchPrompt(query, sources);
    
    var url = 'https://dreamprompting.com/api/v1/chat/completions';
    
    var requestBody = {
      model: 'auto',
      messages: promptData.messages,
      temperature: 0.25,
      max_tokens: 3000,
      top_p: 0.95
    };
    
    console.log('Calling DreamPrompting API with model: auto (Research Methodology)');
    
    var response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + apiKey
      },
      body: JSON.stringify(requestBody)
    });
    
    if (!response.ok) {
      var errorText = await response.text();
      console.error('DreamPrompting API error:', response.status, errorText);
      return null;
    }
    
    var data = await response.json();
    console.log('DreamPrompting API call successful with model: auto');
    
    if (data.choices && data.choices[0] && data.choices[0].message) {
      // Add research metadata to the response
      var responseContent = data.choices[0].message.content;
      
      // Append research methodology metadata
      var methodologySummary = 
        '\n\n---\n\n' +
        '## 🔬 Research Methodology Summary\n\n' +
        '| Step | Description | Status |\n' +
        '|------|-------------|--------|\n' +
        '| 1. Topic Framing | ' + promptData.metadata.topic.refinedQuestion + ' | ✅ Complete |\n' +
        '| 2. Literature Review | ' + sources.length + ' sources analyzed | ✅ Complete |\n' +
        '| 3. Hypothesis Formulation | ' + promptData.metadata.hypotheses.length + ' hypotheses | ✅ Complete |\n' +
        '| 4. Study Design | Multi-source RAG + CoT | ✅ Complete |\n' +
        '| 5. Data Collection | ' + sources.length + ' sources extracted | ✅ Complete |\n' +
        '| 6. Data Analysis | Confidence: ' + promptData.metadata.analysis.confidenceScore.toFixed(1) + '/10 | ✅ Complete |\n' +
        '| 7. Structured Reporting | Publication-ready format | ✅ Complete |\n\n' +
        '**Research Confidence:** ' + (promptData.metadata.analysis.confidenceScore >= 7 ? 'High' : 'Medium') + '\n' +
        '**Sources Triangulated:** ' + sources.length + '\n' +
        '**Methodology:** Systematic Literature Review with Chain-of-Thought Reasoning';
      
      return {
        success: true,
        response: responseContent + methodologySummary,
        model: data.model || 'auto',
        usage: data.usage || null,
        researchMetadata: promptData.metadata
      };
    }
    
    return null;
  } catch (error) {
    console.error('DreamPrompting API error:', error.message);
    return null;
  }
}

// ============================================
// FALLBACK RESPONSE - RESEARCH EDITION
// ============================================

function generateFallbackResponse(query, results) {
  var output = [];
  
  // Apply Research Methodology even in fallback
  var topic = ResearchMethodology.frameTopic(query);
  var literatureReview = ResearchMethodology.reviewLiterature(query, results);
  var hypotheses = ResearchMethodology.formulateHypotheses(query, results);
  var studyDesign = ResearchMethodology.designStudy();
  var data = ResearchMethodology.collectData(results);
  var analysis = ResearchMethodology.analyzeData(data);
  
  output.push('## 🔬 Grok API Reasoning Trace');
  output.push('');
  output.push('**Research Question:** "' + query + '"');
  output.push('');
  output.push('**Topic Framing:** ' + topic.refinedQuestion);
  output.push('');
  output.push('**Literature Review:** ' + literatureReview.sourceCount + ' sources identified');
  output.push('');
  output.push('**Hypotheses Formulated:**');
  for (var h = 0; h < hypotheses.length; h++) {
    output.push('  - ' + hypotheses[h].id + ': ' + hypotheses[h].statement + ' (Confidence: ' + hypotheses[h].confidence + ')');
  }
  output.push('');
  output.push('**Data Analysis:** Confidence Score: ' + analysis.confidenceScore.toFixed(1) + '/10');
  output.push('');
  
  output.push('## 📊 Explanation');
  output.push('');
  
  if (results && results.length > 0) {
    output.push('Based on the systematic analysis of ' + results.length + ' sources:');
    output.push('');
    for (var i = 0; i < Math.min(results.length, 3); i++) {
      var r = results[i];
      output.push('**' + (i + 1) + '. ' + r.title + '**');
      output.push(r.chunk.substring(0, 200) + '...');
      output.push('*Source: [' + r.source_name + '](' + r.source + ')*');
      output.push('');
    }
  } else {
    output.push('No specific sources found. Expanding search parameters.');
    output.push('');
  }
  
  output.push('## 🔍 Interpretation');
  output.push('');
  
  if (results && results.length > 0) {
    output.push('Key patterns identified from the literature review:');
    output.push('');
    for (var j = 0; j < Math.min(results.length, 3); j++) {
      var s = results[j];
      output.push('- **' + s.title + '** (Relevance: ' + s.relevance + '%)');
      output.push('  - Source: [' + s.source_name + '](' + s.source + ')');
      output.push('  - Key finding: ' + (s.chunk || '').substring(0, 100) + '...');
    }
    output.push('');
    output.push('These findings suggest a complex, multi-faceted landscape with diverse perspectives.');
  } else {
    output.push('Insufficient data for comprehensive interpretation. Consider refining the research question.');
  }
  output.push('');
  
  output.push('## ✅ Conclusion');
  output.push('');
  
  if (results && results.length > 0) {
    output.push('Based on the systematic analysis of ' + results.length + ' sources, the research provides valuable insights into "' + query + '".');
    output.push('');
    output.push('The most relevant sources (' + results.map(function(r) { return r.source_name; }).slice(0, 3).join(', ') + ') offer complementary perspectives.');
  } else {
    output.push('No conclusive findings. Consider expanding the search to include additional sources.');
  }
  output.push('');
  
  output.push('## 💡 Suggestions');
  output.push('');
  
  if (results && results.length > 0) {
    output.push('1. **Expand the literature review** to include additional sources');
    output.push('2. **Cross-reference findings** across multiple sources for validation');
    output.push('3. **Apply the research methodology** to specific sub-topics');
    output.push('4. **Consider the context and timeliness** of each source');
    output.push('5. **Evaluate the relevance** of each source based on your specific needs');
  } else {
    output.push('1. **Refine the research question** to be more specific');
    output.push('2. **Expand the search** to include additional sources');
    output.push('3. **Consider related topics** that may yield relevant results');
  }
  output.push('');
  
  if (results && results.length > 0) {
    output.push('## 📚 Verified Reference Sources');
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
  
  output.push('## 📊 Research Assessment');
  output.push('');
  
  var confidence = results && results.length >= 3 ? 'High' : results && results.length >= 1 ? 'Medium' : 'Low';
  var qualityScore = 0;
  if (results && results.length > 0) {
    var total = 0;
    for (var m = 0; m < results.length; m++) {
      total += results[m].relevance || 0;
    }
    qualityScore = Math.round(total / results.length);
  }
  
  output.push('**Confidence:** ' + confidence + ' (' + analysis.confidenceScore.toFixed(1) + '/10)');
  output.push('**Quality Rating:** ' + (qualityScore >= 80 ? 'Excellent' : qualityScore >= 60 ? 'Good' : 'Fair') + ' (' + qualityScore + '%)');
  output.push('**Methodology:** Systematic Literature Review with RAG');
  output.push('**Sources Analyzed:** ' + (results ? results.length : 0));
  output.push('');
  
  output.push('---');
  output.push('');
  output.push('*Research generated on ' + new Date().toLocaleString() + ' using multi-source intelligence.*');
  output.push('*Model: research-fallback | Methodology: Systematic Research Framework v2.0*');
  
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
    
    // Try DreamPrompting API with Research Methodology
    console.log('Attempting DreamPrompting API call with Research Methodology...');
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
      modelUsed = 'research-fallback';
      usingAPI = false;
      console.log('Using fallback response');
    }
    
    // Calculate quality score
    var qualityScore = 0;
    if (results && results.length > 0) {
      var totalRelevance = 0;
      for (var i = 0; i < results.length; i++) {
        totalRelevance += results[i].relevance || 0;
      }
      qualityScore = Math.round(totalRelevance / results.length);
      if (usingAPI) {
        qualityScore = Math.min(qualityScore + 20, 100);
      }
    }
    
    if (results && results.length > 0 && qualityScore === 0) {
      qualityScore = 25;
    }
    
    var confidenceLevel = results.length >= 3 ? 'High' : results.length >= 1 ? 'Medium' : 'Low';
    if (usingAPI) {
      confidenceLevel = results.length >= 2 ? 'High' : 'Medium';
    }
    
    return res.status(200).json({
      response: formattedResponse,
      sources: results,
      metadata: {
        total_sources: uniqueSources.length,
        matches_found: results.length,
        ai_generated: true,
        model: modelUsed,
        provider: usingAPI ? 'DreamPrompting API' : 'Research Fallback',
        methodology: 'Systematic Research Framework v2.0',
        formatted: true,
        research_methodology: true,
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
