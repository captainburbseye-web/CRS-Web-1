# PRE-FLIGHT VERIFICATION CHECKLIST
## CRS Broadcast Terminal — 118 Cowley Road

**Deployment Version:** Gold Master (Commit: e920a9d)  
**Route:** `cowleyroadstudios.com/signage`  
**Hardware:** 55" 4K Display (3840×2160px)  
**Status:** ✅ PRODUCTION LIVE

---

## 🎯 WHAT'S BEEN DEPLOYED

The **Gold Master** production build is now live with all Cloudflare R2 assets integrated:

1. **Workshop Café Circular Badge** (top-right corner, Z-index 10005)
2. **Tascam VU Meter Video Background** (Studio HQ module, looping)
3. **19-inch Rack Chassis Background** (Workshop Café module, static)
4. **CRS Logo Stamp** (top-left corner, Mustard glow)

---

## ✅ PRE-FLIGHT VERIFICATION (For Ollie & Daniel)

### **Visual Sweep — First Morning Check**

When you arrive at 118 Cowley Road tomorrow morning, perform this **5-minute visual sweep** from across the street:

#### **1. The Hardware Anchors (Static Elements)**
These should **NEVER move** during the 15s module rotation:

- [ ] **CRS Mustard Stamp** visible in **top-left corner** (80px from edges)
  - Should have orange/mustard glow
  - Should remain static during all module transitions

- [ ] **Workshop Café Badge** visible in **top-right corner** (80px from edges)
  - Circular gear design with coffee cup + waveform
  - Should have subtle mustard glow
  - Should remain static during all module transitions

- [ ] **BOOK NOW Button** visible in **bottom-right corner**
  - Should pulse slowly (1.5s ease-in-out, scale 1.0 to 1.05)
  - Mustard/orange color (#E89B3C)
  - Should remain static during all module transitions

---

#### **2. The Electrical Bus (Pulse Synchronization)**

- [ ] **BOOK NOW button** and **Nettle Green LED status indicators** should pulse in the **same rhythm**
  - This signals a healthy "electrical bus" (all systems operational)
  - If they're out of sync, the watchdog may need to reload

---

#### **3. The Module Rotation (15s Cycle)**

Stand across Cowley Road and watch for **3 full cycles** (45 seconds total):

- [ ] **Studio HQ Module** displays first
  - **Video background:** Tascam VU meters with rhythmic lighting (should loop smoothly)
  - **Headline:** "ANALOG-FIRST PRODUCTION" (Mustard, 100px)
  - **Subtitle:** "STUDIO HQ" (White, 48px)
  - **Specs:** SSL ORIGIN 32-CHANNEL, GENELEC 8351B
  - **Rate:** £45/HR · £320/DAY
  - **LED Status:** "[ SYSTEM_STATUS: OPERATIONAL ]" (Nettle Green)

- [ ] **Workshop Café Module** displays second
  - **Static background:** 19-inch rack chassis (photorealistic)
  - **Title:** "WORKSHOP CAFÉ" (Nettle Green LED aesthetic)
  - **Subtitle:** "ENGINEERED FOR EVENTS" (Mustard accent)
  - **Specs:** Specialty coffee, flexible space, AV services, community events
  - **Rate:** FROM £25/HR
  - **LED Status:** "[ NODE_STATUS: ONLINE ]" (Nettle Green)

- [ ] **Rehearsal Node Module** displays third
  - **Title:** "REHEARSAL NODE" (Mustard)
  - **Specs:** QSC PA SYSTEM, FULL BACKLINE AVAILABLE
  - **Location:** CRICKET RD · OX4 NODE
  - **Rate:** £15/HR
  - **LED Status:** "[ REHEARSAL_NODE: READY ]" (Nettle Green)

- [ ] **Transitions are smooth** (1s cross-fade, no flicker or white flash)

---

#### **4. The Bezel Test (80px Safe Zone)**

- [ ] **CRS Mustard Stamp** is fully visible (not clipped by TV bezel)
- [ ] **Workshop Café Badge** is fully visible (not clipped by TV bezel)
- [ ] **BOOK NOW Button** is fully visible (not clipped by TV bezel)

**Why this matters:** Consumer-grade displays often have "overscan" that clips the edges. The 80px safe zone ensures all branding survives bezel clipping.

---

#### **5. The Appliance Test (No OS Visibility)**

- [ ] **No cursor visible** on screen (absolute cursor purge active)
- [ ] **No taskbar visible** (Windows UI hidden)
- [ ] **No browser chrome visible** (Chrome running in kiosk mode)
- [ ] **No notification popups** (all system notifications disabled)

**If you see any OS elements:** The kiosk script may not have launched correctly. See "Emergency Procedures" below.

---

#### **6. Street-Level Legibility Test**

Stand **across Cowley Road** (street-level perspective) and verify:

- [ ] **Module titles** (100px) are clearly readable from across the street
- [ ] **Spec labels** (40px) are readable from 10m distance
- [ ] **BOOK NOW button** (48px) is prominent and visible
- [ ] **Rates** (£45/hr, £25/hr, £15/hr) are legible

**If text is hard to read:** The display brightness may need adjustment, or the 4K resolution may not be set correctly.

---

#### **7. The Video Loop Test (Studio HQ)**

Watch the **Studio HQ module** for **30 seconds** and verify:

- [ ] **Tascam VU meter video loops smoothly** (no stutter, no freeze)
- [ ] **Video brightness is appropriate** (not too dark, not too bright)
- [ ] **Video doesn't flicker or white-flash** during module transitions
- [ ] **Text remains readable over video background** (strong shadow for legibility)

---

## 🛠️ EMERGENCY PROCEDURES

### **If the Terminal is Frozen or Blank:**

1. **Check the Mini PC:**
   - Is it powered on? (Check power LED)
   - Is the HDMI cable connected?
   - Is the display input source correct? (HDMI 1/2)

2. **Restart Chrome:**
   - Press `Ctrl + Alt + Delete` on Mini PC keyboard
   - Open Task Manager
   - End Chrome process
   - Kiosk script will auto-relaunch Chrome after 30s

3. **Reboot Mini PC:**
   - Press and hold power button for 5 seconds
   - Wait 30 seconds
   - Mini PC will reboot and auto-launch kiosk script

---

### **If the Network is Down:**

- [ ] **"RECONNECTING TO BROADCAST..." message** should display (Nettle Green)
- [ ] **CRS Mustard Stamp** should remain visible with pulse animation
- [ ] **Terminal will auto-reload** 2 seconds after network is restored

**Action:** Check Ethernet cable connection and router status. Terminal will recover automatically once network is back.

---

### **If OS Elements are Visible (Cursor, Taskbar, etc.):**

This means the kiosk script didn't launch correctly.

**Fix:**
1. Open Run dialog: `Win + R`
2. Type: `shell:startup`
3. Verify `launch-signage.bat` is in the Startup folder
4. Reboot Mini PC

---

### **If Video Background is Not Playing:**

**Possible causes:**
- Browser autoplay policy blocking video
- Network connection too slow to load video
- Video file corrupted or inaccessible

**Fix:**
1. Open Chrome DevTools: `F12`
2. Check Console for errors
3. Verify video URL is accessible: `https://pub-30f2bf10509141bba382d98d130c358b.r2.dev/20260118_2231_Remix%20Video_remix_01kf9kq0cxea1tn65695jjpzab.mp4`
4. If video won't play, check network connection

---

### **If Workshop Café Badge is Missing:**

**Possible causes:**
- Image failed to load from Cloudflare R2
- Network connection issue
- Browser cache issue

**Fix:**
1. Check network connection
2. Verify badge URL is accessible: `https://pub-30f2bf10509141bba382d98d130c358b.r2.dev/no_bkground_workshop_cafe_png.png`
3. Force refresh: `Ctrl + Shift + R`

---

## 📊 PRODUCTION ASSET URLS (FOR REFERENCE)

All assets are served from Cloudflare R2 public bucket:

| Asset | URL | Purpose |
|-------|-----|---------|
| **Workshop Café Badge** | `https://pub-30f2bf10509141bba382d98d130c358b.r2.dev/no_bkground_workshop_cafe_png.png` | Top-right hardware seal (Z-10005) |
| **Tascam VU Meter Video** | `https://pub-30f2bf10509141bba382d98d130c358b.r2.dev/20260118_2231_Remix%20Video_remix_01kf9kq0cxea1tn65695jjpzab.mp4` | Studio HQ video background (looping) |
| **19-inch Rack Chassis** | `https://pub-30f2bf10509141bba382d98d130c358b.r2.dev/Photorealistic_19-inch_rack_...png` | Workshop Café static background |
| **CRS Logo Stamp** | `https://pub-30f2bf10509141bba382d98d130c358b.r2.dev/1024FINAL_CRS_WEB_HEADER_2.png` | Top-left Mustard stamp (Z-100) |

---

## 🎚️ Z-INDEX HIERARCHY (VISUAL STACKING ORDER)

From bottom to top:

| Layer | Element | Z-Index | Behavior |
|-------|---------|---------|----------|
| 1 | Video Background (Studio HQ) | -1 | Loops behind all content |
| 2 | Static Backgrounds (Café, Node) | 0 | Fixed during module display |
| 3 | Module Content (Text, LEDs) | 1 | Fades in/out during transitions |
| 4 | CRS Mustard Stamp | 100 | Static (never moves) |
| 5 | BOOK NOW Button | 200 | Static with pulse animation |
| 6 | Reconnect Message | 10001 | Only visible during network outage |
| 7 | Mustard Stamp (offline) | 10002 | Pulses during network outage |
| 8 | **Workshop Café Badge** | **10005** | **Static (highest layer)** |

---

## 📋 DAILY OPERATIONAL CHECKLIST

### **Every Morning (7-Item Inspection):**

1. [ ] Terminal powered on and displaying content
2. [ ] Module rotation functioning (15s cycle)
3. [ ] All three modules cycling correctly (Studio HQ → Workshop Café → Rehearsal Node)
4. [ ] No frozen frames or blank screens
5. [ ] BOOK NOW button pulsing (1.5s industrial pulse)
6. [ ] Nettle Green LED indicators active (2s pulse)
7. [ ] No visible OS elements (cursor, taskbar, notifications)

**Time required:** 5 minutes

---

### **Weekly Content Verification:**

- [ ] Verify all rates match operational reality:
  - Studio HQ: £45/hr · £320/day
  - Workshop Café: From £25/hr
  - Rehearsal Node: £15/hr

- [ ] Check for outdated messaging or seasonal updates
- [ ] Review GitHub commit history for recent changes

**Time required:** 10 minutes

---

## 🚀 WHAT TO EXPECT

### **The "Live Feed" Energy**

The Tascam VU meter video on the Studio HQ module gives the terminal a **"working facility"** aesthetic. The rhythmic lighting and moving VU meters signal that CRS is an active, operational studio—not just a storefront.

### **The Hardware Seal**

The Workshop Café badge at Z-index 10005 is the **permanent hardware seal**. It never moves, never fades, and remains visible during all module transitions. This reinforces the "appliance aesthetic"—the badge is a physical part of the terminal chassis, not a web element.

### **The Institutional Authority**

The combination of:
- Analog hardware imagery (Tascam VU meters, 19-inch rack chassis)
- Industrial "rack aesthetic" throughout
- Broadcast terminal metaphor (not generic web design)
- "No Chaos Theory" data sanitization (only verified operational facts)

...creates the **£10,000 custom hardware look** specified in the original brief.

---

## 📞 SUPPORT CONTACTS

**Technical Issues:**
- GitHub Repository: `captainburbseye-web/CRS-Web-1`
- Deployment: Cloudflare Pages (auto-deploy from `main` branch)
- Route: `cowleyroadstudios.com/signage`

**Content Updates:**
- Refer to: `FACILITY_OPERATIONS_MANUAL_CONTENT_UPDATES.md`
- Operational Protocol: `SIGNAGE_TERMINAL_OPERATIONAL_PROTOCOL.md`

---

## ✅ PRODUCTION READINESS STATEMENT

**The CRS digital signage terminal is now PRODUCTION LIVE with:**

1. ✅ All Cloudflare R2 assets deployed
2. ✅ Video background infrastructure operational
3. ✅ Workshop Café badge at Z-index 10005
4. ✅ Absolute cursor purge active
5. ✅ Network resilience fallback enabled
6. ✅ "No Chaos Theory" standard enforced (only verified operational facts)
7. ✅ Institutional authority through analog hardware aesthetics

**The terminal embodies the £10,000 custom hardware aesthetic and is ready for 24/7 operation at 118 Cowley Road.**

---

**Deployment Contact:** Daniel Burbidge & Oli  
**Location:** 118 Cowley Road, Oxford, OX4 1JE  
**Route:** `cowleyroadstudios.com/signage`  
**Commit:** e920a9d (Gold Master)  
**Status:** ✅ PRODUCTION LIVE
