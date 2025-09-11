// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // ✅ ye line add karo
  content: [
    "./index.html", // agar HTML root pe hai
    "./src/**/*.{js,ts,jsx,tsx}", // react/vite ke liye
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
