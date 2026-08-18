// api/data.js - Complete API with Vector Embeddings + Semantic Search (Day 1)

// ============================================
// IMPORTS - All from lib/
// ============================================

import { semanticChunk } from '../lib/chunking/semantic.js';
import { systemPrompts, selectPrompt } from '../lib/prompts/system.js';
import { getFewShotExamples } from '../lib/prompts/examples.js';
import { selectTemplate } from '../lib/prompts/templates.js';
import { generateCOTPrompt } from '../lib/prompts/cot.js';
import { selectPersona } from '../lib/prompts/personas.js';
import { intentDetector } from '../lib/response/intent.js';
import { confidenceScorer } from '../lib/response/confidence.js';
import { responseFormatter } from '../lib/response/formatter.js';
import { responseCache } from '../lib/response/cache.js';
import { advancedSearch } from '../lib/search/hybrid.js';
import { createGrokInstance } from '../lib/grok/index.js';
import { buildGrokRequest } from '../lib/grok/prompts.js';
import { orchestrator } from '../lib/models/orchestrator.js';
import { streamingHandler } from '../lib/response/streaming.js';
import { feedbackSystem } from '../lib/response/feedback.js';
import { analytics } from '../lib/analytics/tracker.js';
import { performanceMetrics } from '../lib/analytics/metrics.js';
import { queryLogger } from '../lib/response/logger.js';
// NEW: Vector Embeddings imports
import { semanticSearch, indexSources } from '../lib/embeddings/index.js';

// ============================================
// ALL DATA EMBEDDED HERE
// ============================================

// ... [Your existing data arrays remain exactly the same] ...

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
// SEARCH FUNCTIONS - ENHANCED WITH SEMANTIC SEARCH
// ============================================

function classifyQuery(query) {
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

// ============================================
// SEARCH SOURCES - HYBRID + SEMANTIC
// ============================================

async function searchSources(query) {
  if (!query) return { results: [], classification: null };
  
  const queryLower = query.toLowerCase().trim();
  if (queryLower.length < 2) return { results: [], classification: null };
  
  const classification = classifyQuery(query);
  
  // 1. Try semantic search first (vector embeddings)
  let semanticResults = [];
  try {
    semanticResults = await semanticSearch(query, uniqueSources, 10);
  } catch (error) {
    console.warn('Semantic search error:', error.message);
  }
  
  // 2. Keyword/hybrid search
  const keywordResults = advancedSearch.search(query, uniqueSources);
  
  // 3. Merge results (semantic first, then keyword)
  const seenUrls = new Set();
  const mergedResults = [];
  
  // Add semantic results
  for (const result of semanticResults) {
    const url = result.source || '#';
    if (!seenUrls.has(url)) {
      seenUrls.add(url);
      mergedResults.push({
        ...result,
        searchType: 'semantic',
        relevance: Math.max(result.relevance || 0, (result.score || 0) * 100 || 0)
      });
    }
  }
  
  // Add keyword results (deduplicate)
  for (const item of keywordResults) {
    const url = item.source || '#';
    if (!seenUrls.has(url)) {
      seenUrls.add(url);
      mergedResults.push({
        title: item.title || 'Untitled',
        source: url,
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
  
  // Sort by relevance
  mergedResults.sort((a, b) => (b.relevance || 0) - (a.relevance || 0));
  
  return {
    results: mergedResults.slice(0, 5),
    classification: classification
  };
}

// ============================================
// EXTRACT FACTS
// ============================================

function extractFacts(query, results) {
  const facts = [];
  const queryWords = query.toLowerCase().split(/\s+/);
  
  for (const result of results) {
    const content = result.fullContent || result.chunk || '';
    const sentences = content.split(/[.!?]+/);
    
    for (const sentence of sentences) {
      const sentenceLower = sentence.toLowerCase();
      const matchedWords = queryWords.filter(w => 
        w.length > 3 && sentenceLower.includes(w)
      );
      
      if (matchedWords.length >= 1) {
        const relevance = matchedWords.length / queryWords.length;
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
  
  facts.sort((a, b) => b.relevance - a.relevance);
  const uniqueFacts = [];
  const seenTexts = new Set();
  
  for (const fact of facts) {
    const key = fact.text.substring(0, 50);
    if (!seenTexts.has(key) && fact.text.length > 20) {
      seenTexts.add(key);
      uniqueFacts.push(fact);
    }
    if (uniqueFacts.length >= 5) break;
  }
  
  return uniqueFacts;
}

// ============================================
// GENERATE NO RESULTS RESPONSE
// ============================================

function generateNoResultsResponse(query) {
  const topics = [
    "Microsoft investment in Anthropic ($5B)",
    "OpenAI vs Anthropic comparison",
    "AI agent security risks",
    "Enterprise AI adoption",
    "AI model releases July 2026",
    "Meta AI strategy",
    "Hugging Face security incident",
    "AI safety and ethics",
    "AI tools and platforms",
    "TechCrunch Disrupt 2026"
  ];
  
  const queryWords = query.toLowerCase().split(/\s+/);
  const related = topics.filter(topic => {
    const topicWords = topic.toLowerCase().split(/\s+/);
    return topicWords.some(tw => queryWords.some(qw => tw.includes(qw) || qw.includes(tw)));
  });
  
  const suggestions = related.length > 0 ? related : topics.slice(0, 5);
  
  return `NO RESULTS FOUND

Query: "${query}"

Data Available:
- TechCrunch AI articles: ${techCrunchSources.length}
- VentureBeat AI articles: ${ventureBeatSources.length}
- Static sources: ${staticSources.length}
- Total: ${uniqueSources.length} articles

Try asking about:
${suggestions.map(s => `- ${s}`).join('\n')}

Available Sources:
${[...new Set(uniqueSources.map(s => `- ${s.source_name}`))].join('\n')}`;
}

function generateSuggestions(query) {
  const topics = [
    "Microsoft investment in Anthropic ($5B)",
    "OpenAI vs Anthropic comparison",
    "AI agent security risks",
    "Enterprise AI adoption",
    "AI model releases July 2026",
    "Meta AI strategy",
    "Hugging Face security incident",
    "AI safety and ethics",
    "AI tools and platforms",
    "TechCrunch Disrupt 2026"
  ];
  
  const queryWords = query.toLowerCase().split(/\s+/);
  const related = topics.filter(topic => {
    const topicWords = topic.toLowerCase().split(/\s+/);
    return topicWords.some(tw => queryWords.some(qw => tw.includes(qw) || qw.includes(tw)));
  });
  
  return related.length > 0 ? related : topics.slice(0, 5);
}

// ============================================
// SEMANTIC ENHANCEMENT SYSTEM
// ============================================

function extractEntities(text) {
  const entities = [];
  const patterns = {
    company: /(Microsoft|OpenAI|Anthropic|Meta|Google|Amazon|Apple|Tesla|NVIDIA|AMD|Intel|IBM|Oracle|Salesforce|Adobe|Cisco|Dell|HP|Samsung|Sony|XAI|Grok|Claude|ChatGPT)/g,
    person: /(Satya Nadella|Sam Altman|Mark Zuckerberg|Dario Amodei|Elon Musk|Bill Gates|Tim Cook|Jeff Bezos|Sundar Pichai|Satya|Nadella|Altman|Zuckerberg|Amodei|Musk|Gates|Cook|Bezos|Pichai)/g,
    model: /(GPT-5\.6|GPT-4|Claude Sonnet|Claude Opus|Grok 4\.5|Grok 3|LLaMA|Gemini|Gemma|Mistral|Mixtral)/g,
    topic: /(AI|artificial intelligence|machine learning|deep learning|neural network|agent|automation|safety|security|investment|enterprise|startup)/gi
  };
  
  for (const [type, pattern] of Object.entries(patterns)) {
    const matches = text.match(pattern) || [];
    for (const match of matches) {
      if (!entities.includes(match)) {
        entities.push(match);
      }
    }
  }
  
  return [...new Set(entities)];
}

function enhanceSemanticContext(query, grokResponse, results) {
  if (!grokResponse || !results || results.length === 0) {
    return grokResponse;
  }

  const entities = extractEntities(query);
  let enhancedResponse = grokResponse;
  
  for (const entity of entities) {
    if (!enhancedResponse.toLowerCase().includes(entity.toLowerCase())) {
      const relevantSource = results.find(r => 
        (r.fullContent || r.content || '').toLowerCase().includes(entity.toLowerCase())
      );
      if (relevantSource) {
        const contextChunk = relevantSource.chunk || relevantSource.fullContent?.substring(0, 300) || '';
        if (contextChunk) {
          enhancedResponse += `\n\nAbout ${entity}: ${contextChunk}`;
          break;
        }
      }
    }
  }
  
  return enhancedResponse;
}

function scoreResponseQuality(response, sources, confidence) {
  let score = 0;
  
  const wordCount = (response || '').split(' ').length;
  if (wordCount > 200) score += 30;
  else if (wordCount > 100) score += 20;
  else if (wordCount > 50) score += 10;
  
  if (sources && sources.length >= 3) score += 25;
  else if (sources && sources.length >= 2) score += 15;
  else if (sources && sources.length >= 1) score += 8;
  
  if (confidence && confidence.score >= 80) score += 25;
  else if (confidence && confidence.score >= 50) score += 15;
  else if (confidence && confidence.score >= 30) score += 10;
  
  const entities = extractEntities(response || '');
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
// PROFESSIONAL LAYOUT FORMATTER - Clickable Links
// ============================================

function formatProfessionalResponse(query, response, sources, confidence, qualityScore) {
  const indent = '  ';
  const doubleIndent = '    ';
  let output = [];
  
  if (response) {
    let cleanResponse = response;
    cleanResponse = cleanResponse.replace(/\*\*/g, '');
    cleanResponse = cleanResponse.replace(/\*/g, '');
    cleanResponse = cleanResponse.replace(/Summary:|Executive Summary:|Overview:/gi, '');
    cleanResponse = cleanResponse.replace(/Key Facts:|What you need to know:/gi, '');
    
    const paragraphs = cleanResponse.split('\n\n');
    let formattedParagraphs = [];
    
    for (const para of paragraphs) {
      if (para.trim()) {
        const words = para.trim().split(' ');
        let line = '';
        let wrappedLines = [];
        for (const word of words) {
          if ((line + word).length > 70) {
            wrappedLines.push(`${indent}${line.trim()}`);
            line = '';
          }
          line += word + ' ';
        }
        if (line.trim()) {
          wrappedLines.push(`${indent}${line.trim()}`);
        }
        formattedParagraphs.push(wrappedLines.join('\n'));
      }
    }
    
    output.push(formattedParagraphs.join('\n\n'));
    output.push('');
  }
  
  const facts = extractFacts(query, sources || []);
  if (facts && facts.length > 0) {
    output.push(`${indent}Key Findings`);
    output.push(`${indent}${'-'.repeat(50)}`);
    
    for (let i = 0; i < Math.min(facts.length, 4); i++) {
      const f = facts[i];
      let factText = f.text;
      if (!factText.endsWith('.') && !factText.endsWith('!') && !factText.endsWith('?')) {
        factText += '.';
      }
      
      const sourceMatch = sources.find(s => s.source_name === f.source);
      const sourceUrl = sourceMatch?.source || sourceMatch?.url || '#';
      const sourceDisplay = sourceMatch?.source_name || f.source || 'Unknown';
      const linkedSource = `[${sourceDisplay}](${sourceUrl})`;
      
      output.push(`${indent}${i + 1}. ${factText}`);
      output.push(`${doubleIndent}Source: ${linkedSource}`);
      output.push('');
    }
  }
  
  if (confidence) {
    const score = confidence.score || 0;
    let confidenceText = '';
    
    if (score >= 80) {
      confidenceText = 'High confidence — the sources are consistent and authoritative.';
    } else if (score >= 50) {
      confidenceText = 'Moderate confidence — the data is solid but not overwhelming.';
    } else {
      confidenceText = 'Limited confidence — the evidence is suggestive but not conclusive.';
    }
    
    output.push(`${indent}Confidence Assessment`);
    output.push(`${indent}${'-'.repeat(50)}`);
    output.push(`${indent}${confidenceText}`);
    output.push('');
  }
  
  if (sources && sources.length > 0) {
    output.push(`${indent}References`);
    output.push(`${indent}${'-'.repeat(50)}`);
    
    for (let i = 0; i < Math.min(sources.length, 4); i++) {
      const s = sources[i];
      const url = s.source || s.url || '#';
      const sourceName = s.source_name || 'Unknown';
      const linkedSource = `[${sourceName}](${url})`;
      
      output.push(`${doubleIndent}${i + 1}. ${s.title || 'Untitled'}`);
      output.push(`${doubleIndent}   ${linkedSource}${s.date ? `, ${s.date}` : ''}`);
      output.push('');
    }
  }
  
  if (qualityScore) {
    const level = qualityScore.level || 'Good';
    const score = qualityScore.score || 0;
    output.push(`${indent}Note: This response is rated as ${level.toLowerCase()} (${score}%) based on source quality and coverage.`);
  }
  
  return output.join('\n');
}

// ============================================
// GENERATE RESPONSE - WITH ANALYTICS
// ============================================

async function generateResponse(query, searchResult, req, res) {
  const startTime = Date.now();
  const { results, classification } = searchResult;
  const queryType = classification?.type || 'factual';
  
  performanceMetrics.trackMemory();
  
  const cached = responseCache.get(query);
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
  
  const intentInfo = intentDetector.detectIntent(query);
  const streamRequested = req?.query?.stream === 'true' || req?.body?.stream === true;
  
  let context = '';
  if (results && results.length > 0) {
    context = results.map((r, i) => 
      `Source ${i+1}: ${r.title}\n${r.chunk || r.fullContent?.substring(0, 500) || ''}`
    ).join('\n\n');
  } else {
    context = 'No specific sources found. Provide a general response based on your knowledge.';
  }
  
  const confidence = results && results.length > 0 
    ? confidenceScorer.calculateConfidence(results, results, classification)
    : { level: 'Low', score: 20, breakdown: { relevance: 0, authority: 0, diversity: 0 } };
  
  performanceMetrics.trackSourceCount(results?.length || 0);
  
  if (streamRequested) {
    const apiKey = process.env.GROQ_API_KEY;
    if (apiKey) {
      await streamingHandler.streamResponse(query, context, apiKey, res);
      return null;
    }
  }
  
  const apiKey = process.env.GROQ_API_KEY;
  const modelResult = await orchestrator.generateResponse(query, context, intentInfo.primary, apiKey);
  
  if (modelResult.usage) {
    performanceMetrics.trackTokenUsage(modelResult.usage.total_tokens || 0);
  }
  
  let enhancedResponse = modelResult.response;
  if (modelResult.success && modelResult.model === 'grok') {
    enhancedResponse = enhanceSemanticContext(query, modelResult.response, results);
  }
  
  const qualityScore = scoreResponseQuality(
    enhancedResponse || '', 
    results || [], 
    confidence
  );
  
  const formattedOutput = formatProfessionalResponse(
    query,
    enhancedResponse || 'Unable to generate a response at this time.',
    results || [],
    confidence,
    qualityScore
  );
  
  const responseTime = Date.now() - startTime;
  performanceMetrics.trackResponseTime(responseTime);
  
  const finalResponse = {
    response: formattedOutput,
    sources: results || [],
    metadata: {
      total_sources: uniqueSources.length,
      matches_found: results?.length || 0,
      query_type: queryType,
      query_confidence: classification?.confidence || 0,
      intent: intentInfo.primary,
      intent_confidence: Math.round(intentInfo.confidence * 100),
      confidence: confidence,
      quality_score: qualityScore,
      ai_generated: true,
      model: modelResult.model || 'fallback',
      formatted: true,
      enhanced: true,
      professional_style: true,
      responseTime: responseTime,
      cached: false,
      searchTypes: results.map(r => r.searchType).filter(Boolean),
      last_updated: new Date().toISOString()
    }
  };
  
  analytics.trackQuery(query, {
    ...finalResponse.metadata,
    responseTime: responseTime,
    sources: results || [],
    userId: req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'anonymous'
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
// API HANDLER - DEFAULT EXPORT
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

  let query = null;
  let action = null;

  if (req.method === 'GET') {
    query = req.query.query || null;
    action = req.query.action || null;
  } else {
    query = req.body?.query || null;
    action = req.body?.action || null;
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
      source_names: [...new Set(uniqueSources.map(s => s.source_name))],
      grok_available: !!process.env.GROQ_API_KEY,
      embedding_available: !!process.env.OPENAI_API_KEY,
      cache_stats: responseCache.getStats(),
      feedback_stats: feedbackSystem.getStats(),
      models: orchestrator.getAvailableModels(),
      features: ['grok_ai', 'intent_detection', 'confidence_scoring', 'advanced_search', 'professional_formatting', 'embedded_links', 'semantic_enhancement', 'quality_scoring', 'multi_model', 'streaming', 'feedback', 'analytics', 'vector_embeddings', 'semantic_search']
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
    const limit = parseInt(req.query.limit) || 20;
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
    const feedback = req.body?.feedback || req.query?.feedback;
    const queryId = req.body?.queryId || req.query?.queryId;
    
    if (!feedback || !queryId) {
      return res.status(400).json({ error: 'Missing feedback or queryId' });
    }
    
    const result = feedbackSystem.addFeedback(queryId, feedback);
    return res.status(200).json(result);
  }

  if (action === 'feedback-stats') {
    return res.status(200).json(feedbackSystem.getStats());
  }

  // ============================================
  // ROUTE: MODEL SWITCH
  // ============================================
  if (action === 'switch-model') {
    const model = req.body?.model || req.query?.model;
    if (!model) {
      return res.status(400).json({ error: 'Missing model name' });
    }
    const result = orchestrator.switchModel(model);
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
      sources: uniqueSources.map(s => ({
        title: s.title,
        source_name: s.source_name,
        author: s.author || 'Unknown',
        date: s.date || '',
        url: s.url,
        word_count: s.word_count || 0,
        domain: s.domain || 'unknown'
      }))
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
    const searchResult = await searchSources(query);
    const response = await generateResponse(query, searchResult, req, res);
    
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
    version: '4.7.0',
    status: 'running',
    features: ['grok_ai', 'intent_detection', 'confidence_scoring', 'advanced_search', 'professional_formatting', 'embedded_links', 'semantic_enhancement', 'quality_scoring', 'multi_model', 'streaming', 'feedback', 'analytics', 'performance_tracking', 'vector_embeddings', 'semantic_search'],
    total_sources: uniqueSources.length,
    source_stats: sourceStats,
    source_names: [...new Set(uniqueSources.map(s => s.source_name))],
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
      switch_model: 'POST with {model: "grok"}'
    },
    last_updated: new Date().toISOString()
  });
}
