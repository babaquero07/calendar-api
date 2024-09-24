import app from "./app.js";
import { dbConnection } from "./database/config.js";

const PORT = process.env.PORT || 3000;

// Connect to MongoDB database
dbConnection();

const server = app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}/api/v1`);
});

server.on("error", (error) => {
  console.error("Error starting server:", error);
});
