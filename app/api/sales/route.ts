import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth-options";
import { prisma } from "@/src/lib/prisma";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const organizationId = (session.user as any).organizationId;

  const { searchParams } = new URL(req.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const region = searchParams.get("region");
  const sku = searchParams.get("sku");

  const where: any = {
    organizationId,
  };

  if (from && to) {
    where.date = {
      gte: new Date(from),
      lte: new Date(to),
    };
  }

  if (region) where.region = region;
  if (sku) where.sku = sku;

  const sales = await prisma.sale.findMany({ where });

  const totalRevenue = sales.reduce(
    (sum, row) => sum + row.salesAmount,
    0
  );

  const unitsSold = sales.reduce(
    (sum, row) => sum + row.unitsSold,
    0
  );

  const byRegion = Object.values(
    sales.reduce((acc: any, row) => {
      acc[row.region] ??= { region: row.region, revenue: 0 };
      acc[row.region].revenue += row.salesAmount;
      return acc;
    }, {})
  );

  const byDate = Object.values(
    sales.reduce((acc: any, row) => {
      const date = row.date.toISOString().slice(0, 10);
      acc[date] ??= { date, revenue: 0 };
      acc[date].revenue += row.salesAmount;
      return acc;
    }, {})
  );

  return NextResponse.json({
    kpis: {
      totalRevenue,
      unitsSold,
      records: sales.length,
    },
    byRegion,
    byDate,
  });
}

