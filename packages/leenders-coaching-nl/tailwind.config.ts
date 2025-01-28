import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./.storybook/**/*.{ts,tsx}",
    "./stories/**/*.{ts,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-montserrat)", ...fontFamily.sans],
        playfair: ["var(--font-playfair)", ...fontFamily.serif],
        cormorant: ["var(--font-cormorant)", ...fontFamily.serif],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          50: "#f7f3f0",
          100: "#efe7e1",
          200: "#deccbd",
          300: "#cdb199",
          400: "#bc9675",
          500: "#ab7b51",
          600: "#8a6241",
          700: "#694931",
          800: "#473121",
          900: "#261810",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        sage: {
          50: "#f4f7f4",
          100: "#e9efe9",
          200: "#d3dfd3",
          300: "#bdcfbd",
          400: "#a7bfa7",
          500: "#91af91",
          600: "#748c74",
          700: "#576957",
          800: "#3a463a",
          900: "#1d231d",
        },
        sand: {
          50: "#faf8f5",
          100: "#f5f1eb",
          200: "#ebe3d7",
          300: "#e1d5c3",
          400: "#d7c7af",
          500: "#cdb99b",
          600: "#a4947c",
          700: "#7b6f5d",
          800: "#524a3e",
          900: "#29251f",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        glass:
          "0 4px 12px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 2%)), 0 2px 4px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 4%))",
        hover:
          "0 8px 24px -4px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 4%)), 0 4px 8px -4px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 6%))",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shimmer: "shimmer 2.5s infinite",
      },
    },
  },
  plugins: [animate],
} satisfies Config;

export default config;
