import { primaryBreakdownPhone } from '@/data/site';
import { Phone, Pin, Whatsapp } from './Icons';

/**
 * Thumb-reach action bar for phones. A tyre emergency is a phone call, not a
 * form, so Call, WhatsApp and Find-us stay one tap away on every page.
 */
export default function MobileBar() {
  const actions = [
    {
      href: `tel:${primaryBreakdownPhone.tel}`,
      label: 'Call 24/7',
      icon: <Phone className="size-5" />,
      accent: true,
    },
    {
      href: `https://wa.me/${primaryBreakdownPhone.whatsapp}`,
      label: 'WhatsApp',
      icon: <Whatsapp className="size-5" />,
      external: true,
    },
    {
      href: '/branches/',
      label: 'Branches',
      icon: <Pin className="size-5" />,
    },
  ];

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-ink/95 backdrop-blur-xl lg:hidden">
      <div className="grid grid-cols-3 pb-[env(safe-area-inset-bottom)]">
        {actions.map((a) => (
          <a
            key={a.label}
            href={a.href}
            {...(a.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className={`flex flex-col items-center justify-center gap-1 py-2.5 font-display text-[0.625rem] font-bold tracking-[0.12em] uppercase transition-colors active:bg-white/5 ${
              a.accent ? 'text-yellow' : 'text-chalk/80'
            }`}
          >
            {a.icon}
            {a.label}
          </a>
        ))}
      </div>
    </div>
  );
}
