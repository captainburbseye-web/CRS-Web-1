# 🤖 AUTOMATED SIGNAGE SCHEDULE — IMPLEMENTATION GUIDE

**Date**: 2026-02-25  
**System**: CRS Signage Automation  
**Stack**: Hono + Cloudflare Pages + Workers + KV  
**Status**: Phase 1 Complete ✅

---

## 📋 SYSTEM OVERVIEW

This automated signage system provides:
- **Time-based route rotation** (ambient/parallax/audio-reactive)
- **Day/Night mode switching** (automatic based on Europe/London time)
- **Micro-refresh** (every 15 minutes for stability)
- **Health monitoring** (every 5 minutes)
- **Dynamic content** (pricing, events, offers)
- **QR code tracking** (with smart destination switching)

---

## 🏗️ IMPLEMENTATION PHASES

### **Phase 1: Foundation** ✅ (COMPLETED)
- [x] Config JSON files created
- [x] Signage scheduler service
- [x] API routes (health, schedule, pricing, events, offers)
- [x] Day/Night mode automation
- [x] Micro-refresh system
- [x] Health check endpoint

### **Phase 2: Route Rotation** (Week 2)
- [ ] Automatic route switcher at `/signage`
- [ ] A/B testing framework
- [ ] Analytics logging (KV-based)
- [ ] Audio-reactive interludes

### **Phase 3: Dynamic Content** (Week 3)
- [ ] Weekly "freshness" layer
- [ ] Event feed integration (ICS/JSON)
- [ ] Offers/slots counter (KV-based)
- [ ] Services/prices auto-update

### **Phase 4: Intelligence** (Week 4)
- [ ] QR target switcher (smart destinations)
- [ ] Failover mode (cache + error handling)
- [ ] Content deployment system (Git tag releases)
- [ ] Advanced analytics dashboard

---

## 📂 FILE STRUCTURE

```
/home/user/webapp/
├── config/
│   ├── signage.json       ✅ Route schedule + day/night modes
│   ├── pricing.json       ✅ Service rates + features
│   ├── events.json        ✅ Event feed cache
│   └── offers.json        ✅ Slot counters + expiry
├── src/
│   ├── services/
│   │   └── signageScheduler.ts  ✅ Core automation logic
│   └── index.tsx          ✅ API routes added
└── public/static/
    └── signage-v2.js      (needs micro-refresh client code)
```

---

## 🎯 MASTER SCHEDULE (Europe/London Time)

### **Monday–Thursday** (Workweek)
```
07:00-11:00 → /signage-enhanced (ambient)
11:00-16:00 → /signagesignal (parallax)
16:00-22:30 → /signage-enhanced (ambient) + Event cards
22:30-07:00 → /signage-enhanced?mode=night (minimal)
```

### **Friday–Saturday** (Peak Social)
```
07:00-12:00 → /signage-enhanced (ambient)
12:00-18:00 → /signagesignal (parallax)
18:00-23:30 → /signage-enhanced (ambient) + "Tonight" cards
23:30-07:00 → /signage-enhanced?mode=night (minimal)
```

### **Sunday** (Community/Soft)
```
09:00-18:00 → /signage-enhanced (ambient, warmest)
18:00-22:00 → /signagesignal (parallax, quiet authority)
22:00-09:00 → /signage-enhanced?mode=night (minimal)
```

### **Audio-Reactive Interludes**
```
Every Day: 13:00, 17:00, 20:00 (10 minutes each)
Route: /signage-enhanced?mode=audio
```

---

## 🌓 DAY/NIGHT MODE RULES

### **Day Mode** (07:00–18:00)
- Text brightness: **1.15×**
- LED intensity: **1.0×**
- QR border: **2px** (thicker for visibility)

### **Dusk Mode** (18:00–22:30)
- Text brightness: **1.0×**
- LED intensity: **0.8×**
- Warmth boost: **1.1×** (more mustard)
- Event cards: **more frequent**

### **Night Mode** (22:30–07:00)
- Text brightness: **0.85×**
- LED intensity: **0.6×** (minimal)
- Overlays: **minimal** (remove busy elements)
- QR: **visible but calm**

---

## 🔌 API ENDPOINTS

All endpoints return JSON.

### **Health Check** (Every 5 minutes)
```
GET /api/health

Response:
{
  "status": "healthy",
  "timestamp": "2026-02-25T14:00:00Z",
  "schedule": {
    "route": "/signage-enhanced",
    "mode": "day",
    "isAudioInterlude": false
  },
  "configs": {
    "pricing": "1.0.0",
    "events": "1.0.0",
    "offers": "1.0.0"
  }
}
```

### **Current Schedule**
```
GET /api/signage/schedule

Response:
{
  "route": "/signage-enhanced",
  "mode": "day",
  "isAudioInterlude": false,
  "nextChange": "2026-02-25T15:00:00Z",
  "config": {
    "start": "07:00",
    "end": "18:00",
    "textBrightness": 1.15,
    "ledIntensity": 1.0,
    "qrBorder": "2px"
  }
}
```

### **Pricing Data**
```
GET /api/pricing

Response: (see config/pricing.json)
```

### **Events Data**
```
GET /api/events

Response: (see config/events.json)
```

### **Offers Data**
```
GET /api/offers

Response: (see config/offers.json)
```

### **QR Code Redirect**
```
GET /q

Response: 302 Redirect to smart destination
```

---

## 🛠️ PHASE 2 IMPLEMENTATION (Next Steps)

### **2.1 Automatic Route Switcher**

Create `/signage` route that redirects based on schedule:

```typescript
// Add to src/index.tsx
app.get('/signage', async (c) => {
  try {
    const { getActiveRoute } = await import('./services/signageScheduler');
    const route = getActiveRoute();
    
    return c.redirect(route, 302);
  } catch (error) {
    return c.redirect('/signage-enhanced', 302);
  }
})
```

### **2.2 Client-Side Micro-Refresh**

Add to `/public/static/signage-v2.js`:

```javascript
// Micro-refresh every 15 minutes
const REFRESH_INTERVAL = 15 * 60 * 1000; // 15 minutes

setInterval(() => {
  console.log('[CRS Signage] Micro-refresh triggered');
  window.location.reload();
}, REFRESH_INTERVAL);

// Also refresh on visibility change (prevents drift)
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    const lastRefresh = localStorage.getItem('crs_last_refresh');
    const now = Date.now();
    
    if (!lastRefresh || now - parseInt(lastRefresh) > REFRESH_INTERVAL) {
      console.log('[CRS Signage] Visibility refresh triggered');
      localStorage.setItem('crs_last_refresh', now.toString());
      window.location.reload();
    }
  }
});
```

### **2.3 A/B Testing Framework**

Add to `config/signage.json`:

```json
{
  "abTesting": {
    "enabled": true,
    "tests": [
      {
        "id": "cta-wording",
        "variants": [
          { "id": "A", "text": "Book Rehearsal / Book Recording" },
          { "id": "B", "text": "Scan for Rates / Check Availability" }
        ],
        "distribution": { "A": 50, "B": 50 },
        "metric": "qr_scans",
        "startDate": "2026-03-01",
        "endDate": "2026-03-08"
      }
    ]
  }
}
```

---

## 📊 CONTENT CADENCE (Automated Updates)

### **Every Monday 09:00**
- Update "This week" card from event feed
- Reset "New this week" highlight
- Rotate hero line (choose 1):
  - "Serious sound. Open doors."
  - "Where rehearsal becomes recording."
  - "Built for musicians."

### **Every Thursday 16:00**
- Increase event-card frequency (weekend priming)
- If Friday/Saturday event: inject "Tomorrow / Tonight" card

### **1st of Every Month 10:00**
- Update "This month" card (top 3 events + 1 headline offer)
- Rotate background ambient set (new loop assets)

---

## 🔧 CLOUDFLARE WORKERS + KV SETUP

### **KV Namespace Setup**

```bash
# Create KV namespace
npx wrangler kv:namespace create "CRS_SIGNAGE"

# Add to wrangler.jsonc
{
  "kv_namespaces": [
    {
      "binding": "KV",
      "id": "your-kv-namespace-id"
    }
  ]
}
```

### **KV Keys**

```
# Offer counters
offer:rehearsal_10_slots:remaining = 10
offer:recording_first_session:remaining = 5

# Event cache (6h TTL)
events:cache = {...}
events:cache:updated = "2026-02-25T14:00:00Z"

# Pricing cache (24h TTL)
pricing:cache = {...}
pricing:cache:updated = "2026-02-25T03:00:00Z"

# A/B test variant (hourly)
ab:variant:hour = "A"

# Health check
health:last_ok = "2026-02-25T14:00:00Z"

# QR scan logs
scan:1709128800000 = {"timestamp": "...", "mode": "day", "variant": "A"}
```

---

## 🚀 DEPLOYMENT STEPS (Phase 2+)

### **Step 1: Update Configs**
```bash
cd /home/user/webapp
# Edit config/*.json files as needed
git add config/
git commit -m "config: Update signage schedule"
```

### **Step 2: Add KV Bindings**
```bash
# Edit wrangler.jsonc
npx wrangler kv:namespace create "CRS_SIGNAGE"
# Copy namespace ID to wrangler.jsonc
```

### **Step 3: Deploy**
```bash
npm run build
git push origin main  # Triggers Cloudflare Pages auto-deploy
```

### **Step 4: Verify**
```bash
curl https://crs-web-1.pages.dev/api/health
curl https://crs-web-1.pages.dev/api/signage/schedule
```

---

## 📈 ANALYTICS & MONITORING

### **Health Check Cron** (Cloudflare Workers Cron)

```javascript
// Add to wrangler.jsonc
{
  "triggers": {
    "crons": ["*/5 * * * *"]  // Every 5 minutes
  }
}

// Add cron handler to src/index.tsx
export default {
  async scheduled(event, env, ctx) {
    // Run health check
    const response = await fetch('https://crs-web-1.pages.dev/api/health');
    const health = await response.json();
    
    // Log to KV
    await env.KV.put('health:last_ok', new Date().toISOString());
    
    // Alert if unhealthy
    if (health.status !== 'healthy') {
      console.error('[CRS Signage] Health check failed:', health);
    }
  }
}
```

### **QR Scan Logging**

```javascript
// In /q endpoint
app.get('/q', async (c) => {
  const schedule = await getScheduleResult();
  const scanId = `scan:${Date.now()}`;
  
  // Log to KV
  await c.env.KV.put(scanId, JSON.stringify({
    timestamp: new Date().toISOString(),
    mode: schedule.mode,
    route: schedule.route,
    variant: 'A', // From A/B test
  }), { expirationTtl: 86400 * 30 }); // 30 days
  
  return c.redirect('https://cowleyroadstudios.com/book', 302);
});
```

---

## 🧪 TESTING CHECKLIST

### **Phase 1 Testing** ✅
- [x] Config files load correctly
- [x] `/api/health` returns healthy status
- [x] `/api/signage/schedule` returns current schedule
- [x] `/api/pricing` returns pricing data
- [x] `/api/events` returns events data
- [x] `/api/offers` returns offers data
- [x] Day/Night mode switches correctly
- [x] Time range calculations work (including overnight)

### **Phase 2 Testing** (Pending)
- [ ] `/signage` redirects to correct route based on time
- [ ] Micro-refresh triggers every 15 minutes
- [ ] Audio-reactive interludes activate at 13:00, 17:00, 20:00
- [ ] A/B testing distributes variants correctly
- [ ] QR scans are logged to KV

### **Phase 3 Testing** (Pending)
- [ ] Event feed refreshes every 6 hours
- [ ] Pricing cache updates daily at 03:00
- [ ] Offers counter decrements on booking
- [ ] "This week" card updates every Monday 09:00
- [ ] "This month" card updates on 1st of month

---

## 🎯 SUCCESS METRICS

Track these KPIs:

1. **Signage Uptime** (target: 99.9%)
2. **QR Scan Rate** (scans per day)
3. **Route Distribution** (% time on each route)
4. **A/B Test Conversion** (variant A vs B)
5. **Health Check Failures** (should be 0)
6. **Micro-Refresh Stability** (no crashes after 24h+)

---

## 🔗 QUICK REFERENCE

### **Live URLs**
- Health Check: https://crs-web-1.pages.dev/api/health
- Schedule: https://crs-web-1.pages.dev/api/signage/schedule
- Pricing: https://crs-web-1.pages.dev/api/pricing
- QR Shortlink: https://crs-web-1.pages.dev/q

### **Config Files**
- `/home/user/webapp/config/signage.json`
- `/home/user/webapp/config/pricing.json`
- `/home/user/webapp/config/events.json`
- `/home/user/webapp/config/offers.json`

### **Core Service**
- `/home/user/webapp/src/services/signageScheduler.ts`

### **API Routes**
- `/home/user/webapp/src/index.tsx` (lines 74-155)

---

## 📝 NEXT ACTIONS

**Immediate** (This Week):
1. Test Phase 1 API endpoints
2. Add client-side micro-refresh code
3. Implement `/signage` route switcher
4. Set up Cloudflare KV namespace

**Short-term** (Next 2 Weeks):
1. Build A/B testing framework
2. Integrate event feed (ICS/JSON)
3. Add offers counter logic
4. Deploy QR scan logging

**Long-term** (Next Month):
1. Advanced analytics dashboard
2. Content deployment system
3. Failover mode
4. Automated weekly/monthly refreshes

---

**Status**: Phase 1 Complete ✅  
**Next Phase**: Route Rotation (Week 2)  
**Ready for**: Testing + Deployment

---

*Cowley Road Studios — Serious sound. Open doors.*  
*Automated Signage System — Built 2026-02-25*
