// lib/search/reranking.js - Re-ranking System

export class Reranker {
  constructor() {
    this.authorityWeights = {
      'TechCrunch': 0.85,
      'VentureBeat': 0.80,
      'Raulji Technologies': 0.70,
      'Gumloop': 0.65,
      'Pickaxe': 0.65,
      'Synthesia': 0.60,
      'Red River Communications': 0.55,
      'Anthropic': 0.92,
      'OpenAI': 0.95,
      'DeepMind': 0.90
    };
    this.defaultAuthority = 0.50;
  }

  // ============================================
  // RE-RANK RESULTS
  // ============================================
  rerank(query, results) {
    const queryLower = query.toLowerCase();
    const queryWords = queryLower.split(/\s+/).filter(w => w.length > 2);
    
    return results.map(result => {
      // 1. Content relevance
      const contentRelevance = this.calculateContentRelevance(queryWords, result);
      
      // 2. Title relevance
      const titleRelevance = this.calculateTitleRelevance(queryLower, result);
      
      // 3. Authority score
      const authorityScore = this.getAuthorityScore(result);
      
      // 4. Freshness score
      const freshnessScore = this.getFreshnessScore(result);
      
      // 5. Diversity score (unique content)
      const diversityScore = this.getDiversityScore(result, results);
      
      // Weighted total
      const finalScore = (
        contentRelevance * 0.30 +
        titleRelevance * 0.20 +
        authorityScore * 0.20 +
        freshnessScore * 0.15 +
        diversityScore * 0.15
      );
      
      return {
        ...result,
        finalScore: finalScore,
        breakdown: {
          contentRelevance: Math.round(contentRelevance * 100),
          titleRelevance: Math.round(titleRelevance * 100),
          authority: Math.round(authorityScore * 100),
          freshness: Math.round(freshnessScore * 100),
          diversity: Math.round(diversityScore * 100)
        }
      };
    }).sort((a, b) => b.finalScore - a.finalScore);
  }

  // ============================================
  // CALCULATE CONTENT RELEVANCE
  // ============================================
  calculateContentRelevance(queryWords, result) {
    const content = (result.source?.content || '').toLowerCase();
    let matchCount = 0;
    let totalWeight = 0;
    
    for (const word of queryWords) {
      if (content.includes(word)) {
        matchCount++;
        totalWeight += 1 / (1 + Math.abs(content.indexOf(word) / Math.max(content.length, 1)));
      }
    }
    
    return Math.min(matchCount / Math.max(queryWords.length, 1) * 0.8 + totalWeight * 0.2, 1);
  }

  // ============================================
  // CALCULATE TITLE RELEVANCE
  // ============================================
  calculateTitleRelevance(queryLower, result) {
    const title = (result.source?.title || '').toLowerCase();
    if (title.includes(queryLower)) {
      return 1.0;
    }
    const words = queryLower.split(/\s+/);
    let matches = 0;
    for (const word of words) {
      if (word.length > 2 && title.includes(word)) {
        matches++;
      }
    }
    return Math.min(matches / Math.max(words.length, 1) * 1.2, 1);
  }

  // ============================================
  // GET AUTHORITY SCORE
  // ============================================
  getAuthorityScore(result) {
    const sourceName = result.source?.source_name || '';
    return this.authorityWeights[sourceName] || this.defaultAuthority;
  }

  // ============================================
  // GET FRESHNESS SCORE
  // ============================================
  getFreshnessScore(result) {
    const dateStr = result.source?.date || '';
    if (!dateStr) return 0.5;
    
    try {
      const date = new Date(dateStr);
      const now = new Date();
      const diffDays = (now - date) / (1000 * 60 * 60 * 24);
      return Math.max(0, 1 - diffDays / 365);
    } catch {
      return 0.5;
    }
  }

  // ============================================
  // GET DIVERSITY SCORE
  // ============================================
  getDiversityScore(result, allResults) {
    const currentTitle = result.source?.title || '';
    const similar = allResults.filter(r => {
      const title = r.source?.title || '';
      return this.calculateTitleRelevance(currentTitle, { source: { title: title } }) > 0.5;
    });
    return Math.min(1 / (similar.length + 1), 1);
  }
}

// Export singleton
export const reranker = new Reranker();
