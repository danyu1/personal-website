import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['react-plotly.js'],
  },
};

export default nextConfig;
