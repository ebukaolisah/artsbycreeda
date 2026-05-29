'use client';

import { Instagram, Facebook } from 'lucide-react';
import { BRAND, NAV_LINKS } from '@/lib/constants';

// TikTok icon (lucide doesn't have one matching the brand mark; use a small inline svg)
function TikTokIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16.5 2c.2 1.4.8 2.7 1.8 3.7 1 .9 2.3 1.4 3.7 1.5v3.4c-1.7-.1-3.3-.6-4.7-1.5v6.7c0 2-.6 3.9-1.7 5.3-1.2 1.5-2.8 2.4-4.6 2.7-1.8.3-3.6 0-5.2-.9C4.2 22 3 20.6 2.4 19c-.7-1.7-.7-3.5-.1-5.2.6-1.7 1.7-3.1 3.2-4 1.5-.9 3.3-1.3 5-1v3.6c-.9-.3-1.9-.3-2.8 0-.9.3-1.6.9-2 1.7-.5.8-.6 1.7-.3 2.6.2.9.8 1.7 1.6 2.2.8.5 1.7.6 2.6.4.9-.2 1.7-.8 2.2-1.6.4-.6.5-1.3.5-2V2h4.2Z" />
    </svg>
  );
}

// X (formerly Twitter) — official mark
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
    <footer className="relative border-t border-ivory/5 bg-charcoal pt-24 pb-12">
      <div className="container-art">
        {/* Big wordmark */}
        <div className="text-center">
          <div className="font-serif text-[clamp(4rem,16vw,14rem)] font-light leading-none tracking-tightest text-ivory/[0.07]">
            ArtsByCreeda
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-8 border-t border-ivory/10 pt-12 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <div className="font-serif text-2xl text-ivory">{BRAND.name}</div>
            <p className="mt-3 font-sans text-sm font-light leading-relaxed text-ivory/60">
              {BRAND.description}
            </p>
          </div>

          <div>
            <div className="eyebrow">Explore</div>
            <ul className="mt-4 space-y-2">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="font-sans text-sm text-ivory/70 transition-colors hover:text-gold"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="eyebrow">Contact</div>
            <ul className="mt-4 space-y-2 font-sans text-sm">
              <li>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="text-ivory/70 transition-colors hover:text-gold"
                >
                  {BRAND.email}
                </a>
              </li>
              <li>
                <a
                  href={BRAND.orderPath}
                  className="text-ivory/70 transition-colors hover:text-gold"
                >
                  Start an order
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="eyebrow">Follow</div>
            <div className="mt-4 flex gap-3">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="group grid h-10 w-10 place-items-center rounded-full border border-ivory/10 text-ivory/70 transition-all duration-500 hover:border-gold hover:text-gold hover:scale-110"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
            <p className="mt-4 font-sans text-xs text-ivory/40">{BRAND.handle}</p>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-ivory/10 pt-8 font-sans text-xs text-ivory/40 md:flex-row">
          <div>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</div>
          <div className="flex items-center gap-2">
            <span>Crafted with</span>
            <span className="text-gold">✦</span>
            <span>and a lot of pencil dust.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
