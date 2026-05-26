@echo off
echo 포트 5500 종료 중...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5500') do taskkill /f /pid %%a
echo 완료!
pause
