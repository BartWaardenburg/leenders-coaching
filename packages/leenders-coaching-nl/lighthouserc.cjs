module.exports = {
  ci: {
    collect: {
      // For local development and package.json scripts
      url: [
        'http://localhost:3000',
        'http://localhost:3000/over-mij',
        'http://localhost:3000/aanpak',
        'http://localhost:3000/coaching',
        'http://localhost:3000/contact',
        'http://localhost:3000/blog'
      ],
      startServerCommand: 'pnpm start',
      startServerReadyPattern: 'ready on',
      startServerReadyTimeout: 30000,
      numberOfRuns: 5,
      settings: {
        // Mobile-first approach (GitHub Actions will use this)
        emulatedFormFactor: 'mobile',
        throttling: {
          rttMs: 150,
          throughputKbps: 1638.4,
          cpuSlowdownMultiplier: 4
        },
        // For CI environments
        chromeFlags: '--no-sandbox --disable-dev-shm-usage'
      }
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        // Core Web Vitals thresholds (2025 standards)
        'first-contentful-paint': ['warn', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 300 }],
        'speed-index': ['warn', { maxNumericValue: 3500 }],
        
        // Category scores (enterprise standards)
        'categories:performance': ['error', { minScore: 0.8 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:seo': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        
        // Resource optimization audits
        'uses-text-compression': 'error',
        'uses-responsive-images': 'error',
        'modern-image-formats': 'warn',
        'efficient-animated-content': 'warn',
        'unused-css-rules': 'warn',
        'unused-javascript': 'warn'
      }
    },
    upload: {
      target: 'temporary-public-storage'
    }
  }
};


