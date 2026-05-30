'use client';

import { motion } from 'framer-motion';

/**
 * The Art By Creeda animated logo.
 *
 * Sequence (≈ 4.2s, then loops the pencil spin + electric pulse forever):
 *   0.4s  two short divider lines draw outward from the centre
 *   0.9s  the pencil drops in upright and begins spinning around its own Y-axis
 *   1.6s  ART BY CREEDA types in letter-by-letter
 *   2.8s  the charcoal slash sweeps in behind the pencil — left to right
 *   3.2s  electric pulse starts running through the letters, A → A every 6s
 *   3.4s  subtitle fades in
 *   3.9s  decorative flourish fades in
 *
 * Pencil rotation + electric sweep both take exactly 6s so they stay in rhythm.
 */

const TITLE = 'ART BY CREEDA';
const LETTER_DELAY = 0.085; // seconds between each letter (typewriter speed)
const TITLE_START = 1.6;

/**
 * Electric current that runs through the wordmark forever after the typewriter
 * settles. One full sweep (A → A) takes exactly 6s — matching the pencil's
 * rotation, so the spin and the spark rhyme.
 */
const CYCLE_DURATION = 6; // seconds per full sweep — must match pencil spin
const FLASH_DURATION = 0.55; // each letter's flash lasts ~half a second
const SHOCK_START = 3.2; // wait for typewriter to fully settle before sparking
const PER_LETTER_STAGGER = CYCLE_DURATION / TITLE.length;

export default function AnimatedLogo() {
  return (
    <div className="relative mx-auto flex aspect-square w-full max-w-md flex-col items-center justify-center px-6 lg:max-w-none lg:px-12">
      {/* ─────────────────  PENCIL + DIVIDER LINES + BRUSH SLASH  ───────────────── */}
      <div className="relative flex items-center justify-center" style={{ height: 140 }}>
        {/* Left divider line */}
        <motion.span
          aria-hidden
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: 'right center' }}
          className="absolute right-1/2 mr-12 h-px w-20 bg-gold"
        />

        {/* Right divider line */}
        <motion.span
          aria-hidden
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: 'left center' }}
          className="absolute left-1/2 ml-12 h-px w-20 bg-gold"
        />

        {/* Charcoal brush slash behind the pencil — sweeps in at the end */}
        <motion.div
          aria-hidden
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          animate={{ clipPath: 'inset(0 0% 0 0)' }}
          transition={{ duration: 1.4, delay: 2.8, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ width: 280, height: 80 }}
        >
          <CharcoalSlash />
        </motion.div>

        {/* The pencil — drops in then spins forever around its Y axis */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10"
          style={{ perspective: 600 }}
        >
          <motion.div
            animate={{ rotateY: 360 }}
            transition={{
              duration: CYCLE_DURATION,
              ease: 'linear',
              repeat: Infinity,
              repeatType: 'loop',
            }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <Pencil />
          </motion.div>
        </motion.div>
      </div>

      {/* ─────────────────  ART BY CREEDA  (typewriter + electric pulse)  ───────────────── */}
      <h1
        className="mt-10 flex items-baseline justify-center font-serif font-medium tracking-[0.15em] text-gold"
        style={{ fontSize: 'clamp(2rem, 5.5vw, 3.5rem)' }}
      >
        {TITLE.split('').map((char, i) => (
          <motion.span
            key={`${char}-${i}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.18,
              delay: TITLE_START + i * LETTER_DELAY,
              ease: 'easeOut',
            }}
            className="inline-block"
            style={{ minWidth: char === ' ' ? '0.4em' : undefined }}
          >
            {/* Continuous electric pulse on top of the typed-in letter */}
            <motion.span
              className="inline-block"
              style={{ willChange: 'transform, color, text-shadow' }}
              animate={{
                color: ['#D4AF37', '#ffffff', '#FCE07A', '#D4AF37', '#D4AF37'],
                textShadow: [
                  '0 0 0px transparent',
                  '0 0 14px rgba(255,255,255,0.95), 0 0 26px rgba(94,231,255,0.85), 0 0 40px rgba(94,231,255,0.45)',
                  '0 0 10px rgba(212,175,55,0.75), 0 0 22px rgba(212,175,55,0.45)',
                  '0 0 0px transparent',
                  '0 0 0px transparent',
                ],
                scale: [1, 1.12, 1.04, 1, 1],
                y: [0, -2, 0, 0, 0],
              }}
              transition={{
                duration: FLASH_DURATION,
                delay: SHOCK_START + i * PER_LETTER_STAGGER,
                ease: 'easeOut',
                times: [0, 0.2, 0.5, 0.8, 1],
                repeat: Infinity,
                repeatDelay: CYCLE_DURATION - FLASH_DURATION,
              }}
            >
              {char === ' ' ? ' ' : char}
            </motion.span>
          </motion.span>
        ))}
        {/* ™ — appears right after the last letter */}
        <motion.sup
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{
            duration: 0.5,
            delay: TITLE_START + TITLE.length * LETTER_DELAY + 0.1,
          }}
          className="ml-1 font-sans text-xs text-gold/70"
        >
          ™
        </motion.sup>
      </h1>

      {/* ─────────────────  Subtitle  ───────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 3.4 }}
        className="mt-5 text-center font-sans tracking-[0.25em] text-ivory/75"
        style={{ fontSize: 'clamp(0.65rem, 1.2vw, 0.85rem)' }}
      >
        LUXURY BESPOKE CHARCOAL PORTRAIT STUDIO
      </motion.div>

      {/* ─────────────────  Decorative flourish  ───────────────── */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.8, delay: 3.9, ease: [0.22, 1, 0.36, 1] }}
        className="mt-6 flex items-center gap-3 text-gold/80"
      >
        <span className="h-px w-12 bg-gold/60" />
        <span className="font-serif text-lg">✦</span>
        <span className="h-px w-12 bg-gold/60" />
      </motion.div>
    </div>
  );
}

/* ─────────────────  Pencil (inline SVG)  ───────────────── */
function Pencil() {
  return (
    <svg
      width="36"
      height="140"
      viewBox="0 0 36 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-[0_4px_12px_rgba(212,175,55,0.25)]"
    >
      {/* Eraser cap */}
      <rect x="6" y="0" width="24" height="14" rx="2" fill="#D9446B" />
      <rect x="6" y="0" width="24" height="3" fill="#B83255" />

      {/* Metal ferrule with grooves */}
      <rect x="5" y="14" width="26" height="11" fill="#C7C7CF" />
      <rect x="5" y="16" width="26" height="1" fill="#8A8A92" />
      <rect x="5" y="19" width="26" height="1" fill="#8A8A92" />
      <rect x="5" y="22" width="26" height="1" fill="#8A8A92" />

      {/* Yellow wood body — gold-tinted to match brand */}
      <rect x="6" y="25" width="24" height="92" fill="#D4AF37" />
      {/* Left highlight */}
      <rect x="6" y="25" width="3" height="92" fill="#E6C75C" />
      {/* Right shadow */}
      <rect x="27" y="25" width="3" height="92" fill="#A8862A" />

      {/* Wood tip — bevel */}
      <polygon points="6,117 30,117 18,130" fill="#E8D080" />
      <polygon points="6,117 18,117 18,130" fill="#F5DC95" />

      {/* Graphite tip */}
      <polygon points="14,128 22,128 18,138" fill="#1a1a1a" />
    </svg>
  );
}

/* ─────────────────  Charcoal brush slash (inline SVG)  ─────────────────
 *  A loose horizontal smudge — rendered with two stacked irregular paths
 *  and a subtle gaussian blur for that pencil-on-paper texture.
 */
function CharcoalSlash() {
  return (
    <svg viewBox="0 0 280 80" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
      <defs>
        <filter id="charcoal-blur" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="0.7" />
        </filter>
        <linearGradient id="charcoal-grad" x1="0" x2="1" y1="0.5" y2="0.5">
          <stop offset="0%" stopColor="#1a1a1a" stopOpacity="0" />
          <stop offset="15%" stopColor="#2a2a2a" stopOpacity="0.85" />
          <stop offset="50%" stopColor="#3a3a3a" stopOpacity="0.95" />
          <stop offset="85%" stopColor="#2a2a2a" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#1a1a1a" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Main charcoal smudge — loose tapered horizontal shape */}
      <path
        d="M 10 42 C 30 36, 60 28, 90 32 C 120 36, 160 44, 200 40 C 230 37, 255 42, 270 38"
        stroke="url(#charcoal-grad)"
        strokeWidth="20"
        strokeLinecap="round"
        fill="none"
        filter="url(#charcoal-blur)"
      />
      {/* Lighter scattered streaks for texture */}
      <path
        d="M 30 50 C 60 46, 100 52, 150 50 C 190 48, 230 52, 260 50"
        stroke="#3a3a3a"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        opacity="0.55"
        filter="url(#charcoal-blur)"
      />
      <path
        d="M 50 30 C 80 32, 130 24, 180 30 C 220 35, 240 28, 250 30"
        stroke="#2a2a2a"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        opacity="0.4"
        filter="url(#charcoal-blur)"
      />
    </svg>
  );
}
