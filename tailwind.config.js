/** @type {import('tailwindcss').Config} **/
import mt from "@material-tailwind/react/utils/withMT";
const defaultTheme = require('tailwindcss/defaultTheme')

export default mt({
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
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
        'gamebg': 'url(/img/biggamebg.png)'
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
        }
      
      },
      screens: {
        
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
  safelist: ['animate-[fade-in_1s_ease-in-out]', 'animate-[fade-in-down_1s_ease-in-out]']
});
