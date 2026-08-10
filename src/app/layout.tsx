import type { Metadata, Viewport } from 'next';
import { Archivo, Manrope } from 'next/font/google';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import MobileBar from '@/components/MobileBar';
import { branches } from '@/data/branches';
import { site } from '@/data/site';
import './globals.css';

/** Display: a neutral grotesque. Minimal shapes, but it carries real weight at 800/900. */
const archivo = Archivo({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800', '900'],
  variable: '--font-archivo',
  display: 'swap',
});

/** Body: Manrope, for a cleaner, slightly softer read at paragraph sizes. */
const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Truck, Mining & Car Tyres · 24/7 Breakdown Assist`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    'tyres near me',
    'truck tyres South Africa',
    'mining tyres',
    'OTR tyres Richards Bay',
    'tyre retreading',
    '24/7 tyre breakdown',
    'wheel alignment Jet Park',
    'earthmover tyres',
    'foam filling tyres',
    'Roadmaster Tyre Services',
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: 'website',
    locale: 'en_ZA',
    siteName: site.name,
    title: `${site.name} | Tyre & Value-Added Service Specialists`,
    description: site.description,
    images: [{ url: '/images/gallery/fleet-lineup.jpg', width: 1400, height: 1000, alt: site.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: site.name,
    description: site.description,
    images: ['/images/gallery/fleet-lineup.jpg'],
  },
  icons: {
    icon: [{ url: '/images/brand/mark.png', type: 'image/png' }],
    apple: '/images/brand/mark.png',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#0d0d0f',
  width: 'device-width',
  initialScale: 1,
};

/** Organisation + one LocalBusiness node per branch, for local search. */
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${site.url}/#organization`,
      name: site.name,
      url: site.url,
      logo: `${site.url}/images/brand/logo-full.png`,
      foundingDate: String(site.established),
      description: site.description,
      areaServed: { '@type': 'Country', name: 'South Africa' },
    },
    ...branches.map((b) => ({
      '@type': 'AutoRepair',
      '@id': `${site.url}/branches/${b.slug}/#business`,
      name: b.name,
      parentOrganization: { '@id': `${site.url}/#organization` },
      url: `${site.url}/branches/${b.slug}/`,
      image: `${site.url}${b.image}`,
      telephone: b.phoneTel,
      address: { '@type': 'PostalAddress', streetAddress: b.address, addressCountry: 'ZA' },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: b.slug === 'roadmaster-manufacturing' ? '07:00' : '08:00',
          closes: b.slug === 'roadmaster-manufacturing' ? '16:30' : '17:00',
        },
      ],
    })),
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-ZA" className={`${archivo.variable} ${manrope.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-yellow focus:px-5 focus:py-2.5 focus:font-display focus:text-xs focus:font-bold focus:tracking-widest focus:text-ink focus:uppercase"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="pb-16 lg:pb-0">
          {children}
        </main>
        <Footer />
        <MobileBar />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
