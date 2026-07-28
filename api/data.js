// api/data.js - Advanced RAG Features (Complete Implementation)
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
        // 1. QUERY CLASSIFICATION (Advanced)
        // ============================================
        function classifyQuery(query) {
            const lower = query.toLowerCase();
            
            // Define category patterns with weights
            const categories = {
                factual: {
                    keywords: ['what', 'when', 'where', 'who', 'which', 'is', 'are', 'was', 'were', 'did'],
                    weight: 1
                },
                analytical: {
                    keywords: ['compare', 'contrast', 'analyze', 'synthesis', 'trend', 'pattern', 'relationship', 'impact', 'cause'],
                    weight: 1.5
                },
                comparative: {
                    keywords: ['better', 'best', 'worst', 'top', 'vs', 'versus', 'compared to', 'difference'],
                    weight: 1.5
                },
                exploratory: {
                    keywords: ['how does', 'why does', 'what if', 'could', 'would', 'might', 'imagine'],
                    weight: 1.2
                },
                summarization: {
                    keywords: ['summarize', 'summarise', 'brief', 'overview', 'key points', 'main ideas', 'tl;dr'],
                    weight: 1.3
                }
            };
            
            // Score each category
            let scores = {};
            for (const [category, data] of Object.entries(categories)) {
                let score = 0;
                for (const keyword of data.keywords) {
                    if (lower.includes(keyword)) {
                        score += 1;
                    }
                }
                scores[category] = score * data.weight;
            }
            
            // Find the highest scoring category
            let bestCategory = 'factual';
            let bestScore = 0;
            for (const [category, score] of Object.entries(scores)) {
                if (score > bestScore) {
                    bestScore = score;
                    bestCategory = category;
                }
            }
            
            // If no clear winner, default to factual
            if (bestScore === 0) {
                bestCategory = 'factual';
                bestScore = 0.5;
            }
            
            return {
                type: bestCategory,
                confidence: Math.min(bestScore / 3, 1),
                scores: scores
            };
        }

        const queryClassification = classifyQuery(query);
        const queryType = queryClassification.type;
        console.log(`📊 Query classified as: ${queryType} (confidence: ${queryClassification.confidence})`);

        // ============================================
        // 2. SOURCE AUTHORITY SYSTEM (Enhanced)
        // ============================================
        const sourceAuthority = {
            'Raulji Technologies': {
                score: 0.95,
                domain: 'rauljitechnologies.com',
                tags: ['AI strategy', 'marketing', 'enterprise', 'consulting'],
                published_date_weight: 1.0,
                content_depth: 0.9
            },
            'Gumloop': {
                score: 0.90,
                domain: 'gumloop.com',
                tags: ['AI tools', 'automation', 'productivity', 'workflow'],
                published_date_weight: 0.9,
                content_depth: 0.85
            },
            'Pickaxe': {
                score: 0.88,
                domain: 'pickaxe.co',
                tags: ['AI platforms', 'development', 'monetization', 'building'],
                published_date_weight: 0.95,
                content_depth: 0.9
            },
            'Synthesia': {
                score: 0.85,
                domain: 'synthesia.io',
                tags: ['AI video', 'tools', 'creative', 'content'],
                published_date_weight: 0.85,
                content_depth: 0.8
            },
            'Red River Communications': {
                score: 0.70,
                domain: 'redrivercomm.com',
                tags: ['AI platforms', 'consumer', 'overview', 'general'],
                published_date_weight: 0.6,
                content_depth: 0.6
            }
        };

        function calculateAuthorityScore(sourceName, content, query) {
            const authority = sourceAuthority[sourceName];
            if (!authority) return 0.5;
            
            let score = authority.score;
            
            // Boost if content matches query category
            const queryLower = query.toLowerCase();
            if (authority.tags) {
                for (const tag of authority.tags) {
                    if (queryLower.includes(tag.toLowerCase())) {
                        score += 0.1;
                        break;
                    }
                }
            }
            
            // Content length boost (longer content = more authoritative)
            const wordCount = content.split(/\s+/).length;
            if (wordCount > 1000) {
                score += 0.05;
            }
            if (wordCount > 2000) {
                score += 0.05;
            }
            
            // Recency boost (newer content = more authoritative)
            const date = new Date(authority.published_date_weight);
            const now = new Date();
            const daysSince = (now - date) / (1000 * 60 * 60 * 24);
            if (daysSince < 30) {
                score += 0.05;
            }
            
            return Math.min(score, 1.0);
        }

        // ============================================
        // 3. SEMANTIC SEARCH (Enhanced)
        // ============================================
        function semanticSearch(query, paragraphs, sourceName) {
            const queryWords = query.toLowerCase().split(/\s+/).filter(w => w.length > 2);
            const results = [];
            
            for (const paragraph of paragraphs) {
                const words = paragraph.toLowerCase().split(/\s+/);
                
                // Calculate word overlap
                const commonWords = queryWords.filter(word => 
                    words.includes(word) && word.length > 3
                );
                const overlapScore = queryWords.length > 0 ? (commonWords.length / queryWords.length) * 10 : 0;
                
                // Calculate proximity (words appearing close to each other)
                let proximityScore = 0;
                for (let i = 0; i < queryWords.length - 1; i++) {
                    const pos1 = words.indexOf(queryWords[i]);
                    const pos2 = words.indexOf(queryWords[i+1]);
                    if (pos1 !== -1 && pos2 !== -1) {
                        proximityScore += 1 / (Math.abs(pos1 - pos2) + 1);
                    }
                }
                
                // Calculate semantic density (how many query words appear in the paragraph)
                const density = commonWords.length / Math.max(words.length, 1);
                
                // Combined semantic score
                const semanticScore = (overlapScore * 1.5) + (proximityScore * 2) + (density * 5);
                
                if (semanticScore > 1) {
                    results.push({
                        content: paragraph,
                        semantic_score: semanticScore,
                        overlap: commonWords.length,
                        proximity: proximityScore,
                        density: density
                    });
                }
            }
            
            results.sort((a, b) => b.semantic_score - a.semantic_score);
            return results.slice(0, 5);
        }

        // ============================================
        // 4. HYBRID SEARCH (Enhanced)
        // ============================================
        function hybridSearch(query, sources) {
            const queryLower = query.toLowerCase();
            const queryWords = queryLower.split(/\s+/).filter(w => w.length > 2);
            const stopWords = ['the', 'is', 'are', 'was', 'were', 'and', 'or', 'for', 'with', 'this', 'that', 'from', 'for'];

            let results = [];

            for (const source of sources) {
                const content = source.content || '';
                const paragraphs = content.split('\n\n');
                
                // Get semantic results for this source
                const semanticResults = semanticSearch(query, paragraphs, source.source_name);
                
                // Calculate authority score
                const authority = calculateAuthorityScore(source.source_name, content, query);

                for (const paragraph of paragraphs) {
                    const lower = paragraph.toLowerCase();
                    
                    // 1. Keyword Score
                    let keywordScore = 0;
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

                    // 2. Semantic Score (from semantic search results)
                    let semanticScore = 0;
                    const semanticMatch = semanticResults.find(r => r.content === paragraph);
                    if (semanticMatch) {
                        semanticScore = semanticMatch.semantic_score;
                    }

                    // 3. Authority Score
                    const authorityScore = authority * 10;

                    // 4. Context Score (paragraph position matters)
                    const paragraphIndex = paragraphs.indexOf(paragraph);
                    const contextScore = Math.max(0, 1 - (paragraphIndex / paragraphs.length) * 0.5);

                    // Combined weighted score
                    const totalScore = (keywordScore * 0.35) + 
                                      (semanticScore * 0.35) + 
                                      (authorityScore * 0.2) + 
                                      (contextScore * 5);

                    if (totalScore > 1) {
                        results.push({
                            source_name: source.source_name,
                            url: source.url,
                            title: source.title,
                            author: source.author,
                            date: source.date,
                            content: paragraph,
                            score: totalScore,
                            keyword_score: keywordScore,
                            semantic_score: semanticScore,
                            authority_score: authorityScore,
                            authority: authority,
                            context_score: contextScore
                        });
                    }
                }
            }

            results.sort((a, b) => b.score - a.score);
            return results;
        }

        // ============================================
        // 5. RATE LIMITING (Token Bucket)
        // ============================================
        class TokenBucket {
            constructor(capacity = 10, refillRate = 1, refillInterval = 60000) {
                this.capacity = capacity;
                this.tokens = capacity;
                this.refillRate = refillRate;
                this.refillInterval = refillInterval;
                this.lastRefill = Date.now();
            }
            
            refill() {
                const now = Date.now();
                const timePassed = now - this.lastRefill;
                const refillAmount = Math.floor(timePassed / this.refillInterval) * this.refillRate;
                this.tokens = Math.min(this.capacity, this.tokens + refillAmount);
                this.lastRefill = now;
            }
            
            consume(tokens = 1) {
                this.refill();
                if (this.tokens >= tokens) {
                    this.tokens -= tokens;
                    return true;
                }
                return false;
            }
        }

        // User-based rate limiting
        const rateLimiters = new Map();
        
        function getRateLimiter(ip) {
            if (!rateLimiters.has(ip)) {
                rateLimiters.set(ip, new TokenBucket(10, 1, 60000));
            }
            return rateLimiters.get(ip);
        }

        const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
        const limiter = getRateLimiter(clientIp);
        if (!limiter.consume(1)) {
            console.warn(`🚫 Rate limit exceeded for ${clientIp}`);
            return res.status(429).json({
                error: 'Rate limit exceeded',
                retryAfter: Math.ceil((Date.now() - limiter.lastRefill) / 1000),
                limit: limiter.capacity,
                message: 'Too many requests. Please wait a moment and try again.'
            });
        }

        // ============================================
        // 6. PERFORMANCE METRICS
        // ============================================
        const metrics = {
            totalRequests: 0,
            averageResponseTime: 0,
            errorRate: 0,
            lastReset: Date.now()
        };

        function trackPerformance(duration, success) {
            metrics.totalRequests++;
            metrics.averageResponseTime = (metrics.averageResponseTime * (metrics.totalRequests - 1) + duration) / metrics.totalRequests;
            if (!success) {
                metrics.errorRate = (metrics.errorRate * (metrics.totalRequests - 1) + 1) / metrics.totalRequests;
            }
        }

        // ============================================
        // 7. EMBEDDED DATA
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
        // 8. SEARCH EXECUTION
        // ============================================
        const allResults = hybridSearch(query, data.sources);
        console.log(`📊 Found ${allResults.length} total matches`);

        let topResults;
        if (queryType === 'analytical' || queryType === 'comparative' || queryType === 'exploratory') {
            // For complex queries, get more sources
            topResults = allResults.slice(0, 5);
            console.log(`🏆 Using ${topResults.length} sources for ${queryType} query`);
        } else {
            // For factual and summarization queries, get the top 3
            topResults = allResults.slice(0, 3);
            console.log(`🏆 Using ${topResults.length} sources for ${queryType} query`);
        }

        // ============================================
        // 9. HANDLE NO RESULTS
        // ============================================
        if (topResults.length === 0) {
            return res.status(200).json({
                response: '🔍 **No matching content found.**\n\nTry asking about:\n- AI tools and platforms\n- ChatGPT, Claude, Gemini, or Grok\n- AI strategy and industry trends\n- Specific AI models or features',
                sources: [],
                metadata: {
                    total_sources: data.total_sources || 0,
                    matches_found: 0,
                    last_updated: data.last_updated || 'Unknown',
                    ai_generated: false,
                    query_type: queryType,
                    query_confidence: queryClassification.confidence
                }
            });
        }

        // ============================================
        // 10. GROQ GENERATION WITH RETRY
        // ============================================
        let aiAnswer = null;
        let aiError = null;
        const groqKey = process.env.GROQ_API_KEY;

        async function callGroqWithRetry(context, query, queryType, maxRetries = 3) {
            let lastError = null;
            
            for (let attempt = 1; attempt <= maxRetries; attempt++) {
                try {
                    console.log(`🔄 Groq attempt ${attempt}/${maxRetries}`);
                    
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
                                    content: queryType === 'analytical' || queryType === 'comparative' || queryType === 'exploratory'
                                        ? 'You are a senior marketing analyst. Synthesize information from multiple sources. Provide a comprehensive, balanced answer with key insights and actionable recommendations.'
                                        : 'You are a senior marketing analyst. Answer based ONLY on the provided context. Be concise, accurate, and factual.'
                                },
                                {
                                    role: 'user',
                                    content: `CONTEXT:\n${context}\n\nQUESTION: ${query}\n\n${queryType === 'analytical' || queryType === 'comparative' ? 'Synthesize the key insights from all sources and provide a structured analysis:' : queryType === 'exploratory' ? 'Explore this question with reasoning from the available context:' : 'Answer concisely with key points from the context:'}`
                                }
                            ],
                            temperature: queryType === 'analytical' ? 0.3 : queryType === 'comparative' ? 0.25 : 0.2,
                            max_tokens: 600,
                        })
                    });

                    if (response.ok) {
                        const groqData = await response.json();
                        console.log(`✅ Groq succeeded on attempt ${attempt}`);
                        return groqData.choices?.[0]?.message?.content || null;
                    }

                    const errorText = await response.text();
                    console.warn(`⚠️ Groq attempt ${attempt} failed: ${response.status} - ${errorText}`);
                    lastError = { status: response.status, message: errorText };

                    if (response.status === 429) {
                        const waitTime = attempt * 1000;
                        console.log(`⏳ Rate limited, waiting ${waitTime}ms...`);
                        await new Promise(resolve => setTimeout(resolve, waitTime));
                        continue;
                    }

                    break;

                } catch (error) {
                    console.error(`❌ Groq attempt ${attempt} error:`, error.message);
                    lastError = { message: error.message };
                    if (attempt === maxRetries) break;
                    await new Promise(resolve => setTimeout(resolve, attempt * 1000));
                }
            }

            console.error(`❌ All ${maxRetries} Groq attempts failed`);
            return null;
        }

        if (groqKey && topResults.length > 0) {
            const context = topResults.map((r, i) => 
                `Source ${i+1} (${r.source_name}): ${r.content}`
            ).join('\n\n');

            aiAnswer = await callGroqWithRetry(context, query, queryType);
            
            if (aiAnswer) {
                console.log(`✅ AI answer generated (${aiAnswer.length} chars)`);
            } else {
                aiError = { message: 'All Groq attempts failed' };
            }
        }

        // ============================================
        // 11. BUILD RESPONSE
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
        trackPerformance(duration, true);
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
                query_confidence: queryClassification.confidence,
                processing_time_ms: duration,
                avg_response_time: metrics.averageResponseTime.toFixed(0),
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
