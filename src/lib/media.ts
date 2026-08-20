/**
 * Browser-only helpers used by the gallery manager. Natural dimensions are
 * recorded at upload time so the public grid can reserve the right space, and
 * videos get a still frame captured from the file itself rather than needing a
 * server-side transcode.
 */

export type Measured = { width: number | null; height: number | null };

export function isImage(file: File): boolean {
  return file.type.startsWith('image/');
}

export function isVideo(file: File): boolean {
  return file.type.startsWith('video/');
}

export async function measureImage(file: File): Promise<Measured> {
  const url = URL.createObjectURL(file);
  try {
    const size = await new Promise<Measured>((resolve) => {
      const img = new Image();
      img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
      img.onerror = () => resolve({ width: null, height: null });
      img.src = url;
    });
    return size;
  } finally {
    URL.revokeObjectURL(url);
  }
}

/**
 * Seeks a little way into the clip and paints that frame to a canvas. Returns a
 * null poster if the browser cannot decode the file (some .mov codecs) — the
 * tile then falls back to the video element's own first frame.
 */
export async function captureVideoPoster(
  file: File,
): Promise<Measured & { poster: Blob | null }> {
  const url = URL.createObjectURL(file);
  const video = document.createElement('video');
  video.muted = true;
  video.playsInline = true;
  video.preload = 'auto';
  video.src = url;

  try {
    const dims = await new Promise<Measured>((resolve, reject) => {
      const timeout = window.setTimeout(() => reject(new Error('timed out')), 15000);
      video.onloadedmetadata = () => {
        window.clearTimeout(timeout);
        resolve({ width: video.videoWidth || null, height: video.videoHeight || null });
      };
      video.onerror = () => {
        window.clearTimeout(timeout);
        reject(new Error('could not read the video'));
      };
    });

    const target = Number.isFinite(video.duration) ? Math.min(1, video.duration * 0.25) : 0;
    await new Promise<void>((resolve, reject) => {
      const timeout = window.setTimeout(() => reject(new Error('seek timed out')), 15000);
      video.onseeked = () => {
        window.clearTimeout(timeout);
        resolve();
      };
      video.onerror = () => {
        window.clearTimeout(timeout);
        reject(new Error('could not seek the video'));
      };
      video.currentTime = target;
    });

    const canvas = document.createElement('canvas');
    canvas.width = dims.width ?? 1280;
    canvas.height = dims.height ?? 720;
    const ctx = canvas.getContext('2d');
    if (!ctx) return { ...dims, poster: null };
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const poster = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob((b) => resolve(b), 'image/jpeg', 0.82),
    );
    return { ...dims, poster };
  } catch (err) {
    console.warn('[gallery] could not capture a poster frame:', err);
    return { width: null, height: null, poster: null };
  } finally {
    video.removeAttribute('src');
    video.load();
    URL.revokeObjectURL(url);
  }
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
