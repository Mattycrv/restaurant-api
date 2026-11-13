import { handleError } from "../middlewares/error-handler.js";
import {
  createDish,
  getAllDishes,
  getDishById,
  getDishByCategory,
} from "../services/dish-service.js";
import { sendJson } from "../utils/response-helper.js";

export async function createDishController(req, res) {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", async () => {
    let dish;
    try {
      dish = JSON.parse(body);
    } catch (error) {
      handleError(res, error);

      return;
    }

    try {
      const newDish = await createDish(dish);
      sendJson(res, 201, newDish);
    } catch (error) {
      handleError(res, error);
    }
  });
}

export async function getAllDishesController(req, res) {
  try {
    const dishes = await getAllDishes();
    sendJson(res, 200, dishes);
  } catch (error) {
    handleError(res, error);
  }
}

export async function getDishByIdController(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;
  const parts = pathname.split("/");
  const id = parts[2];

  try {
    const dishFound = await getDishById(id);
    sendJson(res, 200, dishFound);
  } catch (error) {
    handleError(res, error);
  }
}

export async function getDishByCategoryController(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;
  const parts = pathname.split("/");
  const category = parts[2];

  try {
    const dishesFound = await getDishByCategory(category);
    sendJson(res, 200, dishesFound);
  } catch (error) {
    handleError(res, error);
  }
}
