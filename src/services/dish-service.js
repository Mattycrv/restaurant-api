import { loadDishes, saveDishes } from "./storage-service.js";
import { createDishModel } from "../models/dish.js";

export async function createDish(dish) {
  const dishes = await loadDishes();
  const newDish = createDishModel(dish);
  dishes.push(newDish);
  await saveDishes(dishes);
  return newDish;
}
