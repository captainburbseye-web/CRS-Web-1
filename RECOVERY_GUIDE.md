# 🔒 CRS RECOVERY GUIDE — HOW TO NEVER GET STUCK AGAIN

## 🎯 THE GOLDEN RULE

**This template is LOCKED at commit `9ae39ec` — Clean Frontend Rebuild**

---

## 📦 BACKUPS (IN ORDER OF PRIORITY)

### 1. **PROJECT BACKUP (TAR.GZ)**
- **URL**: https://www.genspark.ai/api/files/s/s5b6jEGs
- **Name**: crs-clean-frontend-rebuild-2026-01-10.tar.gz
- **Size**: 1.08 MB
- **Description**: Full project backup with git history
- **How to restore**: Download → Extract to `/home/user/webapp`

### 2. **GIT BRANCHES (GITHUB)**
- **Repository**: https://github.com/captainburbseye-web/CRS-Web-1
- **Golden Template Branch**: `golden-template` (NEVER TOUCH THIS)
- **Dev Working Branch**: `dev-working` (Use this for experiments)
- **Main Branch**: `main` (Production)

### 3. **CRITICAL COMMIT HASH**
- **Commit**: `9ae39ec`
- **Message**: "♻️ FRONTEND REBUILD: Clean Markup + Organized CSS"
- **Bundle**: 56.46 kB (optimized)
- **Date**: 2026-01-10

---

## 🚨 IF YOU GET STUCK — RECOVERY STEPS

### **Option 1: Revert to Golden Template Branch (EASIEST)**
```bash
cd /home/user/webapp
git checkout golden-template
git checkout -b new-feature-branch
# Work on new-feature-branch, never touch golden-template
```

### **Option 2: Reset to Golden Commit**
```bash
cd /home/user/webapp
git reset --hard 9ae39ec
git push origin main --force
# This nukes everything after 9ae39ec — USE WITH CAUTION
```

### **Option 3: Download TAR Backup**
```bash
# Download from: https://www.genspark.ai/api/files/s/s5b6jEGs
# Extract to /home/user/webapp
cd /home/user
rm -rf webapp  # Delete corrupted version
tar -xzf crs-clean-frontend-rebuild-2026-01-10.tar.gz
cd webapp
npm install
npm run build
pm2 restart cowleyroadstudios
```

---

## 🛡️ SAFE EDITING WORKFLOW

### **ALWAYS WORK ON A BRANCH:**
```bash
cd /home/user/webapp
git checkout -b feature/new-section
# Make your changes
git add .
git commit -m "Add new section"
# Test locally first!
npm run build && pm2 restart cowleyroadstudios
# If it works, merge to main:
git checkout main
git merge feature/new-section
git push origin main
```

### **IF YOU BREAK SOMETHING:**
```bash
# Option A: Undo last commit
git reset --soft HEAD~1  # Keeps changes
git reset --hard HEAD~1  # Deletes changes

# Option B: Go back to golden template
git checkout golden-template
git checkout -b fix-attempt-2
```

---

## 📋 WHAT'S IN THE GOLDEN TEMPLATE

### **Files:**
- `src/index.tsx` — Clean HTML/JSX markup
- `public/static/clean.css` — Organized CSS system
- `src/renderer.tsx` — HTML shell with Playfair Display
- `package.json` — Dependencies locked
- `wrangler.jsonc` — Cloudflare config
- `ecosystem.config.cjs` — PM2 config

### **Key Features:**
- ✅ Hono backend (untouched, working)
- ✅ Clean CSS classes (`.infrastructure-card`, `.service-card`, etc.)
- ✅ All CTAs preserved (Square booking, mailto links)
- ✅ Status line (CAFÉ: OPEN | STUDIO: IN SESSION)
- ✅ Terminal footer (STATUS: OPERATIONAL)
- ✅ Brutalist aesthetic (System Truth)

### **Bundle Stats:**
- Bundle: 56.46 kB (23.7% lighter than before)
- CSS: Organized in `clean.css`
- No bloat, no inline chaos

---

## 🔧 HOW TO EDIT SAFELY

### **CSS Changes:**
- Edit: `public/static/clean.css`
- Test: `npm run build && pm2 restart cowleyroadstudios`
- Commit: `git commit -m "Update CSS: [what you changed]"`

### **Content Changes:**
- Edit: `src/index.tsx`
- Keep classes semantic (e.g., `.infrastructure-card`)
- Don't add inline Tailwind unless absolutely necessary
- Test: `npm run build && pm2 restart cowleyroadstudios`
- Commit: `git commit -m "Update content: [what you changed]"`

### **Backend Changes:**
- Edit: `src/index.tsx` (Hono routes)
- Test: `npm run build && pm2 restart cowleyroadstudios`
- Commit: `git commit -m "Update backend: [what you changed]"`

---

## ⚠️ THINGS TO NEVER DO

❌ **Don't delete `golden-template` branch**  
❌ **Don't force push to `golden-template`**  
❌ **Don't add inline Tailwind bloat back**  
❌ **Don't delete `clean.css`**  
❌ **Don't skip `npm run build` before deploying**  
❌ **Don't work directly on `main` (use branches!)**  

---

## 🎯 QUICK REFERENCE

### **Check Current Status:**
```bash
cd /home/user/webapp
git status
git log --oneline -5
```

### **See All Branches:**
```bash
git branch --list
git branch -r  # Remote branches
```

### **Compare to Golden Template:**
```bash
git diff golden-template
```

### **Rebuild + Restart:**
```bash
cd /home/user/webapp
npm run build
fuser -k 3000/tcp 2>/dev/null || true
pm2 restart cowleyroadstudios
```

### **Test Locally:**
```bash
curl http://localhost:3000 | grep "CAFÉ: OPEN"
```

---

## 📞 EMERGENCY CONTACTS

- **Project Backup URL**: https://www.genspark.ai/api/files/s/s5b6jEGs
- **GitHub Repo**: https://github.com/captainburbseye-web/CRS-Web-1
- **Golden Commit**: `9ae39ec`
- **Production URL**: https://cowleyroadstudios.com
- **Cloudflare Pages**: https://crs-web-1.pages.dev

---

## 💡 REMEMBER

1. **Golden Template = UNFUCKABLE** (Never edit directly)
2. **Always branch** (Never work on `main` directly)
3. **Test locally first** (`npm run build && pm2 restart`)
4. **Commit often** (Small commits = easy rollback)
5. **You can always recover** (3 backups: TAR, Git branches, Commit hash)

---

🔒 **THIS TEMPLATE IS LOCKED. YOU ARE SAFE.** 🔒
