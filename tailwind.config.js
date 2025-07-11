/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(0, 0%, 98%)", // Light Mode Background
        foreground: "hsl(200, 15%, 8%)", // Light Mode Text
        input: "hsl(0, 0%, 52%)", // Light Mode Input
        elements: "hsl(0, 0%, 100%)", // Light Mode Elements

        dark: {
          background: "hsl(207, 26%, 17%)", // Dark Mode Background
          elements: "hsl(209, 23%, 22%)", // Dark Mode Elements
          text: "hsl(0, 0%, 100%)", // Dark Mode Text
        },
      },
      fontFamily: {
        sans: ['"Nunito Sans"', "sans-serif"],
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
