import { NextResponse } from 'next/server';
import { analyzeRevenue, createOffer, findOpportunity, measureResult } from '@/lib/agent-tools';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const action = body?.action ?? 'analyze';

    if (action === 'analyze') {
      const metrics = analyzeRevenue();
      const opportunity = findOpportunity();
      return NextResponse.json({ agent: 'RazorMind', status: 'analyzed', metrics, opportunity, nextAction: 'create_offer' });
    }

    if (action === 'run') {
      const opportunity = findOpportunity();
      const offer = createOffer();
      return NextResponse.json({ agent: 'RazorMind', status: 'experiment_running', opportunity, offer, nextAction: 'transact' });
    }

    if (action === 'measure') {
      return NextResponse.json({ agent: 'RazorMind', status: 'measured', result: measureResult(body?.paymentAmount ?? 249900), nextAction: 'learn' });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch {
    return NextResponse.json({ error: 'Agent action failed' }, { status: 500 });
  }
}
