/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",

  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        "primary-dark": "#202225",
        "secondary-dark": "#292b2f",
        "thirdy-dark": "#2f3136",
        "fourthy-dark": "#40444b",
        "purple-dark": "#5b209a",
        "primary-light": "#00A9FF",
        "secondary-light": "#89CFF3",
        "thirdy-light": "#A0E9FF",
        "fourthy-light": "#CDF5FD",
      }
    },
  },
  plugins: [],
}

