import { prisma } from "@/lib/prisma";
import { appointmentSchema } from "@/lib/validators/appointment";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const data = appointmentSchema.parse(body);

    const service = await prisma.service.findUnique({
      where: {
        id: data.serviceId,
      },
    });

    if (!service) {
      return Response.json(
        { error: "Service not found" },
        { status: 404 }
      );
    }

    const startTime = new Date(data.startTime);

    const endTime = new Date(
      startTime.getTime() + service.duration * 60000
    );

    const existing = await prisma.appointment.findFirst({
      where: {
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

    if (existing) {
      return Response.json(
        {
          error: "Time slot already booked",
        },
        {
          status: 409,
        }
      );
    }

    // Create appointment
    const appointment = await prisma.appointment.create({
      data: {
          fullName: data.fullName,
          phone: data.phone,
          serviceId: data.serviceId,
          startTime,
          endTime,
          notes: data.notes,
        }
    });

    // Create admin notification
    await prisma.notification.create({
      data: {
        title: "New Appointment",
        message: `${appointment.fullName} booked "${service.title}" on ${startTime.toLocaleString()}`,
      },
    });

    return Response.json(appointment);

  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error: "Invalid request",
      },
      {
        status: 400,
      }
    );
  }
}