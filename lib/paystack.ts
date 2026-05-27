import { toKobo } from './pricing';

const PAYSTACK_BASE = 'https://api.paystack.co';

function key() {
  const k = process.env.PAYSTACK_SECRET_KEY;
  if (!k) throw new Error('PAYSTACK_SECRET_KEY not set');
  return k;
}

export interface InitTxResponse {
  authorization_url: string;
  access_code: string;
  reference: string;
}

export async function initializeTransaction(input: {
  email: string;
  amountNGN: number;
  reference: string; // our internal ref — passed through
  callbackUrl: string;
  metadata?: Record<string, any>;
}): Promise<InitTxResponse> {
  const res = await fetch(`${PAYSTACK_BASE}/transaction/initialize`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: input.email,
      amount: toKobo(input.amountNGN),
      reference: input.reference,
      callback_url: input.callbackUrl,
      currency: 'NGN',
      metadata: input.metadata || {},
    }),
  });
  const json = (await res.json()) as { status: boolean; message: string; data: InitTxResponse };
  if (!res.ok || !json.status) {
    throw new Error(json.message || 'Paystack initialize failed');
  }
  return json.data;
}

export interface VerifyTxResponse {
  status: 'success' | 'failed' | 'abandoned';
  reference: string;
  amount: number; // kobo
  customer: { email: string };
  paid_at: string | null;
  channel: string;
  gateway_response: string;
}

export async function verifyTransaction(reference: string): Promise<VerifyTxResponse> {
  const res = await fetch(`${PAYSTACK_BASE}/transaction/verify/${encodeURIComponent(reference)}`, {
    headers: { Authorization: `Bearer ${key()}` },
    cache: 'no-store',
  });
  const json = (await res.json()) as { status: boolean; message: string; data: VerifyTxResponse };
  if (!res.ok || !json.status) {
    throw new Error(json.message || 'Paystack verify failed');
  }
  return json.data;
}

/**
 * Verify webhook signature per Paystack docs:
 * compute HMAC-SHA512 of raw body with secret key, compare to x-paystack-signature.
 */
export async function verifyWebhookSignature(rawBody: string, signature: string | null): Promise<boolean> {
  if (!signature) return false;
  const enc = new TextEncoder();
  const keyData = await crypto.subtle.importKey(
    'raw',
    enc.encode(key()),
    { name: 'HMAC', hash: 'SHA-512' },
    false,
    ['sign']
  );
  const sigBuf = await crypto.subtle.sign('HMAC', keyData, enc.encode(rawBody));
  const computed = Array.from(new Uint8Array(sigBuf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return computed === signature;
}
