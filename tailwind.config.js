/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "media", // enterprise-safe: follows system preference
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

