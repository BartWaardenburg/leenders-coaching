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
  eslint: {
    /* Ignore ESLint errors during production builds */
    ignoreDuringBuilds: true,
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
