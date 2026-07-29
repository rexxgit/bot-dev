// api/auth.js - Authentication & Authorization
export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-API-Key');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // ============================================
    // API KEY AUTHENTICATION
    // ============================================
    const apiKey = req.headers['x-api-key'];
    const validKeys = process.env.API_KEYS ? process.env.API_KEYS.split(',') : [];

    // For development, allow requests without key (remove in production)
    const isDevelopment = process.env.NODE_ENV === 'development';

    if (!apiKey && !isDevelopment) {
        return res.status(401).json({
            error: 'Unauthorized',
            message: 'API key is required',
            documentation: 'Include X-API-Key header in your request'
        });
    }

    if (apiKey && !validKeys.includes(apiKey) && !isDevelopment) {
        return res.status(403).json({
            error: 'Forbidden',
            message: 'Invalid API key'
        });
    }

    // ============================================
    // RATE LIMITING PER USER (Enhanced)
    // ============================================
    const userKey = apiKey || 'anonymous';
    const rateLimiters = new Map();

    class TokenBucket {
        constructor(capacity = 100, refillRate = 10, refillInterval = 60000) {
            this.capacity = capacity;
            this.tokens = capacity;
            this.refillRate = refillRate;
            this.refillInterval = refillInterval;
            this.lastRefill = Date.now();
        }

        refill() {
            const now = Date.now();
            const timePassed = now - this.lastRefill;
            const refillAmount = Math.floor(timePassed / this.refillInterval) * this.refillRate;
            this.tokens = Math.min(this.capacity, this.tokens + refillAmount);
            this.lastRefill = now;
        }

        consume(tokens = 1) {
            this.refill();
            if (this.tokens >= tokens) {
                this.tokens -= tokens;
                return true;
            }
            return false;
        }
    }

    function getRateLimiter(key) {
        if (!rateLimiters.has(key)) {
            rateLimiters.set(key, new TokenBucket(100, 10, 60000));
        }
        return rateLimiters.get(key);
    }

    const limiter = getRateLimiter(userKey);
    if (!limiter.consume(1)) {
        return res.status(429).json({
            error: 'Rate limit exceeded',
            message: 'Too many requests. Please wait a moment.',
            limit: limiter.capacity,
            retryAfter: Math.ceil((Date.now() - limiter.lastRefill) / 1000)
        });
    }

    // ============================================
    // USER PERMISSIONS
    // ============================================
    const userPermissions = {
        'admin': ['read', 'write', 'delete', 'admin'],
        'user': ['read', 'write'],
        'anonymous': ['read']
    };

    function getUserRole(apiKey) {
        // In production, this would query a database
        const roleMap = {
            'admin-key-123': 'admin',
            'user-key-456': 'user'
        };
        return roleMap[apiKey] || 'anonymous';
    }

    const userRole = getUserRole(apiKey);
    const permissions = userPermissions[userRole] || userPermissions.anonymous;

    // ============================================
    // AUDIT LOGGING
    // ============================================
    function logAudit(action, details) {
        const logEntry = {
            timestamp: new Date().toISOString(),
            userId: apiKey || 'anonymous',
            userRole: userRole,
            action: action,
            details: details,
            ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown',
            userAgent: req.headers['user-agent'] || 'unknown'
        };
        console.log('📋 AUDIT:', JSON.stringify(logEntry));
        // In production, store in database
    }

    // ============================================
    // REQUEST VALIDATION
    // ============================================
    function validateRequest(req) {
        // Check for suspicious patterns
        const suspiciousPatterns = [
            /<script>/i,
            /javascript:/i,
            /onerror=/i,
            /onload=/i,
            /eval\(/i
        ];

        const bodyString = JSON.stringify(req.body || '');
        for (const pattern of suspiciousPatterns) {
            if (pattern.test(bodyString)) {
                return { valid: false, reason: 'Suspicious content detected' };
            }
        }

        return { valid: true };
    }

    const validation = validateRequest(req);
    if (!validation.valid) {
        logAudit('REQUEST_BLOCKED', { reason: validation.reason });
        return res.status(400).json({
            error: 'Bad Request',
            message: validation.reason
        });
    }

    // ============================================
    // SECURITY HEADERS
    // ============================================
    function setSecurityHeaders(res) {
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.setHeader('X-Frame-Options', 'DENY');
        res.setHeader('X-XSS-Protection', '1; mode=block');
        res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
        res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
        res.setHeader('Content-Security-Policy', 
            "default-src 'self'; " +
            "script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com https://cdnjs.cloudflare.com; " +
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
            "font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com; " +
            "img-src 'self' data: https:; " +
            "connect-src 'self' https://api.groq.com;"
        );
    }

    setSecurityHeaders(res);

    // ============================================
    // LOG THE REQUEST
    // ============================================
    logAudit('API_REQUEST', {
        method: req.method,
        path: req.url,
        userRole: userRole
    });

    // ============================================
    // ATTACH USER CONTEXT TO REQUEST
    // ============================================
    req.user = {
        id: apiKey || 'anonymous',
        role: userRole,
        permissions: permissions
    };

    // ============================================
    // CONTINUE TO NEXT HANDLER
    // ============================================
    // This is a middleware - in a real implementation,
    // you would call the next handler here.
    // For Vercel, this would be the main handler.

    // If this is the endpoint itself, return status
    if (req.url === '/api/auth') {
        return res.status(200).json({
            authenticated: true,
            user: req.user,
            message: 'Authentication successful'
        });
    }

    // For other endpoints, you would pass through
    // Note: In Vercel, this would be handled differently
    return res.status(200).json({
        authenticated: true,
        user: req.user,
        message: 'Request authenticated'
    });
}
