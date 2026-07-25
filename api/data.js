// api/data.js - With Source Badges, Error Handling & Professional Formatting
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
        // YOUR SCRAPED DATA
        // ============================================
        const data = {
            "sources": [
                {
                    "source_name": "Raulji Technologies",
                    "url": "https://www.rauljitechnologies.com/blog/july-2026-ai-model-wave/",
                    "title": "GPT-5.6, Claude Sonnet 5 and Grok 4.5: What the July 2026 AI Model Wave Means for Your Business",
                    "content": "Anthropic, OpenAI, and xAI all shipped major models in weeks. Here is what the July 2026 AI model wave means for your business, and how to turn it…\n\nIn July 2026, Anthropic's Claude Sonnet 5, OpenAI's GPT-5.6 and xAI's Grok 4.5 all launched within weeks of each other. For most businesses the winning move is not chasing whichever model leads the benchmarks this month, it is building on a flexible setup you can swap newer models into as they improve.\n\nThe middle of 2026 has been one of the busiest stretches the AI industry has ever seen. In a matter of weeks, Anthropic shipped Claude Sonnet 5, OpenAI began rolling out its GPT-5.6 family, and xAI released Grok 4.5, while a wave of open-source models kept pace right behind them. For business leaders, the headlines are exciting and a little overwhelming. The real question is not which model won this month, it is what this pace of change means for the decisions you are making about AI right now.\n\nThree frontier releases anchored the last few weeks, each aimed at a slightly different strength. Understanding what each one is good at matters more than the leaderboard position, because the right model depends on the job you are giving it.\n\nThe July 2026 wave did not crown a single winner. It confirmed that several frontier models are now close in quality, so your advantage comes from how you use them, not which logo you pick.",
                    "author": "Yuvraj Raulji",
                    "date": "July 24, 2026",
                    "word_count": 1753
                }
            ],
            "total_sources": 1,
            "last_updated": "2026-07-24T11:55:00.123938"
        };

        if (!query) {
            return res.status(200).json({ type: 'scraped', data: data });
        }

        // ============================================
        // SEARCH & SCORE
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
                        source_name: source.source_name,
                        url: source.url,
                        title: source.title,
                        author: source.author,
                        date: source.date,
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
                response: '🔍 **No matching content found.**\n\nTry asking about:\n- July 2026 AI models\n- GPT-5.6, Claude Sonnet 5, or Grok 4.5\n- AI strategy and industry trends',
                sources: [],
                metadata: {
                    total_sources: data.total_sources || 0,
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
                    `Source ${i+1}: ${r.content}`
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
                                content: 'You are a senior marketing analyst. Answer based ONLY on the provided context. Be concise and structured.'
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
                    
                    // Handle specific error codes
                    if (response.status === 429) {
                        return res.status(200).json({
                            response: `⏳ **Rate Limit Exceeded**\n\nThe AI service is temporarily unavailable due to high demand. Please wait a moment and try again.\n\nIn the meantime, here are the search results:\n\n${topResults.map((r, i) => `**Source ${i+1}:** ${r.title}\n${r.content}`).join('\n\n')}`,
                            sources: topResults.map(r => ({
                                source: r.url,
                                title: r.title,
                                author: r.author,
                                date: r.date,
                                score: r.score,
                                chunk: r.content.substring(0, 300) + '...'
                            })),
                            metadata: {
                                total_sources: data.total_sources || 0,
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
            // Rate limit already handled above
            responseText = `⏳ **Rate Limit Exceeded**\n\nThe AI service is temporarily unavailable. Please wait a moment and try again.`;
        } else if (topResults.length > 0) {
            responseText = `**📊 Answer based on ${topResults.length} source(s):**\n\n`;
            for (let i = 0; i < topResults.length; i++) {
                const r = topResults[i];
                const domain = new URL(r.url).hostname.replace('www.', '');
                responseText += `**Source ${i + 1}: ${r.title}**\n`;
                responseText += `✍️ Author: ${r.author}\n`;
                responseText += `📅 Date: ${r.date}\n`;
                responseText += `📰 Source: ${domain}\n`;
                responseText += `📊 Relevance: ${Math.min((r.score / 20) * 100, 100).toFixed(0)}%\n\n`;
                responseText += `${r.content}\n\n---\n\n`;
            }
        } else {
            responseText = '🔍 **No matching content found.**';
        }

        // Build sources with domain badges
        const sourcesWithBadges = topResults.map(r => {
            let domain = 'Unknown';
            try {
                domain = new URL(r.url).hostname.replace('www.', '');
            } catch (e) {}
            
            return {
                source: r.url,
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
                total_sources: data.total_sources || 0,
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
