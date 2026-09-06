import { NextResponse } from "next/server";
import { listZohoBookingsWorkspaces } from "@/lib/zoho-bookings";

export async function GET() {
  try {
    const workspaces = await listZohoBookingsWorkspaces();

    return NextResponse.json({
      success: true,
      workspaces,
    });
  } catch (error) {
    console.error("Failed to fetch Zoho Bookings workspaces:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to fetch Zoho Bookings workspaces.",
      },
      { status: 500 }
    );
  }
}