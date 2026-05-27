import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { CheckCircle2, Clock, Mail, MessageCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ensureSchema, getOrderByRef, markPaid, getOrderByPaystackRef } from '@/lib/db';
import { verifyTransaction } from '@/lib/paystack';
import { formatNGN } from '@/lib/pricing';
import { BRAND } from '@/lib/constants';

export const dynamic = 'force-dynamic';

interface SearchParams {
  ref?: string;
  reference?: string; // Paystack returns this on callback
  trxref?: string;
}

export default async function ThanksPage({ searchParams }: { searchParams: SearchParams }) {
  const ref = searchParams.ref || searchParams.reference || searchParams.trxref;
  if (!ref) redirect('/');

  await ensureSchema();
  let order = await getOrderByRef(ref);
  if (!order) {
    // Sometimes Paystack returns its reference instead of ours
    order = await getOrderByPaystackRef(ref);
  }

  // Verify via Paystack and mark paid (idempotent — webhook may have already done this)
  if (order && order.status === 'pending' && order.paystack_reference) {
    try {
      const verified = await verifyTransaction(order.paystack_reference);
      if (verified.status === 'success') {
        const updated = await markPaid(order.paystack_reference);
        if (updated) order = updated;
      }
    } catch (e) {
      console.error('[thanks] verify failed', e);
    }
  }

  return (
    <main className="relative min-h-screen bg-charcoal">
      <Navbar />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-96 w-[600px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[140px]" />
      </div>

      <section className="container-art relative pb-32 pt-36">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-emerald-400/40 bg-emerald-400/10">
            <CheckCircle2 size={36} className="text-emerald-400" strokeWidth={1.5} />
          </div>

          <h1 className="display-text mt-10 text-5xl md:text-6xl lg:text-7xl">
            Thank you,
            <br />
            <span className="italic gold-text">{order?.name?.split(' ')[0] || 'friend'}</span>.
          </h1>

          <p className="mt-6 font-sans text-base font-light leading-relaxed text-ivory/70 md:text-lg">
            Your commission has been received and is now in the studio queue.
            You&rsquo;ll get your <span className="text-ivory">600 DPI</span> file by
            email within <span className="text-ivory">24–48 hours</span>.
          </p>

          {order && (
            <div className="mt-12 rounded-2xl border border-ivory/10 bg-ivory/[0.02] p-6 text-left">
              <div className="flex items-center justify-between">
                <span className="eyebrow">Order Reference</span>
                <span className="rounded-full bg-emerald-400/15 px-3 py-1 font-sans text-[10px] uppercase tracking-widest text-emerald-300">
                  {order.status === 'paid' ? '✓ Paid' : order.status}
                </span>
              </div>
              <div className="mt-3 font-mono text-2xl text-gold tracking-wider">{order.ref}</div>

              <div className="hairline my-6" />

              <dl className="grid grid-cols-2 gap-y-4 gap-x-6 font-sans text-sm">
                <div>
                  <dt className="text-[10px] uppercase tracking-widest text-ivory/40">Style</dt>
                  <dd className="mt-1 text-ivory/90">
                    {order.style === 'charcoal' ? 'Charcoal Portrait' : 'Urban Art'}
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-widest text-ivory/40">Size</dt>
                  <dd className="mt-1 text-ivory/90">{order.size_label}</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-widest text-ivory/40">Total paid</dt>
                  <dd className="mt-1 font-serif text-xl text-gold">{formatNGN(order.amount_ngn)}</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-widest text-ivory/40">Delivery</dt>
                  <dd className="mt-1 text-ivory/90">24–48 hours · email</dd>
                </div>
              </dl>
            </div>
          )}

          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-ivory/10 bg-ivory/[0.02] p-4 text-left">
              <Clock size={18} className="text-gold" />
              <div className="mt-3 font-sans text-xs uppercase tracking-widest text-ivory/50">
                In studio
              </div>
              <p className="mt-1 font-sans text-sm text-ivory/80">
                Creeda starts work shortly after this confirmation.
              </p>
            </div>
            <div className="rounded-xl border border-ivory/10 bg-ivory/[0.02] p-4 text-left">
              <Mail size={18} className="text-gold" />
              <div className="mt-3 font-sans text-xs uppercase tracking-widest text-ivory/50">
                Delivered by email
              </div>
              <p className="mt-1 font-sans text-sm text-ivory/80">
                Watch your inbox — 600 DPI PNG file.
              </p>
            </div>
            <div className="rounded-xl border border-ivory/10 bg-ivory/[0.02] p-4 text-left">
              <MessageCircle size={18} className="text-gold" />
              <div className="mt-3 font-sans text-xs uppercase tracking-widest text-ivory/50">
                Questions?
              </div>
              <p className="mt-1 font-sans text-sm text-ivory/80">
                DM <a href={BRAND.socials.instagram} className="text-gold underline-offset-4 hover:underline">{BRAND.handle}</a> on Instagram.
              </p>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <a href="/" className="btn-outline">Back to the studio</a>
            <a href="/#gallery" className="btn-primary">See more work</a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
