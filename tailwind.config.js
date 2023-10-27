/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      red: colors.red,
      white: colors.white,
      black: colors.black,
      accentA: {
        50: "#f2f1ff",
        100: "#e8e5ff",
        200: "#d4ceff",
        300: "#b4a7ff",
        400: "#9075ff",
        500: "#6e3dff",
        600: "#5f16ff",
        700: "#4f04fd",
        800: "#4203d3",
        900: "#3805ad",
        950: "#1f0076",
      },
      accentB: {
        50: "#fff3ff",
        100: "#ffe6fe",
        200: "#ffcdfe",
        300: "#ffa6fa",
        400: "#ff71f6",
        500: "#fa38f0",
        600: "#de1bd0",
        700: "#b912aa",
        800: "#971189",
        900: "#7b146e",
        950: "#530049",
      },
    },
    extend: {},
  },
  plugins: [],
};
