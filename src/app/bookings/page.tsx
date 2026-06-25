"use client";

import { useState } from "react";

type Appointment = {
  id: string;
  fullName: string;
  phone: string | null;
  startTime: string;
  status: string;
  service: {
    title: string;
  };
};

export default function BookingPage() {
  const [phone, setPhone] = useState("");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  async function searchBookings() {
    if (!phone.trim()) {
      alert("Please enter your phone number");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setAppointments(data);
      }

      setSearched(true);
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function cancelBooking(id: string) {
    if (!confirm("Cancel this appointment?")) {
      return;
    }

    try {
      await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
      });

      searchBookings();
    } catch (error) {
      console.error(error);
      alert("Failed to cancel booking");
    }
  }

  function getStatusColor(status: string) {
    switch (status) {
      case "PENDING":
        return "#f59e0b";

      case "APPROVED":
        return "#2563eb";

      case "COMPLETED":
        return "#22c55e";

      case "CANCELLED":
        return "#ef4444";

      default:
        return "#64748b";
    }
  }

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "50px auto",
      }}
    >
      {/* Search Card */}
      <div
        className="card"
        style={{
          textAlign: "center",
          marginBottom: 35,
        }}
      >
        <h1
          style={{
            fontSize: 38,
            marginBottom: 15,
          }}
        >
          📋 My Appointments
        </h1>

        <p
          style={{
            color: "#64748b",
            marginBottom: 30,
          }}
        >
          Enter your phone number to view your bookings.
        </p>

        <input
          placeholder="📱 Enter Phone Number"
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value)
          }
          style={{
            marginBottom: 20,
          }}
        />

        <button
          className="primary-btn"
          onClick={searchBookings}
          disabled={loading}
        >
          {loading
            ? "Searching..."
            : "Find My Bookings"}
        </button>
      </div>

      {searched &&
        appointments.length === 0 && (
          <div
            className="card"
            style={{
              textAlign: "center",
              color: "#64748b",
            }}
          >
            <h3>No bookings found.</h3>
          </div>
        )}

      {appointments.map((appointment) => (
        <div
          key={appointment.id}
          className="card"
          style={{
            marginBottom: 25,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 15,
            }}
          >
            <div>
              <h2
                style={{
                  marginBottom: 10,
                }}
              >
                🩺 {appointment.service.title}
              </h2>

              <p>
                👤{" "}
                <strong>
                  {appointment.fullName}
                </strong>
              </p>

              <p>
                📅{" "}
                {new Date(
                  appointment.startTime
                ).toLocaleString()}
              </p>

              <p
                style={{
                  marginTop: 10,
                }}
              >
                Status:
                {" "}
                <span
                  style={{
                    color:
                      getStatusColor(
                        appointment.status
                      ),
                    fontWeight: "bold",
                  }}
                >
                  {appointment.status}
                </span>
              </p>
            </div>

            {appointment.status !==
              "COMPLETED" &&
              appointment.status !==
                "CANCELLED" && (
                <button
                  className="danger-btn"
                  onClick={() =>
                    cancelBooking(
                      appointment.id
                    )
                  }
                >
                  Cancel Booking
                </button>
              )}
          </div>
        </div>
      ))}
    </div>
  );
}