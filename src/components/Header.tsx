'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { branches } from '@/data/branches';
import { services, servicesByCategory } from '@/data/services';
import { primaryBreakdownPhone } from '@/data/site';
import { ChevronDown, Close, Menu, Phone, Siren } from './Icons';

type NavItem = { label: string; href: string; panel?: 'services' | 'branches' };

const items: NavItem[] = [
  { label: 'About', href: '/about/' },
  { label: 'Services', href: '/services/', panel: 'services' },
  { label: 'Products', href: '/products/' },
  { label: 'Branches', href: '/branches/', panel: 'branches' },
  { label: 'Gallery', href: '/gallery/' },
  { label: 'Contact', href: '/contact/' },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [panel, setPanel] = useState<'services' | 'branches' | null>(null);
  const [mobilePanel, setMobilePanel] = useState<'services' | 'branches' | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Route change closes everything.
  useEffect(() => {
    setOpen(false);
    setPanel(null);
    setMobilePanel(null);
  }, [pathname]);

  // Lock body scroll behind the mobile drawer.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        setPanel(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href.replace(/\/$/, ''));

  const openPanel = (p: 'services' | 'branches') => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setPanel(p);
  };
  const schedulePanelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setPanel(null), 140);
  };

  return (
    <>
      {/* Utility strip: the 24/7 promise, always the first thing you read. */}
      <div className="relative z-50 hidden bg-yellow text-ink lg:block">
        <div className="container-rm flex h-9 items-center justify-between text-[0.6875rem] font-semibold tracking-[0.14em] uppercase">
          <p className="flex items-center gap-2 font-display font-bold">
            <Siren className="size-3.5" />
            {'24/7 Breakdown Assist, Nationwide'}
          </p>
          <div className="flex items-center gap-5 font-display">
            <span className="hidden xl:inline opacity-70">Est. 1941 · Multi-branded tyre specialists</span>
            <a
              href={`tel:${primaryBreakdownPhone.tel}`}
              className="flex items-center gap-1.5 font-bold underline decoration-ink/30 decoration-2 underline-offset-4 transition-colors hover:decoration-ink"
            >
              <Phone className="size-3.5" />
              {primaryBreakdownPhone.label}
            </a>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'border-b border-white/10 bg-ink/85 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl'
            : 'border-b border-transparent bg-gradient-to-b from-ink/85 to-transparent'
        }`}
      >
        <div className="container-rm flex h-16 items-center justify-between gap-3 lg:h-[4.75rem] lg:gap-6">
          <Link href="/" aria-label="Roadmaster Tyre Services, home" className="min-w-0 shrink">
            <Image
              src="/images/brand/logo-full.png"
              alt="Roadmaster Tyre Services, established 1941"
              width={976}
              height={160}
              priority
              /* The wordmark is wide (6:1); cap it by viewport so 320px screens do not overflow. */
              className="h-7 w-auto max-w-[52vw] object-contain sm:h-9 sm:max-w-none lg:h-10"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {items.map((item) => {
              const active = isActive(item.href);
              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => (item.panel ? openPanel(item.panel) : setPanel(null))}
                  onMouseLeave={() => item.panel && schedulePanelClose()}
                >
                  <Link
                    href={item.href}
                    aria-expanded={item.panel ? panel === item.panel : undefined}
                    className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 font-display text-[0.75rem] font-bold tracking-[0.13em] uppercase transition-colors ${
                      active ? 'text-yellow' : 'text-chalk/75 hover:text-chalk'
                    }`}
                  >
                    {item.label}
                    {item.panel && (
                      <ChevronDown
                        className={`size-3.5 transition-transform duration-300 ${
                          panel === item.panel ? 'rotate-180' : ''
                        }`}
                      />
                    )}
                  </Link>
                  {active && (
                    <span className="absolute inset-x-3.5 -bottom-0.5 h-[2px] bg-yellow" aria-hidden />
                  )}
                </div>
              );
            })}
          </nav>

          <div className="hidden shrink-0 items-center gap-3 lg:flex">
            <a
              href="/breakdown-assist/"
              className="group inline-flex h-11 items-center gap-2.5 rounded-full bg-yellow px-5 font-display text-[0.75rem] font-bold tracking-[0.13em] text-ink uppercase transition-all duration-300 hover:bg-yellow-300 active:scale-[0.98]"
            >
              <Siren className="size-4" />
              Breakdown
            </a>
          </div>

          {/* Mobile triggers */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={`tel:${primaryBreakdownPhone.tel}`}
              aria-label={`Call breakdown assist on ${primaryBreakdownPhone.label}`}
              className="grid size-10 place-items-center rounded-full bg-yellow text-ink"
            >
              <Phone className="size-4.5" />
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="grid size-10 place-items-center rounded-full border border-white/20 text-chalk"
            >
              {open ? <Close className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {/* Desktop mega panels */}
        {panel && (
          <div
            onMouseEnter={() => openPanel(panel)}
            onMouseLeave={schedulePanelClose}
            className="absolute inset-x-0 top-full hidden border-b border-white/10 bg-ink-800/97 backdrop-blur-xl lg:block"
          >
            <div className="container-rm py-8">
              {panel === 'services' ? (
                <div className="grid grid-cols-4 gap-x-8 gap-y-7">
                  {servicesByCategory.map((cat) => (
                    <div key={cat.name}>
                      <p className="eyebrow text-[0.65rem]">{cat.name}</p>
                      <ul className="mt-3.5 space-y-1">
                        {cat.services.map((s) => (
                          <li key={s.slug}>
                            <Link
                              href={`/services/${s.slug}/`}
                              className="block rounded-lg px-2.5 py-1.5 -mx-2.5 text-sm text-chalk/80 transition-colors hover:bg-white/5 hover:text-yellow"
                            >
                              {s.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-x-8 gap-y-4">
                  {branches.map((b) => (
                    <Link
                      key={b.slug}
                      href={`/branches/${b.slug}/`}
                      className="group rounded-xl border border-white/8 p-4 transition-colors hover:border-yellow/40 hover:bg-white/[0.03]"
                    >
                      <p className="font-display text-sm font-bold text-chalk uppercase group-hover:text-yellow">
                        {b.city}
                      </p>
                      <p className="mt-1 text-xs text-mute-dim">{b.region}</p>
                      <p className="mt-2.5 font-display text-[0.8125rem] font-bold text-yellow">{b.phone}</p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${open ? '' : 'pointer-events-none'}`}
        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-ink/80 backdrop-blur-sm transition-opacity duration-300 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div
          className={`absolute inset-y-0 right-0 flex w-full max-w-sm flex-col border-l border-white/10 bg-ink-800 transition-transform duration-400 ease-out ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 px-5">
            <span className="eyebrow">Menu</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="grid size-10 place-items-center rounded-full border border-white/20"
            >
              <Close className="size-5" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto overscroll-contain px-5 py-6" aria-label="Mobile">
            <ul className="space-y-1">
              <li>
                <Link
                  href="/"
                  className="block py-3 font-display text-lg font-bold uppercase tracking-wide text-chalk"
                >
                  Home
                </Link>
              </li>
              {items.map((item) => (
                <li key={item.href} className="border-t border-white/8">
                  {item.panel ? (
                    <>
                      <div className="flex items-center justify-between">
                        <Link
                          href={item.href}
                          className={`flex-1 py-3 font-display text-lg font-bold tracking-wide uppercase ${
                            isActive(item.href) ? 'text-yellow' : 'text-chalk'
                          }`}
                        >
                          {item.label}
                        </Link>
                        <button
                          type="button"
                          onClick={() => setMobilePanel((v) => (v === item.panel ? null : item.panel!))}
                          aria-label={`Show ${item.label} list`}
                          aria-expanded={mobilePanel === item.panel}
                          className="grid size-9 shrink-0 place-items-center rounded-full border border-white/15 text-mute"
                        >
                          <ChevronDown
                            className={`size-4 transition-transform duration-300 ${
                              mobilePanel === item.panel ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                      </div>
                      <div
                        className={`grid transition-all duration-300 ${
                          mobilePanel === item.panel
                            ? 'grid-rows-[1fr] opacity-100'
                            : 'grid-rows-[0fr] opacity-0'
                        }`}
                      >
                        <ul className="overflow-hidden">
                          {(item.panel === 'services'
                            ? services.map((s) => ({ href: `/services/${s.slug}/`, label: s.name }))
                            : branches.map((b) => ({ href: `/branches/${b.slug}/`, label: b.city }))
                          ).map((sub) => (
                            <li key={sub.href}>
                              <Link
                                href={sub.href}
                                className="block border-l border-white/10 py-2 pl-4 text-[0.9375rem] text-mute"
                              >
                                {sub.label}
                              </Link>
                            </li>
                          ))}
                          <li className="pb-3" />
                        </ul>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={`block py-3 font-display text-lg font-bold tracking-wide uppercase ${
                        isActive(item.href) ? 'text-yellow' : 'text-chalk'
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
              <li className="border-t border-white/8">
                <Link
                  href="/health-and-safety/"
                  className="block py-3 font-display text-lg font-bold uppercase tracking-wide text-chalk"
                >
                  Health &amp; Safety
                </Link>
              </li>
            </ul>
          </nav>

          <div className="shrink-0 border-t border-white/10 p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
            <a
              href="/breakdown-assist/"
              className="flex h-13 items-center justify-center gap-2.5 rounded-full bg-yellow font-display text-sm font-bold tracking-[0.13em] text-ink uppercase"
            >
              <Siren className="size-4.5" />
              24/7 Breakdown Assist
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
