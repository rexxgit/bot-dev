// api/grok/index.js - Main Export
// Exports everything for Grok integration with your existing system

export { GrokClient } from './client.js';
export { GrokPromptEnhancer } from '../prompts/grok-enhanced.js';
export { GrokIntegration } from './integration.js';

// ============================================
// CREATE GROK INSTANCE
// ============================================

export function createGrokInstance(apiKey) {
  return new GrokIntegration(apiKey);
}
