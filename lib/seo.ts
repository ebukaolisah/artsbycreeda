import type { Metadata } from 'next';
import { BRAND, SITE_URL } from '@/lib/constants';

type MetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: string[];
  noIndex?: boolean;
};

export function absoluteUrl(path = '/'): string {
  if (path.startsWith('http')) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

export function createSeoMetadata({
  title,
  description,
  path,
  image = '/artworks/custom-charcoal-portrait-burna-boy-african-giant.png',
  keywords = [],
  noIndex = false,
}: MetadataInput): Metadata {
  const canonical = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    keywords,
    authors: [{ name: 'Creeda' }],
    creator: BRAND.name,
    publisher: BRAND.name,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: BRAND.name,
      type: 'website',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 1500,
          alt: `${BRAND.name} custom digital charcoal portrait artwork`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
  };
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': absoluteUrl('/#organization'),
    name: BRAND.name,
    alternateName: BRAND.shortName,
    url: absoluteUrl('/'),
    logo: absoluteUrl('/logo.png'),
    sameAs: Object.values(BRAND.socials),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: BRAND.email,
        availableLanguage: ['English'],
      },
    ],
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': absoluteUrl('/#website'),
    name: BRAND.name,
    url: absoluteUrl('/'),
    publisher: {
      '@id': absoluteUrl('/#organization'),
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${absoluteUrl('/')}?s={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function professionalServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': absoluteUrl('/#portrait-service'),
    name: BRAND.name,
    url: absoluteUrl('/'),
    image: absoluteUrl('/creeda-portrait.png'),
    description: BRAND.description,
    priceRange: 'NGN 10000 - NGN 80000',
    areaServed: ['Nigeria', 'Lagos', 'Worldwide'],
    address: {
      '@type': 'PostalAddress',
      addressLocality: BRAND.location.city,
      addressRegion: BRAND.location.region,
      addressCountry: BRAND.location.country,
    },
    email: BRAND.email,
    sameAs: Object.values(BRAND.socials),
  };
}

export function serviceSchema(input: {
  path: string;
  name: string;
  description: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${absoluteUrl(input.path)}#service`,
    name: input.name,
    serviceType: 'Custom digital charcoal portrait from photo',
    description: input.description,
    image: absoluteUrl(input.image || '/artworks/custom-charcoal-portrait-burna-boy-african-giant.png'),
    provider: {
      '@id': absoluteUrl('/#portrait-service'),
    },
    areaServed: ['Nigeria', 'Lagos', 'Worldwide'],
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      url: absoluteUrl('/order'),
      priceCurrency: 'NGN',
    },
  };
}

export function faqPageSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function imageObjectSchema(input: {
  path: string;
  image: string;
  name: string;
  caption: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    '@id': `${absoluteUrl(input.path)}#primaryimage`,
    contentUrl: absoluteUrl(input.image),
    url: absoluteUrl(input.image),
    name: input.name,
    caption: input.caption,
    creator: {
      '@id': absoluteUrl('/#organization'),
    },
    copyrightHolder: {
      '@id': absoluteUrl('/#organization'),
    },
  };
}
