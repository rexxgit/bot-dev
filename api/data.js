// api/data.js - Fixed for Vercel
// The default export MUST be a function

// ============================================
// DATA
// ============================================

const sources = [
  {
    title: "Microsoft is openly competing with OpenAI, Anthropic more than ever",
    author: "Unknown",
    date: "2026-07-29T17:21:06-07:00",
    content: "Microsoft is in a unique position as AI overtakes the tech industry. It's one of the world's largest cloud providers and software-as-a-service companies, while also holding valuable stakes in the two biggest AI labs, OpenAI and Anthropic.",
    url: "https://techcrunch.com/2026/07/29/microsoft-is-openly-competing-with-openai-anthropic-more-than-ever/",
    source_name: "TechCrunch AI",
    word_count: 777
  },
  {
    title: "Mark Zuckerberg predicts that billions of people will have personal AI agents in five years",
    author: "Unknown",
    date: "2026-07-29T16:00:11-07:00",
    content: "Meta founder and CEO Mark Zuckerberg is trying to sell investors on his prediction for the future — one where billions of people will have their own personal AI agents in the next five years.",
    url: "https://techcrunch.com/2026/07/29/mark-zuckerberg-predicts-that-billions-of-people-will-have-personal-ai-agents-in-five-years/",
    source_name: "TechCrunch AI",
    word_count: 544
  },
  {
    title: "Microsoft logs $3.2B from Anthropic investment, but OpenAI was a mixed bag",
    author: "Unknown",
    date: "2026-07-29T15:46:03-07:00",
    content: "When Microsoft reported killer fourth-quarter earnings for its fiscal 2026 year (which ended June 30), it tucked in an interesting little tidbit about how its investments in the two biggest, and competing, AI labs are doing.",
    url: "https://techcrunch.com/2026/07/29/microsoft-logs-3-2b-from-anthropic-investment-but-openai-was-a-mixed-bag/",
    source_name: "TechCrunch AI",
    word_count: 318
  },
  {
    title: "Zuckerberg says Meta's enterprise AI opportunity extends beyond agents",
    author: "Unknown",
    date: "2026-07-29T15:23:12-07:00",
    content: "In June, Meta entered the enterprise AI market with a new AI agent aimed at businesses, to help with customer service, support, and other daily operations.",
    url: "https://techcrunch.com/2026/07/29/zuckerberg-says-metas-enterprise-ai-opportunity-extends-beyond-agents/",
    source_name: "TechCrunch AI",
    word_count: 602
  },
  {
    title: "The Hugging Face break-in explained",
    author: "Unknown",
    date: "2026-07-29T12:44:49-07:00",
    content: "Hugging Face on Monday published a technical timeline that walks readers through how an autonomous AI agent, built on OpenAI models and running inside one of OpenAI's own cybersecurity evaluations, broke into its systems.",
    url: "https://techcrunch.com/2026/07/29/the-hugging-face-ai-break-in-as-told-through-an-increasingly-committed-bear-metaphor/",
    source_name: "TechCrunch AI",
    word_count: 639
  },
  {
    title: "Claude Opus 5 became downright ruthless when tasked with running a vending machine",
    author: "Unknown",
    date: "2026-07-29T11:45:27-07:00",
    content: "For a year now, the AI safety testing firm Andon Labs has given frontier models various real-world tasks to determine how well they do as agents running for long periods with no human supervision.",
    url: "https://techcrunch.com/2026/07/29/claude-opus-5-became-downright-ruthless-when-tasked-with-running-a-vending-machine/",
    source_name: "TechCrunch AI",
    word_count: 1097
  },
  {
    title: "Hint, a new AI startup co-founded by Martha Stewart, offers an AI assistant for homeowners",
    author: "Unknown",
    date: "2026-07-29T08:35:09-07:00",
    content: "Martha Stewart is entering the AI software era in the most Martha Stewart way possible: She has joined the co-founding team at Hint, an app that leverages AI technology to manage the tasks surrounding home maintenance.",
    url: "https://techcrunch.com/2026/07/29/hint-a-new-ai-startup-co-founded-by-martha-stewart-offers-an-ai-assistant-for-homeowners/",
    source_name: "TechCrunch AI",
    word_count: 965
  },
  {
    title: "TechCrunch Disrupt 2026",
    author: "Unknown",
    date: "2026-07-29T14:16:39-07:00",
    content: "October 13 – 15, 2026 — San Francisco Innovation for Every Stage Disrupt is where you'll find innovation for every stage of your startup journey.",
    url: "https://techcrunch.com/events/techcrunch-disrupt/",
    source_name: "TechCrunch AI",
    word_count: 499
  },
  {
    title: "GPT-5.6, Claude Sonnet 5 and Grok 4.5: What the July 2026 AI Model Wave Means for Your Business",
    author: "Raulji Technologies",
    date: "July 27, 2026",
    content: "Anthropic, OpenAI, and xAI all shipped major models in weeks. Here is what the July 2026 AI model wave means for your business.",
    url: "https://www.rauljitechnologies.com/blog/july-2026-ai-model-wave/",
    source_name: "Raulji Technologies",
    word_count: 1768
  },
  {
    title: "15 best AI apps I can't live without in 2026",
    author: "Gumloop",
    date: "July 27, 2026",
    content: "It all started with ChatGPT, then Claude, and then we had an explosion of AI apps for literally every use case you can think of.",
    url: "https://www.gumloop.com/blog/best-ai-apps",
    source_name: "Gumloop",
    word_count: 6894
  },
  {
    title: "Top AI Platforms in 2026: The 15 Best Platforms I've Actually Tested",
    author: "Pickaxe",
    date: "July 27, 2026",
    content: "I have tested more AI platforms than I can count over the past three years. Most of them blurred together. Some were genuinely great.",
    url: "https://pickaxe.co/post/top-ai-platforms",
    source_name: "Pickaxe",
    word_count: 6534
  },
  {
    title: "The 12 Best AI Tools for 2026 (That People Actually Use)",
    author: "Synthesia",
    date: "July 27, 2026",
    content: "Can you believe it's been over three years since ChatGPT landed in our internet browsers? In a short space of time, AI has become a staple part of daily work.",
    url: "https://www.synthesia.io/post/ai-tools",
    source_name: "Synthesia",
    word_count: 2343
  },
  {
    title: "Six Popular AI Platforms Everyone Can Use",
    author: "Red River Communications",
    date: "July 27, 2026",
    content: "Whether it's Fortune 500 companies or your friends and coworkers, just about everywhere you turn, people are talking about AI.",
    url: "https://redrivercomm.com/six-popular-ai-platforms-everyone-can-use",
    source_name: "Red River Communications",
    word_count: 953
  }
];

// ============================================
// SEARCH FUNCTION
// ============================================

function searchSources(query) {
  if (!query) return [];
  
  const queryLower = query.toLowerCase().trim();
  if (queryLower.length < 2) return [];
  
  const results = [];
  const words = queryLower.split(/\s+/).filter(w => w.length > 2);
  
  for (const source of sources) {
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
        chunk = (source.content || '').substring(0, 200);
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
        score: score
      });
    }
  }
  
  results.sort((a, b) => b.score - a.score);
  return results.slice(0, 5);
}

// ============================================
// API HANDLER - MUST BE DEFAULT EXPORT
// ============================================

// THIS IS THE CRITICAL PART - Must be a function
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow GET and POST
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      allowed: ['GET', 'POST']
    });
  }

  try {
    // Get parameters
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
        total_sources: sources.length,
        source_names: [...new Set(sources.map(s => s.source_name))]
      });
    }

    // Get all sources
    if (action === 'all') {
      return res.status(200).json({
        total: sources.length,
        sources: sources.map(s => ({
          title: s.title,
          source_name: s.source_name,
          author: s.author,
          date: s.date,
          url: s.url,
          word_count: s.word_count
        }))
      });
    }

    // Search
    if (query) {
      const results = searchSources(query);
      
      return res.status(200).json({
        response: results.length > 0 
          ? `Found ${results.length} relevant source${results.length > 1 ? 's' : ''}.`
          : "No matching content found. Try asking about AI, Microsoft, OpenAI, Anthropic, or Meta AI.",
        sources: results,
        metadata: {
          total_sources: sources.length,
          matches_found: results.length,
          last_updated: new Date().toISOString(),
          ai_generated: true
        }
      });
    }

    // Default response
    return res.status(200).json({
      name: 'Omni Brand Intelligence Bot API',
      version: '1.0.0',
      status: 'running',
      total_sources: sources.length,
      source_names: [...new Set(sources.map(s => s.source_name))],
      endpoints: {
        search: 'GET/POST with ?query=your+question',
        health: 'GET?action=health',
        all: 'GET?action=all'
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
