'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { BRAND } from '@/lib/constants';

export default function CTA() {
  return (
    <section
      id="commission"
      className="relative overflow-hidden bg-gradient-to-b from-charcoal via-[#100d0a] to-charcoal py-32"
    >
      {/* Background hero portrait, faded */}
      <div className="absolute inset-0 opacity-20">
        <img
          src="/artworks/regal-03.png"
          alt=""
          aria-hidden
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/60 to-charcoal" />
      </div>

      <div className="container-art relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="inline-flex items-center gap-3">
            <span className="h-px w-10 bg-gold" />
            <span className="eyebrow">Your Portrait Awaits</span>
            <span className="h-px w-10 bg-gold" />
          </div>

          <h2 className="display-text mt-8 text-6xl md:text-8xl lg:text-[8rem]">
            Your image,
            <br />
            <span className="italic gold-text">timeless</span>.
          </h2>

          <p className="mt-8 mx-auto max-w-xl font-sans text-base font-light leading-relaxed text-ivory/70 md:text-lg">
            Upload your photo today. Wake up in 48 hours to a museum-grade portrait
            crafted with soul — and printable on any wall you own.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-6"
          >
            <a
              href={BRAND.commissionPath}
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gold px-10 py-5 font-sans text-sm font-medium uppercase tracking-widest text-charcoal shadow-[0_0_60px_-10px_rgba(212,175,55,0.5)] transition-all duration-500 hover:bg-teal hover:shadow-[0_0_80px_-10px_rgba(68,225,216,0.6)]"
            >
              <span className="relative">Order Yours</span>
              <ArrowUpRight
                size={18}
                className="relative transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>
          </motion.div>

          <p className="mt-6 font-sans text-xs uppercase tracking-widest text-ivory/40">
            Paystack-secured · Direct from the studio · 24–48 hr delivery
          </p>
        </motion.div>
      </div>
    </section>
  );
}
