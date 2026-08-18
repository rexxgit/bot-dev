// lib/embeddings/index.js - Main Export

import { embeddingClient } from './client.js';
import { vectorStore } from './vector-store.js';

export async function indexSources(sources) {
  console.log(`📊 Indexing ${sources.length} sources...`);
  
  const texts = sources.map(s => 
    `Title: ${s.title}\nContent: ${(s.content || s.chunk || '').substring(0, 2000)}`
  );
  
  const embeddings = await embeddingClient.embedBatch(texts);
  
  const metadatas = sources.map(s => ({
    title: s.title || 'Untitled',
    source_name: s.source_name || 'Unknown',
    url: s.url || '#',
    date: s.date || '',
    relevance: s.relevance || 0,
    author: s.author || 'Unknown',
    domain: s.domain || 'unknown'
  }));
  
  await vectorStore.addDocuments(texts, embeddings, metadatas);
  vectorStore.indexed = true;
  
  console.log(`✅ Indexed ${sources.length} sources`);
  return vectorStore.getStats();
}

export async function semanticSearch(query, sources, topK = 5) {
  const queryEmbedding = await embeddingClient.embed(query);
  
  if (!queryEmbedding) {
    console.warn('Failed to embed query, returning first sources');
    return sources.slice(0, topK);
  }
  
  // If vector store is empty or not indexed, use it
  if (vectorStore.documents.length === 0 || !vectorStore.indexed) {
    await indexSources(sources);
  }
  
  const results = await vectorStore.search(queryEmbedding, topK);
  
  if (results.length === 0) {
    return sources.slice(0, topK).map(s => ({
      ...s,
      semanticScore: 0
    }));
  }
  
  return results.map(r => ({
    title: r.metadata.title || 'Untitled',
    source: r.metadata.url || '#',
    source_name: r.metadata.source_name || 'Unknown',
    author: r.metadata.author || 'Unknown',
    date: r.metadata.date || '',
    chunk: r.document.substring(0, 500) + '...',
    relevance: Math.min(Math.round(r.score * 100), 100),
    score: r.score,
    semanticScore: r.score,
    metadata: r.metadata
  }));
}

export { embeddingClient, vectorStore };
