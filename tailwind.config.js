/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        customBg: '#aaa95a',
        customBg2: '#00000031',
        border : '#151B54',
        orange: '#f39c12',
        lightOrange: '#f39d12c0',
        lighterOrange: '#f39d1241'
      },
      boxShadow: {
        sm: '0 0 5px 2px #0000007c'
      },
      fontSize: {
        'xxs': '.6rem'
      }
    },
  },
  plugins: [],
}

