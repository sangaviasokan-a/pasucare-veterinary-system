import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Find appointment with service details
    const appointment = await prisma.appointment.findUnique({
      where: {
        id,
      },
      include: {
        service: true,
      },
    });

    if (!appointment) {
      return Response.json(
        {
          error: "Appointment not found",
        },
        {
          status: 404,
        }
      );
    }

    // Prevent cancelling completed appointments
    if (
      appointment.status === "COMPLETED" ||
      appointment.status === "CANCELLED"
    ) {
      return Response.json(
        {
          error: "This appointment cannot be cancelled",
        },
        {
          status: 400,
        }
      );
    }

    // Update appointment status
    const updatedAppointment = await prisma.appointment.update({
      where: {
        id,
      },
      data: {
        status: "CANCELLED",
      },
    });

    // Create admin notification
    await prisma.notification.create({
      data: {
        title: "Appointment Cancelled",
        message: `${appointment.fullName} cancelled their ${appointment.service.title} appointment.`,
      },
    });

    return Response.json({
      message: "Appointment cancelled successfully",
      appointment: updatedAppointment,
    });

  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error: "Failed to cancel appointment",
      },
      {
        status: 500,
      }
    );
  }
}