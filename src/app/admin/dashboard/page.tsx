import { prisma } from "@/lib/prisma";
import BookingChart from "./BookingChart";

export default async function DashboardPage() {
  const [
    total,
    pending,
    completed,
    cancelled,
    appointments,
  ] = await Promise.all([
    prisma.appointment.count(),
    prisma.appointment.count({
      where: {
        status: "PENDING",
      },
    }),
    prisma.appointment.count({
      where: {
        status: "COMPLETED",
      },
    }),
    prisma.appointment.count({
      where: {
        status: "CANCELLED",
      },
    }),
    prisma.appointment.findMany({
      select: {
        createdAt: true,
      },
    }),
  ]);

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

  const chartData = months.map(
    (month, index) => ({
      month,
      bookings: appointments.filter(
        (a) => a.createdAt.getMonth() === index
      ).length,
    })
  );

  return (
    <div>
      <h1
        style={{
          fontSize: 32,
          marginBottom: 10,
        }}
      >
        Dashboard
      </h1>

      <p
        style={{
          color: "#64748b",
          marginBottom: 30,
        }}
      >
        Overview of your appointment system.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: 20,
        }}
      >
        <Card
          title="Total Appointments"
          value={total}
          color="#2563eb"
        />

        <Card
          title="Pending"
          value={pending}
          color="#f59e0b"
        />

        <Card
          title="Completed"
          value={completed}
          color="#22c55e"
        />

        <Card
          title="Cancelled"
          value={cancelled}
          color="#ef4444"
        />
      </div>

      <BookingChart data={chartData} />
    </div>
  );
}

function Card({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: string;
}) {
  return (
    <div
      style={{
        background: color,
        color: "white",
        padding: 30,
        borderRadius: 20,
        boxShadow:
          "0 10px 25px rgba(0,0,0,0.1)",
      }}
    >
      <h3
        style={{
          margin: 0,
          opacity: 0.9,
        }}
      >
        {title}
      </h3>

      <h1
        style={{
          fontSize: 48,
          marginTop: 20,
          marginBottom: 0,
        }}
      >
        {value}
      </h1>
    </div>
  );
}