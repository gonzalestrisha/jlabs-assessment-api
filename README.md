# jlabs-assessment-api

This is the backend API for the jlabs assessment project, built with Node.js, Express, and Supabase (PostgreSQL).

## Prerequisites
- Node.js (v18 or higher recommended)
- npm (comes with Node.js)
- Supabase project (credentials required in .env)

## Setup Instructions

### 1. Clone the repository
```
git clone <repo-url>
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
SUPABASE_URL='https://your-supabase-url.supabase.co'
SUPABASE_KEY='your-supabase-service-role-key'
```

- Replace the values with your actual Supabase project credentials.
- Never commit your real keys to a public repo.

### 4. Seed the database with a test user
This will create a test user in your Supabase `users` table.
```
node seedUser.js
```
- Make sure your Supabase project has a `users` table with columns: `id` (auto), `email` (text), `password_hash` (text).

### 5. Start the server
```
npm run dev
```
Or, for production:
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

---

## Troubleshooting
- Ensure your `.env` file is present and correct.
- Ensure your Supabase project and table are set up.
- If you change dependencies, re-run `npm install`.
- For any issues, check the console output for errors.

---

For Docker setup, see instructions in this README once available.
