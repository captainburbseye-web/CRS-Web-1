@echo off
REM ============================================
REM CRS SIGNAGE TERMINAL - AUTO-LAUNCH SCRIPT
REM 55" Display @ 118 Cowley Road
REM ============================================
REM
REM PURPOSE:
REM This script forces the Mini PC to bypass the Windows desktop
REM and launch straight into the 4K Signage Route every time
REM the power cycles. This ensures the terminal operates as a
REM true autonomous broadcast appliance.
REM
REM INSTALLATION:
REM 1. Save this file to Desktop: C:\Users\[USERNAME]\Desktop\launch-signage.bat
REM 2. Press Win + R, type: shell:startup
REM 3. Create shortcut to this .bat file in Startup folder
REM 4. Restart Mini PC to verify auto-launch
REM
REM ============================================

REM STEP 1: KILL EXISTING CHROME INSTANCES
REM Ensures clean slate, prevents multiple windows
echo [CRS] Terminating existing Chrome instances...
taskkill /F /IM chrome.exe /T > nul 2>&1

REM Wait 2 seconds for processes to fully terminate
timeout /t 2 /nobreak > nul

REM STEP 2: INITIALIZE 4K KIOSK MODE
echo [CRS] Launching Signage Terminal in 4K Kiosk Mode...

REM Chrome Kiosk Flags:
REM --kiosk: Fullscreen mode, no UI elements
REM --disable-infobars: Removes "Chrome is being controlled" warning
REM --no-first-run: Skips first-run wizard
REM --overscroll-history-navigation=0: Prevents accidental swipe-back
REM --disk-cache-dir=null: Disables disk cache (prevents stale content)
REM --disable-features=Translate: Disables translation popup
REM --disable-popup-blocking: Allows any popups (if needed)
REM --start-maximized: Ensures fullscreen on launch

start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" ^
  --kiosk ^
  --disable-infobars ^
  --no-first-run ^
  --overscroll-history-navigation=0 ^
  --disk-cache-dir=null ^
  --disable-features=Translate ^
  --disable-popup-blocking ^
  --start-maximized ^
  "https://cowleyroadstudios.com/signage"

REM STEP 3: EXIT SCRIPT
REM Script terminates, Chrome continues running in kiosk mode
echo [CRS] Signage Terminal initialized successfully.
exit
