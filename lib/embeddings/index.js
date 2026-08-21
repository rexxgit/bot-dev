// lib/embeddings/index.js - GROQ-Only Version
// ============================================================
// EMBEDDINGS MODULE - GROQ Only (No OpenAI)
// ============================================================

import { embeddingClient } from './client.js';
import { vectorStore } from './vector-store.js';

// ============================================================
// CONFIGURATION
// ============================================================

// Check if OpenAI key is available (we don't use it)
const HAS_OPENAI_KEY = false; // GROQ only mode

// ============================================================
// CORE FUNCTIONS
// ============================================================

/**
 * Index sources - Skip indexing (GROQ only mode)
 * @param {Array} sources - Array of source objects
 * @returns {Promise<object>} Stats
 */
export async function indexSources(sources) {
  console.log(`📊 GROQ-only mode: Skipping embedding indexing for ${sources.length} sources`);
  
  // Store sources in vector store for reference
  vectorStore.documents = sources.map(s => ({
    title: s.title || 'Untitled',
    content: (s.content || s.chunk || '').substring(0, 2000),
    source_name: s.source_name || 'Unknown',
    url: s.url || '#',
    date: s.date || '',
    author: s.author || 'Unknown',
    domain: s.domain || 'unknown'
  }));
  
  vectorStore.indexed = true;
  
  console.log(`✅ Stored ${sources.length} sources in vector store (GROQ-only mode)`);
  
  return {
    indexed: true,
    sourceCount: sources.length,
    mode: 'groq-only'
  };
}

/**
 * Semantic search - Return empty results (GROQ only mode)
 * @param {string} query - User query
 * @param {Array} sources - Array of source objects
 * @param {number} topK - Number of results to return
 * @returns {Promise<Array>} Empty array
 */
export async function semanticSearch(query, sources, topK = 5) {
  console.log('🔍 Semantic search skipped (GROQ-only mode)');
  
  // Return empty array - use keyword search instead
  return [];
}

/**
 * Simple keyword search fallback (used when embeddings are disabled)
 * @param {string} query - User query
 * @param {Array} sources - Array of source objects
 * @param {number} topK - Number of results to return
 * @returns {Array} Search results
 */
export function keywordFallbackSearch(query, sources, topK = 5) {
  if (!query || !sources || sources.length === 0) {
    return [];
  }
  
  const queryLower = query.toLowerCase();
  const queryWords = queryLower.split(/\s+/).filter(function(w) {
    return w.length > 2;
  });
  
  if (queryWords.length === 0) {
    return sources.slice(0, topK);
  }
  
  const scored = sources.map(function(source) {
    const content = (source.content || source.chunk || '').toLowerCase();
    const title = (source.title || '').toLowerCase();
    let score = 0;
    
    // Score based on keyword matches
    for (var i = 0; i < queryWords.length; i++) {
      var word = queryWords[i];
      if (title.indexOf(word) !== -1) {
        score += 5;
      }
      if (content.indexOf(word) !== -1) {
        score += 2;
      }
    }
    
    // Boost for exact phrase matches
    if (content.indexOf(queryLower) !== -1) {
      score += 10;
    }
    if (title.indexOf(queryLower) !== -1) {
      score += 20;
    }
    
    // Boost for source name match
    if (source.source_name && source.source_name.toLowerCase().indexOf(queryLower) !== -1) {
      score += 5;
    }
    
    return {
      ...source,
      score: score,
      relevance: Math.min(score / 10, 1)
    };
  });
  
  scored.sort(function(a, b) {
    return b.score - a.score;
  });
  
  return scored.slice(0, topK);
}

/**
 * Check if embeddings are available
 * @returns {boolean} Always false (GROQ only)
 */
export function embeddingsAvailable() {
  return false;
}

/**
 * Get embedding client status
 * @returns {object} Status
 */
export function getEmbeddingStatus() {
  return {
    available: false,
    mode: 'groq-only',
    provider: 'none',
    message: 'Using GROQ API only - embeddings disabled'
  };
}

// ============================================================
// EXPORTS
// ============================================================

export { embeddingClient, vectorStore };

export default {
  indexSources,
  semanticSearch,
  keywordFallbackSearch,
  embeddingsAvailable,
  getEmbeddingStatus,
  embeddingClient,
  vectorStore
};
