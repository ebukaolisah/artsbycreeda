import { sql } from '@vercel/postgres';

export type OrderStatus =
  | 'pending'
  | 'paid'
  | 'in_progress'
  | 'delivered'
  | 'failed'
  | 'refunded';

export interface Order {
  id: number;
  ref: string;
  style: 'charcoal' | 'urban';
  size_id: string;
  size_label: string;
  amount_ngn: number;
  name: string;
  email: string;
  phone: string;
  notes: string | null;
  ref_photo_url: string;
  paystack_reference: string | null;
  paystack_authorization_url: string | null;
  status: OrderStatus;
  notified_at: string | null;
  paid_at: string | null;
  delivered_at: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * Idempotent — safe to call on every cold start.
 * Creates the orders table if it doesn't exist.
 */
export async function ensureSchema() {
  await sql`
    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      ref TEXT UNIQUE NOT NULL,
      style TEXT NOT NULL,
      size_id TEXT NOT NULL,
      size_label TEXT NOT NULL,
      amount_ngn INTEGER NOT NULL,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      notes TEXT,
      ref_photo_url TEXT NOT NULL,
      paystack_reference TEXT,
      paystack_authorization_url TEXT,
      status TEXT NOT NULL DEFAULT 'pending',
      notified_at TIMESTAMPTZ,
      paid_at TIMESTAMPTZ,
      delivered_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS orders_status_idx ON orders(status)`;
  await sql`CREATE INDEX IF NOT EXISTS orders_paystack_ref_idx ON orders(paystack_reference)`;
}

export async function createOrder(input: Omit<Order, 'id' | 'paystack_reference' | 'paystack_authorization_url' | 'status' | 'notified_at' | 'paid_at' | 'delivered_at' | 'created_at' | 'updated_at'>) {
  const { rows } = await sql<Order>`
    INSERT INTO orders (
      ref, style, size_id, size_label, amount_ngn, name, email, phone, notes, ref_photo_url
    ) VALUES (
      ${input.ref}, ${input.style}, ${input.size_id}, ${input.size_label}, ${input.amount_ngn},
      ${input.name}, ${input.email}, ${input.phone}, ${input.notes}, ${input.ref_photo_url}
    )
    RETURNING *
  `;
  return rows[0];
}

export async function attachPaystack(orderRef: string, paystackRef: string, authorizationUrl: string) {
  await sql`
    UPDATE orders
    SET paystack_reference = ${paystackRef},
        paystack_authorization_url = ${authorizationUrl},
        updated_at = NOW()
    WHERE ref = ${orderRef}
  `;
}

export async function markPaid(paystackRef: string) {
  const { rows } = await sql<Order>`
    UPDATE orders
    SET status = 'paid',
        paid_at = NOW(),
        updated_at = NOW()
    WHERE paystack_reference = ${paystackRef} AND status = 'pending'
    RETURNING *
  `;
  return rows[0] || null;
}

export async function markNotified(orderRef: string) {
  await sql`
    UPDATE orders
    SET notified_at = NOW(), updated_at = NOW()
    WHERE ref = ${orderRef}
  `;
}

export async function updateStatus(orderRef: string, status: OrderStatus) {
  const { rows } = await sql<Order>`
    UPDATE orders
    SET status = ${status},
        delivered_at = CASE WHEN ${status} = 'delivered' THEN NOW() ELSE delivered_at END,
        updated_at = NOW()
    WHERE ref = ${orderRef}
    RETURNING *
  `;
  return rows[0] || null;
}

export async function getOrderByRef(orderRef: string) {
  const { rows } = await sql<Order>`SELECT * FROM orders WHERE ref = ${orderRef} LIMIT 1`;
  return rows[0] || null;
}

export async function getOrderByPaystackRef(paystackRef: string) {
  const { rows } = await sql<Order>`SELECT * FROM orders WHERE paystack_reference = ${paystackRef} LIMIT 1`;
  return rows[0] || null;
}

export async function listOrders(opts: { status?: OrderStatus; limit?: number } = {}) {
  const limit = opts.limit ?? 100;
  if (opts.status) {
    const { rows } = await sql<Order>`SELECT * FROM orders WHERE status = ${opts.status} ORDER BY created_at DESC LIMIT ${limit}`;
    return rows;
  }
  const { rows } = await sql<Order>`SELECT * FROM orders ORDER BY created_at DESC LIMIT ${limit}`;
  return rows;
}
