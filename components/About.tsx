'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { BRAND } from '@/lib/constants';

const BENEFITS = [
  'No shipping delays — your portrait arrives by email',
  'No frames required (unless you want one)',
  'Print up to 120×120 inches without losing detail',
  'Hand-finished by Creeda — never an automated render',
];

export default function About() {
  return (
    <section id="about" className="relative bg-charcoal py-32">
      <div className="container-art relative grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-24">
        {/* Left — image / quote stack */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative lg:col-span-5"
        >
          <div className="relative">
            <div className="absolute -left-6 -top-6 font-serif text-[16rem] leading-none text-gold/10">
              &ldquo;
            </div>
            <blockquote className="relative max-w-md font-serif text-3xl font-light italic leading-tight text-ivory md:text-4xl">
              I don&rsquo;t draw faces.
              <br />
              <span className="gold-text">I draw what lives behind them.</span>
            </blockquote>
            <div className="mt-6 flex items-center gap-3">
              <span className="h-px w-10 bg-gold" />
              <span className="font-sans text-[10px] uppercase tracking-widest text-ivory/60">
                Creeda · Artist
              </span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="group relative mt-12 aspect-[4/5] w-full overflow-hidden rounded-[28px] border border-ivory/10 shadow-[0_30px_100px_-30px_rgba(0,0,0,0.7)] ring-1 ring-inset ring-ivory/[0.04]"
          >
            <img
              src="/creeda-portrait.png"
              alt="Creeda — the artist behind ArtsByCreeda"
              onError={(e) => {
                // Soft fallback until the photo is dropped into /public
                (e.currentTarget as HTMLImageElement).src = '/artworks/detailed-01.png';
              }}
              className="h-full w-full object-cover grayscale-[10%] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-[1.03]"
            />
            {/* Subtle bottom vignette for the name plate */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-transparent" />
            {/* Name plate */}
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
              <div>
                <div className="font-serif text-2xl italic text-ivory">Creeda</div>
                <div className="mt-1 font-sans text-[10px] uppercase tracking-widest text-ivory/55">
                  Founder &amp; Lead Artist
                </div>
              </div>
              <div className="grid h-9 w-9 place-items-center rounded-full border border-gold/40 bg-charcoal/50 text-gold backdrop-blur-sm">
                <span className="font-serif text-sm">✦</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right — copy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="lg:col-span-7"
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-gold" />
            <span className="eyebrow">About the Artist</span>
          </div>

          <h2 className="display-text mt-8 text-5xl md:text-6xl lg:text-7xl">
            A <span className="italic gold-text">quiet</span> obsession with
            <br />
            the <span className="italic">human</span> face.
          </h2>

          <div className="mt-10 space-y-6 font-sans text-base font-light leading-relaxed text-ivory/70 md:text-lg">
            <p>
              Each portrait you see here is inspired by the timeless beauty of
              traditional charcoal pencil work&mdash;but reimagined with the
              precision and depth of a world-class digital artist with over{' '}
              <span className="text-gold">25 years</span> of artistic mastery.
            </p>
            <p>
              I specialise in hyper-realistic, museum-quality pencil-style
              portraits that feel personal, powerful, and perfect for any space.
              From Afrobeats tributes to Igbo heritage pieces to anniversary
              couples &mdash; every commission is treated as a sacred study.
            </p>
          </div>

          <div className="mt-12 grid gap-3 sm:grid-cols-2">
            {BENEFITS.map((b, i) => (
              <motion.div
                key={b}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                className="group flex items-start gap-3 rounded-xl border border-ivory/5 bg-ivory/[0.02] p-4 transition-all hover:border-gold/30 hover:bg-ivory/[0.04]"
              >
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold/15 text-gold transition-colors group-hover:bg-gold group-hover:text-charcoal">
                  <Check size={12} strokeWidth={3} />
                </span>
                <span className="font-sans text-sm text-ivory/80">{b}</span>
              </motion.div>
            ))}
          </div>

          <div className="mt-12">
            <a href={BRAND.commissionPath} className="btn-primary">
              Order Yours
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
