'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  LogOut,
  ExternalLink,
  Copy,
  Check,
  Image as ImageIcon,
  Filter,
} from 'lucide-react';
import type { Order, OrderStatus } from '@/lib/db';
import { formatNGN } from '@/lib/pricing';

const STATUSES: OrderStatus[] = [
  'pending',
  'paid',
  'in_progress',
  'delivered',
  'failed',
  'refunded',
];

const STATUS_TINT: Record<OrderStatus, string> = {
  pending: 'bg-amber-400/15 text-amber-300 border-amber-400/30',
  paid: 'bg-emerald-400/15 text-emerald-300 border-emerald-400/30',
  in_progress: 'bg-sky-400/15 text-sky-300 border-sky-400/30',
  delivered: 'bg-violet-400/15 text-violet-300 border-violet-400/30',
  failed: 'bg-red-400/15 text-red-300 border-red-400/30',
  refunded: 'bg-zinc-400/15 text-zinc-300 border-zinc-400/30',
};

export default function AdminClient({ initialOrders }: { initialOrders: Order[] }) {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [filter, setFilter] = useState<'all' | OrderStatus>('all');
  const [copied, setCopied] = useState<string | null>(null);

  const filtered = useMemo(
    () => (filter === 'all' ? orders : orders.filter((o) => o.status === filter)),
    [orders, filter]
  );

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: orders.length };
    STATUSES.forEach((s) => (c[s] = orders.filter((o) => o.status === s).length));
    return c;
  }, [orders]);

  async function setStatus(ref: string, status: OrderStatus) {
    const res = await fetch(`/api/admin/orders/${ref}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      const { order } = await res.json();
      setOrders((prev) => prev.map((o) => (o.ref === ref ? order : o)));
    }
  }

  async function logout() {
    await fetch('/api/admin/login', { method: 'DELETE' });
    router.replace('/admin/login');
  }

  function copy(s: string, key: string) {
    navigator.clipboard.writeText(s);
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  }

  return (
    <main className="min-h-screen bg-charcoal">
      <header className="sticky top-0 z-10 border-b border-ivory/5 bg-charcoal/80 backdrop-blur-xl">
        <div className="container-art flex h-16 items-center justify-between">
          <div className="flex items-baseline gap-3">
            <span className="font-serif text-xl text-ivory">Studio</span>
            <span className="font-sans text-[10px] uppercase tracking-widest text-ivory/50">
              Order dashboard
            </span>
          </div>
          <button
            onClick={logout}
            className="inline-flex items-center gap-2 rounded-full border border-ivory/10 px-3 py-1.5 font-sans text-xs text-ivory/70 hover:border-red-500/40 hover:text-red-300"
          >
            <LogOut size={12} /> Sign out
          </button>
        </div>
      </header>

      <div className="container-art py-10">
        {/* Filter bar */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="mr-3 flex items-center gap-2 font-sans text-[10px] uppercase tracking-widest text-ivory/40">
            <Filter size={12} /> Filter
          </div>
          {(['all', ...STATUSES] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`rounded-full px-3 py-1.5 font-sans text-[11px] uppercase tracking-widest transition-colors ${
                filter === s
                  ? 'bg-gold text-charcoal'
                  : 'border border-ivory/10 text-ivory/60 hover:border-ivory/30'
              }`}
            >
              {s} ({counts[s] || 0})
            </button>
          ))}
        </div>

        {/* Orders */}
        <div className="mt-8 space-y-3">
          {filtered.length === 0 && (
            <div className="rounded-2xl border border-ivory/10 bg-ivory/[0.02] p-12 text-center">
              <p className="font-serif text-2xl italic text-ivory/60">
                No orders {filter !== 'all' && `with status "${filter}"`} yet.
              </p>
            </div>
          )}
          {filtered.map((o) => (
            <article
              key={o.ref}
              className="rounded-2xl border border-ivory/10 bg-ivory/[0.02] p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <a
                    href={o.ref_photo_url}
                    target="_blank"
                    rel="noreferrer"
                    className="block h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-ivory/10"
                  >
                    <img
                      src={o.ref_photo_url}
                      alt="Reference"
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </a>
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm text-gold">{o.ref}</span>
                      <button
                        onClick={() => copy(o.ref, `ref-${o.ref}`)}
                        className="text-ivory/40 hover:text-gold"
                        title="Copy reference"
                      >
                        {copied === `ref-${o.ref}` ? <Check size={12} /> : <Copy size={12} />}
                      </button>
                    </div>
                    <div className="mt-1 font-serif text-xl text-ivory">{o.name}</div>
                    <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-xs text-ivory/50">
                      <span>{o.style === 'charcoal' ? 'Charcoal' : 'Urban'}</span>
                      <span className="text-gold/50">·</span>
                      <span>{o.size_label}</span>
                      <span className="text-gold/50">·</span>
                      <span className="text-gold">{formatNGN(o.amount_ngn)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <span
                    className={`rounded-full border px-3 py-1 font-sans text-[10px] uppercase tracking-widest ${STATUS_TINT[o.status]}`}
                  >
                    {o.status}
                  </span>
                  <div className="font-sans text-[10px] text-ivory/40">
                    {new Date(o.created_at).toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 border-t border-ivory/5 pt-4 sm:grid-cols-2 lg:grid-cols-4">
                <ContactCell label="Email" value={o.email} onCopy={() => copy(o.email, `e-${o.ref}`)} copied={copied === `e-${o.ref}`} />
                <ContactCell label="Phone" value={o.phone} onCopy={() => copy(o.phone, `p-${o.ref}`)} copied={copied === `p-${o.ref}`} />
                <div>
                  <div className="font-sans text-[10px] uppercase tracking-widest text-ivory/40">
                    Notes
                  </div>
                  <div className="mt-1 font-sans text-sm text-ivory/80">
                    {o.notes || <span className="text-ivory/30">—</span>}
                  </div>
                </div>
                <div>
                  <div className="font-sans text-[10px] uppercase tracking-widest text-ivory/40">
                    Reference photo
                  </div>
                  <a
                    href={o.ref_photo_url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-flex items-center gap-1.5 font-sans text-sm text-gold hover:underline"
                  >
                    <ImageIcon size={12} /> Open full size <ExternalLink size={10} />
                  </a>
                </div>
              </div>

              {/* Status actions */}
              <div className="mt-4 flex flex-wrap gap-2 border-t border-ivory/5 pt-4">
                {(['paid', 'in_progress', 'delivered'] as OrderStatus[]).map((s) =>
                  o.status === s ? null : (
                    <button
                      key={s}
                      onClick={() => setStatus(o.ref, s)}
                      className="rounded-full border border-ivory/10 px-3 py-1.5 font-sans text-[10px] uppercase tracking-widest text-ivory/70 transition-colors hover:border-gold hover:text-gold"
                    >
                      Mark {s.replace('_', ' ')}
                    </button>
                  )
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}

function ContactCell({
  label,
  value,
  onCopy,
  copied,
}: {
  label: string;
  value: string;
  onCopy: () => void;
  copied: boolean;
}) {
  return (
    <div>
      <div className="font-sans text-[10px] uppercase tracking-widest text-ivory/40">
        {label}
      </div>
      <div className="mt-1 flex items-center gap-2">
        <span className="font-sans text-sm text-ivory/80">{value}</span>
        <button onClick={onCopy} className="text-ivory/40 hover:text-gold" title={`Copy ${label}`}>
          {copied ? <Check size={12} /> : <Copy size={12} />}
        </button>
      </div>
    </div>
  );
}
