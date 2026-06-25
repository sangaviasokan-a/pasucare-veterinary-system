import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function BookPage() {
  const services = await prisma.service.findMany({
    where: {
      active: true,
    },
  });

  return (
    <div>
      <div
        style={{
          textAlign: "center",
          marginBottom: 50,
        }}
      >
        <h1
          style={{
            fontSize: 42,
            marginBottom: 10,
          }}
        >
          🐄 Veterinary Services
        </h1>

        <p
          style={{
            color: "#64748b",
            fontSize: 18,
          }}
        >
          Select a service and book an appointment for your cattle.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(320px,1fr))",
          gap: 30,
        }}
      >
        {services.map((service) => (
          <div
            key={service.id}
            style={{
              background: "white",
              padding: 30,
              borderRadius: 25,
              boxShadow:
                "0 10px 25px rgba(0,0,0,0.08)",
              transition: "0.3s",
            }}
          >
            <h2
              style={{
                color: "#1e293b",
                marginBottom: 15,
              }}
            >
              🩺 {service.title}
            </h2>

            <p
              style={{
                color: "#64748b",
                lineHeight: 1.7,
              }}
            >
              {service.description}
            </p>

            <p
              style={{
                marginTop: 20,
                fontWeight: "bold",
                color: "#0f172a",
              }}
            >
              ⏱ Duration: {service.duration} minutes
            </p>

            <Link href={`/book/${service.id}`}>
              <button
                style={{
                  marginTop: 25,
                  background: "#2563eb",
                  color: "white",
                  border: "none",
                  padding: "14px 28px",
                  borderRadius: 12,
                  fontSize: 16,
                }}
              >
                Book Now
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}