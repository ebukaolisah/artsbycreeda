import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';
import { GUIDE_PATHS } from '@/lib/gift-guides';
import { SEO_PAGE_PATHS } from '@/lib/seo-pages';

const now = new Date();

function entry(path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']) {
  return {
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    entry('/', 1, 'weekly'),
    entry('/order', 0.95, 'weekly'),
    ...SEO_PAGE_PATHS.map((path) => entry(path, path === '/portfolio' ? 0.9 : 0.86, 'monthly')),
    entry('/gift-guides', 0.72, 'weekly'),
    ...GUIDE_PATHS.map((path) => entry(path, 0.68, 'monthly')),
  ];
}
