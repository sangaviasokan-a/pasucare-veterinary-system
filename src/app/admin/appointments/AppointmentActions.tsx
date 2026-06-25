"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AppointmentActions({
  id,
}: {
  id: string;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function updateStatus(status: string) {
    setLoading(true);

    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to update");
      }

      router.refresh(); // Refresh server components
    } catch (error) {
      console.error(error);
      alert("Failed to update appointment");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <button
        disabled={loading}
        onClick={() => updateStatus("APPROVED")}
      >
        Approve
      </button>

      <button
        disabled={loading}
        onClick={() => updateStatus("REJECTED")}
      >
        Reject
      </button>

      <button
        disabled={loading}
        onClick={() => updateStatus("CANCELLED")}
      >
        Cancel
      </button>

      <button
        disabled={loading}
        onClick={() => updateStatus("COMPLETED")}
      >
        Complete
      </button>
    </div>
  );
}