// api/chunking/semantic.js - Semantic Chunking System

export class SemanticChunker {
  constructor(options = {}) {
    this.chunkSize = options.chunkSize || 800;
    this.overlap = options.overlap || 100;
    this.minChunkSize = options.minChunkSize || 150;
    this.sentenceThreshold = options.sentenceThreshold || 3;
  }

  /**
   * Main chunking method - splits text into semantic chunks
   */
  chunk(text) {
    if (!text || text.length < this.minChunkSize) {
      return [{ text: text, size: text?.length || 0, sentences: 1 }];
    }

    // 1. Split into sentences
    const sentences = this.splitIntoSentences(text);
    
    // 2. Build semantic chunks
    const chunks = this.buildSemanticChunks(sentences);
    
    // 3. Add metadata
    return chunks.map((chunk, index) => ({
      id: `chunk-${index}`,
      text: chunk.join(' '),
      sentenceCount: chunk.length,
      charCount: chunk.join(' ').length,
      startIndex: index * this.chunkSize,
      preview: chunk.join(' ').substring(0, 200) + '...'
    }));
  }

  /**
   * Split text into sentences using multiple strategies
   */
  splitIntoSentences(text) {
    // Protect common abbreviations
    const protectedText = this.protectAbbreviations(text);
    
    // Split on sentence boundaries
    let sentences = protectedText.match(/[^.!?]+[.!?]+/g) || [protectedText];
    
    // Restore abbreviations
    sentences = sentences.map(s => this.restoreAbbreviations(s));
    
    // Clean up
    sentences = sentences
      .map(s => s.trim())
      .filter(s => s.length > 10);
    
    return sentences;
  }

  /**
   * Protect common abbreviations from being split
   */
  protectAbbreviations(text) {
    const abbreviations = ['Mr.', 'Mrs.', 'Dr.', 'Prof.', 'Sr.', 'Jr.', 
                           'vs.', 'e.g.', 'i.e.', 'etc.', 'Inc.', 'Corp.',
                           'Co.', 'Ltd.', 'St.', 'Ave.', 'Blvd.'];
    let protectedText = text;
    for (const abbr of abbreviations) {
      protectedText = protectedText.replace(
        new RegExp(`\\b${abbr}\\b`, 'g'),
        abbr.replace(/\./g, '___DOT___')
      );
    }
    return protectedText;
  }

  /**
   * Restore protected abbreviations
   */
  restoreAbbreviations(text) {
    return text.replace(/___DOT___/g, '.');
  }

  /**
   * Build semantic chunks from sentences
   */
  buildSemanticChunks(sentences) {
    const chunks = [];
    let currentChunk = [];
    let currentSize = 0;

    for (let i = 0; i < sentences.length; i++) {
      const sentence = sentences[i];
      const sentenceSize = sentence.length;

      // Check if adding this sentence would exceed chunk size
      if (currentSize + sentenceSize > this.chunkSize && currentChunk.length > 0) {
        // Save current chunk
        chunks.push([...currentChunk]);
        
        // Start new chunk with overlap
        const overlapSentences = this.getOverlapSentences(currentChunk);
        currentChunk = overlapSentences;
        currentSize = overlapSentences.reduce((sum, s) => sum + s.length, 0);
      }

      currentChunk.push(sentence);
      currentSize += sentenceSize;
    }

    // Add remaining sentences
    if (currentChunk.length > 0) {
      chunks.push([...currentChunk]);
    }

    return chunks;
  }

  /**
   * Get overlap sentences for context preservation
   */
  getOverlapSentences(sentences) {
    const overlap = [];
    let size = 0;
    const overlapSize = this.overlap;

    for (let i = sentences.length - 1; i >= 0; i--) {
      if (size + sentences[i].length > overlapSize) break;
      overlap.unshift(sentences[i]);
      size += sentences[i].length;
    }

    return overlap;
  }

  /**
   * Find the most relevant chunk for a query
   */
  findRelevantChunk(query, chunks) {
    const queryLower = query.toLowerCase();
    const queryWords = queryLower.split(/\s+/).filter(w => w.length > 2);

    const scoredChunks = chunks.map(chunk => {
      const chunkLower = chunk.text.toLowerCase();
      let score = 0;

      // Title match
      if (chunkLower.includes(queryLower)) score += 20;

      // Word matches
      for (const word of queryWords) {
        const count = (chunkLower.match(new RegExp(word, 'g')) || []).length;
        score += count * 2;
      }

      // Sentence density
      const density = queryWords.filter(w => chunkLower.includes(w)).length / queryWords.length;
      score += density * 10;

      return { ...chunk, score };
    });

    scoredChunks.sort((a, b) => b.score - a.score);
    return scoredChunks.slice(0, 3);
  }
}
