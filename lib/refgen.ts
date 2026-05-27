/**
 * Order reference generator. Format: ABC-YYMMDD-XXXX
 * Easy to read, search, and reference verbally on calls.
 */
export function generateOrderRef(): string {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(-2);
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const alpha = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // omit confusing chars
  let suffix = '';
  for (let i = 0; i < 4; i++) {
    suffix += alpha[Math.floor(Math.random() * alpha.length)];
  }
  return `ABC-${yy}${mm}${dd}-${suffix}`;
}
