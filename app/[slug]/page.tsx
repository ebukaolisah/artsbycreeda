import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SeoLandingPage from '@/components/SeoLandingPage';
import { getSeoPage, SEO_PAGES } from '@/lib/seo-pages';
import { createSeoMetadata } from '@/lib/seo';

type Props = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return SEO_PAGES.map((page) => ({ slug: page.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const page = getSeoPage(params.slug);
  if (!page) return createSeoMetadata({
    title: 'Page Not Found | Arts By Creeda',
    description: 'The requested Arts By Creeda page could not be found.',
    path: `/${params.slug}`,
    noIndex: true,
  });

  return createSeoMetadata({
    title: page.seoTitle,
    description: page.metaDescription,
    path: page.path,
    image: page.image,
    keywords: page.keywords,
  });
}

export default function DynamicSeoPage({ params }: Props) {
  const page = getSeoPage(params.slug);
  if (!page) notFound();

  return <SeoLandingPage page={page} />;
}
