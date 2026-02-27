# jlabs-assessment-api

This is the backend API for the jlabs assessment project, built with Node.js, Express, and Supabase (PostgreSQL).

## Prerequisites
- Node.js (v18 or higher recommended)
- npm (comes with Node.js)
- Supabase project (credentials required in .env)

## Setup Instructions

### 1. Clone the repository
```
git clone https://github.com/gonzalestrisha/jlabs-assessment-api/
cd jlabs-assessment-api
```

### 2. Install dependencies
```
npm install
```

### 3. Configure environment variables
Create a `.env` file in the root of this folder with the following content:

```
PORT=8000
SUPABASE_URL='https://thernlxqzsgdzztzlkva.supabase.co'
SUPABASE_KEY='sb_publishable_2EXrbZKR9LPwMHfkZZZPFw_Ne1q4orX'
```

### 4. Seed the database with a test user
This will create a test user in your Supabase `users` table.
```
node seedUser.js
```
Note that there is already 1 row in the `users` table. Check the `seedUser.js` file as reference.
<br>
Feel free to change the one in the code if you want to test if it works.

### 5. Start the server
```
node index.js
```

The API will be available at `http://localhost:8000` by default.

## API Endpoints

### POST /api/login
Authenticate user and return JWT token.
- Request Body: `{ "email": "test@example.com", "password": "password123" }`
- Response: `{ "token": "<JWT token>" }`

### GET /api/profile
Get authenticated user's profile info.
- Headers: `Authorization: Bearer <JWT token>`
- Response: `{ "user": { "id": ..., "email": ... } }`

### GET /
Health check endpoint. Returns: `API is running`
