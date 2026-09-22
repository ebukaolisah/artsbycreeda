import { BRAND } from '@/lib/constants';

export type FaqItem = {
  question: string;
  answer: string;
};

export type PageLink = {
  label: string;
  href: string;
};

export type LandingSection = {
  eyebrow: string;
  title: string;
  body: string[];
  bullets?: string[];
};

export type SeoLandingPageData = {
  slug: string;
  path: string;
  kind: 'service' | 'gift' | 'info' | 'portfolio' | 'pricing' | 'faq';
  seoTitle: string;
  metaDescription: string;
  keywords: string[];
  eyebrow: string;
  h1: string;
  intro: string;
  image: string;
  imageAlt: string;
  trust: string[];
  sections: LandingSection[];
  faqs: FaqItem[];
  related: PageLink[];
  schemaName: string;
  schemaDescription: string;
};

const portfolioImage = '/artworks/custom-charcoal-portrait-burna-boy-african-giant.png';
const familyImage = '/artworks/legacy-family-charcoal-portrait-chief-patrick.png';
const coupleImage = '/artworks/premium-digital-charcoal-portrait-faith-ojo.png';
const kingCrownImage = '/artworks/regal-king-charcoal-portrait-crown.png';

const commonTrust = [
  'High-resolution digital delivery',
  'Print-ready portrait files',
  'Secure photo submission',
  'Worldwide ordering from Lagos',
];

const coreFaqs: FaqItem[] = [
  {
    question: 'How do I order a custom charcoal portrait?',
    answer:
      'Choose your portrait style, size, and delivery format on the order page, upload a clear reference photo, then complete payment securely with Paystack.',
  },
  {
    question: 'Can I order from outside Nigeria?',
    answer:
      'Yes. Digital portraits are delivered worldwide by email, so customers can order from anywhere and print locally.',
  },
  {
    question: 'What kind of photo should I send?',
    answer:
      'Send a clear, well-lit photo where the face is sharp and visible. A natural expression, clean lighting, and minimal blur help the final portrait look more premium.',
  },
  {
    question: 'What file do I receive?',
    answer:
      'Digital orders are delivered as high-resolution print-ready files. The current studio offer highlights 600 DPI files that can be printed large without losing detail.',
  },
  {
    question: 'Are revisions included?',
    answer:
      'The current studio policy is that each portrait is finished carefully before delivery, with no standard revision round unless a special revision agreement is made before ordering.',
  },
];

const funnelLinks: PageLink[] = [
  { label: 'View the portfolio', href: '/portfolio' },
  { label: 'See how it works', href: '/how-it-works' },
  { label: 'Check pricing', href: '/pricing' },
  { label: 'Read the FAQ', href: '/faq' },
  { label: 'Start an order', href: BRAND.orderPath },
];

export const SEO_PAGES: SeoLandingPageData[] = [
  {
    slug: 'custom-charcoal-portrait-from-photo',
    path: '/custom-charcoal-portrait-from-photo',
    kind: 'service',
    seoTitle: 'Custom Charcoal Portrait From Photo | Arts By Creeda',
    metaDescription:
      'Turn a favorite photo into a premium digital charcoal portrait. Print-ready custom portrait artwork for gifts, memorials, family memories, and collectors.',
    keywords: [
      'custom charcoal portrait from photo',
      'portrait from photo',
      'custom portrait artist',
      'realistic charcoal portrait',
    ],
    eyebrow: 'Signature service',
    h1: 'Custom charcoal portrait from photo',
    intro:
      'A meaningful photo becomes a finished charcoal-style artwork with presence, depth, and quiet luxury. Arts By Creeda creates digital portrait files for people who want a gift or keepsake that feels personal, polished, and ready to print.',
    image: portfolioImage,
    imageAlt: 'Custom charcoal portrait from photo by Arts By Creeda',
    trust: commonTrust,
    sections: [
      {
        eyebrow: 'Buyer intent',
        title: 'Made for photos that deserve more than a filter',
        body: [
          'A custom portrait should not feel like a quick effect placed over a picture. The goal is likeness, mood, and a finished charcoal look that can sit proudly on a wall.',
          'Send a clear reference photo and Creeda turns it into premium printable portrait artwork for birthdays, anniversaries, memorials, family homes, and collectors.',
        ],
        bullets: [
          'Hyper-realistic digital charcoal style',
          'Premium dark pencil finish',
          'Delivered digitally for easy printing',
          'Personal-use artwork for gifting and display',
        ],
      },
      {
        eyebrow: 'Delivery',
        title: 'Print-ready digital files, without shipping delays',
        body: [
          'Digital delivery means customers in Nigeria, the US, the UK, Canada, Ghana, and anywhere else can order from the same studio flow.',
          'Your file arrives ready for a trusted local print shop, canvas printer, or framer. Choose the paper and frame that match your space or gift moment.',
        ],
      },
    ],
    faqs: coreFaqs,
    related: funnelLinks,
    schemaName: 'Custom charcoal portrait from photo',
    schemaDescription:
      'Premium digital charcoal portrait service that turns customer photos into high-resolution printable portrait artwork.',
  },
  {
    slug: 'digital-charcoal-portrait',
    path: '/digital-charcoal-portrait',
    kind: 'service',
    seoTitle: 'Digital Charcoal Portrait, Print-Ready File | Arts By Creeda',
    metaDescription:
      'Order a premium digital charcoal portrait from your photo. High-resolution printable portrait files delivered worldwide by Arts By Creeda.',
    keywords: ['digital charcoal portrait', 'premium digital portrait', 'printable portrait artwork'],
    eyebrow: 'Digital delivery',
    h1: 'Digital charcoal portrait',
    intro:
      'A luxury portrait does not need to wait on shipping. Arts By Creeda creates high-resolution digital charcoal portraits that arrive by email, ready to print, frame, and gift anywhere in the world.',
    image: kingCrownImage,
    imageAlt: 'Regal digital charcoal portrait of a man wearing a crown, ready to print',
    trust: commonTrust,
    sections: [
      {
        eyebrow: 'Digital advantage',
        title: 'A finished portrait file you can print anywhere',
        body: [
          'Digital portrait delivery gives you control. Print small for a desk, large for a statement wall, or send the file to a premium local printer for archival paper and framing.',
          'This is ideal for international buyers, last-minute gifts, and families who want the same artwork printed in more than one home.',
        ],
        bullets: [
          'No international shipping delay',
          'Easy to reprint for personal use',
          'Works for canvas, matte paper, or framed display',
          'Useful for global customers ordering from Nigeria',
        ],
      },
      {
        eyebrow: 'Finish',
        title: 'A dark pencil look with emotional restraint',
        body: [
          'The portrait style is premium and timeless: strong tonal contrast, realistic facial detail, and a quiet charcoal mood that feels more like collected art than decoration.',
        ],
      },
    ],
    faqs: coreFaqs,
    related: funnelLinks,
    schemaName: 'Digital charcoal portrait',
    schemaDescription:
      'High-resolution digital charcoal portrait artwork delivered worldwide as a printable file.',
  },
  {
    slug: 'charcoal-portrait-gift',
    path: '/charcoal-portrait-gift',
    kind: 'gift',
    seoTitle: 'Charcoal Portrait Gift From Photo | Arts By Creeda',
    metaDescription:
      'Give a custom charcoal portrait gift made from a photo. Premium digital portrait artwork for birthdays, anniversaries, memorials, and family milestones.',
    keywords: ['charcoal portrait gift', 'luxury portrait gift', 'custom portrait gift'],
    eyebrow: 'Gift-worthy portrait art',
    h1: 'Charcoal portrait gift',
    intro:
      'Some gifts are opened once. A custom charcoal portrait is kept, printed, framed, and remembered. It turns a photo into a personal artwork with enough emotional weight to become part of a home.',
    image: portfolioImage,
    imageAlt: 'Luxury digital charcoal portrait gift from photo',
    trust: ['Gift-ready digital delivery', 'Premium charcoal finish', 'Works for many occasions', 'Worldwide ordering'],
    sections: [
      {
        eyebrow: 'Gift moments',
        title: 'For the person who is hard to impress',
        body: [
          'A portrait gift works because it is unmistakably personal. It can celebrate someone living, honor someone missed, or mark a relationship that deserves more than a generic present.',
          'The digital format also makes it practical: you can print the artwork locally, frame it beautifully, and present it on your own timeline.',
        ],
        bullets: [
          'Birthday portrait gifts',
          'Anniversary portrait gifts',
          'Memorial portrait gifts',
          'Family and couple portrait gifts',
        ],
      },
      {
        eyebrow: 'Presentation',
        title: 'Make the reveal feel premium',
        body: [
          'For the strongest gift experience, print on heavyweight matte paper, choose a simple black or warm wood frame, and include a short handwritten note about the photo you chose.',
        ],
      },
    ],
    faqs: coreFaqs,
    related: funnelLinks,
    schemaName: 'Charcoal portrait gift',
    schemaDescription:
      'Custom digital charcoal portrait gift service for meaningful occasions and print-ready gifting.',
  },
  {
    slug: 'anniversary-portrait-gift',
    path: '/anniversary-portrait-gift',
    kind: 'gift',
    seoTitle: 'Anniversary Portrait Gift From Photo | Arts By Creeda',
    metaDescription:
      'Create a luxury anniversary portrait gift from a favorite photo. Premium digital charcoal couple portraits delivered print-ready worldwide.',
    keywords: ['anniversary portrait gift', 'couple portrait drawing', 'luxury portrait gift'],
    eyebrow: 'For anniversaries',
    h1: 'Anniversary portrait gift',
    intro:
      'An anniversary portrait holds a relationship in one still image: the years, the private jokes, the resilience, the softness. Arts By Creeda turns a meaningful couple photo into a print-ready digital charcoal artwork.',
    image: coupleImage,
    imageAlt: 'Luxury digital charcoal portrait gift for anniversary',
    trust: ['Romantic but understated', 'Print-ready digital file', 'Worldwide email delivery', 'Ideal for framed presentation'],
    sections: [
      {
        eyebrow: 'Occasion',
        title: 'A gift that feels intimate without feeling ordinary',
        body: [
          'The strongest anniversary gifts are specific. Choose a wedding portrait, travel photo, quiet candid, or image that marked a turning point in the relationship.',
          'The finished charcoal style gives that photo permanence, turning a shared memory into wall-worthy art.',
        ],
        bullets: [
          'Wedding anniversary gifts',
          'Couple portrait drawings',
          'Long-distance anniversary gifts',
          'Printable framed artwork for partners',
        ],
      },
      {
        eyebrow: 'How to choose',
        title: 'Pick a photo with emotion in the face',
        body: [
          'A sharp face and natural expression matter more than a dramatic background. When both people are clearly visible, the portrait can carry likeness and feeling.',
        ],
      },
    ],
    faqs: coreFaqs,
    related: [
      { label: 'Couple charcoal portrait', href: '/couple-charcoal-portrait' },
      ...funnelLinks,
    ],
    schemaName: 'Anniversary portrait gift',
    schemaDescription:
      'Custom digital charcoal anniversary portrait gift created from a couple photo.',
  },
  {
    slug: 'birthday-portrait-gift',
    path: '/birthday-portrait-gift',
    kind: 'gift',
    seoTitle: 'Birthday Portrait Gift From Photo | Arts By Creeda',
    metaDescription:
      'Order a custom birthday portrait gift from a photo. Premium digital charcoal artwork delivered as a print-ready file for framing.',
    keywords: ['birthday portrait gift', 'charcoal portrait gift', 'custom portrait gift'],
    eyebrow: 'For birthdays',
    h1: 'Birthday portrait gift',
    intro:
      'A birthday portrait says you paid attention. It takes a favorite image and turns it into a premium digital charcoal artwork they can print, frame, and keep long after the celebration ends.',
    image: '/artworks/realistic-charcoal-portrait-wizkid-starboy.png',
    imageAlt: 'Custom birthday portrait gift in realistic digital charcoal style',
    trust: ['Personal and memorable', 'High-resolution delivery', 'Gift-ready artwork', 'Easy to print locally'],
    sections: [
      {
        eyebrow: 'Gift strategy',
        title: 'Choose a photo that shows who they are',
        body: [
          'For birthdays, the best reference photo often has confidence, warmth, or a look they love. A strong portrait does not need a busy background; it needs a face with presence.',
          'The final artwork can be printed as a framed gift, used as a surprise digital reveal, or sent to family members who want their own copy.',
        ],
        bullets: [
          'Milestone birthday gifts',
          'Parent birthday portraits',
          'Partner birthday gifts',
          'Celebrity-style portrait artwork',
        ],
      },
    ],
    faqs: coreFaqs,
    related: funnelLinks,
    schemaName: 'Birthday portrait gift',
    schemaDescription:
      'Custom digital charcoal birthday portrait gift made from a customer photo.',
  },
  {
    slug: 'memorial-portrait-from-photo',
    path: '/memorial-portrait-from-photo',
    kind: 'gift',
    seoTitle: 'Memorial Portrait From Photo | Arts By Creeda',
    metaDescription:
      'Create a respectful memorial portrait from a loved one photo. Premium digital charcoal artwork delivered print-ready for remembrance and family keepsakes.',
    keywords: ['memorial portrait from photo', 'portrait from photo', 'family portrait drawing'],
    eyebrow: 'Remembrance portraits',
    h1: 'Memorial portrait from photo',
    intro:
      'A memorial portrait should be handled with care. Arts By Creeda turns a loved one photo into a respectful charcoal-style artwork that families can print, frame, and keep close.',
    image: familyImage,
    imageAlt: 'Memorial charcoal portrait from photo, digital print-ready artwork',
    trust: ['Respectful portrait handling', 'Secure photo submission', 'Digital file for family sharing', 'Print-ready remembrance artwork'],
    sections: [
      {
        eyebrow: 'Tone',
        title: 'Quiet, dignified, and deeply personal',
        body: [
          'Memorial artwork is not about decoration. It is about preserving presence. The charcoal style creates a calm, timeless finish that can suit a home, remembrance table, or framed family keepsake.',
          'If the only photo you have is older or imperfect, send the clearest version available and include any notes that matter to the family.',
        ],
        bullets: [
          'Loved one remembrance portraits',
          'Parent and grandparent memorial art',
          'Family keepsake files',
          'Printable tribute portraits',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can you work from an old photo?',
        answer:
          'Often, yes. Send the clearest available version. If the face is too damaged or blurred, the studio may recommend photo restoration or ask for another reference.',
      },
      ...coreFaqs,
    ],
    related: [
      { label: 'Family charcoal portrait', href: '/family-charcoal-portrait' },
      ...funnelLinks,
    ],
    schemaName: 'Memorial portrait from photo',
    schemaDescription:
      'Respectful digital charcoal memorial portrait service created from a loved one photo.',
  },
  {
    slug: 'family-charcoal-portrait',
    path: '/family-charcoal-portrait',
    kind: 'service',
    seoTitle: 'Family Charcoal Portrait From Photo | Arts By Creeda',
    metaDescription:
      'Commission a realistic family charcoal portrait from a photo. Premium digital portrait artwork for family memories, gifts, and printable wall art.',
    keywords: ['family charcoal portrait', 'family portrait drawing', 'realistic charcoal portrait'],
    eyebrow: 'Family portraits',
    h1: 'Family charcoal portrait',
    intro:
      'Family portraits carry history. Arts By Creeda creates premium digital charcoal family artwork from photos, giving your home a print-ready piece that feels warm, dignified, and personal.',
    image: familyImage,
    imageAlt: 'Realistic family charcoal portrait artwork from customer photo',
    trust: ['Family keepsake artwork', 'Digital file for reprints', 'Premium charcoal tone', 'Worldwide delivery'],
    sections: [
      {
        eyebrow: 'Family memory',
        title: 'For the faces that built the story',
        body: [
          'A family charcoal portrait can celebrate parents, grandparents, siblings, children, or a multi-generation memory. The strongest references show everyone clearly and allow the faces to carry the emotion.',
        ],
        bullets: [
          'Parent and child portraits',
          'Sibling portraits',
          'Grandparent portraits',
          'Family wall art files',
        ],
      },
    ],
    faqs: coreFaqs,
    related: funnelLinks,
    schemaName: 'Family charcoal portrait',
    schemaDescription:
      'Custom digital family charcoal portrait service for print-ready family artwork.',
  },
  {
    slug: 'couple-charcoal-portrait',
    path: '/couple-charcoal-portrait',
    kind: 'service',
    seoTitle: 'Couple Charcoal Portrait From Photo | Arts By Creeda',
    metaDescription:
      'Order a couple charcoal portrait from a favorite photo. Premium digital portrait artwork for anniversaries, weddings, and romantic gifts.',
    keywords: ['couple charcoal portrait', 'couple portrait drawing', 'anniversary portrait gift'],
    eyebrow: 'Couple portraits',
    h1: 'Couple charcoal portrait',
    intro:
      'A couple portrait should feel intimate, not overly sentimental. Arts By Creeda turns a chosen photo into a refined digital charcoal artwork made for anniversaries, weddings, and home display.',
    image: coupleImage,
    imageAlt: 'Couple charcoal portrait drawing from customer photo',
    trust: ['Refined romantic gift', 'Print-ready file', 'Anniversary-ready artwork', 'Worldwide delivery'],
    sections: [
      {
        eyebrow: 'Relationship art',
        title: 'A portrait that belongs to both of you',
        body: [
          'The best couple portrait reference has both faces clearly visible, natural body language, and a moment that feels true. The final artwork can become a framed anniversary gift, wedding keepsake, or first-home piece.',
        ],
        bullets: [
          'Wedding photo portraits',
          'Anniversary couple gifts',
          'Engagement portraits',
          'Romantic printable wall art',
        ],
      },
    ],
    faqs: coreFaqs,
    related: [
      { label: 'Anniversary portrait gift', href: '/anniversary-portrait-gift' },
      ...funnelLinks,
    ],
    schemaName: 'Couple charcoal portrait',
    schemaDescription:
      'Custom digital couple charcoal portrait service created from a favorite photo.',
  },
  {
    slug: 'luxury-portrait-art',
    path: '/luxury-portrait-art',
    kind: 'service',
    seoTitle: 'Luxury Portrait Art From Photo | Arts By Creeda',
    metaDescription:
      'Commission luxury digital portrait art from your photo. Premium charcoal-style printable wall art for collectors, gifts, and elegant interiors.',
    keywords: ['luxury portrait art', 'luxury portrait gift', 'premium digital portrait'],
    eyebrow: 'Premium wall art',
    h1: 'Luxury portrait art',
    intro:
      'Luxury portrait art is not loud. It is intentional, emotionally specific, and finished with enough restraint to live in a beautiful room. Arts By Creeda creates digital charcoal portrait files made for premium printing and framing.',
    image: '/artworks/luxury-charcoal-portrait-burna-boy-twice-as-tall.png',
    imageAlt: 'Luxury digital charcoal portrait art for printable wall display',
    trust: ['Collector-grade tone', 'Elegant charcoal finish', 'Printable wall art', 'Global digital delivery'],
    sections: [
      {
        eyebrow: 'Interior-ready',
        title: 'Created to feel collected, not casual',
        body: [
          'The charcoal palette works because it is timeless. It pairs well with black, walnut, brass, concrete, ivory walls, and gallery-style frames.',
          'Whether the subject is a family member, a cultural icon, or a personal milestone, the finish is designed to feel refined.',
        ],
        bullets: [
          'Premium printable portrait artwork',
          'Statement wall portraits',
          'Collector and celebrity-style portraits',
          'Luxury gift presentation',
        ],
      },
    ],
    faqs: coreFaqs,
    related: funnelLinks,
    schemaName: 'Luxury portrait art',
    schemaDescription:
      'Premium digital charcoal portrait art service for print-ready luxury wall art.',
  },
  {
    slug: 'charcoal-portrait-artist-nigeria',
    path: '/charcoal-portrait-artist-nigeria',
    kind: 'service',
    seoTitle: 'Charcoal Portrait Artist Nigeria and Lagos | Arts By Creeda',
    metaDescription:
      'Arts By Creeda is a Lagos, Nigeria custom digital charcoal portrait artist serving local and worldwide customers with print-ready portrait files.',
    keywords: ['charcoal portrait artist Nigeria', 'custom portrait artist Lagos', 'custom portrait artist'],
    eyebrow: 'Lagos studio, global delivery',
    h1: 'Charcoal portrait artist in Nigeria',
    intro:
      'Arts By Creeda is a Lagos-based digital charcoal portrait studio serving customers in Nigeria and worldwide. Order from Lagos, Abuja, Port Harcourt, Accra, London, Toronto, New York, or anywhere a print-ready file can reach.',
    image: '/creeda-portrait.png',
    imageAlt: 'Creeda, custom charcoal portrait artist in Lagos Nigeria',
    trust: ['Based in Lagos, Nigeria', 'Worldwide digital delivery', 'Secure online ordering', 'Premium portrait files'],
    sections: [
      {
        eyebrow: 'Local and global',
        title: 'A Nigerian portrait artist with a worldwide delivery model',
        body: [
          'Because the main product is digital, customers do not need to be in Lagos to order. Send the photo online, complete payment, and receive a printable file by email.',
          'For customers in Nigeria, the process is still simple: order online, upload your reference, and print locally or arrange your own preferred presentation.',
        ],
        bullets: [
          'Custom portrait artist Lagos',
          'Digital charcoal portraits Nigeria',
          'Worldwide portrait delivery',
          'Print-ready files for local framing',
        ],
      },
    ],
    faqs: coreFaqs,
    related: funnelLinks,
    schemaName: 'Charcoal portrait artist Nigeria',
    schemaDescription:
      'Lagos, Nigeria custom digital charcoal portrait artist serving Nigerian and worldwide customers.',
  },
  {
    slug: 'how-it-works',
    path: '/how-it-works',
    kind: 'info',
    seoTitle: 'How Custom Digital Portrait Orders Work | Arts By Creeda',
    metaDescription:
      'See how to order a custom digital charcoal portrait from Arts By Creeda: choose your style, upload your photo, pay securely, and receive a print-ready file.',
    keywords: ['how custom portraits work', 'custom portrait order', 'digital portrait delivery'],
    eyebrow: 'Ordering guide',
    h1: 'How it works',
    intro:
      'The order flow is built to be simple: choose the portrait, send a strong photo, pay securely, and receive a high-resolution digital file ready for printing.',
    image: portfolioImage,
    imageAlt: 'Burna Boy custom charcoal portrait drawing by Arts By Creeda',
    trust: ['Clear order steps', 'Secure Paystack payment', 'Photo upload included', 'Email delivery'],
    sections: [
      {
        eyebrow: 'Step 1',
        title: 'Choose your portrait style and format',
        body: [
          'Start with the order page and pick the portrait style, size, and whether you want a soft copy or eligible framed option where available.',
        ],
      },
      {
        eyebrow: 'Step 2',
        title: 'Upload your best photo',
        body: [
          'Use a clear JPG or PNG where the subject is sharp and the face is easy to see. Add notes if the portrait is for a memorial, anniversary, birthday, or family gift.',
        ],
      },
      {
        eyebrow: 'Step 3',
        title: 'Receive your print-ready artwork',
        body: [
          'After payment and studio processing, your high-resolution file is delivered by email. You can print locally, frame it, or share it with family for personal use.',
        ],
      },
    ],
    faqs: coreFaqs,
    related: funnelLinks,
    schemaName: 'Custom digital portrait ordering service',
    schemaDescription:
      'Simple order process for custom digital charcoal portraits from customer photos.',
  },
  {
    slug: 'pricing',
    path: '/pricing',
    kind: 'pricing',
    seoTitle: 'Custom Charcoal Portrait Pricing | Arts By Creeda',
    metaDescription:
      'View Arts By Creeda pricing for digital charcoal portraits, framed pickup options, urban artwork, and photo restoration services.',
    keywords: ['custom charcoal portrait pricing', 'digital portrait price', 'portrait drawing price Nigeria'],
    eyebrow: 'Transparent pricing',
    h1: 'Portrait pricing',
    intro:
      'Choose the portrait size and delivery format that fits your gift, wall, or budget. Pricing is shown in Nigerian naira and the checkout flow calculates the final total before payment.',
    image: portfolioImage,
    imageAlt: 'Burna Boy charcoal portrait illustrating premium custom portrait pricing',
    trust: ['No hidden fees in checkout', 'Soft copy pricing available', 'Framed pickup option shown where available', 'Photo restoration priced separately'],
    sections: [
      {
        eyebrow: 'Pricing note',
        title: 'Start with the size you want to print',
        body: [
          'Digital portrait pricing is tied to size and style. Framed pricing adds the frame cost on top of the soft-copy artwork price where framed pickup is available.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What currency is used?',
        answer: 'Prices are listed and charged in Nigerian naira through Paystack.',
      },
      {
        question: 'Can international customers order?',
        answer:
          'Yes. International customers can order digital files and print locally after receiving the artwork by email.',
      },
      ...coreFaqs,
    ],
    related: funnelLinks,
    schemaName: 'Custom charcoal portrait pricing',
    schemaDescription:
      'Pricing information for custom digital charcoal portraits, framed artwork, urban pieces, and photo restoration.',
  },
  {
    slug: 'faq',
    path: '/faq',
    kind: 'faq',
    seoTitle: 'Custom Charcoal Portrait FAQ | Arts By Creeda',
    metaDescription:
      'Answers to common questions about ordering custom digital charcoal portraits, photo quality, delivery, printing, revisions, and worldwide orders.',
    keywords: ['custom portrait FAQ', 'digital charcoal portrait questions', 'portrait from photo FAQ'],
    eyebrow: 'Questions answered',
    h1: 'Custom portrait FAQ',
    intro:
      'Everything buyers usually ask before ordering a custom digital charcoal portrait from Arts By Creeda: photo requirements, file delivery, printing, payment, revisions, and privacy.',
    image: portfolioImage,
    imageAlt: 'Burna Boy digital charcoal portrait by Arts By Creeda',
    trust: ['Clear buying answers', 'Print guidance included', 'Privacy-first photo handling', 'Worldwide delivery answers'],
    sections: [
      {
        eyebrow: 'Before you order',
        title: 'Read this if you are choosing a gift',
        body: [
          'The best portrait orders begin with a strong photo and a clear purpose. If it is for a birthday, anniversary, memorial, or family gift, include that context in your notes.',
        ],
      },
    ],
    faqs: [
      ...coreFaqs,
      {
        question: 'How should I print my digital portrait?',
        answer:
          'Use a trusted print shop, choose heavyweight matte or fine art paper, and frame behind clean glass or acrylic. Avoid low-quality glossy paper for premium gifts.',
      },
      {
        question: 'Will my reference photo be shared publicly?',
        answer:
          'The site promises private handling. If you do not want the finished portrait used in the public portfolio, say so in your order notes.',
      },
    ],
    related: funnelLinks,
    schemaName: 'Custom charcoal portrait FAQ',
    schemaDescription:
      'Frequently asked questions about custom digital charcoal portraits from customer photos.',
  },
  {
    slug: 'portfolio',
    path: '/portfolio',
    kind: 'portfolio',
    seoTitle: 'Digital Charcoal Portrait Portfolio | Arts By Creeda',
    metaDescription:
      'Explore Arts By Creeda digital charcoal portrait artwork, including premium portrait studies, family-style pieces, celebrity-style art, and dark pencil portraits.',
    keywords: ['digital charcoal portrait portfolio', 'realistic charcoal portrait', 'custom portrait artist'],
    eyebrow: 'Selected artwork',
    h1: 'Portrait portfolio',
    intro:
      'Explore selected digital charcoal and dark pencil portrait studies from Arts By Creeda. Use the gallery to understand the finish, tonal depth, facial detail, and gift-worthy presentation style.',
    image: portfolioImage,
    imageAlt: 'Arts By Creeda digital charcoal portrait portfolio',
    trust: ['Real portfolio images', 'Descriptive alt text', 'Image sitemap support', 'Order similar artwork'],
    sections: [
      {
        eyebrow: 'Portfolio note',
        title: 'Use the work to choose your own portrait direction',
        body: [
          'The portfolio shows how the studio handles contrast, expression, hair texture, clothing detail, and dramatic charcoal mood. Your portrait will be based on your own photo and the details you provide.',
        ],
      },
    ],
    faqs: coreFaqs,
    related: funnelLinks,
    schemaName: 'Digital charcoal portrait portfolio',
    schemaDescription:
      'Portfolio gallery of premium digital charcoal portrait artwork by Arts By Creeda.',
  },
];

export const SEO_PAGE_PATHS = SEO_PAGES.map((page) => page.path);

export function getSeoPage(slug: string) {
  return SEO_PAGES.find((page) => page.slug === slug);
}
