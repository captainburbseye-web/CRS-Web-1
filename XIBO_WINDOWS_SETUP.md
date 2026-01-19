# Xibo CMS Setup for CRS — Windows Mini PC

**Target Environment:** Windows 10/11 Mini PC  
**Purpose:** Local signage control for 118 Cowley Road (Workshop Café window)  
**Architecture:** Docker-based, WSL2, no cloud dependency  

---

## TL;DR Architecture

| Component | Runs where | Purpose |
|-----------|-----------|---------|
| Docker Desktop (WSL2) | Windows Mini PC | Container runtime |
| Xibo CMS | Docker containers | Central signage server |
| MariaDB | Docker container | CMS database |
| Xibo Player | Same Mini PC (Windows app) | Screen playback |
| Browser access | Any device | CMS control panel |

---

## 0. Prerequisites (do these once)

### ✅ Windows Requirements

- Windows 10/11 Pro recommended
- Virtualisation enabled in BIOS
- At least 8 GB RAM (4 GB works but is tight)
- SSD strongly recommended

### ✅ Install Docker Desktop (WSL2 mode)

1. Download [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop)
2. During install:
   - ✅ Enable WSL2
   - ✅ Use Linux containers
3. Reboot when prompted
4. Verify:
   ```powershell
   docker --version
   docker compose version
   ```

---

## 1. Folder Structure

Create this anywhere sensible (e.g. `C:\xibo`):

```
C:\xibo
 ├─ docker-compose.yml
 ├─ env
 │   ├─ mysql.env
 │   └─ xibo.env
 └─ data
     ├─ mysql
     └─ cms
```

---

## 2. Environment Files

### `env/mysql.env`
```env
MYSQL_ROOT_PASSWORD=xibo_root_pass
MYSQL_DATABASE=xibo
MYSQL_USER=xibo
MYSQL_PASSWORD=xibo_pass
```

### `env/xibo.env`
```env
MYSQL_DATABASE=xibo
MYSQL_USER=xibo
MYSQL_PASSWORD=xibo_pass
MYSQL_HOST=mysql
XIBO_TIMEZONE=Europe/London
```

---

## 3. docker-compose.yml

```yaml
version: "3.8"

services:
  mysql:
    image: mariadb:10.6
    container_name: xibo-mysql
    restart: unless-stopped
    env_file:
      - ./env/mysql.env
    volumes:
      - ./data/mysql:/var/lib/mysql
    command: --transaction-isolation=READ-COMMITTED

  cms:
    image: xibosignage/xibo-cms:latest
    container_name: xibo-cms
    restart: unless-stopped
    ports:
      - "8080:80"
    env_file:
      - ./env/xibo.env
    volumes:
      - ./data/cms:/var/www/cms/custom
    depends_on:
      - mysql
```

---

## 4. Launch Xibo CMS

From PowerShell in `C:\xibo`:

```powershell
docker compose up -d
```

Check:
```powershell
docker ps
```

You should see:
- `xibo-mysql`
- `xibo-cms`

---

## 5. First-time CMS Setup (browser)

1. Open: `http://localhost:8080`
2. Installer steps:
   - Database host: `mysql`
   - Database name: `xibo`
   - Username: `xibo`
   - Password: `xibo_pass`
   - Admin email/password → **save this**
   - Timezone: `Europe/London`
3. Finish install → log in

---

## 6. Install Xibo Player (Windows)

On the same Mini PC:

1. Download [Xibo Player for Windows](https://xibosignage.com/xibo-for-windows)
2. Install normally
3. Open Player → it will show a **CMS Key**
4. In CMS:
   - **Displays** → **Add Display**
   - Paste key
   - Name it (e.g. `CRS-Shopfront-01`)
   - Authorise

---

## 7. CRS-Recommended CMS Defaults

### 📺 Display Settings

| Setting | Value |
|---------|-------|
| Screenshot interval | 5–10 mins |
| Collect analytics | ON |
| Stats reporting | ON |
| Web cache | Enabled |
| Embedded media | Enabled |

### 🌐 Networking

- **CMS URL:** `http://<MINI-PC-IP>:8080`
- Set Mini PC to **static IP** on your network

---

## 8. Media & Layout Strategy (CRS-specific)

**Use layouts, not playlists, for your use case.**

### Recommended zones:

- **Zone A:** Web Page widget (`/signage`)
- **Zone B:** Static fallback image
- **Zone C (optional):** Clock / status strip

### Web widget defaults:

| Setting | Value |
|---------|-------|
| Refresh | 30–60s |
| Scrollbars | Disabled |
| Transparency | Enabled |
| Cache | Enabled |

---

## 9. Fallback Safety (critical)

Create a **Fallback Layout:**

- Static image:  
  *"Cowley Road Studios — System Live — Updates shortly"*
- Assign it as **Default Layout**

If `/signage` ever fails → screen stays calm and branded.

---

## 10. Backup & Maintenance

### Backup
```powershell
docker compose stop
copy C:\xibo\data C:\xibo_backup /E
docker compose start
```

### Update Xibo
```powershell
docker compose pull
docker compose up -d
```

---

## 11. What You Now Have

✅ Central signage CMS  
✅ Local control (no cloud dependency)  
✅ Multiple displays supported  
✅ Web-driven generative content  
✅ CRS-grade resilience  

**This is infrastructure, not a hack.**

---

## Next Steps

1. Deploy to Mini PC at 118 Cowley Road
2. Configure `/signage` route as Web Page widget
3. Set fallback layout
4. Test display on 55" screen
5. Schedule content modes (STATUS → EVENTS → PULSE)

---

**Documentation Status:** Production-ready  
**Authority:** Infrastructure-grade  
**Deployment:** Ready for Workshop Café window signage
