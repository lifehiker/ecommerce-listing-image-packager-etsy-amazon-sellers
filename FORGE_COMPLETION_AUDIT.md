# FORGE Completion Audit

## Foundation and Deployment

- Next.js App Router, TypeScript, Tailwind, and standalone output: `package.json`, `next.config.ts`, `src/app/layout.tsx`, `src/app/globals.css`.
- System fonts only; no `next/font/google` usage: `src/app/globals.css`.
- Docker/Coolify deployment: `Dockerfile` uses `node:20-slim`, Prisma generate in builder, SQLite `/data/app.db`, standalone server, and startup `prisma db push`.
- Environment template and zero-config behavior: `.env.example`, `.env`, `HUMAN_INPUT_NEEDED.md`.

## Data Model and Auth

- Prisma SQLite schema: `prisma/schema.prisma`.
- Prisma client helper: `src/lib/prisma.ts`.
- Credentials auth with bcrypt and JWT sessions: `src/auth.ts`, `src/lib/auth.ts`, `src/app/api/auth/[...nextauth]/route.ts`, `src/app/api/auth/register/route.ts`.
- Public auth pages: `src/app/(marketing)/login/page.tsx`, `src/app/(marketing)/signup/page.tsx`, `src/components/auth/auth-form.tsx`.
- Guarded app layout: `src/app/(app)/app/layout.tsx`.

## Plans, Billing, Email, Analytics, Storage

- Plan limits and pricing tiers: `src/lib/plans.ts`, `src/components/pricing-section.tsx`.
- Stripe checkout, portal, and webhook with lazy client and missing-env fallback: `src/lib/stripe.ts`, `src/app/api/stripe/checkout/route.ts`, `src/app/api/stripe/portal/route.ts`, `src/app/api/webhooks/stripe/route.ts`.
- Resend email with lazy client and skip fallback: `src/lib/email.ts`, `src/emails/welcome-email.tsx`, `src/emails/export-complete-email.tsx`.
- Analytics no-op/event wrapper: `src/lib/analytics.ts`.
- No permanent original image storage: export route processes multipart files and persists only pack metadata/manifest in `ImagePack` and usage rows.

## Marketplace Pack Workflow

- Marketplace profiles and slots: `src/lib/marketplace-profiles.ts`.
- Filename token rendering and sanitization: `src/lib/filename-patterns.ts`.
- Client upload utilities and validation: `src/lib/client-image-utils.ts`, `src/components/pack/image-dropzone.tsx`.
- Pack wizard UI for profile, SKU/ASIN, upload, slots, custom labels, resize modes, compression quality, output format, watermark controls, filename preview, preset save, and export: `src/components/pack/pack-wizard.tsx`, `src/app/(app)/app/packs/new/page.tsx`.
- Server-side processing: `src/lib/image-processing.ts` supports fit, square crop, keep aspect, JPG/WebP compression, diagonal repeated, center, and bottom-right watermark SVG overlays.
- ZIP and manifest export: `src/lib/zip.ts`, `src/app/api/packs/export/route.ts`.
- Usage enforcement: `src/lib/usage.ts`, `src/app/api/packs/export/route.ts`.
- Pack metadata detail page: `src/app/(app)/app/packs/[id]/page.tsx`.

## App Pages

- Dashboard with plan, usage, recent packs, quick actions: `src/app/(app)/app/page.tsx`, `src/components/dashboard/*`.
- Presets list/form and API with plan limit enforcement: `src/app/(app)/app/presets/page.tsx`, `src/components/presets/*`, `src/app/api/presets/route.ts`, `src/app/api/presets/[id]/route.ts`.
- Billing and upgrade UI: `src/app/(app)/app/billing/page.tsx`, `src/components/billing/*`.

## Marketing, SEO, and Free Tools

- Homepage: `src/app/page.tsx`.
- Marketing shell/navigation: `src/app/(marketing)/layout.tsx`, `src/components/site-header.tsx`.
- Pricing: `src/app/(marketing)/pricing/page.tsx`.
- Tools hub: `src/app/(marketing)/tools/page.tsx`.
- Etsy digital pattern image size resizer: `src/app/(marketing)/tools/etsy-digital-pattern-image-size/page.tsx`, `src/components/tools/free-resizer.tsx`.
- Watermark cross stitch pattern tool: `src/app/(marketing)/tools/watermark-cross-stitch-pattern/page.tsx`, `src/components/tools/free-watermarker.tsx`.
- Cross stitch pattern mockup preview: `src/app/(marketing)/tools/cross-stitch-pattern-mockup-generator/page.tsx`.
- Etsy cross stitch listing photos ordering demo: `src/app/(marketing)/tools/etsy-cross-stitch-listing-photos/page.tsx`, `src/components/tools/organizer-demo.tsx`.
- Bulk product photo renamer and SKU renamer: `src/app/(marketing)/tools/bulk-product-photo-renamer/page.tsx`, `src/app/(marketing)/tools/sku-image-renamer/page.tsx`, `src/components/tools/free-renamer.tsx`.
- Amazon listing image organizer: `src/app/(marketing)/tools/amazon-listing-image-organizer/page.tsx`.
- Listing image packager commercial page: `src/app/(marketing)/tools/listing-image-packager/page.tsx`.
- Guides and blog: `src/app/(marketing)/guides/page.tsx`, `src/app/(marketing)/guides/sell-cross-stitch-patterns-on-etsy/page.tsx`, `src/app/(marketing)/guides/amazon-image-requirements/page.tsx`, `src/app/(marketing)/blog/page.tsx`, `src/app/(marketing)/blog/how-to-create-a-marketplace-ready-listing-image-pack/page.tsx`, `src/components/guide-page.tsx`.

## Verification Results

- `npx prisma db push`: passed and created local SQLite schema.
- `npm run lint`: passed.
- `npm run build`: passed with all routes generated successfully.
- Dev server: started at `http://localhost:3000` without crashing.
- Route smoke checks:
  - Public pages `/`, `/pricing`, `/tools`, `/tools/watermark-cross-stitch-pattern`, `/tools/amazon-listing-image-organizer`, `/guides`, `/guides/amazon-image-requirements`, `/blog`, `/login`, `/signup` returned `200`.
  - Protected app pages `/app` and `/app/packs/new` returned `307` redirect when unauthenticated, as intended.
- Auth registration API: POST `/api/auth/register` returned `200`.
- Docker: `docker build .` could not run because this environment cannot access the Docker daemon. The Dockerfile is present and the standalone Next build passes.

## External Credential Deferrals

- Stripe checkout/portal/webhooks require Stripe keys and price IDs. The routes are implemented and return graceful fallback JSON when credentials are missing, so the app remains usable on the Free plan.
- Resend requires `RESEND_API_KEY` and a verified sender. Email helpers skip sending when unset, so signup and exports do not crash.
- Google Search Console, GA/Plausible, and PostHog are launch operations. The app includes a no-op analytics wrapper and does not require those accounts at runtime.

