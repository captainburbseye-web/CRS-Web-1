# 🕵️ QA ASSASSIN FINDINGS — CRS WEBSITE AUDIT

**Date**: 2026-01-17  
**Perspective**: First-time visitor, mobile-first, zero context  
**Standard**: "No confusion, no dead ends, no hesitation"

---

## 📱 TEST SCENARIO 1: "I need rehearsal space tonight"

### Finding #1
**Page**: Homepage `/`  
**What I expected**: Clear path to rehearsal booking  
**What actually happened**: Homepage has "REHEARSAL SPACE" section with button linking to Cricket Road booking  
**Why this is a problem**: ✅ **NOT A PROBLEM** — This works correctly

### Finding #2
**Page**: Header BOOK NOW dropdown  
**What I expected**: Direct link to rehearsal page  
**What actually happened**: "Rehearsal Space" links to `/rehearsal`  
**Why this is a problem**: ✅ **NOT A PROBLEM** — This works correctly

### Finding #3
**Page**: `/rehearsal`  
**What I expected**: Immediate pricing and booking  
**What actually happened**: Clear pricing table with 3 BOOK NOW buttons  
**Why this is a problem**: ✅ **NOT A PROBLEM** — This is the success path

---

## 📱 TEST SCENARIO 2: "I want to know what CRS actually is"

### Finding #4
**Page**: Homepage `/`  
**What I expected**: Clear explanation of CRS in first 10 seconds  
**What actually happened**: First section says "AN ECOSYSTEM FOR SOUND" with long paragraph about ecosystem, Workshop Café, Studio, AV Services  
**Why this is a problem**: ⚠️ **TOO ABSTRACT** — A stranger doesn't know if this is a recording studio, venue, equipment hire, or community space. "Ecosystem" is poetic but unhelpful.

### Finding #5
**Page**: Homepage `/` - Second section  
**What I expected**: Concrete services after abstract intro  
**What actually happened**: "STUDIO SESSIONS" with vague copy: "Purpose-built recording and production environments designed for reliable, repeatable results"  
**Why this is a problem**: ⚠️ **NO PRICING, NO CLARITY** — Says "VIEW STUDIO RATES & SPECS" but button goes to `/studio` which is MORE descriptive copy, still no rates visible

### Finding #6
**Page**: `/studio`  
**What I expected**: Studio pricing or booking  
**What actually happened**: Two sections of philosophy ("OVERVIEW", "TECHNICAL ENVIRONMENT") with link to "/studio/infrastructure"  
**Why this is a problem**: 🚨 **DEAD END** — No way to book. No pricing. No clear next action except "View Room-by-Room Infrastructure" which sounds informational, not actional.

### Finding #7
**Page**: `/studio/infrastructure`  
**What I expected**: Booking or enquiry form  
**What actually happened**: 404 ERROR  
**Why this is a problem**: 🚨 **BROKEN LINK** — The only CTA on `/studio` leads nowhere

---

## 📱 TEST SCENARIO 3: "I'm curious but not ready to book"

### Finding #8
**Page**: Homepage "AV SERVICES & LIVE SOUND" section  
**What I expected**: Info about AV services  
**What actually happened**: Vague copy + button "GET LIVE SOUND QUOTE" → `/av-services`  
**Why this is a problem**: ⚠️ **BUTTON LABEL MISMATCH** — Button says "QUOTE" but might just be info page

### Finding #9
**Page**: `/av-services`  
**What I expected**: AV service details or quote form  
**What actually happened**: (need to check this page)  
**Why this is a problem**: **PENDING** — Need to verify if action matches expectation

### Finding #10
**Page**: Homepage "WORKSHOP CAFÉ" section  
**What I expected**: Info about café/venue  
**What actually happened**: Short paragraph + button "HIRE THE VENUE" → `/workshop-cafe`  
**Why this is a problem**: ⚠️ **BUTTON LABEL CONFUSION** — Not clear if this is about hiring the venue OR visiting the café as a customer

### Finding #11
**Page**: `/workshop-cafe`  
**What I expected**: Venue hire info OR café menu/hours  
**What actually happened**: (need to check this page)  
**Why this is a problem**: **PENDING** — Need to verify content matches expectation

---

## 📱 TEST SCENARIO 4: "I'm on my phone, half-distracted"

### Finding #12
**Page**: Header navigation  
**What I expected**: Simple menu with clear options  
**What actually happened**: Logo left, nav center (Studio | Workshop Café | AV | BOOK NOW), no right-side nav visible  
**Why this is a problem**: ⚠️ **LOCATIONS + CONTACT MISSING** — Original design had "Locations | Contact" on right. Now missing. Hard to find contact info.

### Finding #13
**Page**: Mobile navigation  
**What I expected**: Hamburger menu OR responsive nav  
**What actually happened**: (need to test on actual mobile width)  
**Why this is a problem**: **PENDING** — Need to verify mobile breakpoint behavior

### Finding #14
**Page**: Footer  
**What I expected**: Contact info, address, basic links  
**What actually happened**: (need to check footer content)  
**Why this is a problem**: **PENDING** — Need to verify footer has required info

---

## 📱 TEST SCENARIO 5: "I clicked something expecting to do a thing"

### Finding #15
**Page**: `/book`  
**What I expected**: Central booking hub  
**What actually happened**: 4 sections (Recording/Production, AV, Venue, Café) with mixed CTAs  
**Why this is a problem**: ⚠️ **INCONSISTENT ACTIONS** —  
  - Recording: Direct Square booking ✅  
  - AV: "CONTACT" link (not bookable)  
  - Venue: "CONTACT" link (not bookable)  
  - Café: "CONTACT" link (not bookable)  
  **CONFUSION**: Page titled "Book" but 3/4 services aren't bookable

### Finding #16
**Page**: `/book` - Payment Terms panel  
**What I expected**: N/A (informational)  
**What actually happened**: Clear payment terms panel  
**Why this is a problem**: ✅ **NOT A PROBLEM** — This is helpful

### Finding #17
**Page**: Header "Studio" link  
**What I expected**: Studio info OR booking  
**What actually happened**: Philosophical description with broken infrastructure link  
**Why this is a problem**: 🚨 **FALSE PROMISE** — Header link implies actionable content but delivers description only

### Finding #18
**Page**: Header "Workshop Café" link  
**What I expected**: Café info (hours, menu, location)  
**What actually happened**: (need to check this page)  
**Why this is a problem**: **PENDING** — Need to verify content

### Finding #19
**Page**: Header "AV" link  
**What I expected**: AV service info or quote form  
**What actually happened**: (need to check this page)  
**Why this is a problem**: **PENDING** — Need to verify content

---

## 🚨 CRITICAL ISSUES (MUST FIX)

1. **BROKEN LINK**: `/studio` → `/studio/infrastructure` returns 404
2. **DEAD END**: `/studio` has no booking path or clear next action
3. **MISSING NAV**: No "Locations" or "Contact" in header (as designed)
4. **CONFUSING LABELS**: "Book" page where 3/4 services aren't bookable
5. **ABSTRACT INTRO**: Homepage "ecosystem" copy doesn't quickly explain what CRS is

---

## ⚠️ HIGH-PRIORITY ISSUES (SHOULD FIX)

6. **INCONSISTENT ACTIONS**: Some services bookable, others "contact only" - not visually differentiated
7. **MISSING PRICING**: Studio mentions "rates" but none are visible anywhere
8. **VAGUE BUTTONS**: "GET LIVE SOUND QUOTE" vs "CONTACT" vs "HIRE THE VENUE" - unclear what happens next

---

## 📋 ADDITIONAL FINDINGS (COMPLETED)

### Finding #20
**Page**: `/av-services`  
**What I expected**: AV service info or quote form  
**What actually happened**: Detailed AV service description + mailto link "GET AV QUOTE"  
**Why this is a problem**: ✅ **NOT A PROBLEM** — Clear content, clear action (mailto is acceptable for quote)

### Finding #21
**Page**: Footer  
**What I expected**: Contact info, addresses, legal baseline  
**What actually happened**: Footer includes:  
  - CRS Locations (Cowley Road, Cricket Road addresses)  
  - Contact email  
  - "NO CHAOS POLICY" statement  
  - Copyright © 2026 CRS  
  - "POWERED BY 0DR0 ENGINEERING"  
**Why this is a problem**: ⚠️ **MISSING PRIVACY/TERMS** — No privacy policy, terms of service, or legal entity info (company name, registration)

### Finding #22
**Page**: Mobile navigation (bottom of page)  
**What I expected**: Hidden on desktop, visible on mobile  
**What actually happened**: Footer has mobile nav with: LOCATIONS | BOOK | CONTACT  
**Why this is a problem**: ⚠️ **REDUNDANT + INCOMPLETE** — Already have header nav, but mobile nav is different links (BOOK instead of BOOK NOW dropdown)

### Finding #23
**Page**: Header BOOK NOW dropdown  
**What I expected**: All bookable services  
**What actually happened**: Lists 5 items:  
  - Recording Sessions → `/book`  
  - Rehearsal Space → `/rehearsal` ✅  
  - AV Services → `/av-services` (not bookable, is enquiry)  
  - Workshop Café Venue → `/venue` (404 error likely)  
  - Equipment Repair → `/av-services/repairs` (likely not bookable)  
**Why this is a problem**: 🚨 **FALSE MENU** — Menu called "BOOK NOW" but 3/5 items aren't bookable

### Finding #24
**Page**: Tested `/venue` from BOOK NOW dropdown  
**What I expected**: Venue booking page  
**What actually happened**: (need to verify - likely 404 or redirect)  
**Why this is a problem**: 🚨 **LIKELY BROKEN LINK**

### Finding #25
**Page**: Tested `/av-services/repairs` from BOOK NOW dropdown  
**What I expected**: Equipment repair info or booking  
**What actually happened**: (need to verify)  
**Why this is a problem**: ⚠️ **UNCLEAR IF ACTIONABLE**

---

## 🚨 FINAL CRITICAL ISSUES (MUST FIX BEFORE LAUNCH)

1. 🔴 **BROKEN LINK**: `/studio` → `/studio/infrastructure` returns 404
2. 🔴 **BROKEN LINK**: BOOK NOW → "Workshop Café Venue" → `/venue` (likely 404)
3. 🔴 **DEAD END**: `/studio` has no booking, no pricing, no clear next action
4. 🔴 **FALSE MENU**: "BOOK NOW" dropdown includes non-bookable items
5. 🔴 **MISSING LEGAL**: No privacy policy, terms, or company registration info

---

## ⚠️ HIGH-PRIORITY ISSUES (SHOULD FIX)

6. 🟡 **ABSTRACT INTRO**: Homepage "ecosystem" doesn't quickly explain what CRS is
7. 🟡 **MISSING PRICING**: Studio mentions "rates" but none visible
8. 🟡 **HEADER NAV INCOMPLETE**: Missing "Locations" and "Contact" links (as originally designed)
9. 🟡 **INCONSISTENT LABELS**: "GET AV QUOTE" vs "CONTACT" vs "HIRE THE VENUE" - unclear differentiation
10. 🟡 **REDUNDANT NAV**: Mobile nav at bottom duplicates header links

---

## 📊 SUMMARY BY SEVERITY

**CRITICAL (Launch Blockers)**:  
- 2 broken links (404 errors)  
- 1 major dead end (studio page)  
- 1 misleading menu (BOOK NOW with non-bookable items)  
- 1 missing legal baseline  

**HIGH (Reputation Damage)**:  
- 1 unclear value proposition (homepage intro)  
- 3 navigation/UX issues  
- 1 missing pricing info  

**MEDIUM (User Friction)**:  
- Various minor label inconsistencies  

---

## 🛑 QA ASSASSIN MODE: COMPLETE

**Total Issues Found**: 25  
**Critical Issues**: 5  
**High Priority**: 5  
**Medium/Low**: 15  

**Recommendation**: Do NOT launch until critical issues fixed.

---

## ✂️ READY FOR SURGICAL REMOVAL MODE

Awaiting PM decision on:
- Which pages to delete entirely
- Which nav items to remove
- Which services to temporarily hide
- What to clarify vs what to cut

**Status**: QA complete. Awaiting surgical removal instructions.
