// Canonical host is the NON-www apex — matches Paystack callbacks + Vercel primary.
// www.artsbycreeda.com 301-redirects to this in next.config.mjs.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_BASE_URL || 'https://artsbycreeda.com'
).replace(/\/$/, '');

export const BRAND = {
  name: 'Arts By Creeda',
  shortName: 'ArtsByCreeda',
  handle: '@ArtsByCreeda',
  tagline: 'Where art meets soul',
  description:
    'Premium hyper-realistic digital charcoal portraits created from customer photos and delivered as print-ready high-resolution files.',
  orderPath: '/order',
  email: 'hello@artsbycreeda.com',
  location: {
    city: 'Lagos',
    region: 'Lagos',
    country: 'Nigeria',
  },
  whatsappUrl: process.env.NEXT_PUBLIC_WHATSAPP_URL || 'https://wa.me/qr/VGZIT2SBXMMNC1',
  socials: {
    instagram: 'https://instagram.com/artsbycreeda',
    facebook: 'https://facebook.com/artsbycreeda',
    tiktok: 'https://tiktok.com/@artsbycreeda',
    twitter: 'https://x.com/artsbycreeda',
  },
} as const;

export const NAV_LINKS = [
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Guides', href: '/gift-guides' },
] as const;

export const MAIN_SERVICE_LINKS = [
  { label: 'Custom charcoal portrait from photo', href: '/custom-charcoal-portrait-from-photo' },
  { label: 'Digital charcoal portrait', href: '/digital-charcoal-portrait' },
  { label: 'Family charcoal portrait', href: '/family-charcoal-portrait' },
  { label: 'Couple charcoal portrait', href: '/couple-charcoal-portrait' },
  { label: 'Luxury portrait art', href: '/luxury-portrait-art' },
  { label: 'Charcoal portrait artist Nigeria', href: '/charcoal-portrait-artist-nigeria' },
] as const;

export const GIFT_LINKS = [
  { label: 'Charcoal portrait gift', href: '/charcoal-portrait-gift' },
  { label: 'Anniversary portrait gift', href: '/anniversary-portrait-gift' },
  { label: 'Birthday portrait gift', href: '/birthday-portrait-gift' },
  { label: 'Memorial portrait from photo', href: '/memorial-portrait-from-photo' },
] as const;

export const FUNNEL_LINKS = [
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'How it works', href: '/how-it-works' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Order', href: '/order' },
  { label: 'Portrait Guides', href: '/gift-guides' },
] as const;
