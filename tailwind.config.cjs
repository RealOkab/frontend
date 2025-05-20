/* /** @type {import('tailwindcss').Config} */

/*export default {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
} */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        Montserrat: "Montserrat",
        Khula: "Khula",
        Fugaz: "Fugaz",
      },
      keyframes: {
        flyin: {
          "0%": { transform: "translateX(-100%)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
      },
      animation: {
        flyin: "flyin 0.5s ease-out",
      },
    },
  },
  plugins: [],
};
