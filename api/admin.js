// api/admin.js - Admin Dashboard & Controls
export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-API-Key');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // ============================================
    // ADMIN AUTHENTICATION
    // ============================================
    const adminKey = process.env.ADMIN_KEY || 'admin-key-123';
    const apiKey = req.headers['x-api-key'];

    // Check if the request is from an admin
    const isAdmin = apiKey === adminKey;

    // For security, we only allow admin access to these endpoints
    if (!isAdmin) {
        return res.status(403).json({
            error: 'Forbidden',
            message: 'Admin access required'
        });
    }

    // ============================================
    // GET: Admin Dashboard Data
    // ============================================
    if (req.method === 'GET') {
        try {
            const { view } = req.query;

            // Get system stats
            const stats = {
                system: {
                    uptime: process.uptime(),
                    memory_usage: process.memoryUsage(),
                    node_version: process.version,
                    platform: process.platform,
                    timestamp: new Date().toISOString()
                },
                bot: {
                    total_queries: getTotalQueries(),
                    total_errors: getTotalErrors(),
                    cache_hit_rate: getCacheHitRate(),
                    sources: 5,
                    status: 'healthy'
                },
                users: {
                    total_users: getUserCount(),
                    active_users: getActiveUserCount(),
                    user_roles: getUserRoles()
                },
                audit: {
                    total_entries: global.auditStore?.length || 0,
                    last_entry: global.auditStore?.[global.auditStore.length - 1] || null
                }
            };

            // If specific view requested, return only that section
            if (view && stats[view]) {
                return res.status(200).json({
                    success: true,
                    data: stats[view]
                });
            }

            return res.status(200).json({
                success: true,
                data: stats
            });

        } catch (error) {
            console.error('Admin dashboard error:', error);
            return res.status(500).json({
                error: 'Failed to load admin dashboard',
                message: error.message
            });
        }
    }

    // ============================================
    // POST: Admin Actions
    // ============================================
    if (req.method === 'POST') {
        try {
            const { action, target, data } = req.body;

            if (!action) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'action is required'
                });
            }

            let result;

            switch (action) {
                case 'clear_cache':
                    // Clear the bot's cache
                    if (global.responseCache) {
                        global.responseCache.clear();
                        result = { message: 'Cache cleared successfully' };
                    } else {
                        result = { message: 'Cache not available' };
                    }
                    break;

                case 'reset_user':
                    if (!target) {
                        return res.status(400).json({
                            error: 'Bad Request',
                            message: 'target (userId) is required for reset_user action'
                        });
                    }
                    // Reset user data
                    result = await resetUserData(target);
                    break;

                case 'update_settings':
                    // Update system settings
                    const { setting, value } = data;
                    if (!setting) {
                        return res.status(400).json({
                            error: 'Bad Request',
                            message: 'setting is required'
                        });
                    }
                    result = await updateSystemSetting(setting, value);
                    break;

                case 'trigger_scrape':
                    // Trigger manual scrape
                    result = { message: 'Scrape triggered successfully' };
                    // In production, this would trigger a GitHub Actions workflow
                    break;

                default:
                    return res.status(400).json({
                        error: 'Bad Request',
                        message: `Unknown action: ${action}`
                    });
            }

            // Log the admin action
            if (global.auditStore) {
                global.auditStore.push({
                    id: `audit_${Date.now()}`,
                    timestamp: new Date().toISOString(),
                    userId: 'admin',
                    action: `ADMIN_${action.toUpperCase()}`,
                    details: { target, data },
                    ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown',
                    userAgent: req.headers['user-agent'] || 'unknown'
                });
            }

            return res.status(200).json({
                success: true,
                action: action,
                result: result
            });

        } catch (error) {
            console.error('Admin action error:', error);
            return res.status(500).json({
                error: 'Failed to execute admin action',
                message: error.message
            });
        }
    }

    // ============================================
    // DELETE: Admin Delete Operations
    // ============================================
    if (req.method === 'DELETE') {
        try {
            const { target, type } = req.query;

            if (!target) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'target is required'
                });
            }

            let result;

            switch (type) {
                case 'user':
                    result = await deleteUser(target);
                    break;

                case 'audit':
                    // Clear audit logs for user
                    if (global.auditStore) {
                        const initialLength = global.auditStore.length;
                        global.auditStore = global.auditStore.filter(entry => entry.userId !== target);
                        result = { 
                            message: `Removed ${initialLength - global.auditStore.length} audit entries for user ${target}`
                        };
                    } else {
                        result = { message: 'Audit store not available' };
                    }
                    break;

                default:
                    return res.status(400).json({
                        error: 'Bad Request',
                        message: `Unknown delete type: ${type}`
                    });
            }

            return res.status(200).json({
                success: true,
                type: type || 'user',
                target: target,
                result: result
            });

        } catch (error) {
            console.error('Admin delete error:', error);
            return res.status(500).json({
                error: 'Failed to delete resource',
                message: error.message
            });
        }
    }

    // ============================================
    // HELPER FUNCTIONS
    // ============================================

    function getTotalQueries() {
        try {
            const events = JSON.parse(localStorage.getItem('botEvents') || '[]');
            return events.filter(e => e.type === 'query').length;
        } catch (e) {
            return 0;
        }
    }

    function getTotalErrors() {
        try {
            const events = JSON.parse(localStorage.getItem('botEvents') || '[]');
            return events.filter(e => e.type === 'error').length;
        } catch (e) {
            return 0;
        }
    }

    function getCacheHitRate() {
        if (global.responseCache) {
            const stats = global.responseCache.getStats();
            return stats.hitRate || '0%';
        }
        return 'N/A';
    }

    function getUserCount() {
        // In production, this would query a database
        return 42; // Placeholder
    }

    function getActiveUserCount() {
        // In production, this would query a database
        return 7; // Placeholder
    }

    function getUserRoles() {
        // In production, this would query a database
        return { admin: 1, user: 35, anonymous: 6 };
    }

    async function resetUserData(userId) {
        // In production, this would reset user data in the database
        return { message: `User ${userId} data reset successfully` };
    }

    async function updateSystemSetting(setting, value) {
        // In production, this would update system settings
        return { message: `Setting ${setting} updated to ${value}` };
    }

    async function deleteUser(userId) {
        // In production, this would delete user data
        return { message: `User ${userId} deleted successfully` };
    }

    // ============================================
    // Default: Method Not Allowed
    // ============================================
    return res.status(405).json({
        error: 'Method not allowed',
        allowed_methods: ['GET', 'POST', 'DELETE']
    });
}
