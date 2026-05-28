import { NextRequest, NextResponse } from 'next/server';
import {
  ensureSchema,
  markPaid,
  markNotified,
  getOrderByPaystackRef,
} from '@/lib/db';
import { verifyWebhookSignature, verifyTransaction } from '@/lib/paystack';
import { editTelegramCaption, paidCaption } from '@/lib/telegram';

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
      return NextResponse.json({ ok: true, ignored: event.event });
    }

    const psRef: string = event.data?.reference;
    if (!psRef) {
      return NextResponse.json({ error: 'No reference in event' }, { status: 400 });
    }

    // Double-check via Paystack API
    const verified = await verifyTransaction(psRef);
    if (verified.status !== 'success') {
      return NextResponse.json({ ok: true, status: verified.status });
    }

    let order = await markPaid(psRef);
    if (!order) {
      order = await getOrderByPaystackRef(psRef);
      if (order && order.status === 'paid' && order.notified_at) {
        return NextResponse.json({ ok: true, status: 'already_processed' });
      }
    }
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Update the existing Telegram photo's caption: PENDING → PAID
    const base = process.env.NEXT_PUBLIC_BASE_URL || new URL(req.url).origin;
    try {
      if (order.telegram_message_id) {
        await editTelegramCaption(
          order.telegram_message_id,
          paidCaption(order, `${base}/admin?ref=${encodeURIComponent(order.ref)}`)
        );
      }
      await markNotified(order.ref);
    } catch (e: any) {
      console.error('[paystack/webhook] telegram update failed:', e?.message);
      // Non-fatal — order is already marked paid
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('[paystack/webhook]', err);
    return NextResponse.json({ error: err?.message || 'Internal error' }, { status: 500 });
  }
}
