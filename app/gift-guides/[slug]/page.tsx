import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import GuideArticlePage from '@/components/GuideArticlePage';
import { getGuideArticle, GUIDE_ARTICLES } from '@/lib/gift-guides';
import { createSeoMetadata } from '@/lib/seo';

type Props = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return GUIDE_ARTICLES.map((article) => ({ slug: article.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const article = getGuideArticle(params.slug);
  if (!article) return createSeoMetadata({
    title: 'Guide Not Found | Arts By Creeda',
    description: 'The requested Arts By Creeda guide could not be found.',
    path: `/gift-guides/${params.slug}`,
    noIndex: true,
  });

  return createSeoMetadata({
    title: article.seoTitle,
    description: article.metaDescription,
    path: article.path,
    image: article.image,
    keywords: ['custom portrait guide', 'charcoal portrait gift', 'digital portrait artwork'],
  });
}

export default function GiftGuideArticleRoute({ params }: Props) {
  const article = getGuideArticle(params.slug);
  if (!article) notFound();

  return <GuideArticlePage article={article} />;
}
