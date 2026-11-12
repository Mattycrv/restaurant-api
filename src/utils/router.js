export function createRouter(req, routes) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  const routerFound = routes.find((route) => {
    const routeParts = route.path.split("/");
    const requestsParts = pathname.split("/");
    const sameLength = routeParts.length === requestsParts.length;

    const match = routeParts.every((part, index) => {
      return part === ":id" || part === requestsParts[index];
    });

    return route.method === req.method && sameLength && match;
  });

  return routerFound;
}
