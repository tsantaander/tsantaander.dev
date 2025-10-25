/** @type {import('next').NextConfig} */
import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['payload'],
  },
  images: {
    domains: [
      'localhost',
      '127.0.0.1',
      process.env.NEXT_PUBLIC_SERVER_URL?.replace('http://', '').replace('https://', '').replace(':3000', '') || 'localhost'
    ].filter(Boolean),
    unoptimized: true,
  },
  // Serve static files from media directory
  async rewrites() {
    return [
      {
        source: '/media/:path*',
        destination: '/api/media/file/:path*',
      },
    ]
  },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  webpack(config: any) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule: any) =>
      rule.test?.test?.('.svg'),
    )

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      },
    )

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i

    return config
  },
};    
export default withPayload(nextConfig);