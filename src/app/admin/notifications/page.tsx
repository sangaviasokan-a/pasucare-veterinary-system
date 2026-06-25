import { prisma } from "@/lib/prisma";

export default async function NotificationsPage() {
  const notifications = await prisma.notification.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <h1>Notifications</h1>

      {notifications.length === 0 ? (
        <p>No notifications available.</p>
      ) : (
        notifications.map((notification) => (
          <div
            key={notification.id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <h3>{notification.title}</h3>
            <p>{notification.message}</p>
            <small>
              {new Date(notification.createdAt).toLocaleString()}
            </small>
          </div>
        ))
      )}
    </div>
  );
}