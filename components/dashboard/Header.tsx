"use client";

export default function Header() {
  return (
    <header className="h-14 bg-white border-b flex items-center justify-between px-6">
      <div className="font-medium">
        Dashboard
      </div>

      <button
        onClick={() => alert("Logout hooked later")}
        className="text-sm text-gray-600 hover:text-black"
      >
        Logout
      </button>
    </header>
  );
}

