const https = require('https');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ result: 'Method not allowed' });
  }

  try {
    const { tradeData, clientName, segment, tone, mode, clientQuery } = req.body;

    const systemPrompt = mode === 'reactive'
      ? `You are a senior relationship manager at a financial services brokerage. Write a clear, reassuring email reply to a client about their trading account. Tone: ${tone}. Client segment: ${segment}${clientName ? `, name: ${clientName}` : ''}. No jargon. Include Subject line.`
      : `You are a client alert system. Analyze trading data and return ONLY this JSON: {"events":[{"severity":"high","description":"..."}],"email":"full alert email with Subject line"}. Tone: ${tone}. Segment: ${segment}${clientName ? `, name: ${clientName}` : ''}.`;

    const userPrompt = mode === 'reactive'
      ? `Trading data:\n${tradeData}\n\n${clientQuery ? `Client question: "${clientQuery}"\n\n` : ''}Write a professional reply.`
      : `Analyze this and return JSON:\n${tradeData}`;

    const payload = JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1000,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    });

    const result = await new Promise((resolve, reject) => {
      const options = {
        hostname: 'api.anthropic.com',
        path: '/v1/messages',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': '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',
          'anthropic-version': '2023-06-01',
          'Content-Length': Buffer.byteLength(payload),
        },
      };

      const request = https.request(options, (response) => {
        let data = '';
        response.on('data', (chunk) => { data += chunk; });
        response.on('end', () => { resolve(data); });
      });

      request.on('error', reject);
      request.write(payload);
      request.end();
    });

    const data = JSON.parse(result);
    const raw = data?.content?.[0]?.text || '';

    if (mode === 'proactive') {
      try {
        const clean = raw.replace(/```json|```/g, '').trim();
        const parsed = JSON.parse(clean);
        return res.status(200).json({ result: parsed.email || raw, events: parsed.events || [] });
      } catch {
        return res.status(200).json({ result: raw, events: [] });
      }
    }

    return res.status(200).json({ result: raw, events: [] });

  } catch (err) {
    return res.status(200).json({ result: 'Error: ' + err.message, events: [] });
  }
};
