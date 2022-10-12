/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      scale: {
        '102': '1.02'
      },
      height: {
        '75': '19.5rem',
        '104': '34rem'
      },
      width: {
        '115': '37.563rem',
        '98': '28rem'
      },
      fontFamily: {
        montserrat: ['"Montserrat"', 'sans-serif']
      },
    },
  },
  plugins: [],
}
