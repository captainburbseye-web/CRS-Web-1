# 🔍 DNS VERIFICATION CHECKLIST — RESEND SETUP

**Site**: CRS Oxford (cowleyroadstudios.com)  
**Date**: 2026-01-16  
**Status**: DNS CONFIRMATION PENDING

---

## ✅ What You've Done

1. ✅ Signed up for Resend
2. ✅ Added domain `cowleyroadstudios.com` to Resend
3. ✅ Added DNS TXT record(s) to Cloudflare
4. ⏳ **WAITING**: DNS propagation (5-30 minutes typical)

---

## 📋 DNS Verification Steps (Do This While Waiting)

### Step 1: Check What Records You Added

In **Cloudflare DNS** for `cowleyroadstudios.com`, confirm you see:

**Resend Verification Record:**
```
Type:     TXT
Name:     @ (or cowleyroadstudios.com)
Content:  resend-verification=XXXXXX
Status:   DNS only (grey cloud icon)
```

**Optional DKIM Record (recommended):**
```
Type:     TXT
Name:     resend._domainkey
Content:  (long string from Resend)
Status:   DNS only (grey cloud icon)
```

---

## ⏱️ While DNS Propagates

DNS changes can take **5 to 30 minutes** to fully propagate. Here's what to do:

### Check DNS Propagation Manually

Run this in your terminal (not sandbox):

```bash
# Check TXT records
dig TXT cowleyroadstudios.com +short

# Or use online tool:
# https://dnschecker.org/#TXT/cowleyroadstudios.com
```

**You should see**: A line starting with `"resend-verification=..."`

---

## 🔑 Get Your Resend API Key (Do This Now)

While DNS propagates, get your API key:

1. **Go to Resend Dashboard**: https://resend.com/api-keys
2. **Click**: Create API Key
3. **Name**: `CRS Contact Form`
4. **Permission**: Sending access (default)
5. **Click**: Create
6. **Copy the key** — it starts with `re_` and you can't see it again

**Save it somewhere safe!**

---

## 🚀 Set Production Secret (After DNS Verifies)

Once Resend dashboard shows **✅ Domain Verified**, run this command:

```bash
cd /home/user/webapp
npx wrangler pages secret put RESEND_API_KEY --project-name cowleyroadstudios
```

**When prompted**, paste your Resend API key (the one starting with `re_`)

---

## ✅ Verify Secret is Set

```bash
npx wrangler pages secret list --project-name cowleyroadstudios
```

**Expected output:**
```
RESEND_API_KEY
```

---

## 🧪 Test Contact Form

After setting the secret:

```bash
curl -X POST https://cowleyroadstudios.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "danny@example.com",
    "subject": "Test",
    "message": "Testing Resend integration"
  }'
```

**Expected response:**
```json
{
  "success": true,
  "message": "[ SIGNAL RECEIVED ] Inquiry logged to CRS Administrative Queue. A technical representative will respond within 24 operational hours."
}
```

---

## 📊 Check Email Delivery

1. **Check inbox**: info@cowleyroadstudios.com
2. **Check spam folder** (sometimes first emails go here)
3. **Check Resend Logs**: https://resend.com/logs

---

## ⚠️ Common Issues

### DNS Not Propagating
**Wait 30 minutes total**, then check Cloudflare DNS again:
- Record must be **DNS only** (grey cloud)
- Record must be **TXT** type
- Content must **exactly match** what Resend gave you

### "Domain not verified" in Resend
1. Wait 5 more minutes
2. Click **Verify** button again
3. Check DNS record is correct (no typos)

### "Email service not configured" error
**You haven't set the production secret yet:**
```bash
npx wrangler pages secret put RESEND_API_KEY --project-name cowleyroadstudios
```

### "Failed to send email" error
**API key invalid or domain not verified:**
1. Check Resend dashboard shows ✅ verified domain
2. Try generating a **new API key**
3. Update the secret again with `wrangler pages secret put`

---

## 🎯 Current Status

| Task | Status |
|------|--------|
| Resend Account | ✅ Created |
| Domain Added | ✅ Added |
| DNS Records | ✅ Added to Cloudflare |
| DNS Propagation | ⏳ **WAITING (5-30 min)** |
| Domain Verification | ⏳ Waiting for DNS |
| API Key Created | ❓ Do this now |
| Production Secret | ❓ After domain verified |
| Test Email | ❓ After secret set |

---

## 📞 What to Do Right Now

1. ✅ **Wait 5-30 minutes** for DNS to propagate
2. ✅ **Get your API key** from Resend (do this now while waiting)
3. ⏳ **Check Resend dashboard** every 5 minutes — look for ✅ green checkmark on domain
4. ✅ **Once verified**: Run `npx wrangler pages secret put RESEND_API_KEY`
5. ✅ **Test**: Submit test contact form OR use curl command above
6. ✅ **Verify**: Check email arrives at info@cowleyroadstudios.com

---

## ✅ Final Checklist

- [ ] DNS TXT record added (resend-verification=...)
- [ ] Optional DKIM record added (resend._domainkey)
- [ ] Waited 5-30 minutes for propagation
- [ ] Resend dashboard shows ✅ Domain Verified
- [ ] Created API key (starts with `re_`)
- [ ] Ran: `npx wrangler pages secret put RESEND_API_KEY`
- [ ] Verified secret: `npx wrangler pages secret list`
- [ ] Tested contact form with curl OR real form submission
- [ ] Email arrived at info@cowleyroadstudios.com

---

**Timeline**: DNS typically takes **10-15 minutes**. If not verified after **30 minutes**, check Cloudflare DNS records for typos.

**Support**: Resend docs at https://resend.com/docs/send-with-cloudflare-workers
