import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  reactCompiler: true,

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
