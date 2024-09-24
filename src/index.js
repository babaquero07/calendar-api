import app from "./app.js";

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}/api/v1`);
});

server.on("error", (error) => {
  console.error("Error starting server:", error);
});
