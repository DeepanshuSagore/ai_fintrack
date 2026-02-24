# AI FinTrack

An AI-powered personal finance tracker built with Next.js. Manage accounts, track transactions, scan receipts with AI, monitor budgets, and receive automated email insights — all in one place.

---

## Tech Stack

- **Framework** — Next.js 16 (App Router)
- **Auth** — Clerk
- **Database** — PostgreSQL via Prisma ORM
- **AI** — Google Gemini (receipt scanning & budget insights)
- **Background Jobs** — Inngest
- **Security** — Arcjet
- **Email** — Nodemailer (Gmail)
- **UI** — Tailwind CSS, shadcn/ui, Recharts

---

## Prerequisites

- Node.js 18+
- A PostgreSQL database (e.g. [Neon](https://neon.tech), [Supabase](https://supabase.com), or local)
- Accounts for: [Clerk](https://clerk.com), [Google AI Studio](https://aistudio.google.com), [Arcjet](https://arcjet.com)
- A Gmail account with an [App Password](https://myaccount.google.com/apppasswords) enabled

---

## Environment Variables

Create a `.env` file in the root of the project and populate it with the following values.

```env
# ─── Database ───────────────────────────────────────────────
# Primary connection string (used by Prisma at runtime)
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require"

# Direct connection URL (used by Prisma Migrate / Studio)
DIRECT_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require"


# ─── Clerk Authentication ────────────────────────────────────
# Get these from https://dashboard.clerk.com → your app → API Keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_xxxxxxxxxxxxxxxxxxxx"
CLERK_SECRET_KEY="sk_test_xxxxxxxxxxxxxxxxxxxx"

# Clerk redirect URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard


# ─── Google Gemini AI ────────────────────────────────────────
# Get your key from https://aistudio.google.com/app/apikey
GEMINI_API_KEY="AIzaxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"


# ─── Arcjet (Security / Rate Limiting) ──────────────────────
# Get your key from https://app.arcjet.com
ARCJET_KEY="ajkey_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"


# ─── Email (Nodemailer via Gmail) ────────────────────────────
# Use your Gmail address and a Gmail App Password (NOT your normal password)
# Enable App Passwords at https://myaccount.google.com/apppasswords
EMAIL_USER="you@gmail.com"
EMAIL_PASS="xxxx xxxx xxxx xxxx"
```

> **Note:** Never commit your `.env` file to version control. It is already listed in `.gitignore` by default.

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/DeepanshuSagore/ai_fintrack.git
cd ai_fintrack
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory and fill in the values as described in the [Environment Variables](#environment-variables) section above.

### 4. Set up the database

Run Prisma migrations to create all required tables:

```bash
npx prisma migrate dev
```

Optionally, open Prisma Studio to inspect your database:

```bash
npx prisma studio
```

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. (Optional) Start the Inngest dev server

Inngest handles background jobs such as scheduled email reports. In a separate terminal:

```bash
npx inngest-cli@latest dev
```

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Build the app for production |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |
| `npm run email` | Preview email templates locally |

---

## Deployment

Deploy to [Vercel](https://vercel.com) — the recommended platform for Next.js apps. Make sure to add all environment variables from your `.env` file to your Vercel project settings before deploying.
