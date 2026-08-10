import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check, Phone, Siren, Whatsapp } from '@/components/Icons';
import { CtaBand } from '@/components/sections';
import { Button, SectionHead, TickList } from '@/components/ui';
import { branches, breakdownLines } from '@/data/branches';
import { getService } from '@/data/services';

export const metadata: Metadata = {
  title: '24/7 Breakdown Assist, Nationwide',
  description:
    'Roadmaster 24/7 breakdown assist for trucks and mining vehicles, nationwide. Call Jet Park 071 604 7398, Richards Bay 060 500 0744, KwaDukuza 067 403 6888 or Pinetown 064 751 8463.',
  alternates: { canonical: '/breakdown-assist/' },
};

const service = getService('breakdown-services')!;

export default function BreakdownPage() {
  return (
    <>
      {/* Emergency-first hero: the numbers come before the prose. */}
      <section className="relative isolate overflow-hidden">
        <Image
          src="/images/gallery/otr-haul-truck.jpg"
          alt="Roadmaster on-site service to an articulated hauler"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover opacity-35"
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/85 to-ink" />

        <div className="container-rm relative pt-14 pb-16 lg:pt-20 lg:pb-20">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-[0.6875rem] font-semibold tracking-[0.14em] text-mute-dim uppercase">
              <li>
                <Link href="/" className="transition-colors hover:text-yellow">
                  Home
                </Link>
              </li>
              <li aria-hidden className="text-white/25">
                /
              </li>
              <li className="text-chalk">Breakdown Assist</li>
            </ol>
          </nav>

          <p className="eyebrow flex items-start gap-3">
            <span className="mt-[0.42rem] inline-block size-1.5 shrink-0 animate-pulse rounded-full bg-yellow" />
            Nationwide · every hour of every day
          </p>
          <h1 className="mt-4 max-w-4xl text-[clamp(2.2rem,7vw,4.5rem)] leading-[0.98] uppercase">
            24/7 breakdown
            <span className="text-yellow"> assist</span>
          </h1>
          <p className="prose-rm mt-6 max-w-2xl text-[1.0625rem] lg:text-lg">
            When heavy-duty machines break down, every minute of downtime costs money. Call the line nearest
            to you and a fully equipped unit gets moving.
          </p>

          {/* Number cards */}
          <div className="mt-11 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {breakdownLines.map((l) => (
              <div
                key={l.number}
                className="flex flex-col rounded-2xl border border-yellow/30 bg-ink-800/85 p-6 backdrop-blur transition-colors duration-400 hover:border-yellow"
              >
                <p className="font-display text-[0.6875rem] font-bold tracking-[0.16em] text-yellow uppercase">
                  {l.branch}
                </p>
                <p className="mt-1 text-[0.75rem] text-mute-dim">{l.region}</p>
                <a
                  href={`tel:${l.tel}`}
                  className="mt-5 font-display text-[1.375rem] leading-none font-black text-chalk transition-colors hover:text-yellow"
                >
                  {l.number}
                </a>
                {l.alt && (
                  <a
                    href={`tel:${l.altTel}`}
                    className="mt-2 font-display text-[0.9375rem] font-bold text-mute transition-colors hover:text-yellow"
                  >
                    or {l.alt}
                  </a>
                )}
                <div className="mt-5 flex gap-2 pt-0 lg:mt-auto lg:pt-5">
                  <a
                    href={`tel:${l.tel}`}
                    className="flex h-10 flex-1 items-center justify-center gap-2 rounded-full bg-yellow font-display text-[0.6875rem] font-bold tracking-[0.12em] text-ink uppercase"
                  >
                    <Phone className="size-4" />
                    Call
                  </a>
                  <Link
                    href={`/branches/${l.slug}/`}
                    aria-label={`${l.branchName} branch details`}
                    className="grid size-10 shrink-0 place-items-center rounded-full border border-white/20 text-chalk transition-colors hover:border-yellow hover:text-yellow"
                  >
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-[0.8125rem] text-mute-dim">
            Port Shepstone and Manufacturing are reachable during trading hours,{' '}
            <Link href="/branches/" className="text-yellow underline underline-offset-4">
              see all branch numbers
            </Link>
            .
          </p>
        </div>
      </section>

      {/* What we cover */}
      <section className="border-y border-white/10 bg-ink-800 py-16 lg:py-24">
        <div className="container-rm grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHead eyebrow="What we cover" title="Trucks & mining vehicles" />
            <p className="prose-rm mt-6">
              Whether you&rsquo;re hauling freight across the country or operating in remote mining sites,
              mechanical failures can happen anytime, anywhere. Our expert technicians are on call 24 hours a
              day, 7 days a week, ready to respond with fully equipped service vehicles and specialised
              tools.
            </p>

            <h3 className="mt-10 font-display text-[0.8125rem] font-bold tracking-[0.16em] text-yellow uppercase">
              We service
            </h3>
            <TickList
              className="mt-5"
              items={[
                'Heavy trucks: rigids, semis and road trains',
                'Mining vehicles: haul trucks, loaders, ADTs and more',
                'Mechanical breakdowns',
              ]}
            />

            <h3 className="mt-10 font-display text-[0.8125rem] font-bold tracking-[0.16em] text-yellow uppercase">
              Our capabilities
            </h3>
            <TickList
              className="mt-5"
              items={[
                'On-site diagnostics and repairs',
                'Hydraulic hose replacements',
                'Electrical fault finding',
                'Engine and transmission repairs',
                'Preventative maintenance support',
              ]}
            />
          </div>

          <div>
            <div className="relative aspect-4/3 overflow-hidden rounded-2xl">
              <Image
                src="/images/gallery/fleet-lineup.jpg"
                alt="Roadmaster breakdown response fleet ready to deploy"
                fill
                sizes="(min-width:1024px) 45vw, 92vw"
                className="object-cover"
              />
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-ink p-7">
              <p className="eyebrow">Why choose us</p>
              <ul className="mt-5 space-y-4">
                {[
                  'Rapid response times, even in remote areas',
                  'Qualified, experienced technicians',
                  'Quality workmanship',
                  'Commitment to safety and uptime',
                ].map((w) => (
                  <li key={w} className="flex items-start gap-3">
                    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-md bg-yellow/12 text-yellow">
                      <Check className="size-3.5" />
                    </span>
                    <span className="text-[0.9375rem] leading-relaxed text-chalk">{w}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-white/10 pt-5 text-[0.875rem] leading-relaxed text-mute">
                Whether it&rsquo;s a blown hose in the middle of the night or a flat tyre, we&rsquo;re your
                trusted partner to keep your fleet moving and your operation running smoothly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 lg:py-24">
        <div className="container-rm">
          <SectionHead
            eyebrow="How a call-out runs"
            title="Four steps from call to rolling"
            align="center"
          />
          <ol className="mt-14 grid gap-6 lg:grid-cols-4">
            {[
              {
                t: 'Call the branch line',
                d: 'Give us your location, vehicle type and what has failed. Have the tyre size or part on hand if you know it.',
              },
              {
                t: 'We dispatch',
                d: 'The nearest fully equipped unit is assigned, with the tooling that job needs, including OTR handling gear.',
              },
              {
                t: 'On-site assessment',
                d: 'The technician diagnoses on the spot and tells you whether it is a repair, a swap or a recovery.',
              },
              {
                t: 'Back on the road',
                d: 'We complete the repair or fitment on site wherever possible, and report back on what caused it.',
              },
            ].map((s, i) => (
              <li key={s.t} className="relative rounded-2xl border border-white/10 bg-ink-800 p-6">
                <span className="font-display text-3xl leading-none font-black text-yellow/25">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-4 text-base leading-snug uppercase">{s.t}</h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-mute">{s.d}</p>
              </li>
            ))}
          </ol>

          <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
            <Button
              href={`tel:${breakdownLines[0].tel}`}
              size="lg"
              external
              icon={<Siren className="size-4" />}
            >
              Call {breakdownLines[0].number}
            </Button>
            <Button
              href={`https://wa.me/${branches[0].whatsapp}`}
              variant="outline"
              size="lg"
              external
              icon={<Whatsapp className="size-4" />}
            >
              WhatsApp us
            </Button>
            <Button href={`/services/${service.slug}/`} variant="ghost" size="lg">
              Full service detail
            </Button>
          </div>
        </div>
      </section>

      <CtaBand
        title="Put our numbers in your cab"
        intro="Save the line for your region now. The middle of the night is a bad time to be searching for a phone number."
        primaryLabel="All branch numbers"
        primaryHref="/branches/"
      />
    </>
  );
}
