import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.weeklyMenu.deleteMany();
  await prisma.mealTag.deleteMany();
  await prisma.meal.deleteMany();
  await prisma.chef.deleteMany();

  const ana = await prisma.chef.create({
    data: {
      name: "Chef Ana Torres",
      bio: "Specializes in Mediterranean cuisine with a modern twist. 15 years of experience across Barcelona and Buenos Aires.",
    },
  });

  const marcos = await prisma.chef.create({
    data: {
      name: "Chef Marcos Vidal",
      bio: "Plant-based chef with a passion for making vegetables the star of every plate. Trained in Tokyo and Mexico City.",
    },
  });

  const lucia = await prisma.chef.create({
    data: {
      name: "Chef Lucía Ferrer",
      bio: "French-trained pastry chef who pivoted to comfort food. Her slow-cooked dishes are legendary in Buenos Aires.",
    },
  });

  const mealData = [
    {
      name: "Pasta al Limone",
      description: "Fresh tagliatelle with lemon cream sauce, capers, and parmesan.",
      price: 12.5,
      imageUrl: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800",
      chefId: ana.id,
      tags: ["pasta", "vegetarian", "italian"],
    },
    {
      name: "Grilled Salmon Bowl",
      description: "Atlantic salmon over quinoa with roasted vegetables and tahini.",
      price: 15.9,
      imageUrl: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800",
      chefId: ana.id,
      tags: ["fish", "gluten-free", "healthy"],
    },
    {
      name: "Chickpea Shakshuka",
      description: "Spiced tomato sauce with poached eggs and crispy chickpeas.",
      price: 11.0,
      imageUrl: "https://images.unsplash.com/photo-1590412200988-a436970781fa?w=800",
      chefId: marcos.id,
      tags: ["vegetarian", "spicy", "protein"],
    },
    {
      name: "Black Bean Tacos",
      description: "Smoked black beans, pickled red onion, avocado, and chipotle crema.",
      price: 10.5,
      imageUrl: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800",
      chefId: marcos.id,
      tags: ["vegan", "mexican", "tacos"],
    },
    {
      name: "Roasted Cauliflower Steak",
      description: "Whole roasted cauliflower with harissa, pomegranate, and pine nuts.",
      price: 13.0,
      imageUrl: "https://images.unsplash.com/photo-1568625365131-079e026a927d?w=800",
      chefId: marcos.id,
      tags: ["vegan", "gluten-free", "middle-eastern"],
    },
    {
      name: "Slow-Cooked Beef Stew",
      description: "8-hour braised beef with root vegetables and red wine reduction.",
      price: 16.5,
      imageUrl: "https://images.unsplash.com/photo-1547592180-85f173990554?w=800",
      chefId: lucia.id,
      tags: ["beef", "comfort", "gluten-free"],
    },
    {
      name: "Duck Confit Risotto",
      description: "Creamy arborio rice with shredded duck leg and crispy skin shards.",
      price: 18.0,
      imageUrl: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800",
      chefId: lucia.id,
      tags: ["duck", "italian", "comfort"],
    },
    {
      name: "Chicken Provençal",
      description: "Free-range chicken thighs braised with olives, tomatoes, and herbs.",
      price: 14.5,
      imageUrl: "https://images.unsplash.com/photo-1598103442097-8b74394b95c1?w=800",
      chefId: lucia.id,
      tags: ["chicken", "french", "gluten-free"],
    },
    {
      name: "Mushroom Ramen",
      description: "Rich miso broth with shiitake, soft egg, nori, and bamboo shoots.",
      price: 13.5,
      imageUrl: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=800",
      chefId: marcos.id,
      tags: ["vegetarian", "japanese", "soup"],
    },
    {
      name: "Greek Lamb Chops",
      description: "Herb-marinated lamb chops with tzatziki and charred pita.",
      price: 19.0,
      imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800",
      chefId: ana.id,
      tags: ["lamb", "greek", "grilled"],
    },
  ];

  const meals = await Promise.all(
    mealData.map(({ tags, ...meal }) =>
      prisma.meal.create({
        data: {
          ...meal,
          tags: { create: tags.map((label) => ({ label })) },
        },
      })
    )
  );

  const startOfWeek = new Date();
  startOfWeek.setHours(0, 0, 0, 0);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

  await Promise.all(
    meals.map((meal) =>
      prisma.weeklyMenu.create({
        data: { weekStart: startOfWeek, mealId: meal.id },
      })
    )
  );

  console.log(`Seeded ${meals.length} meals for week starting ${startOfWeek.toISOString().split("T")[0]}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
