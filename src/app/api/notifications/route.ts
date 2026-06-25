import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-server";

// GET all notifications
export async function GET() {
  const session = await requireAdmin();

  if (!session) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const notifications = await prisma.notification.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return Response.json(notifications);
}


// Create a notification
export async function POST(req: Request) {
  const session = await requireAdmin();

  if (!session) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();

    const notification = await prisma.notification.create({
      data: {
        title: body.title,
        message: body.message,
      },
    });

    return Response.json(notification);

  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Failed to create notification" },
      { status: 400 }
    );
  }
}