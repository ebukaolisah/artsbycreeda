import { ARTWORKS } from '@/lib/artworks';
import { GUIDE_ARTICLES } from '@/lib/gift-guides';
import { SITE_URL } from '@/lib/constants';
import { SEO_PAGES } from '@/lib/seo-pages';

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function GET() {
  const images = [
    ...ARTWORKS.map((artwork) => ({
      page: '/portfolio',
      src: artwork.src,
      title: artwork.title,
      caption: artwork.alt,
    })),
    ...SEO_PAGES.map((page) => ({
      page: page.path,
      src: page.image,
      title: page.h1,
      caption: page.imageAlt,
    })),
    ...GUIDE_ARTICLES.map((article) => ({
      page: article.path,
      src: article.image,
      title: article.title,
      caption: article.imageAlt,
    })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${images
  .map(
    (image) => `  <url>
    <loc>${escapeXml(`${SITE_URL}${image.page}`)}</loc>
    <image:image>
      <image:loc>${escapeXml(`${SITE_URL}${image.src}`)}</image:loc>
      <image:title>${escapeXml(image.title)}</image:title>
      <image:caption>${escapeXml(image.caption)}</image:caption>
    </image:image>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
