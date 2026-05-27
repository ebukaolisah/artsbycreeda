import { NextRequest, NextResponse } from 'next/server';
import { isAuthed } from '@/lib/auth';
import { ensureSchema, listOrders, type OrderStatus } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  await ensureSchema();
  const status = req.nextUrl.searchParams.get('status') as OrderStatus | null;
  const orders = await listOrders({ status: status || undefined });
  return NextResponse.json({ orders });
}
