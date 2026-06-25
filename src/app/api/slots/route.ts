import { prisma } from "@/lib/prisma";
import { addMinutes, format } from "date-fns";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const date = searchParams.get("date");
  const serviceId = searchParams.get("serviceId");

  if (!date || !serviceId) {
    return Response.json(
      { error: "Missing parameters" },
      { status: 400 }
    );
  }

  const service = await prisma.service.findUnique({
    where: {
      id: serviceId,
    },
  });

  if (!service) {
    return Response.json(
      { error: "Service not found" },
      { status: 404 }
    );
  }

  const selectedDate = new Date(date);

  const dayOfWeek =
    selectedDate.getDay() === 0
      ? 7
      : selectedDate.getDay();

  const availability =
    await prisma.availability.findFirst({
      where: {
        dayOfWeek,
        enabled: true,
      },
    });

  if (!availability) {
    return Response.json([]);
  }

  const appointments =
    await prisma.appointment.findMany({
      where: {
        startTime: {
          gte: new Date(
            selectedDate.setHours(0, 0, 0, 0)
          ),
        },
      },
    });

  const slots: string[] = [];

  const [startHour, startMinute] =
    availability.startTime
      .split(":")
      .map(Number);

  const [endHour, endMinute] =
    availability.endTime
      .split(":")
      .map(Number);

  let current = new Date(date);

  current.setHours(startHour, startMinute, 0, 0);

  const end = new Date(date);

  end.setHours(endHour, endMinute, 0, 0);

  while (current < end) {
    const slotTime = format(current, "HH:mm");

    const booked = appointments.some(
      (appointment) =>
        format(
          appointment.startTime,
          "HH:mm"
        ) === slotTime
    );

    if (!booked) {
      slots.push(slotTime);
    }

    current = addMinutes(
      current,
      service.duration
    );
  }

  return Response.json(slots);
}