// lib/grok/index.js - Fixed

import { GrokClient } from './client.js';
import { GrokIntegration } from './integration.js';
// FIXED: Point to lib/prompts, not api/prompts
import { GrokPromptEnhancer } from '../prompts/grok-enhanced.js';

export function createGrokInstance(apiKey) {
  return new GrokIntegration(apiKey);
}

export { GrokClient, GrokIntegration, GrokPromptEnhancer };
