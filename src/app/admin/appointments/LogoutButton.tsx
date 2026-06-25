"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      style={{
        marginTop: 20,
        padding: "8px 12px",
        cursor: "pointer",
        background: "black",
        color: "white",
        border: "none",
        borderRadius: 6,
      }}
    >
      Logout
    </button>
  );
}