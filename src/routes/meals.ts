import { Router } from "express";
import { getAllMeals, getMealById } from "../services/meals.service";

export const mealsRouter = Router();

mealsRouter.get("/", async (_req, res) => {
  const meals = await getAllMeals();
  res.json(meals);
});

mealsRouter.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({ error: "Invalid meal id" });
    return;
  }
  const meal = await getMealById(id);
  if (!meal) {
    res.status(404).json({ error: "Meal not found" });
    return;
  }
  res.json(meal);
});
