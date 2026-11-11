import { createServer } from "node:http";
import { dishRoutes } from "./routes/dish-routes.js";

const server = createServer((req, res) => {
  dishRoutes(req, res);
});

server.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
