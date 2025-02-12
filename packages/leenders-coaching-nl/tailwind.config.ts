import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';
import containerQueries from '@tailwindcss/container-queries';

const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}', './.storybook/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-montserrat)', ...fontFamily.sans],
        playfair: ['var(--font-playfair)', ...fontFamily.serif],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        menu: 'hsl(var(--menu-background))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          50: '#f7f3f0',
          100: '#efe7e1',
          200: '#deccbd',
          300: '#cdb199',
          400: '#bc9675',
          500: '#ab7b51',
          600: '#8a6241',
          700: '#694931',
          800: '#473121',
          900: '#261810',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
        },
        warning: {
          DEFAULT: 'hsl(var(--warning))',
          foreground: 'hsl(var(--warning-foreground))',
        },
        pastel: {
          blue: {
            light: '#F0F8FF',
            DEFAULT: '#F0F8FF',
            dark: '#1A2B42',
          },
          purple: {
            light: '#F8F0FF',
            DEFAULT: '#F8F0FF',
            dark: '#2B1A42',
          },
          green: {
            light: '#F0FFF0',
            DEFAULT: '#F0FFF0',
            dark: '#1A421A',
          },
          pink: {
            light: '#FFF0F8',
            DEFAULT: '#FFF0F8',
            dark: '#421A2B',
          },
          yellow: {
            light: '#FFF8F0',
            DEFAULT: '#FFF8F0',
            dark: '#422B1A',
          },
          teal: {
            light: '#E0FFFF',
            DEFAULT: '#E0FFFF',
            dark: '#1A4242',
          },
        },
      },
      boxShadow: {
        glass:
          '0 4px 12px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 2%)), 0 2px 4px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 4%))',
        hover:
          '0 8px 24px -4px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 4%)), 0 4px 8px -4px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 6%))',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        shimmer: 'shimmer 2.5s infinite',
      },
      transitionProperty: {
        theme:
          'color, background-color, border-color, text-decoration-color, fill, stroke, background-image',
      },
      transitionTimingFunction: {
        theme: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        theme: '200ms',
      },
    },
  },
  plugins: [
    containerQueries,
    plugin(({ addUtilities }) => {
      addUtilities({
        '.transition-theme': {
          'transition-property':
            'color, background-color, border-color, text-decoration-color, fill, stroke, background-image',
          'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
          'transition-duration': '500ms',
        },
      });
    }),
  ],
} satisfies Config;

export default config;
