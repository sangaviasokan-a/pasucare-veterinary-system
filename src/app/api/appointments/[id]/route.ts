import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-server";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  // 🔐 Protect API
  const session = await requireAdmin();

  if (!session) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { id } = await params;

    const body = await req.json();

    // Validate allowed statuses
    const allowedStatuses = [
      "PENDING",
      "APPROVED",
      "REJECTED",
      "CANCELLED",
      "COMPLETED",
    ];

    if (!allowedStatuses.includes(body.status)) {
      return Response.json(
        { error: "Invalid status" },
        { status: 400 }
      );
    }

    // Update appointment
    const updated = await prisma.appointment.update({
      where: {
        id,
      },
      data: {
        status: body.status,
      },
      include: {
        service: true,
      },
    });

    // Create notification
    await prisma.notification.create({
      data: {
        title: `Appointment ${updated.status}`,
        message: `${updated.fullName}'s ${updated.service.title} appointment has been ${updated.status.toLowerCase()}.`,
      },
    });

    return Response.json(updated);

  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error: "Failed to update appointment",
      },
      {
        status: 500,
      }
    );
  }
}