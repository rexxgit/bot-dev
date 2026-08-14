// lib/response/feedback.js - User Feedback System

export class FeedbackSystem {
  constructor() {
    this.feedback = new Map();
    this.maxEntries = 1000;
  }

  addFeedback(queryId, feedback) {
    if (this.feedback.size >= this.maxEntries) {
      const oldestKey = this.feedback.keys().next().value;
      this.feedback.delete(oldestKey);
    }

    this.feedback.set(queryId, {
      ...feedback,
      timestamp: new Date().toISOString()
    });

    return { success: true, message: 'Feedback recorded' };
  }

  getFeedback(queryId) {
    return this.feedback.get(queryId) || null;
  }

  getStats() {
    const total = this.feedback.size;
    const positive = Array.from(this.feedback.values()).filter(f => f.rating === 'positive').length;
    const negative = Array.from(this.feedback.values()).filter(f => f.rating === 'negative').length;
    
    return {
      total,
      positive,
      negative,
      positiveRate: total > 0 ? Math.round((positive / total) * 100) : 0
    };
  }

  clear() {
    this.feedback.clear();
    return { success: true, message: 'Feedback cleared' };
  }
}

export const feedbackSystem = new FeedbackSystem();
