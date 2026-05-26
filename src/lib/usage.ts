import { prisma } from "@/lib/prisma";

export async function getMonthlyImageUsage(userId: string) {
  const start = new Date();
  start.setUTCDate(1);
  start.setUTCHours(0, 0, 0, 0);

  const aggregate = await prisma.usageEvent.aggregate({
    where: {
      userId,
      eventType: "export_completed",
      createdAt: { gte: start },
    },
    _sum: { imageCount: true },
  });

  return aggregate._sum.imageCount ?? 0;
}
