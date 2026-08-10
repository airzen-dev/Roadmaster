import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { breakdownLines } from '@/data/branches';
import { primaryBreakdownPhone } from '@/data/site';
import { ArrowRight, Phone, Siren, Whatsapp } from './Icons';
import { Button } from './ui';

/* ------------------------------------------------------------- Inner page hero */

export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  imageAlt,
  crumbs,
  compact,
}: {
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  image: string;
  imageAlt: string;
  crumbs?: { label: string; href?: string }[];
  compact?: boolean;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-ink">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 -z-20 object-cover opacity-45"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/80 via-ink/75 to-ink"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_20%_-10%,rgba(253,230,64,0.13),transparent_55%)]"
      />

      <div
        className={`container-rm relative ${compact ? 'pt-14 pb-12 lg:pt-20 lg:pb-16' : 'pt-16 pb-16 lg:pt-24 lg:pb-24'}`}
      >
        {crumbs && (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.6875rem] font-semibold tracking-[0.14em] text-mute-dim uppercase">
              <li>
                <Link href="/" className="transition-colors hover:text-yellow">
                  Home
                </Link>
              </li>
              {crumbs.map((c) => (
                <li key={c.label} className="flex items-center gap-2">
                  <span aria-hidden className="text-white/25">
                    /
                  </span>
                  {c.href ? (
                    <Link href={c.href} className="transition-colors hover:text-yellow">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-chalk">{c.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {eyebrow && <p className="eyebrow reveal">{eyebrow}</p>}
        <h1 className="reveal reveal-1 mt-4 max-w-4xl text-[clamp(2.1rem,6.2vw,4rem)] leading-[1.02] uppercase">
          {title}
        </h1>
        {intro && (
          <div className="reveal reveal-2 prose-rm mt-6 max-w-2xl text-[1.0625rem] lg:text-lg">{intro}</div>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------- Breakdown number strip */

export function BreakdownStrip() {
  return (
    <section className="border-y border-yellow/20 bg-gradient-to-r from-yellow/[0.07] via-transparent to-yellow/[0.07]">
      <div className="container-rm py-10 lg:py-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-yellow text-ink">
              <Siren className="size-6" />
            </span>
            <div>
              <p className="eyebrow">Around the clock</p>
              <h2 className="mt-1.5 text-2xl leading-tight uppercase lg:text-3xl">
                24/7 breakdown assist
              </h2>
              <p className="mt-2 max-w-md text-sm text-mute">
                Blown a tyre at 2am? Our branch response lines are staffed every hour of every day.
              </p>
            </div>
          </div>

          <div className="grid gap-2.5 sm:grid-cols-2 lg:shrink-0">
            {breakdownLines.map((l) => (
              <a
                key={l.number}
                href={`tel:${l.tel}`}
                className="group flex items-center justify-between gap-6 rounded-xl border border-white/12 bg-ink-800/70 px-4 py-3 transition-all duration-300 hover:border-yellow hover:bg-ink-700"
              >
                <span className="font-display text-[0.6875rem] font-bold tracking-[0.14em] text-mute uppercase">
                  {l.branch}
                </span>
                <span className="flex items-center gap-2 font-display text-[0.9375rem] font-bold text-chalk transition-colors group-hover:text-yellow">
                  <Phone className="size-4" />
                  {l.number}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- Closing CTA band */

export function CtaBand({
  title = 'Need tyres, or need them fixed?',
  intro = 'Talk to the branch nearest you. We will tell you what your vehicle actually needs, and what it does not.',
  primaryLabel = 'Find your branch',
  primaryHref = '/branches/',
}: {
  title?: string;
  intro?: string;
  primaryLabel?: string;
  primaryHref?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden border-t border-white/10 bg-ink-800">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_120%,rgba(253,230,64,0.16),transparent_60%)]"
      />
      <div className="container-rm py-16 text-center lg:py-24">
        <p className="eyebrow">Get moving again</p>
        <h2 className="mx-auto mt-4 max-w-2xl text-[clamp(1.75rem,4.6vw,2.9rem)] leading-[1.06] uppercase">
          {title}
        </h2>
        <p className="prose-rm mx-auto mt-5 max-w-xl">{intro}</p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Button href={primaryHref} size="lg" icon={<ArrowRight className="size-4 order-2" />}>
            {primaryLabel}
          </Button>
          <Button
            href={`tel:${primaryBreakdownPhone.tel}`}
            variant="outline"
            size="lg"
            external
            icon={<Phone className="size-4" />}
          >
            {primaryBreakdownPhone.label}
          </Button>
          <Button
            href={`https://wa.me/${primaryBreakdownPhone.whatsapp}`}
            variant="outline"
            size="lg"
            external
            icon={<Whatsapp className="size-4" />}
          >
            WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
}
