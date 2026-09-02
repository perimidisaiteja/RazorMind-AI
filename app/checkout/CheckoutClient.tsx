'use client';

import { useState } from 'react';

interface RazorpayOptions {
  key: string; amount: number; currency: string; name: string; description: string; order_id: string;
  handler: (response: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => void;
}

declare global { interface Window { Razorpay?: new (options: RazorpayOptions) => { open: () => void }; } }

function loadCheckout() {
  return new Promise<void>((resolve, reject) => {
    if (window.Razorpay) return resolve();
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Razorpay Checkout failed to load'));
    document.body.appendChild(script);
  });
}

export default function CheckoutClient() {
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);

  async function pay() {
    setBusy(true); setStatus('Creating secure Test Mode order…');
    try {
      await loadCheckout();
      const orderResponse = await fetch('/api/razorpay/create-order', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ amount: 249900 }) });
      const order = await orderResponse.json();
      if (!orderResponse.ok) throw new Error(order.error || 'Order creation failed');
      if (!window.Razorpay) throw new Error('Checkout unavailable');
      const checkout = new window.Razorpay({
        key: order.keyId, amount: order.amount, currency: order.currency, name: 'TechKart', description: 'RazorMind Gaming Bundle', order_id: order.orderId,
        handler: async (response) => {
          setStatus('Verifying payment…');
          const result = await fetch('/api/razorpay/verify-payment', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(response) });
          const data = await result.json();
          setStatus(data.verified ? '✓ Payment verified — experiment converted!' : 'Payment verification failed');
          setBusy(false);
        },
      });
      checkout.open();
      setStatus('Razorpay Test Checkout opened');
      setBusy(false);
    } catch (error) { setStatus(error instanceof Error ? error.message : 'Checkout failed'); setBusy(false); }
  }

  return <div>
    <button className="run" onClick={pay} disabled={busy}>{busy ? 'Preparing…' : 'Pay with Razorpay Test Mode →'}</button>
    {status && <p className="muted" style={{marginTop:14}}>{status}</p>}
  </div>;
}
