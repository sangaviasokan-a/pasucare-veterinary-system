import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ServiceForm from "../ServiceForm";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const service = await prisma.service.findUnique({
    where: {
      id,
    },
  });

  if (!service) {
    notFound();
  }

  return (
    <div>
      <h1>Edit Service</h1>

      <ServiceForm service={service} />
    </div>
  );
}