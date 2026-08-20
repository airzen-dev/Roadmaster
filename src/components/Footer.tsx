import Image from 'next/image';
import Link from 'next/link';
import { branches } from '@/data/branches';
import { services } from '@/data/services';
import { site, socials } from '@/data/site';
import { Phone, Pin } from './Icons';
import { CheckerBand } from './ui';

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink-800">
      <CheckerBand className="text-ink-600" />

      <div className="container-rm py-14 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr_1fr_1.1fr] lg:gap-10">
          {/* Brand */}
          <div>
            <Image
              src="/images/brand/logo-full.png"
              alt="Roadmaster Tyre Services"
              width={976}
              height={160}
              className="h-10 w-auto"
            />
            <p className="prose-rm mt-6 max-w-sm text-[0.9375rem]">
              An independent, multi-branded tyre and value-added service provider specialising in the
              transport, industrial and earthmover sectors, on South African roads since {site.established}.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {socials.map((s) => (
                <div key={s.branch} className="flex items-center gap-1.5">
                  <span className="text-[0.6875rem] font-semibold tracking-wider text-mute-dim uppercase">
                    {s.branch}
                  </span>
                  <a
                    href={s.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid size-9 place-items-center rounded-md border border-white/12 text-[0.625rem] font-bold tracking-wider text-mute uppercase transition-colors hover:border-yellow hover:text-yellow"
                  >
                    FB
                  </a>
                  <a
                    href={s.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid size-9 place-items-center rounded-md border border-white/12 text-[0.625rem] font-bold tracking-wider text-mute uppercase transition-colors hover:border-yellow hover:text-yellow"
                  >
                    IG
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display text-[0.8125rem] font-bold tracking-[0.16em] text-yellow uppercase">
              Services
            </h3>
            <ul className="mt-5 space-y-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}/`}
                    className="text-sm text-mute transition-colors hover:text-chalk"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-display text-[0.8125rem] font-bold tracking-[0.16em] text-yellow uppercase">
              Company
            </h3>
            <ul className="mt-5 space-y-2.5">
              {[
                { label: 'About us', href: '/about/' },
                { label: 'Products', href: '/products/' },
                { label: 'Our branches', href: '/branches/' },
                { label: 'Photo gallery', href: '/gallery/' },
                { label: 'Health & safety', href: '/health-and-safety/' },
                { label: '24/7 breakdown assist', href: '/breakdown-assist/' },
                { label: 'Contact us', href: '/contact/' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-mute transition-colors hover:text-chalk">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Branches */}
          <div>
            <h3 className="font-display text-[0.8125rem] font-bold tracking-[0.16em] text-yellow uppercase">
              Branches
            </h3>
            <ul className="mt-5 space-y-4">
              {branches.map((b) => (
                <li key={b.slug} className="text-sm">
                  <Link
                    href={`/branches/${b.slug}/`}
                    className="font-display font-bold text-chalk uppercase transition-colors hover:text-yellow"
                  >
                    {b.city}
                  </Link>
                  <p className="mt-1 flex items-start gap-1.5 text-[0.8125rem] leading-snug text-mute-dim">
                    <Pin className="mt-0.5 size-3.5 shrink-0" />
                    {b.address}
                  </p>
                  <a
                    href={`tel:${b.phoneTel}`}
                    className="mt-1 inline-flex items-center gap-1.5 text-[0.8125rem] text-mute transition-colors hover:text-yellow"
                  >
                    <Phone className="size-3.5 shrink-0" />
                    {b.phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/8">
        <div className="container-rm flex flex-col gap-3 py-6 text-[0.75rem] text-mute-dim sm:flex-row sm:items-center sm:justify-between">
          <p>
            {/* The year is the staff entrance: unremarkable to a visitor, and a
                direct link for anyone who has been told where to click. */}
            ©{' '}
            <Link
              href="/studio/"
              aria-label="Staff sign in"
              className="transition-colors hover:text-yellow"
            >
              {year}
            </Link>{' '}
            {site.name}. All rights reserved.
          </p>
          <p className="font-display tracking-[0.14em] uppercase">
            Est. {site.established} · Proudly South African
          </p>
        </div>
      </div>
    </footer>
  );
}
