/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Flame & Foliage Color System
        'foliage-dark': '#1A2F1A',      // Deep Forest Green - Main Background
        'foliage-vibrant': '#4CAF50',   // Vibrant Leaf Green - Highlights
        'flame-burnt': '#E6B800',       // Burnt Yellow/Gold - Secondary Accents
        'flame-fierce': '#FF4500',      // Fierce Orange - Primary CTAs
        'text-light': '#FDFBF7',        // Off-White/Cream - Main Text
        // Legacy colors (keep for backwards compatibility during transition)
        cream: '#FDFBF7',
        olive: '#4A5D23',
        charcoal: '#1A1A1A',
        mustard: '#E3B505',
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
