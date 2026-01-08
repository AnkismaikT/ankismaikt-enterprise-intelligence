"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function SalesOverTimeChart({ data }: { data: any[] }) {
  const chartData = data.map((d) => ({
    date: new Date(d.date).toLocaleDateString(),
    sales: d._sum.salesAmount,
  }));

  return (
    <LineChart
      width={450}
      height={260}
      data={chartData}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Line dataKey="sales" strokeWidth={2} />
    </LineChart>
  );
}

