// api/data.js - Complete Self-Contained API with Enhanced Features

// ============================================
// IMPORTS - All from lib/
// ============================================

import { semanticChunk } from '../lib/chunking/semantic.js';
import { systemPrompts, selectPrompt } from '../lib/prompts/system.js';
import { getFewShotExamples } from '../lib/prompts/examples.js';
import { selectTemplate } from '../lib/prompts/templates.js';
import { generateCOTPrompt } from '../lib/prompts/cot.js';
import { getPersona, getAvailablePersonas, selectPersona } from '../lib/prompts/personas.js';
import { intentDetector } from '../lib/response/intent.js';
import { confidenceScorer } from '../lib/response/confidence.js';
import { responseFormatter } from '../lib/response/formatter.js';
import { responseCache } from '../lib/response/cache.js';
import { advancedSearch } from '../lib/search/hybrid.js';
import { createGrokInstance } from '../lib/grok/index.js';
import { buildGrokRequest, buildContextualRequest, getContextualPrompt, getSynthesisPrompt } from '../lib/grok/prompts.js';
import { orchestrator } from '../lib/models/orchestrator.js';
import { streamingHandler } from '../lib/response/streaming.js';
import { feedbackSystem } from '../lib/response/feedback.js';
import { analytics } from '../lib/analytics/tracker.js';
import { performanceMetrics } from '../lib/analytics/metrics.js';
import { queryLogger } from '../lib/response/logger.js';
import { semanticSearch, indexSources } from '../lib/embeddings/index.js';

// ============================================
// SECTION 1: CONFIGURATION
// ============================================

const ENHANCED_CONFIG = {
  DEFAULTS: {
    PERSONALITY: 'conscientiousness',
    INTENT: 'contextual',
    TEMPERATURE: 0.25,
    MAX_TOKENS: 2000,
    REQUIRE_SYNTHESIS: true,
    REQUIRE_CONTEXTUAL_ANALYSIS: true
  },
  FEATURES: {
    EXTRACT_THEMES: true,
    EXTRACT_ENTITIES: true,
    FORMAT_WITH_BULLETS: true,
    FORMAT_WITH_PARAGRAPHS: true,
    INDENT_LISTS: true
  }
};

// ============================================
// ALL DATA EMBEDDED HERE - DO NOT REMOVE
// ============================================

// TechCrunch Sources
const techCrunchSources = [
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
const staticSources = [
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
const ventureBeatSources = [
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

const allSources = [...techCrunchSources, ...staticSources, ...ventureBeatSources];

const uniqueSources = [];
const seenUrls = new Set();
for (const source of allSources) {
  if (!seenUrls.has(source.url)) {
    seenUrls.add(source.url);
    uniqueSources.push(source);
  }
}

const sourceStats = {
  techcrunch: techCrunchSources.length,
  static: staticSources.length,
  venturebeat: ventureBeatSources.length,
  total: uniqueSources.length
};

// ============================================
// ENHANCED FUNCTIONS - Contextual Analysis & Synthesis
// ============================================

/**
 * Extract themes from text
 * @param {string} text - Text to analyze
 * @returns {Array} Array of identified themes
 */
function extractThemesFromText(text) {
  if (!text) return [];
  
  var themes = [];
  var themeKeywords = {
    'Investment': ['investment', 'invested', 'funding', 'capital', 'billion', 'million', 'financial'],
    'Competition': ['competing', 'competition', 'competitive', 'vs', 'versus', 'against', 'rivalry'],
    'Innovation': ['innovate', 'innovation', 'new', 'breakthrough', 'emerging', 'cutting-edge', 'revolution'],
    'Safety': ['safety', 'security', 'risk', 'protect', 'vulnerability', 'breach', 'threat'],
    'Enterprise': ['enterprise', 'business', 'commercial', 'corporate', 'industry', 'market'],
    'Consumer': ['consumer', 'user', 'customer', 'personal', 'individual'],
    'Technology': ['model', 'platform', 'tool', 'application', 'system', 'architecture'],
    'Regulation': ['regulation', 'policy', 'governance', 'compliance', 'oversight'],
    'Ethics': ['ethical', 'ethics', 'responsible', 'transparent', 'fairness'],
    'Development': ['development', 'deployment', 'implementation', 'rollout', 'launch']
  };
  
  var lowerText = text.toLowerCase();
  for (var theme in themeKeywords) {
    if (themeKeywords.hasOwnProperty(theme)) {
      var keywords = themeKeywords[theme];
      for (var i = 0; i < keywords.length; i++) {
        if (lowerText.indexOf(keywords[i]) !== -1) {
          if (themes.indexOf(theme) === -1) {
            themes.push(theme);
          }
          break;
        }
      }
    }
  }
  
  return themes;
}

/**
 * Extract entities from text
 * @param {string} text - Text to analyze
 * @returns {Array} Array of identified entities
 */
function extractEntitiesFromText(text) {
  if (!text) return [];
  
  var entities = [];
  var patterns = [
    /(Microsoft|OpenAI|Anthropic|Meta|Google|Amazon|Apple|Tesla|NVIDIA|AMD|Intel|IBM|Oracle|Salesforce|Adobe|Cisco|Dell|HP|Samsung|Sony|XAI|Grok|Claude|ChatGPT|Gemini|Gemma|Mistral|LLaMA|Pickaxe|Synthesia|Raulji|Gumloop|Red River)/g,
    /(GPT-5\.6|GPT-4|Claude Sonnet|Claude Opus|Grok 4\.5|Grok 3|LLaMA|Gemini|Gemma|Mistral|Mixtral)/g,
    /(Satya Nadella|Sam Altman|Mark Zuckerberg|Dario Amodei|Elon Musk|Bill Gates|Tim Cook|Jeff Bezos|Sundar Pichai|Carl Franzen|Taryn Plumb|Michael Nuñez)/g
  ];
  
  for (var i = 0; i < patterns.length; i++) {
    var matches = text.match(patterns[i]) || [];
    for (var j = 0; j < matches.length; j++) {
      if (entities.indexOf(matches[j]) === -1) {
        entities.push(matches[j]);
      }
    }
  }
  
  return entities;
}

/**
 * Synthesize response from multiple sources
 * @param {string} response - Original response
 * @param {Array} sources - Source objects
 * @returns {string} Synthesized response
 */
function synthesizeResponse(response, sources) {
  if (!response || !sources || sources.length === 0) return response;
  
  var lines = response.split('\n');
  var uniqueLines = [];
  var seenContent = new Set();
  
  for (var i = 0; i < lines.length; i++) {
    var trimmed = lines[i].trim();
    if (!trimmed) continue;
    
    if (trimmed.match(/^Source \d+:$/) || 
        trimmed.match(/^Title:$/) || 
        trimmed.match(/^Content:$/)) {
      continue;
    }
    
    var key = trimmed.substring(0, 50);
    if (!seenContent.has(key)) {
      seenContent.add(key);
      uniqueLines.push(trimmed);
    }
  }
  
  var synthesized = uniqueLines.join('\n');
  
  if (sources.length > 1) {
    var sourceNames = [];
    var seenNames = new Set();
    for (var j = 0; j < sources.length; j++) {
      var name = sources[j].source_name || 'Unknown';
      if (!seenNames.has(name)) {
        seenNames.add(name);
        sourceNames.push(name);
      }
    }
    if (sourceNames.length > 0) {
      synthesized += '\n\nSynthesis Note: This response synthesizes information from ' + 
                     sourceNames.join(', ') + '.';
    }
  }
  
  return synthesized;
}

/**
 * Add contextual analysis to response
 * @param {string} response - Original response
 * @param {Array} sources - Source objects
 * @returns {string} Response with contextual analysis
 */
function addContextualAnalysis(response, sources) {
  if (!response) return response;
  
  var themes = extractThemesFromText(response);
  var entities = extractEntitiesFromText(response);
  
  var analysis = '\n\nContextual Analysis:\n';
  
  if (themes.length > 0) {
    analysis += 'Key Themes:\n';
    for (var i = 0; i < Math.min(themes.length, 4); i++) {
      analysis += '  • ' + themes[i] + '\n';
    }
  }
  
  if (entities.length > 0) {
    analysis += '\nKey Entities:\n';
    for (var j = 0; j < Math.min(entities.length, 5); j++) {
      analysis += '  • ' + entities[j] + '\n';
    }
  }
  
  if (sources && sources.length > 0) {
    var sourceNames = [];
    var seenNames = new Set();
    for (var k = 0; k < sources.length; k++) {
      var name = sources[k].source_name || 'Unknown';
      if (!seenNames.has(name)) {
        seenNames.add(name);
        sourceNames.push(name);
      }
    }
    if (sourceNames.length > 0) {
      analysis += '\nSources: ' + sourceNames.join(', ') + '\n';
    }
  }
  
  return response + analysis;
}

/**
 * Format response with proper structure
 * @param {string} text - Text to format
 * @returns {string} Formatted text
 */
function formatWithProperStructure(text) {
  if (!text) return text;
  
  var paragraphs = text.split(/\n\s*\n/);
  var formatted = [];
  
  for (var i = 0; i < paragraphs.length; i++) {
    var para = paragraphs[i].trim();
    if (!para) continue;
    
    if (para.match(/^[•\-*]\s/m)) {
      var items = para.split('\n');
      var formattedItems = [];
      for (var j = 0; j < items.length; j++) {
        var item = items[j].trim();
        if (item.match(/^[•\-*]\s/)) {
          formattedItems.push('  • ' + item.replace(/^[•\-*]\s/, ''));
        } else {
          formattedItems.push(item);
        }
      }
      formatted.push(formattedItems.join('\n'));
    } else if (para.match(/^\d+\.\s/m)) {
      var items2 = para.split('\n');
      var formattedItems2 = [];
      for (var k = 0; k < items2.length; k++) {
        var item2 = items2[k].trim();
        if (item2.match(/^\d+\.\s/)) {
          formattedItems2.push('  ' + item2);
        } else {
          formattedItems2.push(item2);
        }
      }
      formatted.push(formattedItems2.join('\n'));
    } else {
      formatted.push(para);
    }
  }
  
  return formatted.join('\n\n');
}

// ============================================
// SEARCH FUNCTIONS
// ============================================

function classifyQuery(query) {
  var lower = query.toLowerCase();
  
  var categories = {
    factual: { keywords: ['what', 'when', 'where', 'who', 'which', 'is', 'are', 'was', 'were', 'did'], weight: 1 },
    analytical: { keywords: ['compare', 'contrast', 'analyze', 'synthesis', 'trend', 'pattern', 'relationship', 'impact', 'cause'], weight: 1.5 },
    comparative: { keywords: ['better', 'best', 'worst', 'top', 'vs', 'versus', 'compared to', 'difference'], weight: 1.5 },
    exploratory: { keywords: ['how does', 'why does', 'what if', 'could', 'would', 'might', 'imagine'], weight: 1.2 },
    summarization: { keywords: ['summarize', 'summarise', 'brief', 'overview', 'key points', 'main ideas', 'tl;dr'], weight: 1.3 }
  };
  
  var scores = {};
  var bestCategory = 'factual';
  var bestScore = 0;
  
  for (var category in categories) {
    if (categories.hasOwnProperty(category)) {
      var data = categories[category];
      var score = 0;
      for (var i = 0; i < data.keywords.length; i++) {
        if (lower.indexOf(data.keywords[i]) !== -1) score += 1;
      }
      scores[category] = score * data.weight;
      if (scores[category] > bestScore) {
        bestScore = scores[category];
        bestCategory = category;
      }
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

async function searchSources(query) {
  if (!query) return { results: [], classification: null };
  
  var queryLower = query.toLowerCase().trim();
  if (queryLower.length < 2) return { results: [], classification: null };
  
  var classification = classifyQuery(query);
  
  var semanticResults = [];
  try {
    semanticResults = await semanticSearch(query, uniqueSources, 10);
  } catch (error) {
    console.warn('Semantic search error:', error.message);
  }
  
  var keywordResults = advancedSearch.search(query, uniqueSources);
  
  var seenUrlsMerged = new Set();
  var mergedResults = [];
  
  for (var i = 0; i < semanticResults.length; i++) {
    var result = semanticResults[i];
    var url = result.source || '#';
    if (!seenUrlsMerged.has(url)) {
      seenUrlsMerged.add(url);
      mergedResults.push({
        ...result,
        searchType: 'semantic',
        relevance: Math.max(result.relevance || 0, (result.score || 0) * 100 || 0)
      });
    }
  }
  
  for (var j = 0; j < keywordResults.length; j++) {
    var item = keywordResults[j];
    var url2 = item.source || '#';
    if (!seenUrlsMerged.has(url2)) {
      seenUrlsMerged.add(url2);
      mergedResults.push({
        title: item.title || 'Untitled',
        source: url2,
        source_name: item.source_name || 'Unknown',
        author: item.author || 'Unknown',
        date: item.date || '',
        chunk: (item.bestChunk || item.chunk || '').substring(0, 500) + '...',
        relevance: Math.min(Math.round((item.hybridScore || 0) * 100), 100),
        score: item.hybridScore || 0,
        domain: item.domain || 'unknown',
        fullContent: item.fullContent || '',
        methodCount: item.methodCount || 1,
        searchType: 'keyword'
      });
    }
  }
  
  mergedResults.sort(function(a, b) {
    return (b.relevance || 0) - (a.relevance || 0);
  });
  
  return {
    results: mergedResults.slice(0, 5),
    classification: classification
  };
}

function extractFacts(query, results) {
  var facts = [];
  var queryWords = query.toLowerCase().split(/\s+/);
  
  for (var i = 0; i < results.length; i++) {
    var result = results[i];
    var content = result.fullContent || result.chunk || '';
    var sentences = content.split(/[.!?]+/);
    
    for (var j = 0; j < sentences.length; j++) {
      var sentence = sentences[j];
      var sentenceLower = sentence.toLowerCase();
      var matchedWords = [];
      for (var k = 0; k < queryWords.length; k++) {
        if (queryWords[k].length > 3 && sentenceLower.indexOf(queryWords[k]) !== -1) {
          matchedWords.push(queryWords[k]);
        }
      }
      
      if (matchedWords.length >= 1) {
        var relevance = matchedWords.length / queryWords.length;
        facts.push({
          text: sentence.trim(),
          source: result.source_name,
          title: result.title,
          relevance: relevance,
          url: result.source
        });
      }
    }
  }
  
  facts.sort(function(a, b) {
    return b.relevance - a.relevance;
  });
  
  var uniqueFacts = [];
  var seenTexts = new Set();
  
  for (var l = 0; l < facts.length; l++) {
    var fact = facts[l];
    var key = fact.text.substring(0, 50);
    if (!seenTexts.has(key) && fact.text.length > 20) {
      seenTexts.add(key);
      uniqueFacts.push(fact);
    }
    if (uniqueFacts.length >= 5) break;
  }
  
  return uniqueFacts;
}

// ============================================
// ENHANCED RESPONSE GENERATION
// ============================================

async function generateResponse(query, searchResult, req, res) {
  var startTime = Date.now();
  var results = searchResult.results || [];
  var classification = searchResult.classification || null;
  var queryType = classification ? classification.type : 'factual';
  
  performanceMetrics.trackMemory();
  
  var cached = responseCache.get(query);
  if (cached) {
    analytics.trackQuery(query, {
      ...cached.metadata,
      cached: true,
      responseTime: Date.now() - startTime,
      sources: cached.sources
    });
    performanceMetrics.trackResponseTime(Date.now() - startTime);
    return cached;
  }
  
  var intentInfo = intentDetector.detectIntent(query);
  var streamRequested = req && (req.query && req.query.stream === 'true' || req.body && req.body.stream === true);
  
  // Check for enhanced parameters
  var requireSynthesis = req && req.body ? req.body.requireSynthesis || false : false;
  var requireContextualAnalysis = req && req.body ? req.body.requireContextualAnalysis || false : false;
  var personality = req && req.body ? req.body.personality || ENHANCED_CONFIG.DEFAULTS.PERSONALITY : ENHANCED_CONFIG.DEFAULTS.PERSONALITY;
  var intent = req && req.body ? req.body.intent || ENHANCED_CONFIG.DEFAULTS.INTENT : ENHANCED_CONFIG.DEFAULTS.INTENT;
  
  var context = '';
  if (results && results.length > 0) {
    context = results.map(function(r, i) {
      return 'Source ' + (i+1) + ': ' + r.title + '\n' + (r.chunk || (r.fullContent ? r.fullContent.substring(0, 500) : ''));
    }).join('\n\n');
  } else {
    context = 'No specific sources found. Provide a general response based on your knowledge.';
  }
  
  var confidence = results && results.length > 0 
    ? confidenceScorer.calculateConfidence(results, results, classification)
    : { level: 'Low', score: 20, breakdown: { relevance: 0, authority: 0, diversity: 0 } };
  
  performanceMetrics.trackSourceCount(results ? results.length : 0);
  
  if (streamRequested) {
    var apiKey = process.env.GROQ_API_KEY;
    if (apiKey) {
      await streamingHandler.streamResponse(query, context, apiKey, res);
      return null;
    }
  }
  
  var apiKey = process.env.GROQ_API_KEY;
  
  // Pass enhanced parameters to orchestrator
  var modelResult = await orchestrator.generateResponse(
    query, 
    context, 
    intentInfo.primary, 
    apiKey,
    {
      requireSynthesis: requireSynthesis,
      requireContextualAnalysis: requireContextualAnalysis,
      personality: personality,
      intent: intent
    }
  );
  
  if (modelResult.usage) {
    performanceMetrics.trackTokenUsage(modelResult.usage.total_tokens || 0);
  }
  
  var enhancedResponse = modelResult.response;
  if (modelResult.success && modelResult.model === 'grok') {
    enhancedResponse = enhanceSemanticContext(query, modelResult.response, results);
    
    if (requireSynthesis) {
      enhancedResponse = synthesizeResponse(enhancedResponse, results);
    }
    
    if (requireContextualAnalysis) {
      enhancedResponse = addContextualAnalysis(enhancedResponse, results);
    }
  }
  
  enhancedResponse = formatWithProperStructure(enhancedResponse);
  
  var qualityScore = scoreResponseQuality(
    enhancedResponse || '', 
    results || [], 
    confidence
  );
  
  var formattedOutput = formatProfessionalResponse(
    query,
    enhancedResponse || 'Unable to generate a response at this time.',
    results || [],
    confidence,
    qualityScore
  );
  
  var responseTime = Date.now() - startTime;
  performanceMetrics.trackResponseTime(responseTime);
  
  var finalResponse = {
    response: formattedOutput,
    sources: results || [],
    metadata: {
      total_sources: uniqueSources.length,
      matches_found: results ? results.length : 0,
      query_type: queryType,
      query_confidence: classification ? classification.confidence || 0 : 0,
      intent: intentInfo.primary,
      intent_confidence: Math.round(intentInfo.confidence * 100),
      confidence: confidence,
      quality_score: qualityScore,
      ai_generated: true,
      model: modelResult.model || 'fallback',
      formatted: true,
      enhanced: true,
      professional_style: true,
      contextual_analysis: requireContextualAnalysis,
      synthesized: requireSynthesis,
      personality: personality,
      responseTime: responseTime,
      cached: false,
      searchTypes: results ? results.map(function(r) { return r.searchType; }).filter(Boolean) : [],
      last_updated: new Date().toISOString()
    }
  };
  
  // Add themes and entities if available
  if (ENHANCED_CONFIG.FEATURES.EXTRACT_THEMES && enhancedResponse) {
    var themes = extractThemesFromText(enhancedResponse);
    if (themes.length > 0) {
      finalResponse.metadata.themes = themes;
    }
  }
  
  if (ENHANCED_CONFIG.FEATURES.EXTRACT_ENTITIES && enhancedResponse) {
    var entities = extractEntitiesFromText(enhancedResponse);
    if (entities.length > 0) {
      finalResponse.metadata.entities = entities;
    }
  }
  
  analytics.trackQuery(query, {
    ...finalResponse.metadata,
    responseTime: responseTime,
    sources: results || [],
    userId: req ? (req.headers ? req.headers['x-forwarded-for'] || req.socket ? req.socket.remoteAddress || 'anonymous' : 'anonymous' : 'anonymous') : 'anonymous'
  });
  
  queryLogger.log(query, formattedOutput, {
    ...finalResponse.metadata,
    responseTime: responseTime,
    sources: results || []
  });
  
  responseCache.set(query, finalResponse);
  return finalResponse;
}

// ============================================
// SEMANTIC ENHANCEMENT SYSTEM
// ============================================

function extractEntities(text) {
  var entities = [];
  var patterns = {
    company: /(Microsoft|OpenAI|Anthropic|Meta|Google|Amazon|Apple|Tesla|NVIDIA|AMD|Intel|IBM|Oracle|Salesforce|Adobe|Cisco|Dell|HP|Samsung|Sony|XAI|Grok|Claude|ChatGPT)/g,
    person: /(Satya Nadella|Sam Altman|Mark Zuckerberg|Dario Amodei|Elon Musk|Bill Gates|Tim Cook|Jeff Bezos|Sundar Pichai|Satya|Nadella|Altman|Zuckerberg|Amodei|Musk|Gates|Cook|Bezos|Pichai)/g,
    model: /(GPT-5\.6|GPT-4|Claude Sonnet|Claude Opus|Grok 4\.5|Grok 3|LLaMA|Gemini|Gemma|Mistral|Mixtral)/g,
    topic: /(AI|artificial intelligence|machine learning|deep learning|neural network|agent|automation|safety|security|investment|enterprise|startup)/gi
  };
  
  for (var type in patterns) {
    if (patterns.hasOwnProperty(type)) {
      var matches = text.match(patterns[type]) || [];
      for (var i = 0; i < matches.length; i++) {
        if (entities.indexOf(matches[i]) === -1) {
          entities.push(matches[i]);
        }
      }
    }
  }
  
  return [...new Set(entities)];
}

function enhanceSemanticContext(query, grokResponse, results) {
  if (!grokResponse || !results || results.length === 0) {
    return grokResponse;
  }

  var entities = extractEntities(query);
  var enhancedResponse = grokResponse;
  
  for (var i = 0; i < entities.length; i++) {
    var entity = entities[i];
    if (enhancedResponse.toLowerCase().indexOf(entity.toLowerCase()) === -1) {
      var relevantSource = null;
      for (var j = 0; j < results.length; j++) {
        var content = (results[j].fullContent || results[j].content || '').toLowerCase();
        if (content.indexOf(entity.toLowerCase()) !== -1) {
          relevantSource = results[j];
          break;
        }
      }
      if (relevantSource) {
        var contextChunk = relevantSource.chunk || (relevantSource.fullContent ? relevantSource.fullContent.substring(0, 300) : '');
        if (contextChunk) {
          enhancedResponse += '\n\nAbout ' + entity + ': ' + contextChunk;
          break;
        }
      }
    }
  }
  
  return enhancedResponse;
}

function scoreResponseQuality(response, sources, confidence) {
  var score = 0;
  
  var wordCount = (response || '').split(' ').length;
  if (wordCount > 200) score += 30;
  else if (wordCount > 100) score += 20;
  else if (wordCount > 50) score += 10;
  
  if (sources && sources.length >= 3) score += 25;
  else if (sources && sources.length >= 2) score += 15;
  else if (sources && sources.length >= 1) score += 8;
  
  if (confidence && confidence.score >= 80) score += 25;
  else if (confidence && confidence.score >= 50) score += 15;
  else if (confidence && confidence.score >= 30) score += 10;
  
  var entities = extractEntities(response || '');
  if (entities.length >= 3) score += 20;
  else if (entities.length >= 2) score += 15;
  else if (entities.length >= 1) score += 10;
  
  return {
    score: Math.min(score, 100),
    level: score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : score >= 40 ? 'Fair' : 'Needs Improvement',
    breakdown: {
      completeness: Math.min((wordCount > 200 ? 30 : wordCount > 100 ? 20 : 10), 30),
      sources: Math.min((sources && sources.length >= 3 ? 25 : sources && sources.length >= 2 ? 15 : 8), 25),
      confidence: Math.min((confidence && confidence.score >= 80 ? 25 : confidence && confidence.score >= 50 ? 15 : 10), 25),
      entities: Math.min((entities.length >= 3 ? 20 : entities.length >= 2 ? 15 : 10), 20)
    }
  };
}

// ============================================
// PROFESSIONAL LAYOUT FORMATTER
// ============================================

function formatProfessionalResponse(query, response, sources, confidence, qualityScore) {
  var indent = '  ';
  var doubleIndent = '    ';
  var output = [];
  
  if (response) {
    var cleanResponse = response;
    cleanResponse = cleanResponse.replace(/\*\*/g, '');
    cleanResponse = cleanResponse.replace(/\*/g, '');
    cleanResponse = cleanResponse.replace(/Summary:|Executive Summary:|Overview:/gi, '');
    cleanResponse = cleanResponse.replace(/Key Facts:|What you need to know:/gi, '');
    
    var paragraphs = cleanResponse.split('\n\n');
    var formattedParagraphs = [];
    
    for (var i = 0; i < paragraphs.length; i++) {
      var para = paragraphs[i];
      if (para.trim()) {
        var words = para.trim().split(' ');
        var line = '';
        var wrappedLines = [];
        for (var j = 0; j < words.length; j++) {
          if ((line + words[j]).length > 70) {
            wrappedLines.push(indent + line.trim());
            line = '';
          }
          line += words[j] + ' ';
        }
        if (line.trim()) {
          wrappedLines.push(indent + line.trim());
        }
        formattedParagraphs.push(wrappedLines.join('\n'));
      }
    }
    
    output.push(formattedParagraphs.join('\n\n'));
    output.push('');
  }
  
  var facts = extractFacts(query, sources || []);
  if (facts && facts.length > 0) {
    output.push(indent + 'Key Findings');
    output.push(indent + '-'.repeat(50));
    
    for (var k = 0; k < Math.min(facts.length, 4); k++) {
      var f = facts[k];
      var factText = f.text;
      if (!factText.endsWith('.') && !factText.endsWith('!') && !factText.endsWith('?')) {
        factText += '.';
      }
      
      var sourceMatch = null;
      for (var l = 0; l < sources.length; l++) {
        if (sources[l].source_name === f.source) {
          sourceMatch = sources[l];
          break;
        }
      }
      var sourceUrl = sourceMatch ? (sourceMatch.source || sourceMatch.url || '#') : '#';
      var sourceDisplay = sourceMatch ? sourceMatch.source_name : (f.source || 'Unknown');
      var linkedSource = '[' + sourceDisplay + '](' + sourceUrl + ')';
      
      output.push(indent + (k + 1) + '. ' + factText);
      output.push(doubleIndent + 'Source: ' + linkedSource);
      output.push('');
    }
  }
  
  if (confidence) {
    var score = confidence.score || 0;
    var confidenceText = '';
    
    if (score >= 80) {
      confidenceText = 'High confidence — the sources are consistent and authoritative.';
    } else if (score >= 50) {
      confidenceText = 'Moderate confidence — the data is solid but not overwhelming.';
    } else {
      confidenceText = 'Limited confidence — the evidence is suggestive but not conclusive.';
    }
    
    output.push(indent + 'Confidence Assessment');
    output.push(indent + '-'.repeat(50));
    output.push(indent + confidenceText);
    output.push('');
  }
  
  if (sources && sources.length > 0) {
    output.push(indent + 'References');
    output.push(indent + '-'.repeat(50));
    
    for (var m = 0; m < Math.min(sources.length, 4); m++) {
      var s = sources[m];
      var url = s.source || s.url || '#';
      var sourceName = s.source_name || 'Unknown';
      var linkedSource = '[' + sourceName + '](' + url + ')';
      
      output.push(doubleIndent + (m + 1) + '. ' + (s.title || 'Untitled'));
      output.push(doubleIndent + '   ' + linkedSource + (s.date ? ', ' + s.date : ''));
      output.push('');
    }
  }
  
  if (qualityScore) {
    var level = qualityScore.level || 'Good';
    var score2 = qualityScore.score || 0;
    output.push(indent + 'Note: This response is rated as ' + level.toLowerCase() + ' (' + score2 + '%) based on source quality and coverage.');
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

  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      allowed: ['GET', 'POST']
    });
  }

  var query = null;
  var action = null;

  if (req.method === 'GET') {
    query = req.query.query || null;
    action = req.query.action || null;
  } else {
    query = req.body ? req.body.query || null : null;
    action = req.body ? req.body.action || null : null;
  }

  // ============================================
  // ROUTE: HEALTH
  // ============================================
  if (action === 'health' || action === 'ping') {
    return res.status(200).json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      total_sources: uniqueSources.length,
      source_stats: sourceStats,
      source_names: [...new Set(uniqueSources.map(function(s) { return s.source_name; }))],
      grok_available: !!process.env.GROQ_API_KEY,
      embedding_available: !!process.env.OPENAI_API_KEY,
      cache_stats: responseCache.getStats(),
      feedback_stats: feedbackSystem.getStats(),
      models: orchestrator.getAvailableModels(),
      features: ['grok_ai', 'intent_detection', 'confidence_scoring', 'advanced_search', 'professional_formatting', 'embedded_links', 'semantic_enhancement', 'quality_scoring', 'multi_model', 'streaming', 'feedback', 'analytics', 'vector_embeddings', 'semantic_search', 'contextual_analysis', 'synthesis', 'theme_extraction', 'entity_extraction']
    });
  }

  // ============================================
  // ROUTE: ANALYTICS
  // ============================================
  if (action === 'analytics' || action === 'stats') {
    return res.status(200).json({
      analytics: analytics.getStats(),
      performance: performanceMetrics.getStats(),
      logs: queryLogger.getStats(),
      cache: responseCache.getStats()
    });
  }

  // ============================================
  // ROUTE: LOGS
  // ============================================
  if (action === 'logs') {
    var limit = parseInt(req.query.limit) || 20;
    return res.status(200).json({
      logs: queryLogger.getLogs(limit)
    });
  }

  // ============================================
  // ROUTE: RESET ANALYTICS
  // ============================================
  if (action === 'reset-analytics') {
    analytics.reset();
    queryLogger.clear();
    return res.status(200).json({
      success: true,
      message: 'Analytics reset'
    });
  }

  // ============================================
  // ROUTE: FEEDBACK
  // ============================================
  if (action === 'feedback') {
    var feedback = req.body ? (req.body.feedback || req.query.feedback) : null;
    var queryId = req.body ? (req.body.queryId || req.query.queryId) : null;
    
    if (!feedback || !queryId) {
      return res.status(400).json({ error: 'Missing feedback or queryId' });
    }
    
    var result = feedbackSystem.addFeedback(queryId, feedback);
    return res.status(200).json(result);
  }

  if (action === 'feedback-stats') {
    return res.status(200).json(feedbackSystem.getStats());
  }

  // ============================================
  // ROUTE: MODEL SWITCH
  // ============================================
  if (action === 'switch-model') {
    var model = req.body ? (req.body.model || req.query.model) : null;
    if (!model) {
      return res.status(400).json({ error: 'Missing model name' });
    }
    var result = orchestrator.switchModel(model);
    return res.status(200).json(result);
  }

  if (action === 'models') {
    return res.status(200).json({
      models: orchestrator.getAvailableModels(),
      active: orchestrator.activeModel
    });
  }

  // ============================================
  // ROUTE: ALL SOURCES
  // ============================================
  if (action === 'all') {
    return res.status(200).json({
      total: uniqueSources.length,
      source_stats: sourceStats,
      sources: uniqueSources.map(function(s) {
        return {
          title: s.title,
          source_name: s.source_name,
          author: s.author || 'Unknown',
          date: s.date || '',
          url: s.url,
          word_count: s.word_count || 0,
          domain: s.domain || 'unknown'
        };
      })
    });
  }

  // ============================================
  // ROUTE: CLEAR CACHE
  // ============================================
  if (action === 'clear-cache') {
    responseCache.clear();
    return res.status(200).json({
      status: 'ok',
      message: 'Cache cleared',
      cache_stats: responseCache.getStats()
    });
  }

  // ============================================
  // ROUTE: SEARCH
  // ============================================
  if (query) {
    var searchResult = await searchSources(query);
    var response = await generateResponse(query, searchResult, req, res);
    
    if (response === null) {
      return;
    }
    
    return res.status(200).json(response);
  }

  // ============================================
  // DEFAULT
  // ============================================
  return res.status(200).json({
    name: 'Omni Brand Intelligence Bot API',
    version: '5.0.0',
    status: 'running',
    features: ['grok_ai', 'intent_detection', 'confidence_scoring', 'advanced_search', 'professional_formatting', 'embedded_links', 'semantic_enhancement', 'quality_scoring', 'multi_model', 'streaming', 'feedback', 'analytics', 'performance_tracking', 'vector_embeddings', 'semantic_search', 'contextual_analysis', 'synthesis', 'theme_extraction', 'entity_extraction'],
    total_sources: uniqueSources.length,
    source_stats: sourceStats,
    source_names: [...new Set(uniqueSources.map(function(s) { return s.source_name; }))],
    grok_available: !!process.env.GROQ_API_KEY,
    embedding_available: !!process.env.OPENAI_API_KEY,
    cache_stats: responseCache.getStats(),
    feedback_stats: feedbackSystem.getStats(),
    active_model: orchestrator.activeModel,
    models: orchestrator.getAvailableModels(),
    endpoints: {
      search: 'GET/POST with ?query=your+question',
      health: 'GET?action=health',
      all: 'GET?action=all',
      stats: 'GET?action=stats',
      analytics: 'GET?action=analytics',
      logs: 'GET?action=logs',
      clear_cache: 'GET?action=clear-cache',
      reset_analytics: 'GET?action=reset-analytics',
      feedback: 'POST with {queryId, feedback: {rating, comment}}',
      models: 'GET?action=models',
      switch_model: 'POST with {model: "grok"}',
      enhanced: 'POST with {query, requireSynthesis: true, requireContextualAnalysis: true, personality: "conscientiousness"}'
    },
    last_updated: new Date().toISOString()
  });
}
