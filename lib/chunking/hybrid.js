// api/chunking/hybrid.js - Hybrid Retrieval System

export class HybridRetriever {
  constructor(options = {}) {
    this.semanticWeight = options.semanticWeight || 0.6;
    this.keywordWeight = options.keywordWeight || 0.4;
    this.rrfK = options.rrfK || 60; // Reciprocal Rank Fusion constant
    this.semanticChunker = options.semanticChunker || null;
    this.contextChunker = options.contextChunker || null;
  }

  /**
   * Main hybrid search method
   */
  hybridSearch(query, sources) {
    // 1. Chunk all sources
    const chunks = this.chunkSources(sources);
    
    // 2. Semantic search
    const semanticResults = this.semanticSearch(query, chunks);
    
    // 3. Keyword search
    const keywordResults = this.keywordSearch(query, chunks);
    
    // 4. Reciprocal Rank Fusion
    const fusedResults = this.reciprocalRankFusion(semanticResults, keywordResults);
    
    return fusedResults;
  }

  /**
   * Chunk all sources using semantic and context-aware chunking
   */
  chunkSources(sources) {
    const allChunks = [];
    
    for (const source of sources) {
      const content = source.content || '';
      
      // Use semantic chunker if available
      let chunks = [];
      if (this.semanticChunker) {
        chunks = this.semanticChunker.chunk(content);
      } else {
        // Fallback to simple chunking
        chunks = this.simpleChunk(content);
      }
      
      // Add source metadata to each chunk
      for (const chunk of chunks) {
        allChunks.push({
          ...chunk,
          source: source,
          sourceName: source.source_name || 'Unknown',
          sourceUrl: source.url || '#',
          sourceDate: source.date || '',
          sourceAuthor: source.author || 'Unknown'
        });
      }
    }
    
    return allChunks;
  }

  /**
   * Simple fallback chunking
   */
  simpleChunk(text, chunkSize = 500) {
    const chunks = [];
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    let currentChunk = '';
    
    for (const sentence of sentences) {
      if (currentChunk.length + sentence.length > chunkSize) {
        chunks.push(currentChunk.trim());
        currentChunk = '';
      }
      currentChunk += sentence + ' ';
    }
    
    if (currentChunk.trim()) {
      chunks.push(currentChunk.trim());
    }
    
    return chunks.map(text => ({
      text: text,
      charCount: text.length,
      sentenceCount: text.split(/[.!?]+/).length
    }));
  }

  /**
   * Semantic search using embedding-like similarity
   */
  semanticSearch(query, chunks) {
    const queryLower = query.toLowerCase();
    const queryWords = queryLower.split(/\s+/).filter(w => w.length > 2);
    
    const results = chunks.map(chunk => {
      const chunkLower = chunk.text.toLowerCase();
      let score = 0;
      
      // Exact phrase match
      if (chunkLower.includes(queryLower)) score += 10;
      
      // Word matches
      for (const word of queryWords) {
        const count = (chunkLower.match(new RegExp(word, 'g')) || []).length;
        score += count * 2;
      }
      
      // Semantic similarity using word overlap
      const chunkWords = chunkLower.split(/\s+/);
      const commonWords = queryWords.filter(w => chunkWords.includes(w));
      const overlapScore = commonWords.length / Math.max(queryWords.length, 1);
      score += overlapScore * 10;
      
      // Word density
      const density = commonWords.length / Math.max(chunkWords.length, 1);
      score += density * 5;
      
      return {
        chunk: chunk,
        score: score,
        queryMatch: commonWords.length
      };
    });
    
    results.sort((a, b) => b.score - a.score);
    return results.slice(0, 20);
  }

  /**
   * Keyword search (BM25-inspired)
   */
  keywordSearch(query, chunks) {
    const queryWords = query.toLowerCase().split(/\s+/).filter(w => w.length > 2);
    const avgDocLength = chunks.reduce((sum, c) => sum + c.text.length, 0) / chunks.length;
    
    const results = chunks.map(chunk => {
      const chunkLower = chunk.text.toLowerCase();
      const docLength = chunkLower.length;
      
      let score = 0;
      for (const word of queryWords) {
        const tf = (chunkLower.match(new RegExp(word, 'g')) || []).length;
        if (tf === 0) continue;
        
        // IDF
        const docFreq = chunks.filter(c => 
          c.text.toLowerCase().includes(word)
        ).length;
        const idf = Math.log((chunks.length - docFreq + 0.5) / (docFreq + 0.5) + 1);
        
        // BM25
        const k1 = 1.2;
        const b = 0.75;
        const numerator = tf * (k1 + 1);
        const denominator = tf + k1 * (1 - b + b * (docLength / avgDocLength));
        score += idf * (numerator / denominator);
      }
      
      return {
        chunk: chunk,
        score: score,
        matchedWords: queryWords.filter(w => chunkLower.includes(w)).length
      };
    });
    
    results.sort((a, b) => b.score - a.score);
    return results.slice(0, 20);
  }

  /**
   * Reciprocal Rank Fusion (RRF)
   */
  reciprocalRankFusion(results1, results2) {
    const fused = new Map();
    const k = this.rrfK;
    
    // Weighted RRF
    const addResults = (results, weight) => {
      for (let i = 0; i < results.length; i++) {
        const key = results[i].chunk.id || 
                   results[i].chunk.text.substring(0, 50) + 
                   results[i].chunk.sourceName;
        const rrfScore = 1 / (k + i + 1) * weight;
        
        if (fused.has(key)) {
          const existing = fused.get(key);
          existing.score += rrfScore;
          existing.rankSum += i + 1;
          existing.methods += 1;
        } else {
          fused.set(key, {
            chunk: results[i].chunk,
            score: rrfScore,
            rankSum: i + 1,
            methods: 1,
            semanticScore: results1.includes(results[i]) ? results[i].score : 0,
            keywordScore: results2.includes(results[i]) ? results[i].score : 0
          });
        }
      }
    };
    
    addResults(results1, this.semanticWeight);
    addResults(results2, this.keywordWeight);
    
    // Convert to array and sort
    return Array.from(fused.values())
      .map(item => ({
        ...item.chunk,
        hybridScore: item.score,
        rankSum: item.rankSum,
        methodsUsed: item.methods,
        semanticScore: item.semanticScore,
        keywordScore: item.keywordScore,
        source: item.chunk.source || {},
        sourceName: item.chunk.sourceName || 'Unknown',
        sourceUrl: item.chunk.sourceUrl || '#'
      }))
      .sort((a, b) => b.hybridScore - a.hybridScore)
      .slice(0, 10);
  }
}
