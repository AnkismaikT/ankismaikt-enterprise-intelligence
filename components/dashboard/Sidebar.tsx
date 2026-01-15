export default function Sidebar() {
  return (
    <aside className="w-64 bg-black text-white min-h-screen p-4">
      <div className="text-xl font-bold mb-6">
        Ankisma
      </div>

      <nav className="space-y-3">
        <a href="/dashboard" className="block text-gray-300 hover:text-white">
          Dashboard
        </a>
        <a href="/dashboard/insights" className="block text-gray-300 hover:text-white">
          Insights
        </a>
        <a href="/dashboard/settings" className="block text-gray-300 hover:text-white">
          Settings
        </a>
      </nav>
    </aside>
  );
}

