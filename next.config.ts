import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  ...(process.env.NODE_ENV === "development" ? { distDir: ".next-dev" } : {}),
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
