# API Reference

## Base URL
```
https://fullstackmaster.net/api
```

---

## Webinar Registration

### POST /api/webinars/register
Register user for webinar and send confirmation email.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1-555-0123",
  "webinarTitle": "System Design for Leaders",
  "whatsappOptIn": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "Registration successful",
  "registrationId": "12345"
}
```

**Error Responses:**
- `400` - Validation error (invalid email, missing fields)
- `422` - Duplicate registration (same email within 24hrs)
- `500` - Server error

---

## Webinar Voting

### GET /api/webinars/votes
Get voting statistics for all webinars.

**Response:**
```json
{
  "webinars": [
    {
      "id": "system-design",
      "title": "System Design for Leaders",
      "upvotes": 45,
      "downvotes": 3,
      "totalVotes": 48
    }
  ]
}
```

### POST /api/webinars/vote
Submit an upvote or downvote for a webinar.

**Request:**
```json
{
  "webinarId": "system-design",
  "voteType": "upvote"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Vote recorded"
}
```

**Rate Limiting:** 10 votes per session per minute  
**Error:** `429 Too Many Requests` if limit exceeded

---

## Admin Dashboard

### GET /api/admin/registrations
Fetch all webinar registrations (requires ADMIN_TOKEN).

**Query Parameters:**
- `token` - ADMIN_TOKEN (required)
- `search` - Filter by name/email (optional)
- `sort` - Sort field: name, email, date (optional)
- `order` - Sort order: asc, desc (optional)

**Example:**
```
GET /api/admin/registrations?token=YOUR_TOKEN&search=john&sort=date&order=desc
```

**Response:**
```json
{
  "registrations": [
    {
      "id": "12345",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1-555-0123",
      "webinarTitle": "System Design for Leaders",
      "whatsappOptIn": true,
      "registeredAt": "2024-11-28T14:30:00Z"
    }
  ],
  "total": 142
}
```

### GET /api/admin/export
Export registrations as CSV or JSON.

**Query Parameters:**
- `token` - ADMIN_TOKEN (required)
- `format` - csv or json (default: csv)

**Response:**
- CSV: `name,email,phone,webinarTitle,whatsappOptIn,registeredAt`
- JSON: Array of registration objects

---

## Data Models

### WebinarRegistration
```typescript
{
  id: string;                    // UUID
  name: string;                  // Full name
  email: string;                 // Email address
  phone?: string;                // Optional phone
  webinarTitle: string;          // Webinar name
  whatsappOptIn: boolean;        // WhatsApp subscription
  registeredAt: Date;            // Registration timestamp
  emailSent: boolean;            // Email delivery status
}
```

### WebinarVote
```typescript
{
  webinarId: string;             // Webinar identifier
  upvotes: number;               // Total upvotes
  downvotes: number;             // Total downvotes
  totalVotes: number;            // upvotes + downvotes
}
```

---

## Testing API

### Using cURL

```bash
# Register for webinar
curl -X POST https://fullstackmaster.net/api/webinars/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+1-555-0123",
    "webinarTitle": "System Design for Leaders",
    "whatsappOptIn": true
  }'

# Vote on webinar
curl -X POST https://fullstackmaster.net/api/webinars/vote \
  -H "Content-Type: application/json" \
  -d '{
    "webinarId": "system-design",
    "voteType": "upvote"
  }'

# Get admin registrations
curl "https://fullstackmaster.net/api/admin/registrations?token=YOUR_ADMIN_TOKEN"

# Export as CSV
curl "https://fullstackmaster.net/api/admin/export?token=YOUR_ADMIN_TOKEN&format=csv" > registrations.csv
```

### Using JavaScript/Fetch

```javascript
// Register
const response = await fetch('https://fullstackmaster.net/api/webinars/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Test User',
    email: 'test@example.com',
    phone: '+1-555-0123',
    webinarTitle: 'System Design for Leaders',
    whatsappOptIn: true
  })
});
const data = await response.json();
console.log(data);

// Vote
const voteResponse = await fetch('https://fullstackmaster.net/api/webinars/vote', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    webinarId: 'system-design',
    voteType: 'upvote'
  })
});
```

---

## Error Handling

### Standard Error Response
```json
{
  "success": false,
  "error": "Error message",
  "details": "Additional context if available"
}
```

### HTTP Status Codes
- `200` - Success
- `400` - Bad Request (invalid input)
- `401` - Unauthorized (missing/invalid token)
- `404` - Not Found
- `422` - Unprocessable Entity (validation failed)
- `429` - Too Many Requests (rate limited)
- `500` - Internal Server Error
