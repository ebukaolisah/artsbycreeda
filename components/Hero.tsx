'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { BRAND } from '@/lib/constants';

/**
 * Tiny sci-fi corner accent that hugs each corner of the logo —
 * tiny golden L-shape, like a targeting reticle.
 */
function CornerAccent({ className = '' }: { className?: string }) {
  return (
    <span aria-hidden className={`pointer-events-none block h-4 w-4 ${className}`}>
      <span className="absolute top-0 left-0 h-[2px] w-3 bg-gold/70" />
      <span className="absolute top-0 left-0 h-3 w-[2px] bg-gold/70" />
    </span>
  );
}

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

        {/* Right — futuristic animated logo */}
        <motion.div
          style={{ y, scale }}
          className="relative z-10 lg:col-span-5"
        >
          <div className="relative mx-auto aspect-square w-full max-w-md lg:max-w-none">
            {/* Outer decorative concentric rings */}
            <div className="absolute -inset-6 -z-10 rounded-full border border-gold/10" />
            <div className="absolute -inset-14 -z-20 rounded-full border border-gold/5" />
            <div className="absolute -inset-24 -z-30 rounded-full border border-gold/[0.03]" />

            {/* Rotating conic gradient halo (gold sweep) */}
            <motion.div
              aria-hidden
              className="absolute inset-[-15%] -z-10 rounded-full opacity-60"
              style={{
                background:
                  'conic-gradient(from 0deg, transparent 0deg, transparent 200deg, rgba(212,175,55,0.55) 270deg, rgba(212,175,55,0.15) 320deg, transparent 360deg)',
                filter: 'blur(28px)',
                animation: 'spin 14s linear infinite',
              }}
            />

            {/* Counter-rotating second halo (slightly faster, lighter) */}
            <motion.div
              aria-hidden
              className="absolute inset-[-25%] -z-20 rounded-full opacity-40"
              style={{
                background:
                  'conic-gradient(from 180deg, transparent 0deg, transparent 220deg, rgba(212,175,55,0.4) 280deg, transparent 360deg)',
                filter: 'blur(50px)',
                animation: 'spin 22s linear infinite reverse',
              }}
            />

            {/* Static radial glow base */}
            <div
              className="absolute inset-[-10%] -z-10 rounded-full"
              style={{
                background:
                  'radial-gradient(ellipse at center, rgba(212,175,55,0.20) 0%, transparent 65%)',
                filter: 'blur(40px)',
              }}
            />

            {/* Pulsing inner ring */}
            <motion.div
              aria-hidden
              className="absolute inset-0 rounded-full border border-gold/30"
              animate={{
                scale: [1, 1.08, 1],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* The logo with float */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-full w-full"
            >
              <motion.img
                src="/logo.png"
                alt="Art By Creeda — luxury charcoal portrait studio"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative h-full w-full object-contain drop-shadow-[0_0_40px_rgba(212,175,55,0.35)]"
              />

              {/* Scanning gold light bar — passes top to bottom */}
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-x-[10%] h-[2px] bg-gradient-to-r from-transparent via-gold/70 to-transparent"
                style={{ filter: 'blur(1px)' }}
                initial={{ top: '0%', opacity: 0 }}
                animate={{
                  top: ['0%', '100%'],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  repeatDelay: 2,
                  times: [0, 0.1, 0.9, 1],
                }}
              />

              {/* Corner accents — like sci-fi targeting reticle */}
              <CornerAccent className="absolute -left-1 -top-1" />
              <CornerAccent className="absolute -right-1 -top-1 rotate-90" />
              <CornerAccent className="absolute -left-1 -bottom-1 -rotate-90" />
              <CornerAccent className="absolute -right-1 -bottom-1 rotate-180" />
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
              <span>Cultural Heritage</span>
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
