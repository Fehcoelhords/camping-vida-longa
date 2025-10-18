const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    bookingCode: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Por favor, adicione um nome"],
    },
    email: {
      type: String,
      required: [true, "Por favor, adicione um e-mail"],
    },
    phone: {
      type: String,
      required: [true, "Por favor, adicione um telefone"],
    },
    startDate: {
      type: Date,
      required: [true, "Por favor, adicione uma data de início"],
    },
    endDate: {
      type: Date,
      required: [true, "Por favor, adicione uma data de término"],
    },
    guests: {
      type: Number,
      required: [true, "Por favor, adicione o número de hóspedes"],
    },
    bookingType: {
      type: String,
      required: [true, "Por favor, especifique o tipo de reserva"],
    },
    totalPrice: {
      type: Number,
      required: [true, "Por favor, adicione o preço total"],
    },
    // --- NOVO CAMPO ADICIONADO ---
    status: {
      type: String,
      enum: ["pending", "confirmed"], // A reserva só pode ter um desses dois status
      default: "pending", // Por padrão, toda nova reserva começa como 'pendente'
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", bookingSchema);
