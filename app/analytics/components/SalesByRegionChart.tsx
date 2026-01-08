"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function SalesByRegionChart({ data }: { data: any[] }) {
  const chartData = data.map((r) => ({
    region: r.region,
    sales: r._sum.salesAmount,
  }));

  return (
    <BarChart
      width={450}
      height={260}
      data={chartData}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="region" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="sales" />
    </BarChart>
  );
}

