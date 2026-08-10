// lib/search/hybrid.js - Advanced Hybrid Search

import { embeddings } from './embeddings.js';
import { queryExpansion } from './queryExpansion.js';
import { reranker } from './reranking.js';

export class AdvancedHybridSearch {
  constructor() {
    this.semanticWeight = 0.4;
    this.keywordWeight = 0.3;
    this.expandedWeight = 0.2;
    this.contextWeight = 0.1;
  }

  // ============================================
  // ADVANCED HYBRID SEARCH
  // ============================================
  search(query, sources) {
    // 1. Build vocabulary if needed
    if (embeddings.vocabulary.size === 0) {
      embeddings.buildVocabulary(sources);
    }
    
    // 2. Original query search (keyword)
    const keywordResults = this.keywordSearch(query, sources);
    
    // 3. Semantic search (embeddings)
    const semanticResults = embeddings.semanticSearch(query, sources);
    
    // 4. Expanded query search
    const expandedQuery = queryExpansion.getExpandedQueryString(query);
    const expandedResults = this.keywordSearch(expandedQuery, sources);
    
    // 5. Context search (using chunks)
    const contextResults = this.contextSearch(query, sources);
    
    // 6. Fusion
    const fusedResults = this.fuseResults(
      keywordResults,
      semanticResults,
      expandedResults,
      contextResults
    );
    
    // 7. Re-rank
    const rerankedResults = reranker.rerank(query, fusedResults);
    
    return rerankedResults;
  }

  // ============================================
  // KEYWORD SEARCH
  // ============================================
  keywordSearch(query, sources) {
    const queryLower = query.toLowerCase();
    const words = queryLower.split(/\s+/).filter(w => w.length > 2);
    
    return sources.map(source => {
      const content = (source.content || '').toLowerCase();
      const title = (source.title || '').toLowerCase();
      
      let score = 0;
      for (const word of words) {
        const contentCount = (content.match(new RegExp(word, 'g')) || []).length;
        const titleCount = (title.match(new RegExp(word, 'g')) || []).length;
        score += (titleCount * 3 + contentCount * 1.5);
      }
      
      // Normalize
      const maxScore = words.length * 10;
      const normalizedScore = Math.min(score / maxScore, 1);
      
      return {
        source: source,
        keywordScore: normalizedScore,
        queryType: 'keyword'
      };
    }).filter(r => r.keywordScore > 0.05);
  }

  // ============================================
  // CONTEXT SEARCH (using chunks)
  // ============================================
  contextSearch(query, sources) {
    const queryLower = query.toLowerCase();
    const results = [];
    
    for (const source of sources) {
      const content = source.content || '';
      const sentences = content.match(/[^.!?]+[.!?]+/g) || [];
      
      let bestScore = 0;
      let bestChunk = '';
      
      for (let i = 0; i < sentences.length - 2; i++) {
        const chunk = sentences.slice(i, i + 3).join(' ');
        const chunkLower = chunk.toLowerCase();
        
        let score = 0;
        const words = queryLower.split(/\s+/);
        for (const word of words) {
          if (word.length > 2 && chunkLower.includes(word)) {
            score += 1;
          }
        }
        
        if (score > bestScore) {
          bestScore = score;
          bestChunk = chunk;
        }
      }
      
      if (bestScore > 0) {
        results.push({
          source: source,
          contextScore: Math.min(bestScore / 5, 1),
          bestChunk: bestChunk,
          queryType: 'context'
        });
      }
    }
    
    return results;
  }

  // ============================================
  // FUSE RESULTS
  // ============================================
  fuseResults(keywordResults, semanticResults, expandedResults, contextResults) {
    const fused = new Map();
    
    // Add keyword results
    for (const r of keywordResults) {
      const key = r.source.url || r.source.title;
      fused.set(key, {
        source: r.source,
        keywordScore: r.keywordScore || 0,
        semanticScore: 0,
        expandedScore: 0,
        contextScore: 0,
        queryTypes: ['keyword']
      });
    }
    
    // Add semantic results
    for (const r of semanticResults) {
      const key = r.source.url || r.source.title;
      if (fused.has(key)) {
        const existing = fused.get(key);
        existing.semanticScore = r.score || 0;
        existing.queryTypes.push('semantic');
      } else {
        fused.set(key, {
          source: r.source,
          keywordScore: 0,
          semanticScore: r.score || 0,
          expandedScore: 0,
          contextScore: 0,
          queryTypes: ['semantic']
        });
      }
    }
    
    // Add expanded results
    for (const r of expandedResults) {
      const key = r.source.url || r.source.title;
      if (fused.has(key)) {
        const existing = fused.get(key);
        existing.expandedScore = r.keywordScore || 0;
        existing.queryTypes.push('expanded');
      } else {
        fused.set(key, {
          source: r.source,
          keywordScore: 0,
          semanticScore: 0,
          expandedScore: r.keywordScore || 0,
          contextScore: 0,
          queryTypes: ['expanded']
        });
      }
    }
    
    // Add context results
    for (const r of contextResults) {
      const key = r.source.url || r.source.title;
      if (fused.has(key)) {
        const existing = fused.get(key);
        existing.contextScore = r.contextScore || 0;
        existing.queryTypes.push('context');
      } else {
        fused.set(key, {
          source: r.source,
          keywordScore: 0,
          semanticScore: 0,
          expandedScore: 0,
          contextScore: r.contextScore || 0,
          queryTypes: ['context']
        });
      }
    }
    
    // Calculate final hybrid scores
    const results = Array.from(fused.values()).map(item => {
      const hybridScore = (
        item.keywordScore * this.keywordWeight +
        item.semanticScore * this.semanticWeight +
        item.expandedScore * this.expandedWeight +
        item.contextScore * this.contextWeight
      );
      
      // Bonus for multiple query types
      const methodBonus = Math.min((item.queryTypes.length - 1) * 0.05, 0.2);
      
      return {
        ...item,
        hybridScore: hybridScore + methodBonus,
        methodCount: item.queryTypes.length
      };
    });
    
    return results.sort((a, b) => b.hybridScore - a.hybridScore);
  }
}

// Export singleton
export const advancedSearch = new AdvancedHybridSearch();
