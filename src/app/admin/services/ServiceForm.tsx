"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Service = {
  id: string;
  title: string;
  description: string | null;
  duration: number;
  active: boolean;
};

export default function ServiceForm({
  service,
}: {
  service: Service;
}) {
  const router = useRouter();

  const [title, setTitle] = useState(service.title);
  const [description, setDescription] = useState(
    service.description || ""
  );
  const [duration, setDuration] = useState(
    service.duration.toString()
  );
  const [active, setActive] = useState(service.active);
  const [loading, setLoading] = useState(false);

  async function updateService() {
    setLoading(true);

    try {
      const res = await fetch(`/api/services/${service.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          duration: Number(duration),
          active,
        }),
      });

      if (!res.ok) {
        throw new Error("Update failed");
      }

      alert("Service updated successfully");

      router.push("/admin/services");
      router.refresh();

    } catch (error) {
      console.error(error);
      alert("Failed to update service");
    }

    setLoading(false);
  }

  async function deleteService() {
    const confirmDelete = confirm(
      "Are you sure you want to delete this service?"
    );

    if (!confirmDelete) {
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`/api/services/${service.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Delete failed");
      }

      alert("Service deleted");

      router.push("/admin/services");
      router.refresh();

    } catch (error) {
      console.error(error);
      alert("Failed to delete service");
    }

    setLoading(false);
  }

  return (
    <div>
      <div>
        <label>Title</label>
        <br />
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <br />

      <div>
        <label>Description</label>
        <br />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <br />

      <div>
        <label>Duration (minutes)</label>
        <br />
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
      </div>

      <br />

      <div>
        <label>
          <input
            type="checkbox"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
          />
          Active
        </label>
      </div>

      <br />

      <div style={{ display: "flex", gap: 10 }}>
        <button
          disabled={loading}
          onClick={updateService}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>

        <button
          disabled={loading}
          onClick={deleteService}
        >
          Delete Service
        </button>
      </div>
    </div>
  );
}