/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      s: { max: '375px' },
      xs: { min: '375px', max: '424px' },
      sm: { min: '424px', max: '767px' },
      md: { min: '767px', max: '1023px' },
      lg: { min: '1024px', max: '1439px' },
      xl: { min: '1440px', max: '1599px' },
      '2xl': '1600px',
    },
    extend: {},
  },
  plugins: [],
};
