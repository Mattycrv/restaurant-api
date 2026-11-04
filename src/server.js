import { createServer } from "node:http";
import { loadDishes, saveDishes } from "./services/storage-service.js";

const server = createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const parts = url.pathname.split("/");
  const id = parts[2];
  const category = parts[3];

  if (
    req.method === "GET" &&
    parts[1] === "pratos" &&
    id !== undefined &&
    !/^\d+$/.test(id) &&
    parts.length === 3
  ) {
    res.writeHead(400, {
      "Content-Type": "application/json; charset=utf-8",
    });

    res.end(
      JSON.stringify({
        message: "ID inválido",
      }),
    );

    return;
  }

  if (req.method === "POST" && url.pathname === "/pratos") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
      console.log(chunk);
    });

    req.on("end", async () => {
      let dish;
      try {
        dish = JSON.parse(body);
      } catch (error) {
        res.writeHead(400, {
          "Content-Type": "application/json; charset=utf-8",
        });

        res.end(
          JSON.stringify({
            message: "JSON inválido",
          }),
        );

        return;
      }

      try {
        const dishes = await loadDishes();

        if (
          typeof dish.name !== "string" ||
          dish.name.trim() === "" ||
          !Number.isFinite(dish.price) ||
          dish.price <= 0 ||
          typeof dish.category !== "string" ||
          dish.category.trim() === ""
        ) {
          res.writeHead(400, {
            "Content-Type": "application/json; charset=utf-8",
          });

          res.end(
            JSON.stringify({
              message: "Dados inválidos",
            }),
          );

          return;
        }

        dishes.push(dish);
        await saveDishes(dishes);

        res.writeHead(201, {
          "Content-Type": "application/json; charset=utf-8",
        });

        res.end(
          JSON.stringify({
            message: "Prato criado com sucesso!",
            dish: dish,
          }),
        );
      } catch (error) {
        console.error("Erro interno do servidor", error);

        res.writeHead(500, {
          "Content-Type": "application/json; charset=utf-8",
        });

        res.end(
          JSON.stringify({
            message: "Erro interno do servidor",
          }),
        );

        return;
      }
    });
    return;
  }

  if (
    req.method === "GET" &&
    parts[1] === "pratos" &&
    id !== undefined &&
    /^\d+$/.test(id) &&
    parts.length === 3
  ) {
    res.writeHead(200, {
      "Content-Type": "application/json; charset=utf-8",
    });

    res.end(
      JSON.stringify({
        message: "Prato encontrado!",
        id: id,
      }),
    );

    return;
  }

  if (
    req.method === "GET" &&
    parts[1] === "pratos" &&
    parts[2] === "categoria" &&
    parts.length === 4
  ) {
    res.writeHead(200, {
      "Content-Type": "application/json; charset=utf-8",
    });

    res.end(
      JSON.stringify({
        message: "Categoria identificada!",
        category: category,
      }),
    );

    return;
  }

  if (req.method === "GET" && url.pathname === "/pratos") {
    res.writeHead(200, {
      "Content-Type": "application/json; charset=utf-8",
    });

    res.end(
      JSON.stringify({
        message: "API de restaurante funcionando!",
      }),
    );
  } else {
    res.writeHead(404, {
      "Content-Type": "application/json; charset=utf-8",
    });

    res.end(
      JSON.stringify({
        message: "Rota não encontrada",
      }),
    );
  }
});

server.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
