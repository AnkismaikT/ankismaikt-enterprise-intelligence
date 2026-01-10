"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="
        relative
        inline-flex
        items-center
        gap-2
        rounded-lg
        bg-red-600
        px-4
        py-2
        text-sm
        font-semibold
        text-white
        shadow-md
        transition
        hover:bg-red-700
        hover:shadow-lg
        focus:outline-none
        focus:ring-2
        focus:ring-red-400
        active:scale-95
      "
    >
      🚪 Logout
    </button>
  );
}

