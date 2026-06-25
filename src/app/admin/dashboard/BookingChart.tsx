"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

type Data = {
  month: string;
  bookings: number;
};

export default function BookingChart({
  data,
}: {
  data: Data[];
}) {
  return (
    <div
      style={{
        marginTop: 40,
        border: "1px solid #ddd",
        borderRadius: 12,
        padding: 20,
      }}
    >
      <h2>Monthly Booking Trends</h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="bookings"
            stroke="#2563eb"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}