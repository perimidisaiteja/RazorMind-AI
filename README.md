# RazorMind AI

**The AI Revenue Agent**

RazorMind is an autonomous AI agent for Track 01 — AI Growth & Agentic Commerce. It follows a simple loop:

**Detect → Decide → Act → Transact → Measure → Learn**

## Demo

The prototype includes:
- Merchant revenue command center
- Revenue opportunity detection
- AI-generated bundle/upsell concept
- Buyer storefront flow
- Razorpay Test Mode checkout handoff
- Revenue measurement concept
- Server API endpoint for the agent

## Architecture

Next.js App Router → AI Agent & tools → Supabase/Postgres → Razorpay Test Mode → measurement loop

## Run locally

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` and add credentials when connecting live services. The UI can be explored without credentials.

## Razorpay flow

For the production demo flow, the server should create a Razorpay Order, pass the returned `order_id` to Checkout, and verify the payment signature server-side. Never expose the Razorpay secret in client code.

## Buildathon pitch

> RazorMind doesn’t just tell merchants what happened. It finds the opportunity, takes action, and proves whether the action generated revenue.

This project is independent from the Doctie healthcare project.