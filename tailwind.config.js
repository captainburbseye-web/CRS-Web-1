/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // BRUTALIST BOUTIQUE PALETTE
        // PRIMARY (DOMINANT)
        'nettle-green': '#2d3e2f',
        'mustard': '#d4a017',
        
        // SECONDARY / TEXTURAL
        'deep-charcoal': '#1a1a1a',
        'off-white': '#faf9f6',
        'burnt-orange': '#cc5500',
        'moss-green': '#8b9467',
        
        // BREWFORCE (CTAs ONLY)
        'electric-orange': '#FF4500',
      },
      fontFamily: {
        serif: ['Crimson Text', 'serif'],
        mono: ['IBM Plex Mono', 'monospace'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
