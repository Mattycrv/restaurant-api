import { randomUUID } from "node:crypto";

export function createDishModel(dish) {
  const newDish = {
    id: randomUUID(),
    name: dish.name,
    price: dish.price,
    category: dish.category,
  };

  return newDish;
}
