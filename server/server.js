const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexão com o MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/investments") // Apenas a URL
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.error("Erro ao conectar no MongoDB:", err));

// Definir o Schema do MongoDB
const investmentSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  type: { type: String, required: true },
});

const Investment = mongoose.model("Investment", investmentSchema);

// Rotas
app.get("/api/investments", async (req, res) => {
  const investments = await Investment.find();
  res.json(investments);
});

app.post("/api/investments", async (req, res) => {
  const newInvestment = new Investment(req.body);
  await newInvestment.save();
  res.status(201).json(newInvestment);
});

app.delete("/api/investments/:id", async (req, res) => {
  await Investment.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
