// Add this at the top of api/data.js
// Function to log to audit endpoint
async function logToAudit(userId, action, details) {
    try {
        // In production, this would call the audit API
        // For now, we'll use the global store directly
        const entry = {
            userId: userId || 'anonymous',
            action: action,
            details: details || {},
            timestamp: new Date().toISOString(),
            ip: 'server',
            userAgent: 'system'
        };
        
        if (global.auditStore) {
            global.auditStore.push(entry);
            if (global.auditStore.length > 1000) {
                global.auditStore.splice(0, global.auditStore.length - 1000);
            }
        }
    } catch (e) {
        console.error('Audit logging failed:', e);
    }
}

// Add this at the beginning of your handler:
const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
const userId = req.headers['x-api-key'] || 'anonymous';

// Log the request
await logToAudit(userId, 'API_REQUEST', {
    query: query || 'none',
    ip: clientIp,
    method: req.method,
    path: req.url
});

// When an error occurs:
await logToAudit(userId, 'API_ERROR', {
    error: error.message,
    query: query || 'none'
});

// When a query is successful:
await logToAudit(userId, 'QUERY_SUCCESS', {
    query: query,
    resultsCount: topResults.length,
    responseTime: duration,
    aiGenerated: !!aiAnswer
});
