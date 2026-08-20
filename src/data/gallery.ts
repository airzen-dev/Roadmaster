import seed from './gallery.json';

export type MediaKind = 'image' | 'video';

export type GalleryItem = {
  /** Stable id. Seed rows use readable slugs; uploads get a generated id. */
  id: string;
  kind: MediaKind;
  /** Image src, video file URL, or a YouTube / Vimeo watch URL. */
  src: string;
  /** Still frame for the grid tile. Videos fall back to their own first frame. */
  poster?: string | null;
  alt: string;
  caption: string;
  /** Natural pixel size, so the masonry grid reserves the right space up front. */
  width?: number | null;
  height?: number | null;
  /** Handle for the file in storage (an Appwrite file id), for uploads only. */
  storagePath?: string | null;
  posterPath?: string | null;
};

/**
 * The photos shipped with the build. `gallery.json` is also what
 * `scripts/setup-appwrite.mjs` seeds into Appwrite, so the static render and the
 * database agree until someone edits the gallery in /studio.
 */
export const gallery: GalleryItem[] = seed as GalleryItem[];
