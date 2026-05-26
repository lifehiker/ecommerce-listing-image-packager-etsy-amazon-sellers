# ListingPackr

ListingPackr is a Next.js SaaS for Etsy digital pattern sellers and Amazon/private-label sellers who need repeatable listing image preparation. It supports drag-and-drop image packs, marketplace profiles, slot ordering, resizing, compression, watermarking, SKU/ASIN filenames, ZIP export, saved presets, free SEO tools, billing fallbacks, and credential-based auth.

## Tech Stack

- Next.js App Router + TypeScript
- Tailwind CSS with local shadcn-style primitives
- Prisma + SQLite
- NextAuth credentials auth
- sharp + archiver for image processing and ZIP export
- Stripe and Resend integrations with safe missing-env fallbacks

## Local Development

```bash
npm install
npx prisma db push
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run lint
npm run build
```

## Docker

```bash
docker build .
```

The container defaults to SQLite at `/data/app.db` and runs `prisma db push` at startup. No external environment variables are required for the app to boot.

## Optional Environment Variables

See `.env.example` for optional Stripe and Resend credentials. Without them, upgrade and email actions show graceful fallback messages and the app remains functional.

## Primary Routes

- `/` homepage
- `/app` dashboard
- `/app/packs/new` pack builder
- `/app/presets` presets
- `/app/billing` billing
- `/tools/*` free SEO tools
- `/guides/*` guides
