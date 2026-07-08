export type ArtworkCategory =
  | 'Spotlight'
  | 'Crowned'
  | 'Anthem'
  | 'Legacy'
  | 'Mogul'
  | 'Starboy'
  | 'Mr Money';

export interface Artwork {
  id: string;
  title: string;
  src: string;
  alt: string;
  category: ArtworkCategory;
  year: number;
  medium: string;
  description: string;
  featured?: boolean;
}

export const ARTWORKS: Artwork[] = [
  {
    id: 'african-giant',
    title: 'The African Giant',
    src: '/artworks/custom-charcoal-portrait-burna-boy-african-giant.png',
    alt: 'Custom charcoal portrait from photo by Arts By Creeda',
    category: 'Crowned',
    year: 2025,
    medium: 'Digital Charcoal',
    description: 'A celebrity-style charcoal portrait study with dramatic contrast and premium dark pencil texture.',
    featured: true,
  },
  {
    id: 'obo',
    title: 'OBO',
    src: '/artworks/custom-charcoal-portrait-davido-obo.png',
    alt: 'Realistic digital charcoal portrait artwork from customer-style photo',
    category: 'Anthem',
    year: 2025,
    medium: 'Digital Charcoal',
    description: 'A polished charcoal portrait study with confident likeness and collector-grade tonal range.',
    featured: true,
  },
  {
    id: 'asake',
    title: 'Asake',
    src: '/artworks/digital-charcoal-portrait-asake.png',
    alt: 'Premium digital charcoal portrait with luxury dark pencil finish',
    category: 'Mr Money',
    year: 2025,
    medium: 'Digital Charcoal',
    description: 'A bold digital charcoal portrait study created for strong facial presence and wall-ready impact.',
  },
  {
    id: 'last-last',
    title: 'Last Last',
    src: '/artworks/realistic-charcoal-portrait-burna-boy-last-last.png',
    alt: 'Realistic charcoal portrait from photo with expressive face detail',
    category: 'Anthem',
    year: 2025,
    medium: 'Digital Charcoal',
    description: 'A moody portrait study focused on emotion, shadow control, and fine facial detail.',
  },
  {
    id: 'twice-as-tall',
    title: 'Twice as Tall',
    src: '/artworks/luxury-charcoal-portrait-burna-boy-twice-as-tall.png',
    alt: 'Luxury digital charcoal portrait art for printable wall display',
    category: 'Crowned',
    year: 2025,
    medium: 'Digital Charcoal',
    description: 'A luxury portrait art study with high contrast and a gallery-style charcoal finish.',
  },
  {
    id: 'thirty-bg',
    title: '30 Billion Gang',
    src: '/artworks/custom-charcoal-portrait-davido-30-billion-gang.png',
    alt: 'Celebrity-style custom charcoal portrait artwork by Arts By Creeda',
    category: 'Anthem',
    year: 2025,
    medium: 'Digital Charcoal',
    description: 'A portrait study created for bold personality, rich dark values, and premium printable artwork.',
  },
  {
    id: 'patriarch',
    title: 'The Patriarch',
    src: '/artworks/legacy-family-charcoal-portrait-chief-patrick.png',
    alt: 'Realistic family charcoal portrait artwork from customer photo',
    category: 'Legacy',
    year: 2025,
    medium: 'Digital Charcoal',
    description: 'A legacy-style family portrait study with quiet dignity and strong facial detail.',
  },
  {
    id: 'madam-mogul',
    title: 'Madam Mogul',
    src: '/artworks/premium-digital-charcoal-portrait-faith-ojo.png',
    alt: 'Premium digital charcoal portrait for luxury portrait gift',
    category: 'Mogul',
    year: 2025,
    medium: 'Digital Charcoal',
    description: 'A refined digital portrait study designed for confidence, elegance, and print-ready presentation.',
  },
  {
    id: 'kingmaker',
    title: 'The Kingmaker',
    src: '/artworks/celebrity-style-charcoal-portrait-tunde-ednut.png',
    alt: 'Celebrity-style charcoal portrait artwork with realistic face detail',
    category: 'Mogul',
    year: 2025,
    medium: 'Digital Charcoal',
    description: 'A dark pencil portrait study with public-figure styling and premium tonal depth.',
  },
  {
    id: 'starboy',
    title: 'Starboy',
    src: '/artworks/realistic-charcoal-portrait-wizkid-starboy.png',
    alt: 'Realistic charcoal portrait gift artwork from photo',
    category: 'Starboy',
    year: 2025,
    medium: 'Digital Charcoal',
    description: 'A smooth celebrity-style portrait study with soft graphite values and luxury wall-art energy.',
    featured: true,
  },
];

export const FEATURED = ARTWORKS.filter((artwork) => artwork.featured);
