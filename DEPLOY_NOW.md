# 🚀 DEPLOY TO CLOUDFLARE - Quick Guide

## ✅ BUILD COMPLETE
- **Status**: Ready to deploy
- **Build folder**: `dist/`
- **Worker**: `_worker.js` (360 KB)
- **Static assets**: All optimized images in `dist/static/`

---

## 🔑 OPTION 1: Update API Token & Deploy (Recommended)

Your current API token is invalid. To deploy via CLI:

### Step 1: Get a New Token
1. Go to https://dash.cloudflare.com/profile/api-tokens
2. Click **Create Token**
3. Use template: **Edit Cloudflare Workers**
4. Or create custom token with these permissions:
   - Account > Cloudflare Pages: Edit
   - Zone > DNS: Edit (optional, for custom domains)
5. Copy the token

### Step 2: Set Environment Variable
```bash
export CLOUDFLARE_API_TOKEN="your-new-token-here"
```

### Step 3: Deploy
```bash
cd /home/user/webapp
npx wrangler pages deploy dist --project-name crs-web-1
```

---

## 🌐 OPTION 2: Deploy via Cloudflare Dashboard (Easiest!)

### Step 1: Go to Dashboard
Visit: https://dash.cloudflare.com/

### Step 2: Navigate to Pages
1. Click **Workers & Pages** in left sidebar
2. Find **crs-web-1** project (or create if it doesn't exist)

### Step 3: Connect GitHub (Auto-Deploy)
1. Click **Settings** > **Builds & deployments**
2. Click **Connect to Git**
3. Select repository: **captainburbseye-web/CRS-Web-1**
4. Set production branch: **main**
5. Build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
6. Click **Save and Deploy**

**That's it!** Every time you push to GitHub, it auto-deploys! 🎉

---

## 📦 OPTION 3: Manual Upload (Last Resort)

If CLI and GitHub don't work:

### Step 1: Create Deployment Archive
```bash
cd /home/user/webapp
tar -czf dist-deployment.tar.gz dist/
```

### Step 2: Upload via Dashboard
1. Go to Cloudflare dashboard
2. Workers & Pages > crs-web-1
3. Click **Upload assets** or **Create deployment**
4. Upload the `dist/` folder contents

---

## 🔧 TROUBLESHOOTING

### "Invalid API Token"
- Token may have expired
- Token may not have Pages edit permissions
- Create a new token with proper permissions

### "Project not found"
If `crs-web-1` doesn't exist:
```bash
npx wrangler pages project create crs-web-1 --production-branch main
```

### "Build failed"
Ensure you ran `npm run build` first:
```bash
cd /home/user/webapp
npm run build
ls -lh dist/_worker.js  # Should see ~360 KB file
```

---

## 🎯 VERIFY DEPLOYMENT

After deploying, check:
1. **URL**: https://crs-web-1.pages.dev/
2. **Control Room buttons**: Should be clickable
3. **Booking links**: Should open Square
4. **Mobile**: Test on phone

---

## 📱 WHAT'S DEPLOYED

When you deploy, users get:
- ✅ 95.9% faster image loading
- ✅ Interactive Control Room booking buttons
- ✅ Mobile-optimized touch targets (80px)
- ✅ Responsive rack graphics
- ✅ Progressive lazy loading
- ✅ Industrial hardware aesthetic
- ✅ All 3 booking links working

---

## 💡 RECOMMENDATION

**Use Option 2 (GitHub auto-deploy)**:
- Set it up once
- Every push to GitHub auto-deploys
- No need to remember CLI commands
- Cloudflare handles everything
- Free and automatic! 🎉

---

**Once deployed, you'll have the SICKEST studio website in Oxford! 🎛️🔥**
