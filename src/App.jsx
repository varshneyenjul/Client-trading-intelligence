import { useState, useEffect } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=IBM+Plex+Mono:wght@300;400;500&family=IBM+Plex+Sans:wght@300;400;500&display=swap');`;

const css = `
  ${FONTS}
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #080c12;
    --surface: #0e1520;
    --surface2: #131c2a;
    --border: rgba(56,189,248,0.08);
    --border-active: rgba(56,189,248,0.25);
    --accent: #38bdf8;
    --accent-dim: rgba(56,189,248,0.12);
    --alert: #f87171;
    --alert-dim: rgba(248,113,113,0.1);
    --success: #34d399;
    --success-dim: rgba(52,211,153,0.1);
    --text: #e2eaf4;
    --text-mid: #6b8099;
    --text-dim: #2d4155;
    --mono: 'IBM Plex Mono', monospace;
    --sans: 'IBM Plex Sans', sans-serif;
    --display: 'Syne', sans-serif;
  }

  .app {
    min-height: 100vh;
    background: var(--bg);
    background-image:
      radial-gradient(ellipse at 0% 0%, rgba(56,189,248,0.04) 0%, transparent 50%),
      radial-gradient(ellipse at 100% 100%, rgba(99,102,241,0.05) 0%, transparent 50%),
      linear-gradient(180deg, transparent 0%, rgba(56,189,248,0.01) 100%);
    font-family: var(--sans);
    color: var(--text);
    padding: 40px 20px 80px;
  }

  .container { max-width: 900px; margin: 0 auto; }

  /* HEADER */
  .header { margin-bottom: 44px; position: relative; }

  .header-tag {
    display: inline-flex; align-items: center; gap: 6px;
    font-family: var(--mono); font-size: 10px; letter-spacing: 2px;
    text-transform: uppercase; color: var(--accent);
    background: var(--accent-dim); border: 1px solid var(--border-active);
    padding: 5px 12px; border-radius: 4px; margin-bottom: 16px;
  }

  .header-tag::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: var(--accent); animation: blink 2s ease infinite; }

  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }

  .title {
    font-family: var(--display); font-size: 42px; font-weight: 800;
    color: var(--text); line-height: 1.1; margin-bottom: 10px;
    letter-spacing: -1px;
  }

  .title span { color: var(--accent); }

  .subtitle { font-size: 14px; color: var(--text-mid); font-weight: 300; line-height: 1.6; max-width: 520px; }

  /* MODE SELECTOR */
  .mode-selector {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 12px; margin-bottom: 24px;
  }

  .mode-card {
    padding: 20px; border-radius: 10px; cursor: pointer;
    border: 1px solid var(--border); background: var(--surface);
    transition: all 0.2s; position: relative; overflow: hidden;
  }

  .mode-card:hover { border-color: var(--border-active); }

  .mode-card.active.reactive {
    border-color: rgba(56,189,248,0.4);
    background: rgba(56,189,248,0.05);
  }

  .mode-card.active.proactive {
    border-color: rgba(248,113,113,0.4);
    background: rgba(248,113,113,0.05);
  }

  .mode-card.active .mode-indicator { opacity: 1; }

  .mode-indicator {
    position: absolute; top: 0; left: 0; right: 0; height: 2px;
    opacity: 0; transition: opacity 0.2s;
  }

  .mode-indicator.reactive { background: linear-gradient(90deg, var(--accent), transparent); }
  .mode-indicator.proactive { background: linear-gradient(90deg, var(--alert), transparent); }

  .mode-icon { font-size: 22px; margin-bottom: 10px; }

  .mode-title {
    font-family: var(--display); font-size: 15px; font-weight: 700;
    margin-bottom: 4px; color: var(--text);
  }

  .mode-desc { font-size: 12px; color: var(--text-mid); line-height: 1.5; }

  .mode-tag {
    display: inline-block; margin-top: 10px;
    font-family: var(--mono); font-size: 9px; letter-spacing: 1.5px;
    text-transform: uppercase; padding: 3px 8px; border-radius: 3px;
  }

  .reactive .mode-tag { background: var(--accent-dim); color: var(--accent); }
  .proactive .mode-tag { background: var(--alert-dim); color: var(--alert); }

  /* PANEL */
  .panel {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 12px; padding: 24px; margin-bottom: 16px;
  }

  .panel-label {
    font-family: var(--mono); font-size: 10px; letter-spacing: 2px;
    text-transform: uppercase; color: var(--text-mid);
    margin-bottom: 16px; display: flex; align-items: center; gap: 8px;
  }

  .panel-label::after {
    content: ''; flex: 1; height: 1px; background: var(--border);
  }

  .field-label {
    font-family: var(--mono); font-size: 11px; color: var(--text-dim);
    margin-bottom: 6px; letter-spacing: 0.5px;
  }

  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px; }

  select, textarea, input[type="text"] {
    width: 100%; background: var(--surface2);
    border: 1px solid var(--border); border-radius: 8px;
    color: var(--text); font-family: var(--sans);
    font-size: 13px; padding: 10px 14px; outline: none;
    transition: border-color 0.2s; appearance: none;
  }

  select:focus, textarea:focus, input[type="text"]:focus {
    border-color: var(--border-active);
  }

  select option { background: #0e1520; }
  textarea { resize: vertical; min-height: 140px; line-height: 1.65; font-family: var(--mono); font-size: 12px; }
  textarea::placeholder, input::placeholder { color: var(--text-dim); }

  .chips { display: flex; flex-wrap: wrap; gap: 8px; }

  .chip {
    padding: 6px 14px; border-radius: 6px;
    border: 1px solid var(--border);
    font-family: var(--mono); font-size: 11px; cursor: pointer;
    transition: all 0.15s; color: var(--text-mid); background: transparent;
    letter-spacing: 0.5px;
  }

  .chip:hover { border-color: var(--border-active); color: var(--accent); }

  .chip.active-reactive {
    background: var(--accent-dim); border-color: rgba(56,189,248,0.35); color: var(--accent);
  }

  .chip.active-proactive {
    background: var(--alert-dim); border-color: rgba(248,113,113,0.35); color: var(--alert);
  }

  /* GENERATE BUTTON */
  .gen-btn {
    width: 100%; padding: 15px; border: none; border-radius: 10px;
    font-family: var(--display); font-size: 14px; font-weight: 700;
    letter-spacing: 0.5px; cursor: pointer; transition: all 0.2s; margin-top: 4px;
  }

  .gen-btn.reactive {
    background: linear-gradient(135deg, #0ea5e9, #38bdf8);
    color: #080c12;
  }

  .gen-btn.proactive {
    background: linear-gradient(135deg, #ef4444, #f87171);
    color: #080c12;
  }

  .gen-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(0,0,0,0.3); }
  .gen-btn:disabled { opacity: 0.4; cursor: not-allowed; }

  /* OUTPUT */
  .output-panel {
    border-radius: 12px; padding: 24px; margin-top: 16px;
    animation: rise 0.35s ease;
  }

  .output-panel.reactive {
    background: rgba(56,189,248,0.03); border: 1px solid rgba(56,189,248,0.2);
  }

  .output-panel.proactive {
    background: rgba(248,113,113,0.03); border: 1px solid rgba(248,113,113,0.2);
  }

  @keyframes rise {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .output-header {
    display: flex; justify-content: space-between;
    align-items: flex-start; margin-bottom: 18px; gap: 12px; flex-wrap: wrap;
  }

  .output-left { display: flex; flex-direction: column; gap: 8px; }

  .output-title {
    font-family: var(--display); font-size: 13px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 1px;
  }

  .output-title.reactive { color: var(--accent); }
  .output-title.proactive { color: var(--alert); }

  .output-tags { display: flex; gap: 6px; flex-wrap: wrap; }

  .otag {
    font-family: var(--mono); font-size: 9px; letter-spacing: 1.5px;
    text-transform: uppercase; padding: 3px 8px; border-radius: 3px;
  }

  .otag.reactive { background: var(--accent-dim); color: var(--accent); border: 1px solid rgba(56,189,248,0.2); }
  .otag.proactive { background: var(--alert-dim); color: var(--alert); border: 1px solid rgba(248,113,113,0.2); }

  .output-actions { display: flex; gap: 8px; }

  .act-btn {
    background: transparent; border: 1px solid var(--border);
    border-radius: 6px; color: var(--text-mid);
    font-family: var(--mono); font-size: 11px;
    padding: 6px 12px; cursor: pointer; transition: all 0.2s;
  }

  .act-btn:hover { color: var(--text); border-color: rgba(255,255,255,0.15); }
  .act-btn.ok { color: var(--success); border-color: rgba(52,211,153,0.3); }

  .output-text {
    font-family: var(--sans); font-size: 14px; line-height: 1.85;
    color: #a8bfd4; white-space: pre-wrap; font-weight: 300;
  }

  .output-editable {
    width: 100%; font-family: var(--sans); font-size: 14px;
    line-height: 1.85; color: #a8bfd4; font-weight: 300;
    background: rgba(255,255,255,0.02); border: 1px solid var(--border-active);
    border-radius: 8px; padding: 14px; min-height: 180px; outline: none; resize: vertical;
  }

  /* EVENTS */
  .events-header {
    font-family: var(--mono); font-size: 10px; letter-spacing: 2px;
    text-transform: uppercase; color: var(--alert);
    margin-bottom: 12px; display: flex; align-items: center; gap: 8px;
  }

  .events-header::after { content: ''; flex: 1; height: 1px; background: rgba(248,113,113,0.15); }

  .event-list { display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px; }

  .event-item {
    display: flex; align-items: flex-start; gap: 10px;
    padding: 10px 14px; border-radius: 8px;
    background: var(--alert-dim); border: 1px solid rgba(248,113,113,0.15);
  }

  .event-dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: var(--alert); margin-top: 5px; flex-shrink: 0;
  }

  .event-dot.medium { background: #fbbf24; }
  .event-dot.low { background: var(--text-mid); }

  .event-item.medium { background: rgba(251,191,36,0.06); border-color: rgba(251,191,36,0.15); }
  .event-item.low { background: var(--surface2); border-color: var(--border); }

  .event-text { font-size: 13px; color: var(--text-mid); line-height: 1.5; }

  /* LOADING */
  .loading {
    display: flex; align-items: center; gap: 12px;
    color: var(--text-mid); font-family: var(--mono); font-size: 12px; padding: 20px 0;
  }

  .dots { display: flex; gap: 4px; }
  .dot {
    width: 5px; height: 5px; border-radius: 50%;
    animation: pulse 1.2s ease-in-out infinite;
  }
  .dot.reactive { background: var(--accent); }
  .dot.proactive { background: var(--alert); }
  .dot:nth-child(2) { animation-delay: 0.2s; }
  .dot:nth-child(3) { animation-delay: 0.4s; }

  @keyframes pulse {
    0%,100%{opacity:0.2;transform:scale(0.7)}
    50%{opacity:1;transform:scale(1)}
  }

  /* TEMPLATE LIBRARY */
  .tlib-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

  .tcard {
    background: var(--surface2); border: 1px solid var(--border);
    border-radius: 10px; padding: 16px; position: relative;
    transition: all 0.2s; cursor: default;
  }

  .tcard:hover { border-color: var(--border-active); }

  .tcard-name {
    font-family: var(--display); font-size: 13px; font-weight: 700;
    color: var(--text); margin-bottom: 8px; padding-right: 20px;
  }

  .tcard-tags { display: flex; gap: 5px; flex-wrap: wrap; margin-bottom: 10px; }

  .tcard-tag {
    font-family: var(--mono); font-size: 9px; letter-spacing: 1px;
    text-transform: uppercase; padding: 2px 7px; border-radius: 3px;
  }

  .tcard-tag.reactive { background: var(--accent-dim); color: var(--accent); }
  .tcard-tag.proactive { background: var(--alert-dim); color: var(--alert); }
  .tcard-tag.neutral { background: var(--surface); color: var(--text-mid); border: 1px solid var(--border); }

  .tcard-preview {
    font-size: 11px; color: var(--text-dim); line-height: 1.5;
    display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
  }

  .tcard-date { font-family: var(--mono); font-size: 10px; color: var(--text-dim); margin-top: 8px; }

  .tcard-del {
    position: absolute; top: 10px; right: 10px;
    background: transparent; border: none; color: var(--text-dim);
    cursor: pointer; font-size: 16px; padding: 2px 5px; border-radius: 4px; transition: all 0.2s;
  }

  .tcard-del:hover { color: var(--alert); background: var(--alert-dim); }

  .tcard-load {
    margin-top: 10px; width: 100%; padding: 7px;
    background: transparent; border: 1px solid var(--border);
    border-radius: 6px; color: var(--text-mid); font-family: var(--mono);
    font-size: 10px; letter-spacing: 1px; text-transform: uppercase;
    cursor: pointer; transition: all 0.2s;
  }

  .tcard-load:hover { border-color: var(--border-active); color: var(--accent); }

  .empty {
    text-align: center; padding: 48px 24px; color: var(--text-dim);
  }

  .empty-icon { font-size: 32px; margin-bottom: 12px; opacity: 0.4; }
  .empty-t { font-size: 14px; color: var(--text-mid); margin-bottom: 6px; font-family: var(--display); font-weight: 700; }
  .empty-d { font-size: 12px; line-height: 1.6; font-family: var(--mono); }

  /* NAV TABS */
  .nav {
    display: flex; gap: 3px; background: var(--surface);
    border: 1px solid var(--border); border-radius: 10px;
    padding: 4px; margin-bottom: 24px;
  }

  .nav-tab {
    flex: 1; padding: 9px; border: none; border-radius: 7px;
    font-family: var(--mono); font-size: 11px; letter-spacing: 1px;
    text-transform: uppercase; cursor: pointer; transition: all 0.2s;
    background: transparent; color: var(--text-dim);
  }

  .nav-tab.active {
    background: var(--surface2); color: var(--accent);
    border: 1px solid var(--border-active);
  }

  /* MODAL */
  .overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.75);
    backdrop-filter: blur(6px); display: flex; align-items: center;
    justify-content: center; z-index: 200; animation: rise 0.2s ease;
  }

  .modal {
    background: #0e1520; border: 1px solid var(--border-active);
    border-radius: 14px; padding: 28px; width: 100%; max-width: 400px; margin: 20px;
  }

  .modal-t { font-family: var(--display); font-size: 20px; font-weight: 800; color: var(--text); margin-bottom: 6px; }
  .modal-d { font-size: 12px; color: var(--text-mid); margin-bottom: 20px; font-family: var(--mono); }

  .modal-acts { display: flex; gap: 10px; margin-top: 18px; }

  .mbtn {
    flex: 1; padding: 12px; border-radius: 8px;
    font-family: var(--mono); font-size: 12px; letter-spacing: 0.5px;
    cursor: pointer; transition: all 0.2s;
  }

  .mbtn.primary { background: var(--accent); border: none; color: #080c12; font-weight: 600; }
  .mbtn.secondary { background: transparent; border: 1px solid var(--border); color: var(--text-mid); }
  .mbtn.secondary:hover { color: var(--text); }

  @media(max-width:600px) {
    .grid-2, .mode-selector, .tlib-grid { grid-template-columns: 1fr; }
    .title { font-size: 32px; }
  }
`;

const SEGMENTS = ["Retail", "Institutional", "High Net Worth", "Corporate"];
const TONES = ["Formal", "Semi-Formal", "Conversational"];

export default function App() {
  const [tab, setTab] = useState("tool");
  const [mode, setMode] = useState("reactive");
  const [tradeData, setTradeData] = useState("");
  const [clientName, setClientName] = useState("");
  const [segment, setSegment] = useState("Retail");
  const [tone, setTone] = useState("Semi-Formal");
  const [clientQuery, setClientQuery] = useState("");
  const [output, setOutput] = useState(null); // { text, events }
  const [editText, setEditText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [savedOk, setSavedOk] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [tplName, setTplName] = useState("");

  useEffect(() => { loadTpl(); }, []);

  const loadTpl = async () => {
    try {
      const r = await window.storage.get("cti-templates");
      if (r) setTemplates(JSON.parse(r.value));
    } catch { setTemplates([]); }
  };

  const saveTpl = async (list) => {
    try { await window.storage.set("cti-templates", JSON.stringify(list)); } catch {}
  };

  const chipClass = (active) => `chip ${active ? (mode === "reactive" ? "active-reactive" : "active-proactive") : ""}`;

  const handleGenerate = async () => {
    if (!tradeData.trim()) return;
    setLoading(true); setOutput(null); setIsEditing(false);

    let systemPrompt = "";
    let userPrompt = "";

    if (mode === "reactive") {
      systemPrompt = `You are a senior relationship manager at a financial services brokerage.
A client has reached out with a question about their account or trading history.
Your job is to read their trading data and write a clear, reassuring, plain-English reply.

Rules:
- Tone: ${tone.toLowerCase()}
- Client segment: ${segment}${clientName ? `, client name: ${clientName}` : ""}
- Never use internal system codes or jargon
- Explain what happened clearly — no vague language
- Be empathetic if there are losses — acknowledge without over-apologising
- End with a clear next step or offer to help further
- Format as a ready-to-send email reply (include Subject line)`;

      userPrompt = `Client's trading data / account history:\n${tradeData}\n\n${clientQuery ? `Client's question: "${clientQuery}"\n\n` : ""}Write a clear, professional reply to this client.`;

    } else {
      systemPrompt = `You are an intelligent client alert system for a financial services brokerage.
Your job is to:
1. SCAN the trading data and identify significant events that the client should be alerted about
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
- Client segment: ${segment}${clientName ? `, client name: ${clientName}` : ""}
- Be proactive and informative — client hasn't asked yet
- Be calm and solution-focused, never alarming
- Suggest clear next steps
- Never use internal jargon

Return ONLY the JSON object, no other text.`;

      userPrompt = `Trading data to analyse:\n${tradeData}`;
    }

    try {const res = await fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": "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",
    "anthropic-version": "2023-06-01"
  },
  body: JSON.stringify({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1000,
    system: systemPrompt,
    messages: [{ role: "user", content: userPrompt }],
  }),
});
      const data = await res.json();
const raw = data.content?.map(b => b.text || "").join("") || "";
      if (mode === "proactive") {
        try {
          const clean = raw.replace(/```json|```/g, "").trim();
          const parsed = JSON.parse(clean);
          setOutput({ text: parsed.email, events: parsed.events || [] });
          setEditText(parsed.email);
        } catch {
          setOutput({ text: raw, events: [] });
          setEditText(raw);
        }
      } else {
        setOutput({ text: raw, events: [] });
        setEditText(raw);
      }
    } catch {
      setOutput({ text: "Something went wrong. Please try again.", events: [] });
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(isEditing ? editText : output?.text || "");
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = async () => {
    if (!tplName.trim() || !output) return;
    const t = {
      id: Date.now(), name: tplName.trim(), mode, segment, tone,
      tradeData, clientName, clientQuery,
      output: isEditing ? editText : output.text,
      events: output.events || [],
      savedAt: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
    };
    const updated = [t, ...templates];
    setTemplates(updated); await saveTpl(updated);
    setShowModal(false); setTplName("");
    setSavedOk(true); setTimeout(() => setSavedOk(false), 2000);
  };

  const handleLoad = (t) => {
    setMode(t.mode); setSegment(t.segment); setTone(t.tone);
    setTradeData(t.tradeData); setClientName(t.clientName || "");
    setClientQuery(t.clientQuery || "");
    setOutput({ text: t.output, events: t.events || [] });
    setEditText(t.output); setIsEditing(false);
    setTab("tool");
  };

  const handleDel = async (id, e) => {
    e.stopPropagation();
    const updated = templates.filter(t => t.id !== id);
    setTemplates(updated); await saveTpl(updated);
  };

  return (
    <>
      <style>{css}</style>
      <div className="app">
        <div className="container">

          <div className="header">
            <div className="header-tag">Trading Intelligence</div>
            <h1 className="title">Client <span>Trading</span><br />Intelligence</h1>
            <p className="subtitle">Reactive replies and proactive alerts — powered by AI, built for financial services teams.</p>
          </div>

          <div className="nav">
            <button className={`nav-tab ${tab === "tool" ? "active" : ""}`} onClick={() => setTab("tool")}>Tool</button>
            <button className={`nav-tab ${tab === "templates" ? "active" : ""}`} onClick={() => setTab("templates")}>
              Templates {templates.length > 0 && `(${templates.length})`}
            </button>
          </div>

          {tab === "tool" && (
            <>
              {/* MODE SELECTOR */}
              <div className="mode-selector">
                <div className={`mode-card ${mode === "reactive" ? "active reactive" : ""}`} onClick={() => { setMode("reactive"); setOutput(null); }}>
                  <div className={`mode-indicator reactive`} />
                  <div className="mode-icon">💬</div>
                  <div className="mode-title">Reactive Reply</div>
                  <div className="mode-desc">Client asks about their account or a trade. Generate a clear, plain-English reply.</div>
                  <div className="mode-tag reactive">Client-initiated</div>
                </div>
                <div className={`mode-card ${mode === "proactive" ? "active proactive" : ""}`} onClick={() => { setMode("proactive"); setOutput(null); }}>
                  <div className={`mode-indicator proactive`} />
                  <div className="mode-icon">🔔</div>
                  <div className="mode-title">Proactive Alert</div>
                  <div className="mode-desc">AI scans activity, detects significant events, and drafts an alert before the client calls.</div>
                  <div className="mode-tag proactive">RM-initiated</div>
                </div>
              </div>

              {/* TRADING DATA INPUT */}
              <div className="panel">
                <div className="panel-label">01 — Trading Data</div>
                <div className="field-label">Paste the client's trade history, account statement, or activity log</div>
                <textarea
                  value={tradeData}
                  onChange={e => setTradeData(e.target.value)}
                  placeholder={mode === "reactive"
                    ? "e.g.\nTrade 1: BUY EUR/USD 1.0850 — 2 lots — 18 Apr, closed 1.0790 — Loss $120\nTrade 2: SELL GBP/USD 1.2340 — 1 lot — 19 Apr, open position\nAccount balance: $4,880\nMargin used: 42%"
                    : "e.g.\nAccount balance dropped from $6,200 to $4,100 over 3 days\nTrade 1: SELL XAU/USD — 5 lots — Loss $890\nTrade 2: BUY EUR/USD — auto-closed at stop loss — Loss $340\nCurrent margin level: 108% (minimum 100%)\nTwo more open positions..."}
                />
              </div>

              {/* SETTINGS */}
              <div className="panel">
                <div className="panel-label">02 — Settings</div>
                <div className="grid-2">
                  <div>
                    <div className="field-label">Client Name (optional)</div>
                    <input type="text" placeholder="e.g. Ahmad Rashidi" value={clientName} onChange={e => setClientName(e.target.value)} />
                  </div>
                  {mode === "reactive" && (
                    <div>
                      <div className="field-label">Client's Question (optional)</div>
                      <input type="text" placeholder="e.g. Why was my position closed?" value={clientQuery} onChange={e => setClientQuery(e.target.value)} />
                    </div>
                  )}
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <div className="field-label" style={{ marginBottom: "8px" }}>Client Segment</div>
                  <div className="chips">
                    {SEGMENTS.map(s => (
                      <button key={s} className={chipClass(segment === s)} onClick={() => setSegment(s)}>{s}</button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="field-label" style={{ marginBottom: "8px" }}>Communication Tone</div>
                  <div className="chips">
                    {TONES.map(t => (
                      <button key={t} className={chipClass(tone === t)} onClick={() => setTone(t)}>{t}</button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                className={`gen-btn ${mode}`}
                onClick={handleGenerate}
                disabled={loading || !tradeData.trim()}
              >
                {loading ? "Analysing..." : mode === "reactive" ? "Generate Client Reply →" : "Scan & Generate Alert →"}
              </button>

              {/* OUTPUT */}
              {(loading || output) && (
                <div className={`output-panel ${mode}`}>
                  {loading ? (
                    <div className="loading">
                      <div className="dots">
                        <div className={`dot ${mode}`} /><div className={`dot ${mode}`} /><div className={`dot ${mode}`} />
                      </div>
                      {mode === "reactive" ? "Drafting client reply..." : "Scanning for significant events..."}
                    </div>
                  ) : (
                    <>
                      {/* Detected Events (proactive only) */}
                      {mode === "proactive" && output?.events?.length > 0 && (
                        <>
                          <div className="events-header">Detected Events</div>
                          <div className="event-list">
                            {output.events.map((ev, i) => (
                              <div key={i} className={`event-item ${ev.severity}`}>
                                <div className={`event-dot ${ev.severity === "high" ? "" : ev.severity}`} />
                                <div className="event-text">{ev.description}</div>
                              </div>
                            ))}
                          </div>
                        </>
                      )}

                      <div className="output-header">
                        <div className="output-left">
                          <div className={`output-title ${mode}`}>
                            {mode === "reactive" ? "Generated Reply" : "Proactive Alert"}
                          </div>
                          <div className="output-tags">
                            <span className={`otag ${mode}`}>{segment}</span>
                            <span className={`otag ${mode}`}>{tone}</span>
                            {clientName && <span className={`otag ${mode}`}>{clientName}</span>}
                          </div>
                        </div>
                        <div className="output-actions">
                          <button className={`act-btn ${isEditing ? "ok" : ""}`} onClick={() => setIsEditing(!isEditing)}>
                            {isEditing ? "Done" : "Edit"}
                          </button>
                          <button className={`act-btn ${copied ? "ok" : ""}`} onClick={handleCopy}>
                            {copied ? "✓ Copied" : "Copy"}
                          </button>
                          <button className={`act-btn ${savedOk ? "ok" : ""}`} onClick={() => setShowModal(true)}>
                            {savedOk ? "✓ Saved" : "Save"}
                          </button>
                        </div>
                      </div>

                      {isEditing ? (
                        <textarea className="output-editable" value={editText} onChange={e => setEditText(e.target.value)} />
                      ) : (
                        <div className="output-text">{output?.text}</div>
                      )}
                    </>
                  )}
                </div>
              )}
            </>
          )}

          {/* TEMPLATE LIBRARY */}
          {tab === "templates" && (
            <div className="panel">
              <div className="panel-label">Saved Templates</div>
              {templates.length === 0 ? (
                <div className="empty">
                  <div className="empty-icon">🗂</div>
                  <div className="empty-t">No templates yet</div>
                  <div className="empty-d">Generate a reply or alert and click Save to build your library.</div>
                </div>
              ) : (
                <div className="tlib-grid">
                  {templates.map(t => (
                    <div key={t.id} className="tcard">
                      <button className="tcard-del" onClick={(e) => handleDel(t.id, e)}>×</button>
                      <div className="tcard-name">{t.name}</div>
                      <div className="tcard-tags">
                        <span className={`tcard-tag ${t.mode}`}>{t.mode}</span>
                        <span className="tcard-tag neutral">{t.segment}</span>
                        <span className="tcard-tag neutral">{t.tone}</span>
                      </div>
                      <div className="tcard-preview">{t.output}</div>
                      <div className="tcard-date">{t.savedAt}</div>
                      <button className="tcard-load" onClick={() => handleLoad(t)}>Load →</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-t">Save Template</div>
            <div className="modal-d">Name this template for future reuse.</div>
            <div className="field-label">Template Name</div>
            <input type="text" placeholder={mode === "reactive" ? "e.g. Margin Call Reply — Retail" : "e.g. Auto-Close Alert — HNW"}
              value={tplName} onChange={e => setTplName(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSave()} autoFocus />
            <div className="modal-acts">
              <button className="mbtn secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="mbtn primary" onClick={handleSave} disabled={!tplName.trim()}>Save</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
