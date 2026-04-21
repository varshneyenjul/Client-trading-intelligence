import { useState } from "react";//v2

const API_KEY = "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";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=IBM+Plex+Sans:wght@300;400;500&family=IBM+Plex+Mono:wght@400&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #080c12; }
  .app { min-height: 100vh; background: #080c12; font-family: 'IBM Plex Sans', sans-serif; color: #e2eaf4; padding: 40px 20px 80px; }
  .container { max-width: 860px; margin: 0 auto; }
  .tag { display: inline-flex; align-items: center; gap: 6px; font-family: 'IBM Plex Mono', monospace; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #38bdf8; background: rgba(56,189,248,0.1); border: 1px solid rgba(56,189,248,0.25); padding: 5px 12px; border-radius: 4px; margin-bottom: 16px; }
  .title { font-family: 'Syne', sans-serif; font-size: 40px; font-weight: 800; line-height: 1.1; margin-bottom: 10px; letter-spacing: -1px; }
  .title span { color: #38bdf8; }
  .sub { font-size: 14px; color: #6b8099; margin-bottom: 40px; }
  .modes { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px; }
  .mode { padding: 20px; border-radius: 10px; cursor: pointer; border: 1px solid rgba(255,255,255,0.06); background: #0e1520; transition: all 0.2s; }
  .mode:hover { border-color: rgba(56,189,248,0.3); }
  .mode.active-r { border-color: rgba(56,189,248,0.5); background: rgba(56,189,248,0.05); }
  .mode.active-p { border-color: rgba(248,113,113,0.5); background: rgba(248,113,113,0.05); }
  .mode-icon { font-size: 22px; margin-bottom: 8px; }
  .mode-title { font-family: 'Syne', sans-serif; font-size: 15px; font-weight: 700; margin-bottom: 4px; }
  .mode-desc { font-size: 12px; color: #6b8099; line-height: 1.5; }
  .panel { background: #0e1520; border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 24px; margin-bottom: 16px; }
  .label { font-family: 'IBM Plex Mono', monospace; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #6b8099; margin-bottom: 16px; }
  .flabel { font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: #2d4155; margin-bottom: 6px; }
  textarea, input { width: 100%; background: #131c2a; border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; color: #e2eaf4; font-family: 'IBM Plex Sans', sans-serif; font-size: 13px; padding: 10px 14px; outline: none; }
  textarea { resize: vertical; min-height: 130px; line-height: 1.6; font-family: 'IBM Plex Mono', monospace; font-size: 12px; }
  textarea::placeholder, input::placeholder { color: #2d4155; }
  .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 14px; }
  .chips { display: flex; flex-wrap: wrap; gap: 8px; }
  .chip { padding: 6px 14px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.06); font-family: 'IBM Plex Mono', monospace; font-size: 11px; cursor: pointer; color: #6b8099; background: transparent; transition: all 0.15s; }
  .chip.cr { background: rgba(56,189,248,0.1); border-color: rgba(56,189,248,0.3); color: #38bdf8; }
  .chip.cp { background: rgba(248,113,113,0.1); border-color: rgba(248,113,113,0.3); color: #f87171; }
  .btn { width: 100%; padding: 15px; border: none; border-radius: 10px; font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700; cursor: pointer; margin-top: 6px; transition: all 0.2s; }
  .btn.r { background: linear-gradient(135deg, #0ea5e9, #38bdf8); color: #080c12; }
  .btn.p { background: linear-gradient(135deg, #ef4444, #f87171); color: #080c12; }
  .btn:disabled { opacity: 0.4; cursor: not-allowed; }
  .out { background: rgba(56,189,248,0.03); border: 1px solid rgba(56,189,248,0.2); border-radius: 12px; padding: 24px; margin-top: 16px; animation: rise 0.3s ease; }
  .out.p { background: rgba(248,113,113,0.03); border-color: rgba(248,113,113,0.2); }
  @keyframes rise { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
  .out-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 8px; }
  .out-title { font-family: 'Syne', sans-serif; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }
  .out-title.r { color: #38bdf8; }
  .out-title.p { color: #f87171; }
  .out-text { font-size: 14px; line-height: 1.85; color: #a8bfd4; white-space: pre-wrap; font-weight: 300; }
  .copy-btn { background: transparent; border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; color: #6b8099; font-family: 'IBM Plex Mono', monospace; font-size: 11px; padding: 6px 12px; cursor: pointer; transition: all 0.2s; }
  .copy-btn:hover { color: #e2eaf4; }
  .copy-btn.ok { color: #34d399; border-color: rgba(52,211,153,0.3); }
  .loading { display: flex; align-items: center; gap: 10px; color: #6b8099; font-size: 13px; padding: 16px 0; }
  .dots { display: flex; gap: 4px; }
  .dot { width: 5px; height: 5px; border-radius: 50%; animation: pulse 1.2s ease infinite; }
  .dot.r { background: #38bdf8; }
  .dot.p { background: #f87171; }
  .dot:nth-child(2){animation-delay:0.2s} .dot:nth-child(3){animation-delay:0.4s}
  @keyframes pulse{0%,100%{opacity:0.2;transform:scale(0.7)}50%{opacity:1;transform:scale(1)}}
  .ev-list { margin-bottom: 18px; display: flex; flex-direction: column; gap: 8px; }
  .ev { display: flex; gap: 10px; align-items: flex-start; padding: 10px 14px; border-radius: 8px; background: rgba(248,113,113,0.08); border: 1px solid rgba(248,113,113,0.15); }
  .ev-dot { width: 7px; height: 7px; border-radius: 50%; background: #f87171; margin-top: 5px; flex-shrink: 0; }
  .ev-dot.medium { background: #fbbf24; }
  .ev-dot.low { background: #6b8099; }
  .ev.medium { background: rgba(251,191,36,0.06); border-color: rgba(251,191,36,0.15); }
  .ev.low { background: #131c2a; border-color: rgba(255,255,255,0.06); }
  .ev-text { font-size: 13px; color: #6b8099; line-height: 1.5; }
  .ev-label { font-family: 'IBM Plex Mono', monospace; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #f87171; margin-bottom: 10px; }
  @media(max-width:600px){.modes,.grid2{grid-template-columns:1fr}.title{font-size:30px}}
`;

const SEGMENTS = ["Retail", "Institutional", "High Net Worth", "Corporate"];
const TONES = ["Formal", "Semi-Formal", "Conversational"];

export default function App() {
  const [mode, setMode] = useState("reactive");
  const [tradeData, setTradeData] = useState("");
  const [clientName, setClientName] = useState("");
  const [segment, setSegment] = useState("Retail");
  const [tone, setTone] = useState("Semi-Formal");
  const [clientQuery, setClientQuery] = useState("");
  const [output, setOutput] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const cc = (active) => `chip ${active ? (mode === "reactive" ? "cr" : "cp") : ""}`;

  const handleGenerate = async () => {
    if (!tradeData.trim()) return;
    setLoading(true);
    setOutput(null);
    setEvents([]);

    const systemPrompt = mode === "reactive"
      ? `You are a senior relationship manager at a financial services brokerage. Write a clear, reassuring, plain-English email reply to a client about their trading account. Tone: ${tone.toLowerCase()}. Client segment: ${segment}${clientName ? `, name: ${clientName}` : ""}. No jargon. End with a clear next step. Include Subject line.`
      : `You are a client alert system for a brokerage. Analyze the trading data and return ONLY a JSON object like this: {"events":[{"severity":"high","description":"..."}],"email":"full alert email with Subject line"}. Tone: ${tone.toLowerCase()}. Segment: ${segment}${clientName ? `, name: ${clientName}` : ""}. Be calm and solution-focused.`;

    const userPrompt = mode === "reactive"
      ? `Trading data:\n${tradeData}\n\n${clientQuery ? `Client question: "${clientQuery}"\n\n` : ""}Write a professional reply.`
      : `Analyze this trading data and return JSON:\n${tradeData}`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true"
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-5",
          max_tokens: 1000,
          system: systemPrompt,
          messages: [{ role: "user", content: userPrompt }]
        })
      });

      const data = await res.json();
      const raw = data?.content?.[0]?.text || "";

      if (mode === "proactive") {
        try {
          const clean = raw.replace(/```json|```/g, "").trim();
          const parsed = JSON.parse(clean);
          setEvents(parsed.events || []);
          setOutput(parsed.email || raw);
        } catch {
          setOutput(raw);
        }
      } else {
        setOutput(raw);
      }
    } catch (err) {
      setOutput("Something went wrong: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{css}</style>
      <div className="app">
        <div className="container">
          <div className="tag">Trading Intelligence</div>
          <h1 className="title">Client <span>Trading</span><br />Intelligence</h1>
          <p className="sub">Reactive replies and proactive alerts — built for financial services teams.</p>

          <div className="modes">
            <div className={`mode ${mode === "reactive" ? "active-r" : ""}`} onClick={() => { setMode("reactive"); setOutput(null); setEvents([]); }}>
              <div className="mode-icon">💬</div>
              <div className="mode-title">Reactive Reply</div>
              <div className="mode-desc">Client asks about their account. Generate a clear plain-English reply.</div>
            </div>
            <div className={`mode ${mode === "proactive" ? "active-p" : ""}`} onClick={() => { setMode("proactive"); setOutput(null); setEvents([]); }}>
              <div className="mode-icon">🔔</div>
              <div className="mode-title">Proactive Alert</div>
              <div className="mode-desc">AI scans activity, detects significant events, drafts an alert before the client calls.</div>
            </div>
          </div>

          <div className="panel">
            <div className="label">01 — Trading Data</div>
            <textarea value={tradeData} onChange={e => setTradeData(e.target.value)}
              placeholder="Paste client's trade history, account statement, or activity log..." />
          </div>

          <div className="panel">
            <div className="label">02 — Settings</div>
            <div className="grid2">
              <div>
                <div className="flabel">Client Name (optional)</div>
                <input type="text" placeholder="e.g. Ahmad Rashidi" value={clientName} onChange={e => setClientName(e.target.value)} />
              </div>
              {mode === "reactive" && (
                <div>
                  <div className="flabel">Client's Question (optional)</div>
                  <input type="text" placeholder="e.g. Why was my position closed?" value={clientQuery} onChange={e => setClientQuery(e.target.value)} />
                </div>
              )}
            </div>
            <div style={{marginBottom:"14px"}}>
              <div className="flabel" style={{marginBottom:"8px"}}>Client Segment</div>
              <div className="chips">{SEGMENTS.map(s => <button key={s} className={cc(segment===s)} onClick={()=>setSegment(s)}>{s}</button>)}</div>
            </div>
            <div>
              <div className="flabel" style={{marginBottom:"8px"}}>Tone</div>
              <div className="chips">{TONES.map(t => <button key={t} className={cc(tone===t)} onClick={()=>setTone(t)}>{t}</button>)}</div>
            </div>
          </div>

          <button className={`btn ${mode === "reactive" ? "r" : "p"}`} onClick={handleGenerate} disabled={loading || !tradeData.trim()}>
            {loading ? "Analysing..." : mode === "reactive" ? "Generate Client Reply →" : "Scan & Generate Alert →"}
          </button>

          {loading && (
            <div className={`out ${mode === "proactive" ? "p" : ""}`}>
              <div className="loading">
                <div className="dots">
                  <div className={`dot ${mode === "reactive" ? "r" : "p"}`}/>
                  <div className={`dot ${mode === "reactive" ? "r" : "p"}`}/>
                  <div className={`dot ${mode === "reactive" ? "r" : "p"}`}/>
                </div>
                {mode === "reactive" ? "Drafting reply..." : "Scanning for events..."}
              </div>
            </div>
          )}

          {!loading && output && (
            <div className={`out ${mode === "proactive" ? "p" : ""}`}>
              {events.length > 0 && (
                <>
                  <div className="ev-label">Detected Events</div>
                  <div className="ev-list">
                    {events.map((ev, i) => (
                      <div key={i} className={`ev ${ev.severity}`}>
                        <div className={`ev-dot ${ev.severity === "high" ? "" : ev.severity}`}/>
                        <div className="ev-text">{ev.description}</div>
                      </div>
                    ))}
                  </div>
                </>
              )}
              <div className="out-head">
                <div className={`out-title ${mode === "reactive" ? "r" : "p"}`}>
                  {mode === "reactive" ? "Generated Reply" : "Proactive Alert"}
                </div>
                <button className={`copy-btn ${copied ? "ok" : ""}`} onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(()=>setCopied(false),2000); }}>
                  {copied ? "✓ Copied" : "Copy"}
                </button>
              </div>
              <div className="out-text">{output}</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
