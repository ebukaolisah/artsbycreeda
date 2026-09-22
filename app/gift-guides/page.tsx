import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import SEOJsonLd from '@/components/SEOJsonLd';
import StickyMobileCTA from '@/components/StickyMobileCTA';
import { GUIDE_ARTICLES } from '@/lib/gift-guides';
import { BRAND } from '@/lib/constants';
import { absoluteUrl, breadcrumbSchema, createSeoMetadata } from '@/lib/seo';

export const metadata: Metadata = createSeoMetadata({
  title: 'Portrait Guides for Custom Charcoal Gifts | Arts By Creeda',
  description:
    'Helpful buying guides for custom charcoal portraits, portrait gifts, digital printing, memorial portraits, and choosing the best reference photo.',
  path: '/gift-guides',
  image: '/artworks/custom-charcoal-portrait-burna-boy-african-giant.png',
  keywords: ['portrait guides', 'custom portrait gift ideas', 'digital charcoal portrait guide'],
});

export default function GiftGuidesPage() {
  return (
    <main className="relative min-h-screen bg-charcoal">
      <SEOJsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Portrait Guides', path: '/gift-guides' },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            '@id': `${absoluteUrl('/gift-guides')}#collection`,
            name: 'Portrait Guides',
            description:
              'Buying and gift guides for custom digital charcoal portraits by Arts By Creeda.',
            url: absoluteUrl('/gift-guides'),
          },
        ]}
      />
      <Navbar />
      <StickyMobileCTA />

      <section className="container-art pb-20 pt-36 lg:pt-40">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-gold" />
            <span className="eyebrow">Portrait Guides</span>
          </div>
          <h1 className="display-text mt-6 text-5xl md:text-7xl">
            Gift guides for choosing, ordering, and printing custom portraits.
          </h1>
          <p className="mt-8 max-w-2xl font-sans text-base font-light leading-relaxed text-ivory/72 md:text-lg">
            Practical guides for buyers who want a portrait that feels premium:
            photo choice, gift ideas, printing, timing, and presentation.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href={BRAND.orderPath} data-track="order_click" className="btn-primary">
              Order Your Portrait
            </a>
            <Link href="/portfolio" className="btn-outline">
              View Portfolio
            </Link>
          </div>
        </div>
      </section>

      <section className="container-art pb-28">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {GUIDE_ARTICLES.map((article) => (
            <Link
              key={article.slug}
              href={article.path}
              className="group overflow-hidden rounded-lg border border-ivory/10 bg-ivory/[0.025] transition-colors hover:border-gold/40"
            >
              <Image
                src={article.image}
                alt={article.imageAlt}
                width={1200}
                height={1500}
                loading="lazy"
                sizes="(min-width: 1280px) 31vw, (min-width: 768px) 48vw, 100vw"
                className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="p-6">
                <span className="eyebrow">Guide</span>
                <h2 className="mt-3 font-serif text-3xl font-light italic text-ivory">
                  {article.title}
                </h2>
                <p className="mt-4 font-sans text-sm leading-relaxed text-ivory/62">
                  {article.excerpt}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-gold">
                  Read guide
                  <ArrowRight size={14} aria-hidden />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
