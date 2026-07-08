import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import SEOJsonLd from '@/components/SEOJsonLd';
import { breadcrumbSchema, createSeoMetadata, serviceSchema } from '@/lib/seo';

export const metadata: Metadata = createSeoMetadata({
  title: 'Order a Custom Charcoal Portrait | Arts By Creeda',
  description:
    'Start your Arts By Creeda portrait order. Choose your style, upload your photo, pay securely, and receive a premium print-ready digital charcoal portrait.',
  path: '/order',
  image: '/artworks/custom-charcoal-portrait-burna-boy-african-giant.png',
  keywords: ['order custom charcoal portrait', 'send photo for portrait', 'digital charcoal portrait order'],
});

export default function OrderLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SEOJsonLd
        data={[
          serviceSchema({
            path: '/order',
            name: 'Order a custom digital charcoal portrait',
            description:
              'Secure order flow for custom digital charcoal portraits from customer photos.',
            image: '/artworks/custom-charcoal-portrait-burna-boy-african-giant.png',
          }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Order', path: '/order' },
          ]),
        ]}
      />
      {children}
    </>
  );
}
