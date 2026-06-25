import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-server";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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

    if (body.startTime >= body.endTime) {
      return Response.json(
        { error: "End time must be after start time" },
        { status: 400 }
      );
    }

    const updated = await prisma.availability.update({
      where: {
        id,
      },
      data: {
        startTime: body.startTime,
        endTime: body.endTime,
        enabled: body.enabled,
      },
    });

    return Response.json(updated);
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Failed to update availability" },
      { status: 500 }
    );
  }
}