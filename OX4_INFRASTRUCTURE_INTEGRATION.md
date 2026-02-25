# OX4 Creative Infrastructure — Signage Integration

**Implementation Status**: ✅ Deployed  
**Route**: `/signage-enhanced`  
**Total Loop**: 96 seconds (8s infrastructure + 88s original)  
**Integration Approach**: Option A — Quiet Integration (recommended)

---

## Executive Summary

The **OX4 Creative Infrastructure** positioning statement has been integrated as **Frame 0** (the opening frame) of the existing `/signage-enhanced` route. This implementation follows the **"infrastructure doesn't announce itself, it just is"** philosophy — a quiet, disciplined presence that shifts perception from *service provider* to *foundational institution*.

---

## Brand Positioning

### Core Descriptor (No Slogan, No Punctuation)
```
Oxford's music scene
We build the rooms
OX4 Creative Infrastructure
```

### Strategic Intent
- **From**: "Cowley Road Studios — Recording & Rehearsal"
- **To**: "Cowley Road Studios — OX4 Creative Infrastructure"
- **Perception Shift**: Service → System, Vendor → Institution, Transactional → Foundational

### Discipline Rules (Infrastructure Behavior)
- ✅ Calm communication
- ✅ Long-term thinking
- ✅ No trend-chasing
- ✅ No desperate energy
- ✅ Consistent visual language

---

## Frame 0 Specifications

### Technical Details
| Parameter | Value |
|---|---|
| **Duration** | 8 seconds |
| **Background** | `#000000` (pure black, not `#0E0E0E`) |
| **Font** | JetBrains Mono, weight 300, letter-spacing 0.02em |
| **Text Color** | `#E5E5E5` (primary), `rgba(229, 229, 229, 0.7)` (lower-third) |
| **Animation** | None for first 3s, ambient drift starts at 6s |
| **QR Code** | Hidden on Frame 0 |
| **LED Indicator** | Hidden on Frame 0 |
| **VU Meter** | Hidden on Frame 0 |

### Text Sequence Timeline
```
00:00 — 02:00 s  →  "Oxford's music scene"
02:00 — 04:00 s  →  "We build the rooms"
04:00 — 06:00 s  →  "OX4\nCreative Infrastructure" (lower-third, smaller, dimmer)
06:00 — 08:00 s  →  Subtle ambient drift begins (±1px, 120s cycle)
```

### Typography Specs
- **Primary text** ("Oxford's music scene", "We build the rooms"):
  - Font size: `2.5rem`
  - Font weight: `300` (light)
  - Opacity: `1.0`
  - Position: Center-center
  - Line height: `1.6`
  - Text align: `center`

- **Secondary text** ("OX4 Creative Infrastructure"):
  - Font size: `1rem`
  - Font weight: `300` (light)
  - Opacity: `0.7`
  - Position: Lower-third (bottom 15%)
  - Line height: `1.6`
  - Text align: `center`

### Motion Rules
- **00:00 – 03:00 s**: No motion (absolute stillness)
- **03:00 – 06:00 s**: Text fades remain still
- **06:00 – 08:00 s**: Subtle ambient drift (`±1px`, 120s cycle)
- **Animation easing**: `ease-in-out`
- **Fade duration**: `1s` per text item

---

## Integration Architecture

### Signage Timeline Structure
```
Frame 0:  infrastructure       8s   (NEW)
Frame 1:  establishment        7s   (COWLEY ROAD STUDIOS)
Frame 2:  positioning         12s   (Creative grassroots infrastructure)
Frame 3:  recording-engine    12s   (Professional recording rooms + VU meter)
Frame 4:  rehearsal-system    10s   (Reliable rehearsal spaces)
Frame 5:  live-capture        10s   (Filmed sessions)
Frame 6:  workshop-cafe       12s   (Workshop Café)
Frame 7:  ecosystem           15s   (Connected creative system)
Frame 8:  invitation          10s   (Book rehearsal + QR code)
---------------------------------------------------
Total:                        96s
```

### File Changes
```
✅ src/data/signageTimeline.ts      — Added Frame 0 + interface extensions
✅ src/pages/SignageEnhancedV2.tsx  — Added infrastructure frame rendering logic
✅ public/static/signage-v2.css     — Added infrastructure frame styles
✅ public/static/signage-v2.js      — Added animateInfrastructureFrame() function
✅ src/data/infrastructureFrame.ts  — Reference specs (not directly imported)
```

### Build Output
```bash
vite v6.4.1 building SSR bundle for production...
✓ 105 modules transformed.
dist/_worker.js  419.67 kB
✓ built in 2.34s
```

---

## Visual Specification

### CSS Class Architecture
```css
/* Infrastructure frame selector */
.signage-frame[data-frame-id="infrastructure"] {
  background: #000000 !important; /* Pure black */
}

/* Text elements (populated by JS) */
.infrastructure-text {
  font-size: 2.5rem;
  font-weight: 300;
  letter-spacing: 0.02em;
  color: #E5E5E5;
  text-align: center;
  opacity: 0; /* Fade in via JS */
  transition: opacity 1s ease-in-out;
}

/* Lower-third variant */
.infrastructure-text.lower-third {
  font-size: 1rem;
  opacity: 0.7;
  bottom: 15%;
}

/* Ambient drift (starts at 6s) */
.signage-frame[data-frame-id="infrastructure"].drift {
  animation: infrastructure-drift 120s ease-in-out infinite;
}

@keyframes infrastructure-drift {
  0%, 100% { transform: translate(0, 0); }
  25%      { transform: translate(1px, -1px); }
  50%      { transform: translate(-1px, 1px); }
  75%      { transform: translate(1px, 1px); }
}
```

### JavaScript Animation Logic
```javascript
function animateInfrastructureFrame(frame) {
  const sequence = [
    { text: "Oxford's music scene", delay: 0, duration: 2000 },
    { text: "We build the rooms", delay: 2000, duration: 2000 },
    { text: "OX4\nCreative Infrastructure", delay: 4000, duration: 2000, className: 'lower-third' }
  ];

  const contentDiv = frame.querySelector('.frame-content');
  contentDiv.innerHTML = '';

  sequence.forEach((item, i) => {
    const textElement = document.createElement('div');
    textElement.className = `infrastructure-text ${item.className || ''}`;
    textElement.style.opacity = '0';
    textElement.textContent = item.text;
    contentDiv.appendChild(textElement);

    // Fade in
    setTimeout(() => {
      textElement.style.transition = 'opacity 1s ease-in-out';
      textElement.style.opacity = '1';
    }, item.delay);

    // Fade out (except last)
    if (i < sequence.length - 1) {
      setTimeout(() => {
        textElement.style.opacity = '0';
      }, item.delay + item.duration - 500);
    }
  });

  // Start drift at 6s
  setTimeout(() => {
    frame.classList.add('drift');
  }, 6000);
}
```

---

## Implementation Options (Archive)

### ✅ Option A — Quiet Integration (DEPLOYED)
**Description**: Add as Frame 0 to existing loop (96s total)  
**Deployment**: Immediate  
**Rationale**: Infrastructure doesn't announce itself. It just is.  
**Status**: **LIVE**

### Option B — Intentional Launch (Not Deployed)
**Description**: Replace loop for 72 hours, then prepend as Frame 0  
**Deployment**: Phased  
**Rationale**: Signals a shift. People notice.  
**Status**: Available if repositioning campaign is needed

### Option C — Dual Mode (Not Deployed)
**Description**: Full loop during day, infrastructure-only at night/Sundays  
**Deployment**: Scheduled  
**Rationale**: Infrastructure speaks differently at different times  
**Status**: Available via signage scheduler API (`/api/signage/schedule`)

---

## Brand Rollout Checklist

### Digital Presence
- [x] **Signage Loop** — Frame 0 integrated at `/signage-enhanced`
- [ ] **Website Footer** — "Cowley Road Studios\nOX4 Creative Infrastructure"
- [ ] **Email Signature** — "Cowley Road Studios | OX4 Creative Infrastructure\n118 Cowley Road, Oxford OX4 1JE"
- [ ] **Social Media Bio** — "OX4 Creative Infrastructure\nRecording · Rehearsal · Community\n118 Cowley Road, Oxford"
- [ ] **Press Boilerplate** — "Cowley Road Studios operates as OX4 Creative Infrastructure..."

### Physical Presence
- [ ] **Front Door Plaque** — Brushed brass, "OX4 Creative Infrastructure"
- [ ] **Window Signage** — "Cowley Road Studios — OX4 Creative Infrastructure"
- [ ] **Interior Wayfinding** — Bamboo panels with brass inlay
- [ ] **Business Cards** — Redesign with infrastructure positioning

### Content & Messaging
- [ ] **Grant Applications** — Frame as infrastructure, not service
- [ ] **Press Releases** — Institutional tone, long-term focus
- [ ] **Staff Training** — Language consistency ("we build", "we support")
- [ ] **Partner Communications** — System framing, not transactional

---

## Testing & Quality Assurance

### Technical Tests
- [x] **Build Success** — `npm run build` passes (419.67 kB)
- [x] **Route Accessibility** — `/signage-enhanced` returns HTTP 200
- [x] **Frame Rendering** — `data-frame-id="infrastructure"` present in HTML
- [x] **Background Color** — Pure black `#000000` (not `#0E0E0E`)
- [x] **Duration Attribute** — `data-duration="8000"` correct
- [ ] **Live Testing** — Verify text sequence timing on 55" Yodeck display
- [ ] **Cross-Browser** — Chrome kiosk, Firefox, Safari, Edge
- [ ] **Performance** — Check for layout shift, frame stutter

### Visual Tests
- [ ] **Legibility** — Text readable at 3m distance (1080p resolution)
- [ ] **Sequence Timing** — 0-2s, 2-4s, 4-6s text transitions smooth
- [ ] **Ambient Drift** — Starts at 6s, ±1px subtle motion, 120s cycle
- [ ] **Transition to Frame 1** — 2s crossfade to COWLEY ROAD STUDIOS frame
- [ ] **Typography** — JetBrains Mono loaded, weight 300, letter-spacing correct
- [ ] **Positioning** — Center-center for primary, lower-third for secondary

### Brand Tests
- [ ] **Tone** — Feels calm, confident, institutional (not promotional)
- [ ] **Consistency** — Matches CRS palette (`#E5E5E5` text on `#000000` black)
- [ ] **Perception** — Visitors understand infrastructure framing
- [ ] **Long-Term** — Message remains relevant 12-24 months from now

---

## Deployment Workflow

### Development (Sandbox)
```bash
cd /home/user/webapp
npm run build
pm2 restart cowleyroadstudios
# Test: https://5173-izpk336dk1tjnllvoqcmk-5c13a017.sandbox.novita.ai/signage-enhanced
```

### Production (Cloudflare Pages)
```bash
cd /home/user/webapp
npm run build
export CLOUDFLARE_API_TOKEN=your_token_here
npx wrangler pages deploy dist --project-name=crs-web-1
# Verify: https://crs-web-1.pages.dev/signage-enhanced
# Or: https://cowleyroadstudios.com/signage-enhanced
```

### Git Workflow
```bash
git add -A
git commit -m "feat: integrate OX4 infrastructure as Frame 0 (quiet integration)"
git pull --rebase origin main
git push origin main
```

---

## Monitoring & Iteration

### Success Metrics
- **Visitor Perception**: Do people understand "infrastructure" framing?
- **Staff Language**: Are team members using infrastructure terminology?
- **Partner Responses**: Grant applications, press coverage framing
- **Brand Consistency**: All channels using OX4 positioning

### Iteration Triggers
- If Frame 0 feels too long → Reduce to 6s (2s + 2s + 2s)
- If infrastructure message unclear → Add subtitle line
- If tone too cold → Warm up typography (weight 400 instead of 300)
- If prominence too low → Enable Option B (72-hour takeover)

### A/B Testing (Optional)
- **Variant A**: Frame 0 at start (current)
- **Variant B**: Frame 0 at end (before invitation)
- **Variant C**: Frame 0 every 3rd loop (less frequent)
- **Measurement**: Visitor surveys, QR scan rate, brand recall

---

## Known Issues & Limitations

### Current Limitations
- ❌ **No GA4 Analytics**: Frame view tracking not implemented
- ❌ **No Auto-Scheduling**: Dual mode (Option C) requires manual API calls
- ❌ **No Yodeck Testing**: Not yet verified on production 55" display
- ❌ **No Accessibility Audit**: Screen reader support for infrastructure frame

### Future Enhancements
- [ ] Add GA4 event tracking for Frame 0 views
- [ ] Implement time-based dual mode (full loop vs infrastructure-only)
- [ ] Create `/signage-infrastructure` route (8s loop only)
- [ ] Add ARIA labels for infrastructure text sequence
- [ ] Generate video export for social media (8s clip)

---

## FAQ & Decision Log

### Why Frame 0 instead of Frame 8?
Infrastructure sets the tone. It's the foundation. Opening with OX4 positioning establishes context for everything that follows.

### Why pure black (#000000) instead of Chassis Black (#0E0E0E)?
Maximum negative space. Pure black field eliminates visual noise, focuses attention on the text. This is infrastructure — raw, essential, unadorned.

### Why no QR code, LED, or VU meter on Frame 0?
Infrastructure doesn't need ornament. The message stands alone. Every UI element removed reinforces the minimal, foundational aesthetic.

### Why 8 seconds instead of 5 or 10?
- 0-2s: First statement (stillness)
- 2-4s: Second statement (stillness)
- 4-6s: Tagline (stillness)
- 6-8s: Drift begins (transition prep)
= 8 seconds total (3:2:2:1 rhythm)

### Why Option A (quiet integration) instead of Option B (intentional launch)?
Infrastructure doesn't announce itself. It just is. A 72-hour takeover (Option B) would feel promotional, trend-chasing — the opposite of infrastructure discipline.

### Can we revert to the old 88s loop?
Yes. Remove Frame 0 from `SIGNAGE_TIMELINE` array in `src/data/signageTimeline.ts` and rebuild. The old loop is preserved as Frames 1-8.

---

## Related Documentation

- **SIGNAGE_V2_SPEC_COMPLIANCE.md** — Full technical spec for 88s loop (Frames 1-8)
- **AUTOMATED_SIGNAGE_IMPLEMENTATION.md** — Scheduler API, day/night modes
- **HANDOVER_TO_DEV2.md** — Critical warnings, deployment workflow
- **SIGNAGE_COMPARISON_OLD_VS_NEW.md** — OLD vs NEW signage comparison
- **src/data/infrastructureFrame.ts** — Reference implementation (not directly imported)

---

## Quick Reference

### Live URLs
- **Sandbox**: https://5173-izpk336dk1tjnllvoqcmk-5c13a017.sandbox.novita.ai/signage-enhanced
- **Production**: https://crs-web-1.pages.dev/signage-enhanced
- **Custom Domain**: https://cowleyroadstudios.com/signage-enhanced

### Query Parameters
- `?mode=day` — Bright day mode
- `?mode=night` — Dim night mode
- `?debug=1` — Show frame name + countdown

### Keyboard Controls
- **Esc** — Reset to Frame 0
- **←/→** — Manual navigation (pauses auto-advance)
- **R** — Resume auto-advance

### API Endpoints
- `/api/health` — System health check
- `/api/signage/schedule` — Current schedule + next frame
- `/api/pricing` — Pricing data
- `/api/events` — Event feed
- `/api/offers` — Current offers

---

**Implementation Date**: 2026-02-25  
**Total Loop Duration**: 96 seconds  
**Build Size**: 419.67 kB  
**Status**: ✅ Production-Ready  
**Next Steps**: Test on 55" Yodeck display, roll out to footer/email/social

---

*OX4 Creative Infrastructure — We build the rooms.*
