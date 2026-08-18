// lib/embeddings/vector-store.js - In-Memory Vector Store

export class VectorStore {
  constructor() {
    this.documents = [];
    this.embeddings = [];
    this.metadata = [];
    this.indexed = false;
  }

  async addDocument(doc, embedding, metadata = {}) {
    if (!embedding) return false;
    
    this.documents.push(doc);
    this.embeddings.push(embedding);
    this.metadata.push(metadata);
    this.indexed = false;
    return true;
  }

  async addDocuments(docs, embeddings, metadatas = []) {
    const count = Math.min(docs.length, embeddings.length);
    for (let i = 0; i < count; i++) {
      await this.addDocument(docs[i], embeddings[i], metadatas[i] || {});
    }
    this.indexed = true;
    return this.documents.length;
  }

  async search(queryEmbedding, topK = 5) {
    if (this.embeddings.length === 0 || !queryEmbedding) {
      return [];
    }

    const similarities = this.embeddings.map((embedding, index) => ({
      index,
      score: this.cosineSimilarity(queryEmbedding, embedding),
      document: this.documents[index],
      metadata: this.metadata[index]
    }));

    similarities.sort((a, b) => b.score - a.score);
    return similarities.slice(0, topK);
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

  getStats() {
    return {
      totalDocuments: this.documents.length,
      indexed: this.indexed
    };
  }

  clear() {
    this.documents = [];
    this.embeddings = [];
    this.metadata = [];
    this.indexed = false;
  }
}

export const vectorStore = new VectorStore();
