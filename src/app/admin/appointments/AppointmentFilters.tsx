"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function AppointmentFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function updateQuery(key: string, value: string) {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.push(`/admin/appointments?${params.toString()}`);
  }

  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        marginBottom: 20,
        flexWrap: "wrap",
      }}
    >
      {/* Search */}
      <input
        type="text"
        placeholder="Search name or phone"
        defaultValue={searchParams.get("search") || ""}
        onChange={(e) =>
          updateQuery("search", e.target.value)
        }
        style={{
          padding: 8,
          width: 250,
        }}
      />

      {/* Status Filter */}
      <select
        defaultValue={searchParams.get("status") || ""}
        onChange={(e) =>
          updateQuery("status", e.target.value)
        }
        style={{
          padding: 8,
        }}
      >
        <option value="">All Status</option>
        <option value="PENDING">Pending</option>
        <option value="APPROVED">Approved</option>
        <option value="COMPLETED">Completed</option>
        <option value="CANCELLED">Cancelled</option>
      </select>

      {/* Date From */}
      <input
        type="date"
        defaultValue={searchParams.get("from") || ""}
        onChange={(e) =>
          updateQuery("from", e.target.value)
        }
        style={{
          padding: 8,
        }}
      />

      {/* Date To */}
      <input
        type="date"
        defaultValue={searchParams.get("to") || ""}
        onChange={(e) =>
          updateQuery("to", e.target.value)
        }
        style={{
          padding: 8,
        }}
      />
    </div>
  );
}