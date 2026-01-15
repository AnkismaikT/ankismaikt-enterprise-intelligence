import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const invite = await prisma.invite.create({
    data: {
      email: "pradeepmeghwal0411@gmail.com",
      token: "test-invite",
      organizationId: "cmk9i93j10000112vqalhb45s",
      role: "MEMBER",
      expiresAt: new Date("2026-01-12T23:59:00Z"),
    },
  });

  console.log("Invite created successfully:");
  console.log(invite);
}

main()
  .catch((e) => {
    console.error("Error creating invite:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

