# 🎨 WORKSHOP CAFÉ BRANDING ASSETS

## 📦 ASSETS DOWNLOADED

### **Images** (6 files)
1. **sell-your-art-poster.jpg** (113.90 KB)
   - Internal poster/promotional material
   - Features Workshop Café logo in frame
   - "Sell Your Art Here!" messaging

2. **cafe-exterior-front.jpg** (137.31 KB)
   - Street-level front view
   - Shows green trim architecture
   - Yellow signage: "THE WORKSHOP CAFE"
   - Subtitle: "COFFEE • REPAIRS • MUSICAL CURIOS • WORK SPACES"

3. **cafe-exterior-angle.jpg** (180.70 KB)
   - Angled exterior shot
   - Shows "THE BILLET BUILDING - HOME TO -" header
   - Green Victorian-style trim details
   - Window reflections, street context

4. **signage-clean-vector.png** (26.03 KB)
   - Clean vector signage lockup
   - "THE BILLET BUILDING"
   - "THE WORKSHOP CAFE"
   - "COFFEE • REPAIRS • MUSICAL CURIOS • TECH SOLUTIONS"
   - Green border, yellow/gold background

5. **logo-3d-render-dark.jpg** (228.57 KB)
   - 3D rendered logo with dramatic lighting
   - Gear with coffee cup center
   - Orange/amber/green color scheme
   - Metallic texture, atmospheric background

6. **logo-clean-vector.png** (631.22 KB)
   - Clean vector logo
   - Gear ring (orange outer, green/orange inner)
   - Coffee cup with waveform steam
   - "WORKSHOP CAFÉ" text (brown/rust color)

### **Videos** (2 files)
1. **cafe-interior-1.mp4** (2.27 MB)
   - Interior space walkthrough/pan
   
2. **cafe-interior-2.mp4** (3.03 MB)
   - Additional interior footage

---

## 🎨 BRAND COLORS IDENTIFIED

| Color | Hex (Approx) | Usage |
|-------|--------------|-------|
| **Green (Trim)** | `#7A9B6F` | Building trim, logo accents |
| **Yellow/Gold (Signage)** | `#D4AF37` / `#F4E4A6` | Background signage |
| **Dark Green (Text)** | `#2C5234` | Primary text on signage |
| **Orange (Logo)** | `#E89B3C` | Gear outer ring |
| **Rust/Brown (Text)** | `#7B4B3A` | "Workshop Café" wordmark |
| **Amber (Accents)** | `#F59E0B` | Warm accent lighting |

---

## 🔤 TYPOGRAPHY

### Signage Font
- **Weight**: Bold, condensed
- **Style**: Industrial, modern sans-serif
- **Characteristics**: Uppercase, tight spacing

### Logo Font
- **Weight**: Bold, chunky
- **Style**: Hand-drawn, organic
- **Characteristics**: Uppercase, slightly irregular

---

## 🏗️ BRAND ELEMENTS

### 1. The Gear Symbol
- Industrial/mechanical aesthetic
- Represents "workshop" concept
- Dual-colored (orange outer, green/orange inner segments)
- Always contains coffee cup at center

### 2. Coffee Cup Icon
- Simple line-art style
- Steam lines (3 wavy lines)
- Waveform detail (audio/music connection)
- Sits in center of gear

### 3. Building Context
- "THE BILLET BUILDING - HOME TO -"
- Establishes location/heritage
- Victorian architecture with green trim
- Street-level retail space

### 4. Service Offerings
Primary: **COFFEE • REPAIRS • MUSICAL CURIOS • WORK SPACES**
Alt: **COFFEE • REPAIRS • MUSICAL CURIOS • TECH SOLUTIONS**

---

## 🎯 INTEGRATION OPPORTUNITIES

### For Digital Signage (/signage-enhanced)

1. **Add Workshop Café Slide**
   - Background: cafe-exterior-front.jpg or logo-3d-render-dark.jpg
   - Title: "WORKSHOP CAFÉ"
   - Subtitle: "THE BILLET BUILDING · 118 COWLEY ROAD"
   - Services: "Coffee • Repairs • Musical Curios • Work Spaces"
   - QR Code: Link to /workshop-cafe page
   - Channel: CH-05

2. **Replace Generic Café Slide**
   - Currently: `/static/machined-assets/workshop-cafe-optimized.webp`
   - Replace with: Real exterior photo
   - Add: "Sell Your Art Here!" callout
   - Add: Opening hours/status

3. **Add Video Background (Optional)**
   - Use cafe-interior-1.mp4 or cafe-interior-2.mp4
   - Looping background for café slide
   - Subtle parallax effect

4. **Color Palette Integration**
   - Green: `#7A9B6F` (matches building trim)
   - Yellow/Gold: `#D4AF37` (signage background)
   - Orange: `#E89B3C` (gear accent)
   - Works with existing CRS amber/brass palette

---

## 📐 LOGO USAGE GUIDELINES

### Primary Logo: `logo-clean-vector.png`
- Use on light backgrounds
- Minimum size: 120px wide
- Clear space: 20px on all sides

### 3D Render: `logo-3d-render-dark.jpg`
- Use for hero sections
- Full-bleed backgrounds
- Atmospheric/mood setting

### Signage Lockup: `signage-clean-vector.png`
- Use for headers/banners
- Wide format (horizontal)
- Best for digital displays

---

## 🚀 NEXT STEPS

1. **Convert to WebP/AVIF**
   ```bash
   cd /home/user/webapp/public/static/workshop-cafe-assets
   cwebp -q 85 cafe-exterior-front.jpg -o cafe-exterior-front.webp
   cwebp -q 85 logo-3d-render-dark.jpg -o logo-3d-render-dark.webp
   ```

2. **Update Signage Component**
   - Replace generic café slide with real assets
   - Add Workshop Café channel (CH-05)
   - Update QR code destination

3. **Create Dedicated Workshop Café Page**
   - Hero section with 3D logo render
   - Service grid (Coffee, Repairs, Curios, Workspaces)
   - Gallery with interior videos
   - "Sell Your Art Here" CTA section

4. **Test on Display**
   - Verify colors match physical signage
   - Check logo visibility at distance
   - Confirm QR code scannability

---

## 📂 FILE LOCATIONS

```
/home/user/webapp/public/static/workshop-cafe-assets/
├── sell-your-art-poster.jpg (113.90 KB)
├── cafe-exterior-front.jpg (137.31 KB)
├── cafe-exterior-angle.jpg (180.70 KB)
├── signage-clean-vector.png (26.03 KB)
├── logo-3d-render-dark.jpg (228.57 KB)
├── logo-clean-vector.png (631.22 KB)
├── cafe-interior-1.mp4 (2.27 MB)
└── cafe-interior-2.mp4 (3.03 MB)
```

**Total Assets**: 8 files (3.85 MB)

---

**Status**: ✅ Assets downloaded and catalogued  
**Ready for**: Integration into signage system  
**Next**: Update `/signage-enhanced` with real Workshop Café content
