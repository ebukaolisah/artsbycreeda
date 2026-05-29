'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { BRAND } from '@/lib/constants';
import { FEATURED } from '@/lib/artworks';

const HERO_IMAGE = FEATURED[0]?.src ?? '/artworks/regal-01.png';

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-screen w-full overflow-hidden bg-charcoal"
    >
      {/* Background vignette + grain */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.08)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(0,0,0,0.6)_0%,_transparent_50%)]" />
      </div>

      <div className="container-art relative grid min-h-screen grid-cols-1 items-center gap-10 pt-32 pb-20 lg:grid-cols-12 lg:gap-16 lg:pt-24">
        {/* Left — copy */}
        <motion.div
          style={{ opacity }}
          className="relative z-10 lg:col-span-7"
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3"
          >
            <span className="h-px w-10 bg-gold" />
            <span className="eyebrow">{BRAND.handle} · Est. Mastery</span>
          </motion.div>

          <h1 className="display-text mt-6 text-[14vw] leading-[0.9] sm:text-7xl md:text-8xl lg:text-[8.5rem]">
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="block text-ivory"
            >
              Where art
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              meets <span className="italic gold-text">soul</span>.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 max-w-xl font-sans text-base font-light leading-relaxed text-ivory/70 md:text-lg"
          >
            Hyper-realistic charcoal portraits, hand-crafted by Creeda with over
            two decades of mastery. Delivered as 600&nbsp;DPI digital files in
            24&ndash;48 hours &mdash; ready to print up to 120&times;120 inches.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a href={BRAND.orderPath} className="btn-primary group">
              <span>Order Yours</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#gallery" className="btn-outline">
              View the Work
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-ivory/10 pt-8"
          >
            <Stat number="600" label="DPI Resolution" />
            <Stat number="24–48" label="Hour Delivery" />
            <Stat number="120″" label="Max Print Size" />
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className="fill-gold text-gold" />
                ))}
              </div>
              <span className="font-sans text-[10px] uppercase tracking-widest text-ivory/50">
                Collector-grade
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right — portrait */}
        <motion.div
          style={{ y, scale }}
          className="relative z-10 lg:col-span-5"
        >
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md lg:max-w-none">
            {/* Decorative ring */}
            <div className="absolute -inset-6 -z-10 rounded-[2rem] border border-gold/10" />
            <div className="absolute -inset-12 -z-20 rounded-[2.5rem] border border-gold/5" />

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-full w-full overflow-hidden rounded-[1.5rem] border border-ivory/10 shadow-[0_30px_120px_-30px_rgba(0,0,0,0.8)]"
            >
              <motion.img
                src={HERO_IMAGE}
                alt="Featured charcoal portrait"
                className="h-full w-full object-cover"
                initial={{ scale: 1.15 }}
                animate={{ scale: 1 }}
                transition={{ duration: 8, ease: 'easeOut' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent" />

              {/* Floating caption card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="absolute bottom-6 left-6 right-6 rounded-2xl border border-ivory/10 bg-charcoal/60 p-4 backdrop-blur-xl"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-serif text-xl italic text-ivory">
                      {FEATURED[0]?.title ?? 'The Sovereign'}
                    </div>
                    <div className="mt-0.5 font-sans text-[10px] uppercase tracking-widest text-ivory/50">
                      Digital Charcoal · 2025
                    </div>
                  </div>
                  <div className="h-10 w-10 rounded-full border border-gold/30 grid place-items-center">
                    <span className="font-serif text-gold">✦</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Bottom marquee */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden border-t border-ivory/5 bg-charcoal/40 backdrop-blur-sm">
        <div className="flex animate-marquee whitespace-nowrap py-4 will-change-transform">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex shrink-0 items-center gap-12 pr-12 font-serif text-2xl italic text-ivory/30 md:text-3xl">
              <span>Regal Portraiture</span>
              <span className="text-gold/40">✦</span>
              <span>Igbo Heritage</span>
              <span className="text-gold/40">✦</span>
              <span>Celebrity Tributes</span>
              <span className="text-gold/40">✦</span>
              <span>Anniversary Couples</span>
              <span className="text-gold/40">✦</span>
              <span>Sacred Scenes</span>
              <span className="text-gold/40">✦</span>
              <span>Infant Memories</span>
              <span className="text-gold/40">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex flex-col">
      <span className="font-serif text-2xl font-light text-ivory md:text-3xl">{number}</span>
      <span className="mt-1 font-sans text-[10px] uppercase tracking-widest text-ivory/50">
        {label}
      </span>
    </div>
  );
}
