"use client";

// app/dashboard/financial/page.tsx

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* 🔐 INTELLIGENCE ENGINE IMPORT */
import {
  detectSignals,
  generateInsights,
  buildScenarios,
  computeConfidence,
} from "@/lib/intelligence";

/* EXISTING CHART DATA (UNCHANGED) */
const chartData = [
  { month: "Jan", revenue: 8.2, cost: 5.1 },
  { month: "Feb", revenue: 9.4, cost: 5.6 },
  { month: "Mar", revenue: 10.1, cost: 6.0 },
  { month: "Apr", revenue: 11.2, cost: 6.4 },
  { month: "May", revenue: 12.4, cost: 7.1 },
];

export default function Page() {
  /* ===================== DERIVED METRICS ===================== */
  const revenueTrendPct = 18;
  const costTrendPct = 24;
  const marginTrendPct = -1.2;
  const topRegionDependencyPct = 48;
  const totalRevenue = 12.4;

  /* ===================== INTELLIGENCE ENGINE ===================== */
  const signals = detectSignals({
    revenueTrendPct,
    costTrendPct,
    marginTrendPct,
    topRegionDependencyPct,
  });

  const insights = generateInsights(signals);

  const scenarios = buildScenarios({
    marginExposureCr: totalRevenue * 0.3,
  });

  const confidence = computeConfidence({
    dataCompletenessPct: 92,
    trendConsistencyPct: 78,
  });

  const primaryInsight = insights[0];

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
              { title: "Revenue", value: "₹12.4L", change: "+14%", trend: "▲", status: "On Track", icon: "💰", color: "from-indigo-500 to-indigo-600" },
              { title: "Cost", value: "₹7.1L", change: "-6%", trend: "▼", status: "Improving", icon: "📉", color: "from-rose-500 to-rose-600" },
              { title: "Profit", value: "₹5.3L", change: "+22%", trend: "▲", status: "Strong", icon: "📈", color: "from-emerald-500 to-emerald-600" },
              { title: "Growth", value: "+18%", change: "QoQ", trend: "▲", status: "Accelerating", icon: "🚀", color: "from-amber-500 to-amber-600" },
            ].map((card) => (
              <div key={card.title} className={`rounded-2xl bg-gradient-to-r ${card.color} p-6 text-white shadow-lg`}>
                <div className="flex items-center justify-between">
                  <p className="text-sm opacity-90">{card.title}</p>
                  <span className="text-xl">{card.icon}</span>
                </div>
                <p className="mt-4 text-3xl font-semibold">{card.value}</p>
                <div className="mt-3 flex items-center justify-between text-sm opacity-90">
                  <span>{card.trend} {card.change}</span>
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
                <LineChart data={chartData}>
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(v) => `₹${v}L`} />
                  <Tooltip />
                  <Line type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={3} />
                  <Line type="monotone" dataKey="cost" stroke="#ef4444" strokeWidth={3} />
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
              {signals.map((s) => (
                <li key={s.id} className="flex gap-3">
                  <span className="h-2 w-2 mt-2 rounded-full bg-red-500" />
                  {s.title}
                </li>
              ))}
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
              <p className="font-medium text-gray-900 dark:text-slate-100">Emerging Risk</p>
              <p className="mt-1">{primaryInsight?.headline}</p>
            </div>

            <div>
              <p className="font-medium text-gray-900 dark:text-slate-100">Why this matters</p>
              <p className="mt-1">{primaryInsight?.whyThisMatters}</p>
            </div>

            <div>
              <p className="font-medium text-gray-900 dark:text-slate-100">Recommended decision</p>
              <p className="mt-1">{primaryInsight?.recommendedDecision}</p>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-emerald-50 dark:bg-emerald-950/40 px-4 py-3">
              <div>
                <p className="font-medium text-emerald-900 dark:text-emerald-200">
                  Estimated financial impact
                </p>
                <p className="text-emerald-800 dark:text-emerald-300">
                  {scenarios.stabilization.estimatedImpact}
                </p>
              </div>
              <span className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white">
                Confidence: {confidence}
              </span>
            </div>
          </div>
        </section>

        {/* ================= DECISIONS ================= */}
        <section className="rounded-2xl bg-white dark:bg-slate-900 p-6 ring-1 ring-gray-200 dark:ring-slate-800">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-slate-200">
              Recommended Decisions
            </h2>
            <span className="rounded-full bg-emerald-50 dark:bg-emerald-950 px-3 py-1 text-sm font-medium text-emerald-700 dark:text-emerald-300">
              Confidence: {confidence}
            </span>
          </div>

          <ul className="space-y-4 text-sm">
            <li>→ {primaryInsight?.recommendedDecision}</li>
            <li>→ Reallocate ad spend from low ROI campaigns</li>
            <li>→ Renegotiate supplier contracts</li>
          </ul>
        </section>

      </div>
    </main>
  );
}

