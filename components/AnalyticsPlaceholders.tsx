'use client';

import Script from 'next/script';
import { useEffect } from 'react';

const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID;
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const TIKTOK_PIXEL_ID = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID;

export default function AnalyticsPlaceholders() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const tracked = target?.closest<HTMLElement>('[data-track]');
      if (!tracked) return;

      const eventName = tracked.dataset.track || 'site_click';
      const payload = {
        event: eventName,
        link_url: tracked.getAttribute('href') || '',
        link_text: tracked.textContent?.trim() || '',
      };

      const win = window as any;
      win.dataLayer = win.dataLayer || [];
      win.dataLayer.push(payload);

      if (typeof win.fbq === 'function') {
        win.fbq('trackCustom', eventName, payload);
      }

      if (win.ttq && typeof win.ttq.track === 'function') {
        win.ttq.track(eventName, payload);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <>
      {GA4_ID ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-placeholder" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA4_ID}');
            `}
          </Script>
        </>
      ) : null}

      {META_PIXEL_ID ? (
        <Script id="meta-pixel-placeholder" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
      ) : null}

      {TIKTOK_PIXEL_ID ? (
        <Script id="tiktok-pixel-placeholder" strategy="afterInteractive">
          {`
            window.ttq = window.ttq || { track: function(){}, page: function(){} };
            window.ttq.page && window.ttq.page();
          `}
        </Script>
      ) : null}
    </>
  );
}
