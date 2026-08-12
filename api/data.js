// api/data.js - Complete API with Human-Written Style + Embedded Links

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

// ============================================
// ALL DATA EMBEDDED HERE
// ============================================

// ... (your existing data arrays: techCrunchSources, staticSources, ventureBeatSources) ...

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
// SEARCH FUNCTIONS
// ============================================

// ... (your existing search functions: classifyQuery, searchSources, extractFacts, generateNoResultsResponse, generateSuggestions) ...

// ============================================
// SEMANTIC ENHANCEMENT SYSTEM
// ============================================

// ... (your existing enhancement functions: extractEntities, enhanceSemanticContext, scoreResponseQuality) ...

// ============================================
// HUMAN-WRITTEN STYLE FORMATTER - Embedded Links
// ============================================

function formatHumanResponse(query, response, sources, confidence, qualityScore) {
  let output = [];
  
  // ============================================
  // RESPONSE BODY - Clean, indented paragraphs
  // ============================================
  if (response) {
    let cleanResponse = response;
    cleanResponse = cleanResponse.replace(/\*\*/g, '');
    cleanResponse = cleanResponse.replace(/\*/g, '');
    cleanResponse = cleanResponse.replace(/Summary:|Executive Summary:|Overview:/gi, '');
    cleanResponse = cleanResponse.replace(/Key Facts:|What you need to know:/gi, '');
    cleanResponse = cleanResponse.replace(/•/g, '  -');
    
    const paragraphs = cleanResponse.split('\n\n');
    let formattedParagraphs = [];
    
    for (const para of paragraphs) {
      if (para.trim()) {
        const words = para.trim().split(' ');
        let line = '';
        let wrappedLines = [];
        for (const word of words) {
          if ((line + word).length > 70) {
            wrappedLines.push(`  ${line.trim()}`);
            line = '';
          }
          line += word + ' ';
        }
        if (line.trim()) {
          wrappedLines.push(`  ${line.trim()}`);
        }
        formattedParagraphs.push(wrappedLines.join('\n'));
      }
    }
    
    output.push(formattedParagraphs.join('\n\n'));
    output.push('');
  }
  
  // ============================================
  // KEY FACTS - Bullet points with embedded links
  // ============================================
  const facts = extractFacts(query, sources || []);
  if (facts && facts.length > 0) {
    output.push('  Key findings:');
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
      
      output.push(`    ${i+1}. ${factText}`);
      output.push(`       Source: ${linkedSource}`);
      output.push('');
    }
  }
  
  // ============================================
  // CONFIDENCE - Natural language
  // ============================================
  if (confidence) {
    const score = confidence.score || 0;
    let confidenceText = '';
    
    if (score >= 80) {
      confidenceText = 'I have high confidence in this information. The sources are consistent and authoritative.';
    } else if (score >= 50) {
      confidenceText = 'I have moderate confidence in this information. The data is solid but not overwhelming.';
    } else {
      confidenceText = 'I have limited confidence in this information. The evidence is suggestive but not conclusive.';
    }
    
    output.push(`  ${confidenceText}`);
    output.push('');
  }
  
  // ============================================
  // SOURCES - Embedded links
  // ============================================
  if (sources && sources.length > 0) {
    output.push('  References:');
    for (let i = 0; i < Math.min(sources.length, 4); i++) {
      const s = sources[i];
      const url = s.source || s.url || '#';
      const sourceName = s.source_name || 'Unknown';
      const linkedSource = `[${sourceName}](${url})`;
      
      output.push(`    ${i+1}. ${s.title || 'Untitled'}`);
      output.push(`       ${linkedSource}${s.date ? `, ${s.date}` : ''}`);
      output.push('');
    }
  }
  
  // ============================================
  // QUALITY NOTE - Brief and natural
  // ============================================
  if (qualityScore) {
    const level = qualityScore.level || 'Good';
    const score = qualityScore.score || 0;
    output.push(`  Note: This response is rated as ${level.toLowerCase()} (${score}%) based on source quality and coverage.`);
  }
  
  return output.join('\n');
}

// ============================================
// GENERATE RESPONSE - ENHANCED WITH HUMAN FORMATTING
// ============================================

async function generateResponse(query, searchResult) {
  const { results, classification } = searchResult;
  const queryType = classification?.type || 'factual';
  
  const cached = responseCache.get(query);
  if (cached) {
    return cached;
  }
  
  const intentInfo = intentDetector.detectIntent(query);
  
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
  
  let grokResponse = null;
  try {
    const apiKey = process.env.GROQ_API_KEY;
    if (apiKey) {
      const grokRequest = buildGrokRequest(query, context, intentInfo.primary);
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: grokRequest.messages,
          temperature: grokRequest.temperature,
          max_tokens: grokRequest.maxTokens
        })
      });

      if (response.ok) {
        const data = await response.json();
        grokResponse = data.choices[0].message.content;
      }
    }
  } catch (error) {
    console.warn('Grok failed:', error.message);
    grokResponse = null;
  }
  
  let enhancedResponse = grokResponse;
  if (grokResponse) {
    enhancedResponse = enhanceSemanticContext(query, grokResponse, results);
  }
  
  const qualityScore = scoreResponseQuality(
    enhancedResponse || '', 
    results || [], 
    confidence
  );
  
  // Use human-written style formatter
  const formattedOutput = formatHumanResponse(
    query,
    enhancedResponse || 'Unable to generate a response at this time.',
    results || [],
    confidence,
    qualityScore
  );
  
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
      model: grokResponse ? 'grok' : 'fallback',
      formatted: true,
      enhanced: true,
      human_style: true,
      last_updated: new Date().toISOString()
    }
  };
  
  responseCache.set(query, finalResponse);
  return finalResponse;
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

  let query = null;
  let action = null;

  if (req.method === 'GET') {
    query = req.query.query || null;
    action = req.query.action || null;
  } else {
    query = req.body?.query || null;
    action = req.body?.action || null;
  }

  if (action === 'health' || action === 'ping') {
    return res.status(200).json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      total_sources: uniqueSources.length,
      source_stats: sourceStats,
      source_names: [...new Set(uniqueSources.map(s => s.source_name))],
      grok_available: !!process.env.GROQ_API_KEY,
      cache_stats: responseCache.getStats(),
      features: ['grok_ai', 'intent_detection', 'confidence_scoring', 'advanced_search', 'human_written_style', 'embedded_links', 'semantic_enhancement', 'quality_scoring']
    });
  }

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

  if (action === 'stats') {
    return res.status(200).json({
      total_sources: uniqueSources.length,
      source_stats: sourceStats,
      grok_available: !!process.env.GROQ_API_KEY,
      cache_stats: responseCache.getStats(),
      features: ['human_written_style', 'embedded_links', 'semantic_enhancement', 'quality_scoring'],
      last_updated: new Date().toISOString()
    });
  }

  if (action === 'clear-cache') {
    responseCache.clear();
    return res.status(200).json({
      status: 'ok',
      message: 'Cache cleared',
      cache_stats: responseCache.getStats()
    });
  }

  if (query) {
    const searchResult = searchSources(query);
    const response = await generateResponse(query, searchResult);
    return res.status(200).json(response);
  }

  return res.status(200).json({
    name: 'Omni Brand Intelligence Bot API',
    version: '4.3.0',
    status: 'running',
    features: ['grok_ai', 'intent_detection', 'confidence_scoring', 'advanced_search', 'human_written_style', 'embedded_links', 'semantic_enhancement', 'quality_scoring'],
    total_sources: uniqueSources.length,
    source_stats: sourceStats,
    source_names: [...new Set(uniqueSources.map(s => s.source_name))],
    grok_available: !!process.env.GROQ_API_KEY,
    cache_stats: responseCache.getStats(),
    endpoints: {
      search: 'GET/POST with ?query=your+question',
      health: 'GET?action=health',
      all: 'GET?action=all',
      stats: 'GET?action=stats',
      clear_cache: 'GET?action=clear-cache'
    },
    last_updated: new Date().toISOString()
  });
}
