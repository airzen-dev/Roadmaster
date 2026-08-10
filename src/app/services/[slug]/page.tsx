import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Check, iconMap, Phone, Siren } from '@/components/Icons';
import { CtaBand, PageHero } from '@/components/sections';
import { Button } from '@/components/ui';
import { primaryBreakdownPhone, site } from '@/data/site';
import { getService, services, type Block } from '@/data/services';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.name,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}/` },
    openGraph: {
      title: `${service.name} | ${site.name}`,
      description: service.summary,
      images: [{ url: service.image }],
    },
  };
}

function BlockRenderer({ block }: { block: Block }) {
  switch (block.kind) {
    case 'h':
      return (
        <h2 className="rule-yellow mt-14 text-[clamp(1.35rem,3vw,1.85rem)] leading-tight uppercase first:mt-0">
          {block.text}
        </h2>
      );
    case 'p':
      return <p className="prose-rm mt-6">{block.text}</p>;
    case 'list':
      return (
        <ul className="mt-6 space-y-3">
          {block.items.map((it) => (
            <li key={it} className="flex gap-3.5">
              <Check className="mt-1 size-4 shrink-0 text-yellow" />
              <span className="text-[0.9375rem] leading-relaxed text-mute">{it}</span>
            </li>
          ))}
        </ul>
      );
    case 'defs':
      return (
        <dl className="mt-7 grid gap-4 sm:grid-cols-2">
          {block.items.map((d) => (
            <div
              key={d.term}
              className="rounded-xl border border-white/10 bg-ink-800 p-5 transition-colors hover:border-yellow/30"
            >
              <dt className="font-display text-[0.9375rem] leading-snug font-bold text-chalk uppercase">
                {d.term}
              </dt>
              <dd className="mt-2 text-[0.875rem] leading-relaxed text-mute">{d.text}</dd>
            </div>
          ))}
        </dl>
      );
    case 'steps':
      return (
        <ol className="mt-7 space-y-1">
          {block.items.map((d, i) => (
            <li key={d.term} className="flex gap-5 border-b border-white/8 py-5 last:border-0">
              <span className="font-display text-2xl leading-none font-black text-yellow/35">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <p className="font-display text-[0.9375rem] font-bold text-chalk uppercase">{d.term}</p>
                <p className="mt-1.5 text-[0.875rem] leading-relaxed text-mute">{d.text}</p>
              </div>
            </li>
          ))}
        </ol>
      );
  }
}

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const Icon = iconMap[service.icon as keyof typeof iconMap];
  const related = services
    .filter((s) => s.slug !== service.slug && s.category === service.category)
    .slice(0, 3);
  const fallbackRelated = services.filter((s) => s.slug !== service.slug).slice(0, 3);
  const alsoSee = related.length ? related : fallbackRelated;

  return (
    <>
      <PageHero
        eyebrow={service.category}
        title={service.name}
        intro={service.intro}
        image={service.image}
        imageAlt={service.name}
        crumbs={[{ label: 'Services', href: '/services/' }, { label: service.name }]}
      />

      {/* Highlight strip */}
      <section className="border-b border-white/10 bg-ink-800">
        <div className="container-rm grid gap-px py-1 sm:grid-cols-2 lg:grid-cols-4">
          {service.highlights.map((h) => (
            <div key={h} className="flex items-center gap-3 px-1 py-5 lg:px-6">
              <Check className="size-4 shrink-0 text-yellow" />
              <span className="font-display text-[0.8125rem] leading-snug font-bold text-chalk uppercase">
                {h}
              </span>
            </div>
          ))}
        </div>
      </section>

      <div className="container-rm grid gap-14 py-16 lg:grid-cols-[1fr_19rem] lg:gap-16 lg:py-20">
        {/* Body */}
        <article>
          <div className="mb-12 flex items-center gap-4 border-b border-white/10 pb-8">
            <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-yellow text-ink">
              <Icon className="size-7" />
            </span>
            <div>
              <p className="eyebrow text-[0.65rem]">{service.category}</p>
              <p className="mt-1 text-[0.9375rem] text-mute">{service.summary}</p>
            </div>
          </div>

          {service.blocks.map((b, i) => (
            <BlockRenderer key={`${b.kind}-${i}`} block={b} />
          ))}
        </article>

        {/* Sidebar */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-2xl border border-yellow/25 bg-yellow/[0.06] p-6">
            <p className="eyebrow">Book this service</p>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-chalk">
              Every branch quotes on the actual job. Call us, or send the details and we will come back to
              you.
            </p>
            <div className="mt-6 space-y-2.5">
              <Button href="/contact/" className="w-full" icon={<ArrowRight className="order-2 size-4" />}>
                Request a quote
              </Button>
              <Button
                href={`tel:${primaryBreakdownPhone.tel}`}
                variant="outline"
                external
                className="w-full"
                icon={<Phone className="size-4" />}
              >
                {primaryBreakdownPhone.label}
              </Button>
            </div>
          </div>

          {service.slug !== 'breakdown-services' && (
            <Link
              href="/breakdown-assist/"
              className="group mt-4 flex items-start gap-3.5 rounded-2xl border border-white/12 bg-ink-800 p-5 transition-colors hover:border-yellow/40"
            >
              <Siren className="mt-0.5 size-5 shrink-0 text-yellow" />
              <div>
                <p className="font-display text-[0.8125rem] font-bold text-chalk uppercase">
                  Stuck on the road?
                </p>
                <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-mute">
                  24/7 breakdown assist, nationwide.
                </p>
                <span className="mt-2.5 inline-flex items-center gap-1.5 font-display text-[0.7rem] font-bold tracking-[0.14em] text-yellow uppercase">
                  See the numbers
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          )}

          <div className="mt-4 rounded-2xl border border-white/10 bg-ink-800 p-6">
            <p className="eyebrow">Also in {service.category}</p>
            <ul className="mt-4 space-y-1">
              {alsoSee.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}/`}
                    className="group flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 -mx-3 text-[0.9375rem] text-mute transition-colors hover:bg-white/5 hover:text-chalk"
                  >
                    {s.name}
                    <ArrowRight className="size-4 shrink-0 text-yellow opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/services/"
              className="mt-4 inline-flex items-center gap-2 font-display text-[0.7rem] font-bold tracking-[0.16em] text-yellow uppercase"
            >
              All services
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </aside>
      </div>

      {/* Related cards */}
      <section className="border-t border-white/10 bg-ink-800 py-16 lg:py-20">
        <div className="container-rm">
          <h2 className="rule-yellow text-[clamp(1.35rem,3vw,1.85rem)] uppercase">Related services</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {alsoSee.map((s) => {
              const RIcon = iconMap[s.icon as keyof typeof iconMap];
              return (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}/`}
                  className="group rounded-2xl border border-white/10 bg-ink p-6 transition-all duration-400 hover:-translate-y-1 hover:border-yellow/40"
                >
                  <span className="grid size-11 place-items-center rounded-xl border border-yellow/30 bg-yellow/10 text-yellow">
                    <RIcon className="size-5" />
                  </span>
                  <h3 className="mt-5 text-base leading-tight uppercase">{s.name}</h3>
                  <p className="mt-2.5 text-[0.875rem] leading-relaxed text-mute">{s.summary}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
