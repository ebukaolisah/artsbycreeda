import { formatNGN } from './pricing';
import type { Order } from './db';

function botToken() {
  const t = process.env.TELEGRAM_BOT_TOKEN;
  if (!t) throw new Error('TELEGRAM_BOT_TOKEN not set');
  return t;
}

function chatId() {
  const c = process.env.TELEGRAM_CHAT_ID;
  if (!c) throw new Error('TELEGRAM_CHAT_ID not set');
  return c;
}

const TG_BASE = () => `https://api.telegram.org/bot${botToken()}`;

export async function sendTelegramMessage(text: string) {
  const res = await fetch(`${TG_BASE()}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId(),
      text,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Telegram sendMessage failed: ${res.status} ${body}`);
  }
}

/**
 * Send a photo to the configured chat. Returns the file_id (permanent reference to the photo)
 * and the message_id (so we can edit its caption later when payment lands).
 */
export async function sendTelegramPhoto(
  fileBuf: Buffer,
  filename: string,
  mime: string,
  caption: string
): Promise<{ file_id: string; message_id: number }> {
  const fd = new FormData();
  fd.append('chat_id', chatId());
  fd.append('caption', caption);
  fd.append('parse_mode', 'HTML');
  // FormData accepts a Blob; convert Buffer.
  // Note: Web FormData on Node 18+ works with Blob.
  fd.append('photo', new Blob([fileBuf as any], { type: mime }), filename);

  const res = await fetch(`${TG_BASE()}/sendPhoto`, {
    method: 'POST',
    body: fd as any,
  });
  const json = (await res.json()) as any;
  if (!res.ok || !json.ok) {
    throw new Error(`Telegram sendPhoto failed: ${json?.description || res.statusText}`);
  }
  // Pick the largest photo size — Telegram returns multiple sizes
  const photos: Array<{ file_id: string; width: number }> = json.result.photo;
  const largest = photos.sort((a, b) => b.width - a.width)[0];
  return { file_id: largest.file_id, message_id: json.result.message_id };
}

export async function editTelegramCaption(messageId: number, caption: string) {
  const res = await fetch(`${TG_BASE()}/editMessageCaption`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId(),
      message_id: messageId,
      caption,
      parse_mode: 'HTML',
    }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    // Non-fatal — log and continue
    console.warn(`[telegram] editMessageCaption failed: ${res.status} ${body}`);
  }
}

/**
 * Resolve a Telegram file_id to a temporary download URL (valid ~1 hour).
 * Used by the admin dashboard to display the reference photo on demand.
 */
export async function getFileUrl(fileId: string): Promise<string | null> {
  const res = await fetch(`${TG_BASE()}/getFile?file_id=${encodeURIComponent(fileId)}`);
  const json = (await res.json()) as any;
  if (!res.ok || !json.ok) return null;
  const path: string | undefined = json.result?.file_path;
  if (!path) return null;
  return `https://api.telegram.org/file/bot${botToken()}/${path}`;
}

/* ----------------- Caption builders ----------------- */

function escapeHtml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** One-line summary of WHAT was ordered (style + format/size or damage) */
function orderSummaryLine(o: {
  style: string;
  format: string | null;
  damage_level: string | null;
  size_label: string | null;
}) {
  if (o.style === 'restoration') {
    const lvl = o.damage_level === 'heavy' ? 'Hardly visible' : 'Still visible';
    return `🪄 Photo Restoration · ${lvl}`;
  }
  const styleLabel = o.style === 'charcoal' ? '🖋 Charcoal' : '🎨 Urban';
  const fmt = o.format === 'framed' ? 'Framed Print' : 'Soft Copy';
  return `${styleLabel} · ${fmt}${o.size_label ? ` · ${o.size_label}` : ''}`;
}

export function pendingCaption(order: {
  ref: string;
  style: string;
  format: string | null;
  damage_level: string | null;
  size_label: string | null;
  amount_ngn: number;
  name: string;
  email: string;
  phone: string;
  notes: string | null;
}) {
  return [
    `🟡 <b>PENDING ORDER</b> — awaiting payment`,
    ``,
    `<b>Ref:</b> <code>${order.ref}</code>`,
    orderSummaryLine(order),
    `<b>Amount:</b> ${formatNGN(order.amount_ngn)}`,
    ``,
    `<b>Customer:</b> ${escapeHtml(order.name)}`,
    `📧 ${escapeHtml(order.email)}`,
    order.phone ? `📱 ${escapeHtml(order.phone)}` : '',
    order.notes ? `📝 ${escapeHtml(order.notes)}` : '',
  ].filter(Boolean).join('\n');
}

export function paidCaption(order: Order, dashboardUrl: string) {
  const fulfillment =
    order.style === 'restoration'
      ? '📧 Soft copy by email · 24–48 hr'
      : order.format === 'framed'
        ? '📍 Print + frame · ready for pickup at Ojo Alaba'
        : '📧 Soft copy by email · 24–48 hr';
  return [
    `✅ <b>PAID ORDER</b> — start the studio clock`,
    ``,
    `<b>Ref:</b> <code>${order.ref}</code>`,
    orderSummaryLine(order),
    `<b>Paid:</b> ${formatNGN(order.amount_ngn)}`,
    fulfillment,
    ``,
    `<b>Customer:</b> ${escapeHtml(order.name)}`,
    `📧 ${escapeHtml(order.email)}`,
    order.phone ? `📱 ${escapeHtml(order.phone)}` : '',
    order.notes ? `📝 ${escapeHtml(order.notes)}` : '',
    ``,
    `🛠 <a href="${dashboardUrl}">Open in dashboard</a>`,
  ].filter(Boolean).join('\n');
}
