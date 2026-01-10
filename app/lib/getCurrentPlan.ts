import { prisma } from "@/lib/prisma";

export async function getCurrentPlan() {
  const user = await prisma.user.findUnique({
    where: {
      email: "pradeepmeghwal0411@gmail.com", // FORCE GROWTH USER
    },
    include: {
      organization: true,
    },
  });

  return user?.organization?.plan ?? "starter";
}

