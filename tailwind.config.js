/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brewforce Color System
        cream: '#FDFBF7',
        olive: '#4A5D23',
        charcoal: '#1A1A1A',
        mustard: '#E3B505',
        // Additional colors
        sage: '#8B9B7E',
        espresso: '#4B3621',
      },
      fontFamily: {
        display: ['Bebas Neue', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        accent: ['Oswald', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
