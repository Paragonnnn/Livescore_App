/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        customBg: 'wheat',
        customBg2: 'darkslategray',
        border : '#151B54',
        orange: '#f39c12',
        lightOrange: '#f39d12c0',
        lighterOrange: '#f39d1241'
      },
      boxShadow: {
        sm: '0 0 2px 2px #f39d1241'
      },
      fontSize: {
        'xxs': '.6rem'
      }
    },
  },
  plugins: [],
}

