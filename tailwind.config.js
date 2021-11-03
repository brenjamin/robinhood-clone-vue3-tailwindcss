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
        'lightest-green': 'rgba(0,200,5,0.2)',
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
        'border-gray-light': 'rgb(84, 93, 97)',
        'red': 'rgb(255, 80, 0)',
        'light-red': 'rgb(255,106,38)',
        'blue': 'rgb(0, 127, 245)',
        'fine-print': 'rgb(180, 189, 194)',
        'inherit': 'inherit',
        'neutral-bg-3': 'rgb(48,54,58)',
        'neutral-bg-2': 'rgb(64,73,78)',
        'neutral-fg-2': 'rgb(145,159,166)'
      },
      fontSize: {
        'inherit': 'inherit',
        'fine-print': '.796875rem',
        'xxs': '.6875rem',
        'base-xs': '.8125rem',
        'base-sm': '.9375rem',
        'xxl': '1.3125rem',
        '2.5xl': '2rem',
        '5.5xl': '3.25rem'
      },
      spacing: {
        '0.75': '.1875rem',
        '1.25': '.3125rem',
        '3.75': '.9375rem',
        '4.5': '1.125rem',
        '7.5': '1.875rem',
        '8.5': '2.125rem',
        '12.5': '3.125rem',
        '13': '3.25rem',
        '13.5': '3.375rem',
        '15': '3.75rem',
        '16.5': '4.125rem',
        '18': '4.5rem',
        '21': '5.25rem',
        '22': '5.5rem',
        '25': '6.25rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '75': '18.75rem',
        '100': '25rem',
        '110': '27.5rem',
        '120': '30rem',
        '128': '32rem',
        '146': '36.5rem'
      },
      lineHeight: {
        'tighter': '1.15',
        'lax': '1.75'
      },
      letterSpacing: {
        'tight-lg': '-.035em'
      },
      borderWidth: {
        '5': '5px',
        '6': '6px',
        '10': '10px'
      },
      zIndex: {
        '-1': '-1',
        100: 100
      },
      transitionDuration: {
        '800': '800ms'
      },
      maxWidth: {
        'xxs': '16.625rem'
      },
      boxShadow: {
        'input': '0px 12px 24px rgba(0,0,0,0.06), 0px -12px 24px rgba(0,0,0,0.06)',
        'list-menu': '0px 12px 24px rgba(0,0,0,0.6), 0px -12px 24px rgba(0,0,0,0.02)'
      }
    },
  },
  variants: {
    extend: {
      margin: ['responsive', 'first', 'last'],
      padding: ['responsive', 'first', 'last'],
      borderWidth: ['responsive', 'dark'],
      boxShadow: ['responsive', 'group-hover', 'focus-within', 'hover', 'focus', 'dark']
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
  corePlugins: {
   container: false,
  }
}
