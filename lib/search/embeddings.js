// lib/search/embeddings.js - Vector Embeddings System

export class VectorEmbeddings {
  constructor() {
    // Simple TF-IDF based embedding
    this.vocabulary = new Map();
    this.docFrequency = new Map();
    this.totalDocs = 0;
  }

  // ============================================
  // BUILD VOCABULARY FROM SOURCES
  // ============================================
  buildVocabulary(sources) {
    this.totalDocs = sources.length;
    const allWords = new Set();
    
    for (const source of sources) {
      const content = (source.content || '').toLowerCase();
      const words = this.tokenize(content);
      const uniqueWords = new Set(words);
      
      for (const word of uniqueWords) {
        allWords.add(word);
        this.docFrequency.set(word, (this.docFrequency.get(word) || 0) + 1);
      }
    }
    
    // Build vocabulary
    let index = 0;
    for (const word of allWords) {
      this.vocabulary.set(word, index);
      index++;
    }
  }

  // ============================================
  // TOKENIZE TEXT
  // ============================================
  tokenize(text) {
    return text.toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length > 2);
  }

  // ============================================
  // GET TF-IDF VECTOR
  // ============================================
  getVector(text) {
    const tokens = this.tokenize(text);
    const vector = new Array(this.vocabulary.size).fill(0);
    const termFreq = new Map();
    
    // Count term frequency
    for (const token of tokens) {
      termFreq.set(token, (termFreq.get(token) || 0) + 1);
    }
    
    // Calculate TF-IDF
    for (const [term, freq] of termFreq) {
      const termIndex = this.vocabulary.get(term);
      if (termIndex !== undefined) {
        const docFreq = this.docFrequency.get(term) || 1;
        const idf = Math.log(this.totalDocs / docFreq + 1);
        const tf = 1 + Math.log(freq);
        vector[termIndex] = tf * idf;
      }
    }
    
    // Normalize
    return this.normalize(vector);
  }

  // ============================================
  // NORMALIZE VECTOR
  // ============================================
  normalize(vector) {
    const magnitude = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
    if (magnitude === 0) return vector;
    return vector.map(val => val / magnitude);
  }

  // ============================================
  // COSINE SIMILARITY
  // ============================================
  cosineSimilarity(vec1, vec2) {
    let dotProduct = 0;
    let mag1 = 0;
    let mag2 = 0;
    
    for (let i = 0; i < vec1.length; i++) {
      dotProduct += vec1[i] * vec2[i];
      mag1 += vec1[i] * vec1[i];
      mag2 += vec2[i] * vec2[i];
    }
    
    if (mag1 === 0 || mag2 === 0) return 0;
    return dotProduct / (Math.sqrt(mag1) * Math.sqrt(mag2));
  }

  // ============================================
  // SEMANTIC SEARCH
  // ============================================
  semanticSearch(query, sources) {
    const queryVector = this.getVector(query);
    const results = [];
    
    for (const source of sources) {
      const content = source.content || '';
      const title = source.title || '';
      
      // Get content vector
      const contentVector = this.getVector(content);
      const titleVector = this.getVector(title);
      
      // Calculate similarities
      const contentSimilarity = this.cosineSimilarity(queryVector, contentVector);
      const titleSimilarity = this.cosineSimilarity(queryVector, titleVector);
      
      // Weighted score
      const score = (titleSimilarity * 0.6) + (contentSimilarity * 0.4);
      
      if (score > 0.1) {
        results.push({
          source: source,
          score: score,
          titleSimilarity: titleSimilarity,
          contentSimilarity: contentSimilarity
        });
      }
    }
    
    return results.sort((a, b) => b.score - a.score);
  }
}

// Export singleton
export const embeddings = new VectorEmbeddings();
