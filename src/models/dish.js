export function createDishModel(dish) {
  const newDish = {
    name: dish.name,
    price: dish.price,
    category: dish.category,
  };

  return newDish;
}
