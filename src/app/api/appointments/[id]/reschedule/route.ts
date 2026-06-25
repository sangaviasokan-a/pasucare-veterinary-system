import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-server";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  // 🔐 Check admin login
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

    const startTime = new Date(body.startTime);
    const endTime = new Date(body.endTime);

    // Validate dates
    if (
      isNaN(startTime.getTime()) ||
      isNaN(endTime.getTime())
    ) {
      return Response.json(
        {
          error: "Invalid date or time",
        },
        {
          status: 400,
        }
      );
    }

    // Check for overlapping appointments
    const conflict = await prisma.appointment.findFirst({
      where: {
        id: {
          not: id,
        },
        status: {
          not: "CANCELLED",
        },
        AND: [
          {
            startTime: {
              lt: endTime,
            },
          },
          {
            endTime: {
              gt: startTime,
            },
          },
        ],
      },
    });

    if (conflict) {
      return Response.json(
        {
          error: "Time slot already booked",
        },
        {
          status: 409,
        }
      );
    }

    // Update appointment
    const appointment = await prisma.appointment.update({
      where: {
        id,
      },
      data: {
        startTime,
        endTime,
      },
      include: {
        service: true,
      },
    });

    // Create admin notification
    await prisma.notification.create({
      data: {
        title: "Appointment Rescheduled",
        message:
          `${appointment.fullName}'s ` +
          `${appointment.service.title} appointment ` +
          `was moved to ${startTime.toLocaleString()}.`,
      },
    });

    return Response.json({
      message: "Appointment rescheduled",
      appointment,
    });

  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error: "Failed to reschedule appointment",
      },
      {
        status: 500,
      }
    );
  }
}