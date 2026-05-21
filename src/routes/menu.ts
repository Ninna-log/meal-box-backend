import { Router } from "express";
import { getWeeklyMenu } from "../services/menu.service";

export const menuRouter = Router();

menuRouter.get("/weekly", async (_req, res) => {
  const menu = await getWeeklyMenu();
  res.json(menu);
});
