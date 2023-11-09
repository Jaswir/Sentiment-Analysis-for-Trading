/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontSize: {
        'usd-size': '0.95rem', // Adjust the size as needed
      },
      colors: {
        'saft': '#445e88', 
        'saft-hover': '#1e293b',
      },
    },
  },
  plugins: [],
}
