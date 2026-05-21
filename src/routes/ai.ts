import { Router } from "express";
import { recommendMeals, describeMeal } from "../services/ai.service";

export const aiRouter = Router();

// POST /ai/recommend
// Body: { preferences: string }
aiRouter.post("/recommend", async (req, res) => {
  const { preferences } = req.body as { preferences?: string };
  if (!preferences || typeof preferences !== "string" || preferences.trim().length === 0) {
    res.status(400).json({ error: "preferences is required and must be a non-empty string" });
    return;
  }

  const recommendation = await recommendMeals(preferences.trim());
  res.json({ recommendation });
});

// POST /ai/describe/:mealId
aiRouter.post("/describe/:mealId", async (req, res) => {
  const mealId = Number(req.params.mealId);
  if (!Number.isInteger(mealId) || mealId <= 0) {
    res.status(400).json({ error: "Invalid mealId" });
    return;
  }

  const description = await describeMeal(mealId);
  res.json({ description });
});
