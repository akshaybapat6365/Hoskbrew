@echo off
echo 🚀 HOSKBREW CYBERPUNK - LOCAL SHARING SETUP
echo ==========================================
echo.
echo Step 1: Starting local Python server...
echo Your website will run at: http://localhost:8080
echo.
echo Step 2: To share with others:
echo 1. Download ngrok from https://ngrok.com
echo 2. Run: ngrok http 8080
echo 3. Copy the https URL ngrok gives you
echo 4. Share that URL with anyone!
echo.
echo Starting server now...
echo Press Ctrl+C to stop
echo.

cd /d "%~dp0"
python -m http.server 8080