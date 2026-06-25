import "./globals.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navButton = {
    background: "#ffffff",
    color: "#0f172a",
    padding: "12px 22px",
    borderRadius: 14,
    textDecoration: "none",
    fontWeight: 600,
    border: "1px solid #e2e8f0",
    boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
    transition: "all 0.3s ease",
  };

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: "Arial, sans-serif",
          background:
            "linear-gradient(to bottom, #f8fafc, #eef2ff)",
          minHeight: "100vh",
        }}
      >
        {/* Navbar */}
        <nav
          style={{
            background: "#ffffff",
            padding: "20px 60px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow:
              "0 4px 20px rgba(0,0,0,0.08)",
            position: "sticky",
            top: 0,
            zIndex: 100,
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 15,
            }}
          >
            <span style={{ fontSize: 42 }}>
              🐄
            </span>

            <div>
              <div
                style={{
                  color: "#2563eb",
                  fontSize: 34,
                  fontWeight: "bold",
                  lineHeight: 1,
                }}
              >
                PasuCare
              </div>

              <div
                style={{
                  color: "#64748b",
                  fontSize: 14,
                  marginTop: 4,
                }}
              >
                Care for Every Cow
              </div>
            </div>
          </Link>

          {/* Navigation Buttons */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
            }}
          >
            <Link
              href="/"
              style={navButton}
            >
              🏠 Home
            </Link>

            <Link
              href="/book"
              style={navButton}
            >
              📅 Book Appointment
            </Link>

            <Link
              href="/bookings"
              style={navButton}
            >
              📋 My Bookings
            </Link>

            <Link
              href="/login"
              style={{
                background:
                  "linear-gradient(135deg,#2563eb,#1d4ed8)",
                color: "white",
                padding: "12px 24px",
                borderRadius: 14,
                textDecoration: "none",
                fontWeight: "bold",
                boxShadow:
                  "0 8px 20px rgba(37,99,235,0.35)",
              }}
            >
              👤 Admin Login
            </Link>
          </div>
        </nav>

        {/* Main Content */}
        <main
          style={{
            maxWidth: 1400,
            margin: "0 auto",
            padding: "40px 30px",
          }}
        >
          {children}
        </main>

        {/* Footer */}
        <footer
          style={{
            marginTop: 60,
            padding: "25px",
            textAlign: "center",
            color: "#64748b",
            borderTop: "1px solid #e2e8f0",
            background: "#ffffff",
          }}
        >
          © {new Date().getFullYear()} PasuCare •
          Veterinary Appointment System for Cattle
        </footer>
      </body>
    </html>
  );
}