// lib/analytics/metrics.js - Performance Metrics System

export class PerformanceMetrics {
  constructor() {
    this.metrics = {
      responseTimes: [],
      tokenUsage: [],
      sourceCounts: [],
      memoryUsage: [],
      startTime: Date.now()
    };
    this.maxEntries = 500;
  }

  trackResponseTime(time) {
    this.metrics.responseTimes.push(time);
    if (this.metrics.responseTimes.length > this.maxEntries) {
      this.metrics.responseTimes.shift();
    }
  }

  trackTokenUsage(tokens) {
    this.metrics.tokenUsage.push(tokens);
    if (this.metrics.tokenUsage.length > this.maxEntries) {
      this.metrics.tokenUsage.shift();
    }
  }

  trackSourceCount(count) {
    this.metrics.sourceCounts.push(count);
    if (this.metrics.sourceCounts.length > this.maxEntries) {
      this.metrics.sourceCounts.shift();
    }
  }

  trackMemory() {
    try {
      const memory = process.memoryUsage();
      this.metrics.memoryUsage.push({
        rss: Math.round(memory.rss / 1024 / 1024),
        heapTotal: Math.round(memory.heapTotal / 1024 / 1024),
        heapUsed: Math.round(memory.heapUsed / 1024 / 1024),
        external: Math.round(memory.external / 1024 / 1024)
      });
      if (this.metrics.memoryUsage.length > this.maxEntries) {
        this.metrics.memoryUsage.shift();
      }
    } catch (e) {
      // Memory tracking not available
    }
  }

  getStats() {
    const avgResponseTime = this.metrics.responseTimes.length > 0
      ? Math.round(this.metrics.responseTimes.reduce((a, b) => a + b, 0) / this.metrics.responseTimes.length)
      : 0;

    const minResponseTime = this.metrics.responseTimes.length > 0
      ? Math.min(...this.metrics.responseTimes)
      : 0;

    const maxResponseTime = this.metrics.responseTimes.length > 0
      ? Math.max(...this.metrics.responseTimes)
      : 0;

    const avgTokens = this.metrics.tokenUsage.length > 0
      ? Math.round(this.metrics.tokenUsage.reduce((a, b) => a + b, 0) / this.metrics.tokenUsage.length)
      : 0;

    const avgSources = this.metrics.sourceCounts.length > 0
      ? Math.round(this.metrics.sourceCounts.reduce((a, b) => a + b, 0) / this.metrics.sourceCounts.length)
      : 0;

    const latestMemory = this.metrics.memoryUsage.length > 0
      ? this.metrics.memoryUsage[this.metrics.memoryUsage.length - 1]
      : { rss: 0, heapTotal: 0, heapUsed: 0, external: 0 };

    return {
      avgResponseTime: avgResponseTime,
      minResponseTime: minResponseTime,
      maxResponseTime: maxResponseTime,
      avgTokens: avgTokens,
      avgSources: avgSources,
      memory: latestMemory,
      totalRequests: this.metrics.responseTimes.length,
      uptime: Math.round((Date.now() - this.metrics.startTime) / 1000 / 60 / 60)
    };
  }
}

export const performanceMetrics = new PerformanceMetrics();
