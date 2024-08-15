/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        uiFont: ["Open Sans", "sans-serif"],
        stFont: ["Edu VIC WA NT Beginner", "cursive"],
      },
    },
  },
  plugins: [require("daisyui"), require("flowbite/plugin")],
};
