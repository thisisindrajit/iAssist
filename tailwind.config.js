/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderColor: {
        "gold-yellow": "#FBB034",
      },
      backgroundColor: {
        "lp-yellow": "#fefcf5",
      },
    },
  },

  plugins: [],
};
