@echo off
echo Adding test data to the API...

echo Adding a test game...
curl -X POST http://localhost:8080/admin/games -H "Content-Type: application/json" -d "{\"name\":\"Test Game\",\"description\":\"A test game for demonstration\",\"price\":29.99}"

echo.
echo Adding a test member...
curl -X POST http://localhost:8080/members -H "Content-Type: application/json" -d "{\"name\":\"John Doe\",\"phone\":\"123-456-7890\",\"balance\":100.00}"

echo.
echo Test data added successfully!
pause
