import type { Metadata } from 'next';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';
import { ArrowRight, Clock, Phone, Pin, Siren, Whatsapp } from '@/components/Icons';
import { CtaBand, PageHero } from '@/components/sections';
import { branches } from '@/data/branches';
import { socials } from '@/data/site';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Contact Roadmaster Tyre Services: branch phone numbers, addresses, trading hours, WhatsApp lines and 24/7 breakdown numbers for Jet Park, Richards Bay, KwaDukuza, Pinetown, Port Shepstone and Manufacturing.',
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title="Talk to the branch nearest you"
        intro="Every branch quotes on the actual job, so you get a real number rather than a guess. Call, WhatsApp, or send an enquiry below."
        image="/images/branches/jet-park.jpg"
        imageAlt="Roadmaster Tyre Services branch frontage"
        crumbs={[{ label: 'Contact' }]}
        compact
      />

      <section className="py-14 lg:py-20">
        <div className="container-rm grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          <ContactForm />

          <div>
            {/* Emergency callout first */}
            <Link
              href="/breakdown-assist/"
              className="group flex items-start gap-4 rounded-2xl border border-yellow/30 bg-yellow/[0.06] p-6 transition-colors hover:border-yellow"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-yellow text-ink">
                <Siren className="size-5" />
              </span>
              <div>
                <p className="font-display text-base leading-tight uppercase">
                  Broken down right now?
                </p>
                <p className="mt-2 text-[0.875rem] leading-relaxed text-mute">
                  Skip the form. Our 24/7 lines are staffed every hour of every day, nationwide.
                </p>
                <span className="mt-3 inline-flex items-center gap-2 font-display text-[0.7rem] font-bold tracking-[0.16em] text-yellow uppercase">
                  Breakdown numbers
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>

            {/* Branch directory */}
            <h2 className="rule-yellow mt-12 text-[clamp(1.25rem,2.8vw,1.6rem)] uppercase">
              Branch directory
            </h2>

            <div className="mt-8 space-y-4">
              {branches.map((b) => (
                <div
                  key={b.slug}
                  className="rounded-2xl border border-white/10 bg-ink-800 p-5 transition-colors duration-400 hover:border-yellow/30"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-[1.0625rem] leading-tight uppercase">
                      <Link href={`/branches/${b.slug}/`} className="transition-colors hover:text-yellow">
                        {b.city}
                      </Link>
                    </h3>
                    <span className="text-[0.625rem] font-semibold tracking-[0.14em] text-mute-dim uppercase">
                      {b.region}
                    </span>
                  </div>

                  <p className="mt-3 flex items-start gap-2 text-[0.8125rem] leading-snug text-mute">
                    <Pin className="mt-0.5 size-3.5 shrink-0 text-mute-dim" />
                    {b.address}
                  </p>
                  <p className="mt-1.5 flex items-center gap-2 text-[0.8125rem] text-mute">
                    <Clock className="size-3.5 shrink-0 text-mute-dim" />
                    {b.hoursSummary}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <a
                      href={`tel:${b.phoneTel}`}
                      className="inline-flex h-9 items-center gap-2 rounded-full bg-white/8 px-4 font-display text-[0.75rem] font-bold text-chalk transition-colors hover:bg-yellow hover:text-ink"
                    >
                      <Phone className="size-3.5" />
                      {b.phone}
                    </a>
                    {b.breakdown && (
                      <a
                        href={`tel:${b.breakdownTel}`}
                        className="inline-flex h-9 items-center gap-2 rounded-full bg-yellow/12 px-4 font-display text-[0.75rem] font-bold text-yellow transition-colors hover:bg-yellow hover:text-ink"
                      >
                        <Siren className="size-3.5" />
                        24/7 · {b.breakdown}
                      </a>
                    )}
                    {b.whatsapp && (
                      <a
                        href={`https://wa.me/${b.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-9 items-center gap-2 rounded-full border border-white/15 px-4 font-display text-[0.75rem] font-bold text-mute transition-colors hover:border-yellow hover:text-yellow"
                      >
                        <Whatsapp className="size-3.5" />
                        WhatsApp
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="mt-10 rounded-2xl border border-white/10 bg-ink-800 p-6">
              <p className="eyebrow">Follow us</p>
              <div className="mt-5 space-y-4">
                {socials.map((s) => (
                  <div key={s.branch} className="flex flex-wrap items-center justify-between gap-3">
                    <span className="font-display text-[0.8125rem] font-bold text-chalk uppercase">
                      {s.branch}
                    </span>
                    <div className="flex gap-2">
                      <a
                        href={s.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg border border-white/15 px-3.5 py-1.5 text-[0.6875rem] font-bold tracking-wider text-mute uppercase transition-colors hover:border-yellow hover:text-yellow"
                      >
                        Facebook
                      </a>
                      <a
                        href={s.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg border border-white/15 px-3.5 py-1.5 text-[0.6875rem] font-bold tracking-wider text-mute uppercase transition-colors hover:border-yellow hover:text-yellow"
                      >
                        Instagram
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Prefer to see the place first?"
        intro="Every branch page has a map, directions and its full trading hours."
        primaryLabel="Browse branches"
        primaryHref="/branches/"
      />
    </>
  );
}
