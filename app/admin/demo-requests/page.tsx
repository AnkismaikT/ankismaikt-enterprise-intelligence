import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function AdminDemoRequestsPage() {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any).role !== "OWNER") {
    redirect("/login");
  }

  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/admin/demo-requests`,
    { cache: "no-store" }
  );

  const data = await res.json();

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-2xl font-semibold">
          Demo Requests
        </h1>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full border rounded">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Company</th>
                <th>Message</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item: any) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.company || "-"}</td>
                  <td>{item.message || "-"}</td>
                  <td>
                    {new Date(item.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

