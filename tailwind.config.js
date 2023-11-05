/** @type {import('tailwindcss').Config} **/
import mt from "@material-tailwind/react/utils/withMT";
const defaultTheme = require('tailwindcss/defaultTheme')

export default mt({
  darkmode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
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
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundColor: {
        'paffbg': '#151515',
        'inputBg': '#282828',
        'paffGraA': '#3b29ff',
        'paffGraB': '#9c4fff'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'Hero': 'url(/img/landing-page/herobg.webm)',
        'gamebg': 'url(/img/biggamebgcomp.webp)',
        'assetpre1': 'url(/img/aseetpre1comp.webp)',
        'assetpre2': 'url(/img/aseetpre2comp.webp)',
        'assetpre3': 'url(/img/aseetpre3comp.webp)',
        'assetpre4': 'url(/img/aseetpre4comp.webp)',
        'assetpre5': 'url(/img/aseetpre5comp.webp)',
        'assetpre6': 'url(/img/aseetpre6comp.webp)',
        'assetpre7': 'url(/img/aseetpre7comp.webp)',
        'assetpre8': 'url(/img/aseetpre8comp.webp)',
        'assetpre9': 'url(/img/aseetpre9comp.webp)',
        'assetpre10': 'url(/img/aseetpre10comp.webp)',
        'assetpre11': 'url(/img/aseetpre11comp.webp)',
        'assetpre12': 'url(/img/aseetpre12comp.webp)'
      },
      fontFamily: { 
        'valorant' : ['valorant', 'sans-serif'],
        'sans' :['Gilroy', 'sans-serif', ...defaultTheme.fontFamily.sans]
      },
      animation: {
        'InfScroll': 'scroll 10s linear infinite',
      },
      keyframes: {
        scroll:{
          '0%': { transform: 'translate(0, 0)' },
        '100%': { transform: 'translate(-50%, 0)' },
        },
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')({nocompatible:true}),
    require("tailwindcss-animate")
  ],
  safelist: ['animate-[fade-in_1s_ease-in-out]', 'animate-[fade-in-down_1s_ease-in-out]']
});
