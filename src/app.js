import express from "express";
import routes from "./routes.js";

const app = express();

// Public directory
app.use(express.static("public"));

// Routes
app.use("/api/v1", routes);

export default app;
