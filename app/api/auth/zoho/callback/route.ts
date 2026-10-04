import { NextRequest, NextResponse } from "next/server";

const ZOHO_ACCOUNTS_URL =
  process.env.ZOHO_ACCOUNTS_URL || "https://accounts.zoho.com";

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    switch (character) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&#39;";
      default:
        return character;
    }
  });
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

    const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="referrer" content="no-referrer">
    <title>Zoho authorization successful</title>
  </head>
  <body>
    <h1>Zoho authorization successful</h1>
    <p>Copy this refresh token into Vercel as <code>ZOHO_REFRESH_TOKEN</code>.</p>
    <textarea readonly aria-label="Zoho refresh token" rows="5" cols="80">${escapeHtml(tokenData.refresh_token)}</textarea>
  </body>
</html>`;

    return new NextResponse(html, {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
        "Content-Type": "text/html; charset=utf-8",
        "Content-Security-Policy": "default-src 'none'; base-uri 'none'; frame-ancestors 'none'",
        "X-Content-Type-Options": "nosniff",
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
