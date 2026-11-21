/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        veyra: {
          ink: '#111111',
          paper: '#F5F3EF',
          sand: '#B9A58B',
          grey: '#777777',
        },
      },
    },
  },
  plugins: [],
};
