const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Conectado com Sucesso: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Erro ao conectar com o MongoDB: ${error.message}`);
    process.exit(1); // Encerra o processo com falha
  }
};

module.exports = connectDB;
