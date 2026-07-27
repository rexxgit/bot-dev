// api/data.js - Dynamic Multi-Source with Source Badges & Error Handling
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { query } = req.body;

        // ============================================
        // READ DATA FROM data.json (DYNAMIC)
        // ============================================
        const dataPath = path.join(__dirname, '..', 'data.json');
        let data;
        
        try {
            const rawData = fs.readFileSync(dataPath, 'utf8');
            data = JSON.parse(rawData);
            console.log(`📊 Loaded ${data.total_sources || 0} sources from data.json`);
        } catch (error) {
            console.error('Error reading data.json:', error);
            return res.status(200).json({
                response: '⚠️ **Data not available.**\n\nPlease run `python app.py` to scrape the latest data.',
                sources: [],
                metadata: {
                    total_sources: 0,
                    last_updated: 'Unknown',
                    matches_found: 0,
                    ai_generated: false,
                    error: 'data_not_found'
                }
            });
        }

        // Check if data has sources
        if (!data.sources || data.sources.length === 0) {
            return res.status(200).json({
                response: '⚠️ **No sources available.**\n\nPlease run `python app.py` to scrape data.',
                sources: [],
                metadata: {
                    total_sources: 0,
                    last_updated: data.last_updated || 'Unknown',
                    matches_found: 0,
                    ai_generated: false,
                    error: 'no_sources'
                }
            });
        }

        if (!query) {
            return res.status(200).json({
                type: 'scraped',
                data: data,
                metadata: {
                    total_sources: data.total_sources || data.sources.length,
                    last_updated: data.last_updated || 'Unknown'
                }
            });
        }

        // ============================================
        // SEARCH & SCORE ACROSS ALL SOURCES
        // ============================================
        const queryLower = query.toLowerCase();
        const queryWords = queryLower.split(/\s+/).filter(w => w.length > 2);
        const stopWords = ['the', 'is', 'are', 'was', 'were', 'and', 'or', 'for', 'with', 'this', 'that'];

        let allResults = [];

        for (const source of data.sources) {
            const content = source.content || '';
            const paragraphs = content.split('\n\n');

            for (const paragraph of paragraphs) {
                const lower = paragraph.toLowerCase();
                let score = 0;

                for (const word of queryWords) {
                    if (stopWords.includes(word)) continue;
                    const count = (lower.match(new RegExp(word, 'g')) || []).length;
                    score += count * 2;
                    if (lower.includes(queryLower)) {
                        score += 10;
                    }
                }

                const matchedWords = queryWords.filter(w => lower.includes(w));
                if (matchedWords.length > 1) {
                    score += matchedWords.length * 3;
                }

                if (score > 1) {
                    allResults.push({
                        source_name: source.source_name || 'Unknown',
                        url: source.url || '#',
                        title: source.title || 'No Title',
                        author: source.author || 'Unknown',
                        date: source.date || 'Unknown',
                        content: paragraph,
                        score: score
                    });
                }
            }
        }

        allResults.sort((a, b) => b.score - a.score);
        const topResults = allResults.slice(0, 3);

        // ============================================
        // HANDLE NO RESULTS
        // ============================================
        if (topResults.length === 0) {
            return res.status(200).json({
                response: '🔍 **No matching content found.**\n\nTry asking about:\n- AI tools and platforms\n- ChatGPT, Claude, Gemini, or Grok\n- AI strategy and industry trends',
                sources: [],
                metadata: {
                    total_sources: data.total_sources || data.sources.length,
                    matches_found: 0,
                    last_updated: data.last_updated || 'Unknown',
                    ai_generated: false
                }
            });
        }

        // ============================================
        // GROQ GENERATION (Blazing Fast!)
        // ============================================
        let aiAnswer = null;
        let aiError = null;
        const groqKey = process.env.GROQ_API_KEY;

        if (groqKey && topResults.length > 0) {
            try {
                const context = topResults.map((r, i) => 
                    `Source ${i+1} (${r.source_name}): ${r.content}`
                ).join('\n\n');

                const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${groqKey}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        model: 'llama-3.1-8b-instant',
                        messages: [
                            {
                                role: 'system',
                                content: 'You are a senior marketing analyst. Answer based ONLY on the provided context. Be concise and structured. Cite sources by name.'
                            },
                            {
                                role: 'user',
                                content: `CONTEXT:\n${context}\n\nQUESTION: ${query}\n\nAnswer concisely with key points based only on the context:`
                            }
                        ],
                        temperature: 0.2,
                        max_tokens: 500,
                    })
                });

                if (response.ok) {
                    const groqData = await response.json();
                    aiAnswer = groqData.choices?.[0]?.message?.content || null;
                } else {
                    const errorText = await response.text();
                    console.log('Groq API error:', errorText);
                    aiError = {
                        status: response.status,
                        message: errorText
                    };
                    
                    if (response.status === 429) {
                        return res.status(200).json({
                            response: `⏳ **Rate Limit Exceeded**\n\nThe AI service is temporarily unavailable. Please wait a moment and try again.\n\n**Search Results:**\n\n${topResults.map((r, i) => `**${r.source_name} - ${r.title}**\n${r.content.substring(0, 300)}...`).join('\n\n')}`,
                            sources: topResults.map(r => ({
                                source: r.url,
                                source_name: r.source_name,
                                title: r.title,
                                author: r.author,
                                date: r.date,
                                score: r.score,
                                chunk: r.content.substring(0, 300) + '...'
                            })),
                            metadata: {
                                total_sources: data.total_sources || data.sources.length,
                                last_updated: data.last_updated || 'Unknown',
                                matches_found: topResults.length,
                                ai_generated: false,
                                error: 'rate_limit'
                            }
                        });
                    }
                }
            } catch (error) {
                console.error('Groq generation error:', error);
                aiError = {
                    message: error.message
                };
            }
        }

        // ============================================
        // BUILD RESPONSE WITH SOURCE BADGES
        // ============================================
        let responseText = '';

        if (aiAnswer) {
            responseText = `**🤖 AI-Generated Answer**\n\n${aiAnswer}\n\n---\n*Based on ${topResults.length} source(s)*`;
        } else if (aiError && aiError.status === 429) {
            responseText = `⏳ **Rate Limit Exceeded**\n\nThe AI service is temporarily unavailable. Please wait a moment and try again.`;
        } else if (topResults.length > 0) {
            responseText = `**📊 Answer based on ${topResults.length} source(s):**\n\n`;
            for (let i = 0; i < topResults.length; i++) {
                const r = topResults[i];
                responseText += `**Source ${i + 1}: ${r.title}**\n`;
                responseText += `🏷️ Source: ${r.source_name}\n`;
                responseText += `✍️ Author: ${r.author}\n`;
                responseText += `📅 Date: ${r.date}\n`;
                responseText += `📊 Relevance: ${Math.min((r.score / 20) * 100, 100).toFixed(0)}%\n\n`;
                responseText += `${r.content}\n\n---\n\n`;
            }
        } else {
            responseText = '🔍 **No matching content found.**';
        }

        // Build sources with domain badges and source names
        const sourcesWithBadges = topResults.map(r => {
            let domain = 'Unknown';
            try {
                domain = new URL(r.url).hostname.replace('www.', '');
            } catch (e) {}
            
            return {
                source: r.url,
                source_name: r.source_name,
                title: r.title,
                author: r.author,
                date: r.date,
                score: r.score,
                domain: domain,
                chunk: r.content.substring(0, 300) + '...'
            };
        });

        return res.status(200).json({
            response: responseText,
            sources: sourcesWithBadges,
            metadata: {
                total_sources: data.total_sources || data.sources.length,
                last_updated: data.last_updated || 'Unknown',
                matches_found: topResults.length,
                ai_generated: !!aiAnswer,
                error: aiError ? aiError.message : null
            }
        });

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            error: 'Internal server error',
            details: error.message,
            timestamp: new Date().toISOString()
        });
    }
}
