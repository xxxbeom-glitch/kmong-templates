@echo off
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":8080"') do taskkill /F /PID %%a 2>nul
taskkill /F /IM node.exe /FI "WINDOWTITLE eq live-server*" 2>nul
echo live-server stopped.
