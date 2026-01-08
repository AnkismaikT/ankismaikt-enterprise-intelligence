export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          AnkismaikT Enterprise Intelligence
        </h1>
        <p className="mt-1 text-gray-600">
          Executive overview of business performance & decisions
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-10">
        {[
          { title: "Revenue", value: "₹12.4L", color: "from-indigo-500 to-indigo-600" },
          { title: "Cost", value: "₹7.1L", color: "from-rose-500 to-rose-600" },
          { title: "Profit", value: "₹5.3L", color: "from-emerald-500 to-emerald-600" },
          { title: "Growth", value: "+18%", color: "from-amber-500 to-amber-600" },
        ].map((card) => (
          <div
            key={card.title}
            className={`rounded-2xl p-6 text-white shadow-lg bg-gradient-to-r ${card.color}`}
          >
            <p className="text-sm opacity-90">{card.title}</p>
            <p className="mt-2 text-3xl font-semibold">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Intelligence Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <div className="lg:col-span-2 rounded-2xl bg-white p-6 shadow">
          <h2 className="text-lg font-semibold text-gray-800">
            Performance Trend
          </h2>
          <div className="mt-4 h-64 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-gray-500">
            Chart coming soon
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          <h2 className="text-lg font-semibold text-gray-800">
            Alerts & Insights
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-gray-600">
            <li>⚠️ Revenue dipped in North region</li>
            <li>✅ Cost efficiency improved 6%</li>
            <li>📈 Marketing ROI increased</li>
          </ul>
        </div>
      </div>

      {/* Decisions */}
      <div className="rounded-2xl bg-white p-6 shadow">
        <h2 className="text-lg font-semibold text-gray-800">
          Recommended Decisions
        </h2>
        <ul className="mt-4 space-y-3 text-sm text-gray-700">
          <li>→ Increase inventory for top-selling SKU</li>
          <li>→ Reduce ad spend on low ROI campaigns</li>
          <li>→ Review supplier contract for cost savings</li>
        </ul>
      </div>
    </main>
  );
}

