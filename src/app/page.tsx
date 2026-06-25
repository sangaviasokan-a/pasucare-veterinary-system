import Link from "next/link";

export default function Home() {
  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <div>
        <h1
          style={{
            fontSize: 60,
            marginBottom: 20,
            color: "#1e293b",
          }}
        >
          Healthy Cattle, Happy Farmers.
        </h1>

        <p
          style={{
            fontSize: 22,
            color: "#64748b",
            marginBottom: 40,
          }}
        >
          Book and manage appointments
          quickly and easily.
        </p>

        <div
          style={{
            display: "flex",
            gap: 20,
            justifyContent: "center",
          }}
        >
          <Link href="/book">
            <button
              style={{
                background: "#2563eb",
                color: "white",
                border: "none",
                padding: "15px 30px",
                borderRadius: 12,
                cursor: "pointer",
                fontSize: 16,
              }}
            >
              Book Appointment
            </button>
          </Link>

          <Link href="/bookings">
            <button
              style={{
                background: "#ffffff",
                border:
                  "1px solid #2563eb",
                color: "#2563eb",
                padding: "15px 30px",
                borderRadius: 12,
                cursor: "pointer",
                fontSize: 16,
              }}
            >
              My Bookings
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}