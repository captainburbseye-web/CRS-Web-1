/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // SYSTEM TRUTH PALETTE
        // CRS LAYER (Spine)
        'nettle-green': '#2d3e2f',
        'deep-charcoal': '#1a1a1a',
        
        // WORKSHOP CAFÉ LAYER (Interface)
        'off-white': '#faf9f6',
        'mustard': '#d4a017',
        
        // BREWFORCE LAYER (Trigger - CTAs ONLY)
        'electric-orange': '#FF4500',
        
        // Supporting
        'moss-green': '#8b9467',
      },
      fontFamily: {
        heading: ['Bebas Neue', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        accent: ['Oswald', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
