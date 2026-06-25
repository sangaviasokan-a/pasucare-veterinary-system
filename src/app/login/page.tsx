"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/admin/dashboard",
    });
  }

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 450,
          background: "#ffffff",
          padding: 45,
          borderRadius: 25,
          boxShadow: "0 15px 40px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: 35,
          }}
        >
          <div
            style={{
              fontSize: 55,
              marginBottom: 15,
            }}
          >
            🐄
          </div>

          <h1
            style={{
              margin: 0,
              color: "#2563eb",
              fontSize: 34,
            }}
          >
            PasuCare
          </h1>

          <p
            style={{
              color: "#64748b",
              marginTop: 10,
              fontSize: 16,
            }}
          >
            Veterinary Appointment Management
          </p>
        </div>

        <h2
          style={{
            textAlign: "center",
            marginBottom: 30,
          }}
        >
          Admin Login
        </h2>

        <div style={{ marginBottom: 20 }}>
          <label
            style={{
              display: "block",
              marginBottom: 8,
              fontWeight: 600,
            }}
          >
            Email Address
          </label>

          <input
            type="email"
            placeholder="admin@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: 15,
              borderRadius: 12,
              border: "1px solid #cbd5e1",
              fontSize: 16,
            }}
          />
        </div>

        <div style={{ marginBottom: 30 }}>
          <label
            style={{
              display: "block",
              marginBottom: 8,
              fontWeight: 600,
            }}
          >
            Password
          </label>

          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: 15,
              borderRadius: 12,
              border: "1px solid #cbd5e1",
              fontSize: 16,
            }}
          />
        </div>

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: 16,
            borderRadius: 14,
            fontSize: 17,
            fontWeight: "bold",
          }}
        >
          Login to Dashboard
        </button>

        <p
          style={{
            textAlign: "center",
            marginTop: 25,
            color: "#64748b",
            fontSize: 14,
          }}
        >
          Secure access for veterinary administrators
        </p>
      </div>
    </div>
  );
}