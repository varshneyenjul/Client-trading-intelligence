export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ result: 'Method not allowed' });
  }

  const { tradeData, clientName, segment, tone, mode, clientQuery } = req.body;

  const systemPrompt = mode === 'reactive'
    ? `You are a senior relationship manager. Write a clear email reply about their trading account. Tone: ${tone}. Segment: ${segment}${clientName ? `, name: ${clientName}` : ''}. Include Subject line.`
    : `Analyze trading data. Return ONLY JSON: {"events":[{"severity":"high","description":"..."}],"email":"alert email with Subject"}. Tone: ${tone}. Segment: ${segment}${clientName ? `, name: ${clientName}` : ''}.`;

  const userPrompt = mode === 'reactive'
    ? `Trading data:\n${tradeData}\n\n${clientQuery ? `Question: "${clientQuery}"\n\n` : ''}Write a reply.`
    : `Return JSON for:\n${tradeData}`;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,',
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1000,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    }),
  });

  const data = await response.json();
  const raw = data?.content?.[0]?.text || '';

  if (mode === 'proactive') {
    try {
      const parsed = JSON.parse(raw.replace(/```json|```/g, '').trim());
      return res.status(200).json({ result: parsed.email || raw, events: parsed.events || [] });
    } catch {
      return res.status(200).json({ result: raw, events: [] });
    }
  }

  return res.status(200).json({ result: raw, events: [] });
}
