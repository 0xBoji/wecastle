/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        mainColor: "#FF9D43",
      },
      backgroundImage: {
        main: "url('/background.png')",
      },
    },
  },
  plugins: [],
};
