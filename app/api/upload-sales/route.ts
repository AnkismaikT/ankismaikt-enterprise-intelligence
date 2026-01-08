import { NextResponse } from "next/server";
import Papa from "papaparse";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const csvText = await file.text();

    const parsed = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
    });

    if (!Array.isArray(parsed.data)) {
      return NextResponse.json(
        { error: "Invalid CSV format" },
        { status: 400 }
      );
    }

    let inserted = 0;
    let skipped = 0;

    for (const row of parsed.data as any[]) {
      const rawDate = String(row.date || "").trim();

      // Validate date
      if (!/^\d{4}-\d{2}-\d{2}$/.test(rawDate)) {
        skipped++;
        continue;
      }

      const date = new Date(`${rawDate}T00:00:00Z`);
      if (isNaN(date.getTime())) {
        skipped++;
        continue;
      }

      const salesAmount = Number(row.sales_amount);
      const unitsSold = Number(row.units_sold);

      if (Number.isNaN(salesAmount) || Number.isNaN(unitsSold)) {
        skipped++;
        continue;
      }

      try {
        await prisma.sale.create({
          data: {
            date,
            region: String(row.region || "").trim(),
            sku: String(row.sku || "").trim(),
            salesAmount,
            unitsSold,
          },
        });
        inserted++;
      } catch (err: any) {
        // Duplicate row (unique constraint)
        skipped++;
      }
    }

    return NextResponse.json({
      success: true,
      received: parsed.data.length,
      inserted,
      skipped,
    });
  } catch (error) {
    console.error("UPLOAD FAILED:", error);
    return NextResponse.json(
      { error: "CSV processing failed" },
      { status: 500 }
    );
  }
}

