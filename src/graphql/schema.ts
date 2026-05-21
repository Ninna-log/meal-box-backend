import { buildSchema } from "graphql";

export const schema = buildSchema(`
  type Chef {
    id: Int
    name: String
    bio: String
  }

  type MealTag {
    id: Int
    label: String
  }

  type Meal {
    id: Int
    name: String
    description: String
    price: Float
    imageUrl: String
    chef: Chef
    tags: [MealTag]
  }

  type Query {
    meals: [Meal]
    meal(id: Int): Meal
  }
`);
