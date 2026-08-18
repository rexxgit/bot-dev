// api/data.js - In generateResponse

let grokResponse = null;
try {
  const apiKey = process.env.GROQ_API_KEY;
  if (apiKey) {
    const grokRequest = buildGrokRequest(query, context, intentInfo.primary);
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: grokRequest.messages,
        temperature: grokRequest.temperature || 0.3,
        max_tokens: grokRequest.maxTokens || 1500
      })
    });

    if (response.ok) {
      const data = await response.json();
      grokResponse = data.choices[0].message.content;
    } else {
      console.warn(`Grok API returned ${response.status}`);
      // Fallback to template response
      grokResponse = null;
    }
  }
} catch (error) {
  console.warn('Grok failed:', error.message);
  grokResponse = null;
}

// If Grok failed, use template-based response
if (!grokResponse) {
  // Use your existing template response logic
  const templateResponse = buildContextualAnswer(query, results, classification);
  // ... continue with template response
}
