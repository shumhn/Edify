import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Stub optional peer deps from @standard-community/standard-json
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      effect: false,
      sury: false,
      "@valibot/to-json-schema": false,
    };
    return config;
  },
  // Enable default Turbopack configuration to silence conflicts with webpack config
  turbopack: {},
};

export default nextConfig;
