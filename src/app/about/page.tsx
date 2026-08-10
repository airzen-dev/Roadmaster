import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowRight, Check } from '@/components/Icons';
import { CtaBand, PageHero } from '@/components/sections';
import { Button, SectionHead, TickList } from '@/components/ui';
import { site, stats } from '@/data/site';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Roadmaster Tyre Services was re-incorporated in 2007 to become the leading multi-branded tyre and value-added service provider in the transport, industrial and earthmover sectors. Read our mission, core principles and B.E.E. structure.',
};

const mission = [
  'To sustain superior performance in the specialist transport and earthmover tyre sectors of the market by consistently striving to maintain preferred status with our valued customers.',
  'To create a stable and secure future for our associates through consistent customer satisfaction.',
  'To provide associates with a safe and stimulating working environment.',
  'To be the leader in quality products and professional tyre associates.',
  'To give customers exceptional value through outstanding treatment with the highest standard of integrity.',
];

const goals = [
  'To deliver exceptional client value by providing the highest standard of service delivery, continually improving our work efficiency and effectiveness.',
  'To be a company that, through its service and value delivery, is recognised as the preferred supplier in the transport and earthmover tyre sectors.',
  'To consistently develop dedicated and well-motivated associates through ongoing skills development and training programmes.',
  'To establish long-term relationships with our valued customers and suppliers, based on sound ethical business principles.',
];

const concept = [
  'An independent, multi-branded company',
  'A B.E.E. company committed to customer satisfaction',
  'A competent and experienced team of partners',
  'Superior tyre and value-added services',
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Roadmaster"
        title="A specialist need, met properly"
        intro="Roadmaster recognised that a specialised need existed in the transport, industrial and earthmover tyre sectors, and that every customer's tyre requirement is unique. That is the whole company in one sentence."
        image="/images/branches/jet-park.jpg"
        imageAlt="Roadmaster Tyre Services Jet Park branch exterior"
        crumbs={[{ label: 'About' }]}
      />

      {/* Our company */}
      <section className="py-18 lg:py-24">
        <div className="container-rm grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
          <div>
            <SectionHead eyebrow="Our company" title="Re-incorporated in 2007" />
            <div className="prose-rm mt-7 space-y-5">
              <p>
                Roadmaster was re-incorporated in {site.reincorporated} with a core focus on becoming the
                leading multi-branded tyre and value-added service provider in our sector, building on a
                name that has been on South African roads since {site.established}.
              </p>
              <p>
                We recognised that a specialised need existed in the transport, industrial and earthmover
                tyre sectors. We are also aware that each customer&rsquo;s operational tyre needs are
                unique, and therefore demand a value-added service package tailored to suit their
                individual requirements.
              </p>
              <p>
                The branch infrastructure, service delivery strategy and tyre management programme have all
                been designed to offer our customers a comprehensive range of tyre management solutions
                based on traditional core principles.
              </p>
            </div>

            <div className="mt-10 rounded-2xl border border-yellow/25 bg-yellow/[0.05] p-6 lg:p-8">
              <p className="eyebrow">Core principles</p>
              <p className="mt-3 text-[1.0625rem] leading-relaxed text-chalk">
                As a company, we are determined to deliver value that meets and exceeds customer
                expectations. We strive at all times for total customer satisfaction, thereby creating
                self-sustained growth through prudent business management practices.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-4/5 overflow-hidden rounded-2xl">
              <Image
                src="/images/gallery/fleet-lineup.jpg"
                alt="The Roadmaster service fleet lined up outside a branch"
                fill
                sizes="(min-width:1024px) 40vw, 92vw"
                className="object-cover"
              />
            </div>
            <div className="mt-5 grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="rounded-xl border border-white/10 bg-ink-800 p-5">
                  <p className="font-display text-2xl leading-none font-black text-yellow">{s.value}</p>
                  <p className="mt-2 font-display text-[0.6875rem] font-bold tracking-[0.14em] text-chalk uppercase">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission + goal */}
      <section className="border-y border-white/10 bg-ink-800 py-18 lg:py-24">
        <div className="container-rm grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHead eyebrow="Mission statement" title="What we hold ourselves to" />
            <ul className="mt-8 space-y-5">
              {mission.map((m, i) => (
                <li key={m} className="flex gap-4">
                  <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-md bg-yellow/12 font-display text-[0.6875rem] font-black text-yellow">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-[0.9375rem] leading-relaxed text-mute">{m}</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <SectionHead eyebrow="Our goal" title="Where we are going" />
            <ul className="mt-8 space-y-5">
              {goals.map((g) => (
                <li key={g} className="flex gap-4">
                  <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-md border border-yellow/30 text-yellow">
                    <Check className="size-3.5" />
                  </span>
                  <p className="text-[0.9375rem] leading-relaxed text-mute">{g}</p>
                </li>
              ))}
            </ul>

            <div className="mt-10 rounded-2xl border border-white/10 bg-ink p-6 lg:p-8">
              <p className="eyebrow">Business concept</p>
              <TickList className="mt-4" items={concept} />
            </div>
          </div>
        </div>
      </section>

      {/* B.E.E. */}
      <section className="py-18 lg:py-24">
        <div className="container-rm">
          <SectionHead
            eyebrow="Black economic empowerment"
            title="Shared wealth, not individual enrichment"
            intro="Roadmaster's support for B.E.E. initiatives has always been, and always will be, a priority focus."
          />

          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            <div className="prose-rm lg:col-span-2 space-y-5">
              <p>
                Although Roadmaster&rsquo;s B.E.E. status has always been above average, the company lacked
                ownership equity. At the end of 2015 the board of directors formulated a structured plan not
                only to further promote the company&rsquo;s B.E.E. status, but also to provide direction
                that would ensure continuity through growth, whilst still maintaining our ideals and goals.
              </p>
              <p>
                <strong>RM Tyres Co-operative Limited</strong> was established in 2016 with a constitution
                that not only benefits our founding members, Roadmaster&rsquo;s own employees, but also
                ensures that all future employees have an equal right and opportunity to obtain ownership
                equity in the Roadmaster group.
              </p>
              <p>
                We believe that our plan is the first of its kind in the tyre industry. Although funded by
                Roadmaster and its shareholders, the co-operative entity is completely self-sustained and
                complements our future national growth plan. As the company grows over time, the
                co-operative will acquire majority shareholding in all existing branch structures.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-ink-800 p-7">
              <p className="eyebrow">At a glance</p>
              <dl className="mt-5 space-y-5">
                {[
                  { k: 'Founded', v: '1941' },
                  { k: 'Re-incorporated', v: '2007' },
                  { k: 'Co-operative established', v: '2016' },
                  { k: 'Ownership model', v: 'Employee equity via RM Tyres Co-operative Ltd' },
                  { k: 'Sectors', v: 'Transport · Industrial · Earthmover · Agricultural · Passenger' },
                ].map((r) => (
                  <div key={r.k} className="border-b border-white/8 pb-4 last:border-0 last:pb-0">
                    <dt className="text-[0.6875rem] font-semibold tracking-[0.14em] text-mute-dim uppercase">
                      {r.k}
                    </dt>
                    <dd className="mt-1.5 text-[0.9375rem] leading-snug text-chalk">{r.v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-7">
                <Button
                  href="/contact/"
                  variant="outline"
                  className="w-full"
                  icon={<ArrowRight className="order-2 size-4" />}
                >
                  Request company profile
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Work with a supplier that knows your sector"
        intro="Whether you run one bakkie or a mine's entire hauling fleet, we will build the tyre programme around it."
        primaryLabel="Talk to us"
        primaryHref="/contact/"
      />
    </>
  );
}
