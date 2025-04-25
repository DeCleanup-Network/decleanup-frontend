import type { NextConfig } from 'next'

const config: NextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx'],
  transpilePackages: ['next-mdx-remote'],
  output: 'export',
  images: { unoptimized: true },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}
export default config
