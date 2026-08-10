import path from 'node:path';
import { fileURLToPath } from 'node:url';

// `import.meta.dirname` only exists on Node >= 20.11, and Vercel projects can be
// pinned to an older runtime. Derive it the portable way instead.
const here = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // The parent SocialBridge folder also has a lockfile; pin the root to this app.
  outputFileTracingRoot: here,
  trailingSlash: true,
  images: {
    // `next export` ships no image optimisation server, so serve the originals.
    unoptimized: true,
  },
};

export default nextConfig;
