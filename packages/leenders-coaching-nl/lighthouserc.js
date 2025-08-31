module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:3000',
        'http://localhost:3000/over-mij',
        'http://localhost:3000/coaching',
        'http://localhost:3000/blog'
      ],
      startServerCommand: 'pnpm start',
      startServerReadyPattern: 'ready on',
      numberOfRuns: 3,
      settings: {
        preset: 'desktop',
        throttling: {
          rttMs: 40,
          throughputKbps: 10 * 1024,
          cpuSlowdownMultiplier: 1,
        },
      },
    },
    assert: {
      assertions: {
        // Core Web Vitals thresholds (industry standards)
        'largest-contentful-paint': ['warn', { maxNumericValue: 2500 }],
        'first-contentful-paint': ['warn', { maxNumericValue: 1800 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['warn', { maxNumericValue: 200 }],
        'speed-index': ['warn', { maxNumericValue: 3400 }],
        
        // Category scores (enterprise standards)
        'categories:performance': ['warn', { minScore: 0.85 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['warn', { minScore: 0.90 }],
        'categories:seo': ['warn', { minScore: 0.90 }],
        
        // Resource optimization
        'unused-css-rules': ['warn', { maxLength: 0 }],
        'unused-javascript': ['warn', { maxLength: 0 }],
        'modern-image-formats': ['warn', { maxLength: 0 }],
        'offscreen-images': ['warn', { maxLength: 0 }],
        
        // Network efficiency
        'uses-text-compression': 'error',
        'uses-responsive-images': 'warn',
        'efficient-animated-content': 'warn',
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
