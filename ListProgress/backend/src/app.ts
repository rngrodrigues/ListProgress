import express from "express";
import cardRoutes from "./routes/cardRoutes.ts";
import taskRoutes from "./routes/taskRoutes.ts";
import authRoutes from "./routes/authRoutes.ts"; 

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);       
app.use("/cards", cardRoutes);
app.use("/tasks", taskRoutes);

export default app;
