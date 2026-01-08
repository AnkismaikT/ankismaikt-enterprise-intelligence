import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, company, message, website } = body;

    // 🛑 Honeypot
    if (website) {
      return NextResponse.json({ success: true });
    }

    // 1️⃣ Save to DB
    await prisma.demoRequest.create({
      data: { name, email, company, message },
    });

    // 2️⃣ Send email ONLY at runtime
    if (process.env.RESEND_API_KEY && process.env.DEMO_REQUEST_EMAIL) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: "AnkismaikT <demo@ankismaikt.com>",
        to: [process.env.DEMO_REQUEST_EMAIL],
        replyTo: email,
        subject: "New Enterprise Demo Request",
        html: `
          <h2>New Enterprise Demo Request</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Company:</strong> ${company || "-"}</p>
          <p>${message || "-"}</p>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[request-demo]", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

