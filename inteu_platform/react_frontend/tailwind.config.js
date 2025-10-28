/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#242424',
        darkText: 'rgba(255,255,255,0.87)',
        primary: '#646cff',
        primaryHover: '#535bf2',
        lightBg: '#ffffff',
        lightText: '#213547',
        lightPrimaryHover: '#747bff'
      },
      fontFamily: {
        sans: ['system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  darkMode: 'media', // automatically uses user's system preference
  plugins: [],
}
