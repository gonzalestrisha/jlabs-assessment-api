# jlabs-assessment-api

Backend API for the JLabs Full Stack Assessment. Built with **Node.js**, **Express**, and **Supabase (PostgreSQL)** — handles authentication, JWT issuance, and serves as the login endpoint for the web client.

---

## Tech Stack

| Layer    | Technology                        |
|----------|-----------------------------------|
| Runtime  | Node.js v20                       |
| Framework| Express                           |
| Database | Supabase (PostgreSQL)             |
| Auth     | bcryptjs + JSON Web Tokens (JWT)  |
| Container|ect Structure

```
jlabs-assessment-api/
├── index.js              # Express app entry point
├── seedUser.js           # Database seeder (test user)
├── supabaseClient.js     # Supabase client configuration and initialization 
├── package.json
├── dock # Environment variables (not committed)
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) v24.14.0 (LTS)
- [npm](https://www.npmjs.com/) (bundled with Node.js)
- A [Supabase](https://supabase.com/) project with a `users` table

---

## Run with Node.js 

### 1. Clone the repositories

```bash
# Clone API repo
git clone https://github.com/gonzalestrisha/jlabs-assessment-api
cd jlabs-assessment-api
```

### 2. Install dependencies

All external libraries are declared in `package.json`. Install with:

```bash
npm install
```

> Dependencies include: `express`, `@supabase/supabase-js`, `bcryptjs`, `jsonwebtoken`, `dotenv`, `cors`

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
PORT=8000
SUPABASE_URL=https://thernlxqzsgdzztzlkva.supabase.co
SUPABASE_KEY=sb_publishable_2EXrbZKR9LPwMHfkZZZPFw_Ne1q4orX
JWT_SECRET=your_jwt_secret_here
```

### 4. Seed the database

This creates a test user in the Supabase `users` table that can be used to log in:

```bash
node seedUser.js
```

> A seed user already exists in the database. Check `seedUser.js` for the credentials. You can modify and re-run the seeder to create a new user.

### 5. Start the server

```bash
node index.js
```

API is now running at **`http://localhost:8000`**

---

## API Endpoints

### `POST /api/login`
Authenticates a user and returns a signed JWT token.

**Request body:**
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

**Success response `200`:**
```json
{
  "token": "<JWT>"
}
```

**Error response `401`:**
```json
{
  "message": "Invalid credentials."
}
```

---

### `GET /api/profile`
Returns the authenticated user's profile. Requires a valid JWT.

**Headers:**
```
Authorization: Bearer <JWT>
```

**Success response `200`:**
```json
{
  "user": {
    "id": 1,
    "email": "test@example.com"
  }
}
```

---

### `GET /`
Health check.

**Response:** `API is running`

---

## Assessment Checklist

| Requirement | Status |
|---|---|
| API Repository (Node.js) | ✅ |
| Login endpoint validates credentials from database | ✅ |
| Returns JWT token on successful login | ✅ |
| User seeder for test login | ✅ |
| Dependencies declared in `package.json` | ✅ |
| Runnable on other local machines | ✅ |