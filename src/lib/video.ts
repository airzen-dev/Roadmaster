/** A video item is either a file we host in Appwrite storage, or a link. */
export type VideoSource =
  | { provider: 'file'; url: string }
  | { provider: 'youtube'; id: string }
  | { provider: 'vimeo'; id: string };

const YT_HOSTS = ['youtube.com', 'www.youtube.com', 'm.youtube.com', 'music.youtube.com'];

/**
 * Accepts what someone would realistically paste: a youtu.be short link, a
 * full watch URL, a /shorts/ or /embed/ URL, a Vimeo page, or a direct link to
 * an .mp4 / .webm / .mov file.
 */
export function parseVideoSource(raw: string): VideoSource | null {
  const value = raw.trim();
  if (!value) return null;

  // Tolerate a pasted "youtube.com/watch?v=..." with the scheme left off.
  const withScheme = /^[a-z][a-z0-9+.-]*:\/\//i.test(value) ? value : `https://${value}`;

  let u: URL;
  try {
    u = new URL(withScheme);
  } catch {
    return null;
  }
  if (u.protocol !== 'https:' && u.protocol !== 'http:') return null;

  const host = u.hostname.toLowerCase();

  if (host === 'youtu.be') {
    const id = u.pathname.slice(1).split('/')[0];
    return id ? { provider: 'youtube', id } : null;
  }
  if (YT_HOSTS.includes(host)) {
    const fromQuery = u.searchParams.get('v');
    if (fromQuery) return { provider: 'youtube', id: fromQuery };
    const m = u.pathname.match(/\/(?:embed|shorts|live|v)\/([^/?#]+)/);
    return m ? { provider: 'youtube', id: m[1] } : null;
  }
  if (host === 'vimeo.com' || host === 'www.vimeo.com' || host === 'player.vimeo.com') {
    const m = u.pathname.match(/(\d{6,})/);
    return m ? { provider: 'vimeo', id: m[1] } : null;
  }

  if (/\.(mp4|webm|ogv|mov|m4v)(\?|#|$)/i.test(u.pathname)) {
    return { provider: 'file', url: u.toString() };
  }
  return null;
}

export function embedUrl(source: VideoSource): string | null {
  if (source.provider === 'youtube') {
    return `https://www.youtube-nocookie.com/embed/${source.id}?autoplay=1&rel=0&modestbranding=1`;
  }
  if (source.provider === 'vimeo') {
    return `https://player.vimeo.com/video/${source.id}?autoplay=1&dnt=1`;
  }
  return null;
}

/** YouTube exposes predictable thumbnail URLs, so linked videos get a tile for free. */
export function autoPoster(source: VideoSource): string | null {
  return source.provider === 'youtube'
    ? `https://i.ytimg.com/vi/${source.id}/hqdefault.jpg`
    : null;
}

/** Vimeo has no predictable thumbnail URL, but its oEmbed endpoint allows CORS. */
export async function fetchVimeoPoster(id: string): Promise<string | null> {
  try {
    const res = await fetch(`https://vimeo.com/api/oembed.json?url=https://vimeo.com/${id}`);
    if (!res.ok) return null;
    const body = (await res.json()) as { thumbnail_url?: unknown };
    return typeof body.thumbnail_url === 'string' ? body.thumbnail_url : null;
  } catch {
    return null;
  }
}
