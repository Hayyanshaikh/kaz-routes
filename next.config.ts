import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Agar Next.js < 13 hai
    // domains: ['images.unsplash.com', 'yourdomain.com'],

    // Next.js 13+ ke liye recommended:
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**", // Ya specific path agar zaroorat ho
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/**", // Ya specific path agar zaroorat ho
      },
      {
        protocol: "http",
        hostname: "kaz-routes.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "kaz-routes.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "kaz-routes-demo.vercel.app",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "kaz-routes-demo.vercel.app",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/**",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
