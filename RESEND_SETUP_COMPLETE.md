# 📧 RESEND EMAIL SETUP FOR CRS CONTACT FORM

**Date**: 2026-01-16  
**Status**: CODE UPDATED - API KEY NEEDED

---

## ✅ Code Changes Complete

The contact form endpoint (`/api/contact`) has been updated to use Resend instead of MailChannels.

---

## 🚀 SETUP STEPS (Do This Now)

### Step 1: Sign Up for Resend

1. Go to **https://resend.com/signup**
2. Sign up with your email (or GitHub)
3. Verify your email address

### Step 2: Add Your Domain

1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter: `cowleyroadstudios.com`
4. You'll see DNS records to add

### Step 3: Add DNS Records in Cloudflare

Go to Cloudflare DNS for `cowleyroadstudios.com` and add these records:

**Record 1: Domain Verification (TXT)**
```
Type:     TXT
Name:     @
Content:  resend-verification=XXXXX (Resend will give you this)
TTL:      Auto
Proxy:    DNS only (grey cloud)
```

**Record 2: DKIM (TXT) - Optional but recommended**
```
Type:     TXT
Name:     resend._domainkey
Content:  (Resend will provide this value)
TTL:      Auto
Proxy:    DNS only (grey cloud)
```

### Step 4: Verify Domain

1. Wait 5-10 minutes for DNS to propagate
2. In Resend dashboard, click **Verify Domain**
3. Should show green checkmark ✅

### Step 5: Get API Key

1. In Resend dashboard, go to **API Keys**
2. Click **Create API Key**
3. Name: `CRS Contact Form`
4. Permissions: **Sending access** (default)
5. Copy the API key (starts with `re_`)

**IMPORTANT**: Save this key! You can't see it again.

### Step 6: Update Local Development

Edit `.dev.vars` file:
```bash
cd /home/user/webapp
nano .dev.vars
```

Replace the placeholder with your real key:
```
RESEND_API_KEY=re_your_actual_key_here
```

Save and exit (Ctrl+X, Y, Enter)

### Step 7: Set Production Secret

Run this command to add the API key to Cloudflare Pages:

```bash
cd /home/user/webapp
npx wrangler pages secret put RESEND_API_KEY --project-name cowleyroadstudios
```

When prompted, paste your Resend API key (starts with `re_`)

### Step 8: Verify Secret is Set

```bash
npx wrangler pages secret list --project-name cowleyroadstudios
```

Should show:
```
RESEND_API_KEY
CLOUDFLARE_API_TOKEN (if you had this before)
```

### Step 9: Test the Contact Form

After deployment:

```bash
curl -X POST https://cowleyroadstudios.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "your-email@example.com",
    "subject": "Test Contact Form",
    "message": "Testing the new Resend integration"
  }'
```

Should return:
```json
{
  "success": true,
  "message": "[ SIGNAL RECEIVED ] Inquiry logged to CRS Administrative Queue..."
}
```

---

## 📊 Resend Free Tier Limits

- **100 emails per day** (free)
- **3,000 emails per month** (free)
- Perfect for CRS contact form volume

If you need more, upgrade to paid plan ($20/month for 50,000 emails)

---

## 🔍 Troubleshooting

### "Email service not configured" error

**Problem**: API key not set or still using placeholder

**Solution**:
1. Make sure you created a real Resend account
2. Got a real API key (starts with `re_`)
3. Set it in `.dev.vars` for local testing
4. Set it with `wrangler pages secret put` for production

### "Failed to send email" error

**Problem**: Domain not verified OR API key invalid

**Solution**:
1. Check Resend dashboard - domain should show ✅ verified
2. Check DNS records are correct in Cloudflare
3. Make sure API key has "Sending access" permission
4. Try generating a new API key

### Emails not arriving

**Problem**: Domain verification incomplete OR spam folder

**Solution**:
1. Verify domain in Resend dashboard shows green ✅
2. Wait 10-15 minutes after DNS changes
3. Check spam/junk folder
4. Check Resend dashboard **Logs** section for delivery status

---

## 📧 Email Configuration

**From**: `CRS Contact Form <noreply@cowleyroadstudios.com>`  
**To**: `info@cowleyroadstudios.com`  
**Reply-To**: User's email from form  
**Subject**: `[CRS CONTACT] {user's subject}`

---

## ✅ Checklist

- [ ] Sign up for Resend account
- [ ] Add domain `cowleyroadstudios.com`
- [ ] Add DNS records in Cloudflare
- [ ] Verify domain (green checkmark)
- [ ] Create API key
- [ ] Update `.dev.vars` with real key
- [ ] Set production secret: `npx wrangler pages secret put RESEND_API_KEY`
- [ ] Deploy code (already done)
- [ ] Test contact form
- [ ] Check email arrives at info@cowleyroadstudios.com

---

## 🎯 Current Status

| Item | Status |
|------|--------|
| Code Updated | ✅ Done |
| Resend Account | ❓ Need to create |
| Domain Added | ❓ Need to add |
| DNS Records | ❓ Need to configure |
| API Key Created | ❓ Need to generate |
| Local `.dev.vars` | ❓ Need real key |
| Production Secret | ❓ Need to set |
| Testing | ⏳ Waiting for setup |

---

## 📞 Need Help?

Resend Support: https://resend.com/support  
Resend Docs: https://resend.com/docs

---

**Next Steps**: Complete the checklist above to get contact form working!
