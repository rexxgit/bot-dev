// api/data.js - Fast JSON serving
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { query } = req.body;
        
        // Read data.json
        const dataPath = path.join(__dirname, '..', 'data.json');
        
        if (!fs.existsSync(dataPath)) {
            return res.status(200).json({
                response: '📊 **Data not yet available.**\n\nPlease run the scraper first.',
                sources: [],
                metadata: { status: 'pending' }
            });
        }

        const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
        
        // If no query, return the full data
        if (!query) {
            return res.status(200).json({
                type: 'scraped',
                data: data
            });
        }
        
        // Fast search
        const queryLower = query.toLowerCase();
        const content = data.content || '';
        const paragraphs = content.split('\n\n');
        
        // Find relevant paragraphs
        const matches = paragraphs.filter(p => 
            p.toLowerCase().includes(queryLower)
        );
        
        // Build response
        const results = matches.length > 0 ? matches : [content.substring(0, 400)];
        const displayContent = results.slice(0, 3).join('\n\n---\n\n');
        
        const responseText = `**📊 Answer based on the article:**\n\n` +
            `**Title:** ${data.title || 'Unknown'}\n` +
            `**Author:** ${data.author || 'Unknown'}\n` +
            `**Date:** ${data.date || 'Unknown'}\n` +
            `**Words:** ${data.word_count || 0}\n\n` +
            displayContent;
        
        return res.status(200).json({
            response: responseText,
            sources: results.slice(0, 3).map((chunk, i) => ({
                source: data.url || 'Unknown',
                score: 0.95 - (i * 0.05),
                chunk: chunk.substring(0, 200) + '...'
            })),
            metadata: {
                title: data.title || 'Unknown',
                author: data.author || 'Unknown',
                date: data.date || 'Unknown',
                word_count: data.word_count || 0,
                sections: data.sections?.slice(0, 5) || []
            }
        });
        
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: error.message || 'Internal server error' });
    }
}
