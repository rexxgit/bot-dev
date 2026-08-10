// lib/search/hybrid.js - Advanced Hybrid Search

export class AdvancedHybridSearch {
  constructor() {
    this.semanticWeight = 0.4;
    this.keywordWeight = 0.3;
    this.expandedWeight = 0.2;
    this.contextWeight = 0.1;
  }

  search(query, sources) {
    const queryLower = query.toLowerCase();
    const words = queryLower.split(/\s+/).filter(w => w.length > 2);
    
    const results = sources.map(source => {
      const content = (source.content || '').toLowerCase();
      const title = (source.title || '').toLowerCase();
      
      let score = 0;
      
      // Title matches (high weight)
      if (title.includes(queryLower)) score += 30;
      
      // Word matches in content
      for (const word of words) {
        const count = (content.match(new RegExp(word, 'g')) || []).length;
        score += count * 2;
      }
      
      // Exact phrase match
      if (content.includes(queryLower)) score += 15;
      
      // Source name match
      const sourceName = (source.source_name || '').toLowerCase();
      if (sourceName.includes(queryLower)) score += 10;
      
      return {
        source: source,
        score: score,
        hybridScore: Math.min(score / 50, 1),
        bestChunk: content.substring(0, 300)
      };
    });
    
    return results
      .filter(r => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
  }
}

export const advancedSearch = new AdvancedHybridSearch();
