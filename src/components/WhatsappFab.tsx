import { primaryBreakdownPhone, site } from '@/data/site';
import { Whatsapp } from './Icons';

const prefill = encodeURIComponent(
  `Hi ${site.shortName}, I'd like to enquire about your tyre services.`,
);

/**
 * Persistent WhatsApp call-to-action. Kept in WhatsApp green rather than the
 * site yellow: the whole point of a floating chat bubble is that it is
 * recognised before it is read.
 *
 * On phones it sits above <MobileBar />, which is fixed to the bottom edge;
 * z-30 matches that bar, so the nav drawer (z-50) and gallery lightbox (z-60)
 * still cover it.
 */
export default function WhatsappFab() {
  return (
    <a
      href={`https://wa.me/${primaryBreakdownPhone.whatsapp}?text=${prefill}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat to ${site.shortName} on WhatsApp`}
      className="fixed right-4 bottom-[calc(4.25rem+env(safe-area-inset-bottom))] z-30 grid size-14 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_8px_24px_-4px_rgba(0,0,0,0.55)] ring-1 ring-black/10 transition-transform duration-200 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow active:scale-95 lg:right-6 lg:bottom-6"
    >
      <Whatsapp className="size-7" />
    </a>
  );
}
