/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      extend: {
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
        }
      }
    },
  },
  safelist: [
    'outline-green-500',
    'outline-yellow-500',
    'outline-red-500',
    'text-green-500',
    'text-yellow-500',
    'text-red-500',
  ],
  plugins: [],
}
