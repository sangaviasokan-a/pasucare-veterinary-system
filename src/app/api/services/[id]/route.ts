import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-server";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  // 🔐 Admin protection
  const session = await requireAdmin();

  if (!session) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();

    const updatedService = await prisma.service.update({
      where: {
        id: params.id,
      },
      data: {
        title: body.title,
        description: body.description,
        duration: Number(body.duration),
        active: body.active,
      },
    });

    return Response.json(updatedService);

  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Failed to update service" },
      { status: 500 }
    );
  }
}


export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  // 🔐 Admin protection
  const session = await requireAdmin();

  if (!session) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    await prisma.service.delete({
      where: {
        id: params.id,
      },
    });

    return Response.json({
      message: "Service deleted successfully",
    });

  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Failed to delete service" },
      { status: 500 }
    );
  }
}