import type { Metadata } from 'next';
import { Cormorant_Garamond, Montserrat } from 'next/font/google';
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

export const metadata: Metadata = {
  title: 'ArtsByCreeda — Museum-Quality Charcoal Portraits',
  description:
    'Hyper-realistic, soul-stirring charcoal portraits delivered in 24–48 hours. Custom-crafted by Creeda — over 25 years of artistic mastery.',
  keywords: [
    'charcoal portrait',
    'custom portrait',
    'commissioned art',
    'pencil portrait',
    'ArtsByCreeda',
    'digital portrait',
    'photo restoration',
    'urban art',
    'African art',
  ],
  authors: [{ name: 'Creeda' }],
  openGraph: {
    title: 'ArtsByCreeda — Where Art Meets Soul',
    description: 'Museum-quality digital charcoal portraits, delivered in 24–48 hours.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${montserrat.variable}`}>
      <body className="bg-charcoal text-ivory antialiased selection:bg-gold selection:text-charcoal">
        <div className="pointer-events-none fixed inset-0 z-[60] bg-noise opacity-[0.03] mix-blend-overlay" />
        {children}
      </body>
    </html>
  );
}
