import { NextRequest, NextResponse } from "next/server";
import { fetchZohoBookingsAvailability } from "@/lib/zoho-bookings";

export async function GET(request: NextRequest) {
  const params = new URL(request.url).searchParams;

  const serviceId = params.get("service_id");
  const selectedDate = params.get("selected_date");

  const staffId = params.get("staff_id") || undefined;
  const groupId = params.get("group_id") || undefined;
  const resourceId = params.get("resource_id") || undefined;

  // Required parameters
  if (!serviceId || !selectedDate) {
    return NextResponse.json(
      {
        success: false,
        error: "service_id and selected_date are required.",
      },
      { status: 400 }
    );
  }

  // Zoho requires exactly one availability selector
  const selectorCount = [staffId, groupId, resourceId].filter(Boolean).length;

  if (selectorCount !== 1) {
    return NextResponse.json(
      {
        success: false,
        error:
          "Exactly one of staff_id, group_id, or resource_id is required.",
      },
      { status: 400 }
    );
  }

  try {
    const result = await fetchZohoBookingsAvailability({
      serviceId,
      selectedDate,
      staffId,
      groupId,
      resourceId,
    });

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
      availability: result.data,
    });
  } catch (error) {
    console.error("Failed to fetch Zoho Bookings availability:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to fetch booking availability.",
      },
      { status: 500 }
    );
  }
}