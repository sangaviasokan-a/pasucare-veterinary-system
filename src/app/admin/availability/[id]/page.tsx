import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import AvailabilityForm from "../AvailabilityForm";

export default async function EditAvailabilityPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const availability = await prisma.availability.findUnique({
    where: {
      id,
    },
  });

  if (!availability) {
    notFound();
  }

  return (
    <div>
      <h1>Edit Availability</h1>

      <AvailabilityForm availability={availability} />
    </div>
  );
}