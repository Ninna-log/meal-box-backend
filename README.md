# MealBox — Backend

Node.js + TypeScript + Express + Prisma + PostgreSQL

---

## Prerequisites

- Node.js 20+
- PostgreSQL (local or via Docker)
- A `.env` file with valid credentials (see below)

---

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Start PostgreSQL

**Option A — Docker (recommended):**

```bash
docker run --name mealbox-db \
  -e POSTGRES_USER=ninna \
  -e POSTGRES_PASSWORD=secret \
  -e POSTGRES_DB=mealbox \
  -p 5432:5432 \
  -d postgres:16
```

If the container already exists and is stopped:

```bash
docker start mealbox-db
```

**Option B — Homebrew:**

```bash
brew services start postgresql@14
```

### 3. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env` with your credentials:

```env
DATABASE_URL=postgresql://ninna:secret@localhost:5432/mealbox
REDIS_URL=redis://localhost:6379
JWT_SECRET=change_me_to_a_long_random_string
ANTHROPIC_API_KEY=sk-ant-...
PORT=3001
```

### 4. Run database migrations

```bash
npm run migrate:dev
# When prompted for a migration name, type: init
```

### 5. Seed the database

```bash
npm run db:seed
# → Seeded 10 meals for week starting YYYY-MM-DD
```

### 6. Start the development server

```bash
npm run dev
# → MealBox backend running on http://localhost:3001
```

---

## Available endpoints

| Method | Path           | Description                              |
| ------ | -------------- | ---------------------------------------- |
| `GET`  | `/health`      | Server health check                      |
| `GET`  | `/meals`       | List all meals with chef and tags        |
| `GET`  | `/meals/:id`   | Get a single meal by ID                  |
| `GET`  | `/menu/weekly` | Get all meals on the current week's menu |

### Example requests

```bash
curl http://localhost:3001/health
curl http://localhost:3001/meals
curl http://localhost:3001/meals/1
curl http://localhost:3001/meals/999      # → 404
curl http://localhost:3001/meals/abc      # → 400
curl http://localhost:3001/menu/weekly
```

---

## Useful scripts

| Script                   | Command                               | Description                            |
| ------------------------ | ------------------------------------- | -------------------------------------- |
| `npm run dev`            | `nodemon --exec ts-node src/index.ts` | Start server with hot reload           |
| `npm run build`          | `tsc`                                 | Compile to `dist/`                     |
| `npm run start`          | `node dist/index.js`                  | Run compiled build                     |
| `npm run typecheck`      | `tsc --noEmit`                        | Type-check without building            |
| `npm run migrate:dev`    | `prisma migrate dev`                  | Create and apply a new migration       |
| `npm run migrate:deploy` | `prisma migrate deploy`               | Apply existing migrations (production) |
| `npm run db:seed`        | `prisma db seed`                      | Seed the database                      |
| `npm run db:studio`      | `prisma studio`                       | Open Prisma Studio at `localhost:5555` |

---

## Project structure

```
backend/
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── seed.ts           # Seed script (3 chefs, 10 meals)
├── src/
│   ├── index.ts          # Express app entry point
│   ├── db/
│   │   └── client.ts     # Prisma singleton
│   ├── routes/
│   │   ├── meals.ts      # GET /meals, GET /meals/:id
│   │   └── menu.ts       # GET /menu/weekly
│   └── services/
│       ├── meals.service.ts
│       └── menu.service.ts
├── .env.example
├── tsconfig.json
└── tsconfig.seed.json    # Extended tsconfig for seed script
```
