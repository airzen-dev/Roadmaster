'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { GalleryItem } from '@/data/gallery';
import {
  createLinkedItem,
  createUploadedItem,
  deleteItem,
  fetchGallery,
  saveOrder,
  signOut,
  updateItem,
} from '@/lib/gallery-store';
import { MAX_UPLOAD_BYTES } from '@/lib/appwrite-config';
import { captureVideoPoster, formatBytes, isImage, isVideo, measureImage } from '@/lib/media';
import { autoPoster, fetchVimeoPoster, parseVideoSource } from '@/lib/video';
import { ArrowRight, Film, Link2, Play, Trash, Upload } from '../Icons';

/** "workshop-bay-02.jpg" -> "Workshop bay 02", so nothing lands with a blank caption. */
function captionFromName(name: string): string {
  const stem = name.replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' ').trim();
  return stem ? stem.charAt(0).toUpperCase() + stem.slice(1) : 'Untitled';
}

function message(err: unknown): string {
  return err instanceof Error ? err.message : String(err);
}

export default function GalleryManager() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const fileInput = useRef<HTMLInputElement>(null);

  const reload = useCallback(async () => {
    const live = await fetchGallery();
    setItems(live ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  /* ------------------------------------------------------------- uploading */

  async function handleFiles(fileList: FileList | null) {
    const files = Array.from(fileList ?? []);
    if (!files.length) return;

    setErrors([]);
    setNotice(null);
    const failures: string[] = [];
    let added = 0;
    let next = items;

    for (const [index, file] of files.entries()) {
      if (file.size > MAX_UPLOAD_BYTES) {
        // Caught here rather than mid-upload, where the API error is opaque.
        failures.push(
          `${file.name} is ${formatBytes(file.size)}. The limit is ${formatBytes(MAX_UPLOAD_BYTES)} — add long video as a YouTube link instead.`,
        );
        continue;
      }

      setBusy(`Uploading ${index + 1} of ${files.length} — ${file.name} (${formatBytes(file.size)})`);
      try {
        if (isImage(file)) {
          const { width, height } = await measureImage(file);
          const created = await createUploadedItem({
            file,
            kind: 'image',
            alt: captionFromName(file.name),
            caption: captionFromName(file.name),
            width,
            height,
            sortOrder: next.length,
          });
          next = [...next, created];
        } else if (isVideo(file)) {
          setBusy(`Reading ${file.name}…`);
          const { width, height, poster } = await captureVideoPoster(file);
          setBusy(`Uploading ${index + 1} of ${files.length} — ${file.name} (${formatBytes(file.size)})`);
          const created = await createUploadedItem({
            file,
            kind: 'video',
            alt: captionFromName(file.name),
            caption: captionFromName(file.name),
            width,
            height,
            poster,
            sortOrder: next.length,
          });
          next = [...next, created];
        } else {
          failures.push(`${file.name} is not an image or a video.`);
          continue;
        }
        added += 1;
        setItems(next);
      } catch (err) {
        failures.push(message(err));
      }
    }

    // `sort_order` develops gaps as items are deleted, so an appended item can
    // land mid-list. Renumbering the batch once puts it where it belongs.
    if (added) {
      try {
        await saveOrder(next);
      } catch (err) {
        failures.push(message(err));
      }
    }

    setBusy(null);
    setErrors(failures);
    if (added) setNotice(`${added} item${added === 1 ? '' : 's'} added. Captions can be edited below.`);
    if (fileInput.current) fileInput.current.value = '';
  }

  /* ---------------------------------------------------------- linked videos */

  const [link, setLink] = useState('');
  const [linkCaption, setLinkCaption] = useState('');

  async function addLink(e: React.FormEvent) {
    e.preventDefault();
    setErrors([]);
    setNotice(null);

    const source = parseVideoSource(link);
    if (!source) {
      setErrors(['That is not a YouTube, Vimeo, or direct .mp4 link.']);
      return;
    }

    setBusy('Adding video…');
    try {
      const poster =
        source.provider === 'vimeo' ? await fetchVimeoPoster(source.id) : autoPoster(source);
      const caption = linkCaption.trim() || 'Roadmaster Tyre Services video';
      const created = await createLinkedItem({
        src: link.trim(),
        poster,
        alt: caption,
        caption,
        sortOrder: items.length,
      });
      const next = [...items, created];
      setItems(next);
      await saveOrder(next);
      setLink('');
      setLinkCaption('');
      setNotice('Video added.');
    } catch (err) {
      setErrors([message(err)]);
    } finally {
      setBusy(null);
    }
  }

  /* ------------------------------------------------------------- edit, move */

  async function saveField(item: GalleryItem, patch: Partial<GalleryItem>) {
    setItems((list) => list.map((it) => (it.id === item.id ? { ...it, ...patch } : it)));
    try {
      await updateItem(item.id, patch as { alt?: string; caption?: string });
    } catch (err) {
      setErrors([message(err)]);
    }
  }

  async function move(from: number, to: number) {
    if (to < 0 || to >= items.length || from === to) return;
    const next = [...items];
    const [row] = next.splice(from, 1);
    next.splice(to, 0, row);
    setItems(next);
    try {
      await saveOrder(next);
    } catch (err) {
      setErrors([message(err)]);
      void reload();
    }
  }

  async function remove(item: GalleryItem) {
    const confirmed = window.confirm(
      `Remove "${item.caption}" from the gallery?\n\nThis deletes it from the website and cannot be undone.`,
    );
    if (!confirmed) return;

    setBusy('Removing…');
    setErrors([]);
    try {
      await deleteItem(item);
      setItems((list) => list.filter((it) => it.id !== item.id));
      setNotice('Item removed.');
    } catch (err) {
      setErrors([message(err)]);
    } finally {
      setBusy(null);
    }
  }

  /* ------------------------------------------------------------------ render */

  return (
    <div>
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <p className="eyebrow">Gallery manager</p>
          <h1 className="mt-3 text-[clamp(1.6rem,4vw,2.25rem)] leading-tight uppercase">
            Photos &amp; videos
          </h1>
          <p className="mt-2 text-[0.875rem] text-mute">
            {loading ? 'Loading…' : `${items.length} item${items.length === 1 ? '' : 's'} live on the site.`}
          </p>
        </div>
        <button
          type="button"
          onClick={() => void signOut()}
          className="h-11 rounded-full border border-white/25 px-5 font-display text-[0.75rem] font-bold tracking-[0.12em] text-chalk uppercase transition-colors hover:border-yellow hover:text-yellow"
        >
          Sign out
        </button>
      </header>

      {/* Add */}
      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <label
          className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/20 bg-ink-800 px-6 py-10 text-center transition-colors hover:border-yellow/60"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            void handleFiles(e.dataTransfer.files);
          }}
        >
          <span className="grid size-11 place-items-center rounded-full border border-white/12 text-yellow">
            <Upload className="size-5" />
          </span>
          <span className="font-display text-[0.8125rem] font-bold tracking-[0.12em] text-chalk uppercase">
            Upload photos or videos
          </span>
          <span className="max-w-xs text-[0.8125rem] leading-relaxed text-mute-dim">
            Drag files here or click to browse. You can pick several at once. Each file must be
            under 50 MB — for longer video, use a YouTube link instead.
          </span>
          <input
            ref={fileInput}
            type="file"
            accept="image/*,video/*"
            multiple
            className="sr-only"
            onChange={(e) => void handleFiles(e.target.files)}
          />
        </label>

        <form
          onSubmit={addLink}
          className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-ink-800 p-6"
        >
          <span className="flex items-center gap-2.5 font-display text-[0.8125rem] font-bold tracking-[0.12em] text-chalk uppercase">
            <Link2 className="size-4 text-yellow" />
            Add a video by link
          </span>
          <p className="text-[0.8125rem] leading-relaxed text-mute-dim">
            A YouTube or Vimeo URL. Costs no storage and plays anywhere.
          </p>
          <input
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=…"
            className="h-11 w-full rounded-lg border border-white/12 bg-ink px-3.5 text-[0.875rem] text-chalk placeholder:text-mute-dim focus:border-yellow focus:outline-none"
          />
          <input
            type="text"
            value={linkCaption}
            onChange={(e) => setLinkCaption(e.target.value)}
            placeholder="Caption"
            className="h-11 w-full rounded-lg border border-white/12 bg-ink px-3.5 text-[0.875rem] text-chalk placeholder:text-mute-dim focus:border-yellow focus:outline-none"
          />
          <button
            type="submit"
            disabled={!link.trim()}
            className="mt-auto h-11 rounded-full bg-yellow font-display text-[0.75rem] font-bold tracking-[0.12em] text-ink uppercase transition-colors hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-45"
          >
            Add video
          </button>
        </form>
      </div>

      {/* Status */}
      {busy && (
        <p
          role="status"
          className="mt-5 rounded-lg border border-yellow/30 bg-yellow/10 px-4 py-3 text-[0.875rem] text-yellow"
        >
          {busy}
        </p>
      )}
      {notice && !busy && (
        <p
          role="status"
          className="mt-5 rounded-lg border border-white/12 bg-ink-800 px-4 py-3 text-[0.875rem] text-mute"
        >
          {notice}
        </p>
      )}
      {errors.length > 0 && (
        <ul
          role="alert"
          className="mt-5 space-y-1 rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-3 text-[0.875rem] text-red-200"
        >
          {errors.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      )}

      {/* List */}
      <div className="mt-10 space-y-3">
        {!loading && items.length === 0 && (
          <p className="rounded-2xl border border-white/10 bg-ink-800 px-6 py-10 text-center text-[0.9375rem] text-mute">
            The gallery is empty. Upload something above, or run{' '}
            <code className="text-yellow">node scripts/seed-gallery.mjs</code> to load the original
            photos.
          </p>
        )}

        {items.map((item, index) => (
          <Row
            key={item.id}
            item={item}
            index={index}
            total={items.length}
            onSave={saveField}
            onMove={move}
            onRemove={remove}
          />
        ))}
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------- row */

function Row({
  item,
  index,
  total,
  onSave,
  onMove,
  onRemove,
}: {
  item: GalleryItem;
  index: number;
  total: number;
  onSave: (item: GalleryItem, patch: Partial<GalleryItem>) => void;
  onMove: (from: number, to: number) => void;
  onRemove: (item: GalleryItem) => void;
}) {
  const [caption, setCaption] = useState(item.caption);
  const [alt, setAlt] = useState(item.alt);

  // Keep the inputs in step when a reorder re-renders the list.
  useEffect(() => {
    setCaption(item.caption);
    setAlt(item.alt);
  }, [item.caption, item.alt]);

  const thumb = item.kind === 'video' ? item.poster : item.src;

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-ink-800 p-4 sm:flex-row sm:items-start">
      <div className="relative aspect-4/3 w-full shrink-0 overflow-hidden rounded-lg bg-ink sm:w-32">
        {thumb ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={thumb} alt="" className="size-full object-cover" loading="lazy" />
        ) : (
          <span className="grid size-full place-items-center text-mute-dim">
            <Film className="size-6" />
          </span>
        )}
        {item.kind === 'video' && (
          <span
            aria-hidden
            className="absolute inset-0 grid place-items-center bg-ink/35"
          >
            <Play className="size-5 text-yellow" />
          </span>
        )}
      </div>

      <div className="min-w-0 flex-1 space-y-2.5">
        <div className="flex items-center gap-2">
          <span className="font-display text-[0.625rem] font-bold tracking-[0.16em] text-mute-dim uppercase">
            {index + 1}
          </span>
          <span className="rounded-full border border-white/12 px-2 py-0.5 font-display text-[0.625rem] font-bold tracking-[0.14em] text-mute uppercase">
            {item.kind}
          </span>
          {!item.storagePath && item.kind === 'video' && (
            <span className="text-[0.6875rem] text-mute-dim">linked</span>
          )}
        </div>

        <LabelledInput
          label="Caption"
          value={caption}
          onChange={setCaption}
          onCommit={() => caption !== item.caption && onSave(item, { caption })}
        />
        <LabelledInput
          label="Alt text (for screen readers)"
          value={alt}
          onChange={setAlt}
          onCommit={() => alt !== item.alt && onSave(item, { alt })}
        />
      </div>

      <div className="flex shrink-0 items-center gap-1.5 sm:flex-col">
        <IconButton
          label="Move up"
          disabled={index === 0}
          onClick={() => onMove(index, index - 1)}
        >
          <ArrowRight className="size-4 -rotate-90" />
        </IconButton>
        <IconButton
          label="Move down"
          disabled={index === total - 1}
          onClick={() => onMove(index, index + 1)}
        >
          <ArrowRight className="size-4 rotate-90" />
        </IconButton>
        <IconButton
          label="Move to the front"
          disabled={index === 0}
          onClick={() => onMove(index, 0)}
        >
          <span className="font-display text-[0.5625rem] font-bold tracking-wider">TOP</span>
        </IconButton>
        <IconButton label="Remove" destructive onClick={() => onRemove(item)}>
          <Trash className="size-4" />
        </IconButton>
      </div>
    </div>
  );
}

function LabelledInput({
  label,
  value,
  onChange,
  onCommit,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onCommit: () => void;
}) {
  return (
    <label className="block">
      <span className="font-display text-[0.625rem] font-bold tracking-[0.16em] text-mute-dim uppercase">
        {label}
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onCommit}
        onKeyDown={(e) => {
          if (e.key === 'Enter') e.currentTarget.blur();
        }}
        className="mt-1 h-10 w-full rounded-lg border border-white/12 bg-ink px-3 text-[0.875rem] text-chalk focus:border-yellow focus:outline-none"
      />
    </label>
  );
}

function IconButton({
  label,
  children,
  onClick,
  disabled,
  destructive,
}: {
  label: string;
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  destructive?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={label}
      aria-label={label}
      className={`grid size-9 shrink-0 place-items-center rounded-lg border border-white/12 transition-colors disabled:opacity-30 ${
        destructive
          ? 'text-mute hover:border-red-400/50 hover:text-red-300'
          : 'text-mute hover:border-yellow hover:text-yellow'
      }`}
    >
      {children}
    </button>
  );
}
