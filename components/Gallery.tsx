'use client';

import { useState, useMemo, useEffect, useCallback, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Expand } from 'lucide-react';
import { ARTWORKS, CATEGORIES, type Artwork, type ArtworkCategory } from '@/lib/artworks';
import { BRAND } from '@/lib/constants';

type Filter = 'All' | ArtworkCategory;

const FILTERS: Filter[] = ['All', ...CATEGORIES];

export default function Gallery() {
  const [filter, setFilter] = useState<Filter>('All');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const filtered = useMemo(
    () => (filter === 'All' ? ARTWORKS : ARTWORKS.filter((a) => a.category === filter)),
    [filter]
  );

  const active = activeIndex !== null ? filtered[activeIndex] : null;

  const close = useCallback(() => setActiveIndex(null), []);
  const next = useCallback(() => {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex + 1) % filtered.length);
  }, [activeIndex, filtered.length]);
  const prev = useCallback(() => {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex - 1 + filtered.length) % filtered.length);
  }, [activeIndex, filtered.length]);

  // Keyboard nav for lightbox
  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [activeIndex, close, next, prev]);

  return (
    <section id="gallery" className="relative bg-charcoal py-32">
      <div className="container-art">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-gold" />
              <span className="eyebrow">Selected Work · 2024–2025</span>
            </div>
            <h2 className="display-text mt-6 text-5xl md:text-6xl lg:text-7xl">
              The <span className="italic gold-text">Portfolio</span>.
            </h2>
            <p className="mt-4 max-w-md font-sans text-ivory/60">
              Hover any piece to explore. Click to open the full study.
            </p>
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`relative rounded-full px-4 py-2 font-sans text-[11px] uppercase tracking-widest transition-all ${
                  filter === f
                    ? 'text-charcoal'
                    : 'text-ivory/60 hover:text-ivory'
                }`}
              >
                {filter === f && (
                  <motion.span
                    layoutId="filter-bg"
                    className="absolute inset-0 rounded-full bg-gold"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative">{f}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence>
            {filtered.map((art, i) => (
              <ArtworkCard
                key={art.id}
                art={art}
                index={i}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="mt-20 text-center font-sans text-ivory/40">
            No work in this category yet — check back soon.
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-charcoal/95 backdrop-blur-xl"
            onClick={close}
          >
            {/* Controls */}
            <button
              aria-label="Close"
              onClick={close}
              className="absolute right-6 top-6 grid h-12 w-12 place-items-center rounded-full border border-ivory/10 bg-charcoal/60 text-ivory transition-colors hover:border-gold hover:text-gold"
            >
              <X size={18} />
            </button>
            <button
              aria-label="Previous"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-4 grid h-12 w-12 place-items-center rounded-full border border-ivory/10 bg-charcoal/60 text-ivory transition-colors hover:border-gold hover:text-gold md:left-12"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              aria-label="Next"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-4 grid h-12 w-12 place-items-center rounded-full border border-ivory/10 bg-charcoal/60 text-ivory transition-colors hover:border-gold hover:text-gold md:right-12"
            >
              <ChevronRight size={20} />
            </button>

            <motion.div
              key={active.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="container-art grid max-h-[90vh] grid-cols-1 gap-8 overflow-y-auto md:grid-cols-5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="md:col-span-3">
                <div className="overflow-hidden rounded-2xl border border-ivory/10">
                  <img
                    src={active.src}
                    alt={active.title}
                    className="h-auto w-full object-contain"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center md:col-span-2">
                <span className="eyebrow">{active.category}</span>
                <h3 className="mt-3 font-serif text-4xl font-light italic text-ivory md:text-5xl">
                  {active.title}
                </h3>
                <div className="hairline mt-6" />
                <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 font-sans text-sm">
                  <div>
                    <dt className="text-[10px] uppercase tracking-widest text-ivory/40">
                      Medium
                    </dt>
                    <dd className="mt-1 text-ivory/80">{active.medium}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-widest text-ivory/40">
                      Year
                    </dt>
                    <dd className="mt-1 text-ivory/80">{active.year}</dd>
                  </div>
                </dl>
                {active.description && (
                  <p className="mt-6 font-sans text-base font-light leading-relaxed text-ivory/70">
                    {active.description}
                  </p>
                )}
                <a
                  href={BRAND.gumroadUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary mt-8 self-start"
                >
                  Commission a Similar Piece
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

const ArtworkCard = forwardRef<
  HTMLButtonElement,
  { art: Artwork; index: number; onClick: () => void }
>(function ArtworkCard({ art, index, onClick }, ref) {
  return (
    <motion.button
      ref={ref}
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onClick={onClick}
      className="group relative block aspect-[4/5] w-full overflow-hidden rounded-2xl border border-ivory/5 bg-charcoal text-left"
    >
      <motion.img
        src={art.src}
        alt={art.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />

      {/* Top eyebrow */}
      <div className="absolute left-5 top-5 flex items-center gap-2">
        <span className="rounded-full border border-ivory/20 bg-charcoal/50 px-3 py-1 font-sans text-[9px] uppercase tracking-widest text-ivory/80 backdrop-blur-sm">
          {art.category}
        </span>
      </div>

      {/* Hover zoom hint */}
      <div className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full border border-ivory/20 bg-charcoal/50 text-ivory backdrop-blur-sm opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100 scale-90">
        <Expand size={14} />
      </div>

      {/* Bottom title */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <div className="translate-y-1 transform transition-transform duration-500 group-hover:translate-y-0">
          <div className="font-serif text-2xl italic text-ivory md:text-3xl">
            {art.title}
          </div>
          <div className="mt-1 flex items-center gap-2 font-sans text-[10px] uppercase tracking-widest text-ivory/50">
            <span>{art.medium}</span>
            <span className="text-gold/70">·</span>
            <span>{art.year}</span>
          </div>
        </div>
        <div className="mt-3 h-px w-0 bg-gold transition-all duration-700 group-hover:w-full" />
      </div>
    </motion.button>
  );
});
