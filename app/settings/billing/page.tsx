export default function BillingPage() {
  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-2xl font-semibold mb-4">
        Upgrade to Growth
      </h1>

      <p className="text-gray-600 mb-6">
        You are currently on the <b>Starter</b> plan.
        Upgrade to <b>Growth</b> to unlock advanced insights,
        custom KPIs, and deeper intelligence.
      </p>

      <div className="rounded border bg-gray-50 p-6">
        <h2 className="font-medium mb-2">What happens next?</h2>
        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
          <li>We enable Growth features for your organization</li>
          <li>We onboard you personally</li>
          <li>Billing is handled manually for now</li>
        </ul>

        <div className="mt-6">
          <a
            href="mailto:pradeepkishan@ankismaikt.com?subject=Upgrade to Growth"
            className="inline-block rounded bg-black px-4 py-2 text-white text-sm hover:bg-gray-800"
          >
            Contact Founder to Upgrade
          </a>
        </div>
      </div>
    </div>
  );
}

