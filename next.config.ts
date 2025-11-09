import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable experimental cache components (Next.js 16)
  // Uncomment to use 'use cache' directive:
  // experimental: {
  //   cacheComponents: true,
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dev-wpheadless.pantheonsite.io",
      },
      {
        protocol: "https",
        hostname: "www.position2.com",
      },
    ],
  },
  // Cache-Control headers for CDN caching
  async headers() {
    return [
      {
        // Apply to all routes
        source: "/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, s-maxage=60, stale-while-revalidate=300",
          },
        ],
      },
      {
        // Static assets - longer cache
        source: "/:path*\\.(js|css|jpg|jpeg|png|gif|svg|ico|woff|woff2|ttf|eot)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Images - medium cache
        source: "/:path*\\.(jpg|jpeg|png|gif|svg|webp|avif)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, s-maxage=86400, stale-while-revalidate=3600",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
