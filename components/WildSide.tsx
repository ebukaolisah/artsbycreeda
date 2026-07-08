'use client';

import StructuredShowcase, { type ShowcasePiece } from './StructuredShowcase';

const PIECES: ShowcasePiece[] = [
  {
    id: 'voltage-king',
    src: '/artworks/pop/urban-pop-portrait-voltage-king.png',
    alt: 'Urban pop digital portrait artwork with neon character styling',
    title: 'Voltage King',
    category: 'Volt',
    medium: 'Digital Mixed Media',
    year: 2026,
    description: "Plugged into the city's pulse. Crowned by current.",
  },
  {
    id: 'midnight-phantom',
    src: '/artworks/pop/urban-pop-portrait-midnight-phantom.png',
    alt: 'Stylized urban digital portrait with cinematic neon shadows',
    title: 'Midnight Phantom',
    category: 'Phantom',
    medium: 'Digital Mixed Media',
    year: 2026,
    description: 'He walks where the streetlamps die.',
  },
  {
    id: 'synth-saint',
    src: '/artworks/pop/urban-pop-portrait-synth-saint.png',
    alt: 'Neon digital portrait artwork in urban pop style',
    title: 'Synth Saint',
    category: 'Synth',
    medium: 'Digital Mixed Media',
    year: 2026,
    description: 'Worship at the altar of bass and light.',
  },
  {
    id: 'rogue-static',
    src: '/artworks/pop/urban-pop-portrait-rogue-static.png',
    alt: 'Urban pop portrait artwork with electric color treatment',
    title: 'Rogue Static',
    category: 'Static',
    medium: 'Digital Mixed Media',
    year: 2026,
    description: 'Signal cut through the smog. Refuses to flicker.',
  },
  {
    id: 'ghost-in-grid',
    src: '/artworks/pop/urban-pop-portrait-ghost-in-the-grid.png',
    alt: 'Cyberpunk style digital portrait artwork by Arts By Creeda',
    title: 'Ghost in the Grid',
    category: 'Ghost',
    medium: 'Digital Mixed Media',
    year: 2026,
    description: 'Logged into a city that forgot its name.',
  },
  {
    id: 'chrome-sovereign',
    src: '/artworks/pop/urban-pop-portrait-chrome-sovereign.png',
    alt: 'Premium urban pop portrait with chrome and neon styling',
    title: 'Chrome Sovereign',
    category: 'Chrome',
    medium: 'Digital Mixed Media',
    year: 2026,
    description: 'Crowned in the cathedral of fluorescent.',
  },
  {
    id: 'cyber-patriarch',
    src: '/artworks/pop/urban-pop-portrait-cyber-patriarch.png',
    alt: 'Legacy inspired urban digital portrait artwork with neon detail',
    title: 'Cyber Patriarch',
    category: 'Patriarch',
    medium: 'Digital Mixed Media',
    year: 2026,
    description: 'Wisdom rebooted. Still cuts to the bone.',
  },
  {
    id: 'live-wire',
    src: '/artworks/pop/urban-pop-portrait-live-wire.png',
    alt: 'Electric urban pop portrait artwork with dramatic color',
    title: 'Live Wire',
    category: 'Wire',
    medium: 'Digital Mixed Media',
    year: 2026,
    description: 'Touched once. Remembered forever.',
  },
  {
    id: 'the-reckoner',
    src: '/artworks/pop/urban-pop-portrait-the-reckoner.png',
    alt: 'Dark cinematic urban portrait artwork in digital mixed media',
    title: 'The Reckoner',
    category: 'Reckoner',
    medium: 'Digital Mixed Media',
    year: 2026,
    description: 'Forged in smoke. Sworn to silence.',
  },
  {
    id: 'last-light',
    src: '/artworks/pop/urban-pop-portrait-last-light.png',
    alt: 'Urban pop digital portrait with last light neon effect',
    title: 'Last Light',
    category: 'Light',
    medium: 'Digital Mixed Media',
    year: 2026,
    description: 'City as church. Hero as sermon.',
  },
  {
    id: 'street-kingmaker',
    src: '/artworks/pop/urban-pop-portrait-street-kingmaker.png',
    alt: 'Street art inspired custom digital portrait artwork',
    title: 'Street Kingmaker',
    category: 'King',
    medium: 'Digital Mixed Media',
    year: 2026,
    description: 'Anointed in spray paint. Holy by Friday.',
  },
  {
    id: 'inferno-bloom',
    src: '/artworks/pop/urban-pop-portrait-inferno-bloom.png',
    alt: 'Bold urban pop portrait artwork with warm neon color',
    title: 'Inferno Bloom',
    category: 'Bloom',
    medium: 'Digital Mixed Media',
    year: 2026,
    description: 'Where chrome meets the burn.',
  },
  {
    id: 'neon-apostle',
    src: '/artworks/pop/urban-pop-portrait-neon-apostle.png',
    alt: 'Neon apostle urban pop digital portrait artwork',
    title: 'Neon Apostle',
    category: 'Apostle',
    medium: 'Digital Mixed Media',
    year: 2026,
    description: 'Spreading the gospel of glow.',
  },
  {
    id: 'stormwarden',
    src: '/artworks/pop/urban-pop-portrait-stormwarden.png',
    alt: 'Storm themed urban pop portrait artwork with lightning mood',
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
      eyebrow="Beyond Charcoal / The Wild Set"
      title="The **Wild** Side."
      subtitle="Fourteen pieces from after dark. Hover any card to see the studio signature follow the cursor."
      pieces={PIECES}
      latestLabel="The Wild Collection"
      accent="neon"
      gridCols={5}
      showHeroMeta={false}
    />
  );
}
