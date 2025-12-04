import express from "express";
import cardRoutes from "./routes/cardRoutes";
import taskRoutes from "./routes/taskRoutes";

const app = express();
app.use(express.json());

app.use("/cards", cardRoutes);
app.use("/tasks", taskRoutes);

export default app;
