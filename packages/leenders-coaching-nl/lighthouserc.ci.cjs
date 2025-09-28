/**
 * Lighthouse CI configuration for leenders-coaching-nl.
 * - Sets up collection, assertion, and upload settings for CI runs.
 * - Uses environment variables to determine form factor and bypass secrets.
 * @see https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/configuration.md
 */

const form = process.env.LHCI_FORM_FACTOR === 'desktop' ? 'desktop' : 'mobile';
const mobile = form === 'mobile';

module.exports = {
  ci: {
    collect: {
      numberOfRuns: 3,
      settings: {
        /**
         * Emulated form factor for Lighthouse runs.
         * Possible values: 'mobile' | 'desktop'
         */
        emulatedFormFactor: form,
        /**
         * Throttling settings for network and CPU.
         * Uses stricter throttling for mobile.
         */
        throttling: mobile
          ? { rttMs: 150, throughputKbps: 1638.4, cpuSlowdownMultiplier: 4 }
          : { rttMs: 40, throughputKbps: 10240, cpuSlowdownMultiplier: 1 },
        /**
         * Chrome flags for running in CI environments.
         */
        chromeFlags: '--no-sandbox --disable-dev-shm-usage --disable-background-timer-throttling --disable-features=VizDisplayCompositor',
        /**
         * Extra HTTP headers for requests.
         * Includes Vercel bypass headers if secret is present.
         */
        extraHeaders: {
          ...(process.env.VERCEL_AUTOMATION_BYPASS_SECRET ? {
            'x-vercel-protection-bypass': process.env.VERCEL_AUTOMATION_BYPASS_SECRET,
            'x-vercel-set-bypass-cookie': 'true',
          } : {}),
          'User-Agent': 'Lighthouse-CI-GitHub-Actions',
          'Accept-Language': 'nl-NL,nl;q=0.9,en;q=0.8',
        },
        /**
         * Audits to skip for performance.
         */
        skipAudits: ['screenshot-thumbnails', 'final-screenshot'],
        /**
         * Only run these Lighthouse categories.
         */
        onlyCategories: ['performance', 'accessibility', 'seo', 'best-practices'],
        /**
         * Maximum wait times and quiet thresholds.
         */
        maxWaitForLoad: 45000,
        maxWaitForFcp: 15000,
        networkQuietThresholdMs: 1000,
        cpuQuietThresholdMs: 1000,
        /**
         * Block requests to analytics and tracking URLs.
         */
        blockedUrlPatterns: [
          'https://www.google-analytics.com/*',
          'https://www.googletagmanager.com/*',
          'https://connect.facebook.net/*',
          'https://stats.g.doubleclick.net/*',
        ],
      },
    },
    assert: {
      /**
       * Use Lighthouse recommended assertion preset.
       */
      preset: 'lighthouse:recommended',
      /**
       * Custom assertion thresholds for key metrics and categories.
       */
      assertions: {
        'first-contentful-paint': ['warn', { maxNumericValue: 3000 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 4000 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.25 }],
        'total-blocking-time': ['error', { maxNumericValue: 600 }],
        'speed-index': ['warn', { maxNumericValue: 5500 }],
        'categories:performance': ['error', { minScore: 0.75 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.85 }],
        'categories:best-practices': ['error', { minScore: 0.85 }],
        'uses-text-compression': 'warn',
        'uses-responsive-images': 'warn',
        'modern-image-formats': 'warn',
        'efficient-animated-content': 'warn',
        'unused-css-rules': 'warn',
        'unused-javascript': 'warn',
      },
    },
    upload: {
      /**
       * Upload target for Lighthouse CI results.
       */
      target: 'temporary-public-storage',
    },
  },
};
