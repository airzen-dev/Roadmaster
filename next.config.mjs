/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // The parent SocialBridge folder also has a lockfile; pin the root to this app.
  outputFileTracingRoot: import.meta.dirname,
  trailingSlash: true,
  images: {
    // `next export` ships no image optimisation server, so serve the originals.
    unoptimized: true,
  },
};

export default nextConfig;
