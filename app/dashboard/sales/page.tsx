"use client";

import { useRef, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

/* ================= TYPES ================= */
type Row = {
  month: string;
  revenue: number;
  cost: number;
  sku?: string;
  region?: string;
};

export default function SalesAnalyticsPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  /* FILTER STATE */
  const [selectedRegion, setSelectedRegion] = useState("ALL");
  const [selectedSKU, setSelectedSKU] = useState("ALL");

  /* FILE INPUT REF */
  const fileRef = useRef<HTMLInputElement>(null);

  /* ================= CSV UPLOAD ================= */
  function handleCSV(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;

      const allLines = text.trim().split("\n");
      const headers = allLines[0]
        .split(",")
        .map((h) => h.trim().toLowerCase());
      const lines = allLines.slice(1);

      const parsed: Row[] = lines.map((l) => {
        const values = l.split(",");
        const row: any = {};

        headers.forEach((h, i) => {
          row[h] = values[i];
        });

        return {
          month: row.month,
          revenue: Number(row.revenue),
          cost: Number(row.cost),
          sku: row.sku,
          region: row.region,
        };
      });

      setRows(parsed);
    };
    reader.readAsText(file);
  }

  /* ================= FILTER OPTIONS ================= */
  const regions = Array.from(
    new Set(rows.map((r) => r.region).filter(Boolean))
  ) as string[];

  const skus = Array.from(
    new Set(rows.map((r) => r.sku).filter(Boolean))
  ) as string[];

  const filteredRows = rows.filter((r) => {
    const regionMatch =
      selectedRegion === "ALL" || r.region === selectedRegion;
    const skuMatch = selectedSKU === "ALL" || r.sku === selectedSKU;
    return regionMatch && skuMatch;
  });

  /* ================= KPIs ================= */
  const totalRevenue = filteredRows.reduce((s, r) => s + r.revenue, 0);
  const totalCost = filteredRows.reduce((s, r) => s + r.cost, 0);
  const margin =
    totalRevenue > 0
      ? (((totalRevenue - totalCost) / totalRevenue) * 100).toFixed(1)
      : "0";

  /* ================= SKU ANALYSIS ================= */
  const skuMap: Record<string, number> = {};
  filteredRows
    .filter((r) => r.sku)
    .forEach((r) => {
      const key = r.sku as string;
      skuMap[key] = (skuMap[key] || 0) + r.revenue;
    });

  const skuDependency = Object.entries(skuMap)
    .map(([sku, revenue]) => ({
      sku,
      revenue,
      dependency: totalRevenue
        ? ((revenue / totalRevenue) * 100).toFixed(1)
        : "0",
    }))
    .sort((a, b) => b.revenue - a.revenue);

  /* ================= REGION ANALYSIS ================= */
  const regionMap: Record<string, number> = {};
  filteredRows
    .filter((r) => r.region)
    .forEach((r) => {
      const key = r.region as string;
      regionMap[key] = (regionMap[key] || 0) + r.revenue;
    });

  const regionDependency = Object.entries(regionMap)
    .map(([region, revenue]) => ({
      region,
      revenue,
      dependency: totalRevenue
        ? ((revenue / totalRevenue) * 100).toFixed(1)
        : "0",
    }))
    .sort((a, b) => b.revenue - a.revenue);

  const getRisk = (d: number) =>
    d > 50 ? "HIGH" : d >= 30 ? "MEDIUM" : "LOW";

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
            CFO view of revenue, cost, margin & concentration risk
          </p>
        </div>

        {/* FILTER BAR */}
        <div className="rounded-xl border bg-white p-4 grid gap-4 md:grid-cols-7 items-end">
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

          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="rounded border px-3 py-2"
          >
            <option value="ALL">All Regions</option>
            {regions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>

          <select
            value={selectedSKU}
            onChange={(e) => setSelectedSKU(e.target.value)}
            className="rounded border px-3 py-2"
          >
            <option value="ALL">All SKUs</option>
            {skus.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          {/* HIDDEN FILE INPUT */}
          <input
            ref={fileRef}
            type="file"
            accept=".csv"
            className="hidden"
            onChange={(e) =>
              e.target.files && handleCSV(e.target.files[0])
            }
          />

          <button
            onClick={() => fileRef.current?.click()}
            className="rounded-lg bg-indigo-600 text-white px-4 py-2 font-medium"
          >
            Upload CSV
          </button>

          <button className="rounded-lg bg-black text-white px-4 py-2 font-medium">
            Apply
          </button>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <KPI label="Total Revenue (₹ Cr)" value={totalRevenue.toFixed(1)} />
          <KPI label="Total Cost (₹ Cr)" value={totalCost.toFixed(1)} />
          <KPI label="Margin %" value={`${margin}%`} />
        </div>

        {/* CHART */}
        <div className="rounded-xl border bg-white p-6">
          <h3 className="mb-3 font-semibold">Revenue vs Cost Trend</h3>

          {filteredRows.length === 0 ? (
            <p className="text-sm text-slate-500">
              Upload a CSV to view charts.
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={filteredRows}>
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

        {/* SKU TABLE */}
        {skuDependency.length > 0 && (
          <div className="rounded-xl border bg-white p-6">
            <h3 className="font-semibold mb-3">
              SKU Revenue Dependency & Risk
            </h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="py-2">SKU</th>
                  <th className="py-2">Revenue</th>
                  <th className="py-2">Dependency %</th>
                  <th className="py-2">Risk</th>
                </tr>
              </thead>
              <tbody>
                {skuDependency.map((s) => {
                  const risk = getRisk(Number(s.dependency));
                  return (
                    <tr key={s.sku} className="border-b last:border-none">
                      <td className="py-2 font-medium">{s.sku}</td>
                      <td className="py-2">
                        ₹{s.revenue.toLocaleString()}
                      </td>
                      <td className="py-2">{s.dependency}%</td>
                      <td className="py-2">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            risk === "HIGH"
                              ? "bg-red-100 text-red-700"
                              : risk === "MEDIUM"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {risk}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* REGION TABLE */}
        {regionDependency.length > 0 && (
          <div className="rounded-xl border bg-white p-6">
            <h3 className="font-semibold mb-3">
              Region Revenue Concentration & Risk
            </h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="py-2">Region</th>
                  <th className="py-2">Revenue</th>
                  <th className="py-2">Dependency %</th>
                  <th className="py-2">Risk</th>
                </tr>
              </thead>
              <tbody>
                {regionDependency.map((r) => {
                  const risk = getRisk(Number(r.dependency));
                  return (
                    <tr key={r.region} className="border-b last:border-none">
                      <td className="py-2 font-medium">{r.region}</td>
                      <td className="py-2">
                        ₹{r.revenue.toLocaleString()}
                      </td>
                      <td className="py-2">{r.dependency}%</td>
                      <td className="py-2">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            risk === "HIGH"
                              ? "bg-red-100 text-red-700"
                              : risk === "MEDIUM"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {risk}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
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

