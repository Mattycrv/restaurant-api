import { loadDishes, saveDishes } from "./storage-service.js";
import { createDishModel } from "../models/dish.js";
import { validateDish } from "../middlewares/validator.js";

export async function createDish(dish) {
  const dishes = await loadDishes();
  const validate = validateDish(dish);

  if (!validate) {
    const error = new Error("Dados inválidos");
    error.statusCode = 400;
    throw error;
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
    const error = new Error("Prato não encontrado.");
    error.statusCode = 404;
    throw error;
  }

  return dishFound;
}

export async function getDishByCategory(category) {
  const dishes = await loadDishes();
  const dishesFound = dishes.filter((dish) => {
    return dish.category === category;
  });

  return dishesFound;
}

export async function updateDish(id, updatedData) {
  const dishes = await loadDishes();
  const dishFound = await getDishById(id);
  const index = dishes.findIndex((dish) => {
    return dish.id === dishFound.id;
  });

  const validate = validateDish(updatedData);

  if (!validate) {
    const error = new Error("Dados inválidos");
    error.statusCode = 400;
    throw error;
  }

  const updatedDish = {
    ...dishFound,
    ...updatedData,
  };

  dishes[index] = updatedDish;

  await saveDishes(dishes);

  return updatedDish;
}

export async function deleteDish(id) {
  const dishes = await loadDishes();
  const dishFound = await getDishById(id);

  const newDishesList = dishes.filter((dish) => {
    return dish.id !== dishFound.id;
  });

  await saveDishes(newDishesList);

  return newDishesList;
}
