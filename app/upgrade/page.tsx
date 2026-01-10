export default function UpgradePage() {
  const features = [
    {
      title: "Advanced Business Insights",
      description:
        "Revenue trends, cost leakage detection, and executive-level insights tailored to your organization.",
      icon: "📈",
    },
    {
      title: "Enterprise KPIs",
      description:
        "Track revenue, margins, cash flow, and operational KPIs with early warning signals.",
      icon: "📊",
    },
    {
      title: "Export & Reporting",
      description:
        "Export reports in CSV and PDF formats for board meetings and audits.",
      icon: "📤",
    },
    {
      title: "Priority Onboarding",
      description:
        "Guided onboarding to activate Growth features aligned with your business goals.",
      icon: "🚀",
    },
  ];

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Upgrade to Growth
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          Unlock advanced insights, KPIs, and reporting designed for growing
          enterprises.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="flex gap-4 rounded-xl border bg-white p-6 shadow-sm"
          >
            <div className="text-3xl">{feature.icon}</div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="mt-16 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 p-10 text-center text-white">
        <h2 className="text-2xl font-semibold">
          Ready to unlock Growth features?
        </h2>
        <p className="mt-2 text-sm opacity-90">
          Start onboarding to activate advanced capabilities for your
          organization.
        </p>

        <div
          title="Growth onboarding will be enabled soon"
          className="mx-auto mt-6 inline-flex cursor-not-allowed items-center justify-center rounded-lg bg-white/20 px-6 py-3 text-sm font-semibold"
        >
          🚀 Request Growth Onboarding
        </div>

        <p className="mt-4 text-xs opacity-80">
          No payment required at this stage.
        </p>
      </div>
    </div>
  );
}

