import { NextRequest, NextResponse } from "next/server";

const ZOHO_ACCOUNTS_URL =
  process.env.ZOHO_ACCOUNTS_URL || "https://accounts.zoho.com";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
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

    // TEMPORARY one-time OAuth setup step: renders the refresh token directly
    // in this authenticated HTTPS response so it can be copied into Vercel.
    // Never logged, never persisted, never put in a URL/query param — this
    // is the only place the value ever appears. Revert to the plain
    // success-message response once the token has been captured.
    const escapedRefreshToken = escapeHtml(tokenData.refresh_token);

    return new NextResponse(
      `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><title>Zoho Authorization</title></head>
<body style="font-family: system-ui, sans-serif; max-width: 640px; margin: 60px auto; padding: 0 20px;">
  <h1>Zoho authorization successful.</h1>
  <p>Copy the refresh token below into Vercel as <code>ZOHO_REFRESH_TOKEN</code>. This token is shown once and is not stored by NairobiX.</p>
  <textarea readonly rows="4" style="width: 100%; font-family: monospace; font-size: 14px; padding: 10px;" onclick="this.select()">${escapedRefreshToken}</textarea>
</body>
</html>`,
      { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  } catch (err) {
    console.error("Zoho OAuth error:", err);

    return new NextResponse(
      "An unexpected error occurred during Zoho authorization.",
      { status: 500 }
    );
  }
}