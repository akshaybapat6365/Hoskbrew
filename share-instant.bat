@echo off
echo 🚀 HOSKBREW CYBERPUNK - INSTANT SHARING
echo =====================================
echo.
echo ✅ Starting local server at http://localhost:8080
echo.
echo 🌐 SHARE OPTIONS:
echo.
echo 1. LOCAL NETWORK SHARING:
echo    - Connect devices to same WiFi
echo    - Find your IP: ipconfig
echo    - Share: http://YOUR-IP:8080/ultimate-cyberpunk.html
echo.
echo 2. QUICK ONLINE SHARING:
echo    - Upload to: netlify.com (drag & drop folder)
echo    - Or: pages.github.com (free hosting)
echo    - Or: vercel.com (instant deploy)
echo.
echo Starting server now...
echo Press Ctrl+C to stop
echo.

cd /d "%~dp0"
python -m http.server 8080