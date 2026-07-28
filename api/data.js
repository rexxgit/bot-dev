// api/data.js - Advanced RAG Features
export default async function handler(req, res) {
    const startTime = Date.now();
    console.log(`📥 Request received at ${new Date().toISOString()}`);

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        console.warn(`⚠️ Method not allowed: ${req.method}`);
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { query } = req.body;
        console.log(`🔍 Query: "${query}"`);

        // ============================================
        // 1. QUERY CLASSIFICATION
        // ============================================
        function classifyQuery(query) {
            const lower = query.toLowerCase();
            const analyticalTerms = [
                'compare', 'contrast', 'analyze', 'synthesis', 'trend', 
                'pattern', 'relationship', 'versus', 'vs', 'difference',
                'similarity', 'evaluation', 'assessment', 'overview'
            ];
            const comparativeTerms = ['better', 'best', 'worst', 'top', 'vs', 'versus'];
            
            let isAnalytical = analyticalTerms.some(term => lower.includes(term));
            let isComparative = comparativeTerms.some(term => lower.includes(term));
            
            if (isAnalytical || isComparative) {
                return 'analytical';
            }
            return 'factual';
        }

        const queryType = classifyQuery(query);
        console.log(`📊 Query classified as: ${queryType}`);

        // ============================================
        // 2. SOURCE AUTHORITY SCORES
        // ============================================
        const sourceAuthority = {
            'Raulji Technologies': 0.9,
            'Gumloop': 0.85,
            'Pickaxe': 0.85,
            'Synthesia': 0.8,
            'Red River Communications': 0.7
        };

        // ============================================
        // 3. EMBEDDED DATA WITH PRIORITIZATION
        // ============================================
        const data = {
            "sources": [
                {
                    "source_name": "Raulji Technologies",
                    "url": "https://www.rauljitechnologies.com/blog/july-2026-ai-model-wave/",
                    "title": "GPT-5.6, Claude Sonnet 5 and Grok 4.5: What the July 2026 AI Model Wave Means for Your Business",
                    "content": "Anthropic, OpenAI, and xAI all shipped major models in weeks. Here is what the July 2026 AI model wave means for your business, and how to turn it…\n\nIn July 2026, Anthropic's Claude Sonnet 5, OpenAI's GPT-5.6 and xAI's Grok 4.5 all launched within weeks of each other. For most businesses the winning move is not chasing whichever model leads the benchmarks this month, it is building on a flexible setup you can swap newer models into as they improve.\n\nThe middle of 2026 has been one of the busiest stretches the AI industry has ever seen. In a matter of weeks, Anthropic shipped Claude Sonnet 5, OpenAI began rolling out its GPT-5.6 family, and xAI released Grok 4.5, while a wave of open-source models kept pace right behind them. For business leaders, the headlines are exciting and a little overwhelming. The real question is not which model won this month, it is what this pace of change means for the decisions you are making about AI right now.\n\nThree frontier releases anchored the last few weeks, each aimed at a slightly different strength. Understanding what each one is good at matters more than the leaderboard position, because the right model depends on the job you are giving it.\n\nThe July 2026 wave did not crown a single winner. It confirmed that several frontier models are now close in quality, so your advantage comes from how you use them, not which logo you pick.",
                    "author": "Unknown",
                    "date": "July 27, 2026",
                    "word_count": 1768
                },
                {
                    "source_name": "Gumloop",
                    "url": "https://www.gumloop.com/blog/best-ai-apps",
                    "title": "15 best AI apps I can't live without in 2026",
                    "content": "It all started with ChatGPT, then Claude, and then we had an explosion of AI apps for literally every use case you can think of.\n\nVideo editing, voice generation, coding, search, automation, presentations, SEO, you name it.\n\nTools promising to make us more productive.\n\nSome were simple 'ChatGPT wrappers' while others were genuinely new products that used AI in ways that were not possible a few years ago.\n\nThe problem is that there are so many AI tools out there now that it's hard to know which ones are actually worth your time. I have personally tested over 70 of them, and most I used once and never opened again. But there are a handful that I genuinely cannot live without at this point.\n\nThese are the 15 AI apps that have stuck around in my daily and weekly workflow and continue to make ship things faster and better.",
                    "author": "Unknown",
                    "date": "July 27, 2026",
                    "word_count": 6894
                },
                {
                    "source_name": "Pickaxe",
                    "url": "https://pickaxe.co/post/top-ai-platforms",
                    "title": "Top AI Platforms in 2026: The 15 Best Platforms I've Actually Tested",
                    "content": "I have tested more AI platforms than I can count over the past three years. Most of them blurred together. Some were genuinely great. A few changed how I work entirely.\n\nThis is my honest breakdown of the top AI platforms in 2026 — the 15 I actually spent real time with, built real things on, and can speak to from firsthand experience.\n\nThe AI platform market is now valued at $72.18 billion and is forecast to hit $119.57 billion by 2031. That kind of money attracts a lot of noise. Every startup with a wrapper around an API calls itself a 'platform.' I wanted to cut through all of that and give you a list that is actually useful.",
                    "author": "Unknown",
                    "date": "July 27, 2026",
                    "word_count": 6534
                },
                {
                    "source_name": "Synthesia",
                    "url": "https://www.synthesia.io/post/ai-tools",
                    "title": "The 12 Best AI Tools for 2026 (That People Actually Use)",
                    "content": "Can you believe it's been over three years since ChatGPT landed in our internet browsers? In a short space of time, AI has become a staple part of daily work and personal life, and the number of AI tools available has grown massively.\n\nIn the extensive list of AI tools, I've pulled the best ones to actually get work done, and that are genuinely useful in 2026. Take a look below.\n\nChatGPT is an easy-to-use AI assistant that helps with writing, research analysis, brainstorming ideas, and problem-solving. The tool is particularly good at document analysis – through the chat interface, you can upload PDFs, spreadsheets, screenshots, and other files, and ask it to summarize insights or highlight trends in data.",
                    "author": "Unknown",
                    "date": "July 27, 2026",
                    "word_count": 2343
                },
                {
                    "source_name": "Red River Communications",
                    "url": "https://redrivercomm.com/six-popular-ai-platforms-everyone-can-use",
                    "title": "Six Popular AI Platforms Everyone Can Use",
                    "content": "Whether it's Fortune 500 companies or your friends and coworkers, just about everywhere you turn, people are talking about AI—the common phrasing for Artificial Intelligence. The recent boom in AI technology has moved markets and begun to change how we learn, think, work, shop, and play.\n\nBelow, we explore six of the most popular and widely used AI apps and platforms and discuss their unique capabilities. From AI platforms that help set daily routines to enhancing your productivity, creativity, and efficiency at work or home to having a robust and compelling conversation with a human-like chatbot.",
                    "author": "Unknown",
                    "date": "July 27, 2026",
                    "word_count": 953
                }
            ],
            "total_sources": 5,
            "last_updated": "2026-07-27T08:36:53.036255"
        };

        if (!query) {
            return res.status(200).json({ type: 'scraped', data: data });
        }

        // ============================================
        // 4. HYBRID SEARCH FUNCTION
        // ============================================
        function hybridSearch(query, sources) {
            const queryLower = query.toLowerCase();
            const queryWords = queryLower.split(/\s+/).filter(w => w.length > 2);
            const stopWords = ['the', 'is', 'are', 'was', 'were', 'and', 'or', 'for', 'with', 'this', 'that'];

            let results = [];

            for (const source of sources) {
                const content = source.content || '';
                const paragraphs = content.split('\n\n');
                const authority = sourceAuthority[source.source_name] || 0.5;

                for (const paragraph of paragraphs) {
                    const lower = paragraph.toLowerCase();
                    let keywordScore = 0;
                    let semanticScore = 0;

                    // Keyword score (existing)
                    for (const word of queryWords) {
                        if (stopWords.includes(word)) continue;
                        const count = (lower.match(new RegExp(word, 'g')) || []).length;
                        keywordScore += count * 2;
                        if (lower.includes(queryLower)) {
                            keywordScore += 10;
                        }
                    }

                    const matchedWords = queryWords.filter(w => lower.includes(w));
                    if (matchedWords.length > 1) {
                        keywordScore += matchedWords.length * 3;
                    }

                    // Semantic score (simplified - uses word overlap)
                    const overlap = queryWords.filter(w => lower.includes(w)).length;
                    semanticScore = (overlap / queryWords.length) * 10;

                    // Combined score with authority boost
                    const totalScore = (keywordScore * 0.6) + (semanticScore * 0.3) + (authority * 10);

                    if (totalScore > 1) {
                        results.push({
                            source_name: source.source_name,
                            url: source.url,
                            title: source.title,
                            author: source.author,
                            date: source.date,
                            content: paragraph,
                            score: totalScore,
                            keywordScore: keywordScore,
                            semanticScore: semanticScore,
                            authority: authority
                        });
                    }
                }
            }

            // Sort by total score
            results.sort((a, b) => b.score - a.score);
            return results;
        }

        // ============================================
        // 5. QUERY ROUTING
        // ============================================
        const allResults = hybridSearch(query, data.sources);
        console.log(`📊 Found ${allResults.length} total matches`);

        let topResults;
        if (queryType === 'analytical') {
            // For analytical queries, get more sources for synthesis
            topResults = allResults.slice(0, 5);
            console.log(`🏆 Using ${topResults.length} sources for analytical query`);
        } else {
            // For factual queries, get the top 3 most relevant
            topResults = allResults.slice(0, 3);
            console.log(`🏆 Using ${topResults.length} sources for factual query`);
        }

        // ============================================
        // 6. HANDLE NO RESULTS
        // ============================================
        if (topResults.length === 0) {
            return res.status(200).json({
                response: '🔍 **No matching content found.**\n\nTry asking about:\n- AI tools and platforms\n- ChatGPT, Claude, Gemini, or Grok\n- AI strategy and industry trends',
                sources: [],
                metadata: {
                    total_sources: data.total_sources || 0,
                    matches_found: 0,
                    last_updated: data.last_updated || 'Unknown',
                    ai_generated: false,
                    query_type: queryType
                }
            });
        }

        // ============================================
        // 7. GROQ GENERATION WITH RETRY
        // ============================================
        let aiAnswer = null;
        let aiError = null;
        const groqKey = process.env.GROQ_API_KEY;

        if (groqKey && topResults.length > 0) {
            const context = topResults.map((r, i) => 
                `Source ${i+1} (${r.source_name}): ${r.content}`
            ).join('\n\n');

            try {
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
                                content: queryType === 'analytical' 
                                    ? 'You are a senior marketing analyst. Synthesize information from multiple sources. Provide a comprehensive, balanced answer with key insights.'
                                    : 'You are a senior marketing analyst. Answer based ONLY on the provided context. Be concise and accurate.'
                            },
                            {
                                role: 'user',
                                content: `CONTEXT:\n${context}\n\nQUESTION: ${query}\n\n${queryType === 'analytical' ? 'Synthesize the key insights from all sources:' : 'Answer concisely with key points:'}`
                            }
                        ],
                        temperature: queryType === 'analytical' ? 0.3 : 0.2,
                        max_tokens: 500,
                    })
                });

                if (response.ok) {
                    const groqData = await response.json();
                    aiAnswer = groqData.choices?.[0]?.message?.content || null;
                    console.log(`✅ AI answer generated (${aiAnswer?.length || 0} chars)`);
                } else {
                    const errorText = await response.text();
                    console.log('Groq API error:', errorText);
                    aiError = {
                        status: response.status,
                        message: errorText
                    };
                }
            } catch (error) {
                console.error('Groq generation error:', error);
                aiError = {
                    message: error.message
                };
            }
        }

        // ============================================
        // 8. BUILD RESPONSE
        // ============================================
        let responseText = '';

        if (aiAnswer) {
            responseText = `**🤖 AI-Generated Answer**\n\n${aiAnswer}\n\n---\n*Based on ${topResults.length} source(s)*`;
        } else if (topResults.length > 0) {
            responseText = `**📊 Answer based on ${topResults.length} source(s):**\n\n`;
            for (let i = 0; i < topResults.length; i++) {
                const r = topResults[i];
                const scorePct = Math.min((r.score / 20) * 100, 100);
                responseText += `**Source ${i + 1}: ${r.title}**\n`;
                responseText += `🏷️ Source: ${r.source_name}\n`;
                responseText += `✍️ Author: ${r.author}\n`;
                responseText += `📅 Date: ${r.date}\n`;
                responseText += `📊 Authority: ${(r.authority * 100).toFixed(0)}%\n`;
                responseText += `📊 Relevance: ${scorePct.toFixed(0)}%\n\n`;
                responseText += `${r.content}\n\n---\n\n`;
            }
        } else {
            responseText = '🔍 **No matching content found.**';
        }

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
                authority: r.authority,
                domain: domain,
                chunk: r.content.substring(0, 300) + '...'
            };
        });

        const duration = Date.now() - startTime;
        console.log(`⏱️ Request completed in ${duration}ms`);

        return res.status(200).json({
            response: responseText,
            sources: sourcesWithBadges,
            metadata: {
                total_sources: data.total_sources || 0,
                last_updated: data.last_updated || 'Unknown',
                matches_found: topResults.length,
                ai_generated: !!aiAnswer,
                query_type: queryType,
                processing_time_ms: duration,
                error: aiError ? aiError.message : null
            }
        });

    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        console.error(error.stack);
        return res.status(500).json({
            error: 'Internal server error',
            details: error.message,
            timestamp: new Date().toISOString()
        });
    }
}
