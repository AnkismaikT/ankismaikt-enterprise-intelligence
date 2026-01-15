export default function InsightsPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Insights
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Risks */}
        <section className="rounded-xl bg-white dark:bg-slate-900 p-5 ring-1 ring-red-200 dark:ring-red-900">
          <h2 className="font-semibold text-red-700 dark:text-red-300 mb-3">
            High Risk
          </h2>
          <ul className="space-y-2 text-sm">
            <li>Revenue concentration in top 2 clients</li>
            <li>Margin pressure in logistics segment</li>
          </ul>
        </section>

        {/* Warnings */}
        <section className="rounded-xl bg-white dark:bg-slate-900 p-5 ring-1 ring-yellow-200 dark:ring-yellow-900">
          <h2 className="font-semibold text-yellow-700 dark:text-yellow-300 mb-3">
            Warnings
          </h2>
          <ul className="space-y-2 text-sm">
            <li>Marketing CAC trending upward</li>
            <li>Inventory turnover slowing</li>
          </ul>
        </section>

        {/* Opportunities */}
        <section className="rounded-xl bg-white dark:bg-slate-900 p-5 ring-1 ring-emerald-200 dark:ring-emerald-900">
          <h2 className="font-semibold text-emerald-700 dark:text-emerald-300 mb-3">
            Opportunities
          </h2>
          <ul className="space-y-2 text-sm">
            <li>Upsell potential in mid-market accounts</li>
            <li>Supplier renegotiation opportunity</li>
          </ul>
        </section>
      </div>
    </main>
  );
}

