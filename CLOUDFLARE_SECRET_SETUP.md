# Cloudflare API Token Setup for MailChannels

## ✅ Local Development (DONE)
Token stored in `.dev.vars` (gitignored)

## 🚀 Production Setup (REQUIRED)

### Set Production Secret

Run this command to add the token to production:

```bash
cd /home/user/webapp
npx wrangler pages secret put CLOUDFLARE_API_TOKEN --project-name cowleyroadstudios
```

When prompted, paste:
```
cBv0GhhmxNAmiRu0tkt800uxUau-VbHd0spMX0ck
```

### Verify Secret is Set

```bash
npx wrangler pages secret list --project-name cowleyroadstudios
```

Should show:
```
CLOUDFLARE_API_TOKEN
```

---

## 📧 MailChannels DNS Records (STILL REQUIRED)

You still need to add these DNS records to Cloudflare for email delivery:

### Record 1: SPF
```
Type:     TXT
Name:     @
Content:  v=spf1 include:relay.mailchannels.net ~all
TTL:      Auto
Proxy:    DNS only (grey cloud)
```

### Record 2: DMARC
```
Type:     TXT
Name:     _dmarc
Content:  v=DMARC1; p=none; rua=mailto:dmarc@cowleyroadstudios.com
TTL:      Auto
Proxy:    DNS only (grey cloud)
```

---

## 🧪 Testing Contact Form

After DNS records are added and propagated (5-10 minutes):

1. Visit: https://cowleyroadstudios.com/contact
2. Fill form and submit
3. Check: info@cowleyroadstudios.com inbox
4. Email should have green terminal styling

---

## 🔒 Security Notes

- ✅ `.dev.vars` is gitignored (never committed)
- ✅ Production token stored in Cloudflare (encrypted)
- ✅ Token only accessible to Workers runtime
- ✅ No token exposed in client-side code

---

**Status:** 
- 🟢 Local dev token configured
- 🟡 Production secret pending (run command above)
- 🟡 DNS records pending (add in Cloudflare dashboard)
