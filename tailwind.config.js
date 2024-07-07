/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        md: "1.25rem",
        lg: "1.5rem",
      },
    },
    screens: {
      sx: "480px",
      sm: "640px",
      md: "960px",
      lg: "1280px",
    },
  },
  plugins: [],
};
