/* ---------------------------------------------------------------------
 * Pricing model for Arts By Creeda.
 *
 * Three top-level services:
 * - charcoal portrait
 * - urban / wild-side piece
 * - photo restoration
 * ------------------------------------------------------------------- */

export type Style = 'charcoal' | 'urban' | 'restoration';
export type SizeId = '16x20' | '20x24' | '30x20' | '24x36' | '36x26';
export type Format = 'soft' | 'framed';
export type DamageLevel = 'light' | 'heavy';

export interface SizeOption {
  id: SizeId;
  label: string;
  inches: { w: number; h: number };
  charcoal: number;
  urban: number;
  frame: number;
}

export const SIZES: SizeOption[] = [
  { id: '16x20', label: '16 x 20 in', inches: { w: 16, h: 20 }, charcoal: 20_000, urban: 15_000, frame: 10_000 },
  { id: '20x24', label: '20 x 24 in', inches: { w: 20, h: 24 }, charcoal: 25_000, urban: 20_000, frame: 10_000 },
  { id: '30x20', label: '30 x 20 in', inches: { w: 30, h: 20 }, charcoal: 35_000, urban: 30_000, frame: 15_000 },
  { id: '24x36', label: '24 x 36 in', inches: { w: 24, h: 36 }, charcoal: 45_000, urban: 40_000, frame: 20_000 },
  { id: '36x26', label: '36 x 26 in', inches: { w: 36, h: 26 }, charcoal: 55_000, urban: 50_000, frame: 25_000 },
];

export const STYLES: Record<
  Style,
  { label: string; eyebrow: string; tagline: string; short: string }
> = {
  charcoal: {
    label: 'Charcoal Portrait',
    eyebrow: 'The Studio',
    tagline: 'Hyper-real charcoal portrait with a premium dark pencil finish.',
    short: 'Charcoal',
  },
  urban: {
    label: 'Urban / Wild-Side Piece',
    eyebrow: 'The Wild Side',
    tagline: 'Bold, vibrant, character-driven pop and cinematic artwork.',
    short: 'Urban',
  },
  restoration: {
    label: 'Photo Restoration',
    eyebrow: 'Repair and Revive',
    tagline: 'Old or damaged photos rescued and re-rendered.',
    short: 'Restoration',
  },
};

export const FORMATS: Record<Format, { label: string; tagline: string; eyebrow: string }> = {
  soft: {
    label: 'Soft Copy',
    eyebrow: 'Digital / 24-48 hr',
    tagline: '600 DPI file by email. Print anywhere, any size up to 120 inches.',
  },
  framed: {
    label: 'Framed Print',
    eyebrow: 'Black Pre-cast / Pickup',
    tagline: 'Printed and framed in Black Pre-cast. Pickup at our Ojo Alaba studio.',
  },
};

export const RESTORATION_LEVELS: Record<
  DamageLevel,
  { label: string; price: number; description: string; eyebrow: string }
> = {
  light: {
    label: 'Still visible',
    price: 10_000,
    description: 'Light damage, faded colour, but the face is still recognisable.',
    eyebrow: 'Light / Soft Copy only',
  },
  heavy: {
    label: 'Hardly visible',
    price: 25_000,
    description: 'Heavy damage, torn, blurred, or very faded.',
    eyebrow: 'Heavy / Soft Copy only',
  },
};

export const PICKUP_HQ = {
  address: '12 Dobil Avenue, Ojo Alaba, Lagos, Nigeria',
  short: 'Ojo Alaba, Lagos',
  islandBranchSoon: true,
};

export interface PriceInput {
  style: Style | null;
  format?: Format | null;
  sizeId?: SizeId | null;
  damageLevel?: DamageLevel | null;
}

export function priceOf(input: PriceInput): number {
  if (!input.style) return 0;
  if (input.style === 'restoration') {
    const level = input.damageLevel ?? 'light';
    return RESTORATION_LEVELS[level].price;
  }
  if (!input.sizeId || !input.format) return 0;
  const size = SIZES.find((option) => option.id === input.sizeId);
  if (!size) return 0;
  const base = input.style === 'charcoal' ? size.charcoal : size.urban;
  return input.format === 'framed' ? base + size.frame : base;
}

export function formatNGN(n: number): string {
  return `NGN ${n.toLocaleString('en-NG')}`;
}

export function toKobo(ngn: number): number {
  return Math.round(ngn * 100);
}
