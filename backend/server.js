require("dotenv").config();
const express = require("express");
const cors = require("cors"); // Importe o pacote cors
const connectDB = require("./config/db");

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// --- CONFIGURAÇÃO DO CORS ---
app.use(cors()); // Permite que o front-end se comunique com o back-end

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rotas
app.get("/api", (req, res) => {
  res.json({ message: "Bem-vindo à API do Camping Vida Longa!" });
});
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/google", require("./routes/googleRoutes"));

app.listen(PORT, () => {
  console.log(`Servidor rodando com sucesso na porta ${PORT}`);
});
