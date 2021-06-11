const colors = require("tailwindcss/colors");

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        // Build your palette here
        fuchsia: colors.fuchsia,
        background: "#121212",
        custom: {
          secondary: "#1A1B1F",
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
