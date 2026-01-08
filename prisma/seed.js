const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // 1. Create default organization
  const organization = await prisma.organization.create({
    data: {
      name: "AnkismaikT Default Organization",
    },
  });

  // 2. Assign all existing sales to this organization
  const result = await prisma.sale.updateMany({
    where: {
      organizationId: null,
    },
    data: {
      organizationId: organization.id,
    },
  });

  console.log("Default organization created:", organization.name);
  console.log("Sales assigned:", result.count);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

