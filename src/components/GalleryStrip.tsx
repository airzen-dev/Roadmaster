'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { GalleryItem } from '@/data/gallery';
import { fetchPublicGallery } from '@/lib/gallery-read';
import { parseVideoSource } from '@/lib/video';
import { Play } from './Icons';

/**
 * The eight-tile teaser on the home page. Seeded from the build like the full
 * grid, then upgraded to whatever the gallery currently holds so both places
 * stay in step after an edit in /studio.
 */
export default function GalleryStrip({ seed }: { seed: GalleryItem[] }) {
  const [items, setItems] = useState<GalleryItem[]>(seed);

  useEffect(() => {
    let cancelled = false;
    fetchPublicGallery().then((live) => {
      if (!cancelled && live && live.length) setItems(live);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-16 lg:grid-cols-4">
      {items.slice(0, 8).map((item, i) => (
        <Link
          key={item.id}
          href="/gallery/"
          className={`group relative overflow-hidden rounded-xl ${
            i === 0 || i === 5 ? 'col-span-2 aspect-16/11' : 'aspect-square'
          }`}
        >
          <Tile item={item} />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
          {item.kind === 'video' && (
            <span
              aria-hidden
              className="absolute inset-0 grid place-items-center"
            >
              <span className="grid size-11 place-items-center rounded-full bg-ink/70 ring-1 ring-white/25 backdrop-blur-sm">
                <Play className="size-4 translate-x-[1px] text-yellow" />
              </span>
            </span>
          )}
          <p className="absolute inset-x-4 bottom-3 translate-y-2 text-[0.75rem] leading-snug font-medium text-chalk opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            {item.caption}
          </p>
        </Link>
      ))}
    </div>
  );
}

function Tile({ item }: { item: GalleryItem }) {
  const cls =
    'absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-[1.07]';

  if (item.kind === 'video' && !item.poster) {
    const source = parseVideoSource(item.src);
    if (source?.provider === 'file') {
      return (
        <video src={`${source.url}#t=0.1`} preload="metadata" muted playsInline aria-hidden className={cls} />
      );
    }
    return <span aria-hidden className={`${cls} bg-ink-700`} />;
  }

  /* eslint-disable-next-line @next/next/no-img-element */
  return <img src={item.kind === 'video' ? item.poster! : item.src} alt={item.alt} loading="lazy" decoding="async" className={cls} />;
}
