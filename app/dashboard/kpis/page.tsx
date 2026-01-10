import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export default async function KPIsPage() {
  // 🔐 SERVER PROTECTION
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { organization: true },
  });

  if (!user || user.organization.plan !== "growth") {
    redirect("/upgrade");
  }

  // ✅ UI (UNCHANGED)
  const kpis = [
    {
      title: "Revenue KPI Health",
      description:
        "Track revenue performance against targets with early indicators of risk or acceleration.",
      icon: "��",
    },
    {
      title: "Margin & Cost KPIs",
      description:
        "Monitor gross margin, operating margin, and cost efficiency across departments.",
      icon: "📊",
    },
    {
      title: "Cash Flow KPIs",
      description:
        "Understand cash inflows, burn rate, and liquidity position in real time.",
      icon: "💧",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">KPIs</h2>
        <p className="mt-1 text-sm text-gray-600">
          Key performance indicators that measure the financial and operational
          health of your organization.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {kpis.map((kpi) => (
          <div
            key={kpi.title}
            className="group relative flex flex-col justify-between rounded-xl border bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
          >
            <span className="absolute right-4 top-4 rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
              🔒 Locked
            </span>

            <div>
              <div className="text-2xl">{kpi.icon}</div>

              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                {kpi.title}
              </h3>

              <p className="mt-2 text-sm text-gray-600">
                {kpi.description}
              </p>

              <div className="mt-4 rounded bg-gray-100 p-3 text-xs text-gray-500 blur-sm">
                Sample KPI values and trends preview…
              </div>
            </div>

            <div className="mt-6 flex cursor-not-allowed items-center justify-center rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2 text-sm font-semibold text-white opacity-90">
              🔓 Unlock during onboarding
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

