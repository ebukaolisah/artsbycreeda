import { BRAND } from '@/lib/constants';
import type { FaqItem, PageLink } from '@/lib/seo-pages';

export type GuideSection = {
  heading: string;
  body: string[];
};

export type GuideArticle = {
  slug: string;
  path: string;
  seoTitle: string;
  metaDescription: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  sections: GuideSection[];
  faqs: FaqItem[];
  related: PageLink[];
};

const defaultRelated: PageLink[] = [
  { label: 'Order your portrait', href: BRAND.orderPath },
  { label: 'View portfolio', href: '/portfolio' },
  { label: 'See pricing', href: '/pricing' },
  { label: 'How it works', href: '/how-it-works' },
];

export const GUIDE_ARTICLES: GuideArticle[] = [
  {
    slug: 'best-photo-to-send-for-a-charcoal-portrait',
    path: '/gift-guides/best-photo-to-send-for-a-charcoal-portrait',
    seoTitle: 'Best Photo to Send for a Charcoal Portrait | Arts By Creeda',
    metaDescription:
      'Learn how to choose the best reference photo for a custom charcoal portrait, including lighting, sharpness, expression, and gift-order tips.',
    title: 'Best Photo to Send for a Charcoal Portrait',
    excerpt:
      'A premium portrait starts before the first stroke. The right reference photo gives the artist clearer likeness, stronger emotion, and a cleaner final file.',
    image: '/artworks/custom-charcoal-portrait-burna-boy-african-giant.png',
    imageAlt: 'Burna Boy drawing showing the detail possible in a custom charcoal portrait',
    sections: [
      {
        heading: 'Choose clarity over drama',
        body: [
          'A beautiful background matters less than a sharp face. Send a photo where the eyes, nose, mouth, and face shape are easy to see.',
          'Avoid heavy blur, screenshots from low-quality videos, and photos where the face is hidden by sunglasses, shadows, or aggressive filters.',
        ],
      },
      {
        heading: 'Look for natural light and expression',
        body: [
          'Soft window light, outdoor shade, or a clean phone portrait can work well. A relaxed expression often gives the final artwork more soul than a forced pose.',
          'If the portrait is a gift, choose a photo the person actually loves or one that captures how the family remembers them.',
        ],
      },
      {
        heading: 'Send context with the image',
        body: [
          'Use your order notes to explain the occasion: birthday, anniversary, memorial, family keepsake, or collector portrait. Context helps the final image feel more intentional.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can I send more than one photo?',
        answer:
          'Use the order notes to mention if you have more references. The studio can advise which image is strongest for the final portrait.',
      },
      {
        question: 'Can an old photo work?',
        answer:
          'Yes, if the face is still readable. If the image is badly damaged, photo restoration may be a better first step.',
      },
    ],
    related: [
      { label: 'Custom charcoal portrait from photo', href: '/custom-charcoal-portrait-from-photo' },
      ...defaultRelated,
    ],
  },
  {
    slug: 'why-a-custom-portrait-makes-a-powerful-gift',
    path: '/gift-guides/why-a-custom-portrait-makes-a-powerful-gift',
    seoTitle: 'Why a Custom Portrait Makes a Powerful Gift | Arts By Creeda',
    metaDescription:
      'Discover why a custom portrait gift feels personal, emotional, and long-lasting for birthdays, anniversaries, memorials, and family occasions.',
    title: 'Why a Custom Portrait Makes a Powerful Gift',
    excerpt:
      'The best gifts feel specific. A custom portrait turns memory into something visible, printable, and difficult to forget.',
    image: '/artworks/custom-charcoal-portrait-davido-obo.png',
    imageAlt: 'Custom charcoal portrait gift made from a photo',
    sections: [
      {
        heading: 'It proves you paid attention',
        body: [
          'A custom portrait is built from a real image, so it cannot feel generic. It carries the recipient, the relationship, and the moment behind the photo.',
        ],
      },
      {
        heading: 'It lasts beyond the event',
        body: [
          'Flowers fade and many gifts get used up. A portrait can become framed wall art, a keepsake file, or a family piece that stays visible for years.',
        ],
      },
      {
        heading: 'It works across emotional occasions',
        body: [
          'Portraits can celebrate birthdays, anniversaries, parents, children, memorials, and milestones. The same format can feel joyful, romantic, or reverent depending on the photo.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is a custom portrait a good last-minute gift?',
        answer:
          'A digital portrait can work well when you still have time for creation and printing. Check the current order flow before promising a reveal date.',
      },
      {
        question: 'How should I present a digital portrait gift?',
        answer:
          'Print it on quality matte paper, frame it simply, and include a short note explaining why you chose that photo.',
      },
    ],
    related: [
      { label: 'Charcoal portrait gift', href: '/charcoal-portrait-gift' },
      { label: 'Birthday portrait gift', href: '/birthday-portrait-gift' },
      { label: 'Anniversary portrait gift', href: '/anniversary-portrait-gift' },
      ...defaultRelated,
    ],
  },
  {
    slug: 'digital-portrait-vs-physical-portrait',
    path: '/gift-guides/digital-portrait-vs-physical-portrait',
    seoTitle: 'Digital Portrait vs Physical Portrait: Which Should You Choose?',
    metaDescription:
      'Compare digital portraits and physical portrait prints so you can choose the best format for gifts, home display, worldwide delivery, and framing.',
    title: 'Digital Portrait vs Physical Portrait: Which Should You Choose?',
    excerpt:
      'Digital and physical portraits solve different problems. The right choice depends on timing, location, presentation, and how much control you want over printing.',
    image: '/style-charcoal.png',
    imageAlt: 'Digital charcoal portrait file compared with physical framed portrait artwork',
    sections: [
      {
        heading: 'Choose digital for speed and flexibility',
        body: [
          'A digital portrait is delivered as a high-resolution file. It is ideal when the buyer and recipient live in different places or when you want to print more than one personal copy.',
        ],
      },
      {
        heading: 'Choose physical when presentation is handled for you',
        body: [
          'A physical portrait can be convenient when print and frame decisions are already built into the service. Availability depends on the studio location and current offer.',
        ],
      },
      {
        heading: 'The premium route',
        body: [
          'Many buyers order digital, then print locally with a trusted fine art printer. This gives control over paper, frame, size, and delivery date.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is a digital portrait less premium?',
        answer:
          'No. The file can be premium if the artwork is high-resolution and printed well. The final presentation depends on paper, ink, and frame quality.',
      },
      {
        question: 'Can I print a digital portrait more than once?',
        answer:
          'For personal use, digital files are practical because you can print for your home or family. Commercial use requires separate permission.',
      },
    ],
    related: [
      { label: 'Digital charcoal portrait', href: '/digital-charcoal-portrait' },
      ...defaultRelated,
    ],
  },
  {
    slug: 'how-to-print-your-digital-portrait-like-luxury-artwork',
    path: '/gift-guides/how-to-print-your-digital-portrait-like-luxury-artwork',
    seoTitle: 'How to Print Your Digital Portrait Like Luxury Artwork',
    metaDescription:
      'A simple guide to printing your digital charcoal portrait with premium paper, sizing, framing, and display choices for a luxury finish.',
    title: 'How to Print Your Digital Portrait Like a Luxury Artwork',
    excerpt:
      'A premium file deserves premium printing. Paper, size, frame, and glass choice can make the portrait feel collected instead of casual.',
    image: '/artworks/luxury-charcoal-portrait-burna-boy-twice-as-tall.png',
    imageAlt: 'Printed digital charcoal portrait styled like luxury wall artwork',
    sections: [
      {
        heading: 'Use matte or fine art paper',
        body: [
          'Glossy paper can make charcoal-style artwork feel cheaper. Choose heavyweight matte, textured fine art paper, or museum-style archival paper for a softer luxury finish.',
        ],
      },
      {
        heading: 'Frame with restraint',
        body: [
          'A slim black frame, walnut frame, or clean gallery frame usually works best. Let the face and tonal contrast lead the room.',
        ],
      },
      {
        heading: 'Print at the right size',
        body: [
          'For gifts, choose a size that feels intentional but manageable. For statement walls, go larger and leave enough white space or matting around the portrait.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can I print at home?',
        answer:
          'You can, but a professional print shop will usually produce better paper, ink density, and longevity.',
      },
      {
        question: 'Should I choose canvas?',
        answer:
          'Canvas can work, but matte paper often preserves the fine charcoal detail more elegantly.',
      },
    ],
    related: [
      { label: 'Luxury portrait art', href: '/luxury-portrait-art' },
      ...defaultRelated,
    ],
  },
  {
    slug: 'best-portrait-gift-ideas-for-birthdays-and-anniversaries',
    path: '/gift-guides/best-portrait-gift-ideas-for-birthdays-and-anniversaries',
    seoTitle: 'Best Portrait Gift Ideas for Birthdays and Anniversaries',
    metaDescription:
      'Explore portrait gift ideas for birthdays and anniversaries, including couple portraits, family portraits, memorial gifts, and printable wall art.',
    title: 'Best Portrait Gift Ideas for Birthdays and Anniversaries',
    excerpt:
      'A portrait gift can be romantic, celebratory, or quietly emotional. The best idea depends on the person and the story behind the photo.',
    image: '/artworks/premium-digital-charcoal-portrait-faith-ojo.png',
    imageAlt: 'Portrait gift ideas for birthdays and anniversaries in charcoal style',
    sections: [
      {
        heading: 'For birthdays',
        body: [
          'Choose a confident solo photo, a parent portrait, or a favorite image that represents who the person is now. A framed portrait can feel especially strong for milestone birthdays.',
        ],
      },
      {
        heading: 'For anniversaries',
        body: [
          'Choose a couple photo with genuine expression: wedding day, first trip, quiet candid, or a family moment with emotional weight.',
        ],
      },
      {
        heading: 'For families',
        body: [
          'A family portrait works beautifully when the gift is for parents, grandparents, or a home that values memory and legacy.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Which portrait gift is most romantic?',
        answer:
          'A couple portrait from a meaningful shared photo is usually strongest for anniversaries and romantic milestones.',
      },
      {
        question: 'Which portrait gift is safest for parents?',
        answer:
          'A family or memorial portrait is often the safest emotional choice for parents and grandparents.',
      },
    ],
    related: [
      { label: 'Birthday portrait gift', href: '/birthday-portrait-gift' },
      { label: 'Anniversary portrait gift', href: '/anniversary-portrait-gift' },
      ...defaultRelated,
    ],
  },
  {
    slug: 'memorial-portraits-turning-a-loved-ones-photo-into-timeless-art',
    path: '/gift-guides/memorial-portraits-turning-a-loved-ones-photo-into-timeless-art',
    seoTitle: 'Memorial Portraits: Turning a Loved One Photo Into Timeless Art',
    metaDescription:
      'A sensitive guide to memorial portraits from photos, including how to choose the image, share context, and print the finished artwork respectfully.',
    title: "Memorial Portraits: Turning a Loved One's Photo Into Timeless Art",
    excerpt:
      'A memorial portrait is a careful act of remembrance. The right photo and presentation can help a family keep presence close.',
    image: '/artworks/legacy-family-charcoal-portrait-chief-patrick.png',
    imageAlt: 'Memorial charcoal portrait from a loved one photo',
    sections: [
      {
        heading: 'Start with the clearest face',
        body: [
          'For memorial work, clarity matters because likeness matters. Choose the sharpest photo you have, even if it is not the most dramatic.',
        ],
      },
      {
        heading: 'Share what the portrait means',
        body: [
          'Use the order notes to explain the person, the relationship, and the intended use. A remembrance portrait for a home may need a different tone from one for a ceremony.',
        ],
      },
      {
        heading: 'Print with dignity',
        body: [
          'Choose a calm frame, matte paper, and a size that suits the room. A memorial portrait should feel respectful, not oversized for its context.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can a memorial portrait be made from an old image?',
        answer:
          'Often, yes. Send the clearest available scan or phone photo. The studio may ask for another image if the face is too unclear.',
      },
      {
        question: 'Can family members print copies?',
        answer:
          'Digital files are practical for family keepsakes. Keep use personal unless you arrange commercial rights separately.',
      },
    ],
    related: [
      { label: 'Memorial portrait from photo', href: '/memorial-portrait-from-photo' },
      { label: 'Family charcoal portrait', href: '/family-charcoal-portrait' },
      ...defaultRelated,
    ],
  },
  {
    slug: 'how-long-does-a-custom-portrait-take',
    path: '/gift-guides/how-long-does-a-custom-portrait-take',
    seoTitle: 'How Long Does a Custom Portrait Take? | Arts By Creeda',
    metaDescription:
      'Learn what affects custom portrait turnaround time, from photo quality and composition to digital delivery, printing, and gift deadlines.',
    title: 'How Long Does a Custom Portrait Take?',
    excerpt:
      'Turnaround depends on the current studio queue, reference quality, complexity, and delivery format. Planning early always gives the best gift experience.',
    image: '/artworks/realistic-charcoal-portrait-burna-boy-last-last.png',
    imageAlt: 'Custom charcoal portrait turnaround time and digital delivery guide',
    sections: [
      {
        heading: 'Photo quality affects speed',
        body: [
          'A clear reference photo reduces back-and-forth and gives the studio a stronger starting point. Blurry or damaged photos can take longer to assess.',
        ],
      },
      {
        heading: 'Digital delivery is faster than physical delivery',
        body: [
          'A print-ready digital file avoids shipping time. If you plan to frame the portrait yourself, add printing and framing time to your gift deadline.',
        ],
      },
      {
        heading: 'Order before the occasion feels urgent',
        body: [
          'For birthdays, anniversaries, and memorial dates, order early enough to allow artwork creation, printing, framing, and wrapping.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Does the site offer 24-48 hour delivery?',
        answer:
          'The current site references 24-48 hour soft-copy delivery for many orders. Always confirm timing in the order flow if you have a fixed deadline.',
      },
      {
        question: 'Can printing add extra time?',
        answer:
          'Yes. Even after digital delivery, your local print shop or framer may need additional time.',
      },
    ],
    related: [
      { label: 'How it works', href: '/how-it-works' },
      ...defaultRelated,
    ],
  },
  {
    slug: 'what-makes-a-portrait-look-premium',
    path: '/gift-guides/what-makes-a-portrait-look-premium',
    seoTitle: 'What Makes a Portrait Look Premium? | Arts By Creeda',
    metaDescription:
      'Learn what gives a custom portrait a premium feel: likeness, tonal range, restraint, file quality, printing, framing, and presentation.',
    title: 'What Makes a Portrait Look Premium?',
    excerpt:
      'A premium portrait is not only detailed. It is controlled, emotionally clear, well printed, and presented with restraint.',
    image: '/artworks/realistic-charcoal-portrait-wizkid-starboy.png',
    imageAlt: 'Premium realistic charcoal portrait with luxury dark pencil finish',
    sections: [
      {
        heading: 'Likeness comes first',
        body: [
          'If the face does not feel like the person, no amount of texture can save the portrait. Premium portrait work begins with recognisable likeness.',
        ],
      },
      {
        heading: 'Tonal range creates depth',
        body: [
          'Charcoal-style artwork depends on controlled lights, midtones, and shadows. Good contrast gives the face structure without making it harsh.',
        ],
      },
      {
        heading: 'Presentation completes the work',
        body: [
          'A high-resolution file, matte paper, clean frame, and thoughtful placement can make a digital portrait feel like gallery-level wall art.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Does more detail always look more premium?',
        answer:
          'No. Detail matters, but restraint matters too. A premium portrait knows what to sharpen and what to leave quiet.',
      },
      {
        question: 'Can a phone photo become premium artwork?',
        answer:
          'Yes, if the phone photo is clear, well lit, and high enough quality for the face to be read accurately.',
      },
    ],
    related: [
      { label: 'Luxury portrait art', href: '/luxury-portrait-art' },
      { label: 'Digital charcoal portrait', href: '/digital-charcoal-portrait' },
      ...defaultRelated,
    ],
  },
];

export const GUIDE_PATHS = GUIDE_ARTICLES.map((article) => article.path);

export function getGuideArticle(slug: string) {
  return GUIDE_ARTICLES.find((article) => article.slug === slug);
}
