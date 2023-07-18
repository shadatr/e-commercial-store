/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {

      },
      colors: {
        primary: "#00000",
        secondary: "#FFFFFF",
        blue: "#3958F9",
        lightGray: "#D3DCF2",
        darkGray: "#91929C",
      },
      fontFamily: {
        rubik: ["Rubik", "sans-serif"],
      },
      fontSize: {
        sm: "20px",
        md: "20px",
        lg: "36px",
      },
      screens: {
        lg: "1055px",
        sm: "400px",
      },
    },
  },
  plugins: [],
};
