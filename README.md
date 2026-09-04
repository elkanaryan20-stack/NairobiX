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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
