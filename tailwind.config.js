/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Foliage Physics × Flame Physics Color System
        cream: '#F8F6EE',
        olive: '#4A5B43',
        'dark-olive': '#2D3A28',
        sage: '#8B9B7E',
        mustard: '#D4A437',
        'fire-orange': '#FF6B35',
        'electric-purple': '#6B4FFF',
        espresso: '#4B3621',
        charcoal: '#1E1E1E',
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
