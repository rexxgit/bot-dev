// api/response/cache.js - Response Cache System

export class ResponseCache {
  constructor(options = {}) {
    this.cache = new Map();
    this.ttl = options.ttl || 3600000; // 1 hour default
    this.maxSize = options.maxSize || 100;
    this.hits = 0;
    this.misses = 0;
  }

  // ============================================
  // GET CACHED RESPONSE
  // ============================================
  get(query) {
    const key = this.getKey(query);
    if (this.cache.has(key)) {
      const entry = this.cache.get(key);
      if (Date.now() - entry.timestamp < this.ttl) {
        this.hits++;
        return {
          ...entry.data,
          cached: true,
          cacheAge: Math.round((Date.now() - entry.timestamp) / 1000) + 's'
        };
      }
      this.cache.delete(key);
    }
    this.misses++;
    return null;
  }

  // ============================================
  // SET CACHED RESPONSE
  // ============================================
  set(query, response) {
    const key = this.getKey(query);
    if (this.cache.size >= this.maxSize) {
      this.evictOldest();
    }
    this.cache.set(key, {
      data: response,
      timestamp: Date.now()
    });
  }

  // ============================================
  // GET CACHE KEY
  // ============================================
  getKey(query) {
    return query.toLowerCase().trim().replace(/\s+/g, '_');
  }

  // ============================================
  // EVICT OLDEST
  // ============================================
  evictOldest() {
    let oldest = null;
    let oldestTime = Infinity;
    for (const [key, entry] of this.cache) {
      if (entry.timestamp < oldestTime) {
        oldestTime = entry.timestamp;
        oldest = key;
      }
    }
    if (oldest) {
      this.cache.delete(oldest);
    }
  }

  // ============================================
  // GET STATS
  // ============================================
  getStats() {
    const total = this.hits + this.misses;
    return {
      size: this.cache.size,
      hits: this.hits,
      misses: this.misses,
      hitRate: total > 0 ? Math.round((this.hits / total) * 100) + '%' : '0%',
      ttl: this.ttl / 1000 + 's'
    };
  }

  // ============================================
  // CLEAR CACHE
  // ============================================
  clear() {
    this.cache.clear();
    this.hits = 0;
    this.misses = 0;
  }
}

// Export singleton
export const responseCache = new ResponseCache();
