// api/chunking/context.js - Context-Aware Chunking

export class ContextAwareChunker {
  constructor(options = {}) {
    this.maxChunkSize = options.maxChunkSize || 1000;
    this.contextWindow = options.contextWindow || 2;
    this.minChunkSize = options.minChunkSize || 100;
  }

  /**
   * Chunk text with context awareness
   */
  chunkWithContext(text, metadata = {}) {
    if (!text || text.length < this.minChunkSize) {
      return [{
        text: text || '',
        size: text?.length || 0,
        context: { topic: 'general', entities: [] }
      }];
    }

    // 1. Identify topics and entities
    const topics = this.identifyTopics(text);
    const entities = this.extractEntities(text);

    // 2. Find context boundaries
    const boundaries = this.findContextBoundaries(text, topics, entities);

    // 3. Build context-aware chunks
    const chunks = this.buildContextChunks(text, boundaries);

    // 4. Add context metadata
    return chunks.map((chunk, index) => ({
      id: `ctx-${index}`,
      text: chunk.text,
      size: chunk.text.length,
      context: {
        topic: chunk.topic || 'general',
        entities: chunk.entities || [],
        relatedChunks: this.findRelatedChunks(chunks, index)
      },
      preview: chunk.text.substring(0, 200) + '...'
    }));
  }

  /**
   * Identify topics in text
   */
  identifyTopics(text) {
    // Simple topic extraction based on keywords
    const topics = [];
    const topicKeywords = {
      'microsoft': ['microsoft', 'azure', 'nadella', 'windows'],
      'openai': ['openai', 'chatgpt', 'gpt', 'altman'],
      'anthropic': ['anthropic', 'claude', 'amodei', 'constitutional'],
      'meta': ['meta', 'zuckerberg', 'facebook', 'instagram', 'whatsapp'],
      'ai_agents': ['agent', 'autonomous', 'tool', 'function'],
      'ai_safety': ['safety', 'alignment', 'risk', 'security'],
      'enterprise': ['enterprise', 'business', 'corporate', 'company'],
      'investment': ['investment', 'funding', 'valuation', 'billion']
    };

    const lower = text.toLowerCase();
    for (const [topic, keywords] of Object.entries(topicKeywords)) {
      for (const keyword of keywords) {
        if (lower.includes(keyword)) {
          if (!topics.includes(topic)) {
            topics.push(topic);
          }
          break;
        }
      }
    }

    return topics.length > 0 ? topics : ['general'];
  }

  /**
   * Extract entities from text
   */
  extractEntities(text) {
    const entities = [];
    const patterns = {
      company: /(Microsoft|OpenAI|Anthropic|Meta|Google|Amazon|Apple|Tesla|NVIDIA|AMD|Intel|IBM|Oracle|Salesforce|Adobe|Cisco|Dell|HP|Samsung|Sony|XAI|Grok|Claude|ChatGPT)/g,
      person: /(Satya Nadella|Sam Altman|Mark Zuckerberg|Dario Amodei|Elon Musk|Bill Gates|Tim Cook|Jeff Bezos|Sundar Pichai|Satya|Nadella|Altman|Zuckerberg|Amodei|Musk|Gates|Cook|Bezos|Pichai)/g,
      model: /(GPT-5\.6|GPT-4|Claude Sonnet|Claude Opus|Grok 4\.5|Grok 3|LLaMA|Gemini|Gemma|Mistral|Mixtral)/g
    };

    for (const [type, pattern] of Object.entries(patterns)) {
      const matches = text.match(pattern) || [];
      for (const match of matches) {
        if (!entities.includes(match)) {
          entities.push({
            name: match,
            type: type
          });
        }
      }
    }

    return entities;
  }

  /**
   * Find context boundaries
   */
  findContextBoundaries(text, topics, entities) {
    const boundaries = [];
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    let currentTopic = 'general';
    let currentEntities = [];

    for (const sentence of sentences) {
      // Check for topic changes
      const sentenceTopics = this.identifyTopics(sentence);
      const sentenceEntities = this.extractEntities(sentence);

      const topicChanged = sentenceTopics.length > 0 && 
                          !sentenceTopics.some(t => t === currentTopic);

      if (topicChanged && currentEntities.length > 0) {
        boundaries.push({
          sentences: currentEntities,
          topic: currentTopic,
          entities: currentEntities
        });
        currentEntities = [];
      }

      currentTopic = sentenceTopics.length > 0 ? sentenceTopics[0] : currentTopic;
      if (sentenceEntities.length > 0) {
        currentEntities.push(sentence);
      }
    }

    if (currentEntities.length > 0) {
      boundaries.push({
        sentences: currentEntities,
        topic: currentTopic,
        entities: currentEntities
      });
    }

    return boundaries;
  }

  /**
   * Build context-aware chunks
   */
  buildContextChunks(text, boundaries) {
    const chunks = [];
    let currentChunk = '';
    let currentTopic = 'general';
    let currentEntities = [];

    for (const boundary of boundaries) {
      const chunkText = boundary.sentences.join(' ');

      if (currentChunk.length + chunkText.length > this.maxChunkSize) {
        chunks.push({
          text: currentChunk.trim(),
          topic: currentTopic,
          entities: currentEntities
        });
        currentChunk = '';
        currentEntities = [];
      }

      currentChunk += chunkText + ' ';
      if (boundary.topic !== 'general') {
        currentTopic = boundary.topic;
      }
      currentEntities = currentEntities.concat(boundary.entities);
    }

    if (currentChunk.trim()) {
      chunks.push({
        text: currentChunk.trim(),
        topic: currentTopic,
        entities: currentEntities
      });
    }

    return chunks;
  }

  /**
   * Find related chunks
   */
  findRelatedChunks(chunks, index) {
    const related = [];
    const current = chunks[index];
    if (!current) return related;

    for (let i = 0; i < chunks.length; i++) {
      if (i === index) continue;
      const other = chunks[i];
      
      // Check if same topic or shared entities
      if (other.topic === current.topic) {
        related.push({
          index: i,
          topic: other.topic,
          preview: other.text.substring(0, 100) + '...'
        });
      }
    }

    return related.slice(0, 3);
  }
}
