import { Router } from "express";
import { registerUser, loginUser, getUserById } from "../services/users.service";
import { requireAuth } from "../middleware/auth";

export const usersRouter = Router();

// POST /users/register
// Body: { email, password, name }
usersRouter.post("/register", async (req, res) => {
  const { email, password, name } = req.body as {
    email?: string;
    password?: string;
    name?: string;
  };

  if (!email || !password || !name) {
    res.status(400).json({ error: "email, password and name are required" });
    return;
  }
  if (password.length < 8) {
    res.status(400).json({ error: "password must be at least 8 characters" });
    return;
  }

  const result = await registerUser(email.trim(), password, name.trim());
  res.status(201).json(result);
});

// POST /users/login
// Body: { email, password }
usersRouter.post("/login", async (req, res) => {
  const { email, password } = req.body as { email?: string; password?: string };

  if (!email || !password) {
    res.status(400).json({ error: "email and password are required" });
    return;
  }

  const result = await loginUser(email.trim(), password);
  res.json(result);
});

// GET /users/me  — protected
usersRouter.get("/me", requireAuth, async (req, res) => {
  const user = await getUserById(req.user!.userId);
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  res.json(user);
});
