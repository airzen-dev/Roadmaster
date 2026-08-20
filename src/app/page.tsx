import Image from 'next/image';
import Link from 'next/link';
import GalleryStrip from '@/components/GalleryStrip';
import { BreakdownStrip, CtaBand } from '@/components/sections';
import { iconMap } from '@/components/Icons';
import { ArrowRight, Check, Clock, Phone, Pin, Siren } from '@/components/Icons';
import { Button, CardLink, CheckerBand, MoreLink, SectionHead, TickList } from '@/components/ui';
import { BrandChip } from '@/components/BrandChip';
import { branches } from '@/data/branches';
import { gallery } from '@/data/gallery';
import { allBrands } from '@/data/products';
import { services } from '@/data/services';
import { site, stats } from '@/data/site';

const featured = [
  'breakdown-services',
  'truck-tyres',
  'mining-tyres',
  'retreading',
  'alignment',
  'foam-filling',
];

export default function HomePage() {
  const featuredServices = featured.map((slug) => services.find((s) => s.slug === slug)!);

  return (
    <>
      {/* ============================================================== HERO */}
      <section className="relative isolate flex min-h-[calc(100svh-4rem)] items-end overflow-hidden lg:min-h-[46rem]">
        <Image
          src="/images/gallery/fleet-lineup.jpg"
          alt="The Roadmaster Tyre Services fleet lined up outside a branch at dusk"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover object-center"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/80 to-ink/45"
        />
        {/* Left scrim: keeps the copy legible over the bright vans in the photo. */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,var(--color-ink)_0%,color-mix(in_srgb,var(--color-ink)_78%,transparent)_34%,color-mix(in_srgb,var(--color-ink)_28%,transparent)_62%,transparent_88%)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_15%_10%,rgba(253,230,64,0.14),transparent_50%)]"
        />

        <div className="container-rm relative w-full pt-24 pb-14 lg:pt-32 lg:pb-20">
          <p className="reveal eyebrow flex items-start gap-3">
            <span className="mt-[0.42rem] inline-block size-1.5 shrink-0 animate-pulse rounded-full bg-yellow" />
            Est. {site.established} · Multi-branded specialists
          </p>

          <h1 className="reveal reveal-1 mt-5 max-w-[54rem] text-[clamp(2.15rem,8vw,5.6rem)] leading-[0.94] uppercase">
            Tyres that carry
            {/* Phones wrap this naturally; the forced break is for wider screens only. */}
            <br className="hidden sm:block" />{' '}
            <span className="text-yellow">real weight</span>
          </h1>

          <p className="reveal reveal-2 prose-rm mt-7 max-w-xl text-[1.0625rem] lg:text-lg">
            From a family hatchback to a 100-tonne haul truck, Roadmaster fits, repairs, retreads and
            manages tyres across transport, industrial, agricultural and earthmover fleets. And when
            something lets go on the road, we answer at any hour.
          </p>

          <div className="reveal reveal-3 mt-9 flex flex-wrap items-center gap-3">
            <Button href="/services/" size="lg" icon={<ArrowRight className="order-2 size-4" />}>
              Explore our services
            </Button>
            <Button
              href="/breakdown-assist/"
              variant="outline"
              size="lg"
              icon={<Siren className="size-4" />}
            >
              24/7 Breakdown
            </Button>
          </div>

          {/* Quick branch strip */}
          <div className="reveal reveal-4 mt-14 border-t border-white/12 pt-6">
            <p className="text-[0.6875rem] font-semibold tracking-[0.18em] text-mute-dim uppercase">
              Six locations · Gauteng &amp; KwaZulu-Natal
            </p>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2.5">
              {branches.map((b) => (
                <Link
                  key={b.slug}
                  href={`/branches/${b.slug}/`}
                  className="font-display text-[0.8125rem] font-bold tracking-[0.1em] text-chalk/70 uppercase transition-colors hover:text-yellow"
                >
                  {b.short}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================= STATS */}
      <section className="border-y border-white/10 bg-ink-800">
        <div className="container-rm grid grid-cols-2 divide-white/10 lg:grid-cols-4 lg:divide-x">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`px-1 py-8 lg:px-8 lg:py-11 ${i < 2 ? 'border-b border-white/10 lg:border-b-0' : ''} ${
                i % 2 === 1 ? 'border-l border-white/10 pl-5 lg:border-l-0 lg:pl-8' : ''
              } ${i === 0 ? 'lg:pl-0' : ''}`}
            >
              <p className="font-display text-[clamp(2rem,5vw,2.75rem)] leading-none font-black text-yellow">
                {s.value}
              </p>
              <p className="mt-3 font-display text-[0.75rem] font-bold tracking-[0.16em] text-chalk uppercase">
                {s.label}
              </p>
              <p className="mt-1.5 text-[0.8125rem] leading-snug text-mute-dim">{s.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================== SERVICES */}
      <section className="texture-grit py-20 lg:py-28">
        <div className="container-rm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHead
              eyebrow="What we do"
              title={
                <>
                  Specialist work,
                  <br className="hidden sm:block" /> not a quick fit
                </>
              }
              intro="A specialised need exists in the transport, industrial and earthmover tyre sectors. Every customer's tyre requirement is different, so every service package we build is tailored to the operation it has to survive."
            />
            <Button href="/services/" variant="outline" className="shrink-0">
              All 14 services
            </Button>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {featuredServices.map((s) => {
              const Icon = iconMap[s.icon as keyof typeof iconMap];
              return (
                <CardLink key={s.slug} href={`/services/${s.slug}/`}>
                  <div className="relative aspect-16/10 overflow-hidden">
                    <Image
                      src={s.image}
                      alt={s.name}
                      fill
                      sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 92vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-ink-800 via-ink-800/25 to-transparent"
                    />
                    <span className="absolute top-4 left-4 grid size-10 place-items-center rounded-xl bg-yellow text-ink">
                      <Icon className="size-5" />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-[0.6875rem] font-semibold tracking-[0.16em] text-yellow/80 uppercase">
                      {s.category}
                    </p>
                    <h3 className="mt-2 text-xl leading-tight uppercase">{s.name}</h3>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-mute">{s.summary}</p>
                    <MoreLink />
                  </div>
                </CardLink>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================= BREAKDOWN */}
      <BreakdownStrip />

      {/* ============================================================= ABOUT */}
      <section className="py-20 lg:py-28">
        <div className="container-rm grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative">
            <div className="relative aspect-4/5 overflow-hidden rounded-2xl sm:aspect-3/2 lg:aspect-4/5">
              <Image
                src="/images/gallery/otr-haul-truck.jpg"
                alt="Roadmaster technicians servicing a Volvo articulated hauler on a mine site"
                fill
                sizes="(min-width:1024px) 45vw, 92vw"
                className="object-cover"
              />
            </div>
            {/* Floating credential card */}
            <div className="absolute -right-2 -bottom-6 w-[15rem] rounded-2xl border border-white/12 bg-ink-800/95 p-5 shadow-lift backdrop-blur-md sm:right-6 lg:-right-6">
              <p className="eyebrow text-[0.65rem]">Ownership</p>
              <p className="mt-2 text-sm leading-relaxed text-chalk">
                <strong className="font-semibold">RM Tyres Co-operative Ltd</strong>, established 2016 so
                Roadmaster employees hold real ownership equity.
              </p>
              <p className="mt-3 text-[0.75rem] text-mute-dim">
                A B.E.E. structure we believe is the first of its kind in the tyre industry.
              </p>
            </div>
          </div>

          <div>
            <SectionHead
              eyebrow="Who we are"
              title="Eight decades of keeping wheels turning"
              intro="Roadmaster was re-incorporated in 2007 with a single focus: to become the leading multi-branded tyre and value-added service provider in our sector. The branch infrastructure, service-delivery strategy and tyre management programme were all designed around traditional core principles: do the work properly, and tell the customer the truth."
            />
            <TickList
              className="mt-8"
              items={[
                'An independent, multi-branded company, so we fit what suits your operation, not one supplier’s catalogue',
                'A B.E.E. company committed to shared wealth, not individual enrichment',
                'A competent and experienced team of partners across six locations',
                'Superior tyre products backed by genuine value-added services',
              ]}
            />
            <div className="mt-9">
              <Button href="/about/" variant="outline" icon={<ArrowRight className="order-2 size-4" />}>
                More about Roadmaster
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ BRANDS */}
      <section className="border-y border-white/10 bg-ink-800 py-14 lg:py-16">
        <div className="container-rm">
          <p className="text-center text-[0.6875rem] font-semibold tracking-[0.2em] text-mute-dim uppercase">
            Multi-branded · we fit the right tyre, not the only tyre
          </p>
        </div>
        <div className="relative mt-8 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
          <div className="marquee-track flex w-max gap-4">
            {[...allBrands, ...allBrands].map((b, i) => (
              <BrandChip key={`${b.name}-${i}`} brand={b} className="h-16 w-[12rem] shrink-0" />
            ))}
          </div>
        </div>
        <div className="container-rm mt-8 text-center">
          <Button href="/products/" variant="ghost" icon={<ArrowRight className="order-2 size-4" />}>
            See all products
          </Button>
        </div>
      </section>

      {/* ========================================================== BRANCHES */}
      <section className="py-20 lg:py-28">
        <div className="container-rm">
          <SectionHead
            eyebrow="Find us"
            title="Six locations, one standard"
            intro="Gauteng and KwaZulu-Natal branches, plus our own manufacturing operation for retreading, vulcanising and foam filling."
            align="center"
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {branches.map((b) => (
              <CardLink key={b.slug} href={`/branches/${b.slug}/`}>
                <div className="relative aspect-16/10 overflow-hidden">
                  <Image
                    src={b.image}
                    alt={`${b.name} premises`}
                    fill
                    sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 92vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-ink-800 via-ink-800/30 to-transparent"
                  />
                  <p className="absolute bottom-4 left-5 font-display text-[0.6875rem] font-bold tracking-[0.16em] text-yellow uppercase">
                    {b.region}
                  </p>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg leading-tight uppercase">{b.city}</h3>
                  <p className="mt-2.5 flex items-start gap-2 text-[0.8125rem] leading-snug text-mute">
                    <Pin className="mt-0.5 size-4 shrink-0 text-mute-dim" />
                    {b.address}
                  </p>
                  <p className="mt-2 flex items-center gap-2 text-[0.8125rem] text-mute">
                    <Clock className="size-4 shrink-0 text-mute-dim" />
                    {b.hoursSummary}
                  </p>
                  <p className="mt-3.5 flex items-center gap-2 font-display text-[0.9375rem] font-bold text-chalk">
                    <Phone className="size-4 text-yellow" />
                    {b.phone}
                  </p>
                  {b.breakdown && (
                    <p className="mt-1.5 text-[0.75rem] font-semibold tracking-wider text-yellow/80 uppercase">
                      24/7 · {b.breakdown}
                    </p>
                  )}
                  <MoreLink>Branch details</MoreLink>
                </div>
              </CardLink>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ WHY US */}
      <section className="relative isolate overflow-hidden border-y border-white/10 bg-ink-800 py-20 lg:py-28">
        <CheckerBand className="absolute inset-x-0 top-0 text-ink-600" />
        <div className="container-rm">
          <SectionHead
            eyebrow="Our promise"
            title="What you get, every single time"
            align="center"
          />
          <div className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            {[
              {
                title: 'Tailored, not templated',
                body: 'Every operation loads, drives and wears tyres differently. We build the service package around your actual duty cycle.',
              },
              {
                title: 'Uptime first',
                body: 'Rapid response times, even in remote areas, with fully equipped service vehicles and specialised tools.',
              },
              {
                title: 'Safety as standard',
                body: 'Responsible management of health and safety is an integral part of our business, and we comply with each customer’s HSEQ requirements.',
              },
              {
                title: 'Honest value',
                body: 'We are determined to deliver value that meets and exceeds expectations, including telling you when a casing is worth saving.',
              },
            ].map((f) => (
              <div key={f.title}>
                <span className="grid size-11 place-items-center rounded-xl border border-yellow/30 bg-yellow/10 text-yellow">
                  <Check className="size-5" />
                </span>
                <h3 className="mt-5 text-base leading-snug uppercase">{f.title}</h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-mute">{f.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button href="/health-and-safety/" variant="outline">
              Our health &amp; safety policy
            </Button>
          </div>
        </div>
      </section>

      {/* =========================================================== GALLERY */}
      <section className="py-20 lg:py-28">
        <div className="container-rm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHead
              eyebrow="On the job"
              title="From the workshop floor"
              intro="Real branches, real fleets, real equipment, no stock photography."
            />
            <Button href="/gallery/" variant="outline" className="shrink-0">
              Full gallery
            </Button>
          </div>

          <GalleryStrip seed={gallery} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
