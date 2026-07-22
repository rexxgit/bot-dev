// api/query.js
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

export default async function handler(req, res) {
    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { query, action } = req.body;

        // Handle scraped content request
        if (action === 'scraped') {
            // Check if scraped data exists
            const dataPath = path.join(process.cwd(), 'data', 'scraped_data.json');
            if (fs.existsSync(dataPath)) {
                const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
                return res.status(200).json({
                    type: 'scraped',
                    data: data,
                    html: formatScrapedHTML(data)
                });
            } else {
                // Run the scraper
                const result = await runPythonScript('scrape');
                return res.status(200).json({
                    type: 'scraped',
                    data: result,
                    html: formatScrapedHTML(result)
                });
            }
        }

        // Handle query
        if (!query) {
            return res.status(400).json({ error: 'Query is required' });
        }

        // Run the Python RAG pipeline
        const result = await runPythonScript('query', query);
        
        return res.status(200).json({
            type: 'answer',
            query: query,
            response: result.response || 'No response',
            sources: result.sources || [],
            metadata: result.metadata || {}
        });

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: error.message });
    }
}

function runPythonScript(action, query) {
    return new Promise((resolve, reject) => {
        let command;
        if (action === 'scrape') {
            command = 'python -c "from app import scrape_and_save; scrape_and_save()"';
        } else {
            command = `python -c "from app import answer_question_api; import json; print(json.dumps(answer_question_api('${query.replace(/'/g, "\\'")}')))"`;
        }

        exec(command, { maxBuffer: 10 * 1024 * 1024 }, (error, stdout, stderr) => {
            if (error) {
                console.error('Python error:', stderr);
                reject(new Error(stderr || error.message));
                return;
            }
            try {
                const result = JSON.parse(stdout);
                resolve(result);
            } catch (e) {
                reject(new Error('Failed to parse Python output: ' + stdout));
            }
        });
    });
}

function formatScrapedHTML(data) {
    if (!data) return 'No data available';
    
    let html = `
        <div style="font-family: system-ui, sans-serif; line-height: 1.6;">
            <h1 style="font-size: 1.8rem; font-weight: 700; color: #1a202c; margin-bottom: 1rem; border-bottom: 3px solid #3b82f6; padding-bottom: 0.5rem;">
                📄 ${data.title || 'No Title'}
            </h1>
            <div style="display: flex; gap: 1.5rem; flex-wrap: wrap; margin-bottom: 1.5rem; padding: 1rem; background: #f8fafc; border-radius: 8px; font-size: 0.9rem; color: #475569;">
                <span><strong>✍️ Author:</strong> ${data.author || 'Unknown'}</span>
                <span><strong>📅 Date:</strong> ${data.date || 'Unknown'}</span>
                <span><strong>📊 Words:</strong> ${data.word_count || 0}</span>
                <span><strong>📑 Sections:</strong> ${(data.sections || []).length}</span>
                <span><strong>📋 Tables:</strong> ${(data.tables || []).length}</span>
            </div>
    `;

    if (data.sub_sections && data.sub_sections.length > 0) {
        html += `
            <div style="margin-bottom: 1.5rem; padding: 1rem; background: #eff6ff; border-radius: 8px; border-left: 4px solid #3b82f6;">
                <h3 style="font-weight: 600; color: #1e293b; margin-bottom: 0.5rem;">🔍 Key Sub Sections</h3>
                <ul style="list-style-type: disc; padding-left: 1.5rem; margin: 0;">
                    ${data.sub_sections.map(sub => `<li style="margin-bottom: 0.25rem;">${sub}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    if (data.content) {
        html += `
            <div style="margin-bottom: 1rem; padding: 1rem; background: #f8fafc; border-radius: 8px;">
                <h3 style="font-weight: 600; color: #1e293b; margin-bottom: 0.5rem;">📝 Content Preview</h3>
                <p style="color: #475569; line-height: 1.8;">${data.content.substring(0, 1000)}...</p>
                <p style="color: #94a3b8; font-size: 0.8rem; margin-top: 0.5rem;">Showing first 1000 characters of ${data.word_count} words</p>
            </div>
        `;
    }

    html += `
        <div style="font-size: 0.8rem; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 0.5rem; margin-top: 0.5rem;">
            <p>🔗 Source: <a href="${data.url}" target="_blank" style="color: #3b82f6; text-decoration: none;">${data.url}</a></p>
        </div>
        </div>
    `;

    return html;
}
