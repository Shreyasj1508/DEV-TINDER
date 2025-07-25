# Profile API Test Commands

## Get your JWT token first
# Login to get a token, then use it in the commands below

## 1. View Profile
curl -X GET http://localhost:7777/profile/view \
  -H "Content-Type: application/json" \
  -H "Cookie: token=YOUR_JWT_TOKEN_HERE"

## 2. Update Profile - Basic Info
curl -X POST http://localhost:7777/profile/edit \
  -H "Content-Type: application/json" \
  -H "Cookie: token=YOUR_JWT_TOKEN_HERE" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "age": 28,
    "about": "Software Developer passionate about building amazing applications"
  }'

## 3. Update Profile - Complete Info
curl -X POST http://localhost:7777/profile/edit \
  -H "Content-Type: application/json" \
  -H "Cookie: token=YOUR_JWT_TOKEN_HERE" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "age": 28,
    "gender": "male",
    "about": "Full-stack developer with 5+ years of experience",
    "skills": ["JavaScript", "React", "Node.js", "MongoDB", "Express"],
    "location": "San Francisco, CA",
    "occupation": "Senior Software Engineer",
    "company": "Tech Innovations Inc",
    "education": "Master in Computer Science, Stanford University",
    "interests": ["coding", "hiking", "photography", "travel"],
    "github": "https://github.com/johndoe",
    "linkedin": "https://linkedin.com/in/johndoe",
    "portfolio": "https://johndoe.dev"
  }'

## 4. Update Profile - Skills Only
curl -X POST http://localhost:7777/profile/edit \
  -H "Content-Type: application/json" \
  -H "Cookie: token=YOUR_JWT_TOKEN_HERE" \
  -d '{
    "skills": ["Python", "Django", "FastAPI", "PostgreSQL"]
  }'

## 5. Update Profile - Social Links Only
curl -X POST http://localhost:7777/profile/edit \
  -H "Content-Type: application/json" \
  -H "Cookie: token=YOUR_JWT_TOKEN_HERE" \
  -d '{
    "github": "https://github.com/newusername",
    "linkedin": "https://linkedin.com/in/newusername",
    "portfolio": "https://mynewportfolio.com"
  }'

## 6. Test Invalid Data (Should return validation error)
curl -X POST http://localhost:7777/profile/edit \
  -H "Content-Type: application/json" \
  -H "Cookie: token=YOUR_JWT_TOKEN_HERE" \
  -d '{
    "age": 15,
    "github": "invalid-url"
  }'

# How to get your JWT Token:
# 1. Login through your app or use the login API
# 2. Check browser cookies or network tab for the token
# 3. Replace YOUR_JWT_TOKEN_HERE with the actual token value
