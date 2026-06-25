"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BookingForm({
  serviceId,
}: {
  serviceId: string;
}) {
  const router = useRouter();

  const [date, setDate] = useState("");
  const [slots, setSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState("");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadSlots(selectedDate: string) {
    setDate(selectedDate);
    setSelectedSlot("");
    setLoading(true);

    try {
      const res = await fetch(
        `/api/slots?date=${selectedDate}&serviceId=${serviceId}`
      );

      const data = await res.json();
      setSlots(data);
    } catch (error) {
      console.error(error);
      setSlots([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleBooking() {
    if (!selectedSlot) {
      setError("Please select a time slot");
      return;
    }

    setLoading(true);
    setError("");

    const startTime = new Date(
      `${date}T${selectedSlot}:00`
    ).toISOString();

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          serviceId,
          startTime,
          notes,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/book/success");
      } else {
        setError(data.error || "Booking failed");
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ marginTop: 20 }}>
      <h2>Select Date & Time</h2>

      <input
        type="date"
        value={date}
        onChange={(e) => loadSlots(e.target.value)}
      />

      {loading && <p>Loading...</p>}

      {slots.length > 0 && (
        <>
          <h3>Available Slots</h3>

          <div
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            {slots.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => setSelectedSlot(slot)}
                style={{
                  background:
                    selectedSlot === slot ? "green" : "",
                  color:
                    selectedSlot === slot ? "white" : "",
                }}
              >
                {slot}
              </button>
            ))}
          </div>
        </>
      )}

      {selectedSlot && (
        <div style={{ marginTop: 20 }}>
          <h3>Your Details</h3>

          <input
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <br />
          <br />

          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <br />
          <br />

          <input
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <br />
          <br />

          <textarea
            placeholder="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <br />
          <br />

          <button
            onClick={handleBooking}
            disabled={loading}
          >
            Book Appointment
          </button>
        </div>
      )}

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}
    </div>
  );
}