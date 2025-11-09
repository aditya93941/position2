import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
