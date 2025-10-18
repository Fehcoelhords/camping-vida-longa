const Booking = require("../models/BookingModel");
// A função do Google Calendar foi removida daqui por enquanto
// const { createCalendarEvent } = require('./googleController');

// Importamos as duas novas funções de e-mail
const {
  sendPreBookingEmailToCustomer,
  sendNewBookingNotificationToOwner,
} = require("../utils/emailService");

const createBooking = async (req, res) => {
  try {
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

    // A reserva é criada com o status padrão 'pending'
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
      // --- LÓGICA ATUALIZADA ---
      // Em vez de criar o evento na agenda, agora disparamos os e-mails de pré-reserva
      await Promise.all([
        sendPreBookingEmailToCustomer(booking),
        sendNewBookingNotificationToOwner(booking),
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
