import { NextRequest, NextResponse } from "next/server";

const ZOHO_BOOKINGS_ACCOUNTS_URL =
  process.env.ZOHO_BOOKINGS_ACCOUNTS_URL || "https://accounts.zoho.com";

const ZOHO_BOOKINGS_REDIRECT_URI =
  "https://www.nairobix.com/api/bookings/callback";

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]!
  );
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error) {
    return new NextResponse(
      `Zoho Bookings authorization failed: ${error}`,
      { status: 400 }
    );
  }

  if (!code) {
    return new NextResponse(
      "No authorization code was provided.",
      { status: 400 }
    );
  }

  const clientId = process.env.ZOHO_BOOKINGS_CLIENT_ID;
  const clientSecret = process.env.ZOHO_BOOKINGS_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return new NextResponse(
      "Zoho Bookings OAuth credentials are not configured.",
      { status: 500 }
    );
  }

  try {
    const tokenResponse = await fetch(
      `${ZOHO_BOOKINGS_ACCOUNTS_URL}/oauth/v2/token`,
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
          redirect_uri: ZOHO_BOOKINGS_REDIRECT_URI,
        }),
      }
    );

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      console.error("Zoho Bookings token exchange failed:", tokenData);

      return new NextResponse(
        "Zoho Bookings authorization failed during token exchange.",
        { status: 500 }
      );
    }

    if (!tokenData.refresh_token) {
      return new NextResponse(
        "Zoho Bookings authorization succeeded, but no refresh token was returned. Make sure the authorization request included access_type=offline.",
        { status: 500 }
      );
    }

    console.log("Zoho Bookings authorization completed. A refresh token was issued.");

    return new NextResponse(
      `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="referrer" content="no-referrer"><title>Zoho Bookings authorized</title></head><body><h1>Zoho Bookings authorized</h1><p>Copy this refresh token into Vercel as ZOHO_BOOKINGS_REFRESH_TOKEN.</p><textarea readonly rows="5" cols="80" aria-label="Zoho Bookings refresh token">${escapeHtml(tokenData.refresh_token)}</textarea></body></html>`,
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store",
          "Content-Type": "text/html; charset=utf-8",
          "Content-Security-Policy": "default-src 'none'; base-uri 'none'; frame-ancestors 'none'",
          "X-Content-Type-Options": "nosniff",
        },
      }
    );
  } catch (err) {
    console.error("Zoho Bookings OAuth error:", err);

    return new NextResponse(
      "An unexpected error occurred during Zoho Bookings authorization.",
      { status: 500 }
    );
  }
}
