'use client';

import { useEffect, useState } from 'react';
import { appwriteReady } from '@/lib/appwrite-config';
import { watchAuth } from '@/lib/gallery-store';
import GalleryManager from './GalleryManager';
import SignInPanel from './SignInPanel';

type Phase = 'checking' | 'signedOut' | 'signedIn' | 'unconfigured';

export default function StudioClient() {
  const [phase, setPhase] = useState<Phase>(appwriteReady ? 'checking' : 'unconfigured');

  useEffect(() => {
    if (!appwriteReady) return;
    // Fires once with the restored session, then again on every sign in / out.
    return watchAuth((signedIn) => setPhase(signedIn ? 'signedIn' : 'signedOut'));
  }, []);

  if (phase === 'unconfigured') return <NotConfigured />;
  if (phase === 'checking') {
    return <p className="py-20 text-center text-[0.875rem] text-mute">Loading…</p>;
  }
  return phase === 'signedIn' ? <GalleryManager /> : <SignInPanel />;
}

function NotConfigured() {
  return (
    <div className="mx-auto max-w-xl rounded-2xl border border-white/10 bg-ink-800 p-8">
      <h1 className="font-display text-lg font-bold uppercase">Not connected yet</h1>
      <p className="prose-rm mt-4 text-[0.9375rem]">
        The gallery manager needs an Appwrite project. Add the{' '}
        <code className="text-yellow">NEXT_PUBLIC_APPWRITE_*</code> values to{' '}
        <code className="text-yellow">.env.local</code> (and to the host&apos;s build environment),
        then rebuild:
      </p>
      <pre className="mt-5 overflow-x-auto rounded-lg border border-white/10 bg-ink p-4 text-[0.8125rem] text-mute">
        <code>
          NEXT_PUBLIC_APPWRITE_ENDPOINT=https://fra.cloud.appwrite.io/v1{'\n'}
          NEXT_PUBLIC_APPWRITE_PROJECT_ID=…
        </code>
      </pre>
      <p className="mt-5 text-[0.875rem] text-mute-dim">
        The full walkthrough is in <code className="text-yellow">README.md</code> under “Gallery
        manager”.
      </p>
    </div>
  );
}
