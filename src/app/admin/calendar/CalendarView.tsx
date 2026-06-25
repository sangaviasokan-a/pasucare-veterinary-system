"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

type Event = {
  id: string;
  title: string;
  start: string;
  end: string;
  status: string;

  extendedProps: {
    phone: string;
    service: string;
    notes: string | null;
    status: string;
  };
};

export default function CalendarView({
  events,
}: {
  events: Event[];
}) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [selectedEvent, setSelectedEvent] =
    useState<any>(null);

  function handleEventClick(info: any) {
    setSelectedEvent(info.event);
  }

  async function handleEventDrop(info: any) {
    const event = info.event;

    try {
      const res = await fetch(
        `/api/appointments/${event.id}/reschedule`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            startTime: event.start,
            endTime: event.end,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to reschedule");
        info.revert();
        return;
      }

      alert("Appointment rescheduled");
      router.refresh();
    } catch (error) {
      console.error(error);
      info.revert();
      alert("Something went wrong");
    }
  }

  async function updateStatus(status: string) {
    if (!selectedEvent) return;

    setLoading(true);

    try {
      const res = await fetch(
        `/api/appointments/${selectedEvent.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to update");
        return;
      }

      alert("Appointment updated successfully");

      setSelectedEvent(null);

      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ marginTop: 20 }}>
      <FullCalendar
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
        ]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right:
            "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        editable={true}
        eventDrop={handleEventDrop}
        eventResize={handleEventDrop}
        events={events.map((event) => ({
          id: event.id,
          title: event.title,
          start: event.start,
          end: event.end,
          color:
            event.status === "PENDING"
              ? "orange"
              : event.status === "APPROVED"
              ? "green"
              : event.status === "COMPLETED"
              ? "blue"
              : "gray",

          extendedProps: {
            ...event.extendedProps,
            status: event.status,
          },
        }))}
        eventClick={handleEventClick}
        height="80vh"
      />

      {selectedEvent && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "white",
              width: 420,
              padding: 25,
              borderRadius: 12,
              boxShadow:
                "0 5px 15px rgba(0,0,0,0.3)",
            }}
          >
            <h2>Appointment Details</h2>

            <hr />

            <p>
              <strong>Customer:</strong>{" "}
              {selectedEvent.title}
            </p>

            <p>
              <strong>Service:</strong>{" "}
              {selectedEvent.extendedProps.service}
            </p>

            <p>
              <strong>Phone:</strong>{" "}
              {selectedEvent.extendedProps.phone}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {new Date(
                selectedEvent.start
              ).toLocaleString()}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {selectedEvent.extendedProps.status}
            </p>

            <p>
              <strong>Notes:</strong>{" "}
              {selectedEvent.extendedProps.notes ||
                "No notes"}
            </p>

            <div
              style={{
                marginTop: 20,
                display: "flex",
                gap: 10,
                flexWrap: "wrap",
              }}
            >
              {selectedEvent.extendedProps
                .status === "PENDING" && (
                <>
                  <button
                    disabled={loading}
                    onClick={() =>
                      updateStatus("APPROVED")
                    }
                  >
                    Approve
                  </button>

                  <button
                    disabled={loading}
                    onClick={() =>
                      updateStatus("CANCELLED")
                    }
                  >
                    Cancel
                  </button>
                </>
              )}

              {selectedEvent.extendedProps
                .status === "APPROVED" && (
                <>
                  <button
                    disabled={loading}
                    onClick={() =>
                      updateStatus("COMPLETED")
                    }
                  >
                    Complete
                  </button>

                  <button
                    disabled={loading}
                    onClick={() =>
                      updateStatus("CANCELLED")
                    }
                  >
                    Cancel
                  </button>
                </>
              )}

              <button
                disabled={loading}
                onClick={() =>
                  setSelectedEvent(null)
                }
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}