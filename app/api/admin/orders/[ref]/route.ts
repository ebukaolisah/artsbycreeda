import { NextRequest, NextResponse } from 'next/server';
import { isAuthed } from '@/lib/auth';
import { updateStatus, type OrderStatus } from '@/lib/db';

export const runtime = 'nodejs';

const VALID_STATUSES: OrderStatus[] = ['pending', 'paid', 'in_progress', 'delivered', 'failed', 'refunded'];

export async function PATCH(req: NextRequest, { params }: { params: { ref: string } }) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { status } = await req.json().catch(() => ({}));
  if (!VALID_STATUSES.includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }
  const updated = await updateStatus(params.ref, status);
  if (!updated) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }
  return NextResponse.json({ order: updated });
}
