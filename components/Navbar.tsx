'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun, ArrowUpRight } from 'lucide-react';
import { BRAND, NAV_LINKS } from '@/lib/constants';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-5"
      >
        <div className="container-art pointer-events-auto">
          <div
            className={`flex items-center justify-between gap-3 rounded-[28px] border px-3 py-2 transition-all duration-500 md:px-4 md:py-2.5 ${
              scrolled
                ? 'border-ivory/10 bg-charcoal/75 shadow-[0_18px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-2xl'
                : 'border-ivory/[0.06] bg-charcoal/40 backdrop-blur-xl'
            }`}
          >
            {/* Logo — ABC monogram + grand wordmark */}
            <a href="#top" className="group flex items-center gap-3 pl-1">
              {/* Monogram badge — italic serif ABC on gold gradient */}
              <span className="relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-[10px] border border-gold/50 shadow-[0_4px_18px_-6px_rgba(212,175,55,0.55)] md:h-11 md:w-11">
                <span className="absolute inset-0 bg-gold-gradient opacity-90 transition-opacity group-hover:opacity-100" />
                <span className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-charcoal/20" />
                <span
                  className="relative font-serif text-[13px] italic font-semibold tracking-[0.04em] text-charcoal md:text-[14px]"
                  style={{ textShadow: '0 1px 0 rgba(255,255,255,0.35)' }}
                >
                  AbC
                </span>
              </span>

              {/* Wordmark stack — grander serif + tracked tagline */}
              <span className="flex flex-col leading-none">
                <span className="font-serif text-[20px] font-light italic tracking-[0.005em] text-ivory md:text-[22px]">
                  ArtsByCreeda
                </span>
                <span className="mt-1.5 hidden font-sans text-[8.5px] uppercase tracking-[0.42em] text-ivory/45 md:block">
                  Studio · Lagos
                </span>
              </span>
            </a>

            {/* Center nav */}
            <nav className="hidden items-center gap-0.5 md:flex">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="group relative rounded-full px-3.5 py-1.5 font-sans text-[12px] text-ivory/75 transition-colors hover:text-ivory"
                >
                  <span className="relative">{link.label}</span>
                </a>
              ))}
            </nav>

            {/* Right cluster: theme toggle + Order CTA */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                aria-label="Toggle theme"
                title="Theme (decorative)"
                className="relative grid h-9 w-9 place-items-center rounded-full border border-ivory/10 bg-ivory/[0.03] text-ivory/70 transition-colors hover:border-gold/40 hover:text-gold"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {theme === 'dark' ? (
                    <motion.span
                      key="moon"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="absolute inset-0 grid place-items-center"
                    >
                      <Moon size={14} strokeWidth={1.5} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="sun"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="absolute inset-0 grid place-items-center"
                    >
                      <Sun size={14} strokeWidth={1.5} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              <a
                href={BRAND.orderPath}
                className="group hidden items-center gap-1.5 rounded-full bg-gold px-4 py-2 font-sans text-[11px] font-medium uppercase tracking-widest text-charcoal transition-all duration-300 hover:bg-teal md:inline-flex"
              >
                <span>Order</span>
                <ArrowUpRight
                  size={13}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>

              {/* Mobile hamburger */}
              <button
                aria-label="Open menu"
                onClick={() => setOpen(true)}
                className="grid h-9 w-9 place-items-center rounded-full border border-ivory/10 bg-ivory/[0.03] text-ivory/80 md:hidden"
              >
                <Menu size={15} />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
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
                href={BRAND.orderPath}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="btn-primary mt-8 self-start"
              >
                Order Yours
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
