import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [{ hostname: "*" }],
  },
  /* config options here */
};

export default nextConfig;
