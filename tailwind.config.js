/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        customBg: '#1E1E1E',
        hoverBg: 'black',
        orange: '#008000',
        lightOrange: '#006400',
        lighterOrange: '#004000'
      },
      boxShadow: {
        sm: '0 0 2px 2px #f39d1241'
      },
      fontSize: {
        'xxs': '.5rem'
      }
    },
  },
  plugins: [],
}

