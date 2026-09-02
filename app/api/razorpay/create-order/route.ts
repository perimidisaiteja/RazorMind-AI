import { NextResponse } from 'next/server';
import { getRazorpay, getRazorpayKeyId } from '@/lib/razorpay';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const amount = Number(body.amount);
    if (!Number.isInteger(amount) || amount <= 0) {
      return NextResponse.json({ error: 'Amount must be a positive integer in paise' }, { status: 400 });
    }
    if (!process.env.RAZORPAY_KEY_ID?.startsWith('rzp_test_')) {
      return NextResponse.json({ error: 'RazorMind checkout requires Razorpay Test Mode keys' }, { status: 400 });
    }
    const order = await getRazorpay().orders.create({
      amount,
      currency: 'INR',
      receipt: `rm_${Date.now()}`,
      notes: { product: 'Gaming Bundle', source: 'RazorMind AI' },
    });
    return NextResponse.json({ orderId: order.id, amount: order.amount, currency: order.currency, keyId: getRazorpayKeyId() });
  } catch (error) {
    console.error('create-order', error);
    return NextResponse.json({ error: 'Unable to create Razorpay order' }, { status: 500 });
  }
}
