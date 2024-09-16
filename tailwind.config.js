/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      s: '320px',
      xs: '375px',
      sm: '425px',
      md: '768px',
      lg: '1024px',
      xl: '1440px',
      '2xl': '1600px',
    },
    extend: {},
  },
  plugins: [],
};
