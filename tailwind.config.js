/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      textColor: {
        "medium-grey": "#757D8A",
        "dark-grey": "#5A6474",
        "medium-blue-1": "#6989FE",
        "gold-yellow": "#FBB034",
        "medium-purple-1": "#5552D9"
      },
      borderColor: {
        "gold-yellow": "#FBB034",
        "medium-blue-1": "#6989FE",
      },
      backgroundColor: {
        "lp-yellow": "#FEFCF5",
        "medium-grey": "#757D8A",
        "gold-yellow": "#FBB034",
        "sidebar-grey": "#F8F8F8",
        "medium-blue-1": "#6989FE",
        "stats-bg": "#F2F5FF",
        "medium-green-1": "#0C977F"
      },
    },
  },

  plugins: [],
};
