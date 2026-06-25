import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { phone } = body;

    if (!phone) {
      return Response.json(
        {
          error: "Phone number is required",
        },
        {
          status: 400,
        }
      );
    }

    const appointments = await prisma.appointment.findMany({
      where: {
        phone: {
          contains: phone,
        },
      },
      include: {
        service: true,
      },
      orderBy: {
        startTime: "desc",
      },
    });

    return Response.json(appointments);

  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error: "Failed to fetch bookings",
      },
      {
        status: 500,
      }
    );
  }
}