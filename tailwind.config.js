const {nextui} = require('@nextui-org/react')

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
            },
            fontFamily: {
                sans: ['IRANSans', 'Arial', 'sans-serif'],
            },
        },
    },
    darkMode: 'class',
    plugins: [nextui()],
}
