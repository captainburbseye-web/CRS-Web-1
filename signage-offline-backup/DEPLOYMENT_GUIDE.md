# DEPLOYMENT GUIDE - OFFLINE SIGNAGE BACKUP

## 🎯 Overview
This offline backup allows you to deploy the CRS Signage Loop as a **standalone HTML file** with **zero dependencies** for maximum resilience.

## 📦 What's Included

### Local Assets (Offline-Ready)
- `assets/cowley-rehearsal-optimized.webp` (56KB) - CH1
- `assets/cricket-rehearsal-magenta-optimized.webp` (52KB) - CH8
- `assets/cricket-control-room-optimized.webp` (29KB) - CH2
- `assets/workshop-cafe-optimized.webp` (169KB) - CH4

### R2 Assets (Requires Internet)
- `https://pub-cf83109acdfe4a0fbecf1fb8fc73f559.r2.dev/pod%20rack%20ui%20.png` - CH3
- `https://pub-cf83109acdfe4a0fbecf1fb8fc73f559.r2.dev/Contact%20rack%20ui.png` - CH6
- `https://pub-cf83109acdfe4a0fbecf1fb8fc73f559.r2.dev/ch7%20rack%20bottom%20ui.png` - CH7

## 🚀 Deployment Options

### Option 1: Yodeck Web Page (Recommended)
**Best for: Live street display with automatic updates**

1. Login to Yodeck Dashboard
2. Media Library → Add Media → Web Page
3. URL: `https://cowleyroadstudios.com/signage-loop`
4. Settings:
   - Zoom: 100% (or 125% if text too small)
   - Refresh: Disabled
   - Duration: Always Playing
5. Assign to 55" display
6. Push to screen

**Advantages:**
- Auto-updates when you update the website
- No manual file uploads
- Always shows latest content
- Requires stable internet

### Option 2: Yodeck Local Upload (Fallback)
**Best for: Offline backup when internet fails**

1. Compress this folder to `.zip`
2. Yodeck Dashboard → Media Library → Upload File
3. Upload the `.zip` file
4. Yodeck extracts and serves `index.html`
5. Set as "Fallback Content" in playlist settings

**Advantages:**
- Works offline
- Zero internet dependency for local assets
- CH3, CH6, CH7 require internet (R2 URLs)
- Manual updates required

### Option 3: USB Stick Deployment
**Best for: Emergency backup or testing**

1. Copy entire folder to USB stick
2. Plug USB into Yodeck player
3. Dashboard → Add Media → Local File
4. Navigate to USB → `index.html`
5. Schedule as normal or fallback

**Advantages:**
- Instant deployment
- No network required for transfer
- CH3, CH6, CH7 still require internet (R2 URLs)

## 🎨 7-Unit Playlist

```
Timeline (70-second loop):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

0:00-0:10  →  CH1 Cowley Rehearsal (Yellow)
0:10-0:20  →  CH8 Cricket Rehearsal (Magenta)
0:20-0:30  →  CH2 Control Room (Cyan)
0:30-0:40  →  CH3 Cowley Pods (Charcoal/Yellow) [R2]
0:40-0:50  →  CH6 Contact & Location (Black/Amber) [R2]
0:50-1:00  →  CH4 Workshop Café (Amber)
1:00-1:10  →  CH7 Master Bus (Green) [R2] ← Footer
1:10       →  ↻ Loop back to CH1
```

## 🔧 Customization

### Change Slide Duration
Edit `script.js` line 6:
```javascript
const SLIDE_DURATION = 10000; // 10 seconds (change to 15000 for 15s)
```

### Change Fade Speed
Edit `script.js` line 7:
```javascript
const FADE_DURATION = 500; // 0.5 seconds
```

### Add/Remove Slides
Edit `script.js` playlist array (lines 11-69):
```javascript
const playlist = [
  { id: 'ch1', channel: '1', title: 'Cowley Rehearsal', ... },
  // Your slide here
];
```

## 🧪 Testing

### Local Preview (Browser)
1. Open `index.html` in Chrome/Firefox/Safari
2. Should work immediately (no server needed)
3. Press `F11` for fullscreen kiosk mode
4. CH3, CH6, CH7 require internet to load R2 assets

### Local Preview (HTTP Server)
```bash
# Option A: Python
cd signage-offline-backup
python3 -m http.server 8080
# Open http://localhost:8080

# Option B: Node.js
npx serve signage-offline-backup
```

## 📊 System Requirements

### Browser Compatibility
- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Yodeck Player (Chromium)

### Display Resolution
- **Optimized:** 1920×1080 (Full HD)
- **Aspect Ratio:** 16:9
- **Responsive:** Scales to any 16:9 display

### Performance
- **Load Time:** <1s (local assets)
- **Memory:** <50MB
- **CPU:** Minimal (CSS animations)
- **R2 Assets:** ~6.4MB raw (loaded over internet)

## ⚠️ Important Notes

### Internet Dependency
- **CH1, CH2, CH4, CH8:** Fully offline (local assets)
- **CH3, CH6, CH7:** Require internet (R2 URLs)
- If internet fails: CH3, CH6, CH7 won't load (placeholder shown)

### Hybrid Strategy
**Recommended Setup:**
1. **Primary:** Option 1 (Yodeck Web Page) → Full live updates
2. **Fallback:** Option 2 (Local Upload) → Offline backup (4/7 slides work offline)

This gives you:
- Auto-updates when online
- Partial functionality when offline (CH1, CH2, CH4, CH8)
- CH7 Master Bus as footer (requires internet)

## 🆘 Troubleshooting

### CH3, CH6, CH7 Not Loading
- ✅ Check internet connection
- ✅ Verify R2 URLs are accessible
- ✅ Check browser console for CORS errors
- ✅ Test R2 URLs directly in browser

### Slideshow Not Starting
- ✅ Check browser console for JS errors
- ✅ Ensure `script.js` loaded after DOM
- ✅ Hard refresh (Ctrl+Shift+R)

### Assets Not Loading (CH1, CH2, CH4, CH8)
- ✅ Ensure `assets/` folder exists
- ✅ Check file permissions (644)
- ✅ Verify WebP support (all modern browsers)

## 📞 Support

- **Email:** info@cowleyroadstudios.com
- **Website:** https://cowleyroadstudios.com
- **Live Route:** https://cowleyroadstudios.com/signage-loop

## 📝 Version History

- **v1.1** (2026-02-07): 7-unit playlist with R2 URLs for CH3, CH6, CH7
- **v1.0** (2026-02-07): Initial 5-unit offline backup

---

**Status:** HYBRID MODE (4 local + 3 R2 assets)  
**Bundle Size:** 308KB (tarball)  
**Internet Required:** Yes (for CH3, CH6, CH7)  
**Deployment Ready:** ✅
