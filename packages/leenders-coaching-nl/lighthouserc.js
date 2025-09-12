/**
 * Lighthouse CI configuration for local development and package scripts.
 * - Uses mobile emulation and simulated throttling by default.
 * - Provides lenient assertion thresholds and increased timeouts for local runs.
 * - Skips flaky audits and uploads results to temporary public storage.
 * @see https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/configuration.md
 */
const lighthouseConfig = {
  ci: {
    collect: {
      /* URLs to test for local development and package.json scripts */
      url: [
        'http://localhost:3000',
        'http://localhost:3000/over-mij',
        'http://localhost:3000/aanpak',
        'http://localhost:3000/coaching',
        'http://localhost:3000/contact',
        'http://localhost:3000/blog'
      ],
      startServerCommand: 'pnpm start',
      startServerReadyPattern: 'Ready in',
      startServerReadyTimeout: 60000,
      numberOfRuns: 3,
      settings: {
        /* Mobile-first approach (GitHub Actions will use this) */
        emulatedFormFactor: 'mobile',
        throttling: {
          rttMs: 150,
          throughputKbps: 1638.4,
          cpuSlowdownMultiplier: 4
        },
        /* Chrome flags for CI environments */
        chromeFlags: '--no-sandbox --disable-dev-shm-usage --disable-background-timer-throttling --disable-features=VizDisplayCompositor',
        /* Skip some audits that can be flaky in local development */
        skipAudits: ['screenshot-thumbnails', 'final-screenshot'],
        /* Increased timeouts for local development */
        maxWaitForLoad: 30000,
        maxWaitForFcp: 15000,
        networkQuietThresholdMs: 2000,
        cpuQuietThresholdMs: 2000,
        /* Use simulated throttling for consistency */
        throttlingMethod: 'simulate'
      }
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        /* Core Web Vitals thresholds - warnings for local dev */
        'first-contentful-paint': ['warn', { maxNumericValue: 3000 }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 4000 }],
        'cumulative-layout-shift': ['warn', { maxNumericValue: 0.2 }],
        'total-blocking-time': ['warn', { maxNumericValue: 500 }],
        'speed-index': ['warn', { maxNumericValue: 5000 }],

        /* Category scores - more lenient for local development */
        'categories:performance': ['warn', { minScore: 0.6 }],
        'categories:accessibility': ['warn', { minScore: 0.9 }],
        'categories:seo': ['warn', { minScore: 0.8 }],
        'categories:best-practices': ['warn', { minScore: 0.8 }],

        /* Resource optimization audits - warnings for local dev */
        'uses-text-compression': 'warn',
        'uses-responsive-images': 'warn',
        'modern-image-formats': 'warn',
        'efficient-animated-content': 'warn',
        'unused-css-rules': 'warn',
        'unused-javascript': 'warn'
      }
    },
    upload: {
      /* Upload target for Lighthouse CI results */
      target: 'temporary-public-storage'
    }
  }
};

module.exports = lighthouseConfig;
