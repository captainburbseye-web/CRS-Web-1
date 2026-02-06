# SIGNAGE TERMINAL OPERATIONAL PROTOCOL

**55" Display @ 118 Cowley Road**  
**Version:** 1.0 (2026-01-24)  
**Authorized Personnel:** Daniel Burbidge, Oli (Co-founder)

---

## 🎛️ STANDARD OPERATING STATE

The terminal must display the `/signage` route in a Chrome kiosk instance with **zero UI elements** visible:
- ❌ No taskbars
- ❌ No cursors  
- ❌ No scrollbars
- ❌ No address bars
- ❌ No Windows UI

**Expected State:** Full-screen broadcast terminal showing rotating modules (Studio HQ, Workshop Café, Rehearsal Node) with Nettle Green status LEDs pulsing at 2-second intervals.

---

## 📋 DAILY OPERATIONAL CHECKLIST

**Location:** Behind Café Counter / Machine Rack  
**Frequency:** Once per morning (07:00-09:00)

| Check | Action | Pass Condition |
|-------|--------|---------------|
| **Morning Boot** | Power on Mini PC (Auto-launch enabled) | `/signage` appears within 60 seconds |
| **LED Pulse** | Observe Nettle Green status lights | 2s rhythmic glow-spread on glass |
| **The Anchor** | Check Mustard Stamp (top-left) | Static, sharp, and 250px scale |
| **Conversion** | Check BOOK NOW button (bottom-right) | 1.5s industrial-pulse active |
| **Module Rotation** | Watch for 15 seconds | Modules cross-fade smoothly (1s transition) |
| **Street Visibility** | View from outside on Cowley Road | Content readable from across street |

---

## 🛠️ 4K CALIBRATION MAINTENANCE

### Pixel Mapping Verification

**Problem:** Image appears "soft" or blurry  
**Cause:** Mini PC output resolution not locked to 4K  
**Fix:**

1. Right-click Windows Desktop → Display Settings
2. Verify resolution: **3840 × 2160** (4K)
3. Verify scaling: **100%** (no scaling)
4. If incorrect, set to 3840×2160 and click "Keep Changes"

**Pass Condition:** Text appears crisp and sharp, especially JetBrains Mono typography.

---

### Brightness & Contrast Check

**Problem:** Content not cutting through window glare  
**Cause:** TV brightness/contrast settings too low  
**Fix:**

1. Access TV settings (usually via remote or physical buttons)
2. Set **Brightness:** 85-95%
3. Set **Contrast:** 90-100%
4. Set **Backlight:** 100%
5. Set **Picture Mode:** Vivid or Dynamic (for street visibility)

**Pass Condition:** Mustard elements (stamp, BOOK NOW button) create visible glow-spread on glass.

---

## 🚨 TROUBLESHOOTING PROTOCOLS

### Issue 1: Windows Desktop Visible (Not Kiosk Mode)

**Symptoms:**
- Windows taskbar visible at bottom
- Desktop icons visible
- Chrome address bar visible

**Emergency Reset:**
1. Restart Mini PC (hold power button 5 seconds, release, press again)
2. System will auto-launch `/signage` via `shell:startup` script
3. Wait 60 seconds for Chrome kiosk to initialize

**If auto-launch fails:**
1. Double-click `launch-signage.bat` on Desktop
2. Chrome will launch in kiosk mode
3. Contact Daniel if issue persists

---

### Issue 2: Screen Frozen / No Module Rotation

**Symptoms:**
- Same module displayed for >30 seconds
- No cross-fade animation
- Status LEDs not pulsing

**30s Watchdog Protocol:**
1. **Wait 30 seconds** — System includes auto-recovery logic
2. If still frozen after 30s, press `Ctrl + F5` to hard-refresh Chrome
3. If no change, restart Mini PC (see Issue 1)

**Root Cause:** Usually network drop or JavaScript error. Watchdog will auto-recover in most cases.

---

### Issue 3: Network Drop / "No Internet" Message

**Symptoms:**
- Chrome shows "No Internet Connection" dinosaur game
- `/signage` route fails to load
- Blank screen with error message

**Recovery:**
1. Check router/modem lights (should be solid green)
2. Restart router if needed (unplug 30s, plug back in)
3. Wait 2-3 minutes for network to stabilize
4. Chrome will auto-reload `/signage` when connection restored

**If network is operational but signage won't load:**
1. Press `Ctrl + F5` to hard-refresh
2. If fails, restart Mini PC
3. Contact Daniel if issue persists

---

### Issue 4: Display Sleep / Black Screen

**Symptoms:**
- Screen is completely black
- No LED indicators visible
- Mini PC power light is ON

**Fix:**
1. Press any key on keyboard or move mouse
2. Display should wake within 2-3 seconds
3. If display doesn't wake, check TV power button
4. Verify HDMI cable is securely connected

**Prevention:**
- Ensure TV sleep timer is DISABLED in TV settings
- Ensure Windows power settings: "Never" sleep display

---

### Issue 5: Incorrect Content / "Chaos" Filler Reappeared

**Symptoms:**
- Placeholder text visible (e.g., "12-piece ensemble")
- Unverified rates or specs
- Marketing fluff instead of operational facts

**Action:**
1. **DO NOT attempt to fix manually**
2. Take photo of incorrect content
3. Contact Daniel immediately with photo
4. Daniel will update `Signage.tsx` and redeploy

**This is a code-level issue, not a hardware issue.**

---

## 🔧 HARDWARE HANDSHAKE VERIFICATION

**Frequency:** Once per week (Monday mornings)

### Kiosk Enforcement Check

**Verify Chrome launch flags:**
1. Open Task Manager (`Ctrl + Shift + Esc`)
2. Find "Google Chrome" process
3. Right-click → "Go to details"
4. Check command line includes: `--kiosk --disable-infobars`

**If flags missing:**
1. Close Chrome
2. Run `launch-signage.bat` from Desktop
3. Verify kiosk mode active

---

### Power Schedule Verification

**BIOS/OS Configuration:**
- **Auto-power ON:** 07:00 daily
- **Auto-sleep:** 23:00 daily

**To verify:**
1. Check Mini PC arrives at 07:00 without manual power-on
2. Check display goes dark at 23:00

**If schedule fails:**
1. Access BIOS (usually press `Del` or `F2` during boot)
2. Navigate to Power Management
3. Set "Power On by RTC" to 07:00
4. Set "Power Off by RTC" to 23:00
5. Save and exit

---

## 📊 STATUS INDICATOR REFERENCE

### Nettle Green LED (#39FF14) — OPERATIONAL

**Appearance:** Bright green dot pulsing at 2-second intervals  
**Meaning:** System operational, module active, all services online  
**Action:** None required — this is normal state

---

### Mustard LED (#FFA500) — STANDBY

**Appearance:** Amber/orange dot, slower pulse (3-second intervals)  
**Meaning:** System in standby, waiting for initialization, or service temporarily unavailable  
**Action:** 
1. Wait 30 seconds for auto-recovery
2. If persists, check network connection
3. If persists after network check, restart Mini PC

---

### Red LED (#FF0000) — ERROR

**Appearance:** Red dot, rapid pulse (0.5-second intervals)  
**Meaning:** Critical system error, module failed to load, or hardware fault  
**Action:**
1. **Immediate escalation** — Contact Daniel
2. Take photo of screen
3. Do not attempt manual fixes
4. Restart Mini PC only if instructed by Daniel

---

## 📧 ESCALATION PROTOCOL

### When to Contact Daniel

- ✅ Red LED status (critical error)
- ✅ Incorrect content / "Chaos" filler visible
- ✅ Kiosk mode fails after 2 restart attempts
- ✅ Network operational but signage won't load
- ✅ Any issue persisting >10 minutes

### When NOT to Contact Daniel

- ❌ Screen frozen <30 seconds (watchdog will recover)
- ❌ Network drop (auto-recovers when connection restored)
- ❌ Display sleep (press any key to wake)
- ❌ Morning boot takes 45-60 seconds (normal)

---

## 🎚️ "NO CHAOS THEORY" DATA LOCK

**Critical Rule:** The signage terminal broadcasts **only verified operational facts**. 

**Prohibited content:**
- ❌ Placeholder text ("12-piece ensemble", "24 workstations")
- ❌ Marketing fluff ("World-class", "State-of-the-art")
- ❌ Unverified hours or rates
- ❌ Promotional campaigns or temporary offers

**If you see any prohibited content:**
1. Take photo
2. Contact Daniel immediately
3. Do not attempt to edit content manually

**Content updates are code-level changes** — see `FACILITY_OPERATIONS_MANUAL_CONTENT_UPDATES.md` for procedures.

---

## 🏢 OPERATIONAL NOTES

### The Morning Signal

**Check:** Nettle Green LED pulsing on glass  
**Pass Condition:** 2-second rhythmic glow visible from outside  
**Fail Condition:** No pulse, or Mustard/Red LED instead

---

### The Street Glow

**Check:** 4K video background cutting through window glare  
**Pass Condition:** Content readable from across Cowley Road  
**Fail Condition:** Washed out, too dim, or blurry

**Fix:** Adjust TV brightness/contrast (see 4K Calibration Maintenance section)

---

### The Data Lock

**Check:** No "Chaos" filler in text modules  
**Pass Condition:** Only SSL Origin, Genelec, QSC PA, and verified rates visible  
**Fail Condition:** Placeholder text or marketing fluff

**Fix:** Contact Daniel immediately (code-level issue)

---

## 🛡️ TERMINAL SELF-HEALING FEATURES

The signage terminal includes **autonomous recovery protocols**:

### 30s Safety Watchdog

- **Function:** Auto-refresh if module rotation stalls
- **Trigger:** 30 seconds without module transition
- **Action:** Automatic page reload
- **User Action:** Wait 30 seconds before manual intervention

### Network Watchdog

- **Function:** Auto-reload when network connection restored
- **Trigger:** Network drop detected
- **Action:** Continuous retry until connection restored
- **User Action:** Fix network issue, terminal will auto-recover

### Fallback State

- **Function:** Display "CRS BROADCAST TERMINAL — INITIALIZING..." if JavaScript fails
- **Trigger:** Critical JavaScript error
- **Action:** Fade-in/fade-out animation to indicate system alive
- **User Action:** Restart Mini PC if fallback persists >2 minutes

---

## 📅 MAINTENANCE SCHEDULE

| Task | Frequency | Responsible |
|------|-----------|-------------|
| **Daily Visual Sweep** | Every morning (07:00-09:00) | Oli or Daniel |
| **4K Calibration Check** | Weekly (Monday mornings) | Daniel |
| **Hardware Handshake Verification** | Weekly (Monday mornings) | Daniel |
| **Power Schedule Verification** | Monthly (1st of month) | Daniel |
| **Content Update (if rates change)** | As needed | Daniel (see Content Update Manual) |
| **Mini PC Restart** | Monthly (1st of month, 04:00 AM) | Automatic (scheduled task) |

---

## 🚀 TERMINAL STATUS: [ SYSTEM_READY ]

The "Shabby" phase is officially deprecated.  
Cowley Road Studios is now a **live, operational broadcast terminal**.

**The terminal is a self-healing broadcast node.**

---

**Document Version:** 1.0 (2026-01-24)  
**Last Updated:** 2026-01-24  
**Next Review:** 2026-02-24
