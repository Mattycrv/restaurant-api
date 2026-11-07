export function validateDish(dish) {
  if (!dish || Array.isArray(dish) || typeof dish !== "object") return false;

  if (
    typeof dish.name !== "string" ||
    dish.name.trim() === "" ||
    !Number.isFinite(dish.price) ||
    dish.price <= 0 ||
    typeof dish.category !== "string" ||
    dish.category.trim() === ""
  ) {
    return false;
  }

  return true;
}
