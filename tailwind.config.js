import typography from '@tailwindcss/typography';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        beige: '#f5f5dc',
         'off-white': '#FCFAF8'
      },
    },
  },
  plugins: [typography],
}
