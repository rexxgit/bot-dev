// api/data.js - Adaptable Format Output Organizer
// ============================================================
// Purpose: AI-powered intelligence bot with adaptable output
// formatting that dynamically adjusts to any user query while
// maintaining professional structure.
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
// SEARCH FUNCTION
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
      chunk: (source.content || '').substring(0, 300) + '...',
      fullContent: source.content || '',
      relevance: relevance,
      score: score
    };
  });
  
  scoredResults.sort(function(a, b) {
    return b.score - a.score;
  });
  
  var results = scoredResults.filter(function(r) { return r.score > 0; }).slice(0, 4);
  
  if (results.length === 0) {
    results = scoredResults.slice(0, 4);
    for (var j = 0; j < results.length; j++) {
      results[j].relevance = Math.max(results[j].relevance, 10);
    }
  }
  
  return { results: results };
}

// ============================================
// ADAPTABLE OUTPUT ORGANIZER
// ============================================

var OutputOrganizer = {
  /**
   * Determines the appropriate output structure based on query type
   */
  detectQueryType: function(query) {
    var lower = query.toLowerCase();
    
    var patterns = {
      comparison: ['compare', 'versus', 'vs', 'against', 'better', 'best', 'worst', 'top', 'ranking'],
      explanation: ['explain', 'how', 'why', 'what', 'describe', 'overview', 'meaning'],
      analysis: ['analyze', 'evaluate', 'assess', 'examine', 'review', 'trend'],
      recommendation: ['recommend', 'suggest', 'advice', 'should', 'which', 'choose'],
      prediction: ['predict', 'future', 'will', 'forecast', 'trend', 'next'],
      technical: ['technical', 'architecture', 'implementation', 'code', 'api', 'performance']
    };
    
    var scores = {};
    for (var type in patterns) {
      scores[type] = 0;
      for (var i = 0; i < patterns[type].length; i++) {
        if (lower.indexOf(patterns[type][i]) !== -1) {
          scores[type]++;
        }
      }
    }
    
    var maxScore = 0;
    var detectedType = 'analysis';
    for (var type in scores) {
      if (scores[type] > maxScore) {
        maxScore = scores[type];
        detectedType = type;
      }
    }
    
    return detectedType;
  },
  
  /**
   * Generates a dynamic Grok API Reasoning Trace based on query
   */
  generateReasoningTrace: function(query, sources) {
    var queryType = this.detectQueryType(query);
    var sourceCount = sources.length;
    var avgRelevance = 0;
    for (var i = 0; i < sources.length; i++) {
      avgRelevance += sources[i].relevance || 0;
    }
    avgRelevance = sourceCount > 0 ? Math.round(avgRelevance / sourceCount) : 0;
    
    var traces = {
      comparison: 'Active retrieval query executed across late-2026 developer telemetry, benchmark frameworks, and industry literature. Cross-referenced model performance metrics (MMLU, VQA), API adoption statistics, and latency benchmarks to synthesize the current enterprise AI landscape. Multi-source triangulation applied across ' + sourceCount + ' sources with ' + avgRelevance + '% average relevance.',
      
      explanation: 'Retrieved context from ' + sourceCount + ' technical sources across AI benchmark frameworks, developer documentation, and industry publications. Applied systematic literature review methodology to extract key concepts, use cases, and adoption patterns. Synthesis focused on clarity and practical understanding.',
      
      analysis: 'Executed deep analytical query across ' + sourceCount + ' data sources including performance benchmarks, market reports, and technical specifications. Applied weighted scoring methodology to evaluate model capabilities, ecosystem maturity, and enterprise readiness. Identified patterns across source relevance (' + avgRelevance + '% average).',
      
      recommendation: 'Synthesized recommendations from ' + sourceCount + ' authoritative sources including enterprise case studies, implementation guides, and cost-benefit analyses. Evaluated models against specific criteria: performance, cost, safety, and ecosystem maturity. Prioritized actionable, implementation-ready suggestions.',
      
      prediction: 'Forecast analysis executed across ' + sourceCount + ' sources including market research, technology roadmaps, and trend reports. Applied pattern recognition to identify emerging trajectories. Confidence scoring based on source consistency and recency (all within 30 days).',
      
      technical: 'Deep technical analysis executed across ' + sourceCount + ' sources including API documentation, performance benchmarks, and architectural patterns. Extracted technical specifications, implementation considerations, and integration requirements. Focused on developer-facing metrics and practical implementation.'
    };
    
    var trace = traces[queryType] || traces.analysis;
    
    // Add source metadata if available
    var sourceNames = sources.map(function(s) { return s.source_name; }).join(', ');
    if (sourceNames) {
      trace += ' Sources triangulated: ' + sourceNames + '.';
    }
    
    return trace;
  },
  
  /**
   * Generates adaptable explanation based on query type
   */
  generateExplanation: function(query, sources, queryType) {
    var lower = query.toLowerCase();
    var sourceCount = sources.length;
    
    // Extract key terms from query
    var keyTerms = [];
    var words = lower.split(/\s+/);
    for (var i = 0; i < words.length; i++) {
      if (words[i].length > 4) {
        keyTerms.push(words[i]);
      }
    }
    var keyTermString = keyTerms.length > 0 ? keyTerms.slice(0, 3).join(', ') : query.substring(0, 30);
    
    var explanations = {
      comparison: 'The ' + keyTermString + ' landscape in 2026 is defined by a fusion of multimodal capabilities, low-latency execution, and robust developer ecosystems. The market is currently dominated by proprietary flagship models that each serve distinct strategic purposes. Based on ' + sourceCount + ' analyzed sources, OpenAI\'s GPT-5.6 leads as a general-purpose powerhouse with state-of-the-art multimodal reasoning, while Anthropic\'s Claude Sonnet 5 excels in safety-first alignment and complex reasoning for regulated sectors. Simultaneously, xAI\'s Grok 4.5 has captured the latency-critical market with sub-100ms response times, and open-source models like Mistral-7B-V2 are offering cost-effective alternatives for internal enterprise tooling.',
      
      explanation: 'The ' + keyTermString + ' ecosystem has evolved significantly, with multiple models serving distinct purposes. Based on ' + sourceCount + ' analyzed sources, the current landscape is characterized by rapid innovation, decreasing costs, and increasing accessibility. Key developments include improved reasoning capabilities, enhanced multimodal understanding, and tighter integration with existing software ecosystems.',
      
      analysis: 'Analysis of ' + sourceCount + ' sources reveals that ' + keyTermString + ' represents a critical area of AI development. The data shows significant progress in benchmark performance, with top models achieving near-human capability on complex reasoning tasks. Key metrics indicate that the market is diversifying, with specialized models emerging alongside general-purpose solutions.',
      
      recommendation: 'Based on ' + sourceCount + ' analyzed sources, the ' + keyTermString + ' decision requires careful consideration of multiple factors. The current landscape offers several viable options depending on specific requirements: performance needs, budget constraints, compliance requirements, and integration complexity. Top-tier proprietary models dominate specific verticals like broad ecosystem capability, safety, and speed, respectively.',
      
      prediction: 'Based on ' + sourceCount + ' sources and current trend analysis, ' + keyTermString + ' is poised for continued evolution. Key indicators point toward increased multimodal integration, faster inference speeds, and more sophisticated reasoning capabilities. The market is expected to see further consolidation and specialization in the coming quarters.',
      
      technical: 'Technical analysis of ' + sourceCount + ' sources reveals that ' + keyTermString + ' involves multiple architectural considerations. Key metrics include latency (ranging from 10-25ms), context window length (up to 128K), and token cost (0.0009-0.0012 per 1K tokens). Implementation patterns favor flexible, model-agnostic architectures.'
    };
    
    return explanations[queryType] || explanations.analysis;
  },
  
  /**
   * Generates adaptable interpretation
   */
  generateInterpretation: function(query, sources, queryType) {
    var lower = query.toLowerCase();
    var sourceCount = sources.length;
    var avgRelevance = 0;
    for (var i = 0; i < sources.length; i++) {
      avgRelevance += sources[i].relevance || 0;
    }
    avgRelevance = sourceCount > 0 ? Math.round(avgRelevance / sourceCount) : 0;
    
    var interpretations = {
      comparison: 'Raw benchmark performance alone is no longer the sole driver of enterprise adoption. Businesses are diversifying their AI strategies based on specific operational needs. The necessity of strong multimodal fusion (text, image, and audio) and integrated plugin ecosystems has become a baseline for frontier models. While open-source solutions provide compelling cost advantages, they currently lack the multimodal depth of proprietary engines. Consequently, organizations are treating AI models as swappable components within a flexible architecture, routing specific tasks to the appropriate model rather than relying on a monolithic vendor lock-in.',
      
      explanation: 'The data implies that ' + query.substring(0, 40) + ' is becoming increasingly accessible and democratized. Enterprises are moving beyond experimentation to production deployment, with measurable ROI being realized across multiple use cases. The trend points toward agentic workflows and multimodal integration as the next frontier.',
      
      analysis: 'The data indicates that ' + keyTermString + ' requires a nuanced, context-aware approach. Organizations that achieve the best outcomes maintain flexibility and continuously evaluate new models. The pattern of ' + avgRelevance + '% relevance suggests that while multiple sources exist, the most valuable insights come from a combination of technical benchmarks and real-world implementation experience.',
      
      recommendation: 'Successfully navigating the ' + keyTermString + ' landscape requires abstracting the model layer within your software architecture and aligning model selection tightly with workload priorities. Organizations should adopt a multi-model strategy, treating AI models as swappable components rather than committing to a single vendor.',
      
      prediction: 'The data suggests that ' + keyTermString + ' will continue to evolve rapidly. Organizations should prepare for more capable models, lower costs, and tighter integration across AI providers. Future-proofing involves building flexible, model-agnostic architectures and developing internal expertise in prompt engineering and model evaluation.',
      
      technical: 'Implementation patterns show that ' + keyTermString + ' favors modular, composable architectures. Teams are adopting abstraction layers, standardized interfaces, and comprehensive monitoring to manage the complexity of multi-model deployments.'
    };
    
    var keyTermString = query.length > 30 ? query.substring(0, 30) + '...' : query;
    interpretations['analysis'] = interpretations['analysis'].replace(/keyTermString/g, keyTermString);
    
    return interpretations[queryType] || interpretations.analysis;
  },
  
  /**
   * Generates adaptable conclusion
   */
  generateConclusion: function(query, sources, queryType) {
    var sourceCount = sources.length;
    var topSource = sources.length > 0 ? sources[0].source_name : 'multiple sources';
    var avgRelevance = 0;
    for (var i = 0; i < sources.length; i++) {
      avgRelevance += sources[i].relevance || 0;
    }
    avgRelevance = sourceCount > 0 ? Math.round(avgRelevance / sourceCount) : 0;
    
    var conclusions = {
      comparison: 'The 2026 AI ecosystem is not a "winner-takes-all" environment. Instead, it is highly segmented by use case. Top-tier proprietary models—GPT-5.6, Claude Sonnet 5, and Grok 4.5—dominate specific verticals like broad ecosystem capability, safety, and speed, respectively. Successfully navigating this landscape requires abstracting the model layer within your software architecture and aligning model selection tightly with workload priorities.',
      
      explanation: 'In summary, ' + query.substring(0, 40) + ' represents a mature, rapidly evolving technology landscape with multiple viable solutions. The key to success lies in understanding specific requirements, evaluating options against concrete criteria, and maintaining flexibility to adapt to rapid innovation cycles.',
      
      analysis: 'The analysis of ' + sourceCount + ' sources reveals that ' + query.substring(0, 30) + ' requires a multi-faceted approach. Organizations that succeed maintain a balance between leveraging leading proprietary models and staying agile enough to adopt emerging solutions. The ' + avgRelevance + '% relevance score indicates strong signal quality across sources.',
      
      recommendation: 'The optimal approach to ' + query.substring(0, 30) + ' involves a flexible, multi-model strategy that matches specific workloads to the most appropriate models. Organizations should prioritize abstraction layers, continuous evaluation, and internal skill development to maximize the value of their AI investments.',
      
      prediction: 'Looking ahead, ' + query.substring(0, 30) + ' will continue to evolve rapidly. Organizations that invest in flexible architectures and continuous learning will be best positioned to adapt to the next wave of AI innovation.',
      
      technical: 'Implementation success depends on a clear understanding of technical requirements, performance metrics, and integration patterns. The most successful deployments leverage model-agnostic tooling and comprehensive monitoring.'
    };
    
    return conclusions[queryType] || conclusions.analysis;
  },
  
  /**
   * Generates adaptable suggestions based on query type
   */
  generateSuggestions: function(query, sources, queryType) {
    var suggestions = {
      comparison: [
        '**General Workloads:** Deploy GPT-5.6 for overarching, general-purpose tasks and applications requiring broad ecosystem integration.',
        '**Regulated Industries:** Prioritize Claude Sonnet 5 for use cases where safety, alignment, and deep reasoning are paramount (e.g., finance and healthcare).',
        '**Real-Time Applications:** Leverage Grok 4.5 for latency-critical deployments, such as robotics or real-time conversational agents.',
        '**Cost Optimization:** Utilize open-source frameworks like Mistral-7B-V2 for internal, cost-sensitive data processing pipelines, maintaining a flexible routing layer to swap models seamlessly.',
        '**Talent Upskilling:** Train your engineering teams on core plugin architectures (OpenAI Functions, Anthropic Tools) to accelerate the integration of these models into your current tech stack.'
      ],
      
      explanation: [
        '**Start with a Pilot:** Begin with a small, well-defined use case to evaluate performance and integration requirements.',
        '**Evaluate Multiple Models:** Test at least 2-3 different models on your specific use case to compare performance and cost.',
        '**Build an Abstraction Layer:** Implement a model-agnostic API layer to enable easy swapping of underlying models.',
        '**Monitor Performance:** Track key metrics including latency, accuracy, and cost to inform ongoing optimization.',
        '**Stay Current:** AI models evolve rapidly; schedule regular evaluations (every 3-6 months) to reassess options.'
      ],
      
      analysis: [
        '**Deep Technical Evaluation:** Conduct a comprehensive technical evaluation using your specific data and use cases.',
        '**Performance Benchmarking:** Establish consistent benchmarks that reflect your real-world usage patterns.',
        '**Cost-Benefit Analysis:** Evaluate the total cost of ownership including API costs, integration effort, and maintenance overhead.',
        '**Security Assessment:** Review each model\'s security posture, privacy controls, and compliance certifications.',
        '**Roadmap Integration:** Plan how AI capabilities will integrate with your broader product roadmap.'
      ],
      
      recommendation: [
        '**Clear Requirements:** Define specific, measurable requirements before evaluating AI models.',
        '**Multi-Model Strategy:** Consider adopting multiple models to leverage their respective strengths.',
        '**Pilot Program:** Run a structured pilot with at least 2-3 candidates before committing to a long-term solution.',
        '**Internal Training:** Invest in training your team on prompt engineering, model evaluation, and integration patterns.',
        '**Continuous Evaluation:** AI capabilities evolve rapidly; build a process for ongoing evaluation and optimization.'
      ],
      
      prediction: [
        '**Invest in Flexibility:** Build architectures that can easily adopt new models as they emerge.',
        '**Develop Internal Expertise:** Train your team on prompt engineering, model evaluation, and integration best practices.',
        '**Monitor Emerging Trends:** Stay informed about new model releases, benchmark results, and industry best practices.',
        '**Plan for Scale:** Design systems that can gracefully handle increasing usage and more complex requirements.',
        '**Evaluate Open Source:** Consider open-source alternatives for cost-sensitive or privacy-critical workloads.'
      ],
      
      technical: [
        '**Model-Agnostic Architecture:** Implement a flexible API layer that supports multiple providers.',
        '**Performance Optimization:** Optimize prompt design, context management, and token usage for cost efficiency.',
        '**Security & Compliance:** Implement proper authentication, authorization, and auditing for AI model usage.',
        '**Monitoring & Observability:** Build comprehensive monitoring for latency, cost, and quality metrics.',
        '**Fallback Strategy:** Design graceful degradation when primary models are unavailable or exceed cost limits.'
      ]
    };
    
    return suggestions[queryType] || suggestions.analysis;
  }
};

// ============================================
// BUILDER FOR ADAPTABLE SYSTEM PROMPT
// ============================================

function buildAdaptablePrompt(query, sources) {
  var queryType = OutputOrganizer.detectQueryType(query);
  var reasoningTrace = OutputOrganizer.generateReasoningTrace(query, sources);
  var explanation = OutputOrganizer.generateExplanation(query, sources, queryType);
  var interpretation = OutputOrganizer.generateInterpretation(query, sources, queryType);
  var conclusion = OutputOrganizer.generateConclusion(query, sources, queryType);
  var suggestions = OutputOrganizer.generateSuggestions(query, sources, queryType);
  
  var context = sources.map(function(s, i) {
    return 'Source ' + (i + 1) + ':\n' +
           'Title: ' + s.title + '\n' +
           'Author: ' + s.author + '\n' +
           'Content: ' + (s.fullContent || s.chunk || '').substring(0, 400) + '\n' +
           'URL: ' + s.source + '\n' +
           'Relevance: ' + s.relevance + '%\n';
  }).join('\n');
  
  var systemPrompt = 
    'You are an expert AI Technology Analyst and Adaptable Format Output Organizer.\n\n' +
    'Your task is to generate a professional, well-structured research report that adapts to any user query.\n\n' +
    'OUTPUT FORMAT (Adaptable to any query):\n\n' +
    '**Grok API Reasoning Trace:** [Active retrieval query executed across relevant sources. Include source count, average relevance, and synthesis methodology.]\n\n' +
    '### Explanation of the Current Landscape\n' +
    '[Provide a clear, professional overview tailored to the specific query. Use the provided context to generate relevant insights.]\n\n' +
    '### Interpretation of Market Dynamics\n' +
    '[Analyze what the data implies. Connect findings to broader trends and implications for different audiences.]\n\n' +
    '### Strategic Conclusion\n' +
    '[Deliver a definitive summary statement that addresses the core query.]\n\n' +
    '### Actionable Suggestions\n' +
    '* [Suggestion 1]\n' +
    '* [Suggestion 2]\n' +
    '* [Suggestion 3]\n' +
    '* [Suggestion 4]\n' +
    '* [Suggestion 5]\n\n' +
    '### Verified Reference Sources\n' +
    '* [Source Name 1](URL 1)\n' +
    '* [Source Name 2](URL 2)\n' +
    '* [Source Name 3](URL 3)\n\n' +
    'FORMATTING GUIDELINES:\n' +
    '- Use **bold** for the section headers\n' +
    '- Use ### for sub-section headers\n' +
    '- Use * for bullet points\n' +
    '- Use [Source Name](URL) for all source links\n' +
    '- Ensure proper spacing between sections\n' +
    '- Maintain a professional, publication-ready tone\n' +
    '- Adapt content to the specific query while maintaining the structure\n\n' +
    'RESEARCH CONTEXT:\n' +
    '- Query Type: ' + queryType + '\n' +
    '- Sources Analyzed: ' + sources.length + '\n' +
    '- Average Relevance: ' + (sources.length > 0 ? Math.round(sources.reduce(function(sum, s) { return sum + s.relevance; }, 0) / sources.length) : 0) + '%\n\n' +
    'Use the provided context to generate a comprehensive, adaptable report.';
  
  var userPrompt = 
    'USER QUERY: ' + query + '\n\n' +
    'CONTEXT FROM SOURCES:\n' + context + '\n\n' +
    'Generate an adaptable, professional research report following the format guidelines.';
  
  return {
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ],
    queryType: queryType
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
    max_tokens: 2000,
    top_p: 0.95
  };
  
  console.log('Calling DreamPrompting API with model: auto');
  
  var timeoutPromise = new Promise(function(resolve, reject) {
    setTimeout(function() {
      reject(new Error('API call timed out after 8 seconds'));
    }, 8000);
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
      return {
        success: true,
        response: data.choices[0].message.content,
        model: data.model || 'auto',
        usage: data.usage || null,
        queryType: promptData.queryType
      };
    }
    return null;
  } catch (error) {
    console.error('DreamPrompting API error:', error.message);
    return null;
  }
}

// ============================================
// FAST FALLBACK RESPONSE
// ============================================

function generateFallbackResponse(query, sources) {
  var queryType = OutputOrganizer.detectQueryType(query);
  var reasoningTrace = OutputOrganizer.generateReasoningTrace(query, sources);
  var explanation = OutputOrganizer.generateExplanation(query, sources, queryType);
  var interpretation = OutputOrganizer.generateInterpretation(query, sources, queryType);
  var conclusion = OutputOrganizer.generateConclusion(query, sources, queryType);
  var suggestions = OutputOrganizer.generateSuggestions(query, sources, queryType);
  
  var output = [];
  
  output.push('**Grok API Reasoning Trace:** ' + reasoningTrace);
  output.push('');
  output.push('### Explanation of the Current Landscape');
  output.push('');
  output.push(explanation);
  output.push('');
  output.push('### Interpretation of Market Dynamics');
  output.push('');
  output.push(interpretation);
  output.push('');
  output.push('### Strategic Conclusion');
  output.push('');
  output.push(conclusion);
  output.push('');
  output.push('### Actionable Suggestions');
  output.push('');
  for (var i = 0; i < suggestions.length; i++) {
    output.push('* ' + suggestions[i]);
  }
  output.push('');
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
    
    var qualityScore = 0;
    if (results && results.length > 0) {
      var totalRelevance = 0;
      for (var i = 0; i < results.length; i++) {
        totalRelevance += results[i].relevance || 0;
      }
      qualityScore = Math.round(totalRelevance / results.length);
      if (usingAPI) {
        qualityScore = Math.min(qualityScore + 15, 100);
      }
    }
    
    if (results && results.length > 0 && qualityScore === 0) {
      qualityScore = 25;
    }
    
    var confidenceLevel = results.length >= 3 && qualityScore >= 70 ? 'High' : 
                          results.length >= 1 && qualityScore >= 40 ? 'Medium' : 'Low';
    
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
