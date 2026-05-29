'use client';

import StructuredShowcase, { type ShowcasePiece } from './StructuredShowcase';

/**
 * The Wild Side — 14 neon / cyberpunk / street-art pieces.
 * Grand short titles, never literal.
 */
const PIECES: ShowcasePiece[] = [
  {
    id: 'voltage-king',
    src: '/artworks/pop/neon-01.png',
    title: 'Voltage King',
    category: 'Volt',
    medium: 'Digital Mixed Media',
    year: 2026,
    description: "Plugged into the city's pulse. Crowned by current.",
  },
  {
    id: 'midnight-phantom',
    src: '/artworks/pop/neon-02.png',
    title: 'Midnight Phantom',
    category: 'Phantom',
    medium: 'Digital Mixed Media',
    year: 2026,
    description: 'He walks where the streetlamps die.',
  },
  {
    id: 'synth-saint',
    src: '/artworks/pop/neon-03.png',
    title: 'Synth Saint',
    category: 'Synth',
    medium: 'Digital Mixed Media',
    year: 2026,
    description: 'Worship at the altar of bass and light.',
  },
  {
    id: 'rogue-static',
    src: '/artworks/pop/neon-04.png',
    title: 'Rogue Static',
    category: 'Static',
    medium: 'Digital Mixed Media',
    year: 2026,
    description: 'Signal cut through the smog. Refuses to flicker.',
  },
  {
    id: 'ghost-in-grid',
    src: '/artworks/pop/neon-05.png',
    title: 'Ghost in the Grid',
    category: 'Ghost',
    medium: 'Digital Mixed Media',
    year: 2026,
    description: 'Logged into a city that forgot its name.',
  },
  {
    id: 'chrome-sovereign',
    src: '/artworks/pop/neon-06.png',
    title: 'Chrome Sovereign',
    category: 'Chrome',
    medium: 'Digital Mixed Media',
    year: 2026,
    description: 'Crowned in the cathedral of fluorescent.',
  },
  {
    id: 'cyber-patriarch',
    src: '/artworks/pop/neon-07.png',
    title: 'Cyber Patriarch',
    category: 'Patriarch',
    medium: 'Digital Mixed Media',
    year: 2026,
    description: 'Wisdom rebooted. Still cuts to the bone.',
  },
  {
    id: 'live-wire',
    src: '/artworks/pop/neon-08.png',
    title: 'Live Wire',
    category: 'Wire',
    medium: 'Digital Mixed Media',
    year: 2026,
    description: 'Touched once. Remembered forever.',
  },
  {
    id: 'the-reckoner',
    src: '/artworks/pop/neon-09.png',
    title: 'The Reckoner',
    category: 'Reckoner',
    medium: 'Digital Mixed Media',
    year: 2026,
    description: 'Forged in smoke. Sworn to silence.',
  },
  {
    id: 'last-light',
    src: '/artworks/pop/neon-10.png',
    title: 'Last Light',
    category: 'Light',
    medium: 'Digital Mixed Media',
    year: 2026,
    description: 'City as church. Hero as sermon.',
  },
  {
    id: 'street-kingmaker',
    src: '/artworks/pop/neon-11.png',
    title: 'Street Kingmaker',
    category: 'King',
    medium: 'Digital Mixed Media',
    year: 2026,
    description: 'Anointed in spray paint. Holy by Friday.',
  },
  {
    id: 'inferno-bloom',
    src: '/artworks/pop/neon-12.png',
    title: 'Inferno Bloom',
    category: 'Bloom',
    medium: 'Digital Mixed Media',
    year: 2026,
    description: 'Where chrome meets the burn.',
  },
  {
    id: 'neon-apostle',
    src: '/artworks/pop/neon-13.png',
    title: 'Neon Apostle',
    category: 'Apostle',
    medium: 'Digital Mixed Media',
    year: 2026,
    description: 'Spreading the gospel of glow.',
  },
  {
    id: 'stormwarden',
    src: '/artworks/pop/neon-14.png',
    title: 'Stormwarden',
    category: 'Storm',
    medium: 'Digital Mixed Media',
    year: 2026,
    description: 'Sinister guardian. Lightning fed.',
  },
];

export default function WildSide() {
  return (
    <StructuredShowcase
      id="wild-side"
      eyebrow="Beyond Charcoal · The Wild Set"
      title="The **Wild** Side."
      subtitle="Fourteen pieces from after dark. Hover any card — the studio signature follows your cursor through the neon."
      pieces={PIECES}
      latestLabel="The Wild Collection"
      accent="neon"
      gridCols={5}
    />
  );
}
