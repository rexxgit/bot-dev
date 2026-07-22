// api/trigger.js
export default async function handler(req, res) {
    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { query } = req.body;
    if (!query) {
        return res.status(400).json({ error: 'Query is required' });
    }

    const token = process.env.BOT_TOKEN;
    if (!token) {
        return res.status(500).json({ error: 'BOT_TOKEN not configured' });
    }

    try {
        const response = await fetch(
            'https://api.github.com/repos/rexxgit/bot-dev/dispatches',
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/vnd.github.v3+json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    event_type: 'ask-question',
                    client_payload: { query }
                })
            }
        );

        if (!response.ok) {
            throw new Error('Failed to trigger workflow');
        }

        return res.status(200).json({
            success: true,
            message: 'Workflow triggered successfully'
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message || 'Failed to trigger workflow'
        });
    }
}
