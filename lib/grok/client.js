// lib/grok/client.js - Clean Version

var CONFIG = {
  API: {
    OVH_BASE_URL: 'https://oai.endpoints.kepler.ai.cloud.ovh.net/v1',
    OVH_MODEL: 'gpt-oss-120b',
    DEFAULT_TEMPERATURE: 0.25,
    DEFAULT_MAX_TOKENS: 2500,
    TIMEOUT_MS: 30000,
    MAX_RETRIES: 2
  }
};

export var GrokClient = function(apiKey, options) {
  options = options || {};
  this.ovhBaseUrl = options.ovhBaseUrl || CONFIG.API.OVH_BASE_URL;
  this.ovhModel = options.ovhModel || CONFIG.API.OVH_MODEL;
  this.timeoutMs = options.timeoutMs || CONFIG.API.TIMEOUT_MS;
  this.maxRetries = options.maxRetries || CONFIG.API.MAX_RETRIES;
  this.requestCount = 0;
  this.successCount = 0;
  this.errorCount = 0;
};

GrokClient.prototype.generateResponse = function(promptData, options) {
  options = options || {};
  this.requestCount++;

  if (!promptData || !promptData.system || !promptData.user) {
    return Promise.resolve({ success: false, error: 'Invalid prompt data' });
  }

  var self = this;
  var request = this._buildRequest(promptData, options);
  
  return this._sendRequest(request)
    .then(function(response) {
      var processed = self._processResponse(response);
      self.successCount++;
      return processed;
    })
    .catch(function(error) {
      self.errorCount++;
      return { success: false, error: error.message };
    });
};

GrokClient.prototype._buildRequest = function(promptData, options) {
  var messages = [
    { role: 'system', content: promptData.system },
    { role: 'user', content: promptData.user }
  ];

  return {
    model: this.ovhModel,
    messages: messages,
    temperature: options.temperature || CONFIG.API.DEFAULT_TEMPERATURE,
    max_tokens: options.maxTokens || CONFIG.API.DEFAULT_MAX_TOKENS
  };
};

GrokClient.prototype._sendRequest = function(request) {
  var self = this;
  var url = this.ovhBaseUrl + '/chat/completions';

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(request)
  })
  .then(function(response) {
    if (!response.ok) {
      throw new Error('OVHcloud error: ' + response.status);
    }
    return response.json();
  });
};

GrokClient.prototype._processResponse = function(response) {
  var content = response.choices && response.choices[0] && response.choices[0].message ? 
    response.choices[0].message.content || '' : '';

  return {
    success: true,
    response: content,
    model: response.model || this.ovhModel,
    usage: response.usage || null
  };
};

export default GrokClient;
