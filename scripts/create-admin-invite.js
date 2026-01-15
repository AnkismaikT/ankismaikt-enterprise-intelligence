import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

async function main() {
  // 🔐 CHANGE THESE ONLY IF NEEDED
  const ADMIN_EMAIL = "pradeepmeghwal0411@gmail.com";
  const ORGANIZATION_ID = "cmk9lvcq000003zvk5gdzpgey"; // ✅ REAL ORG ID
  const ROLE = "ADMIN"; // 👈 ADMIN ROLE

  // Generate secure token
  const token = crypto.randomBytes(32).toString("hex");

  const invite = await prisma.invite.create({
    data: {
      email: ADMIN_EMAIL,
      token,
      organizationId: ORGANIZATION_ID,
      role: ROLE,
      expiresAt: new Date("2026-12-31T23:59:59Z"),
    },
  });

  console.log("✅ ADMIN INVITE CREATED SUCCESSFULLY");
  console.log("----------------------------------");
  console.log("Invite ID:", invite.id);
  console.log("Email:", invite.email);
  console.log("Role:", invite.role);
  console.log("Token:", invite.token);
  console.log("");
  console.log("👉 ACCEPT INVITE URL:");
  console.log(
    `http://localhost:3000/accept-invite?token=${invite.token}`
  );
}

main()
  .catch((error) => {
    console.error("❌ ERROR CREATING ADMIN INVITE");
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

