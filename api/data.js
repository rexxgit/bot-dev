// api/data.data.js - Data Only (No exports that Vercel would try to run)
// This file contains ALL your sources

// ============================================
// SECTION 1: TECHCRUNCH SOURCES (8 articles)
// ============================================

const techCrunchSources = [
  {
    title: "Microsoft is openly competing with OpenAI, Anthropic more than ever",
    author: "Unknown",
    date: "2026-07-29T17:21:06-07:00",
    content: "Microsoft is in a unique position as AI overtakes the tech industry. It's one of the world's largest cloud providers and software-as-a-service companies, while also holding valuable stakes in the two biggest AI labs, OpenAI and Anthropic. Those incentives are starting to clash as Microsoft posts blockbuster financial results. The company just reported an extremely profitable quarter with $90 billion in revenue and net income of $35.8 billion.",
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
    content: "Meta founder and CEO Mark Zuckerberg is trying to sell investors on his prediction for the future — one where billions of people will have their own personal AI agents in the next five years. 'I think that it's extremely unlikely if you look out five years from now, for example — whatever period of time you want — that you don't have billions of people with a personal agent that understands your goals and that is just working on your behalf 24/7 to achieve your goals in whatever the domain is that you care about,' Zuckerberg said.",
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
    content: "When Microsoft reported killer fourth-quarter earnings for its fiscal 2026 year (which ended June 30), it tucked in an interesting little tidbit about how its investments in the two biggest, and competing, AI labs are doing. For the quarter, it recorded its investment in Anthropic as a $3.2 billion gain.",
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
    content: "In June, Meta entered the enterprise AI market with a new AI agent aimed at businesses, to help with customer service, support, and other daily operations. But the tech giant's enterprise AI ambitions are much more expansive, Meta CEO Mark Zuckerberg told investors on Wednesday's second-quarter earnings call.",
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
    content: "Hugging Face on Monday published a technical timeline that walks readers through how an autonomous AI agent, built on OpenAI models and running inside one of OpenAI's own cybersecurity evaluations, broke into its systems over more than four days earlier this month.",
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
    content: "Martha Stewart is entering the AI software era in the most Martha Stewart way possible: She has joined the co-founding team at Hint, an app that leverages AI technology to manage the tasks surrounding home maintenance.",
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

// ============================================
// SECTION 2: STATIC SOURCES (5 articles)
// ============================================

const staticSources = [
  {
    title: "GPT-5.6, Claude Sonnet 5 and Grok 4.5: What the July 2026 AI Model Wave Means for Your Business",
    author: "Raulji Technologies",
    date: "July 27, 2026",
    content: "Anthropic, OpenAI, and xAI all shipped major models in weeks. Here is what the July 2026 AI model wave means for your business, and how to turn it into a competitive advantage.",
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
    content: "Can you believe it's been over three years since ChatGPT landed in our internet browsers? In a short space of time, AI has become a staple part of daily work.",
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

// ============================================
// SECTION 3: VENTUREBEAT SOURCES (9 articles)
// ============================================

const ventureBeatSources = [
  {
    title: "Thinking Machines debuts Inkling Small open source AI model nearing performance of predecessor at about 1/4 size",
    author: "Carl Franzen",
    date: "2026-07-31",
    content: "Thinking Machines has debuted Inkling Small, an open source AI model that achieves near performance of its predecessor at approximately 1/4 the size. The new model demonstrates significant efficiency improvements while maintaining competitive performance metrics.",
    url: "https://venturebeat.com/technology/thinking-machines-debuts-inkling-small-open-source-ai-model-nearing-performance-of-predecessor-at-about-1-4-size",
    source_name: "VentureBeat",
    source_type: "blog",
    word_count: 45,
    hash: "44d92c0c",
    domain: "venturebeat.com",
    timestamp: "2026-07-31T12:29:19.456515"
  },
  {
    title: "Enterprise AI agents can't talk to each other, can't be trusted with permissions, and can't be audited — 5 startups are already fixing that",
    author: "Taryn Plumb",
    date: "2026-07-31",
    content: "Enterprise AI agents face critical challenges including communication gaps, permission trust issues, and auditability concerns. Five startups are already developing solutions to address these fundamental problems.",
    url: "https://venturebeat.com/orchestration/enterprise-ai-agents-cant-talk-to-each-other-cant-be-trusted-with-permissions-and-cant-be-audited-5-startups-are-already-fixing-that",
    source_name: "VentureBeat",
    source_type: "blog",
    word_count: 42,
    hash: "30f8e69e",
    domain: "venturebeat.com",
    timestamp: "2026-07-31T12:29:19.493304"
  },
  {
    title: "Nimble claims its new, domain-specialized Web Search Agents cut token costs in half while boosting retrieval accuracy",
    author: "Carl Franzen",
    date: "2026-07-31",
    content: "Nimble's new domain-specialized Web Search Agents claim to cut token costs in half while significantly boosting retrieval accuracy. The innovation promises to make AI search more efficient and cost-effective.",
    url: "https://venturebeat.com/orchestration/nimble-claims-its-new-domain-specialized-web-search-agents-cut-token-costs-in-half-while-boosting-retrieval-accuracy",
    source_name: "VentureBeat",
    source_type: "blog",
    word_count: 38,
    hash: "a4f69881",
    domain: "venturebeat.com",
    timestamp: "2026-07-31T12:29:19.527402"
  },
  {
    title: "Target SVP says its real AI moat isn't the models — it's everything built around them",
    author: "Taryn Plumb",
    date: "2026-07-31",
    content: "Target's SVP explains that the company's real competitive advantage in AI isn't the models themselves, but the entire ecosystem built around them including data infrastructure, integration, and operational processes.",
    url: "https://venturebeat.com/orchestration/target-svp-says-its-real-ai-moat-isnt-the-models-its-everything-built-around-them",
    source_name: "VentureBeat",
    source_type: "blog",
    word_count: 50,
    hash: "7f8dc55f",
    domain: "venturebeat.com",
    timestamp: "2026-07-31T12:29:19.561786"
  },
  {
    title: "Bright Machines says its new hybrid robot cell could help solve a major AI infrastructure bottleneck",
    author: "Michael Nuñez",
    date: "2026-07-31",
    content: "Bright Machines introduces the Hybrid BRC (Bright Robotic Cell), an expansion of its Bright Factory platform that lets human operators step inside a sensor-monitored robotic cell to perform prescribed assembly steps while maintaining a digital record.",
    url: "https://venturebeat.com/infrastructure/bright-machines-says-its-new-hybrid-robot-cell-could-help-solve-a-major-ai-infrastructure-bottleneck",
    source_name: "VentureBeat",
    source_type: "blog",
    word_count: 75,
    hash: "efd58cb6",
    domain: "venturebeat.com",
    timestamp: "2026-07-31T12:29:19.600009"
  },
  {
    title: "Instacart's CTO says AI made the company stop worrying about tech debt",
    author: "Taryn Plumb",
    date: "2026-07-31",
    content: "Instacart's CTO reveals how AI has transformed the company's approach to technical debt, allowing them to focus on innovation rather than legacy code maintenance.",
    url: "https://venturebeat.com/orchestration/instacarts-cto-says-ai-made-the-company-stop-worrying-about-tech-debt",
    source_name: "VentureBeat",
    source_type: "blog",
    word_count: 40,
    hash: "2352e881",
    domain: "venturebeat.com",
    timestamp: "2026-07-31T12:29:19.634158"
  },
  {
    title: "GM redesigned its engineering workflows around AI agents — and tripled its merged pull requests",
    author: "Carl Franzen",
    date: "2026-07-31",
    content: "General Motors redesigned its engineering workflows around AI agents, resulting in a tripling of merged pull requests and significant improvements in development efficiency.",
    url: "https://venturebeat.com/orchestration/gm-redesigned-its-engineering-workflows-around-ai-agents-and-tripled-its-merged-pull-requests",
    source_name: "VentureBeat",
    source_type: "blog",
    word_count: 45,
    hash: "67958797",
    domain: "venturebeat.com",
    timestamp: "2026-07-31T12:29:19.668593"
  },
  {
    title: "Runway couldn't fix a bug in its AI video model, so it turned the bug into a feature",
    author: "Ben Dickson",
    date: "2026-07-31",
    content: "Runway discovered a creative solution to a bug in its AI video model by turning the unexpected behavior into a new feature, demonstrating how AI development can embrace unpredictability.",
    url: "https://venturebeat.com/technology/runway-couldnt-fix-a-bug-in-its-ai-video-model-so-it-turned-the-bug-into-a-feature",
    source_name: "VentureBeat",
    source_type: "blog",
    word_count: 45,
    hash: "d4aac8e4",
    domain: "venturebeat.com",
    timestamp: "2026-07-31T12:29:19.700556"
  },
  {
    title: "MCP just got its biggest update ever — here's what changes for AI agents",
    author: "Michael Nuñez",
    date: "2026-07-31",
    content: "The Model Context Protocol (MCP), the open standard connecting AI agents to software, receives its largest update since Anthropic released it. The sweeping architectural revision aims to make agentic AI ready for massive enterprise production deployments.",
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
// SECTION 4: MERGE ALL SOURCES
// ============================================

// Combine all sources
const allSources = [
  ...techCrunchSources,
  ...staticSources,
  ...ventureBeatSources
];

// Remove duplicates by URL
const uniqueSources = [];
const seenUrls = new Set();

for (const source of allSources) {
  if (!seenUrls.has(source.url)) {
    seenUrls.add(source.url);
    uniqueSources.push(source);
  }
}

// Remove duplicates by title (keep first occurrence)
const seenTitles = new Set();
const uniqueByTitle = [];

for (const source of uniqueSources) {
  const titleKey = source.title.toLowerCase().trim();
  if (!seenTitles.has(titleKey)) {
    seenTitles.add(titleKey);
    uniqueByTitle.push(source);
  }
}

// ============================================
// SECTION 5: EXPORT DATA
// ============================================

// This file exports data only - no functions
// Vercel won't try to run this as an API endpoint

export const techCrunchData = {
  source: "Multi-Source AI News",
  source_url: "https://techcrunch.com/category/artificial-intelligence/",
  total_sources: uniqueByTitle.length,
  source_stats: {
    techcrunch: techCrunchSources.length,
    static: staticSources.length,
    venturebeat: ventureBeatSources.length,
    total: uniqueByTitle.length
  },
  last_updated: new Date().toISOString(),
  articles: uniqueByTitle
};

// Named exports for individual source sets
export { techCrunchSources, staticSources, ventureBeatSources };

// Default export (data only)
export default techCrunchData;
