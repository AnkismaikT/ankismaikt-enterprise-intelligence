import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const region = searchParams.get("region");
    const sku = searchParams.get("sku");

    const where: any = {};

    if (from || to) {
      where.date = {};
      if (from) where.date.gte = new Date(from);
      if (to) where.date.lte = new Date(to);
    }

    if (region) where.region = region;
    if (sku) where.sku = sku;

    const totals = await prisma.sale.aggregate({
      where,
      _sum: { salesAmount: true, unitsSold: true },
      _count: { id: true },
    });

    const salesByDay = await prisma.sale.groupBy({
      where,
      by: ["date"],
      _sum: { salesAmount: true, unitsSold: true },
      orderBy: { date: "asc" },
    });

    const salesByRegion = await prisma.sale.groupBy({
      where,
      by: ["region"],
      _sum: { salesAmount: true, unitsSold: true },
      orderBy: { region: "asc" },
    });

    const salesBySku = await prisma.sale.groupBy({
      where,
      by: ["sku"],
      _sum: { salesAmount: true, unitsSold: true },
      orderBy: { sku: "asc" },
    });

    return NextResponse.json({
      totals: {
        totalSalesAmount: totals._sum.salesAmount ?? 0,
        totalUnitsSold: totals._sum.unitsSold ?? 0,
        totalRecords: totals._count.id,
      },
      salesByDay,
      salesByRegion,
      salesBySku,
    });
  } catch (error) {
    console.error("Analytics filter error:", error);
    return NextResponse.json(
      { error: "Analytics failed" },
      { status: 500 }
    );
  }
}

