/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        "3xl": "2560px",
      },
      aspectRatio: {
        "4/3": "4 / 3",
      },

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
        purple: "#bfbfdb",
        red: "#ad525e",
        green: "#c2d9d1",
        pink: "#e0d6d9",
        cloud: "#fffcf5",
        periwinkle: "#babde2",
        maroon: "#895159",
        peach: "#dfaea1",

        amber: "#F5A623",
        honey: "#D9A066",
        terracotta: "#E2725B",
        sand: "#E8D3C5",
        mustard: "#D6AE60",
        coral: "#E87C66",
        cinnamon: "#B56539",
        blush: "#F2C1C4",
        apricot: "#F4A384",
        latte: "#C5A897",

        cream: "#f8f5f0",
        charcoal: "#2a3a40",
        gold: "#c6a664",
        deepBlue: "#2d5d73",
        paleBlue: "#dbe6ea",
        softGray: "#b4b9bd",
      },
    },
  },
  plugins: [],
};
