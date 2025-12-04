import express from "express";
import cors from "cors"; 
import cardsRoutes from "./routes/cardRoutes.ts";

const app = express();

app.use(cors()); 
app.use(express.json());

app.use("/cards", cardsRoutes);

app.get("/", (req, res) => {
  res.send("API funcionando");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
