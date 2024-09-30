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
        navy: "#2f4156",
        teal: "#567c8d",
        "sky-blue": "#C7D9E5",
        "sky-blue-back": "#C7D9E526",
        beige: "#F4EFEB",
        "back-beige": "#F4EFEB80",
      },
    },
  },
  plugins: [],
};
