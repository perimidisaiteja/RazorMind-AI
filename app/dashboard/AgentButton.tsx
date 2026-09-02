'use client';

import { useState } from 'react';

export default function AgentButton() {
  const [running, setRunning] = useState(false);
  const [message, setMessage] = useState('');

  async function runAgent() {
    setRunning(true);
    setMessage('RazorMind is analyzing revenue…');
    try {
      const response = await fetch('/api/ai', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ action: 'run' }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setMessage(`Experiment active: ${data.offer.title} at ₹${data.offer.bundlePrice.toLocaleString('en-IN')}.`);
    } catch {
      setMessage('Agent could not start the experiment.');
    } finally {
      setRunning(false);
    }
  }

  return <div><button className="run" onClick={runAgent} disabled={running}>{running ? 'Agent working…' : 'Run experiment'}</button>{message && <p className="muted" style={{marginTop:12}}>{message}</p>}</div>;
}
