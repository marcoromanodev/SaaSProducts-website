const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const siteContext = `SaaS Productized Co is a B2B SaaS company providing software development, web design,
Web3.0 consulting, AI solutions, Google My Business setup, custom analytics, and ad management.`;

function resolveProviderConfig() {
    const provider = (process.env.AI_PROVIDER || 'openai').toLowerCase();
    const isOpenAI = provider === 'openai';
    const isXAI = provider === 'grok' || provider === 'xai';

    const endpoint = process.env.AI_ENDPOINT
        || (isOpenAI ? 'https://api.openai.com/v1/chat/completions' : '')
        || (isXAI ? 'https://api.x.ai/v1/chat/completions' : '');

    return {
        provider,
        endpoint,
        apiKey: process.env.AI_API_KEY || '',
        model: process.env.AI_MODEL || ''
    };
}

function buildPayload(message, model) {
    return {
        model,
        messages: [
            {
                role: 'system',
                content: `You are the SaaS Productized Co website assistant. Be friendly, concise, and helpful. Use this context when relevant: ${siteContext}`
            },
            { role: 'user', content: message }
        ],
        temperature: 0.6
    };
}

function extractReply(data) {
    return data?.choices?.[0]?.message?.content?.trim()
        || data?.choices?.[0]?.text?.trim()
        || '';
}

app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ error: 'Message is required.' });
        }

        const config = resolveProviderConfig();
        if (!config.apiKey || !config.model || !config.endpoint) {
            return res.status(503).json({ error: 'AI provider is not configured.' });
        }

        const response = await fetch(config.endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${config.apiKey}`
            },
            body: JSON.stringify(buildPayload(message, config.model))
        });

        if (!response.ok) {
            const errorText = await response.text();
            return res.status(response.status).json({ error: errorText || 'AI request failed.' });
        }

        const data = await response.json();
        const reply = extractReply(data);
        if (!reply) {
            return res.status(502).json({ error: 'No reply from AI provider.' });
        }

        return res.json({ reply });
    } catch (error) {
        return res.status(500).json({ error: 'Unexpected server error.' });
    }
});

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`AI server listening on port ${port}`);
});
