@echo off
echo Starting AI Fitness Application...
echo.

echo Starting Backend Server...
start cmd /k "cd /d "%~dp0" && python server.py"

timeout /t 3 /nobreak >nul

echo Starting Frontend...
start cmd /k "cd /d "%~dp0" && npm start"

echo.
echo Application started!
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
pause

