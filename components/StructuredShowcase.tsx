'use client';

import { useState, useEffect, useCallback, forwardRef } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  X,
  Expand,
} from 'lucide-react';
import { BRAND } from '@/lib/constants';

/**
 * A single piece shape that both Charcoal and Wild Side galleries can share.
 */
export interface ShowcasePiece {
  id: string;
  title: string;
  src: string;
  /** Short label that sits at the top-left of the card (e.g., "Portraits", "Pop") */
  category: string;
  /** Slightly longer line shown in the lightbox */
  medium?: string;
  year?: number;
  description?: string;
}

interface Props {
  /** Section anchor id (used for #gallery / #wild-side) */
  id: string;
  /** Visible above the hero — the small chapter label */
  eyebrow: string;
  /** The big serif headline. Use **gold** in markdown-ish ** ** to highlight a word. */
  title: string;
  /** A 1-2 line copy under the title */
  subtitle?: string;
  /** Pieces — index 0 is the initial hero */
  pieces: ShowcasePiece[];
  /** Used in the right-column header (defaults to "Latest Work") */
  latestLabel?: string;
  /** Hover accent line under cards: 'gold' (charcoal section) | 'neon' (wild side) */
  accent?: 'gold' | 'neon';
  /** Right-side grid columns. Defaults to auto based on piece count. */
  gridCols?: 2 | 3 | 4 | 5;
}

export default function StructuredShowcase({
  id,
  eyebrow,
  title,
  subtitle,
  pieces,
  latestLabel = 'Latest Work',
  accent = 'gold',
  gridCols,
}: Props) {
  // Auto-pick a grid density that minimises empty cells
  const others_count = pieces.length - 1;
  const cols: 2 | 3 | 4 | 5 =
    gridCols ?? (others_count >= 12 ? 5 : others_count >= 7 ? 4 : 2);
  const gridColsClass =
    cols === 5
      ? 'grid-cols-5'
      : cols === 4
        ? 'grid-cols-4'
        : cols === 3
          ? 'grid-cols-3'
          : 'grid-cols-2';
  const [heroIndex, setHeroIndex] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const heroPrev = () =>
    setHeroIndex((heroIndex - 1 + pieces.length) % pieces.length);
  const heroNext = () => setHeroIndex((heroIndex + 1) % pieces.length);

  const hero = pieces[heroIndex];
  // Show the other pieces in the right-side grid
  const others = pieces.filter((_, i) => i !== heroIndex);

  // Lightbox controls
  const closeLightbox = useCallback(() => setLightbox(null), []);
  const lbNext = useCallback(() => {
    if (lightbox === null) return;
    setLightbox((lightbox + 1) % pieces.length);
  }, [lightbox, pieces.length]);
  const lbPrev = useCallback(() => {
    if (lightbox === null) return;
    setLightbox((lightbox - 1 + pieces.length) % pieces.length);
  }, [lightbox, pieces.length]);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') lbNext();
      if (e.key === 'ArrowLeft') lbPrev();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightbox, closeLightbox, lbNext, lbPrev]);

  const active = lightbox !== null ? pieces[lightbox] : null;

  // Helper to render the title with optional gold italic word(s)
  const renderTitle = () => {
    const parts = title.split(/\*\*(.+?)\*\*/g);
    return parts.map((p, i) =>
      i % 2 === 1 ? (
        <span key={i} className="italic gold-text">
          {p}
        </span>
      ) : (
        <span key={i}>{p}</span>
      )
    );
  };

  return (
    <section id={id} className="relative bg-charcoal py-10 md:py-14">
      <div className="container-art">
        {/* Compact section header — slim so the whole gallery fits in one viewport */}
        <div className="mb-5 flex items-baseline justify-between gap-4">
          <div className="flex items-baseline gap-4">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-gold" />
              <span className="eyebrow">{eyebrow}</span>
            </div>
            <span className="hidden h-3 w-px bg-ivory/15 md:block" />
            <h2 className="hidden font-serif text-xl font-light italic text-ivory md:block lg:text-2xl">
              {renderTitle()}
            </h2>
          </div>
          {subtitle && (
            <p className="hidden max-w-xs text-right font-sans text-[11px] uppercase tracking-widest text-ivory/40 lg:block">
              {subtitle.split('.')[0]}
            </p>
          )}
        </div>

        {/* Asymmetric layout */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-6">
          {/* LEFT — big hero (carousel) — narrower column so aspect-[4/5] reads truly portrait */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[28px] md:rounded-[32px] border border-ivory/15 bg-charcoal shadow-[0_40px_140px_-40px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.06)] ring-1 ring-inset ring-ivory/[0.04]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={hero.id}
                  src={hero.src}
                  alt={hero.title}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  style={{ objectPosition: 'center top' }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>

              {/* Gradient veil for legibility */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/10 to-charcoal/30" />

              {/* Carousel arrows */}
              <button
                onClick={heroPrev}
                aria-label="Previous piece"
                className="absolute left-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-ivory/20 bg-charcoal/40 text-ivory/80 backdrop-blur-md transition-all hover:border-gold hover:text-gold md:left-6"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={heroNext}
                aria-label="Next piece"
                className="absolute right-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-ivory/20 bg-charcoal/40 text-ivory/80 backdrop-blur-md transition-all hover:border-gold hover:text-gold md:right-6"
              >
                <ChevronRight size={18} />
              </button>

              {/* Bottom-left: View Project + dots */}
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4 md:bottom-8 md:left-8 md:right-8">
                <div className="space-y-3">
                  <button
                    onClick={() => setLightbox(heroIndex)}
                    className="group inline-flex items-center gap-2 font-sans text-sm uppercase tracking-widest text-ivory transition-colors hover:text-gold"
                  >
                    <span>View Project</span>
                    <ArrowUpRight
                      size={14}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </button>
                  <div className="flex items-center gap-1.5">
                    {pieces.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setHeroIndex(i)}
                        aria-label={`Show piece ${i + 1}`}
                        className={`h-1.5 rounded-full transition-all ${
                          i === heroIndex
                            ? 'w-6 bg-gold'
                            : 'w-1.5 bg-ivory/30 hover:bg-ivory/60'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <span className="hidden font-sans text-[10px] uppercase tracking-widest text-ivory/50 md:block">
                  Selected Work
                </span>
              </div>
            </div>

            {/* Hero meta strip (below the image) */}
            <div className="mt-4 flex items-baseline justify-between gap-4 px-1">
              <div>
                <div className="font-serif text-2xl italic text-ivory md:text-3xl">
                  {hero.title}
                </div>
                <div className="mt-1 font-sans text-[10px] uppercase tracking-widest text-ivory/40">
                  {hero.category}
                  {hero.year ? ` · ${hero.year}` : ''}
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — Latest Work grid — wider column to host more cards comfortably */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col lg:col-span-7"
          >
            {/* Latest Work header bar — its own little panel */}
            <div className="mb-3 flex items-center justify-between rounded-[20px] border border-ivory/[0.08] bg-ivory/[0.02] px-5 py-3 backdrop-blur-sm">
              <span className="inline-flex items-center gap-2 font-sans text-[13px] text-ivory">
                {latestLabel}
                <motion.span
                  animate={{ y: [0, 3, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                  className="text-gold"
                >
                  ↓
                </motion.span>
              </span>
              <a
                href={BRAND.orderPath}
                className="font-sans text-[11px] uppercase tracking-[0.18em] text-ivory/70 underline underline-offset-[6px] decoration-ivory/30 transition-colors hover:text-gold hover:decoration-gold"
              >
                View All
              </a>
            </div>

            <div className={`grid flex-1 ${gridColsClass} gap-2.5 lg:gap-3`}>
              {others.map((piece) => (
                <PieceCard
                  key={piece.id}
                  piece={piece}
                  accent={accent}
                  onClick={() => {
                    const idx = pieces.findIndex((p) => p.id === piece.id);
                    if (idx !== -1) setLightbox(idx);
                  }}
                  onPromote={() => {
                    const idx = pieces.findIndex((p) => p.id === piece.id);
                    if (idx !== -1) setHeroIndex(idx);
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
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
            onClick={closeLightbox}
          >
            <button
              aria-label="Close"
              onClick={closeLightbox}
              className="absolute right-6 top-6 grid h-12 w-12 place-items-center rounded-full border border-ivory/10 bg-charcoal/60 text-ivory hover:border-gold hover:text-gold"
            >
              <X size={18} />
            </button>
            <button
              aria-label="Previous"
              onClick={(e) => {
                e.stopPropagation();
                lbPrev();
              }}
              className="absolute left-4 grid h-12 w-12 place-items-center rounded-full border border-ivory/10 bg-charcoal/60 text-ivory hover:border-gold hover:text-gold md:left-12"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              aria-label="Next"
              onClick={(e) => {
                e.stopPropagation();
                lbNext();
              }}
              className="absolute right-4 grid h-12 w-12 place-items-center rounded-full border border-ivory/10 bg-charcoal/60 text-ivory hover:border-gold hover:text-gold md:right-12"
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
                  <img src={active.src} alt={active.title} className="h-auto w-full object-contain" />
                </div>
              </div>
              <div className="flex flex-col justify-center md:col-span-2">
                <span className="eyebrow">{active.category}</span>
                <h3 className="mt-3 font-serif text-4xl font-light italic text-ivory md:text-5xl">
                  {active.title}
                </h3>
                <div className="hairline mt-6" />
                {(active.medium || active.year) && (
                  <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 font-sans text-sm">
                    {active.medium && (
                      <div>
                        <dt className="text-[10px] uppercase tracking-widest text-ivory/40">Medium</dt>
                        <dd className="mt-1 text-ivory/80">{active.medium}</dd>
                      </div>
                    )}
                    {active.year && (
                      <div>
                        <dt className="text-[10px] uppercase tracking-widest text-ivory/40">Year</dt>
                        <dd className="mt-1 text-ivory/80">{active.year}</dd>
                      </div>
                    )}
                  </dl>
                )}
                {active.description && (
                  <p className="mt-6 font-sans text-base font-light leading-relaxed text-ivory/70">
                    {active.description}
                  </p>
                )}
                <a href={BRAND.orderPath} className="btn-primary mt-8 self-start">
                  Order a Similar Piece
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ----------------- PieceCard ----------------- */

const PieceCard = forwardRef<
  HTMLDivElement,
  {
    piece: ShowcasePiece;
    onClick: () => void;
    onPromote: () => void;
    accent?: 'gold' | 'neon';
  }
>(function PieceCard({ piece, onClick, onPromote, accent = 'gold' }, ref) {
  const accentBar =
    accent === 'neon'
      ? 'bg-gradient-to-r from-fuchsia-500 via-cyan-400 to-amber-300'
      : 'bg-gradient-to-r from-gold via-gold/80 to-gold';
  const accentGlow =
    accent === 'neon'
      ? 'group-hover:shadow-[0_0_40px_-5px_rgba(217,70,239,0.4)]'
      : 'group-hover:shadow-[0_0_40px_-5px_rgba(212,175,55,0.4)]';

  // Cursor-tracking motion values (used only when accent === 'neon')
  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);
  const sx = useSpring(mx, { stiffness: 220, damping: 24, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 220, damping: 24, mass: 0.6 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (accent !== 'neon') return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      ref={ref}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className={`group relative overflow-hidden rounded-[22px] border border-ivory/[0.08] bg-charcoal shadow-[0_18px_60px_-30px_rgba(0,0,0,0.6)] ring-1 ring-inset ring-ivory/[0.04] transition-shadow duration-500 ${accentGlow}`}
    >
      <button
        onClick={onClick}
        onDoubleClick={onPromote}
        onMouseMove={handleMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative block aspect-[4/5] w-full text-left"
        title="Click to view · double-click to promote to hero"
      >
        <img
          src={piece.src}
          alt={piece.title}
          style={{ objectPosition: 'center top' }}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/55 via-transparent to-charcoal/85" />

        {/* Cursor-following ARTSBYCREEDA neon signature (wild side only) */}
        {accent === 'neon' && (
          <motion.div
            style={{ x: sx, y: sy }}
            animate={{
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0.8,
            }}
            transition={{ opacity: { duration: 0.25 }, scale: { duration: 0.3 } }}
            className="pointer-events-none absolute left-0 top-0 z-30 -translate-x-1/2 -translate-y-1/2"
          >
            <span
              className="block font-sans text-[9px] font-bold uppercase tracking-[0.45em] text-white whitespace-nowrap"
              style={{
                textShadow: [
                  '0 0 4px #ffffff',
                  '0 0 10px #f0abfc',
                  '0 0 18px #d946ef',
                  '0 0 28px #06b6d4',
                  '0 0 40px #06b6d4',
                ].join(', '),
              }}
            >
              ArtsByCreeda
            </span>
          </motion.div>
        )}

        {/* Top-left: category label */}
        <div className="absolute left-4 top-3.5 z-10">
          <span className="font-sans text-[12px] tracking-[0.02em] text-ivory">
            {piece.category}
          </span>
        </div>

        {/* Top-right: zoom hint (shows on hover) */}
        <div className="absolute right-3 top-3 z-10 grid h-7 w-7 place-items-center rounded-full border border-ivory/15 bg-charcoal/60 text-ivory/80 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          <Expand size={11} />
        </div>

        {/* Bottom: title + animated accent underline */}
        <div className="absolute inset-x-4 bottom-3.5 z-10">
          <div className="translate-y-1 transform opacity-90 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <div className="font-serif text-sm italic text-ivory md:text-base">
              {piece.title}
            </div>
          </div>
          {/* Accent line — gold for charcoal section, neon-rainbow for wild side */}
          <div
            className={`mt-2 h-[2px] w-0 rounded-full transition-all duration-700 group-hover:w-full ${accentBar}`}
          />
        </div>
      </button>
    </motion.div>
  );
});
