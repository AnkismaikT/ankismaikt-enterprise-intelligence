import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import Sidebar from "./Sidebar";
import LogoutButton from "@/app/components/LogoutButton";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  // 1️⃣ Get session (SERVER-SIDE)
  const session = await getServerSession(authOptions);

  // 2️⃣ Block unauthenticated users
  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  // 3️⃣ Fetch user + organization
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      organization: true,
    },
  });

  if (!user || !user.organization) {
    throw new Error("Organization not found");
  }

  // 4️⃣ Plan logic
  const plan = user.organization.plan; // "starter" | "growth"
  const isGrowth = plan === "growth";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ================= HEADER ================= */}
      <header className="flex items-center justify-between border-b bg-white px-6 py-4">
        {/* App Title */}
        <h1 className="text-xl font-semibold text-gray-900">
          AnkismaikT Enterprise Intelligence
        </h1>

        {/* Right Side: Plan + Logout */}
        <div className="flex items-center gap-4">
          {/* Plan Badge */}
          <div
            className={`rounded-full px-4 py-1 text-sm font-semibold ${
              isGrowth
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            Plan: {isGrowth ? "Growth ✅" : "Starter 🔒"}
          </div>

          {/* Logout Button */}
          <LogoutButton />
        </div>
      </header>

      {/* ================= BODY ================= */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar plan={isGrowth ? "growth" : "starter"} />

        {/* Page Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}

