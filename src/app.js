import express from "express";
import routes from "./routes.js";

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use("/api/v1", routes);

// Public directory
app.use(express.static("public"));

export default app;
