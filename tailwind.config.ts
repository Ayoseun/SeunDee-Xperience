/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'nunito': ['Nunito', 'sans-serif'],
      },
      colors: {
        primary: '#777723',
        secondary: '#762544',
        tertiary: '#C4C4C4',
    },
  },
  plugins: [],
}

