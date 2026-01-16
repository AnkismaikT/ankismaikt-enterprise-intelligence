"use client";

import { useRef, useState } from "react";

/* ================= TYPES ================= */
type DataRow = {
  month: string;
  revenue: number;
  cost: number;
};

/* ================= PHASE-1 HARDCODED DATA (SAFE FALLBACK) ================= */
const hardcodedData: DataRow[] = [
  { month: "Jan", revenue: 10.0, cost: 7.0 },
  { month: "Feb", revenue: 10.8, cost: 7.4 },
  { month: "Mar", revenue: 11.5, cost: 8.1 },
  { month: "Apr", revenue: 12.2, cost: 8.9 },
  { month: "May", revenue: 13.0, cost: 9.8 },
];

/* ================= SAMPLE CSV (DOWNLOAD) ================= */
const sampleCSV = `month,revenue,cost
Jan,10.0,7.0
Feb,10.8,7.4
Mar,11.5,8.1
Apr,12.2,8.9
May,13.0,9.8`;

/* ================= HELPERS ================= */
const margin = (r: number, c: number) => ((r - c) / r) * 100;

const trend = (values: number[]) =>
  values[values.length - 1] > values[0] ? "UP" : "DOWN";

/* ===== TREND COLOR + ARROW ===== */
const trendStyle = (value: "UP" | "DOWN") => {
  if (value === "UP") {
    return { color: "text-emerald-600", arrow: "▲" };
  }
  return { color: "text-red-600", arrow: "▼" };
};

/* ================= CSV PARSER ================= */
function parseCSV(text: string): DataRow[] {
  const lines = text.trim().split("\n");

  if (lines.length < 2) {
    throw new Error("CSV must include header and data rows");
  }

  const header = lines[0].replace(/\s/g, "").toLowerCase();
  if (header !== "month,revenue,cost") {
    throw new Error("Invalid CSV header format");
  }

  return lines.slice(1).map((line, idx) => {
    const [month, revenue, cost] = line.split(",");
    const r = Number(revenue);
    const c = Number(cost);

    if (!month || isNaN(r) || isNaN(c)) {
      throw new Error(`Invalid data at line ${idx + 2}`);
    }

    return { month, revenue: r, cost: c };
  });
}

export default function FinancialIntelligenceLayer() {
  /* ================= STATE ================= */
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [csvData, setCsvData] = useState<DataRow[] | null>(null);
  const [previewData, setPreviewData] = useState<DataRow[]>([]);
  const [status, setStatus] = useState("No file loaded");

  const activeData = csvData ?? hardcodedData;

  /* ================= INTELLIGENCE LOGIC (UNCHANGED) ================= */
  const revenueTrend = trend(activeData.map(d => d.revenue));
  const costTrend = trend(activeData.map(d => d.cost));
  const marginTrend = trend(activeData.map(d => margin(d.revenue, d.cost)));

  const earlyRisk =
    revenueTrend === "UP" &&
    costTrend === "UP" &&
    marginTrend === "DOWN";

  /* ================= HANDLERS ================= */
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = parseCSV(reader.result as string);
        setCsvData(parsed);
        setPreviewData(parsed.slice(0, 5));
        setStatus(`Loaded: ${file.name}`);
      } catch (err: any) {
        setCsvData(null);
        setPreviewData([]);
        setStatus(`Error: ${err.message}`);
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    setCsvData(null);
    setPreviewData([]);
    setStatus("No file loaded");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const downloadSampleCSV = () => {
    const blob = new Blob([sampleCSV], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sample-financials.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 px-6 py-8">
      <div className="mx-auto max-w-7xl space-y-10">

        {/* ================= HEADER ================= */}
        <header>
          <h1 className="text-3xl font-semibold tracking-tight">
            Financial Intelligence Layer
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-gray-600">
            This layer explains how raw financial inputs are evaluated to surface
            early risk signals before executive decisions are made.
          </p>

          <div className="mt-4 rounded-xl bg-slate-100 p-4 text-sm">
            <p className="font-medium mb-1">How to read this layer</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Trends are system-generated from raw inputs</li>
              <li>Risk signals identify early pressure before reporting impact</li>
              <li>Executive interpretation adds judgment and context</li>
            </ul>
          </div>
        </header>

        {/* ================= CSV INPUT PANEL ================= */}
        <section className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-semibold">Financial Data Input</h2>
              <p className="mt-1 text-sm text-slate-500">
                Upload a monthly financial CSV or download the sample format.
              </p>
              <div className="mt-3 inline-flex rounded-md bg-slate-50 px-3 py-2 text-xs font-mono">
                month,revenue,cost
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs">
                ● {status}
              </span>

              <button onClick={handleUploadClick} className="rounded-md border px-4 py-2 text-sm">
                Upload CSV
              </button>

              <button onClick={downloadSampleCSV} className="rounded-md border px-4 py-2 text-sm">
                Download Sample
              </button>

              <button onClick={handleReset} className="rounded-md bg-slate-100 px-4 py-2 text-sm">
                Reset
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </div>
        </section>

        {/* ================= CSV PREVIEW ================= */}
        {previewData.length > 0 && (
          <section className="rounded-2xl bg-white p-6 ring-1">
            <h3 className="mb-3 text-sm font-semibold">
              CSV Preview (first rows)
            </h3>
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Revenue</th>
                  <th>Cost</th>
                </tr>
              </thead>
              <tbody>
                {previewData.map((row, i) => (
                  <tr key={i} className="border-t">
                    <td>{row.month}</td>
                    <td>{row.revenue}</td>
                    <td>{row.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {/* ================= SUMMARY CARDS ================= */}
        <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            { label: "Revenue Trend", value: revenueTrend },
            { label: "Cost Trend", value: costTrend },
            { label: "Margin Trend", value: marginTrend },
          ].map(({ label, value }) => {
            const style = trendStyle(value);
            return (
              <div key={label} className="rounded-2xl bg-white p-6 ring-1">
                <p className="text-sm text-gray-500">{label}</p>
                <p className={`mt-2 text-2xl font-semibold ${style.color}`}>
                  {style.arrow} {value}
                </p>
              </div>
            );
          })}
        </section>

        {/* ================= INPUT & CALCULATION ================= */}
        <section className="rounded-2xl bg-white p-6 ring-1">
          <span className="inline-block mb-3 rounded-full bg-slate-100 px-3 py-1 text-xs">
            System Generated
          </span>

          <h2 className="mb-4 text-lg font-semibold">
            Financial Input & Margin Calculation
          </h2>

          <table className="w-full text-sm">
            <thead>
              <tr>
                <th>Month</th>
                <th>Revenue (₹ Cr)</th>
                <th>Cost (₹ Cr)</th>
                <th>Margin %</th>
              </tr>
            </thead>
            <tbody>
              {activeData.map(row => (
                <tr key={row.month} className="border-t">
                  <td>{row.month}</td>
                  <td>{row.revenue.toFixed(1)}</td>
                  <td>{row.cost.toFixed(1)}</td>
                  <td>{margin(row.revenue, row.cost).toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* ================= SYSTEM OBSERVATION ================= */}
        <section className="rounded-2xl bg-red-50 p-6 ring-1">
          <h2 className="mb-2 text-lg font-semibold text-red-700">
            System Observation
          </h2>

          {earlyRisk ? (
            <>
              <p className="text-sm text-red-700">
                Costs are rising faster than revenue across multiple periods,
                resulting in sustained margin compression.
              </p>
              <p className="mt-2 text-sm font-medium text-red-700">
                Risk Severity: High
              </p>
            </>
          ) : (
            <p className="text-sm text-gray-600">
              No immediate margin risk detected.
            </p>
          )}
        </section>

        {/* ================= RECOMMENDED FOCUS AREAS ================= */}
        <section className="rounded-2xl bg-white p-6 ring-1">
          <span className="inline-block mb-3 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium">
            System-Guided
          </span>

          <h2 className="mb-4 text-lg font-semibold">
            Recommended Focus Areas
          </h2>

          <ul className="space-y-3 text-sm text-gray-700">
            <li>
              <strong>Cost Structure Elasticity:</strong>{" "}
              Identify which cost components are scaling faster than revenue and
              whether they are fixed or variable in nature.
            </li>
            <li>
              <strong>Operating Leverage Breakdown:</strong>{" "}
              Assess whether incremental revenue is translating into proportional
              profit or being absorbed by rising operating costs.
            </li>
            <li>
              <strong>Margin Sustainability by Segment:</strong>{" "}
              Review whether margin compression is broad-based or driven by
              specific business lines, regions, or contracts.
            </li>
          </ul>
        </section>

        {/* ================= SCENARIO COMPARISON ================= */}
        <section className="rounded-2xl bg-slate-50 p-6 ring-1">
          <h2 className="mb-4 text-lg font-semibold">
            Scenario Comparison (Next 90 Days)
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 text-sm">
            <div className="rounded-xl bg-white p-4 ring-1">
              <p className="font-medium text-red-700 mb-2">
                If No Intervention
              </p>
              <ul className="space-y-1">
                <li>• Margin trend continues to decline</li>
                <li>• Estimated impact: ₹1.0–₹1.5 Cr erosion</li>
                <li>• Pressure becomes visible in reported results</li>
              </ul>
            </div>

            <div className="rounded-xl bg-white p-4 ring-1">
              <p className="font-medium text-emerald-700 mb-2">
                If Stabilization Achieved
              </p>
              <ul className="space-y-1">
                <li>• Margin trend stabilizes or improves</li>
                <li>• Estimated protection: ₹0.5–₹1.0 Cr</li>
                <li>• Profitability flexibility preserved</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ================= EXECUTIVE INTERPRETATION ================= */}
        <section className="rounded-2xl bg-white p-6 ring-1">
          <span className="inline-block mb-3 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
            Executive Review
          </span>

          <h2 className="mb-4 text-lg font-semibold">
            Executive Interpretation
          </h2>

          <p className="text-sm leading-relaxed">
            While topline growth remains healthy, accelerating cost structures
            are eroding operating leverage. Without near-term intervention,
            projected margins will compress further over the next 1–2 quarters.
          </p>

          <div className="mt-4 rounded-lg bg-slate-100 px-4 py-3 text-sm">
            <p className="font-medium mb-1">Decision Context</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Time sensitivity: 30–60 days</li>
              <li>Reversibility: Medium</li>
              <li>Financial exposure: ₹1.0–₹1.5 Cr (90 days)</li>
            </ul>
          </div>
        </section>

      </div>
    </main>
  );
}

