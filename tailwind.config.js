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
      },
      borderColor: {
        "gold-yellow": "#FBB034",
      },
      backgroundColor: {
        "lp-yellow": "#fefcf5",
        "medium-grey": "#757D8A",
        "gold-yellow": "#FBB034",
        "sidebar-grey": "#F8F8F8",
        "medium-blue-1": "#6989FE",
      },
    },
  },

  plugins: [],
};
