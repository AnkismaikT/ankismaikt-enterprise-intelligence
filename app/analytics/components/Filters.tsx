"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function toISO(date: string) {
  if (!date) return "";
  return new Date(date).toISOString().split("T")[0];
}

export default function Filters() {
  const router = useRouter();
  const params = useSearchParams();

  const [from, setFrom] = useState(params.get("from") || "");
  const [to, setTo] = useState(params.get("to") || "");
  const [region, setRegion] = useState(params.get("region") || "");
  const [sku, setSku] = useState(params.get("sku") || "");

  const [regions, setRegions] = useState<string[]>([]);
  const [skus, setSkus] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/sales")
      .then((res) => res.json())
      .then((json) => {
        setRegions([...new Set(json.data.map((r: any) => r.region))]);
        setSkus([...new Set(json.data.map((r: any) => r.sku))]);
      });
  }, []);

  function applyFilters() {
    const query = new URLSearchParams();

    if (from) query.set("from", toISO(from));
    if (to) query.set("to", toISO(to));
    if (region) query.set("region", region);
    if (sku) query.set("sku", sku);

    router.push(`/analytics?${query.toString()}`);
  }

  function resetFilters() {
    router.push("/analytics");
  }

  return (
    <div className="bg-white border rounded-xl p-6 shadow-sm grid grid-cols-1 md:grid-cols-5 gap-4">
      <input
        type="date"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        className="border rounded px-3 py-2 text-sm"
      />

      <input
        type="date"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        className="border rounded px-3 py-2 text-sm"
      />

      <select
        value={region}
        onChange={(e) => setRegion(e.target.value)}
        className="border rounded px-3 py-2 text-sm"
      >
        <option value="">All Regions</option>
        {regions.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>

      <select
        value={sku}
        onChange={(e) => setSku(e.target.value)}
        className="border rounded px-3 py-2 text-sm"
      >
        <option value="">All SKUs</option>
        {skus.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <div className="flex gap-2">
        <button
          onClick={applyFilters}
          className="flex-1 bg-black text-white rounded px-3 py-2 text-sm"
        >
          Apply
        </button>
        <button
          onClick={resetFilters}
          className="flex-1 border rounded px-3 py-2 text-sm"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

