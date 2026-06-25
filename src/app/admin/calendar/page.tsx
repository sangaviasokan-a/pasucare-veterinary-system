import { prisma } from "@/lib/prisma";
import CalendarView from "./CalendarView";

export default async function AdminCalendarPage() {
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

  const events = appointments.map((appointment) => ({
    id: appointment.id,
    title: appointment.fullName,
    start: appointment.startTime.toISOString(),
    end: appointment.endTime.toISOString(),
    status: appointment.status,

    extendedProps: {
      phone: appointment.phone,
      service: appointment.service.title,
      notes: appointment.notes,
      status: appointment.status,
    },
  }));

  return (
    <div>
      <h1>Appointment Calendar</h1>

      <p>
        Manage your appointments using a calendar view.
      </p>

      <CalendarView events={events} />
    </div>
  );
}