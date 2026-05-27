import { NextRequest, NextResponse } from 'next/server';
import { checkPassword, createSession, setSessionCookie, clearSessionCookie } from '@/lib/auth';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const { password } = await req.json().catch(() => ({ password: '' }));
  if (typeof password !== 'string' || !checkPassword(password)) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }
  const token = await createSession();
  await setSessionCookie(token);
  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  clearSessionCookie();
  return NextResponse.json({ ok: true });
}
