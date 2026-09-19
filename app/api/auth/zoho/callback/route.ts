import { NextRequest, NextResponse } from "next/server";

const ZOHO_ACCOUNTS_URL =
  process.env.ZOHO_ACCOUNTS_URL || "https://accounts.zoho.com";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error) {
    return new NextResponse(
      `Zoho authorization failed: ${error}`,
      { status: 400 }
    );
  }

  if (!code) {
    return new NextResponse(
      "No authorization code was provided.",
      { status: 400 }
    );
  }

  const clientId = process.env.ZOHO_CLIENT_ID;
  const clientSecret = process.env.ZOHO_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return new NextResponse(
      "Zoho OAuth credentials are not configured.",
      { status: 500 }
    );
  }

  try {
    const tokenResponse = await fetch(
      `${ZOHO_ACCOUNTS_URL}/oauth/v2/token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          code,
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: "authorization_code",
          redirect_uri:
            "https://www.nairobix.com/api/auth/zoho/callback",
        }),
      }
    );

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      console.error("Zoho token exchange failed:", tokenData);

      return new NextResponse(
        "Zoho authorization failed during token exchange.",
        { status: 500 }
      );
    }

    if (!tokenData.refresh_token) {
      return new NextResponse(
        "Zoho authorization succeeded, but no refresh token was returned.",
        { status: 500 }
      );
    }

    // TEMPORARY, one-time setup display — see the note below. Never logged
    // (console.log/console.error) anywhere in this handler, so it exists
    // only in this single HTTP response, not in Vercel function logs. This
    // route performs the token exchange itself, so — unlike the Bookings
    // callback, which isn't live yet — there's no way to intercept the
    // authorization code before it's spent; showing the result here, to
    // whoever's browser just completed the Zoho consent redirect, is the
    // only place this value is ever recoverable.
    const html = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="robots" content="noindex, nofollow" />
    <title>Zoho CRM authorization successful</title>
  </head>
  <body style="font-family: system-ui, sans-serif; max-width: 640px; margin: 48px auto; padding: 0 20px; color: #111;">
    <h1 style="font-size: 20px;">Zoho CRM authorization successful</h1>
    <p>Copy this refresh token into Vercel now as <code>ZOHO_REFRESH_TOKEN</code>, then close this tab. It will not be shown again.</p>
    <pre style="background:#f4f4f4; border:1px solid #ddd; border-radius:6px; padding:14px; word-break:break-all; white-space:pre-wrap;">${escapeHtml(tokenData.refresh_token)}</pre>
    <p style="color:#b00; font-size: 14px;">Treat this like a password. Don't paste it into chat, a ticket, or version control — only into Vercel's environment variable settings.</p>
    <p style="font-size: 13px; color:#555;">Reminder: revert this route to not display the token once setup is done (see the comment above this response in app/api/auth/zoho/callback/route.ts).</p>
  </body>
</html>`;

    return new NextResponse(html, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store, must-revalidate",
      },
    });
  } catch (err) {
    console.error("Zoho OAuth error:", err);

    return new NextResponse(
      "An unexpected error occurred during Zoho authorization.",
      { status: 500 }
    );
  }
}