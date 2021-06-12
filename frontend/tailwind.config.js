const colors = require("tailwindcss/colors");

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        background: "#121212",
        custom: {
          secondary: "rgba(25, 27, 31, 0.6)",
          background: "#1F2128",
          lines: "#1D1E23",
        },
        gray: colors.gray,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
