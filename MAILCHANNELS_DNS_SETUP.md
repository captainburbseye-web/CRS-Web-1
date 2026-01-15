# MailChannels DNS Configuration for cowleyroadstudios.com

## 📧 CONTACT FORM EMAIL INTEGRATION — LIVE

**Status:** ✅ **Code deployed and active**  
**Production URL:** https://cowleyroadstudios.com  
**Latest Build:** https://d28179ec.cowleyroadstudios.pages.dev  
**Commit:** `0b8436a`

---

## 🔧 HOW IT WORKS

1. **User submits form** at `/contact`
2. **Frontend POST** → `/api/contact`
3. **Backend formats** form data into HTML email
4. **MailChannels API** sends email to `info@cowleyroadstudios.com`
5. **SPF/DMARC** ensure deliverability

---

## 📋 REQUIRED DNS RECORDS

### Add these to your Cloudflare DNS dashboard for **cowleyroadstudios.com**:

#### 1. SPF Record (Sender Policy Framework)
```
Type:    TXT
Name:    @
Content: v=spf1 include:relay.mailchannels.net ~all
TTL:     Auto
Proxy:   DNS only (grey cloud)
```

#### 2. DMARC Record (Domain-based Message Authentication)
```
Type:    TXT
Name:    _dmarc
Content: v=DMARC1; p=none; rua=mailto:dmarc@cowleyroadstudios.com
TTL:     Auto
Proxy:   DNS only (grey cloud)
```

---

## 🎯 EMAIL CONFIGURATION

**To:** info@cowleyroadstudios.com  
**From:** noreply@cowleyroadstudios.com  
**Name:** CRS Contact Form  
**Subject:** `[CRS CONTACT] {subject}`  

**Email Template:**
- Green terminal-style HTML
- Orange rack UI accents
- Includes: Name, Email, Subject, Message
- Metadata: Timestamp, Client IP (cf-connecting-ip)

---

## ✅ TESTING CHECKLIST

After DNS records are added (allow 5-10 minutes for propagation):

1. **Visit:** https://cowleyroadstudios.com/contact
2. **Fill form:**
   - Name: Test User
   - Email: test@example.com
   - Subject: DNS Test
   - Message: Testing MailChannels integration
3. **Submit** and watch for success message
4. **Check inbox:** info@cowleyroadstudios.com
5. **Verify email** contains all form data with rack styling

---

## 🔍 VERIFICATION COMMANDS

```bash
# Check SPF record
dig TXT cowleyroadstudios.com +short | grep spf1

# Check DMARC record
dig TXT _dmarc.cowleyroadstudios.com +short | grep DMARC1

# Test contact form endpoint
curl -X POST https://cowleyroadstudios.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "API Test",
    "message": "Testing direct API call"
  }'
```

---

## 🚨 TROUBLESHOOTING

**If emails don't arrive:**

1. **Check DNS propagation** (5-10 minutes typical)
2. **Verify SPF record** with `dig` command above
3. **Check spam folder** at info@cowleyroadstudios.com
4. **View server logs** for MailChannels errors
5. **Test with different email addresses** (some providers block transactional email)

**Common issues:**
- DNS records not yet propagated → Wait 10 minutes
- SPF syntax error → Verify exact format from this doc
- MailChannels API error → Check server logs with `pm2 logs cowleyroadstudios --nostream`

---

## 📦 DEPLOYMENT SUMMARY

**Files changed:**
- `/src/index.tsx` — Replace `/api/contact` endpoint with MailChannels integration

**Key features:**
- ✅ No API key required (MailChannels free for Cloudflare Workers)
- ✅ HTML email template with CRS rack UI styling
- ✅ Error handling and logging
- ✅ Client IP tracking via cf-connecting-ip
- ✅ Timestamp on all submissions
- ✅ Operational messaging style preserved

**Production status:**
- 🟢 **LIVE** at https://cowleyroadstudios.com
- 🟢 **Code deployed** (commit 0b8436a)
- 🟡 **DNS pending** (SPF/DMARC records needed)
- 🟡 **Testing pending** (after DNS propagation)

---

## 📞 NEXT STEPS

1. **Add DNS records** to Cloudflare dashboard
2. **Wait 5-10 minutes** for propagation
3. **Test contact form** at cowleyroadstudios.com/contact
4. **Verify email delivery** to info@cowleyroadstudios.com
5. **Confirm styling** (green terminal + orange accents)

---

**Document generated:** 2026-01-15  
**Integration version:** 1.0  
**MailChannels API:** https://api.mailchannels.net/tx/v1/send
