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
        satoshi: ["Satoshi", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        "dark-blue": "#242C5C",
        beige: "#dfd4bf",
        "dark-beige": " #8c8185",
        rose: "#b35a66",
        mint: "#699b72",
      },
    },
  },
  plugins: [],
};
