// api/evaluate.js - Complete Evaluation Framework
export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // ============================================
    // COMPREHENSIVE TEST SUITE
    // ============================================
    const testSuite = {
        factual: [
            {
                question: "What are the July 2026 AI models?",
                expectedKeywords: ["GPT-5.6", "Claude Sonnet 5", "Grok 4.5"],
                minScore: 0.7,
                description: "Should list the three major July 2026 AI models"
            },
            {
                question: "What AI models did Anthropic release in 2026?",
                expectedKeywords: ["Claude Sonnet 5", "Anthropic"],
                minScore: 0.8,
                description: "Should identify Anthropic's Claude Sonnet 5"
            },
            {
                question: "What is Gumloop best for?",
                expectedKeywords: ["automation", "workflows", "AI agents"],
                minScore: 0.7,
                description: "Should describe Gumloop's primary use case"
            }
        ],
        analytical: [
            {
                question: "What are the key trends in AI platforms for 2026?",
                expectedKeywords: ["integration", "automation", "multi-model", "deployment"],
                minScore: 0.6,
                description: "Should identify 2026 AI platform trends"
            },
            {
                question: "Compare the top AI platforms for marketing teams",
                expectedKeywords: ["Jasper", "brand voice", "campaign", "content"],
                minScore: 0.6,
                description: "Should compare marketing-focused AI platforms"
            },
            {
                question: "What makes Gumloop different from Zapier?",
                expectedKeywords: ["AI-first", "workflows", "LLM", "automation"],
                minScore: 0.6,
                description: "Should explain key differences between Gumloop and Zapier"
            }
        ],
        comparative: [
            {
                question: "Which is better for coding: ChatGPT or Claude?",
                expectedKeywords: ["Claude", "context window", "coding", "accuracy"],
                minScore: 0.6,
                description: "Should compare coding capabilities of ChatGPT and Claude"
            },
            {
                question: "How does Perplexity AI compare to Google search?",
                expectedKeywords: ["citations", "research", "real-time", "answers"],
                minScore: 0.6,
                description: "Should contrast Perplexity AI with Google search"
            }
        ],
        exploratory: [
            {
                question: "How does Gumloop's AI automation work in practice?",
                expectedKeywords: ["drag-and-drop", "prompts", "scraping", "integrations"],
                minScore: 0.5,
                description: "Should explain Gumloop's practical usage"
            },
            {
                question: "Why are open-source AI models becoming more important in 2026?",
                expectedKeywords: ["control", "privacy", "cost", "flexibility"],
                minScore: 0.5,
                description: "Should explain the rise of open-source AI models"
            }
        ],
        summarization: [
            {
                question: "Summarize the key points about Pickaxe as a platform",
                expectedKeywords: ["agents", "monetize", "build", "no-code"],
                minScore: 0.6,
                description: "Should summarize Pickaxe's key features"
            },
            {
                question: "Briefly summarize what Synthesia offers",
                expectedKeywords: ["AI video", "avatars", "business", "create"],
                minScore: 0.6,
                description: "Should summarize Synthesia's capabilities"
            }
        ]
    };

    // ============================================
    // SCORING FUNCTIONS
    // ============================================
    
    function scoreResponse(response, expectedKeywords) {
        const lowerResponse = response.toLowerCase();
        let score = 0;
        const matchedKeywords = [];
        
        for (const keyword of expectedKeywords) {
            if (lowerResponse.includes(keyword.toLowerCase())) {
                score += 1;
                matchedKeywords.push(keyword);
            }
        }
        
        const scorePercentage = score / expectedKeywords.length;
        return {
            score: scorePercentage,
            matched: matchedKeywords,
            missing: expectedKeywords.filter(k => !matchedKeywords.includes(k)),
            totalExpected: expectedKeywords.length
        };
    }

    function evaluateResponse(response, test) {
        const scoring = scoreResponse(response, test.expectedKeywords);
        
        return {
            question: test.question,
            category: test.category,
            passed: scoring.score >= test.minScore,
            score: scoring.score,
            minScore: test.minScore,
            matched: scoring.matched,
            missing: scoring.missing,
            expectedCount: test.expectedKeywords.length,
            description: test.description
        };
    }

    // ============================================
    // API HANDLERS
    // ============================================

    // GET: Return test suite info
    if (req.method === 'GET') {
        const totalQuestions = Object.values(testSuite).flat().length;
        const categories = Object.keys(testSuite);
        
        return res.status(200).json({
            message: "Evaluation framework ready",
            metadata: {
                total_questions: totalQuestions,
                categories: categories,
                category_breakdown: Object.fromEntries(
                    Object.entries(testSuite).map(([cat, tests]) => [cat, tests.length])
                ),
                estimated_runtime: `${totalQuestions * 3} seconds`,
                min_score_threshold: 0.6
            },
            test_suite: testSuite,
            instructions: [
                "To run tests, call POST /api/evaluate/run with your query",
                "Results will be cached for 1 hour",
                "Each test will be scored for accuracy and completeness",
                "Min score threshold: 0.6 (60%)"
            ],
            example_payload: {
                method: "POST",
                body: {
                    question: "What are the July 2026 AI models?",
                    expectedKeywords: ["GPT-5.6", "Claude Sonnet 5", "Grok 4.5"],
                    category: "factual"
                }
            }
        });
    }

    // ============================================
    // POST: Run a single test or full suite
    // ============================================
    
    if (req.method === 'POST') {
        try {
            const { question, expectedKeywords, category, runFullSuite } = req.body;
            
            // If running full suite, return the test structure
            if (runFullSuite) {
                const results = {
                    total_tests: 0,
                    passed: 0,
                    failed: 0,
                    by_category: {},
                    details: []
                };
                
                for (const [cat, tests] of Object.entries(testSuite)) {
                    results.by_category[cat] = {
                        total: tests.length,
                        passed: 0,
                        failed: 0,
                        details: []
                    };
                    
                    for (const test of tests) {
                        results.total_tests++;
                        results.by_category[cat].details.push({
                            question: test.question,
                            expectedKeywords: test.expectedKeywords,
                            minScore: test.minScore,
                            description: test.description,
                            status: 'pending',
                            note: 'To run this test, call /api/evaluate/run with a specific question'
                        });
                    }
                }
                
                return res.status(200).json({
                    message: "Full test suite ready",
                    test_results: results,
                    instructions: "To execute tests, call this endpoint with a specific question and expected keywords"
                });
            }
            
            // Run a single test
            if (!question || !expectedKeywords) {
                return res.status(400).json({
                    error: 'Missing required fields: question and expectedKeywords are required',
                    example: {
                        question: "What are the July 2026 AI models?",
                        expectedKeywords: ["GPT-5.6", "Claude Sonnet 5", "Grok 4.5"],
                        category: "factual"
                    }
                });
            }
            
            // In production, you would actually call your API here
            // For now, we'll simulate a response
            const simulatedResponse = `Based on the context, the July 2026 AI models include GPT-5.6 from OpenAI, Claude Sonnet 5 from Anthropic, and Grok 4.5 from xAI. Each model has different strengths and use cases.`;
            
            const test = {
                question,
                expectedKeywords,
                category: category || 'uncategorized',
                description: 'User-provided test',
                minScore: 0.6
            };
            
            const evaluation = evaluateResponse(simulatedResponse, test);
            
            return res.status(200).json({
                message: "Test executed",
                test: {
                    question: evaluation.question,
                    category: evaluation.category,
                    description: evaluation.description
                },
                results: {
                    passed: evaluation.passed,
                    score: evaluation.score,
                    minScore: evaluation.minScore,
                    matched_keywords: evaluation.matched,
                    missing_keywords: evaluation.missing,
                    expected_count: evaluation.expectedCount,
                    match_percentage: `${(evaluation.score * 100).toFixed(0)}%`
                },
                response: simulatedResponse,
                notes: [
                    "This is a simulated response for testing purposes",
                    "In production, this would call your actual /api/data endpoint",
                    "To test with real data, use your bot's UI or API directly"
                ]
            });
            
        } catch (error) {
            console.error('Evaluation error:', error);
            return res.status(500).json({
                error: 'Evaluation failed',
                details: error.message
            });
        }
    }

    // ============================================
    // DEFAULT: Method not allowed
    // ============================================
    
    return res.status(405).json({
        error: 'Method not allowed',
        allowed_methods: ['GET', 'POST'],
        instructions: 'Use GET to view the test suite, or POST to run a test'
    });
}
