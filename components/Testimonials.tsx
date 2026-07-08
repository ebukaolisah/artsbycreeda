'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const PLACEHOLDERS = [
  'Client portrait story',
  'Memorial portrait note',
  'Anniversary gift reaction',
];

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-charcoal py-32">
      <div className="container-art">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-3">
            <span className="h-px w-10 bg-gold" />
            <span className="eyebrow">Client Notes</span>
            <span className="h-px w-10 bg-gold" />
          </div>
          <h2 className="display-text mt-6 text-5xl md:text-6xl lg:text-7xl">
            Real words belong <span className="italic gold-text">here</span>.
          </h2>
          <p className="mx-auto mt-6 max-w-xl font-sans text-sm leading-relaxed text-ivory/60 md:text-base">
            Add verified customer messages, screenshots, or short stories here when you have permission to publish them.
          </p>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {PLACEHOLDERS.map((label, index) => (
            <motion.figure
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="rounded-lg border border-dashed border-ivory/15 bg-ivory/[0.02] p-8"
            >
              <Quote size={26} className="text-gold/60" strokeWidth={1.5} />
              <blockquote className="mt-5 font-serif text-2xl italic leading-snug text-ivory/45">
                Add a real, approved testimonial.
              </blockquote>
              <figcaption className="mt-6 border-t border-ivory/10 pt-4">
                <div className="font-sans text-sm font-medium text-ivory/70">{label}</div>
                <div className="mt-1 font-sans text-[10px] uppercase tracking-widest text-ivory/35">
                  Placeholder only
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
