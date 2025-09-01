module.exports = {
  ci: {
    collect: {
      /* In CI we audit deployed preview URLs passed via the action, so
         we must NOT try to start a local server or use pnpm. */
      numberOfRuns: 5,
      settings: {
        emulatedFormFactor: 'mobile',
        throttling: {
          rttMs: 150,
          throughputKbps: 1638.4,
          cpuSlowdownMultiplier: 4,
        },
        chromeFlags: '--no-sandbox --disable-dev-shm-usage',
      },
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'first-contentful-paint': ['warn', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 300 }],
        'speed-index': ['warn', { maxNumericValue: 3500 }],
        'categories:performance': ['error', { minScore: 0.8 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:seo': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'uses-text-compression': 'error',
        'uses-responsive-images': 'error',
        'modern-image-formats': 'warn',
        'efficient-animated-content': 'warn',
        'unused-css-rules': 'warn',
        'unused-javascript': 'warn',
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};


