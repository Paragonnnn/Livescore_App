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
        customBg3: '#0F1A20',
        border : '#151B54',
        orange: '#f39c12',
        lightOrange: '#f39d12c0',
        lighterOrange: '#f39d1241',
        live: '#F3A712',
        loading: '#ffffff10'
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
        dat : {
          '0%' : { transform : 'translateY(0%)'},
          '100%': { transform : 'translateY(100%)'},
        },
        show: {
          '0%': { height : '0'},
          '100%': { height : '100%'},
          
        },
        zoom: {
          '0%': {transform: 'scaleX(80%)'},
          '100%': {transform : 'scaleX(100%)'}
        },
        swipe: {
          '0%': {transform: 'translateX(-50%)'},
          '100%': {transform: 'translateX(0%)'}
        }
        
      }, 
      animation: {
        dis: 'dis .3s',
        show: 'show linear .3s',
        dat: 'dat .3s',
        zoom: 'zoom .3s',
        swipe: 'swipe .3s'
      },

    },
  },
  plugins: [],
}


173753
// 8EB19D