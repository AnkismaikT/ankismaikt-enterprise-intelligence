import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import Sidebar from "./Sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      organization: true,
    },
  });

  if (!user || !user.organization) {
    throw new Error("Organization not found");
  }

  const plan = user.organization.plan; // "starter" | "growth"
  const isGrowth = plan === "growth";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between border-b bg-white px-6 py-4">
        <h1 className="text-xl font-semibold text-gray-900">
          AnkismaikT Enterprise Intelligence
        </h1>

        {/* Plan Badge */}
        <div
          className={`rounded-full px-4 py-1 text-sm font-medium ${
            isGrowth
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          Plan: {isGrowth ? "Growth ✅" : "Starter 🔒"}
        </div>
      </header>

      {/* Body */}
      <div className="flex">
        <Sidebar plan={isGrowth ? "growth" : "starter"} />

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}

