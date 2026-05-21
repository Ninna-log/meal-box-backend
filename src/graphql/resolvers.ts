import { getAllMeals, getMealById } from "../services/meals.service";

export const rootResolver = {
  meals: () => getAllMeals(),
  meal: ({ id }: { id: number }) => getMealById(id),
};
