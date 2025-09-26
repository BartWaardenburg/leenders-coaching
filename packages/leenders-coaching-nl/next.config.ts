import type { NextConfig } from 'next';
import withBundleAnalyzer from '@next/bundle-analyzer';
import { StatsWriterPlugin } from 'webpack-stats-plugin';

/**
 * Next.js configuration for leenders-coaching-nl.
 * - Ignores ESLint errors during builds.
 * - Allows images from Sanity CDN.
 * - Sets cache headers for the /api/og endpoint.
 * - Optionally writes Webpack stats to JSON for bundle analysis.
 */
const nextConfig: NextConfig = {
  /**
   * Experimental configuration for modern browser optimization
   */
  experimental: {
    viewTransition: true,
    /**
     * Optimize package imports to reduce bundle size
     */
    optimizePackageImports: ['@sanity/image-url', '@portabletext/react'],
  },
  eslint: {
    /* Ignore ESLint errors during production builds */
    ignoreDuringBuilds: true,
  },
  /**
   * Optimize SWC for modern browsers
   * This reduces transpilation of ES2019+ features that are natively supported
   */
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    /* Allow remote images from Sanity CDN */
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  /**
   * Set custom HTTP headers for specific routes.
   * @returns {Promise<Array<{source: string, headers: Array<{key: string, value: string}>}>>}
   */
  headers: async () => {
    const isDevelopment = process.env.NODE_ENV === 'development';
    const studioUrl =
      process.env.NEXT_PUBLIC_SANITY_STUDIO_URL ||
      'https://studio.leenders-coaching.nl';

    return [
      {
        source: '/api/og',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/api/draft/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
          {
            key: 'Expires',
            value: '0',
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: isDevelopment
              ? `default-src 'self'; script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com https://*.cloudflare.com https://vercel.live; frame-src https://challenges.cloudflare.com https://*.cloudflare.com https://vercel.live; style-src 'self' 'unsafe-inline' https://challenges.cloudflare.com https://vercel.live; connect-src 'self' https://challenges.cloudflare.com https://*.cloudflare.com https://vercel.live; img-src 'self' data: https:; frame-ancestors 'self' http://localhost:* https://*.sanity.studio ${studioUrl} https://leenders-coaching.nl`
              : `default-src 'self'; script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com https://*.cloudflare.com; frame-src https://challenges.cloudflare.com https://*.cloudflare.com; style-src 'self' 'unsafe-inline' https://challenges.cloudflare.com; connect-src 'self' https://challenges.cloudflare.com https://*.cloudflare.com; img-src 'self' data: https:; frame-ancestors 'self' https://*.sanity.studio ${studioUrl} https://leenders-coaching.nl`,
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'X-Sanity-CORS',
            value: 'true',
          },
        ],
      },
    ];
  },
  /**
   * Customizes the Webpack configuration.
   * - If ANALYZE_JSON is 'true' and not in dev mode, writes Webpack stats to JSON.
   * @param {import('webpack').Configuration} config
   * @param {{ dev: boolean, isServer: boolean }} options
   * @returns {import('webpack').Configuration}
   */
  webpack: (config, { dev, isServer }) => {
    if (!dev && process.env.ANALYZE_JSON === 'true') {
      /* Write Webpack stats to JSON for bundle analysis */
      const filename = isServer
        ? '../analyze/server-stats.json'
        : 'analyze/client-stats.json';

      config.plugins = config.plugins || [];
      config.plugins.push(
        new StatsWriterPlugin({
          filename,
          stats: {
            assets: true,
            chunks: true,
            modules: true,
            entrypoints: true,
            source: false,
            reasons: false,
            chunkModules: false,
            children: false,
          },
        })
      );
    }
    return config;
  },
};

/**
 * Wraps the Next.js config with the bundle analyzer plugin.
 */
const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
  analyzerMode: 'static',
  openAnalyzer: false,
});

export default bundleAnalyzer(nextConfig);
