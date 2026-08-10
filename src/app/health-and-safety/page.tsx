import type { Metadata } from 'next';
import { Check, Shield } from '@/components/Icons';
import { CtaBand, PageHero } from '@/components/sections';
import { SectionHead } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Health & Safety',
  description:
    'Roadmaster believes responsible management of health and safety is an integral part of our business: providing a safe working environment, complying with legislation, and meeting each customer’s individual HSEQ requirements.',
};

const commitments = [
  {
    title: 'A safe and healthy working environment',
    body: 'For our employees, their families and the community, through staff participation and ownership of health and safety responsibilities.',
  },
  {
    title: 'Meeting corporate requirements',
    body: 'By complying with health and safety laws and regulations, conducting business according to recognised standards for the tyre industry, and committing the necessary resources at all times.',
  },
  {
    title: 'Constructive regulatory relationships',
    body: 'We build and maintain a constructive relationship with regulatory authorities.',
  },
  {
    title: 'Sound management principles',
    body: 'We supply sound health and safety management principles and operating practices throughout the group.',
  },
  {
    title: 'Reducing hazards',
    body: 'We work to lessen the hazards and potential hazards in our business, before they become incidents.',
  },
  {
    title: 'Minimising our impact',
    body: 'We minimise any detrimental impact our business might have on society.',
  },
  {
    title: 'Customer HSEQ compliance',
    body: 'We always stay alert and comply with our valued customers’ individual HSEQ requirements, on their sites and to their standards.',
  },
];

export default function HealthAndSafetyPage() {
  return (
    <>
      <PageHero
        eyebrow="Health & safety"
        title="Safety is not a policy document"
        intro="Roadmaster believes that responsible management of health and safety is an integral part of our business, through strategic management, commitment to our values, and by creating a culture of health and safety awareness."
        image="/images/gallery/workshop-reception.jpg"
        imageAlt="Roadmaster workshop floor with marked safety zones"
        crumbs={[{ label: 'Health & Safety' }]}
      />

      <section className="py-16 lg:py-24">
        <div className="container-rm">
          <div className="mx-auto max-w-3xl rounded-2xl border border-yellow/25 bg-yellow/[0.05] p-8 text-center lg:p-12">
            <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-yellow text-ink">
              <Shield className="size-7" />
            </span>
            <p className="mt-7 font-display text-[1.125rem] leading-relaxed font-semibold text-chalk uppercase lg:text-xl">
              Our company will always strive to provide a safe and healthy working environment for our
              employees, their families and the community.
            </p>
          </div>

          <div className="mt-16 lg:mt-20">
            <SectionHead
              eyebrow="Our commitments"
              title="What that means in practice"
              align="center"
            />

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {commitments.map((c, i) => (
                <div
                  key={c.title}
                  className="flex flex-col rounded-2xl border border-white/10 bg-ink-800 p-6 transition-colors duration-400 hover:border-yellow/35"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-display text-[0.6875rem] font-black tracking-[0.14em] text-yellow/50">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="h-px flex-1 bg-white/10" />
                    <Check className="size-4 text-yellow" />
                  </div>
                  <h3 className="mt-5 text-base leading-snug uppercase">{c.title}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-mute">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Need our HSEQ documentation?"
        intro="Site inductions, safety files and compliance packs are available on request from any branch."
        primaryLabel="Request documentation"
        primaryHref="/contact/"
      />
    </>
  );
}
