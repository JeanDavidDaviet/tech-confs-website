/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["pages/*.js", "components/*.js"],
  theme: {
    extend: {
      screens: {
        'xs': '400px',
      },
    },
  },
  plugins: [],
}
