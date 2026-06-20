# compareCode

Drop your GitHub and LeetCode usernames, get a shareable "Shipper vs Solver" card —
a single Next.js app with server-generated Open Graph images, so the card itself
shows up when the link is shared on Twitter/Discord/WhatsApp.

## Stack

- Next.js (App Router, TypeScript, Tailwind v4)
- GitHub GraphQL API for contributions/stars/repos/streak
- LeetCode's GraphQL API for solved counts/ranking
- `next/og` for per-user dynamic OG card images
- Framer Motion + `html-to-image` for the live card animation and PNG export
- Prisma (direct Postgres/Supabase connection) for logging searched username pairs

## Getting started

```bash
cp .env.local.example .env.local
# fill in GITHUB_TOKEN — any personal access token works, no special scopes needed
# fill in DATABASE_URL — a direct Postgres connection string (e.g. from Supabase)
npm install
npx prisma db push   # creates the `searches` table in its own `comparecode` schema
npm run dev
```

Open http://localhost:3000, enter usernames, and you'll land on `/u/<github>/<leetcode>`.

## Project layout

- `lib/github.ts`, `lib/leetcode.ts` — single GraphQL call each, cached in-memory (`lib/cache.ts`)
- `lib/score.ts` — computes the Shipper vs Solver percentage split
- `components/ShareCard.tsx` — the glassmorphism card rendered on the live page
- `app/u/[github]/[leetcode]/opengraph-image.tsx` — same card design, rendered as a static PNG for social previews
- `prisma/schema.prisma`, `lib/prisma.ts`, `lib/logSearch.ts` — the `Search` model lives in its own `comparecode` Postgres schema (not `public`), kept isolated since the database may be shared with other projects

## Important: this database is shared with other projects

`DATABASE_URL` points at a Supabase instance that also hosts unrelated tables
(e.g. `blogs`, `fundizr-blogs`) from other projects. `prisma/schema.prisma`
intentionally scopes `datasource.schemas` to `["comparecode"]` only — this is
what stops `prisma db push` / `prisma migrate` from diffing (and potentially
dropping) tables it doesn't know about in `public`. **Do not** widen that
schemas list to include `public`, and never run `prisma migrate reset` or
pass `--accept-data-loss` against this database.
