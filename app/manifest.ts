import type { MetadataRoute } from 'next';
import { BRAND } from '@/lib/constants';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${BRAND.name} - Custom Digital Charcoal Portraits`,
    short_name: BRAND.shortName,
    description: BRAND.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0908',
    theme_color: '#0a0908',
    icons: [
      {
        src: '/logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/logo.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
