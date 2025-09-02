module.exports = {
  ci: {
    collect: {
      numberOfRuns: 3,
      settings: {
        formFactor: process.env.LHCI_FORM_FACTOR || 'mobile',
        screenEmulation: process.env.LHCI_FORM_FACTOR === 'desktop' ? {
          mobile: false,
          width: 1350,
          height: 940,
          deviceScaleFactor: 1,
        } : {
          mobile: true,
          width: 360,
          height: 640,
          deviceScaleFactor: 2,
        },
        preset: process.env.LHCI_FORM_FACTOR === 'desktop' ? 'desktop' : undefined,
        throttling: {
          rttMs: 150,
          throughputKbps: 1638.4,
          cpuSlowdownMultiplier: 4,
        },
        chromeFlags: '--no-sandbox --disable-dev-shm-usage --disable-background-timer-throttling --disable-features=VizDisplayCompositor',
        extraHeaders: {
          ...(process.env.VERCEL_AUTOMATION_BYPASS_SECRET ? {
            'x-vercel-protection-bypass': process.env.VERCEL_AUTOMATION_BYPASS_SECRET,
            'x-vercel-set-bypass-cookie': 'true',
          } : {}),
          'User-Agent': 'Lighthouse-CI-GitHub-Actions',
          'Accept-Language': 'nl-NL,nl;q=0.9,en;q=0.8',
        },
        skipAudits: ['screenshot-thumbnails', 'final-screenshot'],
        onlyCategories: ['performance', 'accessibility', 'seo', 'best-practices'],
        maxWaitForLoad: 45000,
        maxWaitForFcp: 15000,
        networkQuietThresholdMs: 1000,
        cpuQuietThresholdMs: 1000,
        blockedUrlPatterns: [
          'https://www.google-analytics.com/*',
          'https://www.googletagmanager.com/*',
          'https://connect.facebook.net/*',
          'https://stats.g.doubleclick.net/*',
        ],
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


