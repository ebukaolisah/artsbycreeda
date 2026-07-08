'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { BRAND } from '@/lib/constants';
import AnimatedLogo from './AnimatedLogo';

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
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.08)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(0,0,0,0.6)_0%,_transparent_50%)]" />
      </div>

      <div className="container-art relative grid min-h-screen grid-cols-1 items-center gap-10 pb-20 pt-32 lg:grid-cols-12 lg:gap-16 lg:pt-24">
        <motion.div style={{ opacity }} className="relative z-10 lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3"
          >
            <span className="h-px w-10 bg-gold" />
            <span className="eyebrow">Luxury digital charcoal portraits</span>
          </motion.div>

          <h1 className="display-text mt-6 text-[13vw] leading-[0.9] sm:text-7xl md:text-8xl lg:text-[8rem]">
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="block text-ivory"
            >
              Custom charcoal
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              portraits <span className="italic gold-text">from photo</span>.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 max-w-xl font-sans text-base font-light leading-relaxed text-ivory/70 md:text-lg"
          >
            Turn a meaningful photo into a premium digital charcoal portrait.
            Delivered as a high-resolution print-ready file for birthdays,
            anniversaries, memorials, family gifts, and collectors.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a href={BRAND.orderPath} data-track="order_click" className="btn-primary group">
              <span>Order Your Portrait</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a href="/portfolio" className="btn-outline">
              View Portfolio
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-ivory/10 pt-8"
          >
            <Stat number="600" label="DPI Files" />
            <Stat number="24-48" label="Hour Soft Copy" />
            <Stat number="120 in" label="Max Print Size" />
            <Stat number="Global" label="Digital Delivery" />
          </motion.div>
        </motion.div>

        <motion.div style={{ y, scale, opacity }} className="relative z-10 lg:col-span-5">
          <AnimatedLogo />
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 overflow-hidden border-t border-ivory/5 bg-charcoal/40 backdrop-blur-sm">
        <div className="flex animate-marquee whitespace-nowrap py-4 will-change-transform">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex shrink-0 items-center gap-12 pr-12 font-serif text-2xl italic text-ivory/30 md:text-3xl">
              <span>Portrait Gifts</span>
              <span className="text-gold/40">*</span>
              <span>Memorial Portraits</span>
              <span className="text-gold/40">*</span>
              <span>Anniversary Couples</span>
              <span className="text-gold/40">*</span>
              <span>Family Memories</span>
              <span className="text-gold/40">*</span>
              <span>Printable Wall Art</span>
              <span className="text-gold/40">*</span>
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
