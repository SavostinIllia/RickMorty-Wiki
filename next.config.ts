import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  
  /* config options here */
  images: {
    domains: ['rickandmortyapi.com'], // Add the allowed domains here
  },
  reactStrictMode: false,
};

export default nextConfig;
