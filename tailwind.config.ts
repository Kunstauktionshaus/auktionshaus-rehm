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

        amber: "#F5A623", // Тёплый янтарный
        honey: "#D9A066", // Медовый
        terracotta: "#E2725B", // Терракотовый
        sand: "#E8D3C5", // Песочный
        mustard: "#D6AE60", // Горчичный
        coral: "#E87C66", // Коралловый
        cinnamon: "#B56539", // Корица
        blush: "#F2C1C4", // Нежно-розовый румянец
        apricot: "#F4A384", // Абрикосовый
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
  plugins: [require("@tailwindcss/line-clamp")],
};
