// api/trigger.js
export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Handle preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { query } = req.body;
        
        if (!query) {
            return res.status(400).json({ error: 'Query is required' });
        }

        // Return a response
        return res.status(200).json({
            response: `**📊 Answer for: "${query}"**\n\nThis is a response from the Vercel API.`,
            sources: [
                { source: 'Source 1', score: 0.85, chunk: 'Sample content...' }
            ],
            metadata: {
                title: 'Article Title',
                author: 'Author Name',
                date: 'July 2026'
            }
        });
        
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: error.message || 'Internal server error' });
    }
}
