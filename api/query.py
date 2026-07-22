// api/query.js
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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

        // Call Python script
        const result = await runPythonQuery(query);
        
        return res.status(200).json(result);
        
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: error.message || 'Internal server error' });
    }
}

function runPythonQuery(query) {
    return new Promise((resolve, reject) => {
        // Escape quotes in query
        const safeQuery = query.replace(/'/g, "'\\''");
        
        const command = `
            python3 -c "
import json
import sys
sys.path.insert(0, '/var/task')
from app import answer_question_api
try:
    result = answer_question_api('${safeQuery}')
    print(json.dumps(result))
except Exception as e:
    print(json.dumps({'error': str(e)}))
"
        `;
        
        exec(command, { 
            maxBuffer: 10 * 1024 * 1024,
            timeout: 30000 
        }, (error, stdout, stderr) => {
            if (error) {
                console.error('Python error:', stderr);
                reject(new Error(stderr || error.message));
                return;
            }
            
            try {
                const result = JSON.parse(stdout.trim());
                resolve(result);
            } catch (e) {
                console.error('Parse error:', stdout);
                reject(new Error('Failed to parse Python output'));
            }
        });
    });
}
