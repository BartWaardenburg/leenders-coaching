import type { NextConfig } from 'next';
import withBundleAnalyzer from '@next/bundle-analyzer';
import { StatsWriterPlugin } from 'webpack-stats-plugin';

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
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
  webpack: (config, { dev, isServer }) => {
    if (!dev && process.env.ANALYZE_JSON === 'true') {
      console.log(
        `Adding StatsWriterPlugin for ${isServer ? 'server' : 'client'} build`
      );
      // Server -> .next/analyze/server-stats.json
      // Client -> .next/static/analyze/client-stats.json
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

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
  analyzerMode: 'static',
  openAnalyzer: false,
});

export default bundleAnalyzer(nextConfig);
