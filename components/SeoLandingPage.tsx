import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check, Mail, MessageCircle, ShieldCheck } from 'lucide-react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import SEOJsonLd from '@/components/SEOJsonLd';
import StickyMobileCTA from '@/components/StickyMobileCTA';
import { ARTWORKS } from '@/lib/artworks';
import { BRAND } from '@/lib/constants';
import { RESTORATION_LEVELS, SIZES, formatNGN } from '@/lib/pricing';
import type { SeoLandingPageData } from '@/lib/seo-pages';
import {
  breadcrumbSchema,
  faqPageSchema,
  imageObjectSchema,
  serviceSchema,
} from '@/lib/seo';

type Props = {
  page: SeoLandingPageData;
};

export default function SeoLandingPage({ page }: Props) {
  return (
    <main className="relative min-h-screen bg-charcoal">
      <SEOJsonLd
        data={[
          serviceSchema({
            path: page.path,
            name: page.schemaName,
            description: page.schemaDescription,
            image: page.image,
          }),
          faqPageSchema(page.faqs),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: page.h1, path: page.path },
          ]),
          imageObjectSchema({
            path: page.path,
            image: page.image,
            name: page.h1,
            caption: page.imageAlt,
          }),
        ]}
      />
      <Navbar />
      <StickyMobileCTA />

      <section className="container-art grid min-h-[92vh] grid-cols-1 items-center gap-12 pb-20 pt-36 lg:grid-cols-12 lg:pt-32">
        <div className="lg:col-span-7">
          <nav className="font-sans text-xs uppercase tracking-widest text-ivory/45">
            <Link href="/" className="hover:text-gold">
              Home
            </Link>
            <span className="mx-3 text-ivory/20">/</span>
            <span className="text-gold">{page.eyebrow}</span>
          </nav>

          <div className="mt-8 flex items-center gap-3">
            <span className="h-px w-10 bg-gold" />
            <span className="eyebrow">{page.eyebrow}</span>
          </div>

          <h1 className="display-text mt-6 max-w-4xl text-5xl md:text-7xl lg:text-[6.75rem]">
            {page.h1}
          </h1>

          <p className="mt-8 max-w-2xl font-sans text-base font-light leading-relaxed text-ivory/72 md:text-lg">
            {page.intro}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a href={BRAND.orderPath} data-track="order_click" className="btn-primary group">
              Order Your Portrait
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a href={BRAND.whatsappUrl} data-track="whatsapp_click" className="btn-outline">
              <MessageCircle size={16} aria-hidden />
              Start on WhatsApp
            </a>
          </div>

          <div className="mt-10 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
            {page.trust.map((item) => (
              <div
                key={item}
                className="flex min-h-14 items-center gap-3 rounded-lg border border-ivory/10 bg-ivory/[0.025] px-4 py-3"
              >
                <ShieldCheck size={16} className="shrink-0 text-gold" aria-hidden />
                <span className="font-sans text-sm text-ivory/78">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5">
          <figure className="overflow-hidden rounded-lg border border-ivory/10 bg-ivory/[0.025] shadow-[0_40px_120px_-50px_rgba(0,0,0,0.9)]">
            <Image
              src={page.image}
              alt={page.imageAlt}
              width={1200}
              height={1500}
              priority
              sizes="(min-width: 1024px) 38vw, 100vw"
              className="aspect-[4/5] w-full object-cover"
            />
            <figcaption className="border-t border-ivory/10 px-5 py-4 font-sans text-xs leading-relaxed text-ivory/55">
              {page.imageAlt}
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="border-y border-ivory/10 bg-ivory/[0.025] py-8">
        <div className="container-art grid gap-4 md:grid-cols-3">
          <TrustLine title="Digital delivery" body="Receive a high-resolution portrait file by email." />
          <TrustLine title="Print guidance" body="Use matte or fine art paper for a refined finish." />
          <TrustLine title="Private photos" body="Reference images are handled for your order and delivery." />
        </div>
      </section>

      {page.sections.map((section, index) => (
        <section
          key={section.title}
          className={`py-24 ${index % 2 === 1 ? 'bg-ivory/[0.018]' : 'bg-charcoal'}`}
        >
          <div className="container-art grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="sticky top-32">
                <div className="flex items-center gap-3">
                  <span className="h-px w-10 bg-gold" />
                  <span className="eyebrow">{section.eyebrow}</span>
                </div>
                <h2 className="display-text mt-6 text-4xl md:text-5xl">{section.title}</h2>
              </div>
            </div>
            <div className="lg:col-span-8">
              <div className="space-y-6 font-sans text-base font-light leading-relaxed text-ivory/72 md:text-lg">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              {section.bullets ? (
                <div className="mt-10 grid gap-3 sm:grid-cols-2">
                  {section.bullets.map((bullet) => (
                    <div
                      key={bullet}
                      className="flex items-start gap-3 rounded-lg border border-ivory/10 bg-charcoal/45 p-4"
                    >
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold text-charcoal">
                        <Check size={13} strokeWidth={3} aria-hidden />
                      </span>
                      <span className="font-sans text-sm leading-relaxed text-ivory/80">{bullet}</span>
                    </div>
                  ))}
                </div>
              ) : null}

              {index === 0 ? <InlineCta /> : null}
            </div>
          </div>
        </section>
      ))}

      {page.kind === 'pricing' ? <PricingBlock /> : null}
      {page.kind === 'portfolio' ? <PortfolioBlock /> : null}
      {page.kind === 'faq' ? <RevisionAndDeliveryBlock /> : null}
      {page.kind === 'info' ? <HowItWorksBlock /> : null}

      <FAQBlock faqs={page.faqs} />
      <RelatedBlock links={page.related} />
      <FinalCta />
      <Footer />
    </main>
  );
}

function TrustLine({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-lg border border-ivory/10 bg-charcoal/40 p-5">
      <h2 className="font-serif text-2xl font-light italic text-ivory">{title}</h2>
      <p className="mt-2 font-sans text-sm leading-relaxed text-ivory/60">{body}</p>
    </div>
  );
}

function InlineCta() {
  return (
    <div className="mt-12 flex flex-wrap gap-4 border-t border-ivory/10 pt-8">
      <a href={BRAND.orderPath} data-track="order_click" className="btn-primary">
        Send Your Photo
      </a>
      <a href="/portfolio" className="btn-outline">
        View Portrait Styles
      </a>
    </div>
  );
}

function PricingBlock() {
  return (
    <section className="bg-charcoal py-24">
      <div className="container-art">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-gold" />
            <span className="eyebrow">Current pricing</span>
          </div>
          <h2 className="display-text mt-6 text-4xl md:text-6xl">Portrait size pricing</h2>
          <p className="mt-5 font-sans text-base leading-relaxed text-ivory/65">
            These values are pulled from the live pricing model used by the order flow.
            The checkout page remains the final source for the total before payment.
          </p>
        </div>

        <div className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse font-sans text-sm">
            <thead>
              <tr className="border-b border-ivory/10 text-left text-[11px] uppercase tracking-widest text-ivory/45">
                <th className="py-4 pr-4">Size</th>
                <th className="px-4 py-4">Charcoal soft copy</th>
                <th className="px-4 py-4">Urban soft copy</th>
                <th className="px-4 py-4">Frame add-on</th>
                <th className="px-4 py-4">Charcoal framed total</th>
              </tr>
            </thead>
            <tbody>
              {SIZES.map((size) => (
                <tr key={size.id} className="border-b border-ivory/8 text-ivory/75">
                  <td className="py-5 pr-4 font-serif text-2xl text-ivory">{size.label}</td>
                  <td className="px-4 py-5">{formatNGN(size.charcoal)}</td>
                  <td className="px-4 py-5">{formatNGN(size.urban)}</td>
                  <td className="px-4 py-5">{formatNGN(size.frame)}</td>
                  <td className="px-4 py-5 text-gold">{formatNGN(size.charcoal + size.frame)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {Object.values(RESTORATION_LEVELS).map((level) => (
            <div key={level.label} className="rounded-lg border border-ivory/10 bg-ivory/[0.025] p-6">
              <div className="eyebrow">{level.eyebrow}</div>
              <h3 className="mt-3 font-serif text-3xl italic text-ivory">{level.label}</h3>
              <p className="mt-3 font-sans text-sm leading-relaxed text-ivory/65">
                {level.description}
              </p>
              <div className="mt-5 font-serif text-4xl font-light text-gold">
                {formatNGN(level.price)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PortfolioBlock() {
  return (
    <section className="bg-charcoal py-24">
      <div className="container-art">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ARTWORKS.map((artwork) => (
            <figure
              key={artwork.id}
              className="overflow-hidden rounded-lg border border-ivory/10 bg-ivory/[0.025]"
            >
              <Image
                src={artwork.src}
                alt={artwork.alt}
                width={1200}
                height={1500}
                loading="lazy"
                sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 100vw"
                className="aspect-[4/5] w-full object-cover"
              />
              <figcaption className="p-5">
                <h2 className="font-serif text-2xl italic text-ivory">{artwork.title}</h2>
                <p className="mt-2 font-sans text-xs uppercase tracking-widest text-gold/80">
                  {artwork.medium} / {artwork.year}
                </p>
                <p className="mt-3 font-sans text-sm leading-relaxed text-ivory/62">
                  {artwork.alt}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function RevisionAndDeliveryBlock() {
  return (
    <section className="bg-ivory/[0.018] py-24">
      <div className="container-art grid gap-6 md:grid-cols-3">
        <InfoCard title="Delivery format" body="Digital portrait orders are delivered by email as high-resolution print-ready files." />
        <InfoCard title="Revision policy" body="The current policy is no standard revision round unless a special agreement is made before ordering." />
        <InfoCard title="Photo privacy" body="Send private notes in your order if you do not want the finished portrait shown publicly." />
      </div>
    </section>
  );
}

function HowItWorksBlock() {
  const steps = [
    ['01', 'Choose', 'Pick the style, size, and delivery format that match your gift or wall.'],
    ['02', 'Upload', 'Send a clear JPG or PNG reference photo through the order flow.'],
    ['03', 'Pay', 'Complete payment securely with Paystack before studio work begins.'],
    ['04', 'Print', 'Receive your digital file and print locally with your preferred paper and frame.'],
  ];

  return (
    <section className="bg-ivory/[0.018] py-24">
      <div className="container-art grid gap-4 md:grid-cols-4">
        {steps.map(([number, title, body]) => (
          <div key={number} className="rounded-lg border border-ivory/10 bg-charcoal/45 p-6">
            <div className="font-serif text-5xl font-light text-gold">{number}</div>
            <h2 className="mt-5 font-serif text-3xl italic text-ivory">{title}</h2>
            <p className="mt-3 font-sans text-sm leading-relaxed text-ivory/65">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function InfoCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-lg border border-ivory/10 bg-charcoal/45 p-6">
      <h2 className="font-serif text-3xl italic text-ivory">{title}</h2>
      <p className="mt-3 font-sans text-sm leading-relaxed text-ivory/65">{body}</p>
    </div>
  );
}

function FAQBlock({ faqs }: { faqs: SeoLandingPageData['faqs'] }) {
  return (
    <section className="bg-charcoal py-24">
      <div className="container-art grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-gold" />
            <span className="eyebrow">FAQ</span>
          </div>
          <h2 className="display-text mt-6 text-4xl md:text-5xl">Questions before you order</h2>
        </div>
        <div className="space-y-3 lg:col-span-8">
          {faqs.map((faq) => (
            <details key={faq.question} className="rounded-lg border border-ivory/10 bg-ivory/[0.025] p-6">
              <summary className="cursor-pointer font-serif text-2xl text-ivory">
                {faq.question}
              </summary>
              <p className="mt-4 font-sans text-sm leading-relaxed text-ivory/65">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function RelatedBlock({ links }: { links: SeoLandingPageData['related'] }) {
  return (
    <section className="border-y border-ivory/10 bg-ivory/[0.018] py-16">
      <div className="container-art">
        <h2 className="font-serif text-3xl italic text-ivory">Continue through the portrait journey</h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {links.map((link) => (
            <Link
              key={`${link.href}-${link.label}`}
              href={link.href}
              className="rounded-full border border-ivory/12 px-5 py-3 font-sans text-xs uppercase tracking-widest text-ivory/70 transition-colors hover:border-gold hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="bg-charcoal py-24">
      <div className="container-art text-center">
        <div className="mx-auto max-w-3xl">
          <div className="inline-flex items-center gap-3">
            <span className="h-px w-10 bg-gold" />
            <span className="eyebrow">Ready to begin</span>
            <span className="h-px w-10 bg-gold" />
          </div>
          <h2 className="display-text mt-6 text-5xl md:text-7xl">
            Turn your photo into a timeless charcoal masterpiece.
          </h2>
          <p className="mx-auto mt-6 max-w-xl font-sans text-base leading-relaxed text-ivory/65">
            Send the photo, choose your portrait, and receive premium digital artwork ready to print.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href={BRAND.orderPath} data-track="order_click" className="btn-primary">
              <Mail size={16} aria-hidden />
              Order Your Portrait
            </a>
            <a href={BRAND.whatsappUrl} data-track="whatsapp_click" className="btn-outline">
              <MessageCircle size={16} aria-hidden />
              Get a Custom Quote
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
