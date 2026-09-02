import Link from 'next/link';

const features = [
  ['01', 'Revenue Hunter', 'Scans sales patterns and finds the highest-value growth opportunity.'],
  ['02', 'Sales Agent', 'Turns an opportunity into a personalized offer customers can actually buy.'],
  ['03', 'Revenue Scientist', 'Measures outcomes so the agent learns what really increases revenue.'],
];

export default function Home() {
  return <main className="shell">
    <nav className="nav"><div className="brand">Razor<span>Mind</span> AI</div><div className="navlinks"><span>How it works</span><span>Agent</span><span>Razorpay</span></div><Link className="btn primary" href="/dashboard">Open demo</Link></nav>
    <section className="hero"><div className="eyebrow">AI Growth & Agentic Commerce</div><h1>Don’t just analyze revenue.<br/><span>Grow it.</span></h1><p>RazorMind is an autonomous AI revenue agent for merchants. It detects where money is being left on the table, decides what to do, executes the action, and measures the real impact.</p><div className="actions"><Link className="btn primary" href="/dashboard">Grow My Revenue →</Link><Link className="btn secondary" href="/shop">Experience the buyer flow</Link></div></section>
    <section className="grid">{features.map(([n,t,d])=><article className="card" key={n}><div className="eyebrow">{n}</div><h3>{t}</h3><p className="muted">{d}</p></article>)}</section>
  </main>;
}