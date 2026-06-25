import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-server";

export async function GET() {
  // 🔐 Protect API
  const session = await requireAdmin();

  if (!session) {
    return Response.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  try {
    const appointments = await prisma.appointment.findMany({
      where: {
        status: {
          not: "CANCELLED",
        },
      },
      include: {
        service: true,
      },
      orderBy: {
        startTime: "asc",
      },
    });

    return Response.json(appointments);
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error: "Failed to load calendar appointments",
      },
      {
        status: 500,
      }
    );
  }
}