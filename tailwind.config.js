module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'green': 'rgb(0, 180, 5)',
        'light-green': 'rgb(0, 200, 5)',
        'neon-green': 'rgb(195,245,60)',
        'magenta': 'rgb(218, 65, 107)',
        'dark-magenta': 'rgb(196, 56, 96)',
        'light-gray': 'rgb(245,248,250)',
        'border-gray': 'rgb(227,233,237)'
      },
      fontSize: {
        'base-sm': '.9375rem',
    },
    },
  },
  variants: {
    extend: {
      margin: ['responsive', 'first']
    },
  },
  plugins: [],
}
