import { createDishController } from "../controllers/dish-controller.js";
import { sendJson } from "../utils/response-helper.js";

export function dishRoutes(req, res) {
  if (req.method === "POST" && req.url === "/pratos") {
    createDishController(req, res);
  } else {
    sendJson(res, 404, { message: "Rota não encontrada" });
  }
}
