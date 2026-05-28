'use client';

import StructuredShowcase, { type ShowcasePiece } from './StructuredShowcase';

const PIECES: ShowcasePiece[] = [
  {
    id: 'duck-splatter',
    src: '/artworks/pop/pop-01.png',
    title: 'Duck Dynasty',
    category: 'Pop · Splatter',
    medium: 'Digital Mixed Media',
    year: 2025,
    description: 'When pop meets pigment — chaos, cackling, and a tongue that refuses to stay inside.',
  },
  {
    id: 'rick-melt',
    src: '/artworks/pop/pop-02.png',
    title: 'Liquid Reality',
    category: 'Pop · Surreal',
    medium: 'Digital Mixed Media',
    year: 2025,
    description: 'Two worlds bleeding into one frame — yellow innocence vs neon chaos.',
  },
  {
    id: 'duck-storm',
    src: '/artworks/pop/pop-03.png',
    title: 'Storm Bird',
    category: 'Pop · Electric',
    medium: 'Digital Mixed Media',
    year: 2025,
    description: 'Lightning never asks permission. Neither does the bird wearing it.',
  },
  {
    id: 'reckoner',
    src: '/artworks/pop/pop-04.png',
    title: 'The Reckoner',
    category: 'Cinematic · Hyperreal',
    medium: 'Digital Mixed Media',
    year: 2025,
    description: 'Forged in smoke, sworn to silence. A cinematic study of weight.',
  },
  {
    id: 'urban-05',
    src: '/artworks/pop/pop-05.png',
    title: 'Neon Saint',
    category: 'Urban · Sacred',
    medium: 'Digital Mixed Media',
    year: 2025,
    description: 'Halos look different under city light.',
  },
  {
    id: 'urban-06',
    src: '/artworks/pop/pop-06.png',
    title: 'Concrete Royalty',
    category: 'Street · Portrait',
    medium: 'Digital Mixed Media',
    year: 2025,
    description: 'Born on the block, painted like a king.',
  },
];

export default function WildSide() {
  return (
    <StructuredShowcase
      id="wild-side"
      eyebrow="Beyond Charcoal · A Different Voice"
      title="The **Wild** Side."
      subtitle="When charcoal isn't loud enough. A separate body of work where icons get re-imagined in pigment, lightning, and smoke."
      pieces={PIECES}
      latestLabel="The Wild Collection"
      accent="neon"
    />
  );
}
