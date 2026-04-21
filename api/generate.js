export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { tradeData, clientName, segment, tone, mode, clientQuery } = req.body;

  let systemPrompt = '';
  let userPrompt = '';

  if (mode === 'reactive') {
    systemPrompt = `You are a senior relationship manager at a financial services brokerage.
A client has reached out with a question about their account or trading history.
Your job is to read their trading data and write a clear, reassuring, plain-English reply.

Rules:
- Tone: ${tone.toLowerCase()}
- Client segment: ${segment}${clientName ? `, client name: ${clientName}` : ''}
- Never use internal system codes or jargon
- Explain what happened clearly — no vague language
- Be empathetic if there are losses — acknowledge without over-apologising
- End with a clear next step or offer to help further
- Format as a ready-to-send email reply (include Subject line)`;

    userPrompt = `Client's trading data / account history:\n${tradeData}\n\n${clientQuery ? `Client's question: "${clientQuery}"\n\n` : ''}Write a clear, professional reply to this client.`;

  } else {
    systemPrompt = `You are an intelligent client alert system for a financial services brokerage.
Your job is to:
1. SCAN the trading data and identify significant events the client should be alerted about
2. Return a JSON object in this exact format:
{
  "events": [
    {"severity": "high|medium|low", "description": "plain English description of event"}
  ],
  "email": "the full proactive client alert email to send (include Subject line)"
}

Significant events include: large losses, margin calls, positions auto-closed, unusual activity, approaching margin limits, account balance drops >10%, multiple losing trades in sequence.

Rules for the email:
- Tone: ${tone.toLowerCase()}
- Client segment: ${segment}${clientName ? `, client name: ${clientName}` : ''}
- Be proactive and informative — client hasn't asked yet
- Be calm and solution-focused, never alarming
- Suggest clear next steps
- Never use internal jargon

Return ONLY the JSON object, no other text.`;

    userPrompt = `Trading data to analyse:\n${tradeData}`;
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ''x-api-key': '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',
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }],
      }),
    });

    const data = await response.json();
    const raw = data.content?.map(b => b.text || '').join('') || '';

    if (mode === 'proactive') {
      try {
        const clean = raw.replace(/```json|```/g, '').trim();
        const parsed = JSON.parse(clean);
        res.status(200).json({ result: parsed.email, events: parsed.events || [] });
      } catch {
        res.status(200).json({ result: raw, events: [] });
      }
    } else {
      res.status(200).json({ result: raw, events: [] });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate response.' });
  }
}
