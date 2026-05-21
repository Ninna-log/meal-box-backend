import { prisma } from "../db/client";

export async function getWeeklyMenu() {
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setHours(0, 0, 0, 0);
  startOfWeek.setDate(now.getDate() - now.getDay());

  return prisma.weeklyMenu.findMany({
    where: { weekStart: startOfWeek },
    include: { meal: { include: { chef: true, tags: true } } },
    orderBy: { id: "asc" },
  });
}
