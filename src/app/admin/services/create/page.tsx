"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateServicePage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch("/api/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          duration,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed");
      }

      alert("Service created successfully");

      router.push("/admin/services");
      router.refresh();

    } catch (error) {
      console.error(error);

      alert("Failed to create service");
    }

    setLoading(false);
  }

  return (
    <div>
      <h1>Create Service</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <br />

          <input
            required
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />
        </div>

        <br />

        <div>
          <label>Description</label>
          <br />

          <textarea
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
          />
        </div>

        <br />

        <div>
          <label>Duration (minutes)</label>
          <br />

          <input
            required
            type="number"
            value={duration}
            onChange={(e) =>
              setDuration(e.target.value)
            }
          />
        </div>

        <br />

        <button disabled={loading}>
          {loading
            ? "Creating..."
            : "Create Service"}
        </button>
      </form>
    </div>
  );
}