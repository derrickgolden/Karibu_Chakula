/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    minWidth: {
      '0': '0',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      'full': '100%',
     },
    screens: {
      'es': '450px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    colors: {
      "clearWhite": "#fff",
      "lightOrange": "#fcd9b8",
      "mediumOrange": "#e09145",
      "darkGray": "#292c35",
      "darkBlack": "#17181d",
      "textYellow": "#ffc03d",
      "textWhite": "#e7eefb",
      "textRed": "#ff2525"
    },
    extend: {
      
    },
  },
  plugins: [],
}

