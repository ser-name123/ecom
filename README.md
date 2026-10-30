# ecom

Serverless e-commerce project built with **Next.js (App Router) + TypeScript**, using **Supabase** as the database/auth backend and deployed on **Vercel**.

> Setup only — no design/UI work has been done yet.

## Tech stack

- **Next.js 16** (App Router, `src/` dir, Turbopack)
- **TypeScript** + **Tailwind CSS** (configured, not styled)
- **Supabase** via `@supabase/supabase-js` and `@supabase/ssr`
- **Vercel** for serverless hosting

## Project structure

```
src/
  app/
    api/health/route.ts   # Serverless health-check endpoint
    layout.tsx, page.tsx  # Default scaffold pages
  lib/supabase/
    client.ts             # Browser client (Client Components)
    server.ts             # Server client (Server Components / Route Handlers)
    middleware.ts         # Session refresh helper
  middleware.ts           # Runs updateSession on every request
supabase/
  schema.sql              # Starter DB schema (products table + RLS)
.env.example              # Required environment variables
```

## 1. Configure Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. In **Project Settings → API**, copy the Project URL, the `anon` public key and the `service_role` key.
3. Copy `.env.example` to `.env.local` and fill in the values:

   ```
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   SUPABASE_SERVICE_ROLE_KEY=...
   ```

4. Open the **SQL Editor** and run `supabase/schema.sql` to create the base tables.

## 2. Run locally

```bash
npm install
npm run dev
```

App runs at http://localhost:3000 (or the next free port). Verify wiring:

```
GET /api/health  ->  { "status": "ok", "supabase": { "reachable": true } }
```

## 3. Deploy to Vercel

1. Push the repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new) — Vercel auto-detects Next.js.
3. Add the three environment variables (from `.env.local`) in **Project Settings → Environment Variables**.
4. Deploy. API routes run automatically as serverless functions.
