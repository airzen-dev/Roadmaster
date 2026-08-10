import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowRight, Check } from '@/components/Icons';
import { CtaBand, PageHero } from '@/components/sections';
import { Button, SectionHead } from '@/components/ui';
import { BrandChip } from '@/components/BrandChip';
import { partsBrands, productGroups, tyreBrands } from '@/data/products';

export const metadata: Metadata = {
  title: 'Products',
  description:
    'Tyres from Michelin, Continental, Dunlop, Sumitomo, CEAT and Boto, plus shocks, brakes, rims and mags, bumpers and towbars, supplied and fitted at all Roadmaster branches.',
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Products"
        title="Independent means you get the right one"
        intro="We are not tied to a single manufacturer. That means we can put the tyre, shock or brake on your vehicle that actually suits the job, and tell you honestly where the value sits."
        image="/images/services/truck-tyres.jpg"
        imageAlt="Commercial truck tyre tread detail"
        crumbs={[{ label: 'Products' }]}
      />

      {/* Brands */}
      <section className="border-b border-white/10 bg-ink-800 py-16 lg:py-20">
        <div className="container-rm">
          <SectionHead
            eyebrow="Tyre brands"
            title="Multi-branded by design"
            intro="Roadmaster is an independent multi-branded company, a core part of our business concept since re-incorporation."
          />
          <div className="mt-11 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tyreBrands.map((b) => (
              <div
                key={b.name}
                className="rounded-2xl border border-white/10 bg-ink p-6 transition-colors duration-400 hover:border-yellow/40"
              >
                <BrandChip brand={b} className="h-20 w-full" />
                <p className="mt-5 font-display text-[0.9375rem] font-bold tracking-[0.06em] text-chalk uppercase">
                  {b.name}
                </p>
                <p className="mt-1.5 text-[0.875rem] leading-relaxed text-mute">{b.note}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 border-t border-white/10 pt-12">
            <h3 className="text-center font-display text-[0.8125rem] font-bold tracking-[0.18em] text-yellow uppercase">
              Suspension &amp; braking brands
            </h3>
            <div className="mt-8 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
              {partsBrands.map((b) => (
                <div key={b.name} className="rounded-xl border border-white/10 bg-ink p-3">
                  <BrandChip brand={b} className="h-16 w-full" />
                  <p className="mt-3 text-center text-[0.6875rem] font-semibold tracking-[0.12em] text-mute uppercase">
                    {b.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Product groups */}
      <section className="py-16 lg:py-20">
        <div className="container-rm space-y-6">
          {productGroups.map((g, i) => (
            <article
              key={g.slug}
              className="grid overflow-hidden rounded-2xl border border-white/10 bg-ink-800 lg:grid-cols-2"
            >
              <div
                className={`relative aspect-16/10 lg:aspect-auto lg:min-h-[19rem] ${
                  i % 2 === 1 ? 'lg:order-2' : ''
                }`}
              >
                <Image
                  src={g.image}
                  alt={g.name}
                  fill
                  sizes="(min-width:1024px) 50vw, 100vw"
                  className="object-cover"
                />
                <div
                  aria-hidden
                  className={`absolute inset-0 bg-gradient-to-t from-ink-800/80 via-transparent to-transparent lg:bg-gradient-to-${
                    i % 2 === 1 ? 'l' : 'r'
                  } lg:from-transparent lg:to-ink-800/70`}
                />
              </div>

              <div className="p-7 lg:p-10">
                <p className="eyebrow">{`0${i + 1}`}</p>
                <h2 className="mt-3 text-[clamp(1.4rem,3.4vw,2rem)] leading-tight uppercase">{g.name}</h2>
                <p className="prose-rm mt-4">{g.blurb}</p>

                <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
                  {g.items.map((it) => (
                    <li key={it} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 size-4 shrink-0 text-yellow" />
                      <span className="text-[0.875rem] leading-snug text-mute">{it}</span>
                    </li>
                  ))}
                </ul>

                {'brands' in g && g.brands && (
                  <div className="mt-7 flex flex-wrap items-center gap-2">
                    <span className="text-[0.625rem] font-semibold tracking-[0.16em] text-mute-dim uppercase">
                      Brands
                    </span>
                    {g.brands.map((br) => (
                      <span
                        key={br}
                        className="rounded-full border border-white/12 px-3 py-1 text-[0.6875rem] font-semibold tracking-wider text-chalk uppercase"
                      >
                        {br}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="container-rm mt-12 text-center">
          <p className="prose-rm mx-auto max-w-xl">
            Looking for a size or a fitment you do not see listed? Every branch can source and quote,
            including OTR and agricultural sizes on order.
          </p>
          <div className="mt-7">
            <Button href="/contact/" size="lg" icon={<ArrowRight className="order-2 size-4" />}>
              Request a quote
            </Button>
          </div>
        </div>
      </section>

      <CtaBand
        title="Know what you need? Get a price."
        intro="Send us the tyre size, vehicle or part and the branch nearest you will come back with a quote."
        primaryLabel="Get a quote"
        primaryHref="/contact/"
      />
    </>
  );
}
