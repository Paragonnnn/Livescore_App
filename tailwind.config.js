/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        customBg: '#1D9BF0',
        customBg2: '#0F243A50',
        customBgLight: '#0F243A10',
        customBg3: '#F7F7FF',
        darkCustomBg3: '#031525',
        border : '#151B54',
        orange: '#f39c12',
        lightOrange: '#f39d12c0',
        lighterOrange: '#f39d1241',
        live: '#F3A712',
        loading: '#ffffff10',
        darkText: '#000',
        lightText: '#ffffff'
      },
      textColor : {
        'gray-400': '#B1B2B4'

      },
      boxShadow: {
        sm: '0 0 2px 2px #ffffff11',
        light: '0 0 2px 2px #00000011',
        main: '0px 0px 17px 5px rgba(42,134,255,0.1)'
      },
      fontSize: {
        'xxs': '.6rem'
      },
      screens: {
        xs: '400px'
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
        },
        sel: {
          '0%': {width: '0%'},
          '100%': {width: '100%'}
        },
        sel2: {
          '0%': {width: '0%',scale: '0'},
          '100%': {width: '100%',scale: '120%'}
        },
        countryDropDown: {
          '0%': {opacity: '.5',height: '0'},
          '100%': {borderWidth: '1',height: '100%'}
        },
        countryDropUp: {
          '0%': {opacity: '.5',height: '0'},
          '100%': {borderWidth: '1',height: '100%'}
        },
        mode: {
          '0%': {transform: 'rotate(-20deg)'},
          '100%': {transform: 'rotate(0deg)'}
        },
        translate: {
          '0%': {transform: 'translateX(0)'},
          '100%': {transform: 'translateX(32px)'}
        },
        toggle: {
          '0%': {left: '2px'},
          '100%': {right: '2px'}
        }
        
      }, 
      animation: {
        dis: 'dis .3s',
        show: 'show linear .3s',
        dat: 'dat .3s',
        zoom: 'zoom .3s',
        swipe: 'swipe .3s',
        sel: 'sel .3s',
        sel2: 'sel .3s',
        countryDropDown: 'countryDropDown .1s',
        countryDropUp: 'countryDropUp .1s',
        mode: 'mode 1s',
        translate: 'translate .3s',
        toggle: 'toggle 1s'
      },

    },
  },
  plugins: [],
}


173753
// 8EB19D