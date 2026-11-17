export function handleError(res, error) {
  const statusCode = error.statusCode || 400;

  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
  });

  res.end(
    JSON.stringify({
      message: error.message,
    }),
  );
}
