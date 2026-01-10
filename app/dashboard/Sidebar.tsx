import Link from "next/link";

export default function Sidebar({
  plan,
}: {
  plan: "starter" | "growth";
}) {
  const isGrowth = plan === "growth";

  const navItems = [
    { label: "Dashboard", href: "/dashboard", always: true },
    { label: "Insights", href: "/dashboard/insights", growth: true },
    { label: "KPIs", href: "/dashboard/kpis", growth: true },
    { label: "Export", href: "/dashboard/export", growth: true },
  ];

  return (
    <aside className="flex h-[calc(100vh-64px)] w-64 flex-col border-r bg-white p-4">
      {/* Navigation */}
      <nav className="space-y-2">
        {navItems.map((item) => {
          const locked = item.growth && !isGrowth;

          if (locked) {
            return (
              <div
                key={item.label}
                title="Upgrade to Growth to unlock this feature"
                className="cursor-not-allowed rounded px-3 py-2 text-sm text-gray-400"
              >
                🔒 {item.label}
              </div>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              className="block rounded px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Upgrade CTA */}
      {!isGrowth && (
        <div className="mt-6 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white shadow-sm">
          <div className="text-sm font-semibold">
            Unlock Growth Features
          </div>
          <p className="mt-1 text-xs opacity-90">
            Get access to Insights, KPIs, and advanced exports.
          </p>
          <div
            title="Growth onboarding will be enabled soon"
            className="mt-3 cursor-not-allowed rounded-lg bg-white/20 px-3 py-2 text-center text-sm font-semibold"
          >
            🚀 Start Growth Onboarding
          </div>
        </div>
      )}
    </aside>
  );
}

