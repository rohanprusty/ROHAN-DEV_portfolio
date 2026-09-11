import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['172.16.0.2'],
  images: {
    qualities: [75, 100],
  },
};

export default nextConfig;
