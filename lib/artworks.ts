export type ArtworkCategory =
  | 'Portraits'
  | 'Couples'
  | 'Religious'
  | 'Cultural'
  | 'Tributes';

export interface Artwork {
  id: string;
  title: string;
  src: string;
  category: ArtworkCategory;
  year: number;
  medium: string;
  description?: string;
  featured?: boolean;
}

/**
 * Curated 6-piece collection. One iconic piece per voice in the studio:
 * regal portraiture, sacred scene, celebrity tribute, Igbo heritage, intimate couples, light study.
 */
export const ARTWORKS: Artwork[] = [
  {
    id: 'the-sovereign',
    title: 'The Sovereign',
    src: '/artworks/regal-01.png',
    category: 'Portraits',
    year: 2025,
    medium: 'Digital Charcoal',
    description: 'A study in poise — every stroke a quiet declaration of presence.',
    featured: true,
  },
  {
    id: 'heir-of-light',
    title: 'Heir of Light',
    src: '/artworks/regal-03.png',
    category: 'Portraits',
    year: 2025,
    medium: 'Digital Charcoal',
    description: 'Light, lineage, and lineage of light — captured in graphite.',
    featured: true,
  },
  {
    id: 'last-supper',
    title: 'The Last Supper, Reimagined',
    src: '/artworks/religious-last-supper.png',
    category: 'Religious',
    year: 2025,
    medium: 'Digital Charcoal',
    description: 'A devotional scene rendered in graphite — sacred geometry, modern soul.',
    featured: true,
  },
  {
    id: 'tribute-burna',
    title: 'Outside — Burna Boy Tribute',
    src: '/artworks/artistry-01.png',
    category: 'Tributes',
    year: 2025,
    medium: 'Digital Charcoal',
    description: 'A tribute to the African Giant — the swagger captured in pencil.',
    featured: true,
  },
  {
    id: 'igbo-adaeze',
    title: 'Igbo Heritage — Adaeze',
    src: '/artworks/pencil-03.png',
    category: 'Cultural',
    year: 2025,
    medium: 'Digital Charcoal',
    description: 'Tradition rendered with the precision of memory.',
    featured: true,
  },
  {
    id: 'anniversary',
    title: 'Anniversary',
    src: '/artworks/pencil-01.png',
    category: 'Couples',
    year: 2025,
    medium: 'Digital Charcoal',
    description: 'Love preserved in pencil — perfect for gifting.',
    featured: true,
  },
];

export const FEATURED = ARTWORKS;
