import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import SEOJsonLd from '@/components/SEOJsonLd';
import StickyMobileCTA from '@/components/StickyMobileCTA';
import { BRAND } from '@/lib/constants';
import type { GuideArticle } from '@/lib/gift-guides';
import {
  absoluteUrl,
  breadcrumbSchema,
  faqPageSchema,
  imageObjectSchema,
} from '@/lib/seo';

type Props = {
  article: GuideArticle;
};

export default function GuideArticlePage({ article }: Props) {
  return (
    <main className="relative min-h-screen bg-charcoal">
      <SEOJsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            '@id': `${absoluteUrl(article.path)}#article`,
            headline: article.title,
            description: article.metaDescription,
            image: absoluteUrl(article.image),
            author: {
              '@type': 'Person',
              name: 'Creeda',
            },
            publisher: {
              '@id': absoluteUrl('/#organization'),
            },
            mainEntityOfPage: absoluteUrl(article.path),
          },
          faqPageSchema(article.faqs),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Portrait Guides', path: '/gift-guides' },
            { name: article.title, path: article.path },
          ]),
          imageObjectSchema({
            path: article.path,
            image: article.image,
            name: article.title,
            caption: article.imageAlt,
          }),
        ]}
      />
      <Navbar />
      <StickyMobileCTA />

      <article>
        <header className="container-art grid min-h-[86vh] grid-cols-1 items-center gap-12 pb-20 pt-36 lg:grid-cols-12 lg:pt-32">
          <div className="lg:col-span-7">
            <nav className="font-sans text-xs uppercase tracking-widest text-ivory/45">
              <Link href="/" className="hover:text-gold">
                Home
              </Link>
              <span className="mx-3 text-ivory/20">/</span>
              <Link href="/gift-guides" className="hover:text-gold">
                Portrait Guides
              </Link>
            </nav>
            <div className="mt-8 flex items-center gap-3">
              <span className="h-px w-10 bg-gold" />
              <span className="eyebrow">Portrait Guide</span>
            </div>
            <h1 className="display-text mt-6 max-w-4xl text-5xl md:text-7xl">
              {article.title}
            </h1>
            <p className="mt-8 max-w-2xl font-sans text-base font-light leading-relaxed text-ivory/72 md:text-lg">
              {article.excerpt}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href={BRAND.orderPath} data-track="order_click" className="btn-primary group">
                Order Your Portrait
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a href={BRAND.whatsappUrl} data-track="whatsapp_click" className="btn-outline">
                <MessageCircle size={16} aria-hidden />
                Ask on WhatsApp
              </a>
            </div>
          </div>
          <div className="lg:col-span-5">
            <figure className="overflow-hidden rounded-lg border border-ivory/10 bg-ivory/[0.025]">
              <Image
                src={article.image}
                alt={article.imageAlt}
                width={1200}
                height={1500}
                priority
                sizes="(min-width: 1024px) 38vw, 100vw"
                className="aspect-[4/5] w-full object-cover"
              />
              <figcaption className="border-t border-ivory/10 px-5 py-4 font-sans text-xs leading-relaxed text-ivory/55">
                {article.imageAlt}
              </figcaption>
            </figure>
          </div>
        </header>

        <div className="container-art grid grid-cols-1 gap-12 pb-24 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="space-y-14">
              {article.sections.map((section) => (
                <section key={section.heading} className="border-t border-ivory/10 pt-10">
                  <h2 className="font-serif text-4xl font-light italic text-ivory">
                    {section.heading}
                  </h2>
                  <div className="mt-5 space-y-5 font-sans text-base font-light leading-relaxed text-ivory/72">
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <section className="mt-16 rounded-lg border border-gold/25 bg-gold/[0.06] p-8">
              <h2 className="font-serif text-4xl font-light italic text-ivory">
                Ready to turn a photo into portrait art?
              </h2>
              <p className="mt-4 font-sans text-sm leading-relaxed text-ivory/70">
                Start with a clear image and choose the portrait format that fits the gift.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={BRAND.orderPath} data-track="order_click" className="btn-primary">
                  Send Your Photo
                </a>
                <Link href="/portfolio" className="btn-outline">
                  View Portfolio
                </Link>
              </div>
            </section>

            <section className="mt-16">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-gold" />
                <span className="eyebrow">Article FAQ</span>
              </div>
              <div className="mt-6 space-y-3">
                {article.faqs.map((faq) => (
                  <details
                    key={faq.question}
                    className="rounded-lg border border-ivory/10 bg-ivory/[0.025] p-6"
                  >
                    <summary className="cursor-pointer font-serif text-2xl text-ivory">
                      {faq.question}
                    </summary>
                    <p className="mt-4 font-sans text-sm leading-relaxed text-ivory/65">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          </div>

          <aside className="lg:col-span-4">
            <div className="sticky top-32 rounded-lg border border-ivory/10 bg-ivory/[0.025] p-6">
              <h2 className="font-serif text-3xl italic text-ivory">Continue reading</h2>
              <div className="mt-5 flex flex-col gap-3">
                {article.related.map((link) => (
                  <Link
                    key={`${link.href}-${link.label}`}
                    href={link.href}
                    className="rounded-lg border border-ivory/10 px-4 py-3 font-sans text-sm text-ivory/72 transition-colors hover:border-gold hover:text-gold"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </article>

      <Footer />
    </main>
  );
}
