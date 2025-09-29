import type { Config } from 'tailwindcss';

/**
 * Tailwind CSS configuration for leenders-coaching-nl.
 * - Enables dark mode via class strategy.
 * - Centers the container and sets responsive padding and max width.
 * @see https://tailwindcss.com/docs/configuration
 */
const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
