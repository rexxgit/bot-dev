// lib/grok/client.js - Complete Working Version

export class GrokClient {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.groq.com/openai/v1/chat/completions';
    this.model = 'llama-3.3-70b-versatile';
  }

  async generateResponse(promptData) {
    try {
      const messages = [
        {
          role: 'system',
          content: promptData.system
        },
        {
          role: 'user',
          content: promptData.user
        }
      ];

      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: this.model,
          messages: messages,
          temperature: promptData.temperature || 0.3,
          max_tokens: promptData.maxTokens || 1500,
          top_p: promptData.topP || 0.95
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Grok API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      
      return {
        success: true,
        response: data.choices[0].message.content,
        usage: data.usage,
        model: data.model
      };

    } catch (error) {
      console.error('Grok API error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

// Default export for compatibility
export default GrokClient;
