import { getCurrentPlan } from "@/app/lib/getCurrentPlan";
import { isStarter } from "@/app/lib/plan";
import ComingSoonButton from "@/app/components/ComingSoonButton";

export default async function ExportPage() {
  const plan = await getCurrentPlan();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Export & Downloads</h1>

      {isStarter(plan) ? (
        <div className="rounded border border-yellow-300 bg-yellow-50 p-4 text-sm">
          🔒 <b>Growth feature</b>
          <br />
          Exporting reports and data is available on the Growth plan.
        </div>
      ) : (
        <div className="rounded border p-4">
          <p className="text-gray-600 mb-4">
            Export your reports and data.
          </p>

          <div className="flex gap-2">
            <ComingSoonButton label="Export CSV" />
            <ComingSoonButton label="Export PDF" />
          </div>
        </div>
      )}
    </div>
  );
}

