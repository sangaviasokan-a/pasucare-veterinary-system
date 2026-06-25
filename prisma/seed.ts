import "dotenv/config";

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DIRECT_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  await prisma.service.createMany({
    data: [
      {
        title: "One-on-One Consultation",
        description: "Personalized consultation session",
        duration: 60,
      },
      {
        title: "Strategy Session",
        description: "Business planning and guidance",
        duration: 90,
      },
      {
        title: "Career Guidance",
        description: "Career coaching and mentoring",
        duration: 60,
      },
      {
        title: "Business Advisory",
        description: "Professional business advice",
        duration: 120,
      },
    ],
  });

  console.log("Services seeded");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });