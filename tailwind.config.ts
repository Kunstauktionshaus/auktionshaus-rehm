/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        lato: ["Lato", "sans-serif"],
      },
      colors: {
        grafit: "#454d4f",
        "dark-blue": "#242C5C",
        beige: "#fbf6f3",
        "dark-beige": "#9b988f",
        rose: "#b35a66",
        mint: "#699b72",
      },
    },
  },
  plugins: [],
};
