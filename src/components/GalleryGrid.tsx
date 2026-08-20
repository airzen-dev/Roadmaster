'use client';

import { useCallback, useEffect, useState } from 'react';
import type { GalleryItem } from '@/data/gallery';
import { fetchPublicGallery } from '@/lib/gallery-read';
import { embedUrl, parseVideoSource } from '@/lib/video';
import { ArrowRight, Close, Play } from './Icons';

/**
 * `seed` is the list baked into the build, so the page has real content before
 * any JavaScript runs and if Appwrite is ever unreachable. Once the live list
 * arrives it replaces the seed.
 */
export default function GalleryGrid({ seed }: { seed: GalleryItem[] }) {
  const [items, setItems] = useState<GalleryItem[]>(seed);
  const [active, setActive] = useState<number | null>(null);
  const isOpen = active !== null;

  useEffect(() => {
    let cancelled = false;
    fetchPublicGallery().then((live) => {
      if (!cancelled && live && live.length) setItems(live);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const step = useCallback(
    (delta: number) => setActive((i) => (i === null ? null : (i + delta + items.length) % items.length)),
    [items.length],
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

  const current = active === null ? null : items[active];

  return (
    <>
      {/* Masonry-ish columns keep varied aspect ratios from leaving gaps. */}
      <div className="columns-2 gap-3 sm:gap-4 lg:columns-3 xl:columns-4">
        {items.map((item, i) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`${item.kind === 'video' ? 'Play video' : 'View photo'}: ${item.caption}`}
            className="group relative mb-3 block w-full overflow-hidden rounded-xl sm:mb-4"
          >
            <Thumb item={item} />
            <span
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100"
            />
            {item.kind === 'video' && (
              <span
                aria-hidden
                className="absolute inset-0 grid place-items-center"
              >
                <span className="grid size-12 place-items-center rounded-full bg-ink/70 ring-1 ring-white/25 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                  <Play className="size-5 translate-x-[1px] text-yellow" />
                </span>
              </span>
            )}
            <span className="absolute inset-x-4 bottom-3 translate-y-2 text-left text-[0.75rem] leading-snug font-medium text-chalk opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
              {item.caption}
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
              {active! + 1} / {items.length}
            </span>
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label="Close viewer"
              className="grid size-10 place-items-center rounded-full border border-white/20 text-chalk transition-colors hover:border-yellow hover:text-yellow"
            >
              <Close className="size-5" />
            </button>
          </div>

          <div className="relative flex flex-1 items-center justify-center px-4 pb-4">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous"
              className="absolute left-2 z-10 grid size-11 place-items-center rounded-full border border-white/20 bg-ink/70 text-chalk transition-colors hover:border-yellow hover:text-yellow sm:left-5"
            >
              <ArrowRight className="size-5 rotate-180" />
            </button>

            <div className="relative max-h-full w-full max-w-5xl">
              <Stage item={current} />
              <p className="mx-auto mt-4 max-w-2xl text-center text-[0.875rem] text-mute">
                {current.caption}
              </p>
            </div>

            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next"
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

/* ------------------------------------------------------------------- pieces */

/**
 * Grid tile. Images and posters are plain `<img>`: the build already runs with
 * `images.unoptimized`, and uploaded media lives on an Appwrite storage URL that
 * `next/image` would need whitelisted for no gain.
 */
function Thumb({ item }: { item: GalleryItem }) {
  const ratio = item.width && item.height ? `${item.width} / ${item.height}` : '4 / 3';

  if (item.kind === 'video' && !item.poster) {
    const source = parseVideoSource(item.src);
    // Hosted files render their own first frame from metadata alone.
    if (source?.provider === 'file') {
      return (
        <video
          src={`${source.url}#t=0.1`}
          preload="metadata"
          muted
          playsInline
          aria-hidden
          className="h-auto w-full object-cover"
          style={{ aspectRatio: ratio }}
        />
      );
    }
    return (
      <span
        aria-hidden
        className="block w-full bg-ink-700"
        style={{ aspectRatio: ratio }}
      />
    );
  }

  const src = item.kind === 'video' ? item.poster! : item.src;
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={src}
      alt={item.alt}
      width={item.width ?? undefined}
      height={item.height ?? undefined}
      loading="lazy"
      decoding="async"
      className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
      style={item.width && item.height ? undefined : { aspectRatio: ratio }}
    />
  );
}

/** Full-size view: a photo, a hosted video player, or a YouTube / Vimeo embed. */
function Stage({ item }: { item: GalleryItem }) {
  if (item.kind === 'image') {
    return (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img
        src={item.src}
        alt={item.alt}
        className="mx-auto max-h-[74svh] w-auto rounded-xl object-contain"
      />
    );
  }

  const source = parseVideoSource(item.src);

  if (source?.provider === 'file') {
    return (
      <video
        key={item.id}
        src={source.url}
        poster={item.poster ?? undefined}
        controls
        autoPlay
        playsInline
        className="mx-auto max-h-[74svh] w-auto rounded-xl bg-black"
      />
    );
  }

  const embed = source ? embedUrl(source) : null;
  if (embed) {
    return (
      <div className="mx-auto aspect-video max-h-[74svh] w-full overflow-hidden rounded-xl bg-black">
        <iframe
          key={item.id}
          src={embed}
          title={item.alt || item.caption}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="size-full"
        />
      </div>
    );
  }

  return (
    <p className="py-16 text-center text-sm text-mute">
      This video cannot be played here.{' '}
      <a href={item.src} target="_blank" rel="noopener noreferrer" className="text-yellow underline">
        Open it directly
      </a>
      .
    </p>
  );
}
