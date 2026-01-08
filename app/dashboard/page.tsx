export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 px-6 py-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            AnkismaikT Enterprise Intelligence
          </h1>
          <p className="mt-2 max-w-2xl text-gray-600">
            Executive command center for performance, risk, and decisions
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
              ● Live data • Updated 3 mins ago
            </span>
            <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
              Data quality: High
            </span>
          </div>
        </div>

        {/* KPI Cards */}
        <section className="mb-12">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">
            Key Performance Indicators
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Revenue",
                value: "₹12.4L",
                change: "+14%",
                signal: "Above baseline",
                color: "from-indigo-500 to-indigo-600",
              },
              {
                title: "Cost",
                value: "₹7.1L",
                change: "-6%",
                signal: "Efficiency improved",
                color: "from-rose-500 to-rose-600",
              },
              {
                title: "Profit",
                value: "₹5.3L",
                change: "+22%",
                signal: "Margin expanding",
                color: "from-emerald-500 to-emerald-600",
              },
              {
                title: "Growth",
                value: "+18%",
                change: "QoQ",
                signal: "Sustained momentum",
                color: "from-amber-500 to-amber-600",
              },
            ].map((card) => (
              <div
                key={card.title}
                className={`rounded-2xl bg-gradient-to-r ${card.color} p-6 text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl`}
              >
                <p className="text-sm opacity-90">{card.title}</p>
                <p className="mt-3 text-3xl font-semibold">{card.value}</p>
                <p className="mt-1 text-sm opacity-90">{card.change}</p>
                <p className="mt-3 text-xs uppercase tracking-wide opacity-80">
                  {card.signal}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Intelligence */}
        <section className="mb-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">
                Performance Intelligence
              </h2>
              <span className="text-sm text-gray-500">Last 30 days</span>
            </div>

            <div className="flex h-64 flex-col items-center justify-center rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 text-gray-600">
              <p className="font-medium">
                Variance detected in regional performance
              </p>
              <p className="mt-1 text-sm text-gray-500">
                North region underperformed baseline by 8%
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
            <h2 className="mb-4 text-lg font-semibold text-gray-800">
              Alerts & Risks
            </h2>

            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-2">
                <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-semibold text-yellow-700">
                  Medium
                </span>
                <span>Revenue softness in North region</span>
              </li>

              <li className="flex items-start gap-2">
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                  Positive
                </span>
                <span>Operational cost efficiency improving</span>
              </li>

              <li className="flex items-start gap-2">
                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
                  Watch
                </span>
                <span>Marketing ROI volatility detected</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Decisions */}
        <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">
              Recommended Decisions
            </h2>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
              Confidence: High
            </span>
          </div>

          <ul className="space-y-4 text-sm text-gray-700">
            <li>
              → Increase inventory for top-selling SKU
              <span className="ml-2 text-xs text-gray-500">
                (Estimated impact: +₹42L)
              </span>
            </li>

            <li>
              → Reallocate ad spend from low ROI campaigns
              <span className="ml-2 text-xs text-gray-500">
                (Risk reduction: Medium)
              </span>
            </li>

            <li>
              → Renegotiate supplier contracts
              <span className="ml-2 text-xs text-gray-500">
                (Margin upside potential)
              </span>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}

