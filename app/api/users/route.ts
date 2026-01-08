import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const runtime = "nodejs";

// =======================
// GET USERS
// =======================
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: {
        organization: true,
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error("GET /api/users ERROR:", error);
    // 🔑 ALWAYS return array (grid-safe)
    return NextResponse.json([]);
  }
}

// =======================
// CREATE USER
// =======================
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // grid cannot handle non-200
    if (!body.email || !body.password) {
      return NextResponse.json([]);
    }

    let organizationId: string | null = null;

    // 🏢 Handle typed organization name
    if (body.organization && body.organization.trim() !== "") {
      const orgName = body.organization.trim();

      let organization = await prisma.organization.findFirst({
        where: { name: orgName },
      });

      if (!organization) {
        organization = await prisma.organization.create({
          data: { name: orgName },
        });
      }

      organizationId = organization.id;
    }

    // 🔐 HASH PASSWORD
    const hashedPassword = await bcrypt.hash(body.password, 10);

    const user = await prisma.user.create({
      data: {
        email: body.email.trim(),
        password: hashedPassword,
        role: body.role ?? "OWNER",
        organizationId,
      },
    });

    // 🔑 Grid expects ARRAY
    return NextResponse.json([user]);
  } catch (error) {
    console.error("POST /api/users ERROR:", error);
    // 🔑 ALWAYS return array
    return NextResponse.json([]);
  }
}
