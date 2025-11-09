import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Compiler options for modern browsers (removes unnecessary polyfills)
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? {
      exclude: ["error", "warn"],
    } : false,
  },
  // Optimize for modern browsers - reduces bundle size by removing polyfills
  experimental: {
    optimizePackageImports: ["lucide-react", "react-icons"],
  },
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
  // Turbopack configuration (Next.js 16 uses Turbopack by default)
  // Turbopack automatically handles code splitting and optimization better than webpack
  turbopack: {
    // Empty config to silence warning - Turbopack handles optimization automatically
  },
};

export default nextConfig;
