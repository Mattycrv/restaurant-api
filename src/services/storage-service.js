import { readFile, writeFile } from "node:fs/promises";

export async function loadDishes() {
  const data = await readFile("data.json", "utf-8");
  const dishes = JSON.parse(data);
  return dishes;
}

export async function saveDishes(dishes) {
  await writeFile("data.json", JSON.stringify(dishes));
}
