'use client';

import { motion } from 'framer-motion';
import { Upload, PenTool, Mail } from 'lucide-react';

const STEPS = [
  {
    n: '01',
    icon: Upload,
    title: 'Upload',
    body:
      'Pay through Gumroad and upload a clear PNG or JPG (up to 5 MB) in the same secure flow. The clearer the face, the more soul we can capture.',
  },
  {
    n: '02',
    icon: PenTool,
    title: 'Craft',
    body:
      'Creeda hand-renders your portrait stroke by stroke — texture, tonal range, and likeness all dialled in. Each piece is perfected before delivery.',
  },
  {
    n: '03',
    icon: Mail,
    title: 'Receive',
    body:
      'Within 24–48 hours, your 600 DPI high-resolution file lands in your inbox — ready to print up to 120 × 120 inches, frame, gift, or print on canvas.',
  },
];

export default function Process() {
  return (
    <section id="process" className="relative overflow-hidden bg-charcoal py-32">
      {/* Decorative line */}
      <div className="absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-gold/20 to-transparent lg:block" />

      <div className="container-art relative">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-3">
            <span className="h-px w-10 bg-gold" />
            <span className="eyebrow">The Process</span>
            <span className="h-px w-10 bg-gold" />
          </div>
          <h2 className="display-text mt-6 text-5xl md:text-6xl lg:text-7xl">
            Three steps,
            <br />
            <span className="italic gold-text">one heirloom</span>.
          </h2>
          <p className="mt-6 font-sans text-ivory/60">
            From upload to inbox in less than two days. No revisions — every piece is
            perfected before it leaves the studio.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="group relative"
              >
                <div className="relative h-full overflow-hidden rounded-2xl border border-ivory/10 bg-gradient-to-b from-ivory/[0.02] to-transparent p-8 transition-all duration-500 hover:border-gold/40 hover:bg-ivory/[0.04]">
                  {/* Faint big number */}
                  <span className="absolute right-4 top-0 select-none font-serif text-[10rem] leading-none text-ivory/[0.04] transition-all duration-500 group-hover:text-gold/10">
                    {step.n}
                  </span>

                  <div className="relative">
                    <div className="grid h-14 w-14 place-items-center rounded-2xl border border-gold/30 bg-gold/10 text-gold transition-all duration-500 group-hover:bg-gold group-hover:text-charcoal">
                      <Icon size={22} strokeWidth={1.5} />
                    </div>

                    <div className="mt-6 flex items-baseline gap-3">
                      <span className="font-serif text-sm text-gold">{step.n}</span>
                      <h3 className="font-serif text-3xl font-light italic text-ivory">
                        {step.title}
                      </h3>
                    </div>

                    <p className="mt-4 font-sans text-sm font-light leading-relaxed text-ivory/65">
                      {step.body}
                    </p>

                    <div className="mt-8 h-px w-12 bg-gold/40 transition-all duration-500 group-hover:w-full" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
