"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Availability = {
  id: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  enabled: boolean;
};

export default function AvailabilityForm({
  availability,
}: {
  availability: Availability;
}) {
  const router = useRouter();

  const [startTime, setStartTime] = useState(
    availability.startTime
  );

  const [endTime, setEndTime] = useState(
    availability.endTime
  );

  const [enabled, setEnabled] = useState(
    availability.enabled
  );

  const [loading, setLoading] = useState(false);

  async function updateAvailability() {
    setLoading(true);

    try {
      const res = await fetch(
        `/api/availability/${availability.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            startTime,
            endTime,
            enabled,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update");
      }

      alert("Availability updated successfully");

      router.push("/admin/availability");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to update availability");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div>
        <label>Start Time</label>
        <br />

        <input
          type="time"
          value={startTime}
          onChange={(e) =>
            setStartTime(e.target.value)
          }
        />
      </div>

      <br />

      <div>
        <label>End Time</label>
        <br />

        <input
          type="time"
          value={endTime}
          onChange={(e) =>
            setEndTime(e.target.value)
          }
        />
      </div>

      <br />

      <div>
        <label>
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) =>
              setEnabled(e.target.checked)
            }
          />
          Enabled
        </label>
      </div>

      <br />

      <button
        disabled={loading}
        onClick={updateAvailability}
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}