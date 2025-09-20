@echo off
echo Starting Spring Boot Backend...
cd server\GameAPI
call mvnw.cmd spring-boot:run
pause
