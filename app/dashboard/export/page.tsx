import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import ComingSoonButton from "@/app/components/ComingSoonButton";

export default async function ExportPage() {
  // 🔐 SERVER PROTECTION
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { organization: true },
  });

  if (!user) redirect("/login");

  const isStarter = user.organization.plan !== "growth";

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-semibold">Export & Downloads</h1>

      {isStarter ? (
        <div className="rounded border border-yellow-300 bg-yellow-50 p-4 text-sm">
          🔒 <b>Growth feature</b>
          <br />
          Exporting reports and data is available on the Growth plan.
        </div>
      ) : (
        <div className="rounded border p-4">
          <p className="mb-4 text-gray-600">
            Export your reports and data.
          </p>

          <div className="flex gap-2">
            <ComingSoonButton label="Export CSV" />
            <ComingSoonButton label="Export PDF" />
          </div>
        </div>
      )}
    </div>
  );
}

