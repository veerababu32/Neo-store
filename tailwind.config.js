/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      sm: '320px',
      md: '720px',
      lg: '976px',
      xl: '1392px',
    },
    extend: {},
  },
  plugins: [],
};
