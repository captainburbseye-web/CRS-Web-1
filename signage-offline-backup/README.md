# CRS SIGNAGE LOOP - OFFLINE BACKUP

## Overview
This is a standalone HTML/CSS/JS version of the Cowley Road Studios Signage Loop for use as a **Yodeck fallback** when internet connectivity is unavailable.

## Contents
```
signage-offline-backup/
├── index.html          # Main HTML file
├── styles.css          # Elite Trend Tech styling
├── script.js           # Vanilla JS slideshow logic
├── assets/             # Production WebP assets
│   ├── cowley-rehearsal-optimized.webp (56KB)
│   ├── cricket-rehearsal-magenta-optimized.webp (52KB)
│   ├── cricket-control-room-optimized.webp (29KB)
│   ├── workshop-cafe-optimized.webp (169KB)
│   └── master-bus-ch7-optimized.webp (134KB)
└── README.md           # This file
```

**Total Size:** ~450 KB (all assets + code)

## Features
✅ **Auto-Cycling Slideshow** - 5 modules × 10 seconds = 50-second loop  
✅ **Smooth Transitions** - 500ms fade in/out  
✅ **Progress Bar** - Visual timer at bottom  
✅ **Burn-in Protection** - 1px pixel shift every 60 seconds  
✅ **Kiosk Mode** - Cursor hidden, no scrollbars  
✅ **Zero Dependencies** - Pure HTML/CSS/JS (no npm, no React)  
✅ **Elite Trend Tech Aesthetic** - Ghost Chassis + Neon Glow + Kinetic Typography

## Playlist
```
0:00-0:10  →  CH1 Cowley Rehearsal (Yellow)
0:10-0:20  →  CH8 Cricket Rehearsal (Magenta)
0:20-0:30  →  CH2 Control Room (Cyan)
0:30-0:40  →  CH4 Workshop Café (Amber)
0:40-0:50  →  CH7 Master Bus (Green)
0:50       →  ↻ Loop back to CH1
```

## Deployment Instructions

### Option A: Yodeck Local Upload (Recommended for Offline Backup)
1. **Compress** this entire folder into a `.zip` file
2. Login to **Yodeck Dashboard**
3. Go to **Media Library** → **Add Media** → **Upload File**
4. Upload the `.zip` file
5. Yodeck will extract and serve `index.html` automatically
6. **Set as Fallback:** In playlist settings, set this as the "offline fallback" content

### Option B: USB Stick Deployment
1. Copy this entire folder to a **USB stick**
2. Plug USB into the Yodeck player
3. In Yodeck dashboard, add **Local File** media type
4. Select the USB drive and navigate to `index.html`
5. Schedule as normal content or fallback

### Option C: Local Preview (Testing)
1. Open `index.html` in any modern browser
2. Should work offline without any web server
3. Press `F11` for fullscreen kiosk mode testing

## Technical Specifications

### Browser Compatibility
- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Yodeck Player (Chromium-based)

### Resolution
- **Optimized for:** 1920×1080 (Full HD)
- **Aspect Ratio:** 16:9
- **Responsive:** Scales to any 16:9 display

### Performance
- **Load Time:** <1 second (all assets cached)
- **Memory Usage:** <50MB
- **CPU Usage:** Minimal (CSS animations only)

## Customization

### Change Slide Duration
Edit `script.js`:
```javascript
const SLIDE_DURATION = 10000; // Change to 15000 for 15 seconds
```

### Change Transition Speed
Edit `script.js`:
```javascript
const FADE_DURATION = 500; // Change to 1000 for 1 second fade
```

### Add/Remove Slides
Edit the `playlist` array in `script.js`:
```javascript
const playlist = [
  { id: 'ch1', channel: '1', title: 'Cowley Rehearsal', ... },
  // Add your slide here
];
```

### Change Colors
Edit `styles.css` under "Channel-Specific Colors":
```css
.slide[data-channel="1"] .slide-bg-glow { background: #FFDB58; }
.slide[data-channel="1"] .slide-title { color: #FFDB58; }
```

## Comparison: Live vs Offline

| Feature | Live Route | Offline Backup |
|---------|-----------|----------------|
| URL | https://cowleyroadstudios.com/signage-loop | Local file |
| Dependencies | React, Hono, Cloudflare | None (HTML/CSS/JS) |
| Internet | Required | Not required |
| Updates | Automatic (hot reload) | Manual (re-upload) |
| Size | ~970 KB (with React) | ~450 KB (standalone) |
| Resilience | Network dependent | 100% offline |

## Troubleshooting

### Assets Not Loading
- Ensure `assets/` folder is in the same directory as `index.html`
- Check browser console for 404 errors
- Verify WebP support (all modern browsers)

### Slideshow Not Starting
- Check browser console for JavaScript errors
- Ensure `script.js` is loaded after DOM
- Try hard refresh (Ctrl+Shift+R)

### Progress Bar Not Animating
- Check if browser supports CSS animations
- Disable browser extensions that block animations
- Try in fullscreen mode (F11)

## Support

For issues or questions:
- Email: info@cowleyroadstudios.com
- Phone: +44 1865 123456
- Website: https://cowleyroadstudios.com

## License

© 2026 Cowley Road Studios. All rights reserved.
Continuing the Soundworks Oxford legacy (1999-2024).
