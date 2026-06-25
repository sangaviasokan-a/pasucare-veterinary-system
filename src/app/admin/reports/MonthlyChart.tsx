"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Data = {
  month: string;
  bookings: number;
};

export default function MonthlyChart({
  data,
}: {
  data: Data[];
}) {
  return (
    <div
      style={{
        width: "100%",
        height: 400,
        marginTop: 20,
      }}
    >
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="month" />

          <YAxis allowDecimals={false} />

          <Tooltip />

          <Bar
            dataKey="bookings"
            fill="#2563eb"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}