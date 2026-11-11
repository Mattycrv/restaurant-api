import {
  createDishController,
  getAllDishesController,
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
  ];

  const route = createRouter(req, routes);

  if (route) {
    route.handler(req, res);
  } else {
    sendJson(res, 404, { message: "Rota não encontrada" });
  }
}
