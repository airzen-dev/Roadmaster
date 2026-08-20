import type { Metadata } from 'next';
import StudioClient from '@/components/studio/StudioClient';

export const metadata: Metadata = {
  title: 'Studio',
  // Not a public page: keep it out of search results and out of the sitemap.
  robots: { index: false, follow: false, nocache: true },
};

export default function StudioPage() {
  return (
    <section className="py-14 lg:py-20">
      <div className="container-rm max-w-5xl">
        <StudioClient />
      </div>
    </section>
  );
}
