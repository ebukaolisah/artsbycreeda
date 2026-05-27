import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { ensureSchema, createOrder, attachPaystack } from '@/lib/db';
import { initializeTransaction } from '@/lib/paystack';
import { SIZES, priceOf, type Style, type SizeId } from '@/lib/pricing';
import { generateOrderRef } from '@/lib/refgen';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    await ensureSchema();

    const fd = await req.formData();
    const style = String(fd.get('style') || '') as Style;
    const sizeId = String(fd.get('sizeId') || '') as SizeId;
    const name = String(fd.get('name') || '').trim();
    const email = String(fd.get('email') || '').trim();
    const phone = String(fd.get('phone') || '').trim();
    const notes = String(fd.get('notes') || '').trim() || null;
    const refPhoto = fd.get('refPhoto') as File | null;

    // Validate
    if (!['charcoal', 'urban'].includes(style)) {
      return NextResponse.json({ error: 'Invalid style' }, { status: 400 });
    }
    const size = SIZES.find((s) => s.id === sizeId);
    if (!size) return NextResponse.json({ error: 'Invalid size' }, { status: 400 });
    if (name.length < 2) return NextResponse.json({ error: 'Name required' }, { status: 400 });
    if (!/^\S+@\S+\.\S+$/.test(email))
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    if (phone.length < 6)
      return NextResponse.json({ error: 'Phone required' }, { status: 400 });
    if (!refPhoto)
      return NextResponse.json({ error: 'Reference photo required' }, { status: 400 });
    if (refPhoto.size > 5 * 1024 * 1024)
      return NextResponse.json({ error: 'Photo over 5 MB' }, { status: 400 });
    if (!/image\/(png|jpeg|jpg)/.test(refPhoto.type))
      return NextResponse.json({ error: 'PNG or JPG only' }, { status: 400 });

    const amount = priceOf(style, sizeId);
    if (amount <= 0)
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });

    const ref = generateOrderRef();

    // 1. Upload reference photo to Vercel Blob (private)
    const ext = refPhoto.type.includes('png') ? 'png' : 'jpg';
    const blob = await put(`refs/${ref}.${ext}`, refPhoto, {
      access: 'public',
      contentType: refPhoto.type,
      addRandomSuffix: false,
    });

    // 2. Create order row (status=pending)
    await createOrder({
      ref,
      style,
      size_id: sizeId,
      size_label: size.label,
      amount_ngn: amount,
      name,
      email,
      phone,
      notes,
      ref_photo_url: blob.url,
    });

    // 3. Initialize Paystack transaction
    const origin = new URL(req.url).origin;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || origin;
    const init = await initializeTransaction({
      email,
      amountNGN: amount,
      reference: ref,
      callbackUrl: `${baseUrl}/thanks?ref=${encodeURIComponent(ref)}`,
      metadata: { order_ref: ref, style, size: sizeId, name, phone },
    });

    // 4. Save Paystack ref + auth url onto the order
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
