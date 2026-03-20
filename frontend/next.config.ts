import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "i.pinimg.com" },
      { hostname: "image.pollinations.ai" },
    ],
  },
};

export default nextConfig;