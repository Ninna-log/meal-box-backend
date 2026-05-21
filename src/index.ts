import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { mealsRouter } from "./routes/meals";
import { menuRouter } from "./routes/menu";
import { bffRouter } from "./routes/bff";
import { graphqlRouter } from "./routes/graphql";
import { aiRouter } from "./routes/ai";
import { usersRouter } from "./routes/users";

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// ── Routes ──────────────────────────────────────────────
app.use("/meals", mealsRouter);
app.use("/menu", menuRouter);
app.use("/bff", bffRouter);
app.use("/graphql", graphqlRouter);
app.use("/ai", aiRouter);
app.use("/users", usersRouter);

app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ── Global error handler ─────────────────────────────────
// Express 5 forwards async rejections here automatically.
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error", message: err.message });
});

app.listen(PORT, () => {
  console.log(`MealBox backend running on http://localhost:${PORT}`);
});
