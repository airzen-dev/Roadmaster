import type { Metadata } from 'next';
import Image from 'next/image';
import { iconMap } from '@/components/Icons';
import { BreakdownStrip, CtaBand, PageHero } from '@/components/sections';
import { CardLink, MoreLink } from '@/components/ui';
import { servicesByCategory } from '@/data/services';

export const metadata: Metadata = {
  title: 'Our Services',
  description:
    'Fourteen specialist services: new tyre sales for passenger, truck, mining and agricultural applications, plus retreading, vulcanised repairs, foam filling, nitrogen, alignment, brakes, disc skimming, diagnostics, load studies and 24/7 breakdown assist.',
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="Everything a tyre needs, start to finish"
        intro="New fitment, life extension, repair, measurement and emergency response, all under one roof, at every branch."
        image="/images/services/retreading.jpg"
        imageAlt="Tyre retreading press applying new tread under heat and pressure"
        crumbs={[{ label: 'Services' }]}
      />

      {servicesByCategory.map((cat, ci) => (
        <section
          key={cat.name}
          className={`py-16 lg:py-20 ${ci % 2 === 1 ? 'border-y border-white/10 bg-ink-800' : ''}`}
        >
          <div className="container-rm">
            <div className="flex flex-col gap-3 border-b border-white/10 pb-7 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="eyebrow">{`0${ci + 1}`}</p>
                <h2 className="mt-2.5 text-[clamp(1.5rem,3.6vw,2.25rem)] leading-tight uppercase">
                  {cat.name}
                </h2>
              </div>
              <p className="max-w-md text-[0.9375rem] leading-relaxed text-mute sm:text-right">
                {cat.description}
              </p>
            </div>

            <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {cat.services.map((s) => {
                const Icon = iconMap[s.icon as keyof typeof iconMap];
                return (
                  <CardLink key={s.slug} href={`/services/${s.slug}/`}>
                    <div className="relative aspect-3/2 overflow-hidden">
                      <Image
                        src={s.image}
                        alt={s.name}
                        fill
                        sizes="(min-width:1024px) 23vw, (min-width:640px) 45vw, 92vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                      />
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-t from-ink-800 via-ink-800/20 to-transparent"
                      />
                      <span className="absolute top-3.5 left-3.5 grid size-9 place-items-center rounded-lg bg-yellow text-ink">
                        <Icon className="size-4.5" />
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="text-[1.0625rem] leading-tight uppercase">{s.name}</h3>
                      <p className="mt-2.5 text-[0.875rem] leading-relaxed text-mute">{s.summary}</p>
                      <MoreLink>Details</MoreLink>
                    </div>
                  </CardLink>
                );
              })}
            </div>
          </div>
        </section>
      ))}

      <BreakdownStrip />
      <CtaBand
        title="Not sure which service you need?"
        intro="Describe the symptom or the job and we will point you at the right branch and the right fix."
        primaryLabel="Contact a branch"
        primaryHref="/contact/"
      />
    </>
  );
}
