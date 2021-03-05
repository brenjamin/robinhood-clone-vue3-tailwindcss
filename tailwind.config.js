module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'green': 'rgb(0, 180, 5)',
        'light-green': 'rgb(0, 200, 5)',
        'neon-green': 'rgb(195,245,60)',
        'lighter-green': 'rgb(38,208,43)',
        'dark-green': 'rgb(0, 64, 34)',
        'light-magenta': 'rgb(255, 144, 175)',
        'mid-magenta': 'rgb(255, 90, 135)',
        'magenta': 'rgb(218, 65, 107)',
        'dark-magenta': 'rgb(196, 56, 96)',
        'light-gray': 'rgb(245,248,250)',
        'dark-gray': 'rgb(42,49,55)',
        'text-gray': 'rgb(111,120,126)',
        'text-gray-light': 'rgb(121,133,139)',
        'bg-gray': 'rgb(240,235,230)',
        'dark-bg-gray': 'rgb(30,33,36)',
        'border-gray': 'rgb(227,233,237)',
        'border-gray-dark': 'rgb(121,133,139)',
        'border-gray-light': 'rgb(84, 93, 97)'
      },
      fontSize: {
        'xxs': '.6875rem',
        'base-xs': '.8125rem',
        'base-sm': '.9375rem',
        'xxl': '1.3125rem',
        '2.5xl': '2rem',
        '5.5xl': '3.25rem'
      },
      spacing: {
        '1.25': '.3125rem',
        '3.75': '.9375rem',
        '7.5': '1.875rem',
        '12.5': '3.125rem',
        '13': '3.25rem',
        '13.5': '3.375rem',
        '15': '3.75rem',
        '18': '4.5rem',
        '21': '5.25rem',
        '25': '6.25rem',
        '34': '8.5rem',
        '75': '18.75rem',
        '100': '25rem',
        '128': '32rem',
        '146': '36.5rem'
      },
      lineHeight: {
        'tighter': '1.15'
      },
      letterSpacing: {
        'tight-lg': '-.035em'
      },
      borderWidth: {
        '6': '6px',
        '10': '10px'
      },
      zIndex: {
        100: 100
      }
    },
  },
  variants: {
    extend: {
      margin: ['responsive', 'first', 'last'],
      padding: ['responsive', 'first', 'last']
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
  corePlugins: {
   container: false,
  }
}
