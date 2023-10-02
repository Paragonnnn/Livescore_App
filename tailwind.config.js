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
        orange: '#f39c12',
        lightOrange: '#f39d12c0',
        lighterOrange: '#f39d1241'
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

