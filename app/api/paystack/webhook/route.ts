import { NextRequest, NextResponse } from 'next/server';
import {
  ensureSchema,
  markPaid,
  markNotified,
  getOrderByPaystackRef,
} from '@/lib/db';
import { verifyWebhookSignature, verifyTransaction } from '@/lib/paystack';
import { notifyNewPaidOrder } from '@/lib/telegram';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    await ensureSchema();

    const rawBody = await req.text();
    const signature = req.headers.get('x-paystack-signature');

    const valid = await verifyWebhookSignature(rawBody, signature);
    if (!valid) {
      console.warn('[paystack/webhook] invalid signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const event = JSON.parse(rawBody);
    if (event.event !== 'charge.success') {
      // Other events (refunds, transfers, etc.) — ignore for now
      return NextResponse.json({ ok: true, ignored: event.event });
    }

    const psRef: string = event.data?.reference;
    if (!psRef) {
      return NextResponse.json({ error: 'No reference in event' }, { status: 400 });
    }

    // Verify via Paystack API as a second check (don't trust webhook payload blindly)
    const verified = await verifyTransaction(psRef);
    if (verified.status !== 'success') {
      return NextResponse.json({ ok: true, status: verified.status });
    }

    // Mark paid (idempotent — markPaid only flips status if currently pending)
    let order = await markPaid(psRef);
    if (!order) {
      // Already processed
      order = await getOrderByPaystackRef(psRef);
      if (order && order.status === 'paid') {
        // Already paid AND notified? Skip
        return NextResponse.json({ ok: true, status: 'already_processed' });
      }
    }
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Notify via Telegram
    const base = process.env.NEXT_PUBLIC_BASE_URL || new URL(req.url).origin;
    try {
      await notifyNewPaidOrder(order, `${base}/admin?ref=${encodeURIComponent(order.ref)}`);
      await markNotified(order.ref);
    } catch (e: any) {
      console.error('[paystack/webhook] telegram failed:', e?.message);
      // Don't fail the webhook — Paystack will retry, and we already marked paid
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('[paystack/webhook]', err);
    return NextResponse.json({ error: err?.message || 'Internal error' }, { status: 500 });
  }
}
