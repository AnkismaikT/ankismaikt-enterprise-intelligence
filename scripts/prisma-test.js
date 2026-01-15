import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const orgCount = await prisma.organization.count();
  console.log("Organization count:", orgCount);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });

