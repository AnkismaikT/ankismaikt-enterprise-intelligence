export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 px-6 py-8">
      {/* Container */}
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            AnkismaikT Enterprise Intelligence
          </h1>
          <p className="mt-2 text-gray-600 max-w-2xl">
            Executive command center for performance, insights, and decisions
          </p>

          <div className="mt-4 inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
            ● Live data • Updated moments ago
          </div>
        </div>

        {/* KPI Cards */}
        <section className="mb-12">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">
              Key Performance Indicators
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Revenue",
                value: "₹12.4L",
                change: "+14%",
                color: "from-indigo-500 to-indigo-600",
                icon: "₹",
              },
              {
                title: "Cost",
                value: "₹7.1L",
                change: "-6%",
                color: "from-rose-500 to-rose-600",
                icon: "↓",
              },
              {
                title: "Profit",
                value: "₹5.3L",
                change: "+22%",
                color: "from-emerald-500 to-emerald-600",
                icon: "↑",
              },
              {
                title: "Growth",
                value: "+18%",
                change: "QoQ",
                color: "from-amber-500 to-amber-600",
                icon: "↗",
              },
            ].map((card) => (
              <div
                key={card.title}
                className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${card.color} p-6 text-white shadow-lg transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm opacity-90">{card.title}</p>
                  <span className="text-xl opacity-80">{card.icon}</span>
                </div>

                <p className="mt-4 text-3xl font-semibold">{card.value}</p>
                <p className="mt-1 text-sm opacity-90">
                  {card.change}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Intelligence Section */}
        <section className="mb-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">
                Performance Trend
              </h2>
              <span className="text-sm text-gray-500">Last 30 days</span>
            </div>

            <div className="flex h-64 items-center justify-center rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 text-gray-500">
              Interactive chart coming soon
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
            <h2 className="mb-4 text-lg font-semibold text-gray-800">
              Alerts & Insights
            </h2>

            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-yellow-500">⚠</span>
                <span>Revenue dipped in North region</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600">✔</span>
                <span>Cost efficiency improved by 6%</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">📈</span>
                <span>Marketing ROI increased</span>
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
            <span className="text-sm text-gray-500">
              Confidence: High
            </span>
          </div>

          <ul className="space-y-4 text-sm text-gray-700">
            <li>→ Increase inventory for top-selling SKU (Impact: +₹42L)</li>
            <li>→ Reduce ad spend on low ROI campaigns</li>
            <li>→ Review supplier contracts for cost savings</li>
          </ul>
        </section>
      </div>
    </main>
  );
}

