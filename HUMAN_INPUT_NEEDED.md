# Human Input Needed

The application runs and builds without external credentials. Provide these only for production integrations:

- `AUTH_SECRET`: Generate with `openssl rand -base64 32` and set it in production.
- Stripe billing:
  - `STRIPE_SECRET_KEY`
  - `STRIPE_WEBHOOK_SECRET`
  - `STRIPE_SOLO_PRICE_ID`
  - `STRIPE_PRO_PRICE_ID`
  Configure products/prices in Stripe, then point the webhook to `/api/webhooks/stripe`.
- Resend email:
  - `RESEND_API_KEY`
  - `EMAIL_FROM`
  Verify the sending domain in Resend before enabling production emails.
- Analytics/Search:
  - Google Search Console, Plausible/GA, and PostHog accounts are operational setup items. The code includes a no-op analytics wrapper so the app does not depend on them at runtime.
