// lib/embeddings/client.js - Vector Embedding Client

export class EmbeddingClient {
  constructor() {
    this.model = 'text-embedding-3-small';
    this.dimension = 1536;
    this.cache = new Map();
    this.maxCacheSize = 500;
  }

  async embed(text) {
    // Check cache
    const cacheKey = text.substring(0, 100) + text.length;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const apiKey = process.env.OPENAI_API_KEY;
      if (!apiKey) {
        console.warn('OPENAI_API_KEY not set, using fallback');
        return this.fallbackEmbed(text);
      }

      const response = await fetch('https://api.openai.com/v1/embeddings', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: this.model,
          input: text.substring(0, 8000) // Limit text length
        })
      });

      if (!response.ok) {
        console.warn(`Embedding API error: ${response.status}`);
        return this.fallbackEmbed(text);
      }

      const data = await response.json();
      const embedding = data.data?.[0]?.embedding || this.fallbackEmbed(text);
      
      // Cache the result
      this.cache.set(cacheKey, embedding);
      if (this.cache.size > this.maxCacheSize) {
        const firstKey = this.cache.keys().next().value;
        this.cache.delete(firstKey);
      }

      return embedding;
    } catch (error) {
      console.warn('Embedding error:', error.message);
      return this.fallbackEmbed(text);
    }
  }

  async embedBatch(texts) {
    const results = [];
    for (const text of texts) {
      const embedding = await this.embed(text);
      results.push(embedding);
    }
    return results;
  }

  // Fallback: simple TF-IDF style embedding for when API is unavailable
  fallbackEmbed(text) {
    const words = text.toLowerCase().split(/\s+/).filter(w => w.length > 2);
    const uniqueWords = [...new Set(words)].slice(0, 100);
    const embedding = new Array(this.dimension).fill(0);
    
    for (let i = 0; i < uniqueWords.length && i < embedding.length; i++) {
      const hash = this.hashString(uniqueWords[i]);
      embedding[hash % embedding.length] = 0.1 + (i / uniqueWords.length) * 0.9;
    }
    
    return embedding;
  }

  hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  }

  cosineSimilarity(vecA, vecB) {
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;
    
    for (let i = 0; i < vecA.length; i++) {
      dotProduct += vecA[i] * vecB[i];
      normA += vecA[i] * vecA[i];
      normB += vecB[i] * vecB[i];
    }
    
    if (normA === 0 || normB === 0) return 0;
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  }
}

export const embeddingClient = new EmbeddingClient();
