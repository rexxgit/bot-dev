// api/response/confidence.js - Confidence Scoring System

export class ConfidenceScorer {
  constructor() {
    this.authorityWeights = {
      'TechCrunch': 0.85,
      'VentureBeat': 0.80,
      'OpenAI Blog': 0.95,
      'Anthropic': 0.92,
      'DeepMind': 0.90,
      'Raulji Technologies': 0.70,
      'Gumloop': 0.65,
      'Pickaxe': 0.65,
      'Synthesia': 0.60,
      'Red River Communications': 0.55,
      'VentureBeat': 0.80,
      'TechCrunch': 0.85
    };
    this.defaultAuthority = 0.50;
  }

  // ============================================
  // CALCULATE CONFIDENCE
  // ============================================
  calculateConfidence(sources, results, classification) {
    if (!sources || sources.length === 0) {
      return this.getLowConfidence('No sources found');
    }

    // 1. Source Relevance Score
    const relevanceScore = this.calculateRelevanceScore(results);
    
    // 2. Source Authority Score
    const authorityScore = this.calculateAuthorityScore(sources);
    
    // 3. Source Diversity Score
    const diversityScore = this.calculateDiversityScore(sources);
    
    // 4. Query Classification Confidence
    const classificationScore = classification?.confidence || 0.3;
    
    // 5. Source Count Score
    const countScore = Math.min(sources.length / 3, 1);
    
    // Weighted total
    const weights = {
      relevance: 0.35,
      authority: 0.25,
      diversity: 0.15,
      classification: 0.15,
      count: 0.10
    };
    
    const totalScore = 
      relevanceScore * weights.relevance +
      authorityScore * weights.authority +
      diversityScore * weights.diversity +
      classificationScore * weights.classification +
      countScore * weights.count;
    
    return this.getConfidenceLevel(totalScore);
  }

  // ============================================
  // CALCULATE RELEVANCE SCORE
  // ============================================
  calculateRelevanceScore(results) {
    if (!results || results.length === 0) return 0;
    
    const avgRelevance = results.reduce((sum, r) => sum + (r.relevance || 0), 0) / results.length;
    return Math.min(avgRelevance / 100, 1);
  }

  // ============================================
  // CALCULATE AUTHORITY SCORE
  // ============================================
  calculateAuthorityScore(sources) {
    if (!sources || sources.length === 0) return 0;
    
    const avgAuthority = sources.reduce((sum, s) => {
      const authority = this.authorityWeights[s.source_name] || this.defaultAuthority;
      return sum + authority;
    }, 0) / sources.length;
    
    return Math.min(avgAuthority, 1);
  }

  // ============================================
  // CALCULATE DIVERSITY SCORE
  // ============================================
  calculateDiversityScore(sources) {
    if (!sources || sources.length === 0) return 0;
    
    const uniqueDomains = new Set(sources.map(s => s.domain || s.source_name));
    const ratio = uniqueDomains.size / Math.max(sources.length, 1);
    return Math.min(ratio * 2, 1); // More domains = higher diversity
  }

  // ============================================
  // GET CONFIDENCE LEVEL
  // ============================================
  getConfidenceLevel(score) {
    const percentage = Math.round(score * 100);
    
    let level, emoji, color;
    if (percentage >= 80) {
      level = 'High';
      emoji = '🟢';
      color = '#22C55E';
    } else if (percentage >= 50) {
      level = 'Medium';
      emoji = '🟡';
      color = '#EAB308';
    } else {
      level = 'Low';
      emoji = '🔴';
      color = '#EF4444';
    }
    
    return {
      score: percentage,
      level: level,
      emoji: emoji,
      color: color,
      breakdown: {
        relevance: Math.round(this.calculateRelevanceScore(sources) * 100),
        authority: Math.round(this.calculateAuthorityScore(sources) * 100),
        diversity: Math.round(this.calculateDiversityScore(sources) * 100)
      }
    };
  }

  // ============================================
  // GET LOW CONFIDENCE
  // ============================================
  getLowConfidence(reason) {
    return {
      score: 15,
      level: 'Low',
      emoji: '🔴',
      color: '#EF4444',
      breakdown: { relevance: 0, authority: 0, diversity: 0 },
      reason: reason
    };
  }
}

// Export singleton
export const confidenceScorer = new ConfidenceScorer();
