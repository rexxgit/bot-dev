// lib/analytics/tracker.js - Analytics Tracking System

export class AnalyticsTracker {
  constructor() {
    this.metrics = {
      totalQueries: 0,
      uniqueUsers: new Set(),
      queryTypes: {},
      responseTimes: [],
      confidenceScores: [],
      qualityScores: [],
      sourceUsage: {},
      errors: 0,
      cacheHits: 0,
      cacheMisses: 0,
      startTime: Date.now()
    };
    this.maxEntries = 1000;
    this.sessionId = this.generateSessionId();
  }

  generateSessionId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
  }

  trackQuery(query, metadata) {
    this.metrics.totalQueries++;
    
    // Track query type
    const queryType = metadata?.intent || 'unknown';
    this.metrics.queryTypes[queryType] = (this.metrics.queryTypes[queryType] || 0) + 1;
    
    // Track response time
    if (metadata?.responseTime) {
      this.metrics.responseTimes.push(metadata.responseTime);
      if (this.metrics.responseTimes.length > this.maxEntries) {
        this.metrics.responseTimes.shift();
      }
    }
    
    // Track confidence
    if (metadata?.confidence?.score !== undefined) {
      this.metrics.confidenceScores.push(metadata.confidence.score);
      if (this.metrics.confidenceScores.length > this.maxEntries) {
        this.metrics.confidenceScores.shift();
      }
    }
    
    // Track quality
    if (metadata?.qualityScore?.score !== undefined) {
      this.metrics.qualityScores.push(metadata.qualityScore.score);
      if (this.metrics.qualityScores.length > this.maxEntries) {
        this.metrics.qualityScores.shift();
      }
    }
    
    // Track source usage
    if (metadata?.sources) {
      for (const source of metadata.sources) {
        const name = source.source_name || 'Unknown';
        this.metrics.sourceUsage[name] = (this.metrics.sourceUsage[name] || 0) + 1;
      }
    }

    // Track cache
    if (metadata?.cached) {
      this.metrics.cacheHits++;
    } else {
      this.metrics.cacheMisses++;
    }

    // Update unique users
    if (metadata?.userId) {
      this.metrics.uniqueUsers.add(metadata.userId);
    }
  }

  trackError(error) {
    this.metrics.errors++;
  }

  getStats() {
    const avgResponseTime = this.metrics.responseTimes.length > 0 
      ? Math.round(this.metrics.responseTimes.reduce((a, b) => a + b, 0) / this.metrics.responseTimes.length)
      : 0;
    
    const avgConfidence = this.metrics.confidenceScores.length > 0
      ? Math.round(this.metrics.confidenceScores.reduce((a, b) => a + b, 0) / this.metrics.confidenceScores.length)
      : 0;
    
    const avgQuality = this.metrics.qualityScores.length > 0
      ? Math.round(this.metrics.qualityScores.reduce((a, b) => a + b, 0) / this.metrics.qualityScores.length)
      : 0;

    const topSources = Object.entries(this.metrics.sourceUsage)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }));

    const totalCache = this.metrics.cacheHits + this.metrics.cacheMisses;
    const cacheHitRate = totalCache > 0 
      ? Math.round((this.metrics.cacheHits / totalCache) * 100)
      : 0;

    return {
      totalQueries: this.metrics.totalQueries,
      uniqueUsers: this.metrics.uniqueUsers.size,
      queryTypes: this.metrics.queryTypes,
      avgResponseTime: avgResponseTime,
      avgConfidence: avgConfidence,
      avgQuality: avgQuality,
      errors: this.metrics.errors,
      cacheHitRate: cacheHitRate,
      topSources: topSources,
      uptime: Math.round((Date.now() - this.metrics.startTime) / 1000 / 60 / 60),
      sessionId: this.sessionId
    };
  }

  reset() {
    this.metrics.totalQueries = 0;
    this.metrics.uniqueUsers = new Set();
    this.metrics.queryTypes = {};
    this.metrics.responseTimes = [];
    this.metrics.confidenceScores = [];
    this.metrics.qualityScores = [];
    this.metrics.sourceUsage = {};
    this.metrics.errors = 0;
    this.metrics.cacheHits = 0;
    this.metrics.cacheMisses = 0;
    this.metrics.startTime = Date.now();
    this.sessionId = this.generateSessionId();
  }
}

export const analytics = new AnalyticsTracker();
