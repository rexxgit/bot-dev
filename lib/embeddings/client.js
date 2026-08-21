// lib/embeddings/client.js - GROQ-Only Version
// ============================================================
// EMBEDDING CLIENT - GROQ Only (No OpenAI)
// ============================================================

/**
 * Embedding Client - GROQ only mode
 * All embedding functions return null/empty
 */
export const embeddingClient = {
  /**
   * Embed a single text (returns null)
   */
  async embed(text) {
    console.log('Embedding skipped (GROQ-only mode)');
    return null;
  },

  /**
   * Embed a batch of texts (returns empty array)
   */
  async embedBatch(texts) {
    console.log(`Batch embedding skipped (GROQ-only mode) for ${texts.length} texts`);
    return texts.map(function() { return null; });
  },

  /**
   * Check if embeddings are available
   */
  isAvailable() {
    return false;
  },

  /**
   * Get client status
   */
  getStatus() {
    return {
      available: false,
      mode: 'groq-only',
      provider: 'none'
    };
  }
};

export default embeddingClient;
