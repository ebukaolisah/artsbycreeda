import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Gallery from '@/components/Gallery';
import WildSide from '@/components/WildSide';
import About from '@/components/About';
import Craft from '@/components/Craft';
import Process from '@/components/Process';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import SEOJsonLd from '@/components/SEOJsonLd';
import StickyMobileCTA from '@/components/StickyMobileCTA';
import { breadcrumbSchema, createSeoMetadata, imageObjectSchema, serviceSchema } from '@/lib/seo';

export const metadata: Metadata = createSeoMetadata({
  title: 'Arts By Creeda | Luxury Digital Charcoal Portrait Gifts',
  description:
    'Turn a photo into a timeless digital charcoal masterpiece. Order premium print-ready portrait artwork for birthdays, anniversaries, memorials, family gifts, and collectors.',
  path: '/',
  image: '/artworks/custom-charcoal-portrait-burna-boy-african-giant.png',
  keywords: [
    'custom charcoal portrait from photo',
    'digital charcoal portrait',
    'charcoal portrait gift',
    'luxury portrait gift',
    'premium digital portrait',
  ],
});

export default function HomePage() {
  return (
    <main className="relative">
      <SEOJsonLd
        data={[
          serviceSchema({
            path: '/',
            name: 'Custom digital charcoal portraits from photos',
            description:
              'Premium hyper-realistic digital charcoal portrait service for gifts, memorials, families, couples, and collectors.',
            image: '/artworks/custom-charcoal-portrait-burna-boy-african-giant.png',
          }),
          breadcrumbSchema([{ name: 'Home', path: '/' }]),
          imageObjectSchema({
            path: '/',
            image: '/artworks/custom-charcoal-portrait-burna-boy-african-giant.png',
            name: 'Custom digital charcoal portrait by Arts By Creeda',
            caption: 'Custom charcoal portrait from photo by Arts By Creeda',
          }),
        ]}
      />
      <Navbar />
      <StickyMobileCTA />
      <Hero />
      <Gallery />
      <WildSide />
      <About />
      <Craft />
      <Process />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
