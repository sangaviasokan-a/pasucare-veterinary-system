import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import BookingForm from "./BookingForm";

export default async function ServiceBookingPage({
  params,
}: {
  params: Promise<{ serviceId: string }>;
}) {
  const { serviceId } = await params;

  const service = await prisma.service.findUnique({
    where: {
      id: serviceId,
      active: true,
    },
  });

  if (!service) {
    notFound();
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Book {service.title}</h1>

      <p>{service.description}</p>

      <p>
        Duration: {service.duration} minutes
      </p>

      <hr />

      <BookingForm serviceId={service.id} />
    </div>
  );
}