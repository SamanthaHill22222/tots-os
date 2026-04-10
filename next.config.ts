import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This silences the "Turbopack vs Webpack" error
  turbopack: {}, 

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
        canvas: false,
      };
    }
    return config;
  },
};

export default nextConfig;