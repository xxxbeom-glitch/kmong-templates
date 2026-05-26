@echo off
cd /d "%~dp0"
echo.
echo  ================================
echo   크몽 템플릿 로컬 서버 시작
echo   http://localhost:5500
echo  ================================
echo.
npx serve . -l 5500
pause
