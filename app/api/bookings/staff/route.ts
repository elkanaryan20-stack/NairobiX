import { NextRequest, NextResponse } from "next/server";
import { listZohoBookingsStaff } from "@/lib/zoho-bookings";

export async function GET(request: NextRequest) {
  const workspaceId = new URL(request.url).searchParams.get("workspace_id");

  if (!workspaceId) {
    return NextResponse.json(
      {
        success: false,
        error: "workspace_id is required.",
      },
      { status: 400 }
    );
  }

  try {
    const result = await listZohoBookingsStaff(workspaceId);

    if (!result.ok) {
      return NextResponse.json(
        {
          success: false,
          error: result.error,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      staff: result.data,
    });
  } catch (error) {
    console.error("Failed to fetch Zoho Bookings staff:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to fetch Zoho Bookings staff.",
      },
      { status: 500 }
    );
  }
}