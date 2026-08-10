// lib/chunking/semantic.js

export function semanticChunk(text, options = {}) {
  const chunkSize = options.chunkSize || 800;
  const overlap = options.overlap || 100;
  const minChunkSize = options.minChunkSize || 150;
  
  if (!text || text.length < minChunkSize) {
    return [{ text: text || '', size: text?.length || 0, sentences: 1 }];
  }

  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  const chunks = [];
  let currentChunk = [];
  let currentSize = 0;

  for (const sentence of sentences) {
    const sentenceSize = sentence.length;

    if (currentSize + sentenceSize > chunkSize && currentChunk.length > 0) {
      chunks.push(currentChunk.join(' '));
      const overlapSentences = currentChunk.slice(-Math.ceil(overlap / 50));
      currentChunk = overlapSentences;
      currentSize = overlapSentences.reduce((sum, s) => sum + s.length, 0);
    }

    currentChunk.push(sentence);
    currentSize += sentenceSize;
  }

  if (currentChunk.length > 0) {
    chunks.push(currentChunk.join(' '));
  }

  return chunks.map((chunk, index) => ({
    id: `chunk-${index}`,
    text: chunk,
    sentenceCount: chunk.split(/[.!?]+/).length,
    charCount: chunk.length,
    preview: chunk.substring(0, 200) + '...'
  }));
}

export function contextAwareChunk(text, options = {}) {
  const maxChunkSize = options.maxChunkSize || 1000;
  
  if (!text || text.length < 100) {
    return [{ text: text || '', topic: 'general', entities: [] }];
  }

  const topics = identifyTopics(text);
  const entities = extractEntities(text);
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  
  const chunks = [];
  let currentChunk = '';
  let currentTopic = topics.length > 0 ? topics[0] : 'general';
  let currentEntities = [];

  for (const sentence of sentences) {
    const sentenceTopics = identifyTopics(sentence);
    const sentenceEntities = extractEntities(sentence);
    
    if (currentChunk.length + sentence.length > maxChunkSize && currentChunk.length > 50) {
      chunks.push({
        text: currentChunk.trim(),
        topic: currentTopic,
        entities: [...currentEntities]
      });
      currentChunk = '';
      currentEntities = [];
    }
    
    currentChunk += sentence + ' ';
    if (sentenceTopics.length > 0) {
      currentTopic = sentenceTopics[0];
    }
    currentEntities = [...currentEntities, ...sentenceEntities];
  }

  if (currentChunk.trim()) {
    chunks.push({
      text: currentChunk.trim(),
      topic: currentTopic,
      entities: [...new Set(currentEntities)]
    });
  }

  return chunks;
}

function identifyTopics(text) {
  const topics = [];
  const topicKeywords = {
    'microsoft': ['microsoft', 'azure', 'nadella', 'windows'],
    'openai': ['openai', 'chatgpt', 'gpt', 'altman'],
    'anthropic': ['anthropic', 'claude', 'amodei', 'constitutional'],
    'meta': ['meta', 'zuckerberg', 'facebook', 'whatsapp'],
    'ai_agents': ['agent', 'autonomous', 'tool'],
    'ai_safety': ['safety', 'alignment', 'security'],
    'enterprise': ['enterprise', 'business', 'corporate'],
    'investment': ['investment', 'funding', 'billion']
  };

  const lower = text.toLowerCase();
  for (const [topic, keywords] of Object.entries(topicKeywords)) {
    for (const keyword of keywords) {
      if (lower.includes(keyword)) {
        if (!topics.includes(topic)) topics.push(topic);
        break;
      }
    }
  }
  return topics.length > 0 ? topics : ['general'];
}

function extractEntities(text) {
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
        entities.push(match);
      }
    }
  }
  return entities;
}
