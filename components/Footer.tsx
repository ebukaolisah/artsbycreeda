'use client';

import { Facebook, Instagram, Mail, MessageCircle } from 'lucide-react';
import { BRAND, FUNNEL_LINKS, GIFT_LINKS, MAIN_SERVICE_LINKS } from '@/lib/constants';

function TikTokIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16.5 2c.2 1.4.8 2.7 1.8 3.7 1 .9 2.3 1.4 3.7 1.5v3.4c-1.7-.1-3.3-.6-4.7-1.5v6.7c0 2-.6 3.9-1.7 5.3-1.2 1.5-2.8 2.4-4.6 2.7-1.8.3-3.6 0-5.2-.9C4.2 22 3 20.6 2.4 19c-.7-1.7-.7-3.5-.1-5.2.6-1.7 1.7-3.1 3.2-4 1.5-.9 3.3-1.3 5-1v3.6c-.9-.3-1.9-.3-2.8 0-.9.3-1.6.9-2 1.7-.5.8-.6 1.7-.3 2.6.2.9.8 1.7 1.6 2.2.8.5 1.7.6 2.6.4.9-.2 1.7-.8 2.2-1.6.4-.6.5-1.3.5-2V2h4.2Z" />
    </svg>
  );
}

function XIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z" />
    </svg>
  );
}

const SOCIALS = [
  { label: 'Instagram', href: BRAND.socials.instagram, Icon: Instagram },
  { label: 'Facebook', href: BRAND.socials.facebook, Icon: Facebook },
  { label: 'TikTok', href: BRAND.socials.tiktok, Icon: TikTokIcon },
  { label: 'X', href: BRAND.socials.twitter, Icon: XIcon },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-ivory/5 bg-charcoal pb-24 pt-20 md:pb-12">
      <div className="container-art">
        <div className="text-center">
          <div className="font-serif text-[clamp(4rem,16vw,14rem)] font-light leading-none tracking-tightest text-ivory/[0.07]">
            ArtsByCreeda
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 border-t border-ivory/10 pt-12 md:grid-cols-2 xl:grid-cols-5">
          <div className="xl:col-span-1">
            <div className="font-serif text-2xl text-ivory">{BRAND.name}</div>
            <p className="mt-3 font-sans text-sm font-light leading-relaxed text-ivory/60">
              {BRAND.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={BRAND.orderPath} data-track="order_click" className="btn-primary !px-5 !py-3 !text-[10px]">
                Order
              </a>
              <a href={BRAND.whatsappUrl} data-track="whatsapp_click" className="btn-outline !px-5 !py-3 !text-[10px]">
                WhatsApp
              </a>
            </div>
          </div>

          <FooterList title="Services" links={MAIN_SERVICE_LINKS} />
          <FooterList title="Gift categories" links={GIFT_LINKS} />
          <FooterList title="Explore" links={FUNNEL_LINKS} />

          <div>
            <div className="eyebrow">Contact</div>
            <ul className="mt-4 space-y-3 font-sans text-sm">
              <li>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="inline-flex items-center gap-2 text-ivory/70 transition-colors hover:text-gold"
                >
                  <Mail size={14} aria-hidden />
                  {BRAND.email}
                </a>
              </li>
              <li>
                <a
                  href={BRAND.whatsappUrl}
                  data-track="whatsapp_click"
                  className="inline-flex items-center gap-2 text-ivory/70 transition-colors hover:text-gold"
                >
                  <MessageCircle size={14} aria-hidden />
                  Start on WhatsApp
                </a>
              </li>
            </ul>

            <div className="eyebrow mt-8">Follow</div>
            <div className="mt-4 flex gap-3">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="group grid h-10 w-10 place-items-center rounded-full border border-ivory/10 text-ivory/70 transition-all duration-500 hover:scale-110 hover:border-gold hover:text-gold"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-ivory/10 pt-8 font-sans text-xs text-ivory/40 md:flex-row">
          <div>&copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.</div>
          <div>{BRAND.location.city}, {BRAND.location.country} / Worldwide digital delivery</div>
        </div>
      </div>
    </footer>
  );
}

function FooterList({
  title,
  links,
}: {
  title: string;
  links: ReadonlyArray<{ label: string; href: string }>;
}) {
  return (
    <div>
      <div className="eyebrow">{title}</div>
      <ul className="mt-4 space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="font-sans text-sm leading-relaxed text-ivory/70 transition-colors hover:text-gold"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
