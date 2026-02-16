@echo off
echo ===============================================
echo CRS AIDER CONSOLE
echo ===============================================
echo REMINDER:
echo 1) Use /add to select files BEFORE asking for changes.
echo 2) Keep changes small and review the diff.
echo 3) Git is your safety net.
echo ===============================================
echo.
cd /d "%USERPROFILE%\Desktop\CRS-Web-1-main"
echo Starting Aider in CRS repo...
aider --model ollama_chat/qwen2.5-coder:7b
pause
