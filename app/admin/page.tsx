import { redirect } from 'next/navigation';
import Link from 'next/link';
import AdminClient from './AdminClient';
import { isAuthed } from '@/lib/auth';
import { ensureSchema, listOrders } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  if (!(await isAuthed())) redirect('/admin/login');
  await ensureSchema();
  const orders = await listOrders({ limit: 200 });
  return <AdminClient initialOrders={orders} />;
}
