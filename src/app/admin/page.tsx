import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const totalAppointments = await prisma.appointment.count();

  const pendingAppointments = await prisma.appointment.count({
    where: {
      status: "PENDING",
    },
  });

  const approvedAppointments = await prisma.appointment.count({
    where: {
      status: "APPROVED",
    },
  });

  const completedAppointments = await prisma.appointment.count({
    where: {
      status: "COMPLETED",
    },
  });

  const cancelledAppointments = await prisma.appointment.count({
    where: {
      status: "CANCELLED",
    },
  });

  const totalServices = await prisma.service.count();

  const totalNotifications = await prisma.notification.count();

  const unreadNotifications = await prisma.notification.count({
    where: {
      read: false,
    },
  });

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Manage appointments and bookings</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20,
          marginTop: 30,
        }}
      >
        <DashboardCard
          title="Total Appointments"
          value={totalAppointments}
        />

        <DashboardCard
          title="Pending"
          value={pendingAppointments}
        />

        <DashboardCard
          title="Approved"
          value={approvedAppointments}
        />

        <DashboardCard
          title="Completed"
          value={completedAppointments}
        />

        <DashboardCard
          title="Cancelled"
          value={cancelledAppointments}
        />

        <DashboardCard
          title="Services"
          value={totalServices}
        />

        <DashboardCard
          title="Notifications"
          value={totalNotifications}
        />

        <DashboardCard
          title="Unread Notifications"
          value={unreadNotifications}
        />
      </div>
    </div>
  );
}

function DashboardCard({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: 10,
        padding: 20,
        boxShadow: "0 2px 5px #eee",
        backgroundColor: "#fff",
      }}
    >
      <h3>{title}</h3>
      <h1>{value}</h1>
    </div>
  );
}