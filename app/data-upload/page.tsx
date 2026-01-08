"use client";

import { useState } from "react";

export default function DataUploadPage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/upload-sales", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Upload failed");
      } else {
        setResult(data);
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="p-8 max-w-xl">
      <h1 className="text-2xl font-semibold mb-4">
        Upload Sales CSV
      </h1>

      <form onSubmit={handleUpload} className="space-x-4">
        <input type="file" name="file" accept=".csv" required />

        <button
          type="submit"
          className="px-4 py-2 bg-black text-white rounded"
        >
          Upload
        </button>
      </form>

      {loading && (
        <p className="mt-4 text-gray-600">Processing CSV…</p>
      )}

      {error && (
        <p className="mt-4 text-red-600">{error}</p>
      )}

      {result && (
        <div className="mt-6 bg-gray-100 p-4 rounded">
          <p><strong>Upload Summary</strong></p>
          <ul className="mt-2 text-sm">
            <li>✅ Rows received: {result.received}</li>
            <li>💾 Rows inserted: {result.inserted}</li>
            <li>⚠️ Rows skipped: {result.skipped}</li>
          </ul>
        </div>
      )}
    </main>
  );
}

