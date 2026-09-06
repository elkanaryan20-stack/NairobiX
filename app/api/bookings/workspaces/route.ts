import { NextRequest, NextResponse } from "next/server";
import { listZohoBookingsWorkspaces } from "@/lib/zoho-bookings";

export async function GET(request: NextRequest) {
  const workspaceId = request.nextUrl.searchParams.get("workspaceId") || undefined;

  const result = await listZohoBookingsWorkspaces(workspaceId);

  if (!result.ok) {
    return NextResponse.json({ success: false, error: result.error }, { status: 502 });
  }

  return NextResponse.json({ success: true, data: result.data });
}
