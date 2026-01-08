import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any).role !== "OWNER") {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const demoRequests = await prisma.demoRequest.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(demoRequests);
}

