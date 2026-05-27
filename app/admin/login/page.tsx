'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Loader2 } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || 'Invalid password');
      }
      router.replace('/admin');
    } catch (e: any) {
      setErr(e.message || 'Login failed');
      setLoading(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-charcoal px-6">
      <div className="w-full max-w-sm">
        <div className="text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-gold/30 bg-gold/10 text-gold">
            <Lock size={20} />
          </div>
          <h1 className="display-text mt-6 text-3xl">Studio access</h1>
          <p className="mt-2 font-sans text-sm text-ivory/50">
            Private dashboard. Authorised users only.
          </p>
        </div>

        <form onSubmit={onSubmit} className="mt-10 space-y-4">
          <input
            type="password"
            autoFocus
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-xl border border-ivory/10 bg-ivory/[0.02] px-4 py-3 font-sans text-ivory placeholder:text-ivory/30 focus:border-gold focus:outline-none"
          />
          {err && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
              {err}
            </div>
          )}
          <button
            type="submit"
            disabled={loading || password.length === 0}
            className="btn-primary w-full disabled:opacity-50"
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : 'Enter'}
          </button>
        </form>
      </div>
    </main>
  );
}
