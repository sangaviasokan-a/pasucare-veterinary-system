import { prisma } from "@/lib/prisma";

export async function GET() {
  const availability = await prisma.availability.findMany({
    where: {
      enabled: true,
    },
  });

  return Response.json(availability);
}