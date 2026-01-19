# 🎸 Cowley Road Studios

**Where Sound, Vision & Community Find Their Home**

Professional-grade recording infrastructure. Grassroots pricing. No gatekeeping.

---

## 🌐 URLs

- **Production**: https://cowleyroadstudios.com
- **GitHub**: https://github.com/captainburbseye-web/CRS-Web-1
- **Crowdfunder**: https://www.crowdfunder.co.uk/p/cowley-road-studios
- **Booking**: https://app.squareup.com/appointments/book/5f88zzreivvg8j/L9RPJZW999RE7/start

---

## 📋 About

At 118 Cowley Road, Oxford, Cowley Road Studios rises from the legacy of Soundworks Studio (est. 2004). We're building an ecosystem where independent artists, young musicians, and creative communities have access to world-class recording tools without the barriers.

**Our Promise:** At least 15% of monthly bookable studio time reserved for subsidised sessions for grassroots artists, young people (16-25), and community projects.

---

## ✨ Features

### 🎛️ Professional Studio
- Dante networked audio system
- Kii Three + BXT monitoring
- Sphere DLX modeling microphones
- 5 isolated recording rooms
- NDI video streaming & multi-camera setups

### ☕ Workshop Café (Opening Spring 2026)
- Day space: Coworking for creators with quality coffee
- Night venue: Intimate 45-60 capacity for live sessions
- Free WiFi, hot desks, evening performances

### 🎯 Booking & Payments
- **Square Booking System**: Direct session booking
- **Stripe Vouchers**: Launch credit offers
  - 2-Hour Session: £70 (save £35)
  - 6-Hour Voucher: £130 (save £80)
- **Crowdfunder Campaign**: Community investment

---

## 🎨 Brand Identity

### Foliage Physics × Flame Physics
Our color system is physics-based, not decorative:

- **Cream (#F8F6EE)** - Light & space (70%)
- **Olive (#4A5B43)** - Structure & roots (20%)
- **Mustard (#D4A437)** - Energy & fire (10%)
- **Charcoal (#1E1E1E)** - Text & depth

### Brewforce Typography
- **Bebas Neue** - Headings (ALL CAPS for impact)
- **Inter** - Body text (readable, accessible)
- **Oswald** - Accent (rare use)

---

## 🛠️ Tech Stack

- **Framework**: [Hono](https://hono.dev/) - Lightweight web framework
- **Runtime**: Cloudflare Workers
- **Styling**: Tailwind CSS 3.4+
- **Build**: Vite 6.4.1
- **Deployment**: Wrangler CLI
- **Icons**: Font Awesome 6.4.0
- **Fonts**: Google Fonts (Bebas Neue, Inter, Oswald)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or pnpm

### Installation
```bash
# Clone the repository
git clone https://github.com/captainburbseye-web/CRS-Web-1.git
cd CRS-Web-1

# Install dependencies
npm install

# Build the project
npm run build

# Start local development
npm run dev
```

### Development Scripts
```bash
npm run dev          # Start Vite dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run deploy       # Deploy to Cloudflare Pages
```

---

## 📂 Project Structure

```
webapp/
├── src/
│   ├── index.tsx          # Main Hono app with all routes
│   ├── renderer.tsx       # HTML head/layout wrapper
│   └── index.tsx.backup   # Backup files
├── public/
│   ├── static/
│   │   └── style.css      # Custom CSS with Tailwind
│   └── favicon.svg        # Site favicon
├── dist/                  # Build output (generated)
├── .git/                  # Git repository
├── .gitignore             # Git ignore rules
├── BREWFORCE_COLOR_SYSTEM.md    # Color philosophy
├── DESIGN_CRITIQUE.md           # Design analysis
├── CRITICAL_FIXES_COMPLETE.md   # Implementation log
├── README.md              # This file
├── LICENSE                # MIT License
├── ecosystem.config.cjs   # PM2 configuration
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind configuration
├── postcss.config.js      # PostCSS configuration
├── tsconfig.json          # TypeScript config
├── vite.config.ts         # Vite bundler config
└── wrangler.jsonc         # Cloudflare Workers config
```

---

## 🌍 Deployment

### Cloudflare Pages (Production)

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy via Wrangler:**
   ```bash
   wrangler pages deploy dist --project-name cowleyroadstudios
   ```

3. **Or connect via Cloudflare Dashboard:**
   - Go to Workers & Pages → Create Application → Pages
   - Connect to GitHub repository
   - Build command: `npm run build`
   - Output directory: `dist`

### Environment Variables
Create `.dev.vars` for local development:
```
# Add any API keys or secrets here
# This file is gitignored
```

---

## 🎯 Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage with all sections |
| `/#about` | About section |
| `/#cafe` | Workshop Café details |
| `/#studio` | Studio specifications |
| `/#promise` | Grassroots Promise |
| `/#contact` | Booking & vouchers |
| `/booking-success` | Booking confirmation page |

---

## 🎨 Design Philosophy

### Foliage Physics (Dominant)
Green provides structure and calm. Like a forest, light dominates with green as accent:
- Cream background (light, air, space)
- Olive accents (structure, trunks, roots)
- Sage tints (soft foliage highlights)

### Flame Physics (Energy)
Fire provides transformation and urgency:
- Mustard (outer flame, primary CTAs)
- Fire Orange (inner flame, accents)
- Electric Purple (core energy, rare use 1-3%)

**Rule:** Green is the world. Fire is the signal. Purple is the core. Brown is the root.

---

## 📊 Performance

- **CSS Bundle**: ~10-50KB (Tailwind optimized via PostCSS)
- **JavaScript**: ~60KB (Hono + app code)
- **First Load**: <2s on 3G
- **Lighthouse Score**: 90+ (Performance, Accessibility, Best Practices)

---

## ♿ Accessibility

- **WCAG 2.1 AA Compliant**: Contrast ratios meet standards
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader**: Semantic HTML with ARIA labels
- **Focus States**: Clear focus indicators on all interactive elements
- **Responsive**: Mobile-first design

---

## 🤝 Contributing

This is a private repository for Cowley Road Studios. For inquiries or collaboration:
- **All enquiries are handled via the contact form.**
- **Location**: 118 Cowley Road, Oxford, OX4 1JE

---

## 📄 License

MIT License - See [LICENSE](LICENSE) file for details.

---

## 🎸 Credits

**Built with:**
- [Hono](https://hono.dev/) - Web framework
- [Cloudflare Workers](https://workers.cloudflare.com/) - Edge runtime
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Font Awesome](https://fontawesome.com/) - Icons
- [Google Fonts](https://fonts.google.com/) - Typography

**Design & Development:** 2024-2026  
**Studio Legacy:** Soundworks Studio (2004-2024) → Cowley Road Studios (2024-)

---

## 📞 Contact

**Cowley Road Studios**  
118 Cowley Road  
Oxford  
OX4 1JE

**Crowdfunder**: https://www.crowdfunder.co.uk/p/cowley-road-studios  
**Book a Session**: https://app.squareup.com/appointments/book/5f88zzreivvg8j/L9RPJZW999RE7/start  
**Contact**: /contact

---

*Where Sound, Vision & Community Find Their Home* 🎸
