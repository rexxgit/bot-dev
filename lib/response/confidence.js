// lib/response/confidence.js - Fixed Version

export class ConfidenceScorer {
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
      'DeepMind': 0.90,
      'Google': 0.88,
      'Microsoft': 0.85,
      'Meta': 0.80,
      'Amazon': 0.82
    };
    this.defaultAuthority = 0.50;
  }

  calculateConfidence(sources, results, classification) {
    if (!sources || sources.length === 0) {
      return this.getLowConfidence('No sources found');
    }

    const relevanceScore = this.calculateRelevanceScore(results || []);
    const authorityScore = this.calculateAuthorityScore(sources);
    const diversityScore = this.calculateDiversityScore(sources);
    const classificationScore = classification?.confidence || 0.3;
    const countScore = Math.min(sources.length / 3, 1);

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

  calculateRelevanceScore(results) {
    if (!results || results.length === 0) return 0;
    const avgRelevance = results.reduce((sum, r) => sum + (r.relevance || 0), 0) / results.length;
    return Math.min(avgRelevance / 100, 1);
  }

  calculateAuthorityScore(sources) {
    if (!sources || sources.length === 0) return 0;
    
    const avgAuthority = sources.reduce((sum, s) => {
      const authority = this.authorityWeights[s.source_name] || this.defaultAuthority;
      return sum + authority;
    }, 0) / sources.length;
    
    return Math.min(avgAuthority, 1);
  }

  calculateDiversityScore(sources) {
    if (!sources || sources.length === 0) return 0;
    
    const uniqueDomains = new Set(sources.map(s => s.domain || s.source_name));
    const ratio = uniqueDomains.size / Math.max(sources.length, 1);
    return Math.min(ratio * 2, 1);
  }

  getConfidenceLevel(score) {
    const percentage = Math.round(score * 100);
    
    let level, emoji;
    if (percentage >= 80) {
      level = 'High';
      emoji = '🟢';
    } else if (percentage >= 50) {
      level = 'Medium';
      emoji = '🟡';
    } else {
      level = 'Low';
      emoji = '🔴';
    }
    
    return {
      score: percentage,
      level: level,
      emoji: emoji,
      breakdown: {
        relevance: 0,
        authority: 0,
        diversity: 0
      }
    };
  }

  getLowConfidence(reason) {
    return {
      score: 15,
      level: 'Low',
      emoji: '🔴',
      breakdown: { relevance: 0, authority: 0, diversity: 0 },
      reason: reason
    };
  }
}

export const confidenceScorer = new ConfidenceScorer();
