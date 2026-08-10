// lib/search/queryExpansion.js - Query Expansion System

export class QueryExpansion {
  constructor() {
    this.synonyms = this.buildSynonymMap();
    this.relatedTerms = this.buildRelatedTerms();
  }

  // ============================================
  // BUILD SYNONYM MAP
  // ============================================
  buildSynonymMap() {
    return {
      // AI/ML terms
      'ai': ['artificial intelligence', 'machine learning', 'ml', 'deep learning'],
      'ml': ['machine learning', 'ai', 'artificial intelligence'],
      'model': ['algorithm', 'neural network', 'llm', 'foundation model'],
      'llm': ['large language model', 'language model', 'foundation model'],
      
      // Company terms
      'microsoft': ['msft', 'microsoft corp', 'azure', 'nadella'],
      'openai': ['open ai', 'gpt', 'chatgpt', 'altman'],
      'anthropic': ['claude', 'amodei', 'constitutional ai'],
      'meta': ['facebook', 'zuckerberg', 'instagram', 'whatsapp'],
      
      // Technology terms
      'agent': ['ai agent', 'autonomous agent', 'intelligent agent', 'assistant'],
      'security': ['safety', 'cybersecurity', 'protection', 'vulnerability'],
      'enterprise': ['business', 'corporate', 'organization', 'company'],
      'investment': ['funding', 'valuation', 'stake', 'equity'],
      
      // Action terms
      'compete': ['rivalry', 'competition', 'competitive', 'competitor'],
      'invest': ['investment', 'funding', 'capital', 'stake'],
      'develop': ['development', 'build', 'create', 'innovate']
    };
  }

  // ============================================
  // BUILD RELATED TERMS
  // ============================================
  buildRelatedTerms() {
    return {
      'microsoft': ['azure', 'windows', 'office', 'cloud', 'enterprise'],
      'openai': ['gpt', 'chatgpt', 'research', 'frontier', 'agi'],
      'anthropic': ['claude', 'constitutional', 'safety', 'responsible'],
      'meta': ['facebook', 'whatsapp', 'instagram', 'social media'],
      'ai': ['machine learning', 'deep learning', 'neural networks', 'automation'],
      'agent': ['autonomous', 'tool', 'function', 'assistant'],
      'security': ['breach', 'hack', 'vulnerability', 'threat', 'attack'],
      'enterprise': ['business', 'corporate', 'enterprise software', 'saas']
    };
  }

  // ============================================
  // EXPAND QUERY
  // ============================================
  expandQuery(query) {
    const tokens = query.toLowerCase().split(/\s+/);
    const expanded = new Set();
    const weights = new Map();
    
    // Add original tokens with high weight
    for (const token of tokens) {
      if (token.length > 2) {
        expanded.add(token);
        weights.set(token, 1.0);
      }
    }
    
    // Add synonyms
    for (const token of tokens) {
      const synonyms = this.synonyms[token];
      if (synonyms) {
        for (const synonym of synonyms) {
          expanded.add(synonym);
          weights.set(synonym, 0.7);
        }
      }
    }
    
    // Add related terms
    for (const token of tokens) {
      const related = this.relatedTerms[token];
      if (related) {
        for (const term of related) {
          expanded.add(term);
          weights.set(term, 0.5);
        }
      }
    }
    
    // Add bigrams
    for (let i = 0; i < tokens.length - 1; i++) {
      const bigram = tokens[i] + ' ' + tokens[i + 1];
      expanded.add(bigram);
      weights.set(bigram, 0.6);
    }
    
    return {
      terms: Array.from(expanded),
      weights: weights
    };
  }

  // ============================================
  // GET EXPANDED QUERY STRING
  // ============================================
  getExpandedQueryString(query) {
    const result = this.expandQuery(query);
    // Weighted terms: high weight terms first
    const sortedTerms = result.terms.sort((a, b) => 
      (result.weights.get(b) || 0) - (result.weights.get(a) || 0)
    );
    return sortedTerms.join(' ');
  }
}

// Export singleton
export const queryExpansion = new QueryExpansion();
