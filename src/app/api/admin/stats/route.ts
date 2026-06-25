import { prisma } from "@/lib/prisma";

export async function GET() {
  const appointments =
    await prisma.appointment.findMany({
      select: {
        createdAt: true,
      },
    });

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const data = months.map((month, index) => ({
    month,
    bookings: appointments.filter(
      (a) =>
        a.createdAt.getMonth() === index
    ).length,
  }));

  return Response.json(data);
}