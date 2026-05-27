'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

const FAQS = [
  {
    q: 'How do I submit my photo?',
    a: "After completing payment on Gumroad, you'll be guided to upload your image directly in the checkout flow. Simply choose a clear PNG or JPG to ensure the best result.",
  },
  {
    q: 'What file format and size should I use?',
    a: 'We accept PNG and JPG files up to 5 MB. Please upload a clear portrait image, especially focusing on facial expression, for optimal likeness.',
  },
  {
    q: 'Are revisions available?',
    a: 'No revisions are offered. Each portrait is perfected before delivery to ensure you receive a flawless work of art.',
  },
  {
    q: 'How do I print or frame my digital file?',
    a: 'Your 600 DPI high-resolution JPEG/PDF is optimised for printing up to 120×120 inches. You can print at home, at a local print shop, or order framing through services like Framebridge or your preferred framer.',
  },
  {
    q: 'How fast is delivery?',
    a: 'Most portraits are delivered within 24–48 hours of upload. Larger or more intricate compositions may take slightly longer — we will always let you know if so.',
  },
  {
    q: 'Will my image be used elsewhere?',
    a: 'Never. Your photo is used solely for the commission and is deleted after delivery. Your portrait is yours — full personal use rights included.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-charcoal py-32">
      <div className="container-art grid grid-cols-1 gap-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="sticky top-32">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-gold" />
              <span className="eyebrow">Questions</span>
            </div>
            <h2 className="display-text mt-6 text-5xl md:text-6xl">
              Need to know <span className="italic gold-text">more</span>?
            </h2>
            <p className="mt-6 max-w-sm font-sans text-ivory/60">
              The fine print, simplified. Anything missing?{' '}
              <a href="#commission" className="text-gold underline-offset-4 hover:underline">
                Reach out
              </a>{' '}
              and we&rsquo;ll answer personally.
            </p>
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className="space-y-3">
            {FAQS.map((item, i) => {
              const isOpen = open === i;
              return (
                <motion.div
                  key={item.q}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className={`group overflow-hidden rounded-2xl border transition-colors ${
                    isOpen
                      ? 'border-gold/40 bg-ivory/[0.03]'
                      : 'border-ivory/10 hover:border-ivory/20'
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 p-6 text-left"
                  >
                    <span className="font-serif text-xl text-ivory md:text-2xl">
                      {item.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-colors ${
                        isOpen ? 'border-gold bg-gold text-charcoal' : 'border-ivory/20 text-ivory'
                      }`}
                    >
                      <Plus size={16} strokeWidth={2} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="px-6 pb-6 font-sans text-base font-light leading-relaxed text-ivory/70">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
