# CRS Signage Signal - Offline Backup

## Purpose
This offline backup provides a **standalone HTML signage display** that works without an internet connection. Use this as a fallback for Yodeck displays when the main `/signagesignal` route is unavailable.

---

## Setup Instructions

### 1. Copy Assets
Copy the following rack images from the main site to the `assets/` folder:

```bash
# From the main CRS site static folder
cp public/static/rack-images/rehearsal-combi-1920w.webp signage-offline-backup/assets/
cp public/static/rack-images/recording-services-1920w.webp signage-offline-backup/assets/
cp public/static/rack-images/control-room-buttons-1920w.webp signage-offline-backup/assets/
cp public/static/rack-images/workshop-cafe-1920w.webp signage-offline-backup/assets/
cp public/static/rack-images/welcome-rack-1920w.webp signage-offline-backup/assets/
```

### 2. Generate QR Codes
Generate QR codes for each service and save as PNG files:

- `qr-book.png` → https://cowleyroadstudios.com/book
- `qr-cafe.png` → https://cowleyroadstudios.com/workshop-cafe
- `qr-home.png` → https://cowleyroadstudios.com

**Using online tool:**
1. Visit https://www.qr-code-generator.com/
2. Enter URL
3. Download as PNG (200×200px minimum)
4. Save to `assets/` folder

**Using command line (qrencode):**
```bash
qrencode -o assets/qr-book.png "https://cowleyroadstudios.com/book"
qrencode -o assets/qr-cafe.png "https://cowleyroadstudios.com/workshop-cafe"
qrencode -o assets/qr-home.png "https://cowleyroadstudios.com"
```

### 3. Test Locally
Open `index.html` in a browser:
```bash
cd signage-offline-backup
python3 -m http.server 8000
# Visit http://localhost:8000
```

### 4. Deploy to Yodeck
1. Zip the entire folder: `zip -r signage-backup.zip signage-offline-backup/`
2. Upload zip to Yodeck as **Web Content**
3. Set **index.html** as the entry point
4. Configure **8-second refresh** interval

---

## Features

✅ **No dependencies** - Pure HTML/CSS/JS  
✅ **Offline-ready** - Works without internet  
✅ **8-second auto-rotation** - Matches main signage channel  
✅ **Keyboard navigation** - Arrow keys to manually advance  
✅ **1920×1080 optimized** - Perfect for 55" displays  
✅ **QR codes** - Easy booking access  

---

## File Structure

```
signage-offline-backup/
├── index.html              # Main signage page
├── README.md               # This file
└── assets/                 # Image assets (create this folder)
    ├── rehearsal-combi-1920w.webp
    ├── recording-services-1920w.webp
    ├── control-room-buttons-1920w.webp
    ├── workshop-cafe-1920w.webp
    ├── welcome-rack-1920w.webp
    ├── qr-book.png
    ├── qr-cafe.png
    └── qr-home.png
```

---

## Keyboard Shortcuts

- **Arrow Right** → Next slide
- **Arrow Left** → Previous slide
- **Space** → Pause/Resume (not implemented in basic version)

---

## Troubleshooting

### Images not loading
- Check that images are in `assets/` folder
- Verify file names match exactly
- Use WebP format (or convert to JPG if needed)

### Carousel not advancing
- Check browser console for JS errors
- Ensure auto-advance interval is set (8000ms)
- Try refreshing the page

### QR codes not working
- Verify QR code images exist in `assets/`
- Test QR codes with phone camera before deploying
- Ensure URLs are correct (https://)

---

## Maintenance

Update slide content by editing `index.html`:
- Change text in `.title` and `.description` classes
- Update QR code images in `assets/`
- Modify slide duration (currently 8000ms) in the setInterval call

---

## Production Deployment

1. **Test thoroughly** on target Yodeck hardware
2. **Monitor performance** (8-second intervals should be smooth)
3. **Backup regularly** (keep zip file with current assets)
4. **Update quarterly** (refresh images and QR codes)

---

## Support

For issues or questions:
- Email: info@crsoxford.com
- GitHub: https://github.com/captainburbseye-web/CRS-Web-1
- Main signage: https://cowleyroadstudios.com/signagesignal
