// lib/response/logger.js - Query Logging System

export class QueryLogger {
  constructor() {
    this.logs = [];
    this.maxLogs = 200;
    this.enabled = process.env.NODE_ENV !== 'production' || process.env.LOG_QUERIES === 'true';
  }

  log(query, response, metadata) {
    if (!this.enabled) return;

    const logEntry = {
      timestamp: new Date().toISOString(),
      query: query,
      responseLength: response?.length || 0,
      sources: metadata?.sources?.length || 0,
      model: metadata?.model || 'unknown',
      confidence: metadata?.confidence?.score || 0,
      quality: metadata?.qualityScore?.score || 0,
      responseTime: metadata?.responseTime || 0,
      intent: metadata?.intent || 'unknown',
      success: true
    };

    this.logs.unshift(logEntry);
    if (this.logs.length > this.maxLogs) {
      this.logs.pop();
    }
  }

  logError(query, error) {
    if (!this.enabled) return;

    const logEntry = {
      timestamp: new Date().toISOString(),
      query: query,
      error: error.message || 'Unknown error',
      success: false
    };

    this.logs.unshift(logEntry);
    if (this.logs.length > this.maxLogs) {
      this.logs.pop();
    }
  }

  getLogs(limit = 20) {
    return this.logs.slice(0, limit);
  }

  getStats() {
    const total = this.logs.length;
    const successful = this.logs.filter(l => l.success).length;
    const failed = total - successful;
    const avgResponseTime = total > 0
      ? Math.round(this.logs.filter(l => l.responseTime).reduce((a, b) => a + (b.responseTime || 0), 0) / total)
      : 0;

    const intentCounts = {};
    for (const log of this.logs) {
      if (log.intent) {
        intentCounts[log.intent] = (intentCounts[log.intent] || 0) + 1;
      }
    }

    return {
      total: total,
      successful: successful,
      failed: failed,
      successRate: total > 0 ? Math.round((successful / total) * 100) : 0,
      avgResponseTime: avgResponseTime,
      intentCounts: intentCounts
    };
  }

  clear() {
    this.logs = [];
  }

  setEnabled(enabled) {
    this.enabled = enabled;
  }
}

export const queryLogger = new QueryLogger();
