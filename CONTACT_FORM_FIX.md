# Contact Form - Quick Fix

## Current Status
- ✅ Site design looks good (Saturday version)
- ❌ Contact form still broken (MailChannels 401 error)

## Simple Fix: Add Resend Secret

### Step 1: Sign up for Resend (2 min)
https://resend.com/signup

### Step 2: Add domain (2 min)
- Resend dashboard → Domains → Add Domain
- Enter: `cowleyroadstudios.com`
- Add this DNS record in Cloudflare:
  ```
  Type: TXT
  Name: _resend
  Content: (Resend will show you the value)
  TTL: Auto
  ```
- Wait 5 min, click Verify in Resend

### Step 3: Get API key (1 min)
- Resend dashboard → API Keys → Create
- Name: `CRS Production`
- Copy the key (starts with `re_`)

### Step 4: Add as Cloudflare Secret (1 min)
Run this command:
```bash
cd /home/user/webapp
echo "re_YOUR_KEY_HERE" | npx wrangler pages secret put RESEND_API_KEY --project-name cowleyroadstudios
```

Or use Cloudflare dashboard:
- Workers & Pages → cowleyroadstudios → Settings → Variables
- Under "Production" section
- Click "Add" next to "Secrets (Encrypted)"
- Variable name: `RESEND_API_KEY`
- Value: `re_XXXXXXXX` (paste your key)
- Click "Encrypt and Save"

### Step 5: Update Contact Form Code
I need to change `/api/contact` to use Resend instead of MailChannels.

Do you want me to do that now?
