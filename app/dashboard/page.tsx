export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 px-6 py-8 transition-colors">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10">
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

        {/* KPI Cards */}
        <section className="mb-12">
          <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-slate-200">
            Key Performance Indicators
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Revenue", value: "₹12.4L", change: "+14%", color: "from-indigo-500 to-indigo-600" },
              { title: "Cost", value: "₹7.1L", change: "-6%", color: "from-rose-500 to-rose-600" },
              { title: "Profit", value: "₹5.3L", change: "+22%", color: "from-emerald-500 to-emerald-600" },
              { title: "Growth", value: "+18%", change: "QoQ", color: "from-amber-500 to-amber-600" },
            ].map((card) => (
              <div
                key={card.title}
                className={`rounded-2xl bg-gradient-to-r ${card.color} p-6 text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl`}
              >
                <p className="text-sm opacity-90">{card.title}</p>
                <p className="mt-3 text-3xl font-semibold">{card.value}</p>
                <p className="mt-1 text-sm opacity-90">{card.change}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Intelligence */}
        <section className="mb-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-sm ring-1 ring-gray-200 dark:ring-slate-800">
            <h2 className="mb-2 text-lg font-semibold text-gray-800 dark:text-slate-200">
              Performance Intelligence
            </h2>
            <div className="flex h-64 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-gray-600 dark:text-slate-400">
              Variance detected in regional performance
            </div>
          </div>

          <div className="rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-sm ring-1 ring-gray-200 dark:ring-slate-800">
            <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-slate-200">
              Alerts & Risks
            </h2>

            <ul className="space-y-4 text-sm text-gray-700 dark:text-slate-300">
              <li>Revenue softness in North region</li>
              <li>Operational cost efficiency improving</li>
              <li>Marketing ROI volatility detected</li>
            </ul>
          </div>
        </section>

        {/* Decisions */}
        <section className="rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-sm ring-1 ring-gray-200 dark:ring-slate-800">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-slate-200">
              Recommended Decisions
            </h2>
            <span className="rounded-full bg-emerald-50 dark:bg-emerald-950 px-3 py-1 text-sm font-medium text-emerald-700 dark:text-emerald-300">
              Confidence: High
            </span>
          </div>

          <ul className="space-y-4 text-sm text-gray-700 dark:text-slate-300">
            <li>→ Increase inventory for top-selling SKU (Impact: +₹42L)</li>
            <li>→ Reallocate ad spend from low ROI campaigns</li>
            <li>→ Renegotiate supplier contracts</li>
          </ul>
        </section>
      </div>
    </main>
  );
}

