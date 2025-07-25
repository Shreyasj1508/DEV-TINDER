// Test script for profile API
const fetch = require('node-fetch');

const baseUrl = 'http://localhost:7777';

// Test profile update
async function testProfileUpdate() {
  try {
    console.log('Testing Profile Update API...\n');
    
    // Replace this with a valid JWT token from your app
    const token = 'YOUR_JWT_TOKEN_HERE';
    
    const testData = {
      firstName: 'John',
      lastName: 'Doe',
      age: 25,
      about: 'I am a software developer passionate about creating amazing applications.',
      skills: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
      location: 'New York, USA',
      occupation: 'Software Developer',
      company: 'Tech Corp',
      education: 'Computer Science, XYZ University',
      interests: ['coding', 'music', 'travel'],
      github: 'https://github.com/johndoe',
      linkedin: 'https://linkedin.com/in/johndoe',
      portfolio: 'https://johndoe.dev'
    };
    
    console.log('Sending data:', JSON.stringify(testData, null, 2));
    
    const response = await fetch(`${baseUrl}/profile/edit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `token=${token}`
      },
      body: JSON.stringify(testData)
    });
    
    const result = await response.json();
    
    console.log('\nResponse Status:', response.status);
    console.log('Response Data:', JSON.stringify(result, null, 2));
    
    if (result.success) {
      console.log('\n✅ Profile update test PASSED!');
    } else {
      console.log('\n❌ Profile update test FAILED!');
    }
    
  } catch (error) {
    console.error('Test Error:', error.message);
  }
}

// Test profile view
async function testProfileView() {
  try {
    console.log('\n\nTesting Profile View API...\n');
    
    // Replace this with a valid JWT token from your app
    const token = 'YOUR_JWT_TOKEN_HERE';
    
    const response = await fetch(`${baseUrl}/profile/view`, {
      method: 'GET',
      headers: {
        'Cookie': `token=${token}`
      }
    });
    
    const result = await response.json();
    
    console.log('Response Status:', response.status);
    console.log('Response Data:', JSON.stringify(result, null, 2));
    
    if (result.success) {
      console.log('\n✅ Profile view test PASSED!');
    } else {
      console.log('\n❌ Profile view test FAILED!');
    }
    
  } catch (error) {
    console.error('Test Error:', error.message);
  }
}

// Instructions
console.log('🚀 Profile API Test Script');
console.log('============================');
console.log('1. Make sure your server is running on port 7777');
console.log('2. Replace YOUR_JWT_TOKEN_HERE with a valid token');
console.log('3. Run: node test-profile-api.js');
console.log('============================\n');

// Uncomment these lines to run the tests
// testProfileUpdate();
// testProfileView();
