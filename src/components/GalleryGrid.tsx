'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import type { Photo } from '@/data/gallery';
import { ArrowRight, Close } from './Icons';

export default function GalleryGrid({ photos }: { photos: Photo[] }) {
  const [active, setActive] = useState<number | null>(null);
  const isOpen = active !== null;

  const step = useCallback(
    (delta: number) => setActive((i) => (i === null ? null : (i + delta + photos.length) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null);
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, step]);

  const current = active === null ? null : photos[active];

  return (
    <>
      {/* Masonry-ish columns keep varied aspect ratios from leaving gaps. */}
      <div className="columns-2 gap-3 sm:gap-4 lg:columns-3 xl:columns-4">
        {photos.map((p, i) => (
          <button
            key={p.src}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`View photo: ${p.caption}`}
            className="group relative mb-3 block w-full overflow-hidden rounded-xl sm:mb-4"
          >
            <Image
              src={p.src}
              alt={p.alt}
              width={1400}
              height={p.tall ? 1750 : 1000}
              sizes="(min-width:1280px) 24vw, (min-width:1024px) 32vw, 47vw"
              className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
            />
            <span
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100"
            />
            <span className="absolute inset-x-4 bottom-3 translate-y-2 text-left text-[0.75rem] leading-snug font-medium text-chalk opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
              {p.caption}
            </span>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.caption}
          className="fixed inset-0 z-[60] flex flex-col bg-ink/97 backdrop-blur-md"
        >
          <div className="flex h-16 shrink-0 items-center justify-between px-5">
            <span className="font-display text-[0.75rem] font-bold tracking-[0.16em] text-mute uppercase">
              {active! + 1} / {photos.length}
            </span>
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label="Close image viewer"
              className="grid size-10 place-items-center rounded-full border border-white/20 text-chalk transition-colors hover:border-yellow hover:text-yellow"
            >
              <Close className="size-5" />
            </button>
          </div>

          <div className="relative flex flex-1 items-center justify-center px-4 pb-4">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous image"
              className="absolute left-2 z-10 grid size-11 place-items-center rounded-full border border-white/20 bg-ink/70 text-chalk transition-colors hover:border-yellow hover:text-yellow sm:left-5"
            >
              <ArrowRight className="size-5 rotate-180" />
            </button>

            <div className="relative max-h-full w-full max-w-5xl">
              <Image
                src={current.src}
                alt={current.alt}
                width={1400}
                height={1000}
                sizes="90vw"
                className="mx-auto max-h-[74svh] w-auto rounded-xl object-contain"
              />
              <p className="mx-auto mt-4 max-w-2xl text-center text-[0.875rem] text-mute">
                {current.caption}
              </p>
            </div>

            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next image"
              className="absolute right-2 z-10 grid size-11 place-items-center rounded-full border border-white/20 bg-ink/70 text-chalk transition-colors hover:border-yellow hover:text-yellow sm:right-5"
            >
              <ArrowRight className="size-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
