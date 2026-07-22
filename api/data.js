// api/data.js - Self-contained version with embedded data
export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
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

        // ============================================
        // EMBEDDED SCRAPED DATA
        // ============================================
        const data = {
            "title": "GPT-5.6, CLAUDE SONNET 5 AND GROK 4.5: WHAT THE JULY 2026 AI MODEL WAVE MEANS FOR YOUR BUSINESS",
            "author": "Yuvraj Raulji",
            "date": "July 12, 2026",
            "url": "https://www.rauljitechnologies.com/blog/july-2026-ai-model-wave/",
            "word_count": 1200,
            "sections": [
                "What Actually Launched in the July 2026 Model Wave",
                "Why This Pace Is the Real Story",
                "The Open-Source Surge Behind the Headlines",
                "What It Means for Your Business",
                "How to Turn a Fast Market Into an Advantage",
                "Common Mistakes to Avoid"
            ],
            "content": `The middle of 2026 has been one of the busiest stretches the AI industry has ever seen. In a matter of weeks, Anthropic shipped Claude Sonnet 5, OpenAI began rolling out its GPT-5.6 family, and xAI released Grok 4.5, while a wave of open-source models kept pace right behind them. For business leaders, the headlines are exciting and a little overwhelming. The real question is not which model won this month, it is what this pace of change means for the decisions you are making about AI right now.

Three frontier releases anchored the last few weeks, each aimed at a slightly different strength. Understanding what each one is good at matters more than the leaderboard position, because the right model depends on the job you are giving it.

Model | Maker | Released | Where it stands out
Claude Sonnet 5 | Anthropic | June 30, 2026 | Balanced reasoning, coding, and long, reliable agent runs
GPT-5.6 (Sol, Terra, Luna) | OpenAI | Rolling out from late June | Top-end benchmark scores, staged access to trusted partners first
Grok 4.5 | xAI | July 8, 2026 | Real-time data and fast conversational responses

The July 2026 wave did not crown a single winner. It confirmed that several frontier models are now close in quality, so your advantage comes from how you use them, not which logo you pick.

While the frontier labs dominated the news, open-source models quietly closed much of the gap. Releases such as GLM-5.2, DeepSeek V4, Kimi K2.7, MiniMax M3, and Qwen 3.6 now deliver strong reasoning, coding, and long-context performance under permissive licences. For many business workloads, an open model you can host and control is now a genuine alternative to a closed API, not a compromise.

The teams that benefit most from this pace are not the ones chasing every release. They are the ones who built a foundation that makes switching cheap and testing routine. Here is the loop we recommend.

1. Abstract the model. Put every model behind a single internal interface so swapping providers is a config change, not a rewrite.
2. Define your own eval. Build a small test set from real tasks and real data.
3. Route by job. Send each task to the model that fits it best on quality, cost, and privacy.
4. Watch cost and latency. A better score is not worth a slower, pricier experience.
5. Revisit on a schedule. Re-run your eval every quarter or when a major model ships.`
        };

        // If no query, return the full data
        if (!query) {
            return res.status(200).json({
                type: 'scraped',
                data: data
            });
        }

        // --- Search logic ---
        const queryLower = query.toLowerCase();
        const content = data.content || '';
        const paragraphs = content.split('\n\n');

        // Find relevant paragraphs
        const matches = paragraphs.filter(p =>
            p.toLowerCase().includes(queryLower)
        );

        const results = matches.length > 0 ? matches : [content.substring(0, 400)];
        const displayContent = results.slice(0, 3).join('\n\n---\n\n');

        const responseText = `**📊 Answer based on the article:**\n\n` +
            `**Title:** ${data.title}\n` +
            `**Author:** ${data.author}\n` +
            `**Date:** ${data.date}\n` +
            `**Words:** ${data.word_count}\n\n` +
            displayContent;

        return res.status(200).json({
            response: responseText,
            sources: results.slice(0, 3).map((chunk, i) => ({
                source: data.url,
                score: 0.95 - (i * 0.05),
                chunk: chunk.substring(0, 200) + '...'
            })),
            metadata: {
                title: data.title,
                author: data.author,
                date: data.date,
                word_count: data.word_count,
                sections: data.sections?.slice(0, 5) || []
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
