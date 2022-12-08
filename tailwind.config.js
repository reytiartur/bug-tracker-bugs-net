/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      screens: {
        xs: '416px',
        sm: '600px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1520px',
      },
      colors: {
        primary: '#ffd6af',
        primaryDark: '#ffb066',
        secondary: '#9d6381',
        secondaryLight: '#d8c0cc',
        background: '#FAF9F6',
        grayLight: '#a3a3a3',
        grayDark: '#737373'
      }
    },
  },
  plugins: [
    require('@headlessui/tailwindcss')
  ],
}
