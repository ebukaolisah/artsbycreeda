'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    quote:
      "I cried when I opened the file. It looked like she was about to step out of the frame.",
    name: 'Ifeoma A.',
    role: 'Anniversary commission',
  },
  {
    quote:
      'Better than any framed print I have ever owned — and I have owned a lot. Worth every cent.',
    name: 'Marcus T.',
    role: 'Statement Edition (36×26)',
  },
  {
    quote:
      "I sent a phone photo. What came back belonged on a museum wall.",
    name: 'Chioma O.',
    role: 'Igbo Heritage portrait',
  },
  {
    quote:
      'The turnaround was faster than my last food delivery. The quality embarrasses studios I have paid 5×.',
    name: 'David K.',
    role: 'Tribute commission',
  },
  {
    quote: 'Creeda captured my late father in a way no photograph ever did.',
    name: 'Sade B.',
    role: 'Memorial commission',
  },
  {
    quote:
      "Hands down the most thoughtful gift I've ever given. My wife still talks about it.",
    name: 'Tunde A.',
    role: 'Couples portrait',
  },
];

export default function Testimonials() {
  // Duplicate for seamless marquee
  const loop = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="relative overflow-hidden bg-charcoal py-32">
      <div className="container-art">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-3">
            <span className="h-px w-10 bg-gold" />
            <span className="eyebrow">Words from the Wall</span>
            <span className="h-px w-10 bg-gold" />
          </div>
          <h2 className="display-text mt-6 text-5xl md:text-6xl lg:text-7xl">
            Glowing <span className="italic gold-text">praise</span>,
            <br />
            from our collectors.
          </h2>
        </div>
      </div>

      <div className="relative mt-20">
        {/* Side fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-charcoal to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-charcoal to-transparent" />

        <div className="flex animate-marquee-slow gap-6 will-change-transform">
          {loop.map((t, i) => (
            <motion.figure
              key={i}
              whileHover={{ y: -4 }}
              className="flex w-[340px] shrink-0 flex-col justify-between rounded-2xl border border-ivory/10 bg-ivory/[0.02] p-8 backdrop-blur-sm transition-colors hover:border-gold/30 md:w-[420px]"
            >
              <Quote size={28} className="text-gold/60" strokeWidth={1.5} />
              <blockquote className="mt-4 font-serif text-xl italic leading-snug text-ivory/90 md:text-2xl">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 border-t border-ivory/10 pt-4">
                <div className="font-sans text-sm font-medium text-ivory">{t.name}</div>
                <div className="mt-0.5 font-sans text-[10px] uppercase tracking-widest text-ivory/40">
                  {t.role}
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
