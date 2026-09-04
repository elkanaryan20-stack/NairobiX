import { NextRequest, NextResponse } from "next/server";

const ZOHO_BOOKINGS_ACCOUNTS_URL =
  process.env.ZOHO_BOOKINGS_ACCOUNTS_URL || "https://accounts.zoho.com";

const ZOHO_BOOKINGS_REDIRECT_URI =
  "https://www.nairobix.com/api/bookings/callback";

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

    console.log(
      "Zoho Bookings refresh token generated. Copy it from these server logs and add it to Vercel as ZOHO_BOOKINGS_REFRESH_TOKEN:",
      tokenData.refresh_token
    );

    return new NextResponse(
      "Zoho Bookings authorization successful. The refresh token has been generated and written to the server logs (not shown here). Retrieve it from your deployment logs and add it to Vercel as ZOHO_BOOKINGS_REFRESH_TOKEN.",
      { status: 200 }
    );
  } catch (err) {
    console.error("Zoho Bookings OAuth error:", err);

    return new NextResponse(
      "An unexpected error occurred during Zoho Bookings authorization.",
      { status: 500 }
    );
  }
}
