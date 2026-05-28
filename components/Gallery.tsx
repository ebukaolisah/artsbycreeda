'use client';

import StructuredShowcase, { type ShowcasePiece } from './StructuredShowcase';
import { ARTWORKS } from '@/lib/artworks';

const PIECES: ShowcasePiece[] = ARTWORKS.map((a) => ({
  id: a.id,
  title: a.title,
  src: a.src,
  category: a.category,
  medium: a.medium,
  year: a.year,
  description: a.description,
}));

export default function Gallery() {
  return (
    <StructuredShowcase
      id="gallery"
      eyebrow="Selected Work · The Studio Ten"
      title="The **Portfolio**."
      subtitle="Ten icons. One pencil. Click any piece to open the full study, or use the carousel to spotlight a different hero."
      pieces={PIECES}
      latestLabel="Latest Work"
      accent="gold"
    />
  );
}
