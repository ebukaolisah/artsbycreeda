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

/**
 * Sends a Telegram message to the configured chat ID.
 * Uses HTML parse mode for nicer formatting.
 */
export async function sendTelegramMessage(text: string, opts: { disablePreview?: boolean } = {}) {
  const res = await fetch(`https://api.telegram.org/bot${botToken()}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId(),
      text,
      parse_mode: 'HTML',
      disable_web_page_preview: opts.disablePreview ?? false,
    }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Telegram send failed: ${res.status} ${body}`);
  }
}

export async function notifyNewPaidOrder(order: Order, dashboardUrl: string) {
  const styleLabel = order.style === 'charcoal' ? 'Charcoal' : 'Urban Art';
  const msg = [
    `🎨 <b>NEW PAID ORDER</b>`,
    ``,
    `<b>Ref:</b> <code>${order.ref}</code>`,
    `<b>Style:</b> ${styleLabel} · ${order.size_label}`,
    `<b>Amount:</b> ${formatNGN(order.amount_ngn)}`,
    ``,
    `<b>Customer:</b> ${escapeHtml(order.name)}`,
    `📧 ${escapeHtml(order.email)}`,
    `📱 ${escapeHtml(order.phone)}`,
    order.notes ? `📝 ${escapeHtml(order.notes)}` : '',
    ``,
    `📷 <a href="${order.ref_photo_url}">Reference photo</a>`,
    `🛠 <a href="${dashboardUrl}">Open in dashboard</a>`,
  ]
    .filter(Boolean)
    .join('\n');
  await sendTelegramMessage(msg);
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Helper called once during setup to discover the chat ID for your own account.
 * Calls Telegram getUpdates and returns the chat ID of the last message sent to the bot.
 */
export async function getChatIdFromUpdates(token: string): Promise<number | null> {
  const res = await fetch(`https://api.telegram.org/bot${token}/getUpdates`);
  const json = (await res.json()) as any;
  if (!json.ok) throw new Error(json.description || 'getUpdates failed');
  const update = json.result?.slice(-1)[0];
  return update?.message?.chat?.id ?? null;
}
