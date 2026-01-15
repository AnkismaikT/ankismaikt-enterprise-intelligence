"use client";

// app/dashboard/page.tsx

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type SignalLevel = "high" | "medium" | "low";

const mockSignals: { level: SignalLevel; text: string }[] = [
  { level: "high", text: "Revenue softness detected in North region" },
  { level: "medium", text: "Marketing ROI volatility increasing" },
  { level: "low", text: "Operational cost efficiency improving" },
];

const chartData = [
  { month: "Jan", revenue: 8.2, cost: 5.1 },
  { month: "Feb", revenue: 9.4, cost: 5.6 },
  { month: "Mar", revenue: 10.1, cost: 6.0 },
  { month: "Apr", revenue: 11.2, cost: 6.4 },
  { month: "May", revenue: 12.4, cost: 7.1 },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 px-6 py-8">
      <div className="mx-auto max-w-7xl">

        {/* ================= HEADER ================= */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-slate-100">
            AnkismaikT Enterprise Intelligence
          </h1>
          <p className="mt-2 max-w-2xl text-gray-600 dark:text-slate-400">
            Executive command center for performance, risk, and decisions
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 px-3 py-1 text-sm font-medium">
              ● Live data • Updated 3 mins ago
            </span>
            <span className="inline-flex items-center rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 px-3 py-1 text-sm font-medium">
              Data quality: High
            </span>
          </div>
        </div>

        {/* ================= KPI CARDS ================= */}
        <section className="mb-14">
          <h2 className="mb-6 text-lg font-semibold text-gray-800 dark:text-slate-200">
            Key Performance Indicators
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Revenue",
                value: "₹12.4L",
                change: "+14%",
                trend: "▲",
                status: "On Track",
                icon: "💰",
                color: "from-indigo-500 to-indigo-600",
              },
              {
                title: "Cost",
                value: "₹7.1L",
                change: "-6%",
                trend: "▼",
                status: "Improving",
                icon: "📉",
                color: "from-rose-500 to-rose-600",
              },
              {
                title: "Profit",
                value: "₹5.3L",
                change: "+22%",
                trend: "▲",
                status: "Strong",
                icon: "📈",
                color: "from-emerald-500 to-emerald-600",
              },
              {
                title: "Growth",
                value: "+18%",
                change: "QoQ",
                trend: "▲",
                status: "Accelerating",
                icon: "🚀",
                color: "from-amber-500 to-amber-600",
              },
            ].map((card) => (
              <div
                key={card.title}
                className={`rounded-2xl bg-gradient-to-r ${card.color} p-6 text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm opacity-90">{card.title}</p>
                  <span className="text-xl">{card.icon}</span>
                </div>

                <p className="mt-4 text-3xl font-semibold">
                  {card.value}
                </p>

                <div className="mt-3 flex items-center justify-between text-sm opacity-90">
                  <span>
                    {card.trend} {card.change}
                  </span>
                  <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs">
                    {card.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= PERFORMANCE ================= */}
        <section className="mb-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-2xl bg-white dark:bg-slate-900 p-6 ring-1 ring-gray-200 dark:ring-slate-800">
            <h2 className="mb-3 text-lg font-semibold text-gray-800 dark:text-slate-200">
              Performance Intelligence
            </h2>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                >
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#6B7280", fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#6B7280", fontSize: 12 }}
                    tickFormatter={(v) => `₹${v}L`}
                  />
                  <Tooltip
                    formatter={(value: number) => [`₹${value}L`, ""]}
                    contentStyle={{
                      backgroundColor: "#ffffff",
                      borderRadius: "12px",
                      border: "1px solid #E5E7EB",
                      boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                    }}
                    labelStyle={{ fontWeight: 600 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    name="Revenue"
                    stroke="#4f46e5"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                    isAnimationActive
                  />
                  <Line
                    type="monotone"
                    dataKey="cost"
                    name="Cost"
                    stroke="#ef4444"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                    isAnimationActive
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ================= ALERTS ================= */}
          <div className="rounded-2xl bg-white dark:bg-slate-900 p-6 ring-1 ring-gray-200 dark:ring-slate-800">
            <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-slate-200">
              Alerts & Risks
            </h2>

            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <span className="h-2 w-2 mt-2 rounded-full bg-red-500" />
                Revenue softness in North region
              </li>
              <li className="flex gap-3">
                <span className="h-2 w-2 mt-2 rounded-full bg-emerald-500" />
                Operational cost efficiency improving
              </li>
              <li className="flex gap-3">
                <span className="h-2 w-2 mt-2 rounded-full bg-yellow-500" />
                Marketing ROI volatility detected
              </li>
            </ul>
          </div>
        </section>

        {/* ================= EXECUTIVE INSIGHT ================= */}
        <section className="mb-14 rounded-2xl bg-white dark:bg-slate-900 p-6 ring-1 ring-gray-200 dark:ring-slate-800">
          <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-slate-200">
            Executive Insight
          </h2>

          <div className="space-y-5 text-sm text-gray-700 dark:text-slate-300">
            <div>
              <p className="font-medium text-gray-900 dark:text-slate-100">
                Emerging Risk: Margin Pressure
              </p>
              <p className="mt-1">
                Cost growth has exceeded revenue growth for two consecutive
                months, indicating early signs of operating margin compression.
              </p>
            </div>

            <div>
              <p className="font-medium text-gray-900 dark:text-slate-100">
                Why this matters
              </p>
              <p className="mt-1">
                If the current trend continues, operating margins may decline by
                approximately <strong>1–1.3%</strong> next quarter, directly
                impacting profitability and forecast reliability.
              </p>
            </div>

            <div>
              <p className="font-medium text-gray-900 dark:text-slate-100">
                Early warning signal
              </p>
              <p className="mt-1">
                Operational costs in the North region are trending above
                tolerance thresholds, driven by vendor and overhead expenses.
              </p>
            </div>

            <div>
              <p className="font-medium text-gray-900 dark:text-slate-100">
                Recommended decision
              </p>
              <p className="mt-1">
                Freeze discretionary spending in the North region and initiate
                renegotiation with the top two cost-intensive vendors.
              </p>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-emerald-50 dark:bg-emerald-950/40 px-4 py-3">
              <div>
                <p className="font-medium text-emerald-900 dark:text-emerald-200">
                  Estimated financial impact
                </p>
                <p className="text-emerald-800 dark:text-emerald-300">
                  ₹38L – ₹55L protected over the next 90 days
                </p>
              </div>
              <span className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white">
                Confidence: High
              </span>
            </div>
          </div>
        </section>

        {/* ================= SIGNALS ================= */}
        <section className="mb-14 rounded-2xl bg-white dark:bg-slate-900 p-6 ring-1 ring-gray-200 dark:ring-slate-800">
          <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-slate-200">
            Signals
          </h2>

          <ul className="space-y-3">
            {mockSignals.map((signal, idx) => (
              <li
                key={idx}
                className={`flex items-center justify-between rounded-lg border-l-4 px-4 py-3 ${
                  signal.level === "high"
                    ? "border-red-500 bg-red-50 dark:bg-red-950/30"
                    : signal.level === "medium"
                    ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-950/30"
                    : "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30"
                }`}
              >
                <span className="text-sm text-gray-800 dark:text-slate-200">
                  {signal.text}
                </span>
                <span className="text-xs font-semibold uppercase opacity-70">
                  {signal.level}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* ================= DECISIONS ================= */}
        <section className="rounded-2xl bg-white dark:bg-slate-900 p-6 ring-1 ring-gray-200 dark:ring-slate-800">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-slate-200">
              Recommended Decisions
            </h2>
            <span className="rounded-full bg-emerald-50 dark:bg-emerald-950 px-3 py-1 text-sm font-medium text-emerald-700 dark:text-emerald-300">
              Confidence: High
            </span>
          </div>

          <ul className="space-y-4 text-sm">
            <li>→ Increase inventory for top-selling SKU (Impact: +₹42L)</li>
            <li>→ Reallocate ad spend from low ROI campaigns</li>
            <li>→ Renegotiate supplier contracts</li>
          </ul>
        </section>

      </div>
    </main>
  );
}

