"use client";

import { useEffect, useState } from "react";

export default function HomePage() {
  const [showPreview, setShowPreview] = useState(false);

  // Close modal on ESC
  useEffect(() => {
    if (!showPreview) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowPreview(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showPreview]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-20">

        {/* ================= HERO ================= */}
        <section className="mb-24">
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Enterprise Intelligence for Executive Decisions
          </h1>

          <p className="mt-3 text-sm text-gray-600">
            Built for founders and leadership teams who need faster, more confident decisions.
          </p>

          <p className="mt-6 max-w-3xl text-lg text-gray-600">
            AnkismaikT is an enterprise intelligence platform that transforms fragmented
            business data into clear insights, risk signals, and decision guidance for
            leadership teams across large and growing organizations.
          </p>

          {/* ================= ACTIONS ================= */}
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="mailto:pradeepkishan@ankismaikt.com?subject=Enterprise%20Demo%20Request"
              className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-indigo-700 transition"
            >
              Request Enterprise Demo
            </a>

            <button
              type="button"
              onClick={() => setShowPreview(true)}
              className="relative rounded-xl border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
            >
              View Product Preview
              <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-indigo-500" />
            </button>
          </div>
        </section>

        {/* ================= DEMO FORM (TRUST ELEMENT) ================= */}
        <section className="max-w-lg rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Request an Enterprise Demo
          </h3>

          <p className="mt-1 text-sm text-gray-600">
            Speak directly with the founder. No sales team. No spam.
          </p>

          <div className="mt-4 space-y-3 opacity-60 pointer-events-none select-none">
            <input className="w-full rounded border p-2" placeholder="Your name" />
            <input className="w-full rounded border p-2" placeholder="Work email" />
            <input className="w-full rounded border p-2" placeholder="Company" />
            <textarea
              className="w-full rounded border p-2"
              placeholder="What problem are you trying to solve?"
            />
            <button className="w-full rounded-xl bg-indigo-600 py-2 text-white">
              Request Demo
            </button>
          </div>
        </section>
      </div>

      {/* ================= PREVIEW MODAL ================= */}
      {showPreview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setShowPreview(false)}
        >
          <div
            className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-3">
              <span className="text-xl">🔒</span>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Guided Product Preview
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Product access is intentionally provided during a guided enterprise
                  demo to ensure correct context, signal interpretation, and executive
                  alignment.
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
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

