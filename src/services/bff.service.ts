import { getWeeklyMenu } from "./menu.service";

// ── SDUI types ────────────────────────────────────────────────────────────────

type HeroBannerComponent = {
  type: "HeroBanner";
  props: { title: string; subtitle: string };
};

type MealCardComponent = {
  type: "MealCard";
  props: {
    id: number;
    name: string;
    chef: string;
    price: number;
    imageUrl: string;
    tags: string[];
  };
};

type SduiComponent = HeroBannerComponent | MealCardComponent;

type HomeScreen = {
  screen: "home";
  components: SduiComponent[];
};

// ── Builder ───────────────────────────────────────────────────────────────────

export async function buildHomeScreen(): Promise<HomeScreen> {
  const menuItems = await getWeeklyMenu();

  const components: SduiComponent[] = [
    {
      type: "HeroBanner",
      props: {
        title: "This Week's Menu",
        subtitle: `${menuItems.length} chef-crafted meals, delivered to your door`,
      },
    },
    ...menuItems.map(
      (item): MealCardComponent => ({
        type: "MealCard",
        props: {
          id: item.meal.id,
          name: item.meal.name,
          chef: item.meal.chef.name,
          price: item.meal.price,
          imageUrl: item.meal.imageUrl,
          tags: item.meal.tags.map((t) => t.label),
        },
      })
    ),
  ];

  return { screen: "home", components };
}
