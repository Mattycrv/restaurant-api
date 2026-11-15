import {
  createDishController,
  getAllDishesController,
  getDishByIdController,
  getDishByCategoryController,
  updateDishController,
  deleteDishController,
} from "../controllers/dish-controller.js";
import { sendJson } from "../utils/response-helper.js";
import { createRouter } from "../utils/router.js";

export function dishRoutes(req, res) {
  const routes = [
    {
      method: "POST",
      path: "/pratos",
      handler: createDishController,
    },
    {
      method: "GET",
      path: "/pratos",
      handler: getAllDishesController,
    },
    {
      method: "GET",
      path: "/pratos/categoria/:cat",
      handler: getDishByCategoryController,
    },
    {
      method: "GET",
      path: "/pratos/:id",
      handler: getDishByIdController,
    },
    {
      method: "PUT",
      path: "/pratos/:id",
      handler: updateDishController,
    },
    {
      method: "DELETE",
      path: "/pratos/:id",
      handler: deleteDishController,
    },
  ];

  const route = createRouter(req, routes);

  if (route) {
    route.handler(req, res);
  } else {
    sendJson(res, 404, { message: "Rota não encontrada" });
  }
}
