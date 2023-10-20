/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        customBg: '#8EB19D',
        customBg2: '#00000031',
        customBg3: '#173753',
        border : '#151B54',
        orange: '#f39c12',
        lightOrange: '#f39d12c0',
        lighterOrange: '#f39d1241',
      },
      textColor : {
        'gray-400': '#d9dcd6'

      },
      boxShadow: {
        sm: '0 0 5px 2px #0000007c'
      },
      fontSize: {
        'xxs': '.6rem'
      },
      keyframes: {
        dis : {
          '0%': { transform : 'translateY(100%)'},
          '100%' : { transform : 'translateY(0%)'}
        },
        show: {
          '0%': { height : '0'},
          '100%': { height : '100%'},
          
        }
        
      }, 
      animation: {
        dis: 'dis .3s',
        show: 'show linear .3s'
      },

    },
  },
  plugins: [],
}


