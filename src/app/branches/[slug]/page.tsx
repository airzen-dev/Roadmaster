import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Clock, Phone, Pin, Siren, Whatsapp } from '@/components/Icons';
import { CtaBand, PageHero } from '@/components/sections';
import { Button, TickList } from '@/components/ui';
import { branches, getBranch } from '@/data/branches';
import { site } from '@/data/site';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return branches.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const b = getBranch(slug);
  if (!b) return {};
  return {
    title: `${b.city} Branch`,
    description: `${b.name}, ${b.address}. Phone ${b.phone}${
      b.breakdown ? `, 24/7 breakdown ${b.breakdown}` : ''
    }. ${b.blurb}`,
    alternates: { canonical: `/branches/${b.slug}/` },
    openGraph: { title: `${b.name} | ${site.name}`, description: b.blurb, images: [{ url: b.image }] },
  };
}

export default async function BranchPage({ params }: Params) {
  const { slug } = await params;
  const branch = getBranch(slug);
  if (!branch) notFound();

  const others = branches.filter((b) => b.slug !== branch.slug);
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(branch.mapQuery)}&output=embed`;
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    branch.mapQuery,
  )}`;

  return (
    <>
      <PageHero
        eyebrow={branch.region}
        title={branch.name}
        intro={branch.blurb}
        image={branch.image}
        imageAlt={`${branch.name} premises`}
        crumbs={[{ label: 'Branches', href: '/branches/' }, { label: branch.city }]}
        compact
      />

      {/* Contact rail */}
      <section className="border-b border-white/10 bg-ink-800">
        <div className="container-rm grid divide-white/10 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x">
          <div className="border-b border-white/10 py-6 sm:border-b-0 lg:py-7 lg:pr-8">
            <p className="text-[0.625rem] font-semibold tracking-[0.16em] text-mute-dim uppercase">
              Address
            </p>
            <p className="mt-2 flex items-start gap-2 text-[0.875rem] leading-snug text-chalk">
              <Pin className="mt-0.5 size-4 shrink-0 text-yellow" />
              {branch.address}
            </p>
          </div>
          <div className="border-b border-white/10 py-6 sm:border-b-0 lg:px-8 lg:py-7">
            <p className="text-[0.625rem] font-semibold tracking-[0.16em] text-mute-dim uppercase">
              Telephone
            </p>
            <a
              href={`tel:${branch.phoneTel}`}
              className="mt-2 flex items-center gap-2 font-display text-base font-bold text-chalk transition-colors hover:text-yellow"
            >
              <Phone className="size-4 shrink-0 text-yellow" />
              {branch.phone}
            </a>
          </div>
          <div className="border-b border-white/10 py-6 sm:border-b-0 lg:px-8 lg:py-7">
            <p className="text-[0.625rem] font-semibold tracking-[0.16em] text-mute-dim uppercase">
              {branch.breakdown ? '24/7 breakdown' : 'Trading hours'}
            </p>
            {branch.breakdown ? (
              <>
                <a
                  href={`tel:${branch.breakdownTel}`}
                  className="mt-2 flex items-center gap-2 font-display text-base font-bold text-yellow"
                >
                  <Siren className="size-4 shrink-0" />
                  {branch.breakdown}
                </a>
                {branch.breakdownAlt && (
                  <a
                    href={`tel:${branch.breakdownAltTel}`}
                    className="mt-1 block pl-6 font-display text-[0.8125rem] font-bold text-mute transition-colors hover:text-yellow"
                  >
                    or {branch.breakdownAlt}
                  </a>
                )}
              </>
            ) : (
              <p className="mt-2 flex items-center gap-2 text-[0.9375rem] text-chalk">
                <Clock className="size-4 shrink-0 text-yellow" />
                {branch.hoursSummary}
              </p>
            )}
          </div>
          <div className="py-6 lg:py-7 lg:pl-8">
            <p className="text-[0.625rem] font-semibold tracking-[0.16em] text-mute-dim uppercase">
              Get there
            </p>
            <a
              href={directions}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2 font-display text-[0.8125rem] font-bold tracking-[0.12em] text-chalk uppercase transition-colors hover:text-yellow"
            >
              Directions
              <ArrowRight className="size-4 text-yellow" />
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="container-rm grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-14">
          {/* Map */}
          <div>
            <h2 className="rule-yellow text-[clamp(1.35rem,3vw,1.85rem)] uppercase">Where to find us</h2>
            <div className="mt-8 overflow-hidden rounded-2xl border border-white/12 bg-ink-800">
              <iframe
                src={mapSrc}
                title={`Map showing ${branch.name}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[22rem] w-full border-0 lg:h-[28rem]"
                style={{ filter: 'grayscale(0.35) contrast(1.05)' }}
              />
            </div>

            <div className="mt-10">
              <h3 className="font-display text-[0.8125rem] font-bold tracking-[0.16em] text-yellow uppercase">
                What this branch specialises in
              </h3>
              <TickList className="mt-5" items={branch.specialities} />
            </div>

            {(branch.facebook || branch.instagram) && (
              <div className="mt-10 border-t border-white/10 pt-7">
                <h3 className="font-display text-[0.8125rem] font-bold tracking-[0.16em] text-yellow uppercase">
                  Connect with {branch.short}
                </h3>
                <div className="mt-4 flex gap-3">
                  {branch.facebook && (
                    <a
                      href={branch.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg border border-white/15 px-4 py-2 font-display text-[0.6875rem] font-bold tracking-[0.14em] text-chalk uppercase transition-colors hover:border-yellow hover:text-yellow"
                    >
                      Facebook
                    </a>
                  )}
                  {branch.instagram && (
                    <a
                      href={branch.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg border border-white/15 px-4 py-2 font-display text-[0.6875rem] font-bold tracking-[0.14em] text-chalk uppercase transition-colors hover:border-yellow hover:text-yellow"
                    >
                      Instagram
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-white/10 bg-ink-800 p-6">
              <p className="eyebrow">Trading hours</p>
              <dl className="mt-4 space-y-3">
                {branch.hours.map((h) => (
                  <div
                    key={h.days}
                    className="flex items-baseline justify-between gap-4 border-b border-white/8 pb-3 last:border-0 last:pb-0"
                  >
                    <dt className="text-[0.8125rem] text-mute">{h.days}</dt>
                    <dd
                      className={`shrink-0 font-display text-[0.8125rem] font-bold ${
                        h.time.startsWith('24') ? 'text-yellow' : 'text-chalk'
                      }`}
                    >
                      {h.time}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="rounded-2xl border border-yellow/25 bg-yellow/[0.06] p-6">
              <p className="eyebrow">Get in touch</p>
              <div className="mt-5 space-y-2.5">
                <Button
                  href={`tel:${branch.phoneTel}`}
                  external
                  className="w-full"
                  icon={<Phone className="size-4" />}
                >
                  Call branch
                </Button>
                {branch.whatsapp && (
                  <Button
                    href={`https://wa.me/${branch.whatsapp}`}
                    external
                    variant="outline"
                    className="w-full"
                    icon={<Whatsapp className="size-4" />}
                  >
                    WhatsApp
                  </Button>
                )}
                <Button href="/contact/" variant="outline" className="w-full">
                  Send an enquiry
                </Button>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-ink-800 p-6">
              <p className="eyebrow">Other branches</p>
              <ul className="mt-4 space-y-1">
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link
                      href={`/branches/${o.slug}/`}
                      className="group flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 -mx-3 transition-colors hover:bg-white/5"
                    >
                      <span>
                        <span className="block text-[0.9375rem] text-chalk">{o.short}</span>
                        <span className="block text-[0.75rem] text-mute-dim">{o.phone}</span>
                      </span>
                      <ArrowRight className="size-4 shrink-0 text-yellow opacity-0 transition-opacity group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <CtaBand
        title={`Need us at ${branch.short}?`}
        intro="Book a fitment, request a quote, or get a technician out to you."
        primaryLabel="Contact us"
        primaryHref="/contact/"
      />
    </>
  );
}
