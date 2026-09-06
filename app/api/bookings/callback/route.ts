import { NextRequest, NextResponse } from "next/server";

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
  const accountsUrl =
    process.env.ZOHO_BOOKINGS_ACCOUNTS_URL ||
    "https://accounts.zoho.com";

  if (!clientId || !clientSecret) {
    return new NextResponse(
      "Zoho Bookings OAuth credentials are not configured.",
      { status: 500 }
    );
  }

  const redirectUri =
    "https://www.nairobix.com/api/bookings/callback";

  const body = new URLSearchParams({
    code,
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: "authorization_code",
    redirect_uri: redirectUri,
  });

  try {
    const tokenResponse = await fetch(
      `${accountsUrl}/oauth/v2/token`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      }
    );

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      console.error(
        "Zoho Bookings token exchange failed:",
        tokenData
      );

      return new NextResponse(
        "Zoho Bookings token exchange failed. Check the deployment logs for the error.",
        { status: 500 }
      );
    }

    if (!tokenData.refresh_token) {
      console.error(
        "Zoho Bookings response did not contain a refresh token."
      );

      return new NextResponse(
        "Authorization succeeded, but Zoho did not return a refresh token. Please authorize again with offline access and consent.",
        { status: 500 }
      );
    }

    return new NextResponse(
      `<!DOCTYPE html>
<html>
  <head>
    <title>NairobiX — Zoho Bookings Authorization</title>
    <meta charset="utf-8" />
    <style>
      body {
        font-family: Arial, sans-serif;
        background: #0b0b0d;
        color: #ffffff;
        padding: 40px;
      }

      .container {
        max-width: 800px;
        margin: 0 auto;
      }

      .success {
        color: #22c55e;
      }

      .token {
        display: block;
        margin-top: 20px;
        padding: 20px;
        background: #17171a;
        border: 1px solid #333;
        border-radius: 10px;
        word-break: break-all;
        user-select: all;
      }

      .warning {
        margin-top: 20px;
        color: #f97316;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <h1 class="success">
        Zoho Bookings authorization successful
      </h1>

      <p>
        Your refresh token has been generated.
      </p>

      <p>
        Copy the token below and add it to Vercel as:
      </p>

      <strong>
        ZOHO_BOOKINGS_REFRESH_TOKEN
      </strong>

      <div class="token">${tokenData.refresh_token}</div>

      <p class="warning">
        Keep this token private. Do not share it in chat,
        GitHub, screenshots, or public logs.
      </p>
    </div>
  </body>
</html>`,
      {
        status: 200,
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (error) {
    console.error(
      "Zoho Bookings OAuth callback error:",
      error
    );

    return new NextResponse(
      "An unexpected error occurred while connecting Zoho Bookings.",
      { status: 500 }
    );
  }
}