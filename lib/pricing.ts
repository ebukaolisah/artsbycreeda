/* ---------------------------------------------------------------------
 * Pricing model for ArtsByCreeda
 *
 * Three top-level services:
 *   - charcoal portrait
 *   - urban / wild-side piece
 *   - photo restoration (flat-priced, no size picker)
 *
 * Portrait services have two FORMATS:
 *   - 'soft'    600 DPI digital file emailed in 24–48 hr
 *   - 'framed'  printed, framed in Black Pre-cast, picked up at Ojo Alaba
 *
 * Frame cost is added on top of the soft-copy price and depends ONLY
 * on the size, not on the artwork style.
 * ------------------------------------------------------------------- */

export type Style = 'charcoal' | 'urban' | 'restoration';
export type SizeId = '16x20' | '20x24' | '30x20' | '24x36' | '36x26';
export type Format = 'soft' | 'framed';
export type DamageLevel = 'light' | 'heavy';

export interface SizeOption {
  id: SizeId;
  label: string;
  inches: { w: number; h: number };
  /** Soft-copy price for a Charcoal portrait at this size */
  charcoal: number;
  /** Soft-copy price for an Urban / Wild-Side piece at this size */
  urban: number;
  /** Add-on for the Black Pre-cast frame at this size (style-agnostic) */
  frame: number;
}

export const SIZES: SizeOption[] = [
  { id: '16x20', label: '16 × 20 in', inches: { w: 16, h: 20 }, charcoal: 20_000, urban: 15_000, frame: 10_000 },
  { id: '20x24', label: '20 × 24 in', inches: { w: 20, h: 24 }, charcoal: 25_000, urban: 20_000, frame: 10_000 },
  { id: '30x20', label: '30 × 20 in', inches: { w: 30, h: 20 }, charcoal: 35_000, urban: 30_000, frame: 15_000 },
  { id: '24x36', label: '24 × 36 in', inches: { w: 24, h: 36 }, charcoal: 45_000, urban: 40_000, frame: 20_000 },
  { id: '36x26', label: '36 × 26 in', inches: { w: 36, h: 26 }, charcoal: 55_000, urban: 50_000, frame: 25_000 },
];

export const STYLES: Record<
  Style,
  { label: string; eyebrow: string; tagline: string; short: string }
> = {
  charcoal: {
    label: 'Charcoal Portrait',
    eyebrow: 'The Studio',
    tagline: 'Hyper-real charcoal — soul, in graphite.',
    short: 'Charcoal',
  },
  urban: {
    label: 'Urban / Wild-Side Piece',
    eyebrow: 'The Wild Side',
    tagline: 'Bold, vibrant, character-driven — pop & cinematic.',
    short: 'Urban',
  },
  restoration: {
    label: 'Photo Restoration',
    eyebrow: 'Repair & Revive',
    tagline: 'Old, damaged photos rescued and re-rendered.',
    short: 'Restoration',
  },
};

export const FORMATS: Record<Format, { label: string; tagline: string; eyebrow: string }> = {
  soft: {
    label: 'Soft Copy',
    eyebrow: 'Digital · 24–48 hr',
    tagline: '600 DPI file by email. Print anywhere, any size up to 120″.',
  },
  framed: {
    label: 'Framed Print',
    eyebrow: 'Black Pre-cast · Pickup',
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
    eyebrow: 'Light · Soft Copy only',
  },
  heavy: {
    label: 'Hardly visible',
    price: 25_000,
    description: 'Heavy damage, torn, blurred, very faded. The hardest revival.',
    eyebrow: 'Heavy · Soft Copy only',
  },
};

/** Pickup studio for framed orders */
export const PICKUP_HQ = {
  address: '12 Dobil Avenue, Ojo Alaba, Lagos, Nigeria',
  short: 'Ojo Alaba, Lagos',
  islandBranchSoon: true,
};

/** Total price for the customer, in NGN. Returns 0 when input isn't fully chosen yet. */
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
  const size = SIZES.find((s) => s.id === input.sizeId);
  if (!size) return 0;
  const base = input.style === 'charcoal' ? size.charcoal : size.urban;
  return input.format === 'framed' ? base + size.frame : base;
}

export function formatNGN(n: number): string {
  return `₦${n.toLocaleString('en-NG')}`;
}

/** Paystack expects amount in kobo (1 NGN = 100 kobo) */
export function toKobo(ngn: number): number {
  return Math.round(ngn * 100);
}
