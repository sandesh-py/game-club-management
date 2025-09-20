Write-Host "Adding test data to the API..." -ForegroundColor Green

Write-Host "Adding a test game..." -ForegroundColor Yellow
$gameData = @{
    name = "Test Game"
    description = "A test game for demonstration"
    price = 29.99
} | ConvertTo-Json

try {
    $gameResponse = Invoke-RestMethod -Uri "http://localhost:8080/admin/games" -Method POST -Body $gameData -ContentType "application/json"
    Write-Host "✅ Game added successfully!" -ForegroundColor Green
    Write-Host "Game ID: $($gameResponse.id)" -ForegroundColor Cyan
} catch {
    Write-Host "❌ Failed to add game: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`nAdding a test member..." -ForegroundColor Yellow
$memberData = @{
    name = "John Doe"
    phone = "123-456-7890"
    balance = 100.00
} | ConvertTo-Json

try {
    $memberResponse = Invoke-RestMethod -Uri "http://localhost:8080/members" -Method POST -Body $memberData -ContentType "application/json"
    Write-Host "✅ Member added successfully!" -ForegroundColor Green
    Write-Host "Member ID: $($memberResponse.id)" -ForegroundColor Cyan
} catch {
    Write-Host "❌ Failed to add member: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`nTest data addition completed!" -ForegroundColor Green
Read-Host "Press Enter to continue"
