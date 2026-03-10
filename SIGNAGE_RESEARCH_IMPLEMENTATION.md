# CRS Signage - Research Implementation Plan
**Date**: 2026-02-27  
**Based on**: "The Art of Marketing with Signage" research document  
**Target**: SignageEnhancedV5.tsx (new implementation)

---

## Executive Summary

Current signage (V3) scores **B (80/100)** against research standards:
- ✅ Excellent: Motion design, typography, contrast, frame timing
- ❌ Critical gaps: Ambient ratio (12.5% vs. 50% target), no time-based scheduling, missing QR codes

This implementation creates **SignageV5** with all research fixes.

---

## Implementation Checklist

### ✅ IMMEDIATE FIXES (This Week)

#### 1. Increase Ambient Content: 12.5% → 50%
**Current**: 1 ambient frame (Frame 0) out of 8 = 12.5%  
**Target**: 4 ambient frames out of 8 = 50%

**Solution**: Add 3 new ODRO/Digital Pulse ambient frames:
- Frame 0: OX4 Infrastructure intro (6s) [EXISTING]
- **Frame 2: ODRO Panel Texture + Particle Wave (10s) [NEW]**
- **Frame 4: Digital Pulse Data Viz (10s) [NEW]**
- **Frame 6: ODRO Burn-In Protection Pattern (10s) [NEW]**

Total: 36s ambient out of 72s loop = **50% ambient**

---

#### 2. Add Station ID Overlay (Rotating Corner Badge)
**Purpose**: Constant brand recall without intrusiveness

**Position**: Bottom-right corner (60x80px badge)  
**Rotation**: Every 12 seconds (once per frame on average)

**Cycle**:
1. `info@crsoxford.com` (12s)
2. `www.cowleyroadstudios.com` (12s)
3. `@cowleyroadstudios` (12s Instagram)
4. `@workshopcafe.ox` (12s Instagram)

**Design**:
- Background: rgba(14,14,14,0.85) with 1px mustard border
- Font: JetBrains Mono 11px
- Opacity: 0.8 (ignorable but readable)
- Fade transition: 0.5s

---

#### 3. Audit Text Frames for 3×5 Rule
**Research**: Max 3 lines × 5 words OR 5 lines × 3 words

**Current violations** (need fixing):

| Frame | Current Text | Word Count | Compliant? | Fix |
|-------|--------------|------------|------------|-----|
| who-we-are | "Recording · Rehearsal · Live Sessions / Community Space for Oxford Musicians" | 8 words / 2 lines | ✅ OK | - |
| the-studio | "Engineer-Friendly Control Room / Full-Band Tracking / Mixing & Production" | 8 words / 3 lines | ✅ OK | - |
| rehearsals | "Proper Backline · Clear Signal Paths / Tighten Your Set / Then Record It" | 11 words / 3 lines | ❌ OVER | Cut to: "Rehearsal Space / Full Backline / Book Today" (6 words) |
| live-showcase | "Filmed Sessions / Live Capture / Grassroots Showcases / Connecting rehearsal to real performance" | 11 words / 5 lines | ❌ OVER | Cut to: "Live Sessions / Film + Record / Showcase Ready" (7 words) |
| workshop-cafe | "Coffee · Repairs · Events / Coworking · Collaborations / Warm · Open · Independent" | 9 words / 3 lines | ⚠️ BORDERLINE | OK if café open, otherwise REMOVE |
| community | "Session Players · Engineers / Student Bands · Local Artists / Live Circuits / Serious Music · Grassroots Level" | 13 words / 5 lines | ❌ OVER | Cut to: "Oxford Musicians / Session Players / Local Artists" (6 words) |
| cta | "Rehearsal · Recording / Scan for Rates / crsoxford.com" | 6 words / 3 lines | ✅ OK | Add QR code |

---

#### 4. Add QR Codes
**Research**: "Give engaged viewers a frictionless next step"

**Frames needing QR codes**:
- **CTA frame** → `https://crsoxford.com` (main booking)
- **Recording frame** → `https://crsoxford.com/recording`
- **Rehearsal frame** → `https://crsoxford.com/rehearsal`
- **Workshop Café frame** → `https://crsoxford.com/workshop-cafe` (only if café open)

**Position**: Bottom-left corner (120x120px)  
**Styling**: White QR with 10px padding, mustard 2px border  
**Label**: "SCAN TO BOOK" in 10px JetBrains Mono

---

#### 5. Verify Workshop Café Frame
**Critical Check**: Is Workshop Café actually open and serving today?

**If NO**: REMOVE frame entirely (research: "nothing on screen that is not true today")  
**If YES**: Keep frame but add today's hours and one special

**Updated frame** (if open):
```
WORKSHOP CAFÉ
Open Today 9am–5pm
Coffee · Coworking · Events

[QR CODE]
```

---

### 🕐 MEDIUM-TERM FIXES (Next Month)

#### 6. Time-of-Day Scheduling (6 Modes)
**Research**: "Screen should behave differently at 8am vs. 1pm vs. 9pm"

**Mode Schedule**:

| Time | Mode | Ambient % | Content Focus | Loop Length |
|------|------|-----------|---------------|-------------|
| 00:00–07:00 | **Night** | 80% | Minimal text, deep colors, safety info | 120s |
| 07:00–09:00 | **Infrastructure** | 60% | Commuter-friendly, minimal text | 72s |
| 09:00–17:00 | **Day/Mostro** | 40% | Services, booking, café info | 72s |
| 17:00–20:00 | **Infrastructure** | 50% | Balanced mix | 72s |
| 20:00–23:00 | **Night** | 70% | Event-focused if active, otherwise ambient | 90s |
| Wed 18:30–23:30 | **Student** | 30% | Youth-focused, discounts, teal/orange | 60s |

**Implementation**: Create 6 separate component files with smart router at `/signage`

---

#### 7. Event Lifecycle System
**Research**: "Remove from loop the day after the event"

**System**:
```typescript
interface Event {
  id: string;
  title: string;
  date: Date;
  endDate: Date;
  artwork: string;
  qrLink: string;
}

// Auto-expire events after endDate
const activeEvents = events.filter(e => new Date() <= e.endDate);
```

**Frame generation**: Only create event frame if `activeEvents.length > 0`

---

#### 8. "Space Available Tonight" Conditional Frame
**Research**: "Real-time availability is more effective than permanent venue-hire slides"

**Trigger**: Only show if studio genuinely has same-day availability

**Frame**:
```
SPACE AVAILABLE TONIGHT
Studio B – 8pm slot open
Rehearsal ready

info@crsoxford.com
[QR CODE]
```

**System**: Requires booking calendar integration (future feature)

---

## File Structure

```
src/pages/
├── SignageEnhancedV5.tsx          [NEW - Main implementation]
├── SignageNight.tsx                [NEW - Night mode 00:00-07:00]
├── SignageStudent.tsx              [NEW - Student mode Wed evenings]
├── SignageMostro.tsx               [NEW - Day mode 09:00-17:00]
└── SignageRouter.tsx               [NEW - Smart time-based router]

public/static/
├── signage-v5.css                  [NEW - V5 styling]
├── signage-v5.js                   [NEW - Station ID rotation, QR logic]
├── signage-ambient-frames/         [NEW - ODRO textures, Digital Pulse]
│   ├── odro-panel-texture.webp
│   ├── digital-pulse-viz.webp
│   └── burn-in-protection.webp
└── qr-codes/
    ├── qr-crsoxford.svg           [NEW]
    ├── qr-recording.svg           [NEW]
    ├── qr-rehearsal.svg           [NEW]
    └── qr-workshop-cafe.svg       [NEW]
```

---

## CSS Specifications

### Station ID Badge
```css
.station-id-badge {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: rgba(14, 14, 14, 0.85);
  border: 1px solid #C2A85A;
  padding: 8px 12px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: rgba(245, 245, 245, 0.9);
  opacity: 0.8;
  transition: opacity 0.5s ease;
  z-index: 100;
}
```

### QR Code Container
```css
.qr-code-container {
  position: absolute;
  bottom: 20px;
  left: 20px;
  width: 120px;
  height: 140px;
  background: #fff;
  padding: 10px;
  border: 2px solid #C2A85A;
  border-radius: 4px;
}

.qr-code-label {
  text-align: center;
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.05em;
  margin-top: 4px;
  color: #0E0E0E;
}
```

---

## Deployment Plan

### Phase 1: Create V5 with immediate fixes
1. Build SignageEnhancedV5.tsx
2. Add 3 ambient frames (50% ratio)
3. Add station ID rotating badge
4. Audit and fix 3×5 rule violations
5. Add QR codes
6. Remove Workshop Café frame if not open

**Timeline**: Today (2-3 hours)

### Phase 2: Time-based scheduling
7. Create Night/Student/Mostro modes
8. Build smart router with time logic
9. Test mode switching

**Timeline**: Tomorrow (3-4 hours)

### Phase 3: Dynamic features
10. Build event lifecycle system
11. Add "available tonight" conditional frame
12. Connect to booking calendar API

**Timeline**: Next week (4-6 hours)

---

## Success Metrics

**Research-aligned KPIs**:
1. **Ambient ratio**: 50%+ ✅
2. **3×5 compliance**: 100% ✅
3. **QR scan rate**: Track via analytics
4. **Pedestrian dwell time**: Observe honey-pot effect
5. **"Truth standard"**: 100% accuracy audit monthly
6. **Time-of-day relevance**: Mode switching working

**Expected grade**: **A- (92/100)** after Phase 1+2  
**Target grade**: **A (95/100)** after Phase 3

---

## Notes

- Keep V3 live at `/signage-enhanced` during V5 development
- Deploy V5 to `/signage-v5` for testing
- Switch primary production route after 1 week of testing
- Archive legacy modes (signage-loop, signagesignal) after V5 proven

---

**Status**: Ready to implement  
**Next Action**: Create SignageEnhancedV5.tsx with Phase 1 fixes
