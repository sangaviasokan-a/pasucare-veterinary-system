import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <h1>Services</h1>

      <Link href="/admin/services/create">
        Add New Service
      </Link>

      <br />
      <br />

      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {services.map((service) => (
            <tr key={service.id}>
              <td>{service.title}</td>

              <td>
                {service.description || "No description"}
              </td>

              <td>
                {service.duration} minutes
              </td>

              <td>
                {service.active ? "Active" : "Disabled"}
              </td>

              <td>
                <Link href={`/admin/services/${service.id}`}>
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}