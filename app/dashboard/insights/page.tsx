export default function InsightsPage() {
  const insights = [
    {
      title: "Revenue Trend Analysis",
      description:
        "Identify revenue growth or decline patterns across time periods and business units.",
      icon: "📈",
    },
    {
      title: "Cost Leakage Detection",
      description:
        "Highlight unexpected cost spikes and inefficiencies impacting profitability.",
      icon: "⚠️",
    },
    {
      title: "KPI Health Summary",
      description:
        "Overall health check of critical KPIs with early warning signals.",
      icon: "🧮",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Insights</h2>
        <p className="mt-1 text-sm text-gray-600">
          Advanced business insights generated from your organization’s data.
        </p>
      </div>

      {/* Insight Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {insights.map((insight) => (
          <div
            key={insight.title}
            className="group relative flex flex-col justify-between rounded-xl border bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
          >
            {/* Locked badge */}
            <span className="absolute right-4 top-4 rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
              🔒 Locked
            </span>

            {/* Content */}
            <div>
              <div className="text-2xl">{insight.icon}</div>

              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                {insight.title}
              </h3>

              <p className="mt-2 text-sm text-gray-600">
                {insight.description}
              </p>

              {/* Blurred preview */}
              <div className="mt-4 rounded bg-gray-100 p-3 text-xs text-gray-500 blur-sm">
                Sample analytics output preview…
              </div>
            </div>

            {/* CTA (Server-safe) */}
            <div
              title="This feature will be enabled during onboarding"
              className="mt-6 inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white opacity-80"
            >
              🔓 Unlock during onboarding
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

