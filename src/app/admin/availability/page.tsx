import { prisma } from "@/lib/prisma";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default async function AvailabilityPage() {
  const availability = await prisma.availability.findMany({
    orderBy: {
      dayOfWeek: "asc",
    },
  });

  return (
    <div>
      <h1>Availability</h1>

      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>Day</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {availability.map((item) => (
            <tr key={item.id}>
              <td>{days[item.dayOfWeek]}</td>

              <td>{item.startTime}</td>

              <td>{item.endTime}</td>

              <td>
                {item.enabled ? "Enabled" : "Closed"}
              </td>

              <td>
                <a href={`/admin/availability/${item.id}`}>
                    Edit
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}