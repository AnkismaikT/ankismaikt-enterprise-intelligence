"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    {
      label: "Financial Intelligence Layer",
      href: "/dashboard/analyzer",
      icon: "📊",
    },
    {
      label: "Enterprise Intelligence",
      href: "/dashboard",
      icon: "🏢",
    },
    {
      label: "Sales Analytics",
      href: "/dashboard/sales",
      icon: "📈",
    },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* SIDEBAR */}
      <aside className="w-64 border-r bg-white px-4 py-6">
        <h2 className="mb-8 text-lg font-bold text-slate-900">
          AnkismaikT
        </h2>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const active =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}

