import { loadDishes, saveDishes } from "./storage-service.js";
import { createDishModel } from "../models/dish.js";
import { validateDish } from "../middlewares/validator.js";

export async function createDish(dish) {
  const dishes = await loadDishes();
  const validate = validateDish(dish);

  if (validate === false) {
    throw new Error("Dados inválidos");
  }

  const newDish = createDishModel(dish);
  dishes.push(newDish);
  await saveDishes(dishes);
  return newDish;
}
