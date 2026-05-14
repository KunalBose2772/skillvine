/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: '#07111F',
        surface: '#101826',
        surfaceElevated: '#172033',
        surfaceBorder: '#1E2D42',
        primaryBlue: '#0066FF',
        accentBlue: '#00B8FF',
      },
    },
  },
  plugins: [],
}
