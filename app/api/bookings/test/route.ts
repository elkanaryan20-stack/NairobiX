import { NextResponse } from "next/server";
import { listZohoBookingsWorkspaces } from "@/lib/zoho-bookings";

export async function GET() {
  try {
    const workspaces = await listZohoBookingsWorkspaces();

    return NextResponse.json({
      success: true,
      message: "Zoho Bookings connection is working.",
      workspaceCount: Array.isArray(workspaces)
        ? workspaces.length
        : 0,
    });
  } catch (error) {
    console.error("Zoho Bookings test failed:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Zoho Bookings connection failed.",
      },
      { status: 500 }
    );
  }
}