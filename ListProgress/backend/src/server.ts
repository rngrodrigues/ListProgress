import express from "express";
import cors from "cors"; 
import cardRoutes from "./routes/cardRoutes.ts";
import taskRoutes from "./routes/taskRoutes.ts";
import authRoutes from './routes/authRoutes.ts';

const app = express();

app.use(cors()); 
app.use(express.json());

app.use('/auth', authRoutes);
app.use("/cards", cardRoutes);
app.use("/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("API funcionando");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
