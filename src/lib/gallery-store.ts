import { AppwriteException, ID, Query } from 'appwrite';
import type { GalleryItem, MediaKind } from '@/data/gallery';
import { getAccount, getFiles, getTables } from './appwrite';
import {
  ADMIN_EMAIL,
  DATABASE_ID,
  GALLERY_BUCKET_ID,
  GALLERY_TABLE_ID,
} from './appwrite-config';

/**
 * The columns of the `gallery_items` table. `storagePath` and `posterPath` hold
 * Appwrite *file ids*, not paths — the name is kept so the public GalleryItem
 * shape stays storage-agnostic.
 */
type RowData = Omit<GalleryItem, 'id'> & { sortOrder: number };

function notConfigured(): never {
  throw new Error(
    'Appwrite is not configured. Set the NEXT_PUBLIC_APPWRITE_* values and rebuild.',
  );
}

const tables = () => getTables() ?? notConfigured();
const files = () => getFiles() ?? notConfigured();
const account = () => getAccount() ?? notConfigured();

const table = { databaseId: DATABASE_ID, tableId: GALLERY_TABLE_ID };

/* ----------------------------------------------------------------- reading */

/** Authenticated read used by the manager. Public pages use `gallery-read.ts`. */
export async function fetchGallery(): Promise<GalleryItem[] | null> {
  const db = getTables();
  if (!db) return null;
  try {
    const { rows } = await db.listRows({
      ...table,
      queries: [Query.limit(300), Query.orderAsc('sortOrder')],
    });
    return rows.map((row) => ({
      id: row.$id,
      kind: (row.kind === 'video' ? 'video' : 'image') as MediaKind,
      src: String(row.src ?? ''),
      poster: (row.poster as string | null) ?? null,
      alt: String(row.alt ?? ''),
      caption: String(row.caption ?? ''),
      width: (row.width as number | null) ?? null,
      height: (row.height as number | null) ?? null,
      storagePath: (row.storagePath as string | null) ?? null,
      posterPath: (row.posterPath as string | null) ?? null,
    }));
  } catch (err) {
    console.warn('[gallery] could not load items:', err);
    return null;
  }
}

/* -------------------------------------------------------------------- auth */

/**
 * Appwrite has no auth-state stream, so the store keeps its own listener list
 * and notifies it after a successful sign in or out. That way the studio shell
 * reacts the same way it would to a real subscription.
 */
const listeners = new Set<(signedIn: boolean) => void>();

function announce(signedIn: boolean) {
  for (const listener of listeners) listener(signedIn);
}

export async function signIn(username: string, password: string) {
  // The single admin account is addressed by username in the UI; map it to its email.
  const email = username.includes('@') ? username.trim() : ADMIN_EMAIL;
  try {
    await account().createEmailPasswordSession({ email, password });
  } catch (err) {
    if (err instanceof AppwriteException && err.type === 'user_session_already_exists') {
      announce(true);
      return;
    }
    throw new Error('Those details were not accepted. Check the username and password.');
  }
  announce(true);
}

export async function signOut() {
  try {
    await account().deleteSession({ sessionId: 'current' });
  } finally {
    announce(false);
  }
}

/** Calls back with the current state, then on every sign in / out. */
export function watchAuth(onChange: (signedIn: boolean) => void): () => void {
  const instance = getAccount();
  if (!instance) return () => {};

  listeners.add(onChange);
  instance
    .get()
    .then(() => onChange(true))
    .catch(() => onChange(false));

  return () => listeners.delete(onChange);
}

/* ------------------------------------------------------------------ writing */

/** Appwrite file ids allow [a-zA-Z0-9._-], must not start with a special char, max 36. */
function fileId(): string {
  return ID.unique();
}

function viewUrl(id: string): string {
  return files().getFileView({ bucketId: GALLERY_BUCKET_ID, fileId: id });
}

async function upload(blob: Blob, name: string): Promise<{ id: string; url: string }> {
  // The SDK types the upload as a File; a captured poster arrives as a Blob.
  const asFile =
    blob instanceof File ? blob : new File([blob], name, { type: blob.type || 'image/jpeg' });
  const created = await files().createFile({
    bucketId: GALLERY_BUCKET_ID,
    fileId: fileId(),
    file: asFile,
  });
  return { id: created.$id, url: viewUrl(created.$id) };
}

type NewUpload = {
  file: File;
  kind: MediaKind;
  alt: string;
  caption: string;
  width: number | null;
  height: number | null;
  /** A still frame captured in the browser, for videos. */
  poster?: Blob | null;
  sortOrder: number;
};

export async function createUploadedItem(input: NewUpload): Promise<GalleryItem> {
  const main = await upload(input.file, input.file.name);

  let poster: { id: string; url: string } | null = null;
  if (input.poster) {
    try {
      poster = await upload(input.poster, `${input.file.name}-poster.jpg`);
    } catch (err) {
      // A missing poster is cosmetic: the tile falls back to the video's own frame.
      console.warn('[gallery] poster upload failed:', err);
    }
  }

  return writeRow({
    kind: input.kind,
    src: main.url,
    poster: poster?.url ?? null,
    alt: input.alt,
    caption: input.caption,
    width: input.width,
    height: input.height,
    storagePath: main.id,
    posterPath: poster?.id ?? null,
    sortOrder: input.sortOrder,
  });
}

export async function createLinkedItem(input: {
  src: string;
  poster: string | null;
  alt: string;
  caption: string;
  sortOrder: number;
}): Promise<GalleryItem> {
  return writeRow({
    kind: 'video',
    src: input.src,
    poster: input.poster,
    alt: input.alt,
    caption: input.caption,
    // A linked video has no file to measure; 16:9 is what both players use.
    width: 1600,
    height: 900,
    storagePath: null,
    posterPath: null,
    sortOrder: input.sortOrder,
  });
}

async function writeRow(data: RowData): Promise<GalleryItem> {
  const row = await tables().createRow({ ...table, rowId: ID.unique(), data });
  return { id: row.$id, ...data };
}

export async function updateItem(
  id: string,
  patch: Partial<Pick<GalleryItem, 'alt' | 'caption'>>,
): Promise<void> {
  await tables().updateRow({ ...table, rowId: id, data: patch });
}

export async function deleteItem(item: GalleryItem): Promise<void> {
  await tables().deleteRow({ ...table, rowId: item.id });

  // The row is already gone, so a failure here only leaves an orphaned file.
  const ids = [item.storagePath, item.posterPath].filter((v): v is string => Boolean(v));
  for (const id of ids) {
    try {
      await files().deleteFile({ bucketId: GALLERY_BUCKET_ID, fileId: id });
    } catch (err) {
      console.warn('[gallery] file left behind in storage:', id, err);
    }
  }
}

/**
 * Renumbers the whole list. Every row is rewritten rather than only the ones
 * that moved, because `sortOrder` develops gaps as items are deleted and a
 * partial renumber could produce ties.
 */
export async function saveOrder(ordered: GalleryItem[]): Promise<void> {
  const db = tables();
  await Promise.all(
    ordered.map((item, index) =>
      db.updateRow({ ...table, rowId: item.id, data: { sortOrder: index } }),
    ),
  );
}
