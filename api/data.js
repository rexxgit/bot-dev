// data.js - Complete Data File for RAG Bot
// Combines TechCrunch scraper data + Static sources
// Generated: 2026-07-30T12:34:39.403Z

// ============================================
// SECTION 1: TECHCRUNCH SCRAPER DATA
// ============================================

const techCrunchArticles = [
  {
    title: "TechCrunch Disrupt 2026",
    author: "Unknown",
    date: "2026-07-29T14:16:39-07:00",
    content: "October 13 – 15, 2026 — San Francisco Innovation for Every Stage Disrupt is where you'll find innovation for every stage of your startup journey. Whether you're a budding founder with a revolutionary idea, a seasoned startup looking to scale, or an investor seeking the next big thing, Disrupt offers unparalleled resources, connections, and expert insights to propel your venture forward. Scale faster through funding, exposure, networking, and startup growth insights. Grow your portfolio by discovering breakout startups, emerging trends, and founders. Gain practical strategies, peer insights, and tools to scale operations effectively. Explore breakthrough ideas, emerging tech, and connections shaping the future.",
    url: "https://techcrunch.com/events/techcrunch-disrupt/",
    source_name: "TechCrunch AI",
    source_type: "blog",
    word_count: 499,
    hash: "3f71dec1",
    timestamp: "2026-07-30T12:32:37.745412"
  },
  {
    title: "Microsoft is openly competing with OpenAI, Anthropic more than ever",
    author: "Unknown",
    date: "2026-07-29T17:21:06-07:00",
    content: "Microsoft is in a unique position as AI overtakes the tech industry. It's one of the world's largest cloud providers and software-as-a-service companies, while also holding valuable stakes in the two biggest AI labs, OpenAI and Anthropic. Those incentives are starting to clash as Microsoft posts blockbuster financial results. The company just reported an extremely profitable quarter with $90 billion in revenue and net income of $35.8 billion. For the fiscal year, which ended June 30, Microsoft reported $331.8 billion in revenue with a net income of $133.7 billion for the year. And CEO Satya Nadella is not about to let the trajectory of Anthropic and OpenAI — which are expanding into applications and agentic infrastructure that could ultimately let them own customer relationships — derail that kind of cash. Nadella has been preaching to enterprises to use multiple models and to stop relying on the frontier AI labs for the agentic harness/app layer.",
    url: "https://techcrunch.com/2026/07/29/microsoft-is-openly-competing-with-openai-anthropic-more-than-ever/",
    source_name: "TechCrunch AI",
    source_type: "blog",
    word_count: 777,
    hash: "750af354",
    timestamp: "2026-07-30T12:32:45.949284"
  },
  {
    title: "Mark Zuckerberg predicts that billions of people will have personal AI agents in five years",
    author: "Unknown",
    date: "2026-07-29T16:00:11-07:00",
    content: "Meta founder and CEO Mark Zuckerberg is trying to sell investors on his prediction for the future — one where billions of people will have their own personal AI agents in the next five years. 'I think that it's extremely unlikely if you look out five years from now, for example — whatever period of time you want — that you don't have billions of people with a personal agent that understands your goals and that is just working on your behalf 24/7 to achieve your goals in whatever the domain is that you care about,' Zuckerberg said on Wednesday's quarterly earnings call with investors.",
    url: "https://techcrunch.com/2026/07/29/mark-zuckerberg-predicts-that-billions-of-people-will-have-personal-ai-agents-in-five-years/",
    source_name: "TechCrunch AI",
    source_type: "blog",
    word_count: 544,
    hash: "1929c185",
    timestamp: "2026-07-30T12:33:02.318565"
  },
  {
    title: "Microsoft logs $3.2B from Anthropic investment, but OpenAI was a mixed bag",
    author: "Unknown",
    date: "2026-07-29T15:46:03-07:00",
    content: "When Microsoft reported killer fourth-quarter earnings for its fiscal 2026 year (which ended June 30), it tucked in an interesting little tidbit about how its investments in the two biggest, and competing, AI labs are doing. For the quarter, it recorded its investment in Anthropic as a $3.2 billion gain, boosting diluted earnings per share by 33 cents. Microsoft invested $5 billion in Anthropic in November 2025 as part of a circular agreement under which the AI lab also agreed to buy $30 billion worth of Azure services.",
    url: "https://techcrunch.com/2026/07/29/microsoft-logs-3-2b-from-anthropic-investment-but-openai-was-a-mixed-bag/",
    source_name: "TechCrunch AI",
    source_type: "blog",
    word_count: 318,
    hash: "feca2ec5",
    timestamp: "2026-07-30T12:33:18.896327"
  },
  {
    title: "Zuckerberg says Meta's enterprise AI opportunity extends beyond agents",
    author: "Unknown",
    date: "2026-07-29T15:23:12-07:00",
    content: "In June, Meta entered the enterprise AI market with a new AI agent aimed at businesses, to help with customer service, support, and other daily operations. But the tech giant's enterprise AI ambitions are much more expansive, Meta CEO Mark Zuckerberg told investors on Wednesday's second-quarter earnings call. 'We see a large enterprise opportunity to sell to businesses, including APIs, business agents, potentially selling compute directly, and other services that we're building for large customers,' Zuckerberg said.",
    url: "https://techcrunch.com/2026/07/29/zuckerberg-says-metas-enterprise-ai-opportunity-extends-beyond-agents/",
    source_name: "TechCrunch AI",
    source_type: "blog",
    word_count: 602,
    hash: "c9945336",
    timestamp: "2026-07-30T12:33:27.875955"
  },
  {
    title: "The Hugging Face break-in explained",
    author: "Unknown",
    date: "2026-07-29T12:44:49-07:00",
    content: "Hugging Face on Monday published a technical timeline that walks readers through how an autonomous AI agent, built on OpenAI models and running inside one of OpenAI's own cybersecurity evaluations, broke into its systems over more than four days earlier this month. It's the first security incident about which OpenAI CEO Sam Altman 'felt very viscerally,' he has said.",
    url: "https://techcrunch.com/2026/07/29/the-hugging-face-ai-break-in-as-told-through-an-increasingly-committed-bear-metaphor/",
    source_name: "TechCrunch AI",
    source_type: "blog",
    word_count: 639,
    hash: "101b78fb",
    timestamp: "2026-07-30T12:34:10.277411"
  },
  {
    title: "Claude Opus 5 became downright ruthless when tasked with running a vending machine",
    author: "Unknown",
    date: "2026-07-29T11:45:27-07:00",
    content: "For a year now, the AI safety testing firm Andon Labs has given frontier models various real-world tasks to determine how well they do as agents running for long periods with no human supervision. On Wednesday, Andon published a new installment in how things are going in its Vending-Bench research, where the lab has frontier models run a simulated vending machine business for a simulated year. The mission is simple: Make more money than the other models.",
    url: "https://techcrunch.com/2026/07/29/claude-opus-5-became-downright-ruthless-when-tasked-with-running-a-vending-machine/",
    source_name: "TechCrunch AI",
    source_type: "blog",
    word_count: 1097,
    hash: "b509c204",
    timestamp: "2026-07-30T12:34:28.349281"
  },
  {
    title: "Hint, a new AI startup co-founded by Martha Stewart, offers an AI assistant for homeowners",
    author: "Unknown",
    date: "2026-07-29T08:35:09-07:00",
    content: "Martha Stewart is entering the AI software era in the most Martha Stewart way possible: She has joined the co-founding team at Hint, an app that leverages AI technology to manage the tasks surrounding home maintenance and management. With the Hint app, which launches today, homeowners can tackle challenges around maintenance schedules/tasks and energy management, learn about their soil and air quality, weigh insurance claims, and more.",
    url: "https://techcrunch.com/2026/07/29/hint-a-new-ai-startup-co-founded-by-martha-stewart-offers-an-ai-assistant-for-homeowners/",
    source_name: "TechCrunch AI",
    source_type: "blog",
    word_count: 965,
    hash: "c037c1f2",
    timestamp: "2026-07-30T12:34:37.298648"
  }
];

// ============================================
// SECTION 2: STATIC SOURCES
// ============================================

const staticSources = [
  {
    source_name: "Raulji Technologies",
    url: "https://www.rauljitechnologies.com/blog/july-2026-ai-model-wave/",
    title: "GPT-5.6, Claude Sonnet 5 and Grok 4.5: What the July 2026 AI Model Wave Means for Your Business",
    content: "Anthropic, OpenAI, and xAI all shipped major models in weeks. Here is what the July 2026 AI model wave means for your business, and how to turn it into a competitive advantage. In July 2026, Anthropic's Claude Sonnet 5, OpenAI's GPT-5.6 and xAI's Grok 4.5 all launched within weeks of each other. For most businesses the winning move is not chasing whichever model leads the benchmarks this month, it is building on a flexible setup you can swap newer models into as they improve.",
    author: "Raulji Technologies",
    date: "July 27, 2026",
    word_count: 1768,
    source_type: "blog",
    hash: "raulji_001",
    timestamp: "2026-07-27T08:36:53.036255"
  },
  {
    source_name: "Gumloop",
    url: "https://www.gumloop.com/blog/best-ai-apps",
    title: "15 best AI apps I can't live without in 2026",
    content: "It all started with ChatGPT, then Claude, and then we had an explosion of AI apps for literally every use case you can think of. Video editing, voice generation, coding, search, automation, presentations, SEO, you name it. Tools promising to make us more productive. I have personally tested over 70 of them, and most I used once and never opened again. But there are a handful that I genuinely cannot live without at this point.",
    author: "Gumloop",
    date: "July 27, 2026",
    word_count: 6894,
    source_type: "blog",
    hash: "gumloop_001",
    timestamp: "2026-07-27T08:36:53.036255"
  },
  {
    source_name: "Pickaxe",
    url: "https://pickaxe.co/post/top-ai-platforms",
    title: "Top AI Platforms in 2026: The 15 Best Platforms I've Actually Tested",
    content: "I have tested more AI platforms than I can count over the past three years. Most of them blurred together. Some were genuinely great. A few changed how I work entirely. This is my honest breakdown of the top AI platforms in 2026 — the 15 I actually spent real time with, built real things on, and can speak to from firsthand experience.",
    author: "Pickaxe",
    date: "July 27, 2026",
    word_count: 6534,
    source_type: "blog",
    hash: "pickaxe_001",
    timestamp: "2026-07-27T08:36:53.036255"
  },
  {
    source_name: "Synthesia",
    url: "https://www.synthesia.io/post/ai-tools",
    title: "The 12 Best AI Tools for 2026 (That People Actually Use)",
    content: "Can you believe it's been over three years since ChatGPT landed in our internet browsers? In a short space of time, AI has become a staple part of daily work and personal life, and the number of AI tools available has grown massively. In the extensive list of AI tools, I've pulled the best ones to actually get work done, and that are genuinely useful in 2026.",
    author: "Synthesia",
    date: "July 27, 2026",
    word_count: 2343,
    source_type: "blog",
    hash: "synthesia_001",
    timestamp: "2026-07-27T08:36:53.036255"
  },
  {
    source_name: "Red River Communications",
    url: "https://redrivercomm.com/six-popular-ai-platforms-everyone-can-use",
    title: "Six Popular AI Platforms Everyone Can Use",
    content: "Whether it's Fortune 500 companies or your friends and coworkers, just about everywhere you turn, people are talking about AI—the common phrasing for Artificial Intelligence. The recent boom in AI technology has moved markets and begun to change how we learn, think, work, shop, and play. Below, we explore six of the most popular and widely used AI apps and platforms.",
    author: "Red River Communications",
    date: "July 27, 2026",
    word_count: 953,
    source_type: "blog",
    hash: "redriver_001",
    timestamp: "2026-07-27T08:36:53.036255"
  }
];

// ============================================
// SECTION 3: MERGED DATA
// ============================================

const allArticles = [...techCrunchArticles, ...staticSources];

const techCrunchData = {
  source: "TechCrunch AI + Static Sources",
  source_url: "https://techcrunch.com/category/artificial-intelligence/",
  total_sources: allArticles.length,
  total_techcrunch: techCrunchArticles.length,
  total_static: staticSources.length,
  last_updated: "2026-07-30T12:34:39.403297",
  articles: allArticles
};

// ============================================
// SECTION 4: RAG CLASS
// ============================================

class TechCrunchRAG {
  constructor() {
    this.data = techCrunchData;
    this.cache = new Map();
    this.cacheTTL = 3600000;
    this.rateLimiters = new Map();
    this.metrics = {
      totalRequests: 0,
      cacheHits: 0,
      cacheMisses: 0,
      averageResponseTime: 0
    };
  }

  classifyQuery(query) {
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

  semanticSearch(query, articles) {
    const queryWords = query.toLowerCase().split(/\s+/).filter(w => w.length > 2);
    if (queryWords.length === 0) return [];

    const results = [];
    
    for (const article of articles) {
      const content = article.content.toLowerCase();
      
      let wordScore = 0;
      for (const word of queryWords) {
        const count = (content.match(new RegExp(word, 'g')) || []).length;
        wordScore += count * 2;
      }
      
      const phraseScore = content.includes(query.toLowerCase()) ? 20 : 0;
      const totalScore = wordScore + phraseScore;
      
      if (totalScore > 0) {
        results.push({
          ...article,
          relevanceScore: totalScore,
          wordMatches: wordScore,
          phraseMatch: phraseScore > 0
        });
      }
    }
    
    results.sort((a, b) => b.relevanceScore - a.relevanceScore);
    return results;
  }

  calculateAuthority(article) {
    let score = 0.5;
    
    if (article.author && article.author !== 'Unknown' && article.author !== 'TechCrunch Desktop Logo') {
      score += 0.15;
    }
    
    if (article.word_count > 1000) score += 0.1;
    if (article.word_count > 2000) score += 0.05;
    
    if (article.source_type === 'blog' || article.source_type === 'article') {
      score += 0.1;
    }
    
    return Math.min(score, 1.0);
  }

  hybridSearch(query) {
    const queryClassification = this.classifyQuery(query);
    const semanticResults = this.semanticSearch(query, this.data.articles);
    
    if (semanticResults.length === 0) {
      return { results: [], classification: queryClassification };
    }
    
    const scoredResults = semanticResults.map(result => {
      const authorityScore = this.calculateAuthority(result);
      const maxScore = semanticResults[0]?.relevanceScore || 1;
      const normalizedSemantic = Math.min(result.relevanceScore / maxScore, 1);
      const hybridScore = (normalizedSemantic * 0.7) + (authorityScore * 0.3);
      
      return {
        ...result,
        semanticScore: normalizedSemantic,
        authorityScore: authorityScore,
        hybridScore: hybridScore
      };
    });
    
    scoredResults.sort((a, b) => b.hybridScore - a.hybridScore);
    
    let resultCount = 3;
    if (queryClassification.type === 'analytical' || queryClassification.type === 'comparative') {
      resultCount = 5;
    } else if (queryClassification.type === 'exploratory') {
      resultCount = 4;
    }
    
    return {
      results: scoredResults.slice(0, resultCount),
      classification: queryClassification,
      totalMatches: scoredResults.length
    };
  }

  generateResponse(query) {
    const startTime = Date.now();
    this.metrics.totalRequests++;
    
    const cacheKey = query.toLowerCase().trim();
    if (this.cache.has(cacheKey)) {
      const entry = this.cache.get(cacheKey);
      if (Date.now() - entry.timestamp < this.cacheTTL) {
        this.metrics.cacheHits++;
        return {
          ...entry.data,
          cached: true,
          metadata: {
            ...entry.data.metadata,
            cacheHit: true,
            cacheAge: Math.round((Date.now() - entry.timestamp) / 1000) + 's'
          }
        };
      }
      this.cache.delete(cacheKey);
    }
    this.metrics.cacheMisses++;
    
    const searchResults = this.hybridSearch(query);
    
    if (searchResults.results.length === 0) {
      const response = {
        response: "🔍 **No matching content found.**\n\nTry asking about:\n- Microsoft vs OpenAI/Anthropic\n- Meta AI and Zuckerberg predictions\n- AI security incidents\n- AI agent research\n- AI startups and investments\n- AI tools and platforms",
        sources: [],
        metadata: {
          total_sources: this.data.total_sources,
          matches_found: 0,
          query_type: searchResults.classification.type,
          query_confidence: searchResults.classification.confidence,
          processing_time_ms: Date.now() - startTime,
          cached: false
        }
      };
      
      this.cache.set(cacheKey, { data: response, timestamp: Date.now() });
      return response;
    }
    
    let responseText = `**📊 Answer based on ${searchResults.results.length} source(s):**\n\n`;
    
    for (let i = 0; i < searchResults.results.length; i++) {
      const r = searchResults.results[i];
      const relevancePct = Math.round(r.hybridScore * 100);
      
      responseText += `**Source ${i + 1}: ${r.title}**\n`;
      responseText += `🏷️ Source: ${r.source_name}\n`;
      responseText += `✍️ Author: ${r.author}\n`;
      responseText += `📅 Date: ${r.date}\n`;
      responseText += `📊 Relevance: ${relevancePct}%\n\n`;
      responseText += `${r.content.substring(0, 500)}...\n\n`;
      responseText += `🔗 ${r.url}\n\n---\n\n`;
    }
    
    const finalResponse = {
      response: responseText,
      sources: searchResults.results.map(r => ({
        title: r.title,
        url: r.url,
        author: r.author,
        date: r.date,
        source_name: r.source_name,
        relevance: Math.round(r.hybridScore * 100),
        content_preview: r.content.substring(0, 300) + '...'
      })),
      metadata: {
        total_sources: this.data.total_sources,
        total_techcrunch: this.data.total_techcrunch,
        total_static: this.data.total_static,
        matches_found: searchResults.results.length,
        query_type: searchResults.classification.type,
        query_confidence: searchResults.classification.confidence,
        processing_time_ms: Date.now() - startTime,
        average_response_time: Math.round(this.metrics.averageResponseTime),
        cached: false,
        cache_hit_rate: this.getCacheHitRate()
      }
    };
    
    this.cache.set(cacheKey, { data: finalResponse, timestamp: Date.now() });
    
    const duration = Date.now() - startTime;
    this.metrics.averageResponseTime = 
      (this.metrics.averageResponseTime * (this.metrics.totalRequests - 1) + duration) / 
      this.metrics.totalRequests;
    
    return finalResponse;
  }

  getCacheHitRate() {
    const total = this.metrics.cacheHits + this.metrics.cacheMisses;
    if (total === 0) return '0%';
    return ((this.metrics.cacheHits / total) * 100).toFixed(1) + '%';
  }

  getStats() {
    return {
      total_requests: this.metrics.totalRequests,
      cache_hits: this.metrics.cacheHits,
      cache_misses: this.metrics.cacheMisses,
      cache_hit_rate: this.getCacheHitRate(),
      average_response_time_ms: Math.round(this.metrics.averageResponseTime),
      cache_size: this.cache.size,
      total_sources: this.data.total_sources,
      total_techcrunch: this.data.total_techcrunch,
      total_static: this.data.total_static,
      last_updated: this.data.last_updated
    };
  }

  invalidateCache() {
    this.cache.clear();
    return { success: true, message: 'Cache cleared' };
  }

  getArticles() {
    return this.data.articles;
  }

  getArticlesBySource(source) {
    return this.data.articles.filter(a => 
      a.source_name && a.source_name.toLowerCase().includes(source.toLowerCase())
    );
  }

  getArticlesByAuthor(author) {
    return this.data.articles.filter(a => 
      a.author && a.author.toLowerCase().includes(author.toLowerCase())
    );
  }
}

// ============================================
// SECTION 5: EXPORTS
// ============================================

export { 
  techCrunchData, 
  techCrunchArticles, 
  staticSources, 
  allArticles,
  TechCrunchRAG 
};

// Also export as default for convenience
export default techCrunchData;
