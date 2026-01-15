import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json(
        { error: "Missing token" },
        { status: 400 }
      );
    }

    // 1️⃣ Find invite
    const invite = await prisma.invite.findUnique({
      where: { token },
    });

    if (!invite) {
      return NextResponse.json(
        { error: "Invalid invite token" },
        { status: 404 }
      );
    }

    if (invite.used) {
      return NextResponse.json(
        { error: "Invite already used" },
        { status: 400 }
      );
    }

    if (invite.expiresAt && invite.expiresAt < new Date()) {
      return NextResponse.json(
        { error: "Invite expired" },
        { status: 400 }
      );
    }

    // 2️⃣ Find existing user by INVITE EMAIL (SOURCE OF TRUTH)
    const existingUser = await prisma.user.findUnique({
      where: { email: invite.email },
    });

    // 3️⃣ Create or update user (NO UPDATE-ONLY LOGIC)
    if (existingUser) {
      await prisma.user.update({
        where: { id: existingUser.id },
        data: {
          organizationId: invite.organizationId,
          role: invite.role,
        },
      });
    } else {
      await prisma.user.create({
        data: {
          email: invite.email,
          password: "TEMP", // placeholder; real auth flow later
          role: invite.role,
          organizationId: invite.organizationId,
        },
      });
    }

    // 4️⃣ Mark invite as used
    await prisma.invite.update({
      where: { id: invite.id },
      data: {
        used: true,
        usedAt: new Date(),
      },
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Accept invite error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

