// api/sources.js - Source Management Endpoint
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ============================================
// SOURCE CONFIGURATION
// ============================================
const DEFAULT_SOURCES = [
    {
        id: 'raulji',
        name: 'Raulji Technologies',
        url: 'https://www.rauljitechnologies.com/blog/july-2026-ai-model-wave/',
        type: 'html',
        selectors: {
            title: 'h1.rtp-h1',
            sub_sections: 'p.rtp-sub',
            tables: 'div.rtfig'
        },
        active: true,
        priority: 1,
        last_scraped: null,
        created_at: new Date().toISOString()
    },
    {
        id: 'gumloop',
        name: 'Gumloop',
        url: 'https://www.gumloop.com/blog/best-ai-apps',
        type: 'html',
        selectors: {
            title: 'h1.heading-style-h2',
            sub_sections: 'p.blog-post-lede',
            tables: 'div.text-rich-text.blog-article.list.w-richtext table'
        },
        active: true,
        priority: 2,
        last_scraped: null,
        created_at: new Date().toISOString()
    },
    {
        id: 'pickaxe',
        name: 'Pickaxe',
        url: 'https://pickaxe.co/post/top-ai-platforms',
        type: 'html',
        selectors: {
            title: 'h1',
            sub_sections: 'h2',
            tables: 'table'
        },
        active: true,
        priority: 3,
        last_scraped: null,
        created_at: new Date().toISOString()
    },
    {
        id: 'synthesia',
        name: 'Synthesia',
        url: 'https://www.synthesia.io/post/ai-tools',
        type: 'html',
        selectors: {
            title: 'h1.heading-medium.text-wrap-balance.text-color-primary',
            sub_sections: 'h2',
            tables: 'table'
        },
        active: true,
        priority: 4,
        last_scraped: null,
        created_at: new Date().toISOString()
    },
    {
        id: 'redriver',
        name: 'Red River Communications',
        url: 'https://redrivercomm.com/six-popular-ai-platforms-everyone-can-use',
        type: 'html',
        selectors: {
            title: 'h2.wp-block-heading',
            sub_sections: 'h2',
            tables: 'table'
        },
        active: true,
        priority: 5,
        last_scraped: null,
        created_at: new Date().toISOString()
    }
];

// ============================================
// SOURCE STORE
// ============================================
let sources = [];

function initializeSources() {
    // Try to load from file first
    const sourcesPath = path.join(__dirname, '..', 'data', 'sources.json');
    try {
        if (fs.existsSync(sourcesPath)) {
            const rawData = fs.readFileSync(sourcesPath, 'utf8');
            sources = JSON.parse(rawData);
            console.log(`📚 Loaded ${sources.length} sources from file`);
            return;
        }
    } catch (error) {
        console.warn('⚠️ Could not load sources from file, using defaults');
    }
    
    // Use defaults
    sources = JSON.parse(JSON.stringify(DEFAULT_SOURCES));
    saveSources();
}

function saveSources() {
    const sourcesPath = path.join(__dirname, '..', 'data', 'sources.json');
    try {
        const dir = path.dirname(sourcesPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(sourcesPath, JSON.stringify(sources, null, 2), 'utf8');
    } catch (error) {
        console.error('❌ Failed to save sources:', error);
    }
}

// Initialize on module load
initializeSources();

// ============================================
// API HANDLER
// ============================================
export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-API-Key');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // ============================================
    // GET: List All Sources
    // ============================================
    if (req.method === 'GET') {
        try {
            const { active, limit = 50, offset = 0 } = req.query;
            
            let results = [...sources];
            
            // Filter by active status
            if (active !== undefined) {
                const isActive = active === 'true';
                results = results.filter(s => s.active === isActive);
            }
            
            // Paginate
            const total = results.length;
            const paginated = results.slice(parseInt(offset), parseInt(offset) + parseInt(limit));
            
            return res.status(200).json({
                success: true,
                data: paginated,
                pagination: {
                    total: total,
                    limit: parseInt(limit),
                    offset: parseInt(offset),
                    hasMore: (parseInt(offset) + parseInt(limit)) < total
                },
                timestamp: new Date().toISOString()
            });
            
        } catch (error) {
            console.error('Sources list error:', error);
            return res.status(500).json({
                error: 'Failed to retrieve sources',
                message: error.message
            });
        }
    }

    // ============================================
    // POST: Add New Source
    // ============================================
    if (req.method === 'POST') {
        try {
            const { name, url, type, selectors, priority = 99 } = req.body;
            
            // Validate required fields
            if (!name || !url || !type) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'name, url, and type are required'
                });
            }
            
            // Validate type
            if (!['html', 'pdf', 'api'].includes(type)) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'type must be html, pdf, or api'
                });
            }
            
            // Check for duplicate URL
            if (sources.some(s => s.url === url)) {
                return res.status(409).json({
                    error: 'Conflict',
                    message: 'A source with this URL already exists'
                });
            }
            
            // Generate ID
            const id = name.toLowerCase().replace(/[^a-z0-9]/g, '');
            
            const newSource = {
                id: `${id}_${Date.now()}`,
                name,
                url,
                type,
                selectors: selectors || {},
                active: true,
                priority: parseInt(priority),
                last_scraped: null,
                created_at: new Date().toISOString()
            };
            
            sources.push(newSource);
            saveSources();
            
            return res.status(201).json({
                success: true,
                message: 'Source added successfully',
                data: newSource
            });
            
        } catch (error) {
            console.error('Add source error:', error);
            return res.status(500).json({
                error: 'Failed to add source',
                message: error.message
            });
        }
    }

    // ============================================
    // PUT: Update Source
    // ============================================
    if (req.method === 'PUT') {
        try {
            const { id } = req.query;
            const updates = req.body;
            
            if (!id) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'id query parameter is required'
                });
            }
            
            const index = sources.findIndex(s => s.id === id);
            if (index === -1) {
                return res.status(404).json({
                    error: 'Not Found',
                    message: `Source with id ${id} not found`
                });
            }
            
            // Update fields (prevent changing id, created_at)
            const allowedUpdates = ['name', 'url', 'type', 'selectors', 'active', 'priority'];
            for (const key of allowedUpdates) {
                if (updates[key] !== undefined) {
                    sources[index][key] = updates[key];
                }
            }
            
            sources[index].updated_at = new Date().toISOString();
            saveSources();
            
            return res.status(200).json({
                success: true,
                message: 'Source updated successfully',
                data: sources[index]
            });
            
        } catch (error) {
            console.error('Update source error:', error);
            return res.status(500).json({
                error: 'Failed to update source',
                message: error.message
            });
        }
    }

    // ============================================
    // DELETE: Remove Source
    // ============================================
    if (req.method === 'DELETE') {
        try {
            const { id } = req.query;
            
            if (!id) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'id query parameter is required'
                });
            }
            
            const index = sources.findIndex(s => s.id === id);
            if (index === -1) {
                return res.status(404).json({
                    error: 'Not Found',
                    message: `Source with id ${id} not found`
                });
            }
            
            const removed = sources.splice(index, 1)[0];
            saveSources();
            
            return res.status(200).json({
                success: true,
                message: 'Source removed successfully',
                data: removed
            });
            
        } catch (error) {
            console.error('Delete source error:', error);
            return res.status(500).json({
                error: 'Failed to delete source',
                message: error.message
            });
        }
    }

    // ============================================
    // Default: Method Not Allowed
    // ============================================
    return res.status(405).json({
        error: 'Method not allowed',
        allowed_methods: ['GET', 'POST', 'PUT', 'DELETE']
    });
}
