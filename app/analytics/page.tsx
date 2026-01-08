"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function SalesAnalyticsPage() {
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    from: "2025-12-01",
    to: "2025-12-31",
    region: "",
    sku: "",
  });

  const [kpis, setKpis] = useState({
    totalRevenue: 0,
    unitsSold: 0,
    records: 0,
  });

  const [byRegion, setByRegion] = useState<any[]>([]);
  const [byDate, setByDate] = useState<any[]>([]);

  async function applyFilters() {
    setLoading(true);

    const params = new URLSearchParams(filters as any).toString();
    const res = await fetch(`/api/sales?${params}`);
    const data = await res.json();

    setKpis(data.kpis);
    setByRegion(data.byRegion);
    setByDate(data.byDate);

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div>
          <h1 className="text-3xl font-semibold">Sales Analytics</h1>
          <p className="text-zinc-500">Filter and analyze your sales data</p>
        </div>

        {/* Filters */}
        <div className="rounded-xl border bg-white p-6 space-y-4">
          <input
            type="date"
            className="w-full rounded-md border px-4 py-2"
            value={filters.from}
            onChange={(e) =>
              setFilters({ ...filters, from: e.target.value })
            }
          />

          <input
            type="date"
            className="w-full rounded-md border px-4 py-2"
            value={filters.to}
            onChange={(e) => setFilters({ ...filters, to: e.target.value })}
          />

          <select
            className="w-full rounded-md border px-4 py-2"
            value={filters.region}
            onChange={(e) =>
              setFilters({ ...filters, region: e.target.value })
            }
          >
            <option value="">All Regions</option>
            <option>North</option>
            <option>South</option>
            <option>East</option>
            <option>West</option>
          </select>

          <select
            className="w-full rounded-md border px-4 py-2"
            value={filters.sku}
            onChange={(e) => setFilters({ ...filters, sku: e.target.value })}
          >
            <option value="">All SKUs</option>
            <option>SKU-001</option>
            <option>SKU-002</option>
            <option>SKU-003</option>
          </select>

          <button
            onClick={applyFilters}
            className="rounded-md bg-black px-4 py-2 text-white"
          >
            {loading ? "Loading..." : "Apply"}
          </button>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <KPI title="Total Revenue" value={`₹${kpis.totalRevenue}`} />
          <KPI title="Units Sold" value={`${kpis.unitsSold}`} />
          <KPI title="Records" value={`${kpis.records}`} />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ChartCard title="Sales by Region">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={byRegion}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="region" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#000000" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Sales Over Time">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={byDate}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#2563eb"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>
    </div>
  );
}

function KPI({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-xl border bg-white p-6">
      <p className="text-sm text-zinc-500">{title}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </div>
  );
}

function ChartCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border bg-white p-6">
      <h3 className="mb-4 font-medium">{title}</h3>
      {children}
    </div>
  );
}

