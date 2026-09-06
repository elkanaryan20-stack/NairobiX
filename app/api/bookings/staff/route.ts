import { NextRequest, NextResponse } from "next/server";
import { listZohoBookingsStaff, NAIROBIX_CONSULTATION_WORKSPACE_ID } from "@/lib/zoho-bookings";

export async function GET(request: NextRequest) {
  const workspaceId =
    request.nextUrl.searchParams.get("workspaceId") || NAIROBIX_CONSULTATION_WORKSPACE_ID;

  const result = await listZohoBookingsStaff(workspaceId);

  if (!result.ok) {
    return NextResponse.json({ success: false, error: result.error }, { status: 502 });
  }

  return NextResponse.json({ success: true, data: result.data });
}
