import { anthropic, MODEL } from "../ai/anthropic";
import { getMealById } from "./meals.service";
import { AppError } from "../errors/AppError";

export async function recommendMeals(preferences: string): Promise<string> {
  const message = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 512,
    messages: [
      {
        role: "user",
        content: `You are a meal concierge for MealBox, a weekly meal subscription service.
Based on the following user preferences, recommend 3 meals and briefly explain why each one fits.
Be concise and friendly. Format your response as a short numbered list.

User preferences: ${preferences}`,
      },
    ],
  });

  const block = message.content[0];
  if (block.type !== "text") throw new Error("Unexpected response type from AI");
  return block.text;
}

export async function describeMeal(mealId: number): Promise<string> {
  const meal = await getMealById(mealId);
  if (!meal) throw new AppError(404, "Meal not found");

  const message = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 256,
    messages: [
      {
        role: "user",
        content: `You are a food copywriter for a premium meal subscription service.
Write an enticing, mouth-watering description (2-3 sentences) for the following meal.
Focus on flavour, texture, and appetite appeal. Do not repeat the meal name in the first word.

Meal name: ${meal.name}
Chef: ${meal.chef.name}
Current description: ${meal.description}
Tags: ${meal.tags.map((t) => t.label).join(", ")}`,
      },
    ],
  });

  const block = message.content[0];
  if (block.type !== "text") throw new Error("Unexpected response type from AI");
  return block.text;
}
