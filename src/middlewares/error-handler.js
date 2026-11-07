export function handleError(res, error) {
  res.writeHead(400, {
    "Content-Type": "application/json; charset=utf-8",
  });

  res.end(
    JSON.stringify({
      message: error.message,
    }),
  );
}
