import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({
    agent: 'RazorMind',
    status: 'ready',
    opportunity: { title: 'Gaming Bundle Upsell', confidence: 91, estimatedMonthlyRevenue: 42600 },
    nextAction: 'create_offer'
  });
}