import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock, Phone, Pin, Siren, Whatsapp } from '@/components/Icons';
import { BreakdownStrip, CtaBand, PageHero } from '@/components/sections';
import { branches } from '@/data/branches';

export const metadata: Metadata = {
  title: 'Our Branches',
  description:
    'Roadmaster Tyre Services branches in Jet Park (Boksburg), Richards Bay, KwaDukuza, Pinetown, Port Shepstone and our Westmead manufacturing plant, with addresses, phone numbers, trading hours and 24/7 breakdown lines.',
};

export default function BranchesPage() {
  return (
    <>
      <PageHero
        eyebrow="Find us"
        title="Six locations across Gauteng & KZN"
        intro="Every branch runs to the same standard, with the same commitment to uptime. Pick the one nearest you for addresses, hours and direct numbers."
        image="/images/branches/richards-bay.jpg"
        imageAlt="Roadmaster Richards Bay branch with its service fleet"
        crumbs={[{ label: 'Branches' }]}
      />

      <section className="py-16 lg:py-20">
        <div className="container-rm space-y-6">
          {branches.map((b, i) => (
            <article
              key={b.slug}
              className="group grid overflow-hidden rounded-2xl border border-white/10 bg-ink-800 transition-colors duration-500 hover:border-yellow/35 lg:grid-cols-[22rem_1fr]"
            >
              <Link
                href={`/branches/${b.slug}/`}
                className="relative aspect-16/10 overflow-hidden lg:aspect-auto"
                aria-label={`${b.name} details`}
              >
                <Image
                  src={b.image}
                  alt={`${b.name} premises`}
                  fill
                  sizes="(min-width:1024px) 22rem, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-ink-800/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-ink-800/70"
                />
                <span className="absolute top-4 left-4 rounded-full bg-ink/80 px-3 py-1 font-display text-[0.625rem] font-bold tracking-[0.16em] text-yellow uppercase backdrop-blur">
                  {String(i + 1).padStart(2, '0')} · {b.region}
                </span>
              </Link>

              <div className="grid gap-6 p-6 lg:grid-cols-[1fr_auto] lg:items-start lg:p-8">
                <div>
                  <h2 className="text-[1.375rem] leading-tight uppercase lg:text-2xl">
                    <Link href={`/branches/${b.slug}/`} className="transition-colors hover:text-yellow">
                      {b.name}
                    </Link>
                  </h2>
                  <p className="mt-4 max-w-2xl text-[0.9375rem] leading-relaxed text-mute">{b.blurb}</p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {b.specialities.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-white/12 px-3 py-1 text-[0.6875rem] font-semibold tracking-wider text-mute uppercase"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="w-full space-y-4 border-t border-white/10 pt-5 lg:w-64 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
                  <p className="flex items-start gap-2.5 text-[0.875rem] leading-snug text-mute">
                    <Pin className="mt-0.5 size-4 shrink-0 text-mute-dim" />
                    {b.address}
                  </p>
                  <p className="flex items-center gap-2.5 text-[0.875rem] text-mute">
                    <Clock className="size-4 shrink-0 text-mute-dim" />
                    {b.hoursSummary}
                  </p>
                  <a
                    href={`tel:${b.phoneTel}`}
                    className="flex items-center gap-2.5 font-display text-base font-bold text-chalk transition-colors hover:text-yellow"
                  >
                    <Phone className="size-4 shrink-0 text-yellow" />
                    {b.phone}
                  </a>
                  {b.breakdown && (
                    <a
                      href={`tel:${b.breakdownTel}`}
                      className="flex items-center gap-2.5 rounded-lg bg-yellow/10 px-3 py-2 font-display text-[0.8125rem] font-bold text-yellow transition-colors hover:bg-yellow/20"
                    >
                      <Siren className="size-4 shrink-0" />
                      24/7 · {b.breakdown}
                    </a>
                  )}
                  <div className="flex gap-2 pt-1">
                    {b.whatsapp && (
                      <a
                        href={`https://wa.me/${b.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`WhatsApp ${b.name}`}
                        className="grid size-9 place-items-center rounded-lg border border-white/15 text-mute transition-colors hover:border-yellow hover:text-yellow"
                      >
                        <Whatsapp className="size-4" />
                      </a>
                    )}
                    <Link
                      href={`/branches/${b.slug}/`}
                      className="inline-flex h-9 items-center gap-2 rounded-lg border border-white/15 px-3.5 font-display text-[0.6875rem] font-bold tracking-[0.14em] text-chalk uppercase transition-colors hover:border-yellow hover:text-yellow"
                    >
                      Details
                      <ArrowRight className="size-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <BreakdownStrip />
      <CtaBand
        title="Not near a branch?"
        intro="Our breakdown units cover the country. Call the closest line and we will get a technician moving."
        primaryLabel="24/7 breakdown assist"
        primaryHref="/breakdown-assist/"
      />
    </>
  );
}
