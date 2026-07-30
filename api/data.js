// api/data.js - Complete API Endpoint with Embedded Data
// Optimized for Vercel deployment

// ============================================
// DATA LAYER - All articles embedded
// ============================================

const techCrunchArticles = [
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
  },
  {
    title: "TechCrunch Disrupt 2026",
    author: "Unknown",
    date: "2026-07-29T14:16:39-07:00",
    content: "October 13 – 15, 2026 — San Francisco Innovation for Every Stage Disrupt is where you'll find innovation for every stage of your startup journey. Whether you're a budding founder with a revolutionary idea, a seasoned startup looking to scale, or an investor seeking the next big thing, Disrupt offers unparalleled resources, connections, and expert insights to propel your venture forward.",
    url: "https://techcrunch.com/events/techcrunch-disrupt/",
    source_name: "TechCrunch AI",
    source_type: "blog",
    word_count: 499,
    hash: "3f71dec1",
    timestamp: "2026-07-30T12:32:37.745412"
  },
  {
    title: "Thinking Machines co-founder Lilian Weng left the company citing health reasons, then joined OpenAI",
    author: "Unknown",
    date: "2026-07-29T14:07:48-07:00",
    content: "Lilian Weng, co-founder of Thinking Machines, announced this week that she would step down from her role, citing health issues. 'I don't feel I'm able to continue at the pace a startup requires,' she wrote in an internal Slack message, which she also shared on X. 'After thinking about it for several months, I ultimately have to admit that the amount of consistent stress and workload have pushed me beyond what my health can sustain physically.'",
    url: "https://techcrunch.com/2026/07/29/thinking-machines-co-founder-lilian-weng-left-the-company-citing-health-reasons-then-joined-openai/",
    source_name: "TechCrunch AI",
    source_type: "blog",
    word_count: 268,
    hash: "7802d42c",
    timestamp: "2026-07-30T12:34:01.852281"
  },
  {
    title: "Discover what's next for AI, from the SaaS reckoning to the agent security gap, at TechCrunch Disrupt 2026",
    author: "Unknown",
    date: "2026-07-29T14:16:39-07:00",
    content: "AI hasn't just changed how startups build; it's broken how they sell, secure their data and customers, and scale it more rapidly than ever before. At TechCrunch Disrupt 2026, the AI Stage is back to dig into the single hottest topic in the community for the past few years, presented by Google for Startups.",
    url: "https://techcrunch.com/2026/07/29/discover-whats-next-for-ai-from-the-saas-reckoning-to-the-agent-security-gap-at-techcrunch-disrupt-2026/",
    source_name: "TechCrunch AI",
    source_type: "blog",
    word_count: 420,
    hash: "0e31e349",
    timestamp: "2026-07-30T12:33:45.483138"
  }
];

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
    content: "It all started with ChatGPT, then Claude, and then we had an explosion of AI apps for literally every use case you can think of. Video editing, voice generation, coding, search, automation, presentations, SEO, you name it. Tools promising to make us more productive. I have personally tested over 70 of them, and most I used once and never opened again.",
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
    content: "Whether it's Fortune 500 companies or your friends and coworkers, just about everywhere you turn, people are talking about AI—the common phrasing for Artificial Intelligence. The recent boom in AI technology has moved markets and begun to change how we learn, think, work, shop, and play.",
    author: "Red River Communications",
    date: "July 27, 2026",
    word_count: 953,
    source_type: "blog",
    hash: "redriver_001",
    timestamp: "2026-07-27T08:36:53.036255"
  }
];

// ============================================
// MERGE ALL DATA
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
// RAG CLASS
// ============================================

class TechCrunchRAG {
  constructor() {
    this.data = techCrunchData;
    this.cache = new Map();
    this.cacheTTL = 3600000; // 1 hour
    this.metrics = {
      totalRequests: 0,
      cacheHits: 0,
      cacheMisses: 0,
      averageResponseTime: 0
    };
  }

  search(query) {
    const startTime = Date.now();
    this.metrics.totalRequests++;

    // Check cache
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

    // Perform search
    const queryLower = query.toLowerCase();
    const results = [];

    for (const article of this.data.articles) {
      const contentLower = article.content.toLowerCase();
      const titleLower = article.title.toLowerCase();
      
      let score = 0;
      
      if (titleLower.includes(queryLower)) score += 10;
      
      const words = queryLower.split(/\s+/);
      for (const word of words) {
        if (word.length > 2) {
          const matches = (contentLower.match(new RegExp(word, 'g')) || []).length;
          score += matches * 2;
        }
      }
      
      if (contentLower.includes(queryLower)) score += 5;
      if (article.source_name === 'TechCrunch AI') score += 2;
      if (article.word_count > 1000) score += 1;
      
      if (score > 0) {
        results.push({
          ...article,
          score: score
        });
      }
    }

    results.sort((a, b) => b.score - a.score);
    const topResults = results.slice(0, 5);

    // Build response
    let responseText = '';
    if (topResults.length === 0) {
      responseText = '🔍 **No matching content found.**\n\nTry asking about:\n- Microsoft vs OpenAI/Anthropic\n- Meta AI and Zuckerberg predictions\n- AI security incidents\n- AI agent research\n- AI startups and investments\n- AI tools and platforms';
    } else {
      responseText = `**📊 Found ${topResults.length} relevant sources:**\n\n`;
      for (let i = 0; i < topResults.length; i++) {
        const r = topResults[i];
        const relevancePct = Math.min(Math.round((r.score / (topResults[0].score || 1)) * 100), 100);
        responseText += `**${i + 1}. ${r.title}**\n`;
        responseText += `🏷️ Source: ${r.source_name}\n`;
        responseText += `✍️ Author: ${r.author || 'Unknown'}\n`;
        responseText += `📅 Date: ${r.date}\n`;
        responseText += `📊 Relevance: ${relevancePct}%\n\n`;
        responseText += `${r.content.substring(0, 400)}...\n\n`;
        responseText += `🔗 ${r.url}\n\n---\n\n`;
      }
    }

    const response = {
      response: responseText,
      sources: topResults.map(r => ({
        title: r.title,
        url: r.url,
        author: r.author || 'Unknown',
        date: r.date,
        source_name: r.source_name,
        relevance: Math.min(Math.round((r.score / (topResults[0]?.score || 1)) * 100), 100),
        content_preview: r.content.substring(0, 300) + '...'
      })),
      metadata: {
        total_sources: this.data.total_sources,
        total_techcrunch: this.data.total_techcrunch,
        total_static: this.data.total_static,
        matches_found: topResults.length,
        processing_time_ms: Date.now() - startTime,
        cached: false,
        cache_hit_rate: this.getCacheHitRate()
      }
    };

    this.cache.set(cacheKey, { data: response, timestamp: Date.now() });

    const duration = Date.now() - startTime;
    this.metrics.averageResponseTime = 
      (this.metrics.averageResponseTime * (this.metrics.totalRequests - 1) + duration) / 
      this.metrics.totalRequests;

    return response;
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

  clearCache() {
    this.cache.clear();
    return { success: true, message: 'Cache cleared' };
  }

  getAllArticles() {
    return this.data.articles;
  }

  getTechCrunchArticles() {
    return techCrunchArticles;
  }

  getStaticSources() {
    return staticSources;
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
// API HANDLER - Vercel Compatible
// ============================================

export default function handler(req, res) {
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
    const rag = new TechCrunchRAG();

    let query = null;
    let action = null;
    let source = null;
    let author = null;

    if (req.method === 'GET') {
      query = req.query.query || null;
      action = req.query.action || null;
      source = req.query.source || null;
      author = req.query.author || null;
    } else {
      query = req.body?.query || null;
      action = req.body?.action || null;
      source = req.body?.source || null;
      author = req.body?.author || null;
    }

    // Health check
    if (action === 'health' || action === 'ping') {
      return res.status(200).json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        total_sources: rag.getAllArticles().length,
        source_names: [...new Set(rag.getAllArticles().map(a => a.source_name))]
      });
    }

    // Stats
    if (action === 'stats') {
      return res.status(200).json(rag.getStats());
    }

    // Clear cache
    if (action === 'clear-cache' || action === 'refresh') {
      return res.status(200).json(rag.clearCache());
    }

    // Get all articles
    if (action === 'all') {
      return res.status(200).json({
        total: rag.getAllArticles().length,
        articles: rag.getAllArticles()
      });
    }

    // Get by source
    if (action === 'source' && source) {
      const results = rag.getArticlesBySource(source);
      return res.status(200).json({
        source: source,
        results: results,
        count: results.length
      });
    }

    // Get by author
    if (action === 'author' && author) {
      const results = rag.getArticlesByAuthor(author);
      return res.status(200).json({
        author: author,
        results: results,
        count: results.length
      });
    }

    // Search
    if (query) {
      const result = rag.search(query);
      return res.status(200).json(result);
    }

    // No query - show help
    return res.status(200).json({
      message: 'TechCrunch RAG API',
      version: '1.0.0',
      endpoints: {
        search: 'GET/POST with ?query=your+question',
        health: 'GET?action=health',
        stats: 'GET?action=stats',
        clear_cache: 'GET?action=clear-cache',
        all: 'GET?action=all',
        by_source: 'GET?action=source&source=name',
        by_author: 'GET?action=author&author=name'
      },
      total_articles: rag.getAllArticles().length,
      techcrunch_articles: rag.getTechCrunchArticles().length,
      static_sources: rag.getStaticSources().length,
      sources_available: [...new Set(rag.getAllArticles().map(a => a.source_name))]
    });

  } catch (error) {
    console.error('❌ API Error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
}

// ============================================
// EXPORTS
// ============================================

export { 
  techCrunchData,
  techCrunchArticles,
  staticSources,
  allArticles,
  TechCrunchRAG
};
