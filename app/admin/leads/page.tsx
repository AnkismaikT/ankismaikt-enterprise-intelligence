import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

export default async function AdminLeadsPage() {
  const session = await getServerSession(authOptions);

  // 🔐 Admin-only access
  if (!session || session.user?.email !== "pradeepkishan@ankismaikt.com") {
    redirect("/login");
  }

  const leads = await prisma.demoRequest.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-slate-50 p-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Demo Requests
      </h1>

      <div className="overflow-x-auto rounded-xl bg-white shadow ring-1 ring-gray-200">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Company</th>
              <th className="px-4 py-3 text-left">Message</th>
              <th className="px-4 py-3 text-left">Date</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {leads.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-6 text-center text-gray-500"
                >
                  No demo requests yet.
                </td>
              </tr>
            )}

            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">
                  {lead.name}
                </td>
                <td className="px-4 py-3 text-indigo-600">
                  <a href={`mailto:${lead.email}`}>
                    {lead.email}
                  </a>
                </td>
                <td className="px-4 py-3">
                  {lead.company || "-"}
                </td>
                <td className="px-4 py-3 max-w-md truncate">
                  {lead.message || "-"}
                </td>
                <td className="px-4 py-3 text-gray-500">
                  {lead.createdAt.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

