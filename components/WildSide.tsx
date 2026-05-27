'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

type PopPiece = {
  id: string;
  src: string;
  title: string;
  caption: string;
  tag: string;
  rotate: number; // initial tilt degrees
  accent: string; // tailwind gradient classes
};

const PIECES: PopPiece[] = [
  {
    id: 'duck-splatter',
    src: '/artworks/pop/pop-01.png',
    title: 'Duck Dynasty',
    caption: 'When pop meets pigment — chaos, cackling.',
    tag: 'Pop · Splatter',
    rotate: -3,
    accent: 'from-rose-500/30 via-amber-400/20 to-sky-500/30',
  },
  {
    id: 'rick-melt',
    src: '/artworks/pop/pop-02.png',
    title: 'Liquid Reality',
    caption: 'Two worlds bleeding into one frame.',
    tag: 'Pop · Surreal',
    rotate: 2,
    accent: 'from-fuchsia-500/30 via-cyan-400/20 to-orange-500/30',
  },
  {
    id: 'duck-storm',
    src: '/artworks/pop/pop-03.png',
    title: 'Storm Bird',
    caption: 'Lightning never asks permission.',
    tag: 'Pop · Electric',
    rotate: -2,
    accent: 'from-sky-400/30 via-violet-500/20 to-amber-400/30',
  },
  {
    id: 'reckoner',
    src: '/artworks/pop/pop-04.png',
    title: 'The Reckoner',
    caption: 'Forged in smoke, sworn to silence.',
    tag: 'Cinematic · Hyperreal',
    rotate: 3,
    accent: 'from-orange-500/30 via-red-500/20 to-amber-300/30',
  },
];

export default function WildSide() {
  return (
    <section
      id="wild-side"
      className="relative overflow-hidden bg-charcoal py-32"
    >
      {/* Splatter accent BG */}
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-[120px]" />
        <div className="absolute right-0 top-40 h-96 w-96 rounded-full bg-sky-500/10 blur-[140px]" />
        <div className="absolute bottom-20 left-1/3 h-80 w-80 rounded-full bg-amber-400/10 blur-[130px]" />
      </div>

      <div className="container-art relative">
        {/* Header */}
        <div className="grid grid-cols-1 items-end gap-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-gold" />
              <span className="eyebrow">Beyond Charcoal · A Different Voice</span>
            </div>
            <h2 className="display-text mt-6 text-6xl md:text-7xl lg:text-8xl">
              The <span className="italic gold-text">Wild</span> Side.
            </h2>
            <p className="mt-6 max-w-xl font-sans text-base font-light leading-relaxed text-ivory/70">
              When charcoal isn&rsquo;t loud enough. A separate body of work where icons get
              re-imagined in pigment, lightning, and smoke. Commission requests welcome
              for any of these styles.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <div className="inline-flex items-center gap-2 rounded-full border border-ivory/10 bg-ivory/[0.03] px-4 py-2 font-sans text-[10px] uppercase tracking-widest text-ivory/70">
              <Sparkles size={12} className="text-gold" />
              <span>Limited series · 1/1 pieces</span>
            </div>
          </div>
        </div>

        {/* Staggered grid */}
        <div className="mt-20 grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-20 lg:gap-x-16">
          {PIECES.map((piece, i) => (
            <PopCard key={piece.id} piece={piece} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PopCard({ piece, index }: { piece: PopPiece; index: number }) {
  const offsetY = index % 2 === 0 ? 0 : 60;
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotate: piece.rotate * 2 }}
      whileInView={{ opacity: 1, y: 0, rotate: piece.rotate }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ rotate: 0, y: -8, transition: { duration: 0.5 } }}
      style={{ marginTop: `${offsetY}px` }}
      className="group relative cursor-pointer"
    >
      {/* Glow halo */}
      <div
        className={`absolute -inset-3 -z-10 rounded-3xl bg-gradient-to-br ${piece.accent} opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100`}
      />

      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-ivory/10 bg-charcoal shadow-[0_20px_80px_-20px_rgba(0,0,0,0.6)]">
        {/* The image */}
        <img
          src={piece.src}
          alt={piece.title}
          onError={(e) => {
            // Show a tasteful placeholder pattern if image hasn't been added yet
            const img = e.currentTarget;
            img.style.display = 'none';
            const ph = img.nextElementSibling as HTMLElement | null;
            if (ph) ph.style.display = 'flex';
          }}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Placeholder (shown if image fails to load) */}
        <div
          style={{ display: 'none' }}
          className={`absolute inset-0 flex-col items-center justify-center bg-gradient-to-br ${piece.accent} p-8 text-center`}
        >
          <div className="font-serif text-5xl italic text-ivory/90">{piece.title}</div>
          <div className="mt-3 font-sans text-[10px] uppercase tracking-widest text-ivory/60">
            Drop <code className="rounded bg-charcoal/40 px-1.5 py-0.5">{piece.src.split('/').pop()}</code> into public{piece.src.split('/').slice(0, -1).join('/')}/
          </div>
        </div>

        {/* Top tag */}
        <div className="absolute left-4 top-4 z-10">
          <span className="rounded-full border border-ivory/20 bg-charcoal/60 px-3 py-1 font-sans text-[9px] uppercase tracking-widest text-ivory/80 backdrop-blur-sm">
            {piece.tag}
          </span>
        </div>

        {/* Gradient veil */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />

        {/* Caption */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="font-serif text-3xl italic leading-none text-ivory md:text-4xl">
            {piece.title}
          </div>
          <p className="mt-3 max-w-xs font-sans text-sm font-light text-ivory/70">
            {piece.caption}
          </p>
          <div className="mt-4 h-px w-0 bg-gradient-to-r from-gold via-fuchsia-400 to-cyan-400 transition-all duration-700 group-hover:w-full" />
        </div>
      </div>

      {/* Index label */}
      <div className="absolute -left-4 -top-4 z-20 grid h-12 w-12 place-items-center rounded-full border border-ivory/10 bg-charcoal/80 font-serif text-sm italic text-gold backdrop-blur-sm">
        №{String(index + 1).padStart(2, '0')}
      </div>
    </motion.div>
  );
}
