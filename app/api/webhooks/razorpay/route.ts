import { NextResponse } from 'next/server';
import crypto from 'node:crypto';

export async function POST(request: Request) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const signature = request.headers.get('x-razorpay-signature');
  if (!secret || !signature) return NextResponse.json({ error: 'Webhook not configured' }, { status: 503 });
  const rawBody = await request.text();
  const expected = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  console.log('Razorpay webhook received');
  return NextResponse.json({ received: true });
}
