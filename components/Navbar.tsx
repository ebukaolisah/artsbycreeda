'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { BRAND, NAV_LINKS } from '@/lib/constants';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'border-b border-ivory/5 bg-charcoal/70 backdrop-blur-xl'
            : 'bg-transparent'
        }`}
      >
        <div className="container-art flex h-20 items-center justify-between">
          <a href="#top" className="group flex items-center gap-3">
            <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-full border border-gold/40">
              <span className="absolute inset-0 bg-gold-gradient opacity-60 transition-opacity group-hover:opacity-100" />
              <span className="relative font-serif text-lg font-semibold text-charcoal">C</span>
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-serif text-xl tracking-tight text-ivory">
                {BRAND.name}
              </span>
              <span className="mt-1 hidden font-sans text-[9px] uppercase tracking-widest text-ivory/40 md:block">
                Charcoal Portraiture · est. mastery
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative px-4 py-2 font-sans text-xs uppercase tracking-[0.2em] text-ivory/70 transition-colors hover:text-ivory"
              >
                {link.label}
                <span className="pointer-events-none absolute inset-x-4 -bottom-0 h-px origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <a
            href={BRAND.gumroadUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline-flex btn-primary !px-6 !py-3 !text-[11px]"
          >
            Commission
          </a>

          <button
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="md:hidden grid h-10 w-10 place-items-center rounded-full border border-ivory/10 text-ivory/80"
          >
            <Menu size={18} />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex flex-col bg-charcoal/95 backdrop-blur-2xl md:hidden"
          >
            <div className="container-art flex h-20 items-center justify-between">
              <span className="font-serif text-xl text-ivory">{BRAND.name}</span>
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full border border-ivory/10 text-ivory/80"
              >
                <X size={18} />
              </button>
            </div>
            <div className="container-art flex flex-1 flex-col justify-center gap-2">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  className="block py-3 font-serif text-5xl font-light text-ivory hover:text-gold"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href={BRAND.gumroadUrl}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="btn-primary mt-8 self-start"
              >
                Commission Yours
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
