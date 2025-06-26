# BitLads Software - Serverless Functions

This folder contains serverless functions for the BitLads Software website.

## Functions

### `send-email.js`
Handles contact form submissions using SparkPost email service.

**Environment Variables Required:**
- `REACT_APP_SPARKPOST` - Your SparkPost API key

**Endpoint:** `POST /api/send-email`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com", 
  "subject": "Automation Inquiry",
  "message": "I'm interested in your automation services...",
  "company": "Acme Corp", // optional
  "phone": "+1-555-123-4567" // optional
}
```

**Response:**
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

## Deployment

These functions are designed to work with:
- Netlify Functions
- Vercel Functions  
- AWS Lambda
- Any serverless platform that supports Node.js

## Setup

1. Install dependencies:
```bash
cd functions
npm install
```

2. Set environment variables in your deployment platform:
```
REACT_APP_SPARKPOST=your_sparkpost_api_key_here
```

3. Deploy according to your platform's documentation.

## Features

- ✅ CORS support for cross-origin requests
- ✅ Input validation for required fields
- ✅ Professional HTML email templates
- ✅ Error handling and logging
- ✅ Support for optional fields (company, phone)
- ✅ Responsive email design
- ✅ Timestamp tracking