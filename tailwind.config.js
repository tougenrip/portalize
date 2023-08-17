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
        'gamebg': 'url(/img/biggamebg.png)',
        'assetpre1': 'url(/img/aseetpre1.png)',
        'assetpre2': 'url(/img/aseetpre2.png)',
        'assetpre3': 'url(/img/aseetpre3.png)',
        'assetpre4': 'url(/img/aseetpre4.png)',
        'assetpre5': 'url(/img/aseetpre5.png)',
        'assetpre6': 'url(/img/aseetpre6.png)',
        'assetpre7': 'url(/img/aseetpre7.png)',
        'assetpre8': 'url(/img/aseetpre8.png)',
        'assetpre9': 'url(/img/aseetpre9.png)',
        'assetpre10': 'url(/img/aseetpre10.png)',
        'assetpre11': 'url(/img/aseetpre11.png)',
        'assetpre12': 'url(/img/aseetpre12.png)'
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
