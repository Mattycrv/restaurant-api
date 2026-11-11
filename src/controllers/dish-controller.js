import { handleError } from "../middlewares/error-handler.js";
import { createDish, getAllDishes } from "../services/dish-service.js";
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
