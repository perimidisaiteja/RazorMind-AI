import Link from 'next/link';
import CheckoutClient from './CheckoutClient';

export default function Checkout() {
  return <main className="shell"><nav className="nav"><Link className="brand" href="/">Razor<span>Mind</span> AI</Link><span className="pill">Razorpay Test Mode</span></nav><section className="hero" style={{paddingTop:60}}><div className="eyebrow">Live payment demo</div><h1>Ready to <span>transact.</span></h1><p>RazorMind creates a server-side Razorpay Test Mode order, opens Checkout, then verifies the payment signature.</p><div className="card" style={{maxWidth:600}}><h2>Gaming Bundle</h2><p className="muted">Mechanical Keyboard + Gaming Mouse</p><div style={{display:'flex',justifyContent:'space-between',margin:'24px 0',fontSize:20}}><b>Total</b><b>₹2,499</b></div><CheckoutClient /><p className="muted" style={{fontSize:12}}>Test Mode only. No real money is charged.</p></div><div className="actions"><Link className="btn secondary" href="/dashboard">Back to agent dashboard</Link></div></section></main>;
}
