export type Style = 'charcoal' | 'urban';
export type SizeId = '16x20' | '20x24' | '30x20' | '24x36' | '36x26';

export interface SizeOption {
  id: SizeId;
  label: string; // e.g. "16 × 20 in"
  inches: { w: number; h: number };
  charcoal: number; // NGN
  urban: number; // NGN
}

export const SIZES: SizeOption[] = [
  { id: '16x20', label: '16 × 20 in', inches: { w: 16, h: 20 }, charcoal: 25_000, urban: 20_000 },
  { id: '20x24', label: '20 × 24 in', inches: { w: 20, h: 24 }, charcoal: 30_000, urban: 25_000 },
  { id: '30x20', label: '30 × 20 in', inches: { w: 30, h: 20 }, charcoal: 40_000, urban: 35_000 },
  { id: '24x36', label: '24 × 36 in', inches: { w: 24, h: 36 }, charcoal: 50_000, urban: 45_000 },
  { id: '36x26', label: '36 × 26 in', inches: { w: 36, h: 26 }, charcoal: 70_000, urban: 55_000 },
];

export const STYLES: Record<Style, { label: string; eyebrow: string; tagline: string }> = {
  charcoal: {
    label: 'Charcoal Portrait',
    eyebrow: 'The Studio',
    tagline: 'Hyper-real charcoal — soul, in graphite.',
  },
  urban: {
    label: 'Urban / Wild-Side Piece',
    eyebrow: 'The Wild Side',
    tagline: 'Bold, vibrant, character-driven — pop & cinematic.',
  },
};

export function priceOf(style: Style, sizeId: SizeId): number {
  const s = SIZES.find((x) => x.id === sizeId);
  if (!s) return 0;
  return style === 'charcoal' ? s.charcoal : s.urban;
}

export function formatNGN(n: number): string {
  return `₦${n.toLocaleString('en-NG')}`;
}

// Paystack expects amount in kobo (1 NGN = 100 kobo)
export function toKobo(ngn: number): number {
  return Math.round(ngn * 100);
}
