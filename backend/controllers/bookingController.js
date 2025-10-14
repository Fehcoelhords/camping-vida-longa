const Booking = require("../models/BookingModel");
const { createCalendarEvent } = require("./googleController");
const { sendBookingConfirmationEmail } = require("../utils/emailService");

const createBooking = async (req, res) => {
  try {
    // MUDANÇA: Agora extraímos também o bookingType e o totalPrice
    const {
      name,
      email,
      phone,
      startDate,
      endDate,
      guests,
      bookingType,
      totalPrice,
    } = req.body;

    // MUDANÇA: Validação atualizada para incluir os novos campos
    if (
      !name ||
      !email ||
      !phone ||
      !startDate ||
      !endDate ||
      !guests ||
      !bookingType ||
      totalPrice === undefined
    ) {
      res.status(400);
      throw new Error("Por favor, preencha todos os campos.");
    }

    const bookingCode = Math.random()
      .toString(36)
      .substring(2, 10)
      .toUpperCase();

    // MUDANÇA: Criamos a reserva no banco de dados com todos os novos campos
    const booking = await Booking.create({
      name,
      email,
      phone,
      startDate,
      endDate,
      guests,
      bookingCode,
      bookingType,
      totalPrice,
    });

    if (booking) {
      // Nenhuma mudança aqui, pois as funções já recebem o objeto 'booking' completo
      await Promise.all([
        createCalendarEvent(booking),
        sendBookingConfirmationEmail(booking),
      ]);
    }

    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createBooking,
};
