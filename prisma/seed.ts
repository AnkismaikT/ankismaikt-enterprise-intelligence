import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("Injalkinshu@900", 10);

  const organization = await prisma.organization.create({
    data: {
      name: "AnkismaikT",
      plan: "growth",
    },
  });

  await prisma.user.create({
    data: {
      email: "pradeepmeghwal0411@gmail.com",
      password: passwordHash,
      role: "OWNER",
      organizationId: organization.id,
    },
  });

  console.log("✅ OWNER user seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

