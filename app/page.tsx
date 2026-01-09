"use client";

import { useState } from "react";

export default function HomePage() {
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;

    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
      website: "", // honeypot
    };

    try {
      const res = await fetch("/api/request-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSuccess(true);
        form.reset();
      } else {
        console.error("Demo request failed", await res.text());
      }
    } catch (err) {
      console.error("Demo request error", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-20">

        {/* HERO */}
        <section className="mb-24">
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            See Financial Risk Before It Hits Your Numbers
          </h1>

          <p className="mt-4 max-w-3xl text-lg text-gray-600">
            AnkismaikT helps CFOs identify revenue leakage and operational risk
            before they impact financial outcomes.
          </p>

          <p className="mt-4 max-w-3xl text-sm text-gray-500">
            Also used by founders who want a finance-first view of business risk
            and opportunity.
          </p>

          {/* ACTIONS */}
          <div className="mt-8 flex gap-4">
            <button
              type="button"
              onClick={() => {
                document.getElementById("demo")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
              className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition"
            >
              Request an Enterprise Demo
            </button>

            <button
              type="button"
              onClick={() => setShowPreview(true)}
              className="rounded-xl border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
            >
              View Product Preview
            </button>
          </div>
        </section>

        {/* SIGNALS */}
        <section className="mb-24 max-w-5xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            What AnkismaikT Surfaces
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-xl bg-white p-6 shadow ring-1 ring-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">
                🔴 Revenue Leakage Risk
              </h3>
              <p className="text-sm text-gray-600">
                Identify where revenue is quietly slipping due to discounting,
                concentration, or execution gaps — before forecasts are missed.
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow ring-1 ring-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">
                🟡 Margin Pressure Early Warning
              </h3>
              <p className="text-sm text-gray-600">
                Detect operational cost drift and efficiency breakdowns that
                threaten margins long before reports show erosion.
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow ring-1 ring-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">
                🔵 Decision Blind Spot Alerts
              </h3>
              <p className="text-sm text-gray-600">
                Reveal where high-impact leadership decisions are being made
                without sufficient supporting data — reducing strategic risk.
              </p>
            </div>
          </div>
        </section>

        {/* CTA BLOCK */}
        <section className="mb-24 max-w-4xl rounded-2xl bg-indigo-600 p-8 text-white">
          <h3 className="text-2xl font-bold">
            Finance leaders act earlier with AnkismaikT
          </h3>
          <p className="mt-2 text-indigo-100">
            Guided demos and focused pilots designed for CFOs and executive teams.
          </p>

          <button
            type="button"
            onClick={() => {
              document.getElementById("demo")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
            className="mt-6 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-indigo-600 hover:bg-indigo-50 transition"
          >
            Request an Enterprise Demo
          </button>
        </section>

        {/* DEMO FORM */}
        <section
          id="demo"
          className="max-w-lg rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900">
            Request an Enterprise Demo
          </h3>

          <p className="mt-1 text-sm text-gray-600">
            Speak directly with the founder. No sales team. No spam.
          </p>

          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            <input
              name="name"
              required
              className="w-full rounded border p-2"
              placeholder="Your name"
            />

            <input
              name="email"
              type="email"
              required
              className="w-full rounded border p-2"
              placeholder="Work email"
            />

            <input
              name="company"
              className="w-full rounded border p-2"
              placeholder="Company"
            />

            <textarea
              name="message"
              className="w-full rounded border p-2"
              placeholder="What problem are you trying to solve?"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-indigo-600 py-2 text-white hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Submitting..." : "Request Demo"}
            </button>

            {success && (
              <p className="text-sm text-green-600 mt-2">
                ✅ Request received. We’ll contact you shortly.
              </p>
            )}
          </form>
        </section>
      </div>

      {/* PREVIEW MODAL */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <div className="flex items-start gap-2">
              <span className="text-lg">🔒</span>
              <div>
                <p className="font-semibold text-gray-900">
                  Product preview is available during a guided enterprise demo.
                </p>
                <p className="mt-2 text-sm text-gray-600">
                  We demonstrate AnkismaikT live to ensure proper context,
                  clarity, and correct interpretation of executive signals.
                </p>
              </div>
            </div>

            <div className="mt-6 text-right">
              <button
                onClick={() => setShowPreview(false)}
                className="text-sm font-semibold text-indigo-600 hover:underline"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

