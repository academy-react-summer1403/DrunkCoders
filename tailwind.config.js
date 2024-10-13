const { nextui } = require('@nextui-org/react')

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],

  theme: {
    extend: {
      colors: {
        'primary-blue': '#3772FF',
        'basic-gray': '#787878',
      },
      fontFamily: {
        sans: ['IRANSans', 'Arial', 'sans-serif'],
      },
      screens: {
        'footer-lg': '1106px',
      },
      boxShadow: {
        'white-md': '0 0px 15px rgba(255, 255, 255, 0.5)',
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
}
