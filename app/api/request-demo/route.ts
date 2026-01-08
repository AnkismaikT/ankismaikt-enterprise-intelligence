import { NextResponse } from "next/server";
import { Resend } from "resend";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, company, message, website } = body;

    // 🛑 Honeypot protection (bots fill hidden fields)
    if (website) {
      return NextResponse.json({ success: true });
    }

    // 1️⃣ Store in DB
    await prisma.demoRequest.create({
      data: {
        name,
        email,
        company,
        message,
      },
    });

    // 2️⃣ Send email
    await resend.emails.send({
      from: "AnkismaikT <demo@ankismaikt.com>",
      to: [process.env.DEMO_REQUEST_EMAIL!],
      replyTo: email,
      subject: "New Enterprise Demo Request",
      html: `
        <h2>New Enterprise Demo Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || "-"}</p>
        <p><strong>Message:</strong></p>
        <p>${message || "-"}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[request-demo]", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

