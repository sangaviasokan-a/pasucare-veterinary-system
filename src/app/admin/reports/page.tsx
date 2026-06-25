import { prisma } from "@/lib/prisma";
import MonthlyChart from "./MonthlyChart";

export default async function ReportsPage() {
  const appointments = await prisma.appointment.findMany({
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

  const monthlyData = months.map((month, index) => {
    const count = appointments.filter(
      (appointment) =>
        appointment.createdAt.getMonth() === index
    ).length;

    return {
      month,
      bookings: count,
    };
  });

  return (
    <div>
      <h1>Monthly Booking Trends</h1>

      <p>
        Track how many appointments are booked each month.
      </p>

      <MonthlyChart data={monthlyData} />
    </div>
  );
}