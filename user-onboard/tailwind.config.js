/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      margin:{
        '1/2' : '50%'
      }
    },
  },
  plugins: [],
}

