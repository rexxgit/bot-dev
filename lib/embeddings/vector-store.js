// lib/embeddings/vector-store.js - GROQ-Only Version
// ============================================================
// VECTOR STORE - GROQ Only (No OpenAI)
// ============================================================

/**
 * Vector Store - GROQ only mode
 * Simple in-memory store without vector embeddings
 */
export const vectorStore = {
  documents: [],
  metadatas: [],
  indexed: false,

  /**
   * Add documents (stores without embeddings)
   */
  async addDocuments(texts, embeddings, metadatas) {
    // In GROQ-only mode, just store the documents
    for (var i = 0; i < texts.length; i++) {
      this.documents.push({
        text: texts[i],
        metadata: metadatas[i] || {}
      });
    }
    this.indexed = true;
    return this.documents.length;
  },

  /**
   * Search (returns empty - use keyword search instead)
   */
  async search(queryEmbedding, topK) {
    return [];
  },

  /**
   * Get statistics
   */
  getStats() {
    return {
      documentCount: this.documents.length,
      indexed: this.indexed,
      mode: 'groq-only'
    };
  },

  /**
   * Clear all documents
   */
  clear() {
    this.documents = [];
    this.metadatas = [];
    this.indexed = false;
  }
};

export default vectorStore;
