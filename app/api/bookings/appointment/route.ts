import { NextRequest, NextResponse } from "next/server";
import { createZohoBookingsAppointment } from "@/lib/zoho-bookings";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      workspace_id,
      service_id,
      staff_id,
      group_id,
      resource_id,
      start_time,
      customer,
    } = body;

    if (!workspace_id || !service_id || !start_time || !customer) {
      return NextResponse.json(
        {
          success: false,
          error:
            "workspace_id, service_id, start_time, and customer are required.",
        },
        { status: 400 }
      );
    }

    if (!customer.name || !customer.email) {
      return NextResponse.json(
        {
          success: false,
          error: "Customer name and email are required.",
        },
        { status: 400 }
      );
    }

    const selectorCount = [staff_id, group_id, resource_id].filter(
      Boolean
    ).length;

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

    const result = await createZohoBookingsAppointment({
      workspaceId: workspace_id,
      serviceId: service_id,
      staffId: staff_id,
      groupId: group_id,
      resourceId: resource_id,
      startTime: start_time,
      customer: {
        name: customer.name,
        email: customer.email,
        phoneNumber: customer.phone_number,
      },
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
      appointment: result.data,
    });
  } catch (error) {
    console.error("Failed to create Zoho Bookings appointment:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to create the booking.",
      },
      { status: 500 }
    );
  }
}