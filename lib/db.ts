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
  /** charcoal | urban | restoration */
  style: 'charcoal' | 'urban' | 'restoration';
  /** soft | framed — only set for portraits */
  format: 'soft' | 'framed' | null;
  /** light | heavy — only set for restoration */
  damage_level: 'light' | 'heavy' | null;
  size_id: string | null;
  size_label: string | null;
  amount_ngn: number;
  name: string;
  email: string;
  phone: string;
  notes: string | null;
  // Telegram-hosted reference photo
  telegram_file_id: string | null;
  telegram_message_id: number | null;
  // Paystack
  paystack_reference: string | null;
  paystack_authorization_url: string | null;
  // Lifecycle
  status: OrderStatus;
  notified_at: string | null;
  paid_at: string | null;
  delivered_at: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * Idempotent — safe to call on every cold start.
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
      telegram_file_id TEXT,
      telegram_message_id INTEGER,
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
  // Migrations for older schemas
  await sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS telegram_file_id TEXT`;
  await sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS telegram_message_id INTEGER`;
  await sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS format TEXT`;
  await sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS damage_level TEXT`;
  // Allow size_id / size_label NULL for restoration orders
  await sql`ALTER TABLE orders ALTER COLUMN size_id DROP NOT NULL`;
  await sql`ALTER TABLE orders ALTER COLUMN size_label DROP NOT NULL`;
  await sql`CREATE INDEX IF NOT EXISTS orders_status_idx ON orders(status)`;
  await sql`CREATE INDEX IF NOT EXISTS orders_paystack_ref_idx ON orders(paystack_reference)`;
}

type CreateOrderInput = {
  ref: string;
  style: 'charcoal' | 'urban' | 'restoration';
  format: 'soft' | 'framed' | null;
  damage_level: 'light' | 'heavy' | null;
  size_id: string | null;
  size_label: string | null;
  amount_ngn: number;
  name: string;
  email: string;
  phone: string;
  notes: string | null;
  telegram_file_id: string;
  telegram_message_id: number;
};

export async function createOrder(input: CreateOrderInput) {
  const { rows } = await sql<Order>`
    INSERT INTO orders (
      ref, style, format, damage_level, size_id, size_label, amount_ngn,
      name, email, phone, notes,
      telegram_file_id, telegram_message_id
    ) VALUES (
      ${input.ref}, ${input.style}, ${input.format}, ${input.damage_level},
      ${input.size_id}, ${input.size_label}, ${input.amount_ngn},
      ${input.name}, ${input.email}, ${input.phone}, ${input.notes},
      ${input.telegram_file_id}, ${input.telegram_message_id}
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
