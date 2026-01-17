"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

type Row = {
  month: string;
  revenue: number;
  cost: number;
};

export default function SalesAnalyticsPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  /* ================= CSV UPLOAD ================= */
  function handleCSV(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.trim().split("\n").slice(1);

      const parsed: Row[] = lines.map((l) => {
        const [month, revenue, cost] = l.split(",");
        return {
          month,
          revenue: Number(revenue),
          cost: Number(cost),
        };
      });

      setRows(parsed);
    };
    reader.readAsText(file);
  }

  /* ================= KPIs ================= */
  const totalRevenue = rows.reduce((s, r) => s + r.revenue, 0);
  const totalCost = rows.reduce((s, r) => s + r.cost, 0);
  const margin =
    totalRevenue > 0
      ? (((totalRevenue - totalCost) / totalRevenue) * 100).toFixed(1)
      : "0";

  /* ================= UI ================= */
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Sales Analytics
          </h1>
          <p className="text-slate-600">
            CFO view of revenue, cost, and margin trends
          </p>
        </div>

        {/* FILTER BAR */}
        <div className="rounded-xl border bg-white p-4 grid gap-4 md:grid-cols-5">
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="rounded border px-3 py-2"
          />
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="rounded border px-3 py-2"
          />

          <div className="md:col-span-2">
            <label className="block text-sm text-slate-500 mb-1">
              Upload CSV
            </label>
            <input
              type="file"
              accept=".csv"
              onChange={(e) =>
                e.target.files && handleCSV(e.target.files[0])
              }
              className="w-full text-sm"
            />
          </div>

          <button className="rounded bg-black text-white px-4 py-2 self-end">
            Apply
          </button>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <KPI label="Total Revenue (₹ Cr)" value={totalRevenue.toFixed(1)} />
          <KPI label="Total Cost (₹ Cr)" value={totalCost.toFixed(1)} />
          <KPI label="Margin %" value={`${margin}%`} />
        </div>

        {/* EXECUTIVE SIGNALS */}
        <div className="rounded-xl border bg-white p-6 space-y-4">
          <h2 className="text-lg font-semibold">
            Executive Sales Signals
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            <Signal
              label="Revenue Trend"
              value={rows.length ? "Growing" : "No Data"}
              status={rows.length ? "positive" : "neutral"}
            />
            <Signal
              label="Cost Trend"
              value={
                totalCost / (totalRevenue || 1) > 0.65
                  ? "Rising Fast"
                  : "Controlled"
              }
              status={
                totalCost / (totalRevenue || 1) > 0.65
                  ? "warning"
                  : "positive"
              }
            />
            <Signal
              label="Margin Pressure"
              value={Number(margin) < 30 ? "High" : "Moderate"}
              status={Number(margin) < 30 ? "warning" : "positive"}
            />
          </div>

          <p className="text-sm text-slate-700">
            <strong>CFO insight:</strong> Costs are rising faster than
            revenue, resulting in sustained margin compression.
          </p>
        </div>

        {/* CHART */}
        <div className="rounded-xl border bg-white p-6">
          <h3 className="mb-3 font-semibold">Revenue vs Cost Trend</h3>

          {rows.length === 0 ? (
            <p className="text-sm text-slate-500">
              Upload a CSV to view charts.
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={rows}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#4f46e5"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="cost"
                  stroke="#ef4444"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </main>
  );
}

/* ================= COMPONENTS ================= */
function KPI({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border bg-white p-6">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
}

function Signal({
  label,
  value,
  status,
}: {
  label: string;
  value: string;
  status: "positive" | "warning" | "neutral";
}) {
  const color =
    status === "positive"
      ? "text-emerald-600"
      : status === "warning"
      ? "text-amber-600"
      : "text-slate-600";

  return (
    <div className="rounded-lg border p-4">
      <p className="text-sm text-slate-500">{label}</p>
      <p className={`mt-1 font-semibold ${color}`}>{value}</p>
    </div>
  );
}

