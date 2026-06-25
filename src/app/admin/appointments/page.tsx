import { prisma } from "@/lib/prisma";
import AppointmentActions from "./AppointmentActions";
import AppointmentFilters from "./AppointmentFilters";

export default async function AppointmentsPage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    status?: string;
    from?: string;
    to?: string;
  }>;
}) {
  const params = await searchParams;

  const appointments = await prisma.appointment.findMany({
    where: {
      // Search name or phone
      OR: params.search
        ? [
            {
              fullName: {
                contains: params.search,
                mode: "insensitive",
              },
            },
            {
              phone: {
                contains: params.search,
              },
            },
          ]
        : undefined,

      // Status filter
      status: params.status
        ? (params.status as any)
        : undefined,

      // Date range filter
      startTime: {
        gte: params.from
          ? new Date(params.from)
          : undefined,

        lte: params.to
          ? new Date(params.to + "T23:59:59")
          : undefined,
      },
    },

    include: {
      service: true,
    },

    orderBy: {
      startTime: "desc",
    },
  });

  return (
    <div>
      <h1>Appointments</h1>

      <AppointmentFilters />

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Service</th>
            <th>Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.fullName}</td>

              <td>
                {appointment.phone}
              </td>

              <td>
                {appointment.service.title}
              </td>

              <td>
                {new Date(
                  appointment.startTime
                ).toLocaleString()}
              </td>

              <td>
                {appointment.status}
              </td>

              <td>
                <AppointmentActions
                  id={appointment.id}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {appointments.length === 0 && (
        <p>No appointments found.</p>
      )}
    </div>
  );
}