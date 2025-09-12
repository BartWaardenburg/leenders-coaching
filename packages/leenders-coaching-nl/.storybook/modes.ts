/**
 * Chromatic modes configuration for theme and viewport testing
 * This enables Chromatic to capture snapshots with different themes and key viewports
 */
export const allModes = {
  'light-xs': {
    theme: 'light',
    viewport: 'xs',
  },
  'light-md': {
    theme: 'light',
    viewport: 'md',
  },
  'dark-lg': {
    theme: 'dark',
    viewport: 'lg',
  },
} as const;
