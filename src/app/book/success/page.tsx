import Link from "next/link";

export default function BookingSuccessPage() {
  return (
    <div
      style={{
        padding: 40,
        textAlign: "center",
      }}
    >
      <h1>🎉 Booking Confirmed!</h1>

      <p>
        Your appointment request has been received.
      </p>

      <p>
        The admin will review and update your appointment status.
      </p>

      <div style={{ marginTop: 20 }}>
        <Link href="/book">
          <button>Book Another Appointment</button>
        </Link>
      </div>
    </div>
  );
}