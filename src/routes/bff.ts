import { Router } from "express";
import { redis } from "../cache/redis";
import { buildHomeScreen } from "../services/bff.service";

export const bffRouter = Router();

const CACHE_KEY = "bff:home";
const CACHE_TTL_SECONDS = 60 * 60; // 1 hour

bffRouter.get("/home", async (_req, res) => {
  const cached = await redis.get(CACHE_KEY);

  if (cached) {
    res.setHeader("X-Cache", "HIT");
    res.json(JSON.parse(cached));
    return;
  }

  const screen = await buildHomeScreen();
  await redis.setex(CACHE_KEY, CACHE_TTL_SECONDS, JSON.stringify(screen));

  res.setHeader("X-Cache", "MISS");
  res.json(screen);
});
