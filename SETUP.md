# CampusHire — Setup Guide

## 1. Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) account (free tier works)
- A [Vercel](https://vercel.com) account for deployment
- (Optional) [Resend](https://resend.com) account for emails

---

## 2. Supabase Setup

### a. Create a new Supabase project
1. Go to [supabase.com](https://supabase.com) → New Project
2. Note your **Project URL** and **anon/public key** from Settings → API

### b. Run the SQL schema
1. Go to Supabase Dashboard → SQL Editor
2. Paste and run the contents of `supabase/schema.sql`

### c. (Optional) Set up Email Edge Function
1. Install Supabase CLI: `npm install -g supabase`
2. Login: `supabase login`
3. Link project: `supabase link --project-ref YOUR_PROJECT_REF`
4. Set secrets:
   ```bash
   supabase secrets set RESEND_API_KEY=re_xxxx
   supabase secrets set ADMIN_EMAIL=admin@yourdomain.com
   ```
5. Deploy function:
   ```bash
   supabase functions deploy send-job-notification --project-ref YOUR_PROJECT_REF
   ```
6. Trigger the function from `PostJob.jsx` and `AdminDashboard.jsx` by calling:
   ```js
   await supabase.functions.invoke('send-job-notification', { body: { ... } })
   ```

---

## 3. Local Development

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Fill in your Supabase values in .env
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJxxx...

# Start dev server
npm run dev
```

---

## 4. Admin Login

| Field    | Value       |
|----------|-------------|
| Email    | admin@123   |
| Password | pass@123    |

Access: [http://localhost:5173/admin/login](http://localhost:5173/admin/login)

---

## 5. Deploy to Vercel

```bash
npm run build

# Then push to GitHub and connect repo in Vercel dashboard
# Add env variables in Vercel → Project Settings → Environment Variables
```

---

## 6. Project Structure

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── JobCard.jsx
│   └── ProtectedRoute.jsx
├── context/
│   └── AuthContext.jsx
├── lib/
│   └── supabase.js
├── pages/
│   ├── Home.jsx
│   ├── PostJob.jsx
│   ├── AdminLogin.jsx
│   ├── AdminDashboard.jsx
│   └── CategoryPage.jsx
└── App.jsx

supabase/
├── schema.sql
└── email-function/
    └── index.ts
```

---

## 7. Category Routes

| Path              | Category     |
|-------------------|--------------|
| /engineering      | Engineering  |
| /polytechnic      | Polytechnic  |
| /arts-and-science | Arts & Science |
| /nursing          | Nursing      |
| /research-jobs    | Research Jobs |
| /school-jobs      | School Jobs  |

---

## 8. RLS Summary

| Role          | INSERT | SELECT (approved only) | UPDATE |
|---------------|--------|----------------------|--------|
| anon (public) | ✅     | ✅                   | ❌     |
| authenticated | ✅     | ✅ (all)             | ✅     |

> Admin uses the service role key (in Edge Functions only) or authenticated session to bypass RLS.
