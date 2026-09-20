This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Environment Variables

### Zoho Bookings OAuth

Server-side only — never expose these to the browser. Set as environment
variables in Vercel (or `.env.local` for local development); do not commit
real values.

- `ZOHO_BOOKINGS_CLIENT_ID` — Client ID for the "NairobiX Bookings" Zoho
  OAuth application.
- `ZOHO_BOOKINGS_CLIENT_SECRET` — Client Secret for the same application.
- `ZOHO_BOOKINGS_REFRESH_TOKEN` — Obtained after completing the OAuth
  consent flow at `https://www.nairobix.com/api/bookings/callback`; add
  this once the callback confirms a refresh token was issued.
- `ZOHO_BOOKINGS_ACCOUNTS_URL` — Optional. Defaults to
  `https://accounts.zoho.com` (the `.com` data center). Only set this if
  the Bookings application is registered on a different Zoho data center.
- `ZOHO_BOOKINGS_API_URL` — Optional. Defaults to `https://www.zohoapis.com`.
  Only set this if the token response's `api_domain` indicates a different
  regional endpoint.
- `ZOHO_BOOKINGS_WORKSPACE_ID` — Optional, local discovery only (see
  `discover-zoho-bookings.sh`). Not read by any deployed application code.

### Proposal Response

Server-side only — never expose these to the browser. Powers the Proposal
Response experience at `app/proposal/respond/page.tsx` and
`app/api/proposal/*`, which lets a client respond to a Growth Proposal
(Proceed / Discuss / Request Changes) and records the response on the
existing Zoho CRM Deal — see `lib/proposal-token.ts`, `lib/proposal-response.ts`.

- `PROPOSAL_RESPONSE_SECRET` — Signing secret for the response links'
  HMAC-SHA256 token. Generate a long random value (e.g. `openssl rand -hex 32`)
  and never reuse it elsewhere. Rotating it invalidates every link already
  sent.
- `PROPOSAL_LINKS_INTERNAL_SECRET` — Shared secret required (as the
  `x-internal-secret` header) to call `POST /api/proposal/generate-links`,
  which signs the three response URLs for a given Deal ID. Used by
  `generate-proposal-links.sh` today; a Zoho workflow/custom function could
  call it later to automate sending.
- `ZOHO_PROPOSAL_LINK_FIELD` — Optional. The Deals module API field name
  that holds the "Growth Proposal Link" URL. Defaults to `Growth_Proposal_Link`
  (confirmed against a live Deal record); only set this if the field's API
  name ever changes.
- `PROPOSAL_WEBHOOK_SECRET` — Shared secret required (as the
  `X-NairobiX-Webhook-Secret` header) to call `POST /api/proposal/send`.
  This is the target of the Zoho CRM "Proposal Sent" Workflow Rule's Webhook
  action (CRM Plus doesn't expose Custom Functions, so this endpoint — not a
  Deluge function — builds the fresh response URLs, looks up the Deal's
  proposal link and Contact email, and sends the Growth Proposal email via
  the Zoho Mail API). Distinct from `PROPOSAL_LINKS_INTERNAL_SECRET` so it
  can be rotated independently of the human-triggered link-generation path.
- `ZOHO_MAIL_ACCOUNT_ID` — The Zoho Mail account ID for `hello@nairobix.com`,
  used by `/api/proposal/send` to call the Zoho Mail API's send-message
  endpoint. Look this up once via Zoho Mail's account settings or
  `GET /api/accounts`.
- `ZOHO_MAIL_API_URL` — Optional. Defaults to `https://mail.zoho.com`; only
  set this if the account's data center requires a different regional
  endpoint (mirrors `ZOHO_API_URL`'s pattern).

Reuses the existing CRM OAuth app's `ZOHO_CLIENT_ID` / `ZOHO_CLIENT_SECRET` /
`ZOHO_REFRESH_TOKEN` (see `lib/zoho.ts`) — that grant must include Deals and
Tasks module scope, which may require re-consenting via
`/api/auth/zoho/callback` with a broader scope if it was only ever granted
Leads access. `/api/proposal/send`'s Zoho Mail call additionally requires
the `ZohoMail.messages.CREATE` scope on that same grant — re-consent with
both scopes together.

### Nia (Claude API)

Server-side only — never expose this to the browser. Powers the native Nia
chat assistant at `app/api/nia/chat/route.ts`.

- `ANTHROPIC_API_KEY` — API key for the Anthropic account used to run Nia.
  Without it, Nia degrades gracefully to an error message rather than
  failing the build or the rest of the site.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
