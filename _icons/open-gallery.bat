@echo off
cd /d "%~dp0\.."
echo Opening icons gallery (auto-refresh on reload)...
node _icons/serve-gallery.js
pause
