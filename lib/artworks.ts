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
  /** Grand, short, evocative — never literal */
  title: string;
  src: string;
  /** Short single-word style tag shown at top-left of card */
  category: ArtworkCategory;
  year: number;
  medium: string;
  /** One-line grand writeup shown in lightbox */
  description: string;
  featured?: boolean;
}

/**
 * Ten pieces — the studio's headline collection.
 * Captures the African Giant era from Asake to Wizkid plus the legacy & mogul portraits.
 */
export const ARTWORKS: Artwork[] = [
  {
    id: 'african-giant',
    title: 'The African Giant',
    src: '/artworks/burna-01.png',
    category: 'Crowned',
    year: 2025,
    medium: 'Digital Charcoal',
    description:
      'Self-coronated, world-corroborated. The genre flexes around him.',
    featured: true,
  },
  {
    id: 'obo',
    title: 'OBO',
    src: '/artworks/davido-01.png',
    category: 'Anthem',
    year: 2025,
    medium: 'Digital Charcoal',
    description:
      'Omo Baba Olowo. The fire, the family, and the anthem — set in graphite.',
    featured: true,
  },
  {
    id: 'asake',
    title: 'Asake',
    src: '/artworks/asake.png',
    category: 'Mr Money',
    year: 2025,
    medium: 'Digital Charcoal',
    description:
      'Lagos summer in a single frame. The genre rearranged itself around him.',
  },
  {
    id: 'last-last',
    title: 'Last Last',
    src: '/artworks/burna-02.png',
    category: 'Anthem',
    year: 2025,
    medium: 'Digital Charcoal',
    description:
      'Heartbreak rendered as a hymn. Every stroke knows what it cost.',
  },
  {
    id: 'twice-as-tall',
    title: 'Twice as Tall',
    src: '/artworks/burna-03.png',
    category: 'Crowned',
    year: 2025,
    medium: 'Digital Charcoal',
    description:
      'Grammy-shaped silhouette. The continent fits inside the frame.',
  },
  {
    id: 'thirty-bg',
    title: '30 Billion Gang',
    src: '/artworks/davido-02.png',
    category: 'Anthem',
    year: 2025,
    medium: 'Digital Charcoal',
    description:
      'Anthems for a generation that refuses to bow. Pencil with the bass turned up.',
  },
  {
    id: 'patriarch',
    title: 'The Patriarch',
    src: '/artworks/chief-patrick.png',
    category: 'Legacy',
    year: 2025,
    medium: 'Digital Charcoal',
    description:
      'Wisdom you can feel through the pencil — every line carries a decade.',
  },
  {
    id: 'madam-mogul',
    title: 'Madam Mogul',
    src: '/artworks/faith-ojo.png',
    category: 'Mogul',
    year: 2025,
    medium: 'Digital Charcoal',
    description:
      'Producer. Patron. Pillar. Three lifetimes in one composed gaze.',
  },
  {
    id: 'kingmaker',
    title: 'The Kingmaker',
    src: '/artworks/tunde-ednut.png',
    category: 'Mogul',
    year: 2025,
    medium: 'Digital Charcoal',
    description:
      'Behind every breakout star — a man with the microphone and the instinct.',
  },
  {
    id: 'starboy',
    title: 'Starboy',
    src: '/artworks/wizkid.png',
    category: 'Starboy',
    year: 2025,
    medium: 'Digital Charcoal',
    description:
      'From Surulere to Madison Square — Made in Lagos, drawn in light.',
    featured: true,
  },
];

export const FEATURED = ARTWORKS.filter((a) => a.featured);
