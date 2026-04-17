# Circlechain — Web3 Crypto Platform

Full-stack Web3/Crypto platform built with Next.js, NestJS, MUI, RTK Query, Brevo, and Google SSO.

---

## Project Structure

```
/
├── frontend/   → Next.js 14 (App Router) + MUI + RTK Query
└── backend/    → NestJS + Passport + JWT + Brevo
```

---

## Setup

### 1. Configure Environment Variables

**backend/.env**
```
PORT=4000
FRONTEND_URL=http://localhost:3000
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>
GOOGLE_CALLBACK_URL=http://localhost:4000/api/auth/google/callback
JWT_SECRET=your-secret-key
BREVO_API_KEY=<your-brevo-api-key>
BREVO_LIST_ID=2
BREVO_SENDER_EMAIL=noreply@yourdomain.com
BREVO_SENDER_NAME=Circlechain
```

**frontend/.env.local**
```
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>
```

### 2. Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create OAuth 2.0 credentials
3. Add authorized redirect URI: `http://localhost:4000/api/auth/google/callback`
4. Copy Client ID and Secret to both `.env` files

### 3. Brevo Setup
1. Sign up at [brevo.com](https://brevo.com)
2. Go to Settings → API Keys → Generate API Key
3. Create a contact list and note the List ID
4. Add your sender email (verify domain or use Brevo's)

### 4. Run the App

**Backend:**
```bash
cd backend
npm run start:dev
```

**Frontend:**
```bash
cd frontend
npm run dev
```

- Frontend: http://localhost:3000
- Backend: http://localhost:4000/api

---

## Features

- **Home Page** — Hero, Features, Market Trend (12 cryptos), Newsletter, Footer
- **Login / Signup** — Google SSO via NestJS backend → JWT
- **Dashboard** — Portfolio overview, stats, recent transactions (protected)
- **Profile** — User info from backend API (protected)
- **Newsletter** — Email → NestJS → Brevo contact + confirmation email

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | Next.js 14 App Router |
| UI | Material UI v5 |
| State/API | Redux Toolkit + RTK Query |
| Backend | NestJS |
| Auth | Google OAuth 2.0 + JWT |
| Email | Brevo (Sendinblue) |
