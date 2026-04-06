'use client';

import { useState, FormEvent } from 'react';

const SHARE_URL = 'https://defray.app';

export function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [position, setPosition] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

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

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setPosition(data.position ?? null);
        setState('success');
        setEmail('');
      } else {
        setState('error');
        setErrorMsg(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setState('error');
      setErrorMsg('Network error. Please try again.');
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(SHARE_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback: select a temp input — handles older mobile browsers
      const el = document.createElement('input');
      el.value = SHARE_URL;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  }

  if (state === 'success') {
    return (
      <div className="flex flex-col items-center gap-4 w-full max-w-md">
        {/* Confirmation banner */}
        <div className="w-full flex items-start gap-3 bg-green/10 border border-green/30 text-green rounded-xl px-5 py-4">
          <span className="text-lg leading-none mt-0.5">✓</span>
          <div className="flex flex-col gap-0.5">
            <span className="font-semibold text-sm">You&apos;re on the list!</span>
            {position !== null ? (
              <span className="text-sm opacity-80">
                You&apos;re{' '}
                <span className="font-bold">#{position}</span> — we&apos;ll
                email you before launch.
              </span>
            ) : (
              <span className="text-sm opacity-80">We&apos;ll email you before launch.</span>
            )}
          </div>
        </div>

        {/* Share nudge */}
        <div className="w-full bg-surface border border-border rounded-xl px-5 py-4 flex flex-col gap-3">
          <p className="text-sm text-text2 leading-relaxed">
            <span className="font-semibold text-text">Know someone who&apos;d love this?</span>
            {' '}Share Defray and help us spread the word.
          </p>
          <div className="flex items-center gap-2">
            <span className="flex-1 bg-surface2 border border-border rounded-lg px-3 py-2 text-xs text-text3 font-mono truncate select-all">
              {SHARE_URL}
            </span>
            <button
              onClick={handleCopy}
              className="shrink-0 bg-accent hover:bg-accent/80 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
            >
              {copied ? '✓ Copied!' : 'Copy link'}
            </button>
          </div>
        </div>
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

