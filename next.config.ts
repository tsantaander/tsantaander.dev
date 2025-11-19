import type { NextConfig } from 'next'
import { withPayload } from '@payloadcms/next/withPayload'
import million from "million/compiler";

// Configuración de patrones remotos
const getRemotePatterns = () => {
  const patterns = [
    // Localhost
    {
      protocol: 'http' as const,
      hostname: 'localhost',
    },
    {
      protocol: 'https' as const,
      hostname: 'localhost',
    },
    // Vercel deployments
    {
      protocol: 'https' as const,
      hostname: 'tsantaander-dev.vercel.app',
    },
    {
      protocol: 'https' as const,
      hostname: 'www.tsantaander-dev.vercel.app',
    },
  ]

  // Agregar URL del servidor desde variables de entorno
  if (process.env.NEXT_PUBLIC_SERVER_URL) {
    try {
      const url = new URL(process.env.NEXT_PUBLIC_SERVER_URL)
      patterns.push({
        protocol: url.protocol.replace(':', '') as 'http' | 'https',
        hostname: url.hostname,
      })
    } catch (e) {
      console.error('Invalid NEXT_PUBLIC_SERVER_URL:', process.env.NEXT_PUBLIC_SERVER_URL)
    }
  }

  // Agregar URL de blob storage
  if (process.env.NEXT_PUBLIC_BLOB_BASE_URL) {
    try {
      const url = new URL(process.env.NEXT_PUBLIC_BLOB_BASE_URL)
      patterns.push({
        protocol: 'https',
        hostname: url.hostname,
      })
    } catch (e) {
      console.error('Invalid NEXT_PUBLIC_BLOB_BASE_URL:', process.env.NEXT_PUBLIC_BLOB_BASE_URL)
    }
  }

  return patterns
}

const nextConfig: NextConfig = {
  serverExternalPackages: ['payload'],
  images: {
    remotePatterns: getRemotePatterns(),
    unoptimized: true,
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
}

const millionConfig = {
  auto: {
    rsc: true, // Next.js 13+ con React Server Components
  },
}

// Aplicar Million.js primero, luego Payload
// @ts-ignore - Million.js tiene conflictos de tipos con NextConfig
const configWithMillion = million.next(nextConfig, millionConfig)
export default withPayload(configWithMillion)