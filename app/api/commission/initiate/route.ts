import { NextRequest, NextResponse } from 'next/server';
import { ensureSchema, createOrder, attachPaystack } from '@/lib/db';
import { initializeTransaction } from '@/lib/paystack';
import { sendTelegramPhoto, pendingCaption } from '@/lib/telegram';
import {
  SIZES,
  RESTORATION_LEVELS,
  priceOf,
  type Style,
  type SizeId,
  type Format,
  type DamageLevel,
} from '@/lib/pricing';
import { generateOrderRef } from '@/lib/refgen';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const VALID_STYLES: Style[] = ['charcoal', 'urban', 'restoration'];
const VALID_FORMATS: Format[] = ['soft', 'framed'];
const VALID_DAMAGE: DamageLevel[] = ['light', 'heavy'];

export async function POST(req: NextRequest) {
  try {
    await ensureSchema();

    const fd = await req.formData();
    const style = String(fd.get('style') || '') as Style;
    const format = (fd.get('format') ? String(fd.get('format')) : null) as Format | null;
    const sizeId = (fd.get('sizeId') ? String(fd.get('sizeId')) : null) as SizeId | null;
    const damageLevel = (fd.get('damageLevel')
      ? String(fd.get('damageLevel'))
      : null) as DamageLevel | null;
    const name = String(fd.get('name') || '').trim();
    const email = String(fd.get('email') || '').trim();
    const phone = String(fd.get('phone') || '').trim();
    const notes = String(fd.get('notes') || '').trim() || null;
    const refPhoto = fd.get('refPhoto') as File | null;

    /* ---------- validate ---------- */
    if (!VALID_STYLES.includes(style)) {
      return NextResponse.json({ error: 'Invalid service' }, { status: 400 });
    }

    let size: (typeof SIZES)[number] | undefined;
    if (style === 'restoration') {
      if (!damageLevel || !VALID_DAMAGE.includes(damageLevel)) {
        return NextResponse.json({ error: 'Damage level required' }, { status: 400 });
      }
    } else {
      if (!format || !VALID_FORMATS.includes(format)) {
        return NextResponse.json({ error: 'Format required' }, { status: 400 });
      }
      if (!sizeId) {
        return NextResponse.json({ error: 'Size required' }, { status: 400 });
      }
      size = SIZES.find((s) => s.id === sizeId);
      if (!size) {
        return NextResponse.json({ error: 'Invalid size' }, { status: 400 });
      }
    }

    if (name.length < 2)
      return NextResponse.json({ error: 'Name required' }, { status: 400 });
    if (!/^\S+@\S+\.\S+$/.test(email))
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    // Phone is OPTIONAL
    if (!refPhoto)
      return NextResponse.json({ error: 'Reference photo required' }, { status: 400 });
    if (refPhoto.size > 5 * 1024 * 1024)
      return NextResponse.json({ error: 'Photo over 5 MB' }, { status: 400 });
    if (!/image\/(png|jpeg|jpg)/.test(refPhoto.type))
      return NextResponse.json({ error: 'PNG or JPG only' }, { status: 400 });

    /* ---------- compute price server-side (never trust client) ---------- */
    const amount = priceOf({ style, format, sizeId, damageLevel });
    if (amount <= 0)
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });

    const ref = generateOrderRef();

    /* ---------- send photo to Creeda's Telegram ---------- */
    const buf = Buffer.from(await refPhoto.arrayBuffer());
    const ext = refPhoto.type.includes('png') ? 'png' : 'jpg';
    const { file_id, message_id } = await sendTelegramPhoto(
      buf,
      `${ref}.${ext}`,
      refPhoto.type,
      pendingCaption({
        ref,
        style,
        format,
        damage_level: damageLevel,
        size_label: size?.label ?? null,
        amount_ngn: amount,
        name,
        email,
        phone,
        notes,
      })
    );

    /* ---------- persist order ---------- */
    await createOrder({
      ref,
      style,
      format: style === 'restoration' ? null : format,
      damage_level: style === 'restoration' ? damageLevel : null,
      size_id: sizeId,
      size_label: size?.label ?? null,
      amount_ngn: amount,
      name,
      email,
      phone,
      notes,
      telegram_file_id: file_id,
      telegram_message_id: message_id,
    });

    /* ---------- Paystack init ---------- */
    const origin = new URL(req.url).origin;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || origin;
    const init = await initializeTransaction({
      email,
      amountNGN: amount,
      reference: ref,
      callbackUrl: `${baseUrl}/thanks?ref=${encodeURIComponent(ref)}`,
      metadata: {
        order_ref: ref,
        style,
        format,
        size: sizeId,
        damage_level: damageLevel,
        name,
        phone,
      },
    });

    await attachPaystack(ref, init.reference, init.authorization_url);

    return NextResponse.json({
      ref,
      authorization_url: init.authorization_url,
    });
  } catch (err: any) {
    console.error('[commission/initiate]', err);
    return NextResponse.json(
      { error: err?.message || 'Internal error' },
      { status: 500 }
    );
  }
}
