@echo off
echo Starting both Backend and Frontend...
echo.
echo Starting Backend in new window...
start "Backend Server" cmd /k "cd server\GameAPI && mvnw.cmd spring-boot:run"
echo.
echo Waiting 5 seconds for backend to start...
timeout /t 5 /nobreak > nul
echo.
echo Starting Frontend in new window...
start "Frontend Client" cmd /k "cd React_client\client && npm run dev"
echo.
echo Both servers are starting...
echo Backend will be available at: http://localhost:8080
echo Frontend will be available at: http://localhost:5173
echo.
pause
