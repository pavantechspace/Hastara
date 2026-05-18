import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@hastara/core', '@hastara/api', '@hastara/ui', '@hastara/db'],
};

export default nextConfig;
