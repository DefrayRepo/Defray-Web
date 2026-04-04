'use client';

import { useState, FormEvent } from 'react';

export function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setState('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (res.ok) {
        setState('success');
        setEmail('');
      } else {
        const data = await res.json().catch(() => ({}));
        if (res.status === 409) {
          setState('success'); // already on waitlist — treat as success
        } else {
          setState('error');
          setErrorMsg(data.error || 'Something went wrong. Please try again.');
        }
      }
    } catch {
      setState('error');
      setErrorMsg('Network error. Please try again.');
    }
  }

  if (state === 'success') {
    return (
      <div className="flex items-center gap-3 bg-green/10 border border-green/30 text-green rounded-xl px-6 py-3 text-sm font-medium">
        <span>✓</span>
        <span>You&apos;re on the list! We&apos;ll be in touch.</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
      <input
        type="email"
        required
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={state === 'loading'}
        className="flex-1 bg-surface border border-border focus:border-accent outline-none rounded-xl px-4 py-3 text-text placeholder:text-text3 transition-colors text-sm disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={state === 'loading'}
        className="bg-accent hover:bg-accent/80 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm whitespace-nowrap"
      >
        {state === 'loading' ? 'Joining…' : 'Get early access'}
      </button>

      {state === 'error' && (
        <p className="w-full text-sm text-red -mt-1">{errorMsg}</p>
      )}
    </form>
  );
}
