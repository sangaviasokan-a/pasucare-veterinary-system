import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menuStyle = {
    display: "flex",
    alignItems: "center",
    gap: 15,
    padding: "18px 22px",
    background: "#ffffff",
    borderRadius: 18,
    border: "1px solid #e2e8f0",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    textDecoration: "none",
    color: "#0f172a",
    fontSize: 20,
    fontWeight: 600,
    marginBottom: 20,
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f8fafc",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: 320,
          background: "#ffffff",
          padding: 30,
          borderRight: "1px solid #e2e8f0",
          boxShadow: "4px 0 20px rgba(0,0,0,0.05)",
        }}
      >
        {/* Logo */}
        <div
          style={{
            marginBottom: 50,
          }}
        >
          <h1
            style={{
              color: "#2563eb",
              fontSize: 38,
              marginBottom: 5,
            }}
          >
            🐄 PasuCare
          </h1>

          <p
            style={{
              color: "#64748b",
              fontSize: 16,
            }}
          >
            Care for Every Cow
          </p>
        </div>

        <nav>
          <Link
            href="/admin/dashboard"
            style={{
              ...menuStyle,
              background: "#eff6ff",
              color: "#2563eb",
              border: "2px solid #bfdbfe",
            }}
          >
            🏠 Dashboard
          </Link>

          <Link
            href="/admin/appointments"
            style={menuStyle}
          >
            📅 Appointments
          </Link>

          <Link
            href="/admin/services"
            style={menuStyle}
          >
            🩺 Services
          </Link>

          <Link
            href="/admin/availability"
            style={menuStyle}
          >
            🕒 Availability
          </Link>

          <Link
            href="/admin/calendar"
            style={menuStyle}
          >
            🗓️ Calendar
          </Link>

          <Link
            href="/admin/notifications"
            style={menuStyle}
          >
            🔔 Notifications
          </Link>

          <Link
            href="/admin/reports"
            style={menuStyle}
          >
            📊 Reports
          </Link>

          <button
            style={{
              width: "100%",
              marginTop: 40,
              padding: "18px",
              background: "#fef2f2",
              color: "#ef4444",
              border: "1px solid #fecaca",
              borderRadius: 18,
              fontSize: 22,
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            🚪 Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          padding: 40,
        }}
      >
        {children}
      </main>
    </div>
  );
}