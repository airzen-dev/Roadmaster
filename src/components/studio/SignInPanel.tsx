'use client';

import { useState } from 'react';
import { signIn } from '@/lib/gallery-store';
import { Lock } from '../Icons';

export default function SignInPanel() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      await signIn(username, password);
      // The auth listener in StudioClient swaps the view; nothing to do here.
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign in failed.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-md rounded-2xl border border-white/10 bg-ink-800 p-8">
      <div className="flex items-center gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-full border border-white/12 text-yellow">
          <Lock className="size-5" />
        </span>
        <div>
          <h1 className="font-display text-lg font-bold uppercase">Staff sign in</h1>
          <p className="text-[0.8125rem] text-mute-dim">Gallery management</p>
        </div>
      </div>

      <form onSubmit={submit} className="mt-8 space-y-4">
        <Field
          label="Username"
          value={username}
          onChange={setUsername}
          autoComplete="username"
          autoFocus
        />
        <Field
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          autoComplete="current-password"
        />

        {error && (
          <p role="alert" className="rounded-lg border border-red-400/30 bg-red-400/10 px-3.5 py-2.5 text-[0.8125rem] text-red-200">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={busy || !username || !password}
          className="h-12 w-full rounded-full bg-yellow font-display text-[0.8125rem] font-bold tracking-[0.12em] text-ink uppercase transition-all duration-300 hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-45"
        >
          {busy ? 'Checking…' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  ...rest
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'type'>) {
  const id = `field-${label.toLowerCase()}`;
  return (
    <div>
      <label
        htmlFor={id}
        className="font-display text-[0.6875rem] font-bold tracking-[0.16em] text-mute uppercase"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 h-12 w-full rounded-lg border border-white/12 bg-ink px-3.5 text-[0.9375rem] text-chalk transition-colors placeholder:text-mute-dim focus:border-yellow focus:outline-none"
        {...rest}
      />
    </div>
  );
}
