import type { MetadataRoute } from 'next';
import { branches } from '@/data/branches';
import { services } from '@/data/services';
import { site } from '@/data/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    { path: '/', priority: 1 },
    { path: '/services/', priority: 0.9 },
    { path: '/branches/', priority: 0.9 },
    { path: '/breakdown-assist/', priority: 0.9 },
    { path: '/products/', priority: 0.8 },
    { path: '/about/', priority: 0.7 },
    { path: '/contact/', priority: 0.8 },
    { path: '/gallery/', priority: 0.5 },
    { path: '/health-and-safety/', priority: 0.5 },
  ];

  return [
    ...staticPaths.map((p) => ({
      url: `${site.url}${p.path}`,
      changeFrequency: 'monthly' as const,
      priority: p.priority,
    })),
    ...services.map((s) => ({
      url: `${site.url}/services/${s.slug}/`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...branches.map((b) => ({
      url: `${site.url}/branches/${b.slug}/`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
