"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      redirect: false, // IMPORTANT
    });

    if (result?.error) {
      setError("Invalid email or user not found");
      setLoading(false);
      return;
    }

    // ✅ MANUAL REDIRECT (RELIABLE)
    router.push("/analytics");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm rounded-xl border bg-white p-6 space-y-4"
      >
        <h1 className="text-2xl font-semibold">Sign in</h1>

        <input
          type="email"
          placeholder="Email address"
          className="w-full rounded-md border px-4 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-black px-4 py-2 text-white"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}

