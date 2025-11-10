import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable Cache Components (includes Partial Prerendering)
  cacheComponents: true,
  // Define custom cache profiles for different durations
  cacheLife: {
    '10-seconds': {
      stale: 10, // Consider stale after 10 seconds
      revalidate: 10, // Revalidate every 10 seconds
      expire: 60, // Expire after 60 seconds (fallback)
    },
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
};

export default nextConfig;
