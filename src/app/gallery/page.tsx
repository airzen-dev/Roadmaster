import type { Metadata } from 'next';
import GalleryGrid from '@/components/GalleryGrid';
import { CtaBand, PageHero } from '@/components/sections';
import { gallery } from '@/data/gallery';

export const metadata: Metadata = {
  title: 'Photo Gallery',
  description:
    'Photographs from Roadmaster Tyre Services branches and job sites: workshop bays, alignment ramps, the breakdown fleet, and OTR earthmover work in the field.',
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Photo gallery"
        title="The work, as it actually looks"
        intro="Our branches, our fleet, our people and the machines we keep rolling. Tap any photo to view it full size."
        image="/images/gallery/alignment-fortuner.jpg"
        imageAlt="Vehicle on the Roadmaster wheel alignment ramp"
        crumbs={[{ label: 'Gallery' }]}
        compact
      />

      <section className="py-14 lg:py-20">
        <div className="container-rm">
          <GalleryGrid photos={gallery} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
