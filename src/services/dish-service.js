import { loadDishes, saveDishes } from "./storage-service.js";
import { createDishModel } from "../models/dish.js";
import { validateDish } from "../middlewares/validator.js";

export async function createDish(dish) {
  const dishes = await loadDishes();
  const validate = validateDish(dish);

  if (!validate) {
    throw new Error("Dados inválidos");
  }

  const newDish = createDishModel(dish);
  dishes.push(newDish);
  await saveDishes(dishes);
  return newDish;
}

export async function getAllDishes() {
  const dishes = await loadDishes();
  return dishes;
}

export async function getDishById(id) {
  const dishes = await loadDishes();
  const dishFound = dishes.find((dish) => {
    return dish.id === id;
  });

  if (!dishFound) {
    throw new Error("Prato não encontrado.");
  }

  return dishFound;
}
