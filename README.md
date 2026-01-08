# Cowley Road Studios

## Project Overview
**Name**: Cowley Road Studios  
**Tagline**: Where Sound, Vision & Community Find Their Home  
**Mission**: Professional-grade recording infrastructure. Grassroots pricing. No gatekeeping.

## URLs
- **Sandbox Development**: https://3000-i120gm47ob6pt5yl54vy3-2e1b9533.sandbox.novita.ai
- **Production**: https://cowleyroadstudios.com (Deployed via Netlify/Cloudflare)
- **Crowdfunder**: https://www.crowdfunder.co.uk/p/cowley-road-studios

## ✅ Currently Completed Features

### Navigation System (FIXED ✓)
1. ✅ Top navigation with proper anchor links:
   - `<a href="#about">About</a>`
   - `<a href="#cafe">Workshop Café</a>`
   - `<a href="#studio">Studio</a>`
   - `<a href="#promise">Promise</a>`
   - `<a href="#contact">Secure Launch Credit</a>`

2. ✅ All sections have correct ID attributes:
   - `id="hero"` - Hero section
   - `id="about"` - About section
   - `id="cafe"` - Workshop Café section
   - `id="studio"` - Studio section
   - `id="promise"` - Grassroots Promise section
   - `id="contact"` - Contact/Voucher section

3. ✅ Smooth scrolling behavior implemented:
   - CSS: `html { scroll-behavior: smooth; }`
   - Scroll padding to account for fixed header: `scroll-padding-top: 80px`
   - All sections have `scroll-margin-top: 80px`

4. ✅ Mobile menu functionality with JavaScript toggle
5. ✅ Footer navigation links also use anchor links

### Content Sections
- ✅ Hero with metrics strip (20+ Years, 200+ Artists, £100k+ Investment)
- ✅ About section with brand story
- ✅ Workshop Café section with day/night concept
- ✅ Studio section with technical specifications
- ✅ Grassroots Promise module (15% subsidized hours)
- ✅ Contact/Booking section with voucher offers
- ✅ Footer with quick links and location

### Brand Identity
- ✅ Color palette implemented:
  - Cream (#F8F6EE) - Background
  - Olive (#4A5B43) - Primary brand color
  - Mustard (#D4A437) - CTAs and highlights
  - Espresso (#4B3621) - Secondary text
  - Charcoal (#1E1E1E) - Primary text

- ✅ Typography:
  - Playfair Display (Headings) - Elegant, heritage feel
  - Inter (Body) - Clean, modern, readable

- ✅ Icons via Font Awesome 6.4.0
- ✅ Responsive design with Tailwind CSS

## Functional Entry URIs

All navigation is anchor-based on the single page:

| URI | Description |
|-----|-------------|
| `/` or `/#hero` | Hero section with tagline and metrics |
| `/#about` | About Cowley Road Studios |
| `/#cafe` | Workshop Café details |
| `/#studio` | Studio technical specifications |
| `/#promise` | Grassroots Promise (15% subsidized hours) |
| `/#contact` | Voucher booking and Crowdfunder link |

## Data Architecture

**Storage**: Static single-page application (no database)

**Data Models**: 
- Voucher information (static content)
  - 3-Hour Voucher: £70 (Save £35)
  - 6-Hour Voucher: £130 (Save £80)
- Studio specifications (static content)
- Metrics data (static content)

**External Links**:
- Crowdfunder: https://www.crowdfunder.co.uk/p/cowley-road-studios
- Stripe payment links (to be integrated)

## Features Not Yet Implemented

### Payment Integration
- [ ] Stripe payment links for vouchers
- [ ] Real-time booking system
- [ ] Contact form backend

### Content Enhancements
- [ ] Image assets (studio photos, café storefront)
- [ ] Logo integration (CRS Neon Logo)
- [ ] Video integration (studio tour)

### Additional Features
- [ ] Newsletter signup
- [ ] Blog/News section
- [ ] Artist showcase/portfolio
- [ ] Event calendar for café
- [ ] Testimonials section

## Recommended Next Steps

### Immediate Priorities
1. **Add Stripe Payment Links**: Integrate actual payment buttons for vouchers
2. **Upload Images**: Add real photos from handover doc assets
3. **Logo Integration**: Add CRS neon logo to header
4. **Deploy to Production**: Push to Cloudflare Pages for production deployment

### Short-term Enhancements
1. **Contact Form**: Add functional contact form with backend
2. **Analytics**: Add Google Analytics or Plausible
3. **SEO Optimization**: Add structured data markup
4. **Social Sharing**: Optimize Open Graph tags

### Long-term Development
1. **Booking System**: Full booking calendar and management
2. **CMS Integration**: Allow easy content updates
3. **Artist Profiles**: Showcase artists who've recorded at the studio
4. **Blog**: News, updates, and community stories

## User Guide

### Viewing the Site
Visit the development URL to see the live site with all navigation features working.

### Navigation
- Click any navigation link to smoothly scroll to that section
- On mobile, tap the hamburger menu to access navigation
- All links use proper anchor tags with smooth scrolling

### Testing Navigation
1. Click "About" in the header → Should scroll to About section
2. Click "Workshop Café" → Should scroll to Café section
3. Click "Studio" → Should scroll to Studio section
4. Click "Promise" → Should scroll to Grassroots Promise section
5. Click "Secure Launch Credit" → Should scroll to Contact/Voucher section

## Deployment

### Platform
**Cloudflare Pages** (via Hono framework)

### Status
✅ **Development**: Active in sandbox  
⏳ **Production**: Ready for deployment

### Tech Stack
- **Framework**: Hono (TypeScript)
- **Styling**: Tailwind CSS 4
- **Fonts**: Google Fonts (Playfair Display, Inter)
- **Icons**: Font Awesome 6.4.0
- **Build Tool**: Vite 6.4.1
- **Deployment**: Wrangler (Cloudflare CLI)

### Development Commands
```bash
# Build the project
npm run build

# Start local development server
npm run dev

# Start with PM2 (recommended for sandbox)
pm2 start ecosystem.config.cjs

# Check PM2 status
pm2 list

# View logs
pm2 logs --nostream

# Stop service
pm2 delete cowleyroadstudios

# Clean port 3000
fuser -k 3000/tcp
```

### Production Deployment
```bash
# Build first
npm run build

# Deploy to Cloudflare Pages
wrangler pages deploy dist --project-name cowleyroadstudios
```

## Technical Notes

### Navigation Implementation
The navigation system uses standard HTML anchor links that work perfectly with the single-page architecture:

```html
<!-- Navigation Links -->
<a href="#about">About</a>
<a href="#cafe">Workshop Café</a>
<a href="#studio">Studio</a>
<a href="#promise">Promise</a>
<a href="#contact">Secure Launch Credit</a>

<!-- Section IDs -->
<section id="hero">...</section>
<section id="about">...</section>
<section id="cafe">...</section>
<section id="studio">...</section>
<section id="promise">...</section>
<section id="contact">...</section>
```

### Smooth Scrolling CSS
```css
html {
  scroll-behavior: smooth;
  scroll-padding-top: 80px; /* Account for fixed header */
}

section {
  scroll-margin-top: 80px; /* Ensures sections don't hide under header */
}
```

---

**Last Updated**: Jan 08, 2026  
**Version**: 1.0.0  
**Status**: ✅ Navigation Fixed & Working
