# 📅 WORKSHOP CAFÉ EVENTS SETUP GUIDE

## OVERVIEW

Workshop Café now has an auto-updating "What's On" newsreel powered by Google Calendar.

Events update automatically without site redeployment.

---

## 🔧 SETUP STEPS

### 1. CREATE PUBLIC GOOGLE CALENDAR

1. Go to Google Calendar (calendar.google.com)
2. Create a new calendar called "Workshop Café Events"
3. Make it **publicly visible**:
   - Click Settings → [Calendar Name] → Access permissions
   - Check "Make available to public"
   - Set visibility to "See all event details"

### 2. GET CALENDAR ID

1. In Calendar Settings → [Calendar Name] → Integrate calendar
2. Copy the **Calendar ID** (looks like: `abc123@group.calendar.google.com`)

### 3. GET GOOGLE API KEY

1. Go to Google Cloud Console (console.cloud.google.com)
2. Create a new project (or use existing)
3. Enable "Google Calendar API"
4. Create credentials → API Key
5. Restrict the key to "Google Calendar API" only
6. Copy the API key

### 4. UPDATE SITE CONFIGURATION

**Option A: Quick Test (not secure for production)**

Edit `/home/user/webapp/src/index.tsx`:

```typescript
// Find this line:
const CALENDAR_ID = 'YOUR_CALENDAR_ID@group.calendar.google.com'
const API_KEY = 'YOUR_GOOGLE_API_KEY'

// Replace with your actual values:
const CALENDAR_ID = 'abc123@group.calendar.google.com'
const API_KEY = 'AIza...'
```

**Option B: Production (secure with environment variables)**

1. Create `.dev.vars` file (local development):
```
GOOGLE_CALENDAR_ID=abc123@group.calendar.google.com
GOOGLE_API_KEY=AIza...
```

2. Update `src/index.tsx` to use env vars:
```typescript
const CALENDAR_ID = c.env?.GOOGLE_CALENDAR_ID || ''
const API_KEY = c.env?.GOOGLE_API_KEY || ''
```

3. Add secrets to Cloudflare Pages:
```bash
npx wrangler pages secret put GOOGLE_CALENDAR_ID
npx wrangler pages secret put GOOGLE_API_KEY
```

### 5. REBUILD AND TEST

```bash
cd /home/user/webapp
npm run build
pm2 restart cowleyroadstudios
```

Visit: http://localhost:3000/venue

---

## 📝 HOW TO ADD EVENTS

### In Google Calendar:

1. Click "+ Create" in Google Calendar
2. Fill in event details:
   - **Title**: Event name (shows in feed)
   - **Date & Time**: When it happens
   - **Description**: Short description (first 150 chars show in preview)
   - **Location**: Optional (shows if added)

### To add booking links:

Add the booking URL anywhere in the description:

```
Join us for a workshop on sound design.

Book tickets: https://example.com/tickets
```

The system will automatically extract the first URL as the booking link.

---

## 🎨 EVENT DISPLAY

### On /venue page:
- Shows **next 7 events**
- Each event displays:
  - Title
  - Date & time (if set)
  - Description preview (150 chars)
  - "Book Tickets / More Info" button (if URL in description)

### On home page:
- Shows **next 3 events** only
- Compact format: Date · Title
- Link to "View all events" → /venue

### Empty state:
If no events scheduled:
> "No public events listed — the space is available to book."

---

## 🔒 SECURITY NOTES

### API Key restrictions (IMPORTANT):

1. In Google Cloud Console → API Key settings:
   - **Application restrictions**: HTTP referrers
   - **Add**: `cowleyroadstudios.com/*` and `*.pages.dev/*`
   - **API restrictions**: Google Calendar API only

2. Never commit API keys to git
3. Use environment variables for production

---

## 🧪 TESTING

### Test empty state:
1. Temporarily remove all events from calendar
2. Reload /venue page
3. Should show: "No public events listed — the space is available to book."

### Test with events:
1. Add 2-3 test events to calendar
2. Wait 1 minute (API caches)
3. Reload /venue page
4. Events should appear

### Test booking links:
1. Add an event with URL in description
2. Reload /venue page
3. Should show "Book Tickets / More Info" button

---

## 📊 CURRENT SETUP STATUS

**Calendar Integration**: ⚠️ NEEDS SETUP
- [ ] Google Calendar created
- [ ] Calendar ID added to code
- [ ] API key added to code
- [ ] Tested on /venue page
- [ ] Tested on home page

**Booking System**: ✅ READY
- [x] "Book the Space" (venue hire)
- [x] "Request Availability" (private enquiries)
- [x] Dynamic "Book Tickets" (per-event links)

---

## 🚀 DEPLOYMENT

Once configured:

```bash
cd /home/user/webapp
git add .
git commit -m "Configure Google Calendar events feed"
git push origin feature/final-structure
```

Then merge to main and deploy to production.

---

## 🆘 TROUBLESHOOTING

**No events showing:**
- Check Calendar ID is correct
- Verify API key has Google Calendar API enabled
- Ensure calendar is set to "Public"
- Check browser console for errors

**Booking links not appearing:**
- Ensure URL is in event description
- URL must start with http:// or https://

**Events not updating:**
- Google Calendar API caches for ~1 minute
- Hard refresh browser (Cmd+Shift+R / Ctrl+F5)
- Check /events.json endpoint directly

---

## 📞 SUPPORT

If events feed fails:
- Site will gracefully show empty state
- Users can still "Book the Space" via CTAs
- No site breakage if Calendar API is down

---

**Ready to configure?** Follow steps 1-5 above to activate the newsreel.
