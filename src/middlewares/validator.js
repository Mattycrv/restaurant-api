export function validateDish(dish) {
  if (!dish || Array.isArray(dish) || typeof dish !== "object") return false;

  const allowedKeys = ["name", "price", "category"];

  const hasInvalidProperty = Object.keys(dish).some((key) => {
    return !allowedKeys.includes(key);
  });

  if (
    typeof dish.name !== "string" ||
    dish.name.trim() === "" ||
    !Number.isFinite(dish.price) ||
    dish.price <= 0 ||
    typeof dish.category !== "string" ||
    dish.category.trim() === "" ||
    hasInvalidProperty
  ) {
    return false;
  }

  return true;
}
