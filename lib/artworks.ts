export type ArtworkCategory =
  | 'Portraits'
  | 'Couples'
  | 'Religious'
  | 'Cultural'
  | 'Tributes'
  | 'Prints';

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

export const CATEGORIES: ArtworkCategory[] = [
  'Portraits',
  'Tributes',
  'Couples',
  'Religious',
  'Cultural',
  'Prints',
];

export const ARTWORKS: Artwork[] = [
  {
    id: 'regal-01',
    title: 'The Sovereign',
    src: '/artworks/regal-01.png',
    category: 'Portraits',
    year: 2025,
    medium: 'Digital Charcoal',
    description: 'A study in poise — every stroke a quiet declaration of presence.',
    featured: true,
  },
  {
    id: 'regal-02',
    title: 'Crown of Stillness',
    src: '/artworks/regal-02.png',
    category: 'Portraits',
    year: 2025,
    medium: 'Digital Charcoal',
    description: 'Regal silence rendered in graphite and shadow.',
  },
  {
    id: 'regal-03',
    title: 'Heir of Light',
    src: '/artworks/regal-03.png',
    category: 'Portraits',
    year: 2025,
    medium: 'Digital Charcoal',
    featured: true,
  },
  {
    id: 'regal-04',
    title: 'Quiet Authority',
    src: '/artworks/regal-04.png',
    category: 'Portraits',
    year: 2025,
    medium: 'Digital Charcoal',
  },
  {
    id: 'tribute-burna',
    title: "Outside — Burna Boy Tribute",
    src: '/artworks/artistry-01.png',
    category: 'Tributes',
    year: 2025,
    medium: 'Digital Charcoal',
    description: "A tribute to the African Giant — the swagger captured in pencil.",
    featured: true,
  },
  {
    id: 'tribute-wizkid',
    title: 'Starboy — Made in Lagos',
    src: '/artworks/artistry-02.png',
    category: 'Tributes',
    year: 2025,
    medium: 'Digital Charcoal',
    description: "A homage to the king of Afrobeats and his city.",
  },
  {
    id: 'tribute-davido',
    title: 'FIVE — Davido Tribute',
    src: '/artworks/transform-01.png',
    category: 'Tributes',
    year: 2025,
    medium: 'Digital Charcoal',
    description: 'The fire and the family, immortalised.',
  },
  {
    id: 'tribute-tiwa',
    title: 'Queen of Afropop',
    src: '/artworks/rendering-01.png',
    category: 'Tributes',
    year: 2025,
    medium: 'Digital Charcoal',
    description: 'A heartfelt homage to Tiwa Savage.',
  },
  {
    id: 'religious-last-supper',
    title: 'The Last Supper, Reimagined',
    src: '/artworks/religious-last-supper.png',
    category: 'Religious',
    year: 2025,
    medium: 'Digital Charcoal',
    description: "A devotional scene rendered in graphite — sacred geometry, modern soul.",
    featured: true,
  },
  {
    id: 'couples-01',
    title: 'Anniversary',
    src: '/artworks/pencil-01.png',
    category: 'Couples',
    year: 2025,
    medium: 'Digital Charcoal',
    description: 'Love preserved in pencil — perfect for gifting.',
  },
  {
    id: 'couples-02',
    title: 'Two as One',
    src: '/artworks/pencil-02.png',
    category: 'Couples',
    year: 2025,
    medium: 'Digital Charcoal',
  },
  {
    id: 'cultural-01',
    title: 'Igbo Heritage — Adaeze',
    src: '/artworks/pencil-03.png',
    category: 'Cultural',
    year: 2025,
    medium: 'Digital Charcoal',
    description: 'Tradition rendered with the precision of memory.',
    featured: true,
  },
  {
    id: 'cultural-02',
    title: 'The Elder',
    src: '/artworks/academic-01.png',
    category: 'Cultural',
    year: 2025,
    medium: 'Digital Charcoal',
    description: 'A study of wisdom — every line carries decades.',
  },
  {
    id: 'cultural-03',
    title: 'Daughter of the Soil',
    src: '/artworks/detailed-01.png',
    category: 'Cultural',
    year: 2025,
    medium: 'Digital Charcoal',
  },
  {
    id: 'portrait-overlay',
    title: 'Layered Soul',
    src: '/artworks/overlay-01.png',
    category: 'Portraits',
    year: 2025,
    medium: 'Digital Charcoal',
    description: 'A duotone study — past and present in one frame.',
  },
  {
    id: 'detailed-02',
    title: 'Vows',
    src: '/artworks/detailed-02.png',
    category: 'Couples',
    year: 2025,
    medium: 'Digital Charcoal',
  },
  {
    id: 'print-01',
    title: 'Gallery Edition — 20×24',
    src: '/artworks/print-mockup-01.png',
    category: 'Prints',
    year: 2025,
    medium: 'Print Mockup',
    description: 'How your portrait looks framed and lit on the wall.',
  },
  {
    id: 'print-02',
    title: 'Statement Edition — 36×26',
    src: '/artworks/print-mockup-02.png',
    category: 'Prints',
    year: 2025,
    medium: 'Print Mockup',
    description: 'For the room that deserves a centerpiece.',
  },
  {
    id: 'print-03',
    title: 'Studio Frame',
    src: '/artworks/print-mockup-03.png',
    category: 'Prints',
    year: 2025,
    medium: 'Print Mockup',
  },
];

export const FEATURED = ARTWORKS.filter((a) => a.featured);
