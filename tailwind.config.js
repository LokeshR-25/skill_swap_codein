/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",          // <-- add this
    "./src/**/*.{js,jsx,ts,tsx}",   // already correct
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
