# THE HYBRID STITCH PROTOCOL
## Production Specification for CRS Rack Tower

---

## 🎯 THE STRATEGY

**Concept**: Hybrid Split Faceplates
- Combine related services on single units
- Cowley (Left) vs Cricket (Right) split designs
- Reduce vertical scroll from 8+ units to **7 dense units**
- High-tech, customized aesthetic

**Total Stack**: 7 units (vertically stitched)
**Target Width**: 1048px
**Target Height**: ~2500px
**Format**: WEBP or PNG

---

## 📸 UNIT GENERATION PROMPTS

### 👑 RACK 1: THE HEADER (Rebranded)

**Visual Identity**: The Main Crown

**Prompt**:
```
A photorealistic close-up of a premium 19-inch rack branding plate. 

Style: Brushed black aluminum with chrome edges. 

Features: A wide, cinematic backlit panel in the center glowing with warm amber light. 

Text: The text inside the light reads: "CRS - OXFORD STUDIO NETWORK". 

Details: "Rack ears" on far edges with heavy bolts. 

View: Flat orthographic front view. 

Aspect Ratio: Wide panoramic (16:3). 

8k. --ar 5:1 --style raw
```

**Mapping**: Link to Home (`/`)

---

### 🟢🟣 RACK 2: REHEARSAL BOOKING (The Hybrid)

**Visual Identity**: Split Personality (Green Left / Magenta Right)

**Prompt**:
```
A photorealistic 19-inch rack unit faceplate with a split design. 

Concept: Two rehearsal rooms in one unit. 

Left Side: Painted Nettle Green (Military style) with analog switches and label "COWLEY RD". 

Right Side: Painted Deep Magenta (Industrial Grunge) with digital buttons and label "CRICKET RD". 

Center: A metal divider strip. 

Text: Large stenciled text across the top: "REHEARSAL BOOKING". 

View: Flat orthographic front view. 

Aspect Ratio: Wide panoramic (16:3). 

8k. --ar 5:1 --style raw
```

**Mapping**: 
- **Left Half** (0-50%): Link to `/book/rehearsal?location=cowley`
- **Right Half** (50-100%): Link to `/book/rehearsal?location=cricket`

**Split Hitbox Code**:
```tsx
<a href="/book/rehearsal?location=cowley" 
   style={hitbox('15%', '12%', '0', '50%')} 
   title="Cowley Road Rehearsal" />
<a href="/book/rehearsal?location=cricket" 
   style={hitbox('15%', '12%', '50%', '50%')} 
   title="Cricket Road Rehearsal" />
```

---

### ⚫⚪ RACK 3: CONTROL ROOM DRY HIRE (The Hybrid)

**Visual Identity**: Analog vs. Digital (Charcoal Left / Silver Right)

**Prompt**:
```
A photorealistic 19-inch rack unit faceplate divided into two sections. 

Subject: Control Room Hire. 

Left Side: Dark Charcoal brushed metal with vintage analog knobs and warm VU meters. Label: "COWLEY ANALOG". 

Right Side: Sleek Brushed Silver/Titanium with modern blue digital screens and encoders. Label: "CRICKET DIGITAL". 

Text: Central label plate reads: "CONTROL ROOM DRY HIRE". 

View: Flat orthographic front view. 

Aspect Ratio: Wide panoramic (16:3). 

8k. --ar 5:1 --style raw
```

**Mapping**:
- **Left Half** (0-50%): Link to `/book/control-room?location=cowley`
- **Right Half** (50-100%): Link to `/book/control-room?location=cricket`

---

### 🔴 RACK 4: RECORDING SERVICES (The Master)

**Visual Identity**: Reel-to-Reel Tape Aesthetic

**Prompt**:
```
A photorealistic close-up of a vintage master recording rack unit. 

Style: 1970s Abbey Road tape machine. 

Color: Soft grey-blue metal. 

Features: Two large spinning tape reels (embedded flat in the faceplate), heavy "REC" red buttons, and bouncing needle VU meters. 

Text: "RECORDING SERVICES // PRODUCTION". 

Details: Professional studio gear look. 

View: Flat orthographic front view. 

Aspect Ratio: Wide panoramic (16:3). 

8k. --ar 5:1 --style raw
```

**Mapping**: Link to `/book/recording` or `/services/recording`

---

### 📺 RACK 5: AV HIRE (The Video Matrix)

**Visual Identity**: Broadcast Video Gear

**Prompt**:
```
A photorealistic close-up of a video broadcast rack unit. 

Subject: AV Hire. 

Color: Matte Black technical finish. 

Features: A row of BNC video connectors, a small green waveform monitor screen, and a matrix of illuminated square buttons (Video Switcher style). 

Text: Digital text reads: "AV HIRE // CONTACT FORM". 

View: Flat orthographic front view. 

Aspect Ratio: Wide panoramic (16:3). 

8k. --ar 5:1 --style raw
```

**Mapping**: Link to `/av-services` or `/contact?subject=av-hire`

---

### ☕ RACK 6: WORKSHOP CAFE (The Engine)

**Visual Identity**: Steampunk Yellow (Keep the classic)

**Prompt**:
```
A photorealistic close-up of a rack-mounted espresso machine controller. 

Color: Mustard Yellow (Ochre) enamel. 

Features: Analog steam pressure gauges with brass rims, heavy bakelite switches, and a warm tungsten "BOILER" light. 

Text: Retro typography reads: "WORKSHOP CAFE // OPEN". 

View: Flat orthographic front view. 

Aspect Ratio: Wide panoramic (16:3). 

8k. --ar 5:1 --style raw
```

**Mapping**: Link to `/cafe`

---

### 📨 RACK 7: CONTACT / FOOTER (The Input)

**Visual Identity**: Raw Steel Patchbay

**Prompt**:
```
A photorealistic close-up of a raw steel patchbay rack unit. 

Color: Unpainted steel with weld marks. 

Features: Female XLR inputs and 1/4 inch jacks. A strip of masking tape in the center with handwritten text: "CONTACT / ENQUIRIES". 

View: Flat orthographic front view. 

Aspect Ratio: Wide panoramic (16:3). 

8k. --ar 5:1 --style raw
```

**Mapping**: Link to `mailto:captainburbseye@gmail.com` or `/contact`

---

## 🛠️ ASSEMBLY INSTRUCTIONS

### Step 1: Generate
Generate each unit using the prompts above:
- Use **Midjourney**, **DALL-E 3**, or **Stable Diffusion XL**
- Target resolution: **1048px width** per unit
- Save as PNG with transparency (if possible)

### Step 2: Stitch
In Photoshop/Figma:
1. Create canvas: **1048px × 2500px**
2. Stack units vertically (top to bottom)
3. Ensure zero gaps between units
4. Add subtle drop shadows if needed
5. Export as **WEBP** (optimized, <800KB)

### Step 3: Deploy
1. Upload to `/static/rack-tower.webp`
2. Update `RackTest.tsx` with new image path
3. Map hitboxes using percentages below

### Step 4: Map Click Zones

**Hitbox Helper Function** (supports split units):
```tsx
const hitbox = (top: string, height: string, left: string = '0', width: string = '100%') => ({
  position: 'absolute' as const,
  left: left,
  width: width,
  top: top,
  height: height,
  cursor: 'pointer',
  zIndex: 10,
  transition: 'opacity 0.2s',
  // border: '1px solid red', // Debug mode
});
```

**Zone Mapping** (approximate percentages, adjust after generation):

```tsx
{/* RACK 1: Header */}
<a href="/" style={hitbox('0%', '10%')} title="Home" />

{/* RACK 2: Rehearsal (SPLIT) */}
<a href="/book/rehearsal?location=cowley" 
   style={hitbox('12%', '14%', '0', '50%')} 
   title="Cowley Road Rehearsal" />
<a href="/book/rehearsal?location=cricket" 
   style={hitbox('12%', '14%', '50%', '50%')} 
   title="Cricket Road Rehearsal" />

{/* RACK 3: Control Room (SPLIT) */}
<a href="/book/control-room?location=cowley" 
   style={hitbox('28%', '14%', '0', '50%')} 
   title="Cowley Control Room" />
<a href="/book/control-room?location=cricket" 
   style={hitbox('28%', '14%', '50%', '50%')} 
   title="Cricket Control Room" />

{/* RACK 4: Recording */}
<a href="/book/recording" style={hitbox('44%', '14%')} title="Recording Services" />

{/* RACK 5: AV Hire */}
<a href="/av-services" style={hitbox('60%', '14%')} title="AV Hire" />

{/* RACK 6: Café */}
<a href="/cafe" style={hitbox('76%', '14%')} title="Workshop Café" />

{/* RACK 7: Contact */}
<a href="mailto:captainburbseye@gmail.com" style={hitbox('92%', '8%')} title="Contact" />
```

---

## 🎨 DESIGN ADVANTAGES

### The Hybrid Wins:
- ✅ **Visual Density**: More info in less vertical space
- ✅ **Logical Grouping**: Related services side-by-side
- ✅ **Split Interaction**: Left/right click zones
- ✅ **High-Tech Aesthetic**: Custom, modular appearance
- ✅ **Zero Gaps**: One image = perfect alignment
- ✅ **Fast Loading**: Single HTTP request
- ✅ **Easy Maintenance**: Replace one image to update

### Color Coding:
- **Green** (Nettle): Cowley Road
- **Magenta** (Deep Purple): Cricket Road
- **Yellow** (Mustard): Café / Community
- **Charcoal/Silver**: Professional Services
- **Raw Steel**: Contact / Industrial

---

## 🚀 PRODUCTION WORKFLOW

1. **Generate all 7 units** (save prompts for iterations)
2. **Stitch in editor** (Photoshop/Figma)
3. **Optimize image** (<800KB WEBP)
4. **Upload to project**: `/static/rack-tower.webp`
5. **Update code** with hitbox mapping
6. **Test click zones** (uncomment red borders)
7. **Fine-tune percentages** based on actual image
8. **Deploy to production**

---

## 📦 DELIVERABLES

- **7 individual unit PNGs** (1048px width each)
- **1 stitched tower WEBP** (1048px × ~2500px)
- **Updated RackTest.tsx** with split hitboxes
- **Documentation** of click zone percentages

---

## 🎯 SUCCESS METRICS

- ✅ Zero visible gaps
- ✅ All hitboxes functional
- ✅ Loading < 1 second
- ✅ Responsive on mobile (scales down)
- ✅ Professional industrial aesthetic
- ✅ Clear visual hierarchy

---

**Status**: Ready for generation
**Next Step**: Generate Rack 1-7 using prompts above
**Timeline**: ~1-2 hours for generation + stitching
