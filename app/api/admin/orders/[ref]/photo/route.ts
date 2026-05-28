import { NextRequest, NextResponse } from 'next/server';
import { isAuthed } from '@/lib/auth';
import { getOrderByRef } from '@/lib/db';
import { getFileUrl } from '@/lib/telegram';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Admin-only — proxies the reference photo from Telegram's CDN.
 * The customer's photo lives entirely in Creeda's Telegram chat;
 * this endpoint just fetches a temporary URL on demand.
 */
export async function GET(_req: NextRequest, { params }: { params: { ref: string } }) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const order = await getOrderByRef(params.ref);
  if (!order || !order.telegram_file_id) {
    return NextResponse.json({ error: 'Photo not found' }, { status: 404 });
  }
  const url = await getFileUrl(order.telegram_file_id);
  if (!url) {
    return NextResponse.json({ error: 'Failed to resolve photo' }, { status: 502 });
  }
  // Stream the image content through our domain so we don't leak the bot token in the URL
  const upstream = await fetch(url);
  if (!upstream.ok) {
    return NextResponse.json({ error: 'Photo unavailable' }, { status: 502 });
  }
  const buf = await upstream.arrayBuffer();
  return new NextResponse(buf, {
    status: 200,
    headers: {
      'Content-Type': upstream.headers.get('Content-Type') || 'image/jpeg',
      'Cache-Control': 'private, max-age=300',
    },
  });
}
