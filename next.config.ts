import type { NextConfig } from "next";
import { cities } from "./lib/content/cities";

/**
 * Gold Sohn – Next.js configuration
 *
 * - trailingSlash: the existing WordPress site uses URLs with a trailing slash
 *   (e.g. /goldankauf/). Keeping it avoids redirect chains and preserves rankings.
 * - City pages keep their historic flat URLs (/goldankauf-wiesbaden/). They are
 *   rendered by app/standorte/[city] through a rewrite (see docs/SEO-MIGRATION.md).
 */
const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  trailingSlash: true,
  poweredByHeader: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
  },
  async rewrites() {
    // One explicit rewrite per known city: /goldankauf-wiesbaden/ → app/standorte/[city].
    // Unknown /goldankauf-xyz/ URLs therefore return a real 404 (no soft 404s).
    return cities.map((c) => ({ source: `/goldankauf-${c.slug}/`, destination: `/standorte/${c.slug}/` }));
  },
  async redirects() {
    return [
      // Note: /FAQ/ → /faq/ is handled in proxy.ts (redirect sources here are case-insensitive).
      // Friendly German aliases for new navigation labels
      { source: "/kontakt/", destination: "/contact/", permanent: true },
      { source: "/ueber-uns/", destination: "/about/", permanent: true },
      { source: "/edelmetallpreise/", destination: "/preise/", permanent: true },
      // The internal city route must never compete with the canonical flat URL
      { source: "/standorte/:city/", destination: "/goldankauf-:city/", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
