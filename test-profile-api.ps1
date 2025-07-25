# PowerShell script to test Profile API
# Run this script to test your profile endpoints

Write-Host "🚀 Testing DEV-TINDER Profile API" -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Green

# Server URL
$baseUrl = "http://localhost:7777"

# You can get this token from your browser cookies or login response
$token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODgzYmEwNjc4ZWRhNmRmOTA0YTFkM2UiLCJpYXQiOjE3NTM0Njg5NjMsImV4cCI6MTc1MzU1NTM2M30.FcvmmaxNgMqvwz5ID8qm5jdZpJi4I14EbYPhm1JTCv0"

Write-Host "Testing with token: $($token.Substring(0, 50))..." -ForegroundColor Yellow

# Test 1: View Profile
Write-Host "`n📋 Test 1: Getting Profile..." -ForegroundColor Cyan
try {
    $headers = @{
        "Content-Type" = "application/json"
        "Cookie" = "token=$token"
    }
    
    $response = Invoke-RestMethod -Uri "$baseUrl/profile/view" -Method GET -Headers $headers
    Write-Host "✅ Profile fetch successful!" -ForegroundColor Green
    Write-Host "User: $($response.data.firstName) $($response.data.lastName)" -ForegroundColor Yellow
    Write-Host "Email: $($response.data.email)" -ForegroundColor Yellow
    Write-Host "Age: $($response.data.age)" -ForegroundColor Yellow
    Write-Host "Location: $($response.data.location)" -ForegroundColor Yellow
    Write-Host "Skills: $($response.data.skills -join ', ')" -ForegroundColor Yellow
} catch {
    Write-Host "❌ Profile fetch failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 2: Update Profile
Write-Host "`n📝 Test 2: Updating Profile..." -ForegroundColor Cyan
try {
    $updateData = @{
        firstName = "John"
        lastName = "Updated"
        age = 29
        about = "Updated profile using PowerShell API test!"
        skills = @("PowerShell", "API Testing", "JavaScript")
        location = "Mumbai, India"
        occupation = "API Tester"
        company = "Testing Corp"
        interests = @("testing", "automation", "coding")
    } | ConvertTo-Json

    $response = Invoke-RestMethod -Uri "$baseUrl/profile/edit" -Method POST -Headers $headers -Body $updateData
    Write-Host "✅ Profile update successful!" -ForegroundColor Green
    Write-Host "Updated User: $($response.data.firstName) $($response.data.lastName)" -ForegroundColor Yellow
    Write-Host "New Age: $($response.data.age)" -ForegroundColor Yellow
    Write-Host "New Skills: $($response.data.skills -join ', ')" -ForegroundColor Yellow
} catch {
    Write-Host "❌ Profile update failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 3: Test validation (should fail)
Write-Host "`n⚠️  Test 3: Testing Validation (should fail)..." -ForegroundColor Cyan
try {
    $invalidData = @{
        age = 15  # Invalid age
        github = "not-a-url"  # Invalid URL
    } | ConvertTo-Json

    $response = Invoke-RestMethod -Uri "$baseUrl/profile/edit" -Method POST -Headers $headers -Body $invalidData
    Write-Host "❌ Validation test failed - should have been rejected!" -ForegroundColor Red
} catch {
    Write-Host "✅ Validation working correctly - rejected invalid data!" -ForegroundColor Green
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Yellow
}

Write-Host "`n🎉 API Testing Complete!" -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Green
