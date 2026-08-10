// api/response/intent.js - Intent Detection System

export class IntentDetector {
  constructor() {
    this.intentPatterns = {
      // Informational: User wants to know facts
      informational: {
        keywords: ['what', 'when', 'where', 'who', 'which', 'is', 'are', 'was', 'were', 'did', 'does', 'how much', 'how many'],
        weight: 1.0,
        description: 'User seeks factual information'
      },
      
      // Comparative: User wants to compare options
      comparative: {
        keywords: ['better', 'best', 'worst', 'vs', 'versus', 'compared to', 'difference', 'similar', 'like', 'rather than'],
        weight: 1.5,
        description: 'User wants to compare options'
      },
      
      // Analytical: User wants deep analysis
      analytical: {
        keywords: ['analyze', 'analysis', 'why', 'how does', 'explain', 'reasons', 'causes', 'impact', 'effect', 'implications'],
        weight: 1.5,
        description: 'User wants in-depth analysis'
      },
      
      // Exploratory: User wants to explore possibilities
      exploratory: {
        keywords: ['what if', 'could', 'would', 'might', 'imagine', 'potential', 'future', 'trend', 'predict', 'forecast'],
        weight: 1.2,
        description: 'User wants to explore possibilities'
      },
      
      // Action-Oriented: User wants actionable advice
      action: {
        keywords: ['how to', 'steps', 'guide', 'tutorial', 'advice', 'recommend', 'suggest', 'strategy', 'plan', 'implementation'],
        weight: 1.3,
        description: 'User wants actionable guidance'
      },
      
      // Summarization: User wants a summary
      summarization: {
        keywords: ['summarize', 'summary', 'brief', 'overview', 'key points', 'main ideas', 'tl;dr', 'quick', 'essentials'],
        weight: 1.4,
        description: 'User wants a concise summary'
      }
    };
  }

  // ============================================
  // DETECT INTENT
  // ============================================
  detectIntent(query) {
    const lower = query.toLowerCase();
    let scores = {};
    let totalScore = 0;
    
    for (const [intent, pattern] of Object.entries(this.intentPatterns)) {
      let score = 0;
      for (const keyword of pattern.keywords) {
        if (lower.includes(keyword)) {
          score += pattern.weight;
        }
      }
      // Normalize by query length (penalize short matches)
      const wordCount = lower.split(/\s+/).length;
      const normalizedScore = score / Math.max(wordCount / 5, 1);
      scores[intent] = Math.min(normalizedScore, 5);
      totalScore += scores[intent];
    }
    
    // Find primary intent
    let primaryIntent = 'informational';
    let highestScore = 0;
    for (const [intent, score] of Object.entries(scores)) {
      if (score > highestScore) {
        highestScore = score;
        primaryIntent = intent;
      }
    }
    
    // Calculate confidence
    const confidence = totalScore > 0 ? Math.min(highestScore / 3, 1) : 0.3;
    
    // Get all intents with scores
    const allIntents = Object.fromEntries(
      Object.entries(scores).map(([k, v]) => [k, Math.round(v * 100) / 100])
    );
    
    return {
      primary: primaryIntent,
      confidence: Math.round(confidence * 100) / 100,
      scores: allIntents,
      description: this.intentPatterns[primaryIntent]?.description || 'General information',
      detected_by: Object.keys(scores).filter(k => scores[k] > 0.5)
    };
  }

  // ============================================
  // GET INTENT FORMAT PREFERENCE
  // ============================================
  getFormatPreference(intent) {
    const formats = {
      informational: 'bullet',
      comparative: 'table',
      analytical: 'structured',
      exploratory: 'scenario',
      action: 'steps',
      summarization: 'concise'
    };
    return formats[intent] || 'bullet';
  }

  // ============================================
  // GET RESPONSE STRUCTURE FOR INTENT
  // ============================================
  getResponseStructure(intent) {
    const structures = {
      informational: {
        sections: ['Summary', 'Key Facts', 'Sources'],
        style: 'concise',
        maxLength: 500
      },
      comparative: {
        sections: ['Overview', 'Comparison Matrix', 'Recommendations', 'Sources'],
        style: 'detailed',
        maxLength: 800
      },
      analytical: {
        sections: ['Executive Summary', 'Analysis', 'Key Insights', 'Implications', 'Sources'],
        style: 'detailed',
        maxLength: 1000
      },
      exploratory: {
        sections: ['Context', 'Possibilities', 'Scenarios', 'Next Steps', 'Sources'],
        style: 'creative',
        maxLength: 800
      },
      action: {
        sections: ['Overview', 'Steps', 'Best Practices', 'Resources', 'Sources'],
        style: 'actionable',
        maxLength: 700
      },
      summarization: {
        sections: ['TL;DR', 'Key Points', 'Source'],
        style: 'concise',
        maxLength: 300
      }
    };
    return structures[intent] || structures.informational;
  }
}

// Export singleton
export const intentDetector = new IntentDetector();
