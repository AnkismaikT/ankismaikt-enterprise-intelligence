"use client";

import { useState } from "react";

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;

    await fetch("/api/request-demo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name.value,
        email: form.email.value,
        company: form.company.value,
        message: form.message.value,
      }),
    });

    setLoading(false);
    setSent(true);
    form.reset();
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors">
      <div className="mx-auto max-w-7xl px-6 py-20">

        {/* HERO */}
        <section className="mb-24">
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-gray-900 dark:text-slate-100 sm:text-5xl">
            Enterprise Intelligence for Executive Decisions
          </h1>

          <p className="mt-2 text-sm text-gray-600 dark:text-slate-400">
            Built for founders and leadership teams who need faster, more confident decisions.
          </p>

          <p className="mt-6 max-w-3xl text-lg text-gray-600 dark:text-slate-400">
            AnkismaikT is an enterprise intelligence platform that transforms fragmented
            business data into clear insights, risk signals, and decision guidance for
            leadership teams across large and growing organizations.
          </p>

          {/* VIEW PRODUCT PREVIEW (STRICTLY GATED) */}
          <div className="mt-8">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                alert(
                  "🔒 Product preview is available during a guided enterprise demo.\n\nWe demonstrate AnkismaikT live to ensure proper context, clarity, and correct interpretation of executive signals."
                );
              }}
              className="rounded-xl border border-gray-300 dark:border-slate-700 px-5 py-2 text-sm font-semibold text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition"
            >
              View Product Preview
            </button>
          </div>

          {/* ENTERPRISE DEMO FORM */}
          <div className="mt-12 max-w-lg rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-lg ring-1 ring-gray-200 dark:ring-slate-800">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-200">
              Request an Enterprise Demo
            </h3>

            <p className="mt-1 text-sm text-gray-600 dark:text-slate-400">
              Speak directly with the founder. No sales team. No spam.
            </p>

            {sent ? (
              <div className="mt-4 space-y-4">
                <p className="text-green-600 font-medium">
                  Thanks — your request has been received.
                </p>

                <p className="text-sm text-gray-600 dark:text-slate-400">
                  You can optionally schedule time directly using the link below.
                </p>

                <a
                  href="https://calendly.com/pradeepkishan/enterprise-demo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-xl bg-indigo-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
                >
                  Schedule Demo Call
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-4 space-y-3">
                <input
                  name="name"
                  required
                  placeholder="Your name"
                  className="w-full rounded border border-gray-300 dark:border-slate-700 p-2 bg-transparent"
                />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Work email"
                  className="w-full rounded border border-gray-300 dark:border-slate-700 p-2 bg-transparent"
                />
                <input
                  name="company"
                  placeholder="Company"
                  className="w-full rounded border border-gray-300 dark:border-slate-700 p-2 bg-transparent"
                />
                <textarea
                  name="message"
                  placeholder="What problem are you trying to solve?"
                  className="w-full rounded border border-gray-300 dark:border-slate-700 p-2 bg-transparent"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-indigo-600 py-2 text-white font-semibold transition hover:bg-indigo-700 disabled:opacity-60"
                >
                  {loading ? "Submitting…" : "Request Demo"}
                </button>
              </form>
            )}
          </div>
        </section>

        {/* WHO IT’S FOR */}
        <section className="mb-24 grid grid-cols-1 gap-10 md:grid-cols-3">
          {[
            {
              title: "Founders & CEOs",
              desc: "A single source of truth for company-wide performance, risks, and priorities.",
            },
            {
              title: "CXOs & Leadership Teams",
              desc: "Executive-level intelligence with confidence signals for faster, aligned decisions.",
            },
            {
              title: "Strategy & Operations",
              desc: "Structured insights replacing fragmented reports, spreadsheets, and manual reviews.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-sm ring-1 ring-gray-200 dark:ring-slate-800"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-200">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-slate-400">
                {item.desc}
              </p>
            </div>
          ))}
        </section>

        {/* WHY */}
        <section className="mb-24">
          <h2 className="mb-8 text-2xl font-semibold text-gray-900 dark:text-slate-200">
            Why AnkismaikT
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {[
              "Designed for executive decision-making, not analyst-heavy workflows",
              "Focuses on signals, confidence, and impact — not just charts",
              "Enterprise-grade UX built for clarity, restraint, and trust",
              "Composable intelligence platform adaptable to complex organizations",
            ].map((point) => (
              <div
                key={point}
                className="rounded-xl bg-white dark:bg-slate-900 p-5 shadow-sm ring-1 ring-gray-200 dark:ring-slate-800"
              >
                <p className="text-sm text-gray-700 dark:text-slate-300">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}

