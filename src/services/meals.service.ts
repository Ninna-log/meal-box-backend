import { prisma } from "../db/client";

export async function getAllMeals() {
  return prisma.meal.findMany({
    include: { chef: true, tags: true },
    orderBy: { id: "asc" },
  });
}

export async function getMealById(id: number) {
  return prisma.meal.findUnique({
    where: { id },
    include: { chef: true, tags: true },
  });
}
