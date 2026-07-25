// api/data.js - With Gemini AI integration
export default async function handler(req, res) {
    // CORS headers
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
        // EMBEDDED DATA
        // ============================================
        const data = {
            "sources": [
                {
                    "source_name": "Raulji Technologies",
                    "url": "https://www.rauljitechnologies.com/blog/july-2026-ai-model-wave/",
                    "title": "GPT-5.6, Claude Sonnet 5 and Grok 4.5: What the July 2026 AI Model Wave Means for Your Business",
                    "content": "Anthropic, OpenAI, and xAI all shipped major models in weeks. Here is what the July 2026 AI model wave means for your business, and how to turn it…\n\nIn July 2026, Anthropic's Claude Sonnet 5, OpenAI's GPT-5.6 and xAI's Grok 4.5 all launched within weeks of each other. For most businesses the winning move is not chasing whichever model leads the benchmarks this month, it is building on a flexible setup you can swap newer models into as they improve.\n\nThe middle of 2026 has been one of the busiest stretches the AI industry has ever seen. In a matter of weeks, Anthropic shipped Claude Sonnet 5, OpenAI began rolling out its GPT-5.6 family, and xAI released Grok 4.5, while a wave of open-source models kept pace right behind them. For business leaders, the headlines are exciting and a little overwhelming. The real question is not which model won this month, it is what this pace of change means for the decisions you are making about AI right now.\n\nThree frontier releases anchored the last few weeks, each aimed at a slightly different strength. Understanding what each one is good at matters more than the leaderboard position, because the right model depends on the job you are giving it.\n\nOpenAI took an unusually cautious path with GPT-5.6, opening initial access to a small group of partner organisations before a broader release expected through mid-July. Anthropic and xAI moved faster to general availability. The takeaway is not that one approach is right, it is that access, safety review, and availability are now part of the product story, not an afterthought.\n\nThe July 2026 wave did not crown a single winner. It confirmed that several frontier models are now close in quality, so your advantage comes from how you use them, not which logo you pick.\n\nWhen releases arrive this quickly, the losing move is to hard-wire your product to one provider and one model version. The winning move is to treat the model as a component you can swap, so every new release is an upgrade opportunity rather than a migration headache.\n\nWhile the frontier labs dominated the news, open-source models quietly closed much of the gap. Releases such as GLM-5.2, DeepSeek V4, Kimi K2.7, MiniMax M3, and Qwen 3.6 now deliver strong reasoning, coding, and long-context performance under permissive licences.",
                    "author": "Yuvraj Raulji",
                    "date": "July 24, 2026",
                    "word_count": 1753,
                    "sections": [
                        "What Actually Launched in the July 2026 Model Wave",
                        "Why This Pace Is the Real Story",
                        "The Open-Source Surge Behind the Headlines",
                        "What It Means for Your Business",
                        "How to Turn a Fast Market Into an Advantage"
                    ]
                }
            ],
            "total_sources": 1,
            "last_updated": "2026-07-24T11:55:00.123938"
        };

        // If no query, return all data
        if (!query) {
            return res.status(200).json({
                type: 'scraped',
                data: data
            });
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
                        score: score,
                        sections: source.sections?.slice(0, 5) || []
                    });
                }
            }
        }

        allResults.sort((a, b) => b.score - a.score);
        const topResults = allResults.slice(0, 3);

        // ============================================
        // GEMINI AI GENERATION
        // ============================================
        let aiAnswer = null;
        const geminiKey = process.env.GEMINI_API_KEY;

        if (geminiKey && topResults.length > 0) {
            try {
                // Build context from top results
                const context = topResults.map((r, i) => 
                    `Source ${i+1}: ${r.content}`
                ).join('\n\n');

                const prompt = `You are a senior marketing analyst. Answer the following question based ONLY on the provided context.

CONTEXT:
${context}

QUESTION: ${query}

INSTRUCTIONS:
1. Answer concisely based only on the context above.
2. If the answer is not in the context, say: "I cannot answer this based on available data."
3. Provide a clear, well-structured answer with key points.
4. Reference sources by number (e.g., "According to Source 1...").

ANSWER:`;

                // Call Gemini API
                const geminiResponse = await fetch(
                    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            contents: [{
                                parts: [{ text: prompt }]
                            }],
                            generationConfig: {
                                temperature: 0.2,
                                maxOutputTokens: 500,
                            }
                        })
                    }
                );

                if (geminiResponse.ok) {
                    const geminiData = await geminiResponse.json();
                    aiAnswer = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || null;
                } else {
                    console.log('Gemini API error:', await geminiResponse.text());
                }
            } catch (error) {
                console.error('Gemini generation error:', error);
            }
        }

        // ============================================
        // BUILD RESPONSE
        // ============================================
        let responseText = '';

        if (aiAnswer) {
            // AI-generated answer
            responseText = `**🤖 AI-Generated Answer**\n\n${aiAnswer}\n\n`;
            responseText += `---\n*Based on ${topResults.length} source(s)*`;
        } else if (topResults.length > 0) {
            // Fallback to context-only
            responseText = `**📊 Answer based on ${topResults.length} source(s):**\n\n`;
            for (let i = 0; i < topResults.length; i++) {
                const r = topResults[i];
                responseText += `**Source ${i + 1}: ${r.title}**\n`;
                responseText += `✍️ Author: ${r.author}\n`;
                responseText += `📅 Date: ${r.date}\n`;
                responseText += `📊 Relevance: ${Math.min((r.score / 20) * 100, 100).toFixed(0)}%\n\n`;
                responseText += `${r.content}\n\n`;
                responseText += `---\n\n`;
            }
        } else {
            responseText = '🔍 **No matching content found.**\n\nTry a different question about AI models, strategy, or industry trends.';
        }

        return res.status(200).json({
            response: responseText,
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
                ai_generated: !!aiAnswer
            }
        });

    } catch (error) {
        console.error('Error in /api/data:', error);
        return res.status(500).json({
            error: 'Internal server error',
            details: error.message
        });
    }
}
