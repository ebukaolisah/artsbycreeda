import { Mail, MessageCircle } from 'lucide-react';
import { BRAND } from '@/lib/constants';

export default function StickyMobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ivory/10 bg-charcoal/92 px-3 py-3 backdrop-blur-xl md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-2 gap-2">
        <a
          href={BRAND.whatsappUrl}
          data-track="whatsapp_click"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-gold/50 bg-gold px-4 py-3 font-sans text-[11px] font-semibold uppercase tracking-widest text-charcoal"
        >
          <MessageCircle size={15} aria-hidden />
          WhatsApp
        </a>
        <a
          href={BRAND.orderPath}
          data-track="order_click"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-ivory/15 bg-ivory/[0.04] px-4 py-3 font-sans text-[11px] font-semibold uppercase tracking-widest text-ivory"
        >
          <Mail size={15} aria-hidden />
          Order
        </a>
      </div>
    </div>
  );
}
