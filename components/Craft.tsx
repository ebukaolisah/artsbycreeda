'use client';

import { motion } from 'framer-motion';
import { Sparkles, Cpu, Hand } from 'lucide-react';

/**
 * The Craft Behind the Code
 *
 * The "AI + human" positioning. Defuses the "is this just ChatGPT?" question
 * publicly so a collector paying ₦70k feels justified, not skeptical.
 *
 * Voice: "Confident craftsman" (Option 1 chosen by the user).
 */
export default function Craft() {
  return (
    <section
      id="craft"
      className="relative overflow-hidden bg-charcoal py-32"
    >
      {/* Decorative background glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-32 h-80 w-80 rounded-full bg-gold/8 blur-[120px]" />
        <div className="absolute -right-24 bottom-32 h-72 w-72 rounded-full bg-teal/8 blur-[120px]" />
      </div>

      <div className="container-art relative">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-3">
            <span className="h-px w-10 bg-gold" />
            <span className="eyebrow">How It’s Made</span>
            <span className="h-px w-10 bg-gold" />
          </div>
          <h2 className="display-text mt-6 text-5xl md:text-6xl lg:text-7xl">
            The craft behind
            <br />
            <span className="italic gold-text">the code</span>.
          </h2>
        </div>

        {/* Main copy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-16 max-w-3xl"
        >
          <div className="relative overflow-hidden rounded-[2rem] border border-ivory/10 bg-gradient-to-b from-ivory/[0.03] to-ivory/[0.01] p-8 md:p-12">
            <div className="absolute -right-4 -top-4 font-serif text-[14rem] leading-none text-gold/10">
              &ldquo;
            </div>
            <p className="relative font-serif text-2xl font-light leading-relaxed text-ivory/85 md:text-3xl md:leading-snug">
              Every piece you see is built on a{' '}
              <span className="text-ivory">
                custom-trained drawing engine
              </span>{' '}
              I developed on my own studio rig — not a public AI, not a one-tap
              filter. Twenty-five years of pencil work taught the system how my
              hand moves; I then finish every portrait by eye, stroke by
              stroke.
            </p>
            <p className="relative mt-6 font-serif text-xl italic text-gold/90 md:text-2xl">
              The tech is mine. The taste is mine. The result is yours.
            </p>
            <div className="relative mt-6 flex items-center gap-3">
              <span className="h-px w-10 bg-gold" />
              <span className="font-sans text-[10px] uppercase tracking-widest text-ivory/60">
                Creeda · Studio note
              </span>
            </div>
          </div>
        </motion.div>

        {/* Three stat callouts */}
        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-5 md:grid-cols-3">
          <Stat
            icon={Hand}
            label="Years of mastery"
            value="25+"
            sub="Charcoal practice, not prompt engineering."
            delay={0}
          />
          <Stat
            icon={Cpu}
            label="Studio rig"
            value="1"
            sub="A drawing engine trained on my own laptop, on my own data."
            delay={0.1}
          />
          <Stat
            icon={Sparkles}
            label="Human finishing"
            value="100%"
            sub="Every piece is hand-finished before it leaves the studio."
            delay={0.2}
          />
        </div>
      </div>
    </section>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  sub,
  delay,
}: {
  icon: any;
  label: string;
  value: string;
  sub: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-2xl border border-ivory/10 bg-ivory/[0.02] p-6 transition-colors hover:border-gold/30 hover:bg-ivory/[0.04]"
    >
      <div className="grid h-12 w-12 place-items-center rounded-xl border border-gold/30 bg-gold/10 text-gold transition-colors group-hover:bg-gold group-hover:text-charcoal">
        <Icon size={20} strokeWidth={1.5} />
      </div>
      <div className="mt-6 font-sans text-[10px] uppercase tracking-widest text-ivory/40">
        {label}
      </div>
      <div className="mt-2 font-serif text-5xl font-light text-ivory">
        {value}
      </div>
      <p className="mt-3 font-sans text-sm font-light leading-relaxed text-ivory/65">
        {sub}
      </p>
      <div className="mt-5 h-px w-10 bg-gold/40 transition-all duration-500 group-hover:w-full" />
    </motion.div>
  );
}
