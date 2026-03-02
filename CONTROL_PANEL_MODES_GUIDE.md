# 🎛️ CRS SIGNAGE CONTROL PANEL - COMPLETE MODE GUIDE

**Route**: `/signage-control`  
**Status**: ✅ Updated with all 7 modes  
**Last Update**: 2026-03-02  

---

## 🎯 CONTROL PANEL OVERVIEW

The **Signage Control Panel** is your remote dashboard for managing all CRS digital signage displays. It provides:

- **Route Selection**: Switch between 7 different signage modes instantly
- **Playback Controls**: Pause/resume, previous/next slide
- **Live Status**: Real-time connection monitoring
- **Mode Switching**: Toggle between ambient/audio-reactive/parallax modes (on compatible displays)
- **Keyboard Shortcuts**: Quick access commands

**Access**: https://cowleyroadstudios.com/signage-control

---

## 📺 ALL 7 SIGNAGE MODES EXPLAINED

### 🎯 **PRIMARY DISPLAYS** (Recommended for Main Use)

---

### ⭐ **V5 - Day/Night Mode** [DEFAULT] 
**Route**: `/signage-v5`  
**Best For**: Primary window display, general street traffic  
**Loop Duration**: 84 seconds (9 frames)

#### **Key Features**
✅ **Auto Day/Night Switch**: 
- Day mode (07:00-19:00): Light backgrounds (white/mustard/lime)
- Night mode (19:00-07:00): Dark backgrounds (#0A0A0A)
- Checks Europe/London timezone every 60 seconds

✅ **Text Scaling**: Largest text sizes (readable from 50+ feet)
- Titles: clamp(6rem, 10vw, 10rem) = 96-160 px
- Subtitles: clamp(3rem, 5vw, 5rem) = 48-80 px
- Body: clamp(2rem, 3.5vw, 3.5rem) = 32-56 px

✅ **Spatial Context**: Two-frame sequence
- Frame 4: "WORKSHOP CAFÉ - Front Space - Opening April 2026"
- Frame 5: "RECORDING STUDIOS - Behind the Café Space - Book Online Now"

✅ **Brand Colors**:
- CRS frames: #f5f5f5 (silver/brushed aluminum)
- Cricket frames: #FFE55C (yellow warning sign)
- Workshop Café: #F5E6C8 (warm amber)
- Rehearsal: #E8F5E8 (light green)

✅ **Contact Info**: Rotating station ID badge (website, Instagram, phone)

#### **When to Use V5**
- **Primary window display** (front of Workshop Café)
- **General street traffic** (Cowley Road passersby)
- **24/7 operation** (auto-adapts to lighting conditions)
- **Brand consistency** (matches CRS/Cricket logos)

#### **Frame Breakdown (84s total)**
1. Ambient Opening (8s) - "COWLEY ROAD STUDIOS"
2. Recording Services (10s) - "RECORDING STUDIO - Full tracking · Mixing"
3. Rehearsal Services (10s) - "REHEARSAL ROOMS - £45-£65 per session"
4. Ambient Ecosystem (8s) - "GRASSROOTS INFRASTRUCTURE"
5. **Workshop Café** (12s) - "Front Space - Opening April 2026"
6. **Recording Studios** (10s) - "Behind the Café Space - Book Online Now"
7. Ambient Live (8s) - "LIVE SESSIONS - Filmed · Recorded · Shared"
8. Equipment Repairs (10s) - "ODRO ENGINEERING - £60 minimum"
9. Ambient CTA (8s) - "BOOK NOW - crsoxford.com"

---

### 🎵 **Street - Truck/Mostro Optimization**
**Route**: `/signage-street`  
**Best For**: Pre-opening buzz, anti-marketing audience  
**Loop Duration**: 90 seconds (9 frames)

#### **Key Features**
✅ **Peak Hours Only**: Auto-activates during high-traffic times
- Weekdays: 15:00-18:30 (post-work browsing at Truck Record Store)
- Weekends: 11:00-16:00 (Mostro Coffee House brunch/lunch)
- Off-peak: Display paused (respects quiet service times)

✅ **Minimalist Design**: 70%+ negative space
- Background: Deep black (#0A0A0A)
- Text: Off-white (#F5F5F5)
- Accents: Mustard (#D4AF37), Nettle green (#4F7942)
- Typography: JetBrains Mono (monospace, technical)

✅ **Civic Micro-Messages**: No hard sells, local pride
- "Oxford. Still making things."
- "Cowley Road. Still making noise."
- "To the musicians walking past - Respect."

✅ **Curiosity Hooks**: Subtle engagement
- "What's happening behind the café?"
- "If you care about music - We do too."

✅ **QR Code Waitlist**: Low-friction capture (12s hold for scanning)
- "Scan for updates & early access" → crsoxford.com/waitlist

#### **When to Use Street Mode**
- **Pre-opening context** (café not yet open)
- **Truck Record Store audience** (vinyl collectors, music nerds, 20-45 min dwell)
- **Mostro Coffee House** (specialty coffee, creative professionals)
- **Anti-marketing sensibility** (authenticity over hype)

#### **Frame Breakdown (90s total)**
1. Curiosity Hook (10s) - "What's happening behind the café?"
2. Civic Oxford (8s) - "Oxford. Still making things."
3. Workshop Café Opening (12s) - "Opening Next Month - OPENING SOON badge"
4. Musicians Respect (10s) - "To the musicians walking past - Respect."
5. Studio Location (10s) - "Studio just behind the Workshop Café"
6. **QR Code** (12s) - "Scan for updates & early access" → waitlist
7. Civic Cowley (8s) - "Cowley Road. Still making noise."
8. Final Touches (10s) - "Final touches underway - Stay tuned."
9. Values Statement (10s) - "If you care about music - We do too."

#### **Research-Backed Design**
- **Jamini Store (Paris)**: +34% store entries with minimalist displays
- **DUMBO Brooklyn**: 89% recall with civic micro-messages
- **Bloomingdale's SoHo**: 12% waitlist conversion from QR signage

---

## 📺 **ALTERNATIVE DISPLAYS** (Special Use Cases)

---

### 🎛️ **V4 - Vintage Broadcast**
**Route**: `/signage-v4`  
**Best For**: Service callouts, retro aesthetic enthusiasts  
**Loop Duration**: 72 seconds

#### **Key Features**
✅ **VU Meters**: Animated 12-bar VU meters (vintage broadcast aesthetic)
✅ **QR Codes**: Booking QR codes on service frames
✅ **CRT Scanlines**: Subtle horizontal line texture
✅ **Price Callouts**: Clear pricing on every service frame
✅ **Brass/Gold Palette**: Matches cowleyroadstudios.com branding

#### **When to Use V4**
- Service-focused displays (pricing emphasized)
- Retro/vintage aesthetic preference
- QR code booking prioritized
- VU meter visual interest

#### **Frame Types**
- Recording Studio - "Full tracking · Mixing" + VU meters
- Rehearsal Rooms - "£45-£65 per session" + pricing badge
- Equipment Repairs - "ODRO Engineering - £60 minimum"
- Workshop Café - "OPEN NOW - Specialty coffee · Repairs"

---

### ⚙️ **V3 Enhanced - Mechanical Rack**
**Route**: `/signage-v3-enhanced`  
**Best For**: Industrial aesthetic, tech-savvy audience  
**Loop Duration**: 72 seconds

#### **Key Features**
✅ **Rack Drift Animation**: Vertical gradient moves slowly (120s cycle)
✅ **Largest Text**: 10rem titles (160 px) - 43% larger than V5
✅ **Mechanical Feel**: Inspired by studio rack gear (SSL, Neve aesthetic)
✅ **Mandatory Color Palette**: Base (#0E0E0E, #23272B), Green (#2E473B, #4F7942), Brass (#C2A85A)
✅ **Slow Motion**: No aggressive animations, calm mechanical movement

#### **When to Use V3**
- Studio equipment showcase
- Industrial/technical aesthetic preference
- Maximum text size needed (10rem titles)
- Rack hardware branding emphasis

#### **Design Philosophy**
- Explicitly forbids: Gradients, neon glow, excessive motion
- Mandatory: JetBrains Mono typography, muted colors, slow movement

---

### ✨ **Enhanced - Gallery Style**
**Route**: `/signage-enhanced`  
**Best For**: Ambient immersion, no hard CTA  
**Loop Duration**: 90 seconds

#### **Key Features**
✅ **Gallery Aesthetic**: High-end, sophisticated presentation
✅ **9rem Titles**: Large but refined (144 px)
✅ **Infinite Glow**: Title text pulses brightness (1 → 1.2) infinitely
✅ **Ambient Frames**: 50%+ ambient content (station ID, ecosystem)
✅ **No Hard CTA**: Brand immersion over direct calls-to-action

#### **When to Use Enhanced**
- Brand immersion (not booking-focused)
- Upscale aesthetic (gallery, high-end venue)
- Ambient background display
- Sophisticated presentation (no aggressive marketing)

#### **Frame Focus**
- Station ID rotation (email, website, socials)
- Ecosystem/community frames
- Live session spotlights
- Subtle pricing mentions

---

### 📡 **Signal - Multi-Mode**
**Route**: `/signagesignal`  
**Best For**: Broadcast aesthetic, badge system  
**Loop Duration**: 80 seconds

#### **Key Features**
✅ **Badge System**: Visual status badges on frames (LIVE, OPENING SOON, etc.)
✅ **Multi-Mode Support**: Ambient/audio-reactive/parallax modes (switchable via control panel)
✅ **9rem Titles**: Bold uppercase with signal-green accents
✅ **Description Focus**: 4rem body text (descriptive, detailed)
✅ **Broadcast Feel**: TV station / radio signal aesthetic

#### **When to Use Signal**
- Broadcast/TV station aesthetic
- Badge/status indicators needed
- Multi-mode switching required (ambient/audio/parallax)
- Live event signage

---

### 📋 **V2 - Classic Display**
**Route**: `/signage-v2`  
**Best For**: Simple, general-purpose signage  
**Loop Duration**: 60 seconds (shortest loop)

#### **Key Features**
✅ **Bold Titles**: 7rem (112 px) - clear and direct
✅ **Pricing Callouts**: Straightforward pricing emphasis
✅ **Simple Layout**: No complex animations, fast loop
✅ **General Purpose**: Works for most contexts

#### **When to Use V2**
- Simple, no-frills display
- Fast content rotation (60s loop)
- General street traffic (not specialized audience)
- Backup/fallback display

---

## 🎮 CONTROL PANEL FEATURES

### **Route Selector**
```
🎯 PRIMARY DISPLAYS:
  ⭐ V5 - Day/Night Mode (Primary Window) [DEFAULT]
  🎵 Street - Truck/Mostro (Peak Hours)

📺 ALTERNATIVE DISPLAYS:
  🎛️ V4 - Vintage Broadcast (VU Meters)
  ⚙️ V3 Enhanced - Mechanical Rack
  ✨ Enhanced - Gallery Style
  📡 Signal - Multi-Mode
  📋 V2 - Classic Display
```

### **Playback Controls**
- **Pause/Resume**: Toggle playback (⏸️ button or `P` key on display)
- **Previous Slide**: Jump to previous frame (⏮️ button or `←` key)
- **Next Slide**: Jump to next frame (⏭️ button or `→` key)

### **Mode Switching** (Signal mode only)
- **Ambient Mode**: Standard frame carousel (🌙 button)
- **Audio-Reactive**: Responds to audio input (🎵 button)
- **Parallax**: Layered depth effect (✨ button)

### **Status Monitoring**
- **Live Connection**: Green dot = connected, red dot = disconnected
- **Current Mode**: Displays active mode (AMBIENT, AUDIO, PARALLAX)
- **Ping/Pong**: Auto-checks connection every 2 seconds

### **Keyboard Shortcuts** (on display window)
- `M` - Cycle through modes (ambient → audio → parallax)
- `P` - Pause/resume playback
- `←` - Previous slide
- `→` - Next slide

---

## 🔍 DECISION TREE: WHICH MODE TO USE?

```
Q: What's your primary goal?

├─ 🪟 Primary window display (general street traffic)?
│  └─ USE: ⭐ V5 (Day/Night Mode)
│     WHY: Auto-adapts to lighting, largest text, brand colors, spatial context
│
├─ 🎵 Pre-opening buzz (Truck/Mostro patrons)?
│  └─ USE: 🎵 Street Mode
│     WHY: Civic messages, QR waitlist, peak hours only, minimalist, research-backed
│
├─ 💰 Service pricing emphasis (booking-focused)?
│  └─ USE: 🎛️ V4 (Vintage Broadcast)
│     WHY: Clear pricing, QR codes, VU meters, service callouts
│
├─ ⚙️ Industrial/rack aesthetic (tech-savvy)?
│  └─ USE: ⚙️ V3 Enhanced
│     WHY: Rack drift, 10rem titles (largest), mechanical feel
│
├─ ✨ Brand immersion (no hard CTA)?
│  └─ USE: ✨ Enhanced (Gallery Style)
│     WHY: Ambient, sophisticated, glow animation, station ID focus
│
├─ 📡 Broadcast feel (badge system)?
│  └─ USE: 📡 Signal (Multi-Mode)
│     WHY: Badge system, multi-mode switching, broadcast aesthetic
│
└─ 📋 Simple general-purpose?
   └─ USE: 📋 V2 (Classic)
      WHY: Fast loop (60s), straightforward, no-frills
```

---

## 📊 COMPARISON TABLE

| Feature | V5 | Street | V4 | V3 | Enhanced | Signal | V2 |
|---------|----|----|----|----|----------|--------|-----|
| **Loop Duration** | 84s | 90s | 72s | 72s | 90s | 80s | 60s |
| **Title Size** | 9.6-16rem | 3.5-7rem | 6-12rem | 10rem | 9rem | 9rem | 7rem |
| **Day/Night Mode** | ✅ Auto | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Peak Hours Logic** | ❌ | ✅ Auto | ❌ | ❌ | ❌ | ❌ | ❌ |
| **QR Code** | ❌ | ✅ Waitlist | ✅ Booking | ❌ | ❌ | ❌ | ❌ |
| **VU Meters** | ✅ Minimal | ❌ | ✅ Full | ❌ | ❌ | ❌ | ❌ |
| **Civic Messages** | ❌ | ✅ Yes | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Pricing Callouts** | ✅ Some | ❌ | ✅ All | ❌ | ✅ Subtle | ✅ Some | ✅ Yes |
| **Station ID Rotation** | ✅ Yes | ✅ Yes | ❌ | ❌ | ✅ Yes | ✅ Yes | ❌ |
| **Spatial Context** | ✅ Yes | ✅ Yes | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Best For** | Primary | Pre-opening | Services | Industrial | Ambient | Broadcast | General |

---

## 🌐 PRODUCTION URLS

| Mode | URL |
|------|-----|
| **Control Panel** | https://cowleyroadstudios.com/signage-control |
| V5 (Primary) | https://cowleyroadstudios.com/signage-v5 |
| Street | https://cowleyroadstudios.com/signage-street |
| V4 | https://cowleyroadstudios.com/signage-v4 |
| V3 Enhanced | https://cowleyroadstudios.com/signage-v3-enhanced |
| Enhanced | https://cowleyroadstudios.com/signage-enhanced |
| Signal | https://cowleyroadstudios.com/signagesignal |
| V2 | https://cowleyroadstudios.com/signage-v2 |

---

## 🎯 RECOMMENDED SETUP

### **Scenario 1: Primary Window (Main Display)**
**Use**: V5 (Day/Night Mode) - Set as default in control panel  
**Schedule**: 24/7 (auto day/night switch)  
**Why**: Largest text, auto-adapts to lighting, spatial context, brand colors

### **Scenario 2: Truck/Mostro Pre-Opening Buzz**
**Use**: Street Mode  
**Schedule**: Peak hours only (weekdays 15:00-18:30, weekends 11:00-16:00)  
**Why**: Civic messages, QR waitlist, respects audience sensibility, research-backed

### **Scenario 3: Service-Focused Booking**
**Use**: V4 (Vintage Broadcast)  
**Schedule**: Business hours (09:00-18:00)  
**Why**: Clear pricing, QR codes, VU meters, booking emphasis

### **Scenario 4: Event/Live Session**
**Use**: Signal (Multi-Mode)  
**Schedule**: During events (switchable via control panel)  
**Why**: Badge system (LIVE), multi-mode support, broadcast aesthetic

---

## 🛠️ TECHNICAL IMPLEMENTATION

### **BroadcastChannel API**
The control panel uses the **BroadcastChannel API** for cross-window communication:

```javascript
const channel = new BroadcastChannel('crs-signage-control');

// Send command from control panel
channel.postMessage({
  type: 'SIGNAGE_COMMAND',
  command: 'switchMode',
  data: { mode: 'ambient' },
  timestamp: Date.now()
});

// Display window listens for commands
channel.addEventListener('message', (event) => {
  const msg = event.data;
  if (msg.type === 'SIGNAGE_COMMAND') {
    handleCommand(msg.command, msg.data);
  }
});
```

### **LocalStorage Fallback**
Commands are also stored in `localStorage` as a fallback:

```javascript
localStorage.setItem('crs-signage-command', JSON.stringify(message));
```

### **Connection Monitoring**
- **Ping/Pong**: Control panel sends ping every 2 seconds
- **Timeout**: If no response for 5 seconds, status changes to "disconnected"
- **Visual Indicator**: Green dot = connected, red dot = disconnected

---

## 📚 DOCUMENTATION REFERENCES

1. **SIGNAGE_ECOSYSTEM_OVERVIEW.md** - Complete system overview
2. **SIGNAGE_STREET_MODE.md** - Street mode deep dive
3. **ALL_SIGNAGE_SIZE_IMPROVEMENTS.md** - Text scaling history
4. **SIGNAGE_SPATIAL_CONTEXT.md** - Café→Studio relationship
5. **This File** (CONTROL_PANEL_MODES_GUIDE.md) - Control panel guide

---

## 🎉 SUMMARY

The **CRS Signage Control Panel** provides centralized management of **7 distinct signage modes**, each optimized for specific audiences and contexts:

✅ **V5** = Primary window (day/night auto-switch)  
✅ **Street** = Truck/Mostro (peak hours, civic messages)  
✅ **V4** = Service pricing (VU meters, QR codes)  
✅ **V3** = Industrial rack (10rem titles, mechanical)  
✅ **Enhanced** = Gallery ambient (glow animation)  
✅ **Signal** = Broadcast (badge system, multi-mode)  
✅ **V2** = Classic general-purpose (60s loop)  

**Control Panel**: https://cowleyroadstudios.com/signage-control  
**Default Mode**: V5 (Primary Window)  
**Status**: ✅ All 7 modes deployed and operational  

🎶 **"Cowley Road. Still making noise."**

---

**Created**: 2026-03-02  
**Maintainer**: CRS Web Team  
**Contact**: info@crsoxford.com · 01865 722027
