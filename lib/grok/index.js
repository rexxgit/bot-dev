// lib/grok/index.js - Complete Working Version

import { GrokClient } from './client.js';
import { GrokIntegration } from './integration.js';

export function createGrokInstance(apiKey) {
  return new GrokIntegration(apiKey);
}

export { GrokClient, GrokIntegration };

export default {
  createGrokInstance,
  GrokClient,
  GrokIntegration
};
