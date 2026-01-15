import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const org = await prisma.organization.create({
    data: {
      name: "AnkismaiKT",
    },
  });

  console.log("Organization created:");
  console.log(org);
}

main()
  .catch(console.error)
  .finally(async () => {
    prisma.$disconnect();
  });

