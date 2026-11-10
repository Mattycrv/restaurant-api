export function createRouter(req, routes) {
  const routerFound = routes.find((route) => {
    return route.method === req.method && route.path === req.url;
  });

  return routerFound;
}
