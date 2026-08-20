import type { GalleryItem, MediaKind } from '@/data/gallery';
import {
  APPWRITE_ENDPOINT,
  APPWRITE_PROJECT_ID,
  DATABASE_ID,
  GALLERY_TABLE_ID,
} from './appwrite-config';

/**
 * Public, read-only access to the gallery over the Appwrite REST API.
 *
 * Deliberately does NOT import the Appwrite SDK. The gallery is read on the home
 * page and the gallery page — the two most visited pages on the site — and
 * pulling an SDK into those bundles to fetch twenty rows is a poor trade. Table
 * permissions apply to REST requests exactly as they do to the SDK, so this is
 * no less safe.
 *
 * The admin side, which needs sessions and writes, uses the real SDK in
 * `gallery-store.ts`, and that only ever loads on /studio.
 */
export const galleryReadReady = Boolean(APPWRITE_ENDPOINT && APPWRITE_PROJECT_ID);

/** One row as Appwrite returns it: plain JSON columns plus `$id`. */
type Row = {
  $id?: string;
  kind?: string;
  src?: string;
  poster?: string | null;
  alt?: string;
  caption?: string;
  width?: number | null;
  height?: number | null;
  storagePath?: string | null;
  posterPath?: string | null;
  sortOrder?: number | null;
};

export async function fetchPublicGallery(): Promise<GalleryItem[] | null> {
  if (!galleryReadReady) return null;

  const url = new URL(
    `${APPWRITE_ENDPOINT}/tablesdb/${DATABASE_ID}/tables/${GALLERY_TABLE_ID}/rows`,
  );
  // Appwrite defaults to 25 rows, so the limit is not optional.
  url.searchParams.append('queries[]', JSON.stringify({ method: 'limit', values: [300] }));
  url.searchParams.append(
    'queries[]',
    JSON.stringify({ method: 'orderAsc', attribute: 'sortOrder' }),
  );

  try {
    const res = await fetch(url, { headers: { 'X-Appwrite-Project': APPWRITE_PROJECT_ID } });
    if (!res.ok) {
      console.warn('[gallery] could not load items:', res.status, res.statusText);
      return null;
    }
    const body = (await res.json()) as { rows?: Row[] };

    return (body.rows ?? [])
      .filter((row) => row.$id && row.src)
      .map((row) => ({
        id: row.$id as string,
        kind: (row.kind === 'video' ? 'video' : 'image') as MediaKind,
        src: row.src as string,
        poster: row.poster ?? null,
        alt: row.alt ?? '',
        caption: row.caption ?? '',
        width: row.width ?? null,
        height: row.height ?? null,
        storagePath: row.storagePath ?? null,
        posterPath: row.posterPath ?? null,
      }));
  } catch (err) {
    console.warn('[gallery] could not load items:', err);
    return null;
  }
}
