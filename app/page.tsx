export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors">
      <div className="mx-auto max-w-7xl px-6 py-20">
        {/* Hero Section */}
        <section className="mb-24">
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-gray-900 dark:text-slate-100 sm:text-5xl">
            Enterprise Intelligence for Executive Decisions
          </h1>

          {/* Supporting line (LOCKED positioning) */}
          <p className="mt-2 text-sm text-gray-600 dark:text-slate-400">
            Built for founders and leadership teams who need faster, more confident decisions.
          </p>

          <p className="mt-6 max-w-3xl text-lg text-gray-600 dark:text-slate-400">
            AnkismaikT is an enterprise intelligence platform that transforms fragmented
            business data into clear insights, risk signals, and decision guidance for
            leadership teams across large and growing organizations.
          </p>

          <div className="mt-10 flex gap-4">
            <a
              href="#contact"
              className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-indigo-700"
            >
              Request Enterprise Demo
            </a>

            <a
              href="/dashboard"
              className="rounded-xl border border-gray-300 dark:border-slate-700 px-6 py-3 text-sm font-semibold text-gray-800 dark:text-slate-200 transition hover:bg-gray-100 dark:hover:bg-slate-800"
            >
              View Product Preview
            </a>
          </div>
        </section>

        {/* Who It's For */}
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

        {/* Why AnkismaikT */}
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

        {/* Call to Action */}
        <section
          id="contact"
          className="rounded-2xl bg-indigo-600 px-8 py-12 text-white"
        >
          <h2 className="text-2xl font-semibold">
            Ready to see AnkismaikT in action?
          </h2>
          <p className="mt-2 max-w-xl text-indigo-100">
            We work with select organizations to design enterprise intelligence
            systems tailored to their leadership and decision-making needs.
          </p>

          <div className="mt-6">
            <a
              href="mailto:contact@ankismaikt.com"
              className="inline-block rounded-xl bg-white px-6 py-3 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50"
            >
              Contact for Demo
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}

