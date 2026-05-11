import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(232 17% 87%)",
        input: "hsl(232 17% 94%)",
        ring: "hsl(236 87% 64%)",
        background: "hsl(0 0% 100%)",
        foreground: "hsl(228 25% 16%)",
        muted: {
          DEFAULT: "hsl(225 23% 96%)",
          foreground: "hsl(228 12% 43%)",
        },
        primary: {
          DEFAULT: "hsl(192 64% 44%)",
          foreground: "hsl(0 0% 100%)",
        },
        indigo: {
          50: '#eaf6f8',
          100: '#d5edf2',
          200: '#aadde5',
          300: '#80cce0',
          400: '#5ac8e0',
          500: '#3dbce1',
          600: '#289db9',
          700: '#1e7a91',
          800: '#1a6274',
          900: '#175261',
          950: '#0a333d',
        },
        secondary: {
          DEFAULT: "hsl(205 91% 95%)",
          foreground: "hsl(222 47% 11%)",
        },
        accent: {
          DEFAULT: "hsl(266 100% 96%)",
          foreground: "hsl(249 36% 20%)",
        },
        success: {
          DEFAULT: "hsl(147 66% 39%)",
          foreground: "hsl(0 0% 100%)",
        },
        warning: {
          DEFAULT: "hsl(39 97% 55%)",
          foreground: "hsl(26 83% 14%)",
        },
        destructive: {
          DEFAULT: "hsl(0 84% 60%)",
          foreground: "hsl(0 0% 100%)",
        },
        card: {
          DEFAULT: "hsla(0 0% 100% / 0.82)",
          foreground: "hsl(228 25% 16%)",
        }
      },
      boxShadow: {
        glow: "0 18px 40px -18px rgba(40, 157, 185, 0.45)",
        glass: "0 12px 50px rgba(15, 23, 42, 0.08)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at top, rgba(40,157,185,0.16), transparent 28%), radial-gradient(circle at 20% 20%, rgba(90,200,224,0.14), transparent 18%), linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(245,247,255,1) 100%)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" }
        }
      },
      animation: {
        float: "float 7s ease-in-out infinite"
      }
    },
  },
  plugins: [],
};

export default config;
