const colors = require("tailwindcss/colors");
module.exports = {
  darkMode: false, // or 'media' or 'class'
  purge: false,
  theme: {
    extend: {
      colors: {
        blueGray: colors.blueGray,
        gray: colors.coolGray,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
