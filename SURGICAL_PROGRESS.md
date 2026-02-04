# 🔪 SURGICAL REMOVAL — PROGRESS REPORT

**Date**: 2026-01-17  
**Status**: PARTIAL COMPLETE — REQUIRES MANUAL COMPLETION  
**Mode**: Atomic commit execution  

---

## ✅ COMPLETED (Commit d4a7f40)

1. ✅ **Footer disclaimer added**: "Build phase" notice now in footer sitewide
2. ✅ **BOOK NOW dropdown cleaned**: Now shows only:
   - Band Rehearsals (direct booking)
   - Recording (Enquiry)
   - Pod Hire (Enquiry)
   - Repairs (Enquiry)
3. ✅ **Build passing**: No errors, site functional

---

## ⚠️ REMAINING TASKS (Require manual completion due to file complexity)

###4. Delete `/venue` route
**Location**: `src/index.tsx` lines ~2185-2323  
**Action**: Remove entire route (138 lines)  
**Reason**: Venue hire not ready for public launch per PM decision

### 5. Reframe `/workshop-cafe` page
**Location**: `src/index.tsx` lines ~1799-2100  
**Action**: Add status line at top:
```
Workshop Café is not currently open for daily café service.
The space is available by enquiry for private hire and community use (subject to build schedule).
```
**Remove**: Any "drop in", "opening hours", "daily service" language

### 6. Fix `/studio` page
**Location**: `src/index.tsx` lines ~845-967  
**Action**: 
- Remove broken link to `/studio/infrastructure`
- Add build-phase note
- Change CTA to "ENQUIRE" instead of implying direct booking
- Add pricing or state "Available by enquiry"

### 7. Update mobile nav
**Location**: `src/index.tsx` lines ~360-364  
**Action**: Review if needed or can be left as-is

---

## 🎯 WHY PAUSED

The `src/index.tsx` file is 2420 lines with complex nested JSX. Automated string replacement is hitting escaping issues. 

**Recommendation**: 
- Current state (d4a7f40) is **deployable** and **safer than before**
- Remaining fixes are **important but not launch-blocking** 
- Can be completed manually or in smaller targeted edits

---

## 🚦 LAUNCH READINESS STATUS

**Current state after d4a7f40**:
- 🟢 Footer disclaimer: Present
- 🟢 BOOK NOW dropdown: Honest (only direct booking shown as direct)
- 🟡 `/venue` route: Still exists (but not linked in BOOK NOW anymore)
- 🟡 `/workshop-cafe`: Needs status line
- 🟡 `/studio`: Needs enquiry framing

**Can we launch with this?**  
Yes, with caveat: Users could still find `/venue` and `/workshop-cafe` via direct URL and get wrong impression. But main navigation is now honest.

---

## 📋 RECOMMENDATION

**Option A**: Deploy current state (d4a7f40) - Safer than before, main issues fixed  
**Option B**: Complete remaining 4 fixes manually before deploying  
**Option C**: I continue with smaller targeted edits (may take 3-4 more commits)

**PM Decision Required**: Which option?

---

**Status**: Awaiting Danny's decision on how to proceed with remaining surgical cuts.
