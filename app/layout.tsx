import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Cormorant_Garamond, Montserrat } from 'next/font/google';
import AnalyticsPlaceholders from '@/components/AnalyticsPlaceholders';
import SEOJsonLd from '@/components/SEOJsonLd';
import {
  createSeoMetadata,
  organizationSchema,
  professionalServiceSchema,
  websiteSchema,
} from '@/lib/seo';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = createSeoMetadata({
  title: 'Arts By Creeda | Custom Digital Charcoal Portraits From Photo',
  description:
    'Order premium custom digital charcoal portraits from your photos. Arts By Creeda creates realistic print-ready portrait artwork for gifts, memorials, families, couples, and collectors.',
  path: '/',
  image: '/artworks/custom-charcoal-portrait-burna-boy-african-giant.png',
  keywords: [
    'custom charcoal portrait from photo',
    'digital charcoal portrait',
    'charcoal portrait gift',
    'luxury portrait gift',
    'portrait from photo',
    'custom portrait artist Lagos',
  ],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${montserrat.variable}`}>
      <body className="bg-charcoal text-ivory antialiased selection:bg-gold selection:text-charcoal">
        <SEOJsonLd data={[organizationSchema(), websiteSchema(), professionalServiceSchema()]} />
        <AnalyticsPlaceholders />
        <div className="pointer-events-none fixed inset-0 z-[60] bg-noise opacity-[0.03] mix-blend-overlay" />
        {children}
      </body>
    </html>
  );
}
