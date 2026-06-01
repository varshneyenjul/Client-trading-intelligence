# Client Trading Intelligence

AI-powered tool for financial services teams to generate reactive client replies and proactive trading alerts from raw account activity.

## What it does

**Reactive mode** — paste a client's trading history, get a clear plain-English reply ready to send.

**Proactive mode** — paste trading activity, AI detects significant events (large losses, margin warnings, auto-closures) and drafts a proactive alert before the client calls.
## Why I built this

Working in FX brokerage made me curious about how AI could support client-facing teams in real time. I built this as a personal project to explore that idea and deepen my hands-on understanding of AI-powered product development.

## Built with
Claude API (Anthropic) · Python · Streamlit
---

## Deploy to Vercel

### Step 1 — Get your Anthropic API Key
1. Go to https://console.anthropic.com
2. Click **API Keys** → **Create Key**
3. Copy the key

### Step 2 — Push to GitHub
1. Create a new repo on https://github.com/new named `client-trading-intelligence`
2. Upload all project files

### Step 3 — Deploy on Vercel
1. Go to https://vercel.com → sign in with GitHub
2. Click **Add New → Project** → import your repo
3. Click **Deploy**

### Step 4 — Add your API Key
1. Go to **Settings → Environment Variables**
2. Add: `ANTHROPIC_API_KEY` = your key from Step 1
3. Redeploy

---

## Local Development
```bash
npm install
cp .env.example .env
npm run dev
```

> Note: Always use fictional/sample data. Never paste real client data into this tool.

