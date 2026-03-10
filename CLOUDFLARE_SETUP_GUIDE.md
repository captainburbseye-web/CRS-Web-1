# 🔐 Cloudflare Deployment Setup Guide

## Current Status
**❌ Token Authentication Failed**
- Token provided: `QD532m4XPj52hKcQdxccdytklX2QsDPDsbfrQPkE`
- Error: "Invalid API Token" (code 1000)
- This token may be expired or have insufficient permissions

---

## ✅ How to Get a Working Token

### Step 1: Go to Cloudflare Dashboard
Visit: **https://dash.cloudflare.com/profile/api-tokens**

### Step 2: Create New Token
1. Click **"Create Token"**
2. Use template: **"Edit Cloudflare Workers"** or **"Create Custom Token"**

### Step 3: Required Permissions
Your token needs these permissions:

```
Account:
  - Cloudflare Pages: Edit

Zone: (optional, for domain management)
  - DNS: Edit
  - Page Rules: Edit
```

### Step 4: Create Token & Copy
- Click "Continue to summary"
- Click "Create Token"
- **COPY THE TOKEN IMMEDIATELY** (it's only shown once!)

---

## 🚀 Quick Deploy Commands

Once you have a valid token, run these commands:

### Option 1: Environment Variable (Recommended)
```bash
cd /home/user/webapp

# Set token as environment variable
export CLOUDFLARE_API_TOKEN="YOUR_NEW_TOKEN_HERE"

# Build the project
npm run build

# Deploy to Cloudflare Pages
npx wrangler pages deploy dist --project-name=crs-web-1
```

### Option 2: Login with Wrangler
```bash
cd /home/user/webapp

# Interactive login (opens browser)
npx wrangler login

# Deploy
npm run build
npx wrangler pages deploy dist --project-name=crs-web-1
```

---

## 📋 Project Configuration

Your project is already configured:
- **Project Name**: `crs-web-1`
- **Build Output**: `dist/` (already built, 351 KB)
- **Wrangler Config**: `wrangler.jsonc`

---

## 🎯 Expected Result

After successful deployment, you'll get:

```
✨ Success! Uploaded 50 files (1.2 sec)

✨ Deployment complete! Take a peek at your new Cloudflare Page:
   https://crs-web-1.pages.dev
   https://unique-id.crs-web-1.pages.dev (deployment URL)
```

---

## 🔧 Alternative: Deploy via Cloudflare Dashboard

If API tokens keep failing, you can deploy manually:

1. **Go to**: https://dash.cloudflare.com
2. **Navigate to**: Workers & Pages → Create Application → Pages
3. **Connect**: Link to GitHub repository
   - Repo: `captainburbseye-web/CRS-Web-1`
4. **Build Settings**:
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Framework preset: None (Custom)
5. **Deploy**: Click "Save and Deploy"

---

## 📞 Need Help?

If you're still having issues:
1. Double-check the token was copied completely (no spaces)
2. Verify token permissions include "Cloudflare Pages: Edit"
3. Try creating a fresh token with full Cloudflare Pages permissions
4. Consider using GitHub integration instead of CLI deployment

---

## 🎛️ Your Rack UI Will Deploy To:

**Production URL**: `https://crs-web-1.pages.dev`

This will be your live audio rack interface accessible worldwide! 🎸✨
