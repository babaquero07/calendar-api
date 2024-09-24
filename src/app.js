import express from "express";
import routes from "./routes.js";
import cors from "cors";

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/v1", routes);

// Public directory
app.use(express.static("public"));

export default app;
