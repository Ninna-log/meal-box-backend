# MealBox Backend — Build Log

## Stack
Node.js 20 · TypeScript · Express · Prisma · PostgreSQL · Redis · GraphQL · JWT · Anthropic SDK

---

## Steps

### Day 1 — Backend base + DB ✅
- `npm init -y` → `package.json` with `mealbox-backend`
- Installed runtime deps: `express`, `@prisma/client`, `dotenv`
- Installed dev deps: `typescript`, `ts-node`, `@types/node`, `@types/express`, `nodemon`, `prisma`
- Configured `tsconfig.json` (strict, ES2022, commonjs, rootDir `src`, outDir `dist`)
- Added scripts: `dev`, `build`, `start`, `typecheck`, `migrate:dev`, `migrate:deploy`, `db:seed`, `db:studio`
- Created `.gitignore` and `.env.example`
- Defined Prisma schema: `Chef`, `Meal`, `MealTag`, `WeeklyMenu`, `User`
- Created `src/db/client.ts` — Prisma singleton
- Created `src/services/meals.service.ts` — `getAllMeals`, `getMealById`
- Created `src/services/menu.service.ts` — `getWeeklyMenu` (filters by current week's Sunday)
- Created `src/routes/meals.ts` — `GET /meals`, `GET /meals/:id` (with 400/404 validation)
- Created `src/routes/menu.ts` — `GET /menu/weekly`
- Created `src/index.ts` — Express app, global error handler, `/health` endpoint
- Created `prisma/seed.ts` — 3 chefs, 10 meals, full WeeklyMenu for current week
- Ran `npx prisma generate` → Prisma Client generated
- Ran `npx tsc --noEmit` → **0 errors**

> Full step-by-step reasoning: `../days/day-1.md`

### Day 2 — BFF + SDUI + Redis + GraphQL ✅
- Installed: `ioredis`, `graphql`, `graphql-http`, `cors`, `@types/cors`
- Created `src/cache/redis.ts` — ioredis singleton with `lazyConnect`, retry config, and connect/error event logging
- Created `src/services/bff.service.ts` — builds a typed SDUI component tree (`HeroBanner` + `MealCard[]`) from the weekly menu
- Created `src/routes/bff.ts` — `GET /bff/home` with Redis cache (`key: bff:home`, TTL 1h); adds `X-Cache: HIT/MISS` response header
- Created `src/graphql/schema.ts` — SDL schema with `Chef`, `Meal`, `MealTag`, `Query { meals, meal(id) }`
- Created `src/graphql/resolvers.ts` — root resolvers delegating to `meals.service.ts`
- Created `src/routes/graphql.ts` — `ALL /graphql` via `graphql-http` `createHandler`
- Updated `src/index.ts` — added `cors({ origin: "http://localhost:5173" })`, registered `/bff` and `/graphql` routers
- Ran `npx tsc --noEmit` → **0 errors**

> Full step-by-step reasoning: `../days/day-2.md`
