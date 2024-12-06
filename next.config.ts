import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  trailingSlash: true, // Si tu veux des URL avec un slash à la fin
};

export default nextConfig;
