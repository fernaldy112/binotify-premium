/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1DB954",
        graybg: "#171717",
      },
      borderWidth: {
        1: "1px",
      },
    },
  },
  plugins: [],
};
