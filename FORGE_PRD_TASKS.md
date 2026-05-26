# FORGE PRD Tasks

Status legend: `[x]` complete, `[!]` blocked by environment or external credentials.

## Foundation

- [x] Read `PRD.md` end-to-end.
- [x] Read `BUILD_INSTRUCTIONS.md` end-to-end.
- [x] Scaffold Next.js App Router project with TypeScript and Tailwind.
- [x] Install runtime dependencies for Prisma, auth, billing, email, image processing, ZIP export, validation, and UI.
- [x] Configure `next.config.ts` with standalone output.
- [x] Replace starter UI with ListingPackr application shell and system fonts only.
- [x] Add reusable UI primitives and shared layout components.
- [x] Add `.env.example`, `.gitignore`, and updated `README.md`.

## Data Model

- [x] Configure Prisma with SQLite and Debian binary target for Docker.
- [x] Define `User`, `Account`, `Session`, `VerificationToken`, `Subscription`, `Preset`, `ImagePack`, and `UsageEvent`.
- [x] Generate Prisma client.
- [x] Provide safe database helper that works with local SQLite.
- [x] Add usage limit helpers for monthly image counts.

## Auth

- [x] Implement NextAuth v5 credentials auth with bcrypt password hashing and JWT sessions.
- [x] Add `/login` and `/signup` public routes.
- [x] Add guarded helpers for authenticated app routes.
- [x] Ensure all marketing, tools, guides, blog, login, and signup routes remain public.

## Billing, Email, Analytics, Storage

- [x] Define plan limits for Free, Solo, Pro, and annual Hobby offer display.
- [x] Implement Stripe checkout route with missing-env fallback.
- [x] Implement Stripe billing portal route with missing-env fallback.
- [x] Implement Stripe webhook route for subscription lifecycle updates.
- [x] Implement Resend email helper with lazy initialization and missing-env skip.
- [x] Implement welcome email and export-complete email templates.
- [x] Implement analytics wrapper with no-op fallback.
- [x] Avoid permanent original-image storage; process uploads during export and persist metadata only.
- [x] Document external credential requirements in `HUMAN_INPUT_NEEDED.md`.

## Marketplace Profiles and Image Workflow

- [x] Define Etsy digital, Etsy physical, and Amazon marketplace profiles.
- [x] Implement filename pattern utilities with `{sku}`, `{asin}`, `{slotNumber}`, `{slotName}`, `{original}`, and `{profile}` tokens.
- [x] Implement client image utilities for previews, dimensions, validation, and downloads.
- [x] Implement server-side image processing with sharp resize, compression, output format, and watermark support.
- [x] Implement ZIP generation with manifest CSV.
- [x] Implement server-side validation, file count limits, file size limits, plan limits, and graceful export errors.

## App Pages

- [x] `/app` dashboard with current plan, usage, recent packs, quick actions, and upgrade CTA.
- [x] `/app/packs/new` complete pack wizard.
- [x] `/app/packs/[id]` pack detail/editor view for saved metadata.
- [x] `/app/presets` saved presets list and form with plan limits.
- [x] `/app/billing` billing, usage, upgrade, and manage billing UI.

## Core Workflows

- [x] Drag-and-drop batch upload for JPG, PNG, and WebP.
- [x] Thumbnail grid showing filename, dimensions, and file size.
- [x] Marketplace profile selector.
- [x] Slot ordering and custom slot labels.
- [x] Resize mode selection: fit within max dimensions, square crop, keep original aspect ratio.
- [x] Compression quality slider from 60 to 95 with estimated output size.
- [x] Watermark controls for repeated diagonal, center, and bottom-right text.
- [x] SKU/ASIN entry and filename preview.
- [x] ZIP export containing processed images and optional manifest CSV.
- [x] Persist recent pack history and usage events.
- [x] Save and reuse presets for paid plans, with guarded fallback for free users.

## Free Tools and Marketing Pages

- [x] `/` SaaS homepage.
- [x] `/pricing` pricing page.
- [x] `/tools` tools hub.
- [x] `/tools/etsy-digital-pattern-image-size` with single-image resizer.
- [x] `/tools/watermark-cross-stitch-pattern` with single-image watermarker.
- [x] `/tools/cross-stitch-pattern-mockup-generator` with mockup-style preview tool.
- [x] `/tools/etsy-cross-stitch-listing-photos` with checklist and ordering demo.
- [x] `/tools/bulk-product-photo-renamer` with up to 5-file renamer.
- [x] `/tools/sku-image-renamer` with SKU pattern preview.
- [x] `/tools/amazon-listing-image-organizer` with Amazon ordering demo.
- [x] `/tools/listing-image-packager` commercial landing page.
- [x] `/guides` guides hub.
- [x] `/guides/sell-cross-stitch-patterns-on-etsy` guide.
- [x] `/guides/amazon-image-requirements` guide.
- [x] `/blog` launch/workflows index.
- [x] `/blog/how-to-create-a-marketplace-ready-listing-image-pack` launch article.
- [x] Add practical SEO metadata, CTAs, examples, and internal links on all SEO pages.

## Deployment

- [x] Add production-ready Dockerfile compatible with Next.js standalone and Prisma SQLite.
- [x] Ensure Dockerfile only copies directories that exist.
- [x] Ensure app runs with no required environment variables in Coolify.
- [x] Ensure no third-party SDK clients initialize at module scope.
- [x] Ensure no build-time network dependencies such as `next/font/google`.
- [!] `docker build .` could not run because this environment lacks Docker daemon permission.

## Verification

- [x] Run `npm run lint` and fix issues.
- [x] Run `npm run build` and fix issues.
- [x] Start dev server and verify it does not crash.
- [x] Smoke-test public pages.
- [x] Smoke-test auth pages.
- [x] Smoke-test dashboard, pack wizard, presets, billing, tools, and guide routes by route/status checks and build route generation.
- [x] Test registration API and local image-processing dependencies.
- [!] Full browser screenshot automation was unavailable because no Chromium binary is installed.
- [x] Create `FORGE_COMPLETION_AUDIT.md` mapping requirements to files/routes/components/actions.

