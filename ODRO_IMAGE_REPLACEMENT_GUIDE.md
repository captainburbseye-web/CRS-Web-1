# 🔧 ODRO REPAIR PANEL - IMAGE REPLACEMENT GUIDE

**Issue**: Current ODRO panel image is cropped, causing button labels to misalign with indicator lights  
**Current Image**: `1024×552px` (aspect ratio 1.86:1)  
**Status**: ⚠️ Temporary fix applied (labels repositioned to bottom 20%)

---

## 🎯 PERFECT IMAGE SPECIFICATIONS

### **Option 1: Standard Widescreen (Recommended)**
```
Dimensions: 1920×1080px (16:9 aspect ratio)
Format: WebP (primary) + JPG (fallback)
File size: <200KB (WebP), <300KB (JPG)
Quality: 85% compression
Color space: sRGB
```

### **Option 2: Ultra-Wide Crop**
```
Dimensions: 1920×600px (3.2:1 aspect ratio)
Format: WebP + JPG
File size: <150KB (WebP), <200KB (JPG)
Quality: 85% compression
Color space: sRGB
```

---

## 📐 LAYOUT REQUIREMENTS

### **Critical Elements (Must be visible after cropping)**

#### **Top Section** (0-40% from top)
- ✅ "ODRO" logo (yellow/white split design)
- ✅ "AV & INSTRUMENT REPAIR" subtitle
- ✅ Left/right mounting screws

#### **Middle Section** (40-70% from top)
- ✅ Two VU meters (analog gauges)
- ✅ Green panel background
- ✅ Central rack aesthetic

#### **Bottom Section** (70-100% from top) - **MOST IMPORTANT**
- ✅ Three indicator lights (orange, orange, green)
- ✅ Lights positioned at **75-80% from top** of final image
- ✅ Even horizontal spacing (33% each)
- ✅ Bright/glowing appearance

---

## 🎨 VISUAL SPECIFICATIONS

### **Indicator Light Requirements**
```
Left light (Terms):   Orange/amber (#FF8C00) - glowing
Middle light (Book):  Orange/amber (#FF8C00) - glowing  
Right light (Contact): Green (#00FF00) - glowing

Size: ~40-60px diameter in final 1920px width
Brightness: High (should stand out clearly)
Glow effect: Subtle radial gradient/blur
Background: Dark contrast for visibility
```

### **Overall Aesthetic**
- Industrial/vintage rack equipment feel
- Weathered/realistic texture
- Consistent with other rack modules
- Professional studio gear appearance

---

## 📏 CROPPING & POSITIONING

### **How the Image Will Be Displayed**

The ODRO rack container has these constraints:
```css
Desktop:  max-height: 380px
Tablet:   max-height: 360px
Mobile:   max-height: 320px

overflow: hidden (crops bottom of image)
object-fit: cover
object-position: center
```

### **Button Label Positioning**

Labels will be overlaid at these positions:
```css
Desktop:  bottom: 20% (76px from bottom of 380px container)
Tablet:   bottom: 32% (115px from bottom of 360px container)
Mobile:   bottom: 32% (102px from bottom of 320px container)
```

### **Safe Zone for Indicator Lights**

To ensure lights are always visible and align with labels:

**For 1920×1080px image:**
- Place indicator lights at **Y position 810-864px** (75-80% from top)
- This ensures lights appear at bottom 20-25% of **visible cropped area**

**For 1920×600px image:**
- Place indicator lights at **Y position 450-480px** (75-80% from top)
- Simpler layout, less wasted space above

---

## 🖼️ IMAGE CREATION CHECKLIST

### **Phase 1: Layout**
- [ ] Choose dimensions (1920×1080 or 1920×600)
- [ ] Position ODRO logo in top 20%
- [ ] Place VU meters in middle 50%
- [ ] Position 3 indicator lights at bottom 75-80%

### **Phase 2: Visual Details**
- [ ] Add industrial/rack aesthetic (screws, panels, texture)
- [ ] Create glowing indicator lights (orange/orange/green)
- [ ] Ensure high contrast (dark background, bright lights)
- [ ] Add realistic wear/patina for authenticity

### **Phase 3: Alignment Test**
- [ ] Lights horizontally centered at 33%, 50%, 67% width
- [ ] Lights vertically at 75-80% from top
- [ ] Each light ~40-60px diameter
- [ ] Sufficient spacing between lights (min 100px)

### **Phase 4: Export**
- [ ] Export as WebP (1920×1080 or 1920×600, quality 85%)
- [ ] Export as JPG (same dimensions, quality 85%)
- [ ] File sizes: WebP <200KB, JPG <300KB
- [ ] Verify sRGB color space

---

## 📦 FILE DELIVERY

### **File Names**
```
odro-repair-panel.webp (primary)
odro-repair-panel.jpg (fallback)
```

### **Upload Location**
```
/home/user/webapp/public/static/rack-images/
```

### **Backup Current Files**
```bash
cd /home/user/webapp/public/static/rack-images
mv odro-repair-panel.webp odro-repair-panel-old.webp
mv odro-repair-panel.jpg odro-repair-panel-old.jpg
```

### **Upload New Files**
```bash
# Copy new files to rack-images folder
cp /path/to/new/odro-repair-panel.webp ./
cp /path/to/new/odro-repair-panel.jpg ./
```

---

## 🧪 TESTING AFTER REPLACEMENT

### **Visual Verification**
1. Visit https://cowleyroadstudios.com (Rack Accordion section)
2. Scroll to ODRO Repair module
3. Verify:
   - ✅ Three indicator lights visible
   - ✅ "Terms" label on left orange light
   - ✅ "Book Repair" label on middle orange light
   - ✅ "Contact" label on right green light
   - ✅ Labels clearly readable
   - ✅ No overlap/misalignment

### **Responsive Testing**
- [ ] Desktop (1920×1080): All lights + labels visible
- [ ] Tablet (768-1280px): All lights + labels visible
- [ ] Mobile (320-767px): All lights + labels visible

### **Interaction Testing**
- [ ] Hover over "Terms" → label highlights orange
- [ ] Hover over "Book Repair" → label highlights orange
- [ ] Hover over "Contact" → label highlights green
- [ ] Click "Terms" → modal opens
- [ ] Click "Book Repair" → navigates to /contact?service=repairs
- [ ] Click "Contact" → navigates to /contact

---

## 🎨 DESIGN REFERENCE

### **Current ODRO Panel Elements**
```
Top:    "ODRO" logo (yellow/white split) + "AV & INSTRUMENT" text
Middle: Two VU meters with analog needles
Bottom: Three illuminated indicator lights

Color Palette:
  Background:    Dark grey/green industrial panel
  Logo:          Yellow (#FFD700) + White (#FFFFFF)
  VU Meters:     Brass/beige face with black needles
  Indicators:    Orange (#FF8C00) × 2, Green (#00FF00) × 1
  Accents:       Metallic screws, panel rivets
```

### **Reference Images**
- Current ODRO panel: `/public/static/rack-images/odro-repair-panel.webp`
- Other rack modules: `/public/static/rack-images/` (for style consistency)

---

## 🔧 QUICK FIX OPTION (If creating new image is not possible)

If you can't create a new image right now, here's a CSS-only workaround:

### **Option A: Increase Container Height**
```css
/* In odro-repair-hotspots.css */
.odro-repair-container {
  max-height: 500px; /* Increase from 380px */
}
```
⚠️ **Warning**: May cause overlap with racks below

### **Option B: Adjust Object Position**
```css
/* In odro-repair-hotspots.css */
.odro-repair-container img {
  object-position: center top; /* Show more of top, crop more of bottom */
}
```
⚠️ **Warning**: May cut off important bottom elements

### **Current Applied Fix** (Temporary)
```css
.odro-repair-hotspots {
  bottom: 20%; /* Adjusted from 35% to compensate for cropping */
}
```
✅ **Status**: This is what's currently live (as of commit `550edc2`)

---

## 📊 COMPARISON

| Aspect | Current Image | Ideal Replacement |
|--------|---------------|-------------------|
| **Dimensions** | 1024×552px | 1920×1080px or 1920×600px |
| **Aspect Ratio** | 1.86:1 | 16:9 (1.78:1) or 3.2:1 |
| **Indicator Lights** | Bottom 20% (cropped out) | Bottom 25% (always visible) |
| **Label Alignment** | ⚠️ Misaligned | ✅ Perfectly aligned |
| **File Size** | 110KB (WebP) | <200KB (WebP) |
| **Cropping Issue** | ❌ Yes (lights cut off) | ✅ No (designed for cropping) |

---

## 🚀 DEPLOYMENT CHECKLIST

After uploading new image:

1. **Clear Cloudflare Cache**
   - Purge `/static/rack-images/odro-repair-panel.*`

2. **Test on Multiple Devices**
   - Desktop browser
   - Tablet (iPad)
   - Mobile (iPhone/Android)

3. **Verify Performance**
   - Check file sizes loaded
   - Confirm WebP served (not JPG fallback)
   - Lighthouse audit score maintained

4. **Document Changes**
   ```bash
   git add public/static/rack-images/odro-repair-panel.*
   git commit -m "feat: replace ODRO panel image with properly aligned version"
   git push origin main
   ```

---

## 📞 SUPPORT

If you need help creating the replacement image:

- **Current Image**: `/home/user/webapp/public/static/rack-images/odro-repair-panel.webp`
- **Dimensions Needed**: 1920×1080px or 1920×600px
- **Critical Element**: Three indicator lights at bottom 75-80% from top
- **Button Labels**: Will overlay at `bottom: 20%` (76px from container bottom)

**Recommendation**: Use the current image as a base, crop/extend to 1920×1080, reposition lights to Y=810-864px

---

**Created**: 2026-03-02  
**Last Updated**: 2026-03-02  
**Current Fix**: Temporary label repositioning (bottom: 20%)  
**Permanent Solution**: Replace image with specifications above  

🔧 **Status**: ⚠️ Functional but needs proper image replacement for perfect alignment
