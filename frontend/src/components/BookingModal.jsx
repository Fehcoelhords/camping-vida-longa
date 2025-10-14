import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCalendarCheck,
  FaUsers,
  FaMoneyBillWave,
} from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { differenceInDays } from "date-fns";
import { pricingTiers } from "../config";

function BookingModal({ show, onClose, bookingDetails }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bookingType, setBookingType] = useState(pricingTiers[0].id);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (show && bookingDetails.startDate && bookingDetails.endDate) {
      const nights =
        differenceInDays(
          new Date(bookingDetails.endDate),
          new Date(bookingDetails.startDate)
        ) || 1;
      const guests = bookingDetails.guests > 0 ? bookingDetails.guests : 1;
      const selectedTier = pricingTiers.find((tier) => tier.id === bookingType);

      if (nights >= 1 && selectedTier) {
        let calculatedPrice = 0;
        if (selectedTier.type === "fixed") {
          calculatedPrice = nights * selectedTier.price;
        } else if (selectedTier.type === "per_person") {
          calculatedPrice = nights * guests * selectedTier.price;
        }
        setTotalPrice(calculatedPrice);
      } else {
        setTotalPrice(0);
      }
    }
  }, [show, bookingDetails, bookingType]);

  const formatDate = (date) => new Date(date).toLocaleDateString("pt-BR");

  // --- FUNÇÃO DE ENVIO FINAL E COMPLETA ---
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name || !email || !phone) {
      toast.error("Por favor, preencha seus dados de contato.");
      return;
    }

    setIsSubmitting(true);

    // Objeto final com TODOS os dados
    const finalBookingData = {
      ...bookingDetails,
      name,
      email,
      phone,
      bookingType,
      totalPrice,
    };

    try {
      // Enviando os dados completos para a API
      const response = await axios.post(
        "http://localhost:5000/api/bookings",
        finalBookingData
      );

      toast.success(`Reserva para ${name} confirmada com sucesso!`);
      console.log("Resposta da API:", response.data);

      onClose();
    } catch (error) {
      toast.error("Houve um erro ao processar sua reserva.");
      console.error("Erro ao criar a reserva:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!show) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-80 z-40 flex justify-center items-start overflow-y-auto p-4 py-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative z-50 bg-dark-bg text-main-text rounded-lg shadow-2xl w-full max-w-lg p-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-heading text-brand-orange">
                Finalize sua Reserva
              </h2>
              <button
                onClick={onClose}
                className="text-secondary-text hover:text-main-text text-2xl"
              >
                <FaTimes />
              </button>
            </div>

            <div className="bg-brand-green bg-opacity-30 p-4 rounded-md mb-6 text-sm space-y-2">
              <div className="flex items-center">
                <FaCalendarCheck className="mr-3 text-brand-orange" />
                <span>
                  De <strong>{formatDate(bookingDetails.startDate)}</strong> até{" "}
                  <strong>{formatDate(bookingDetails.endDate)}</strong>
                </span>
              </div>
              <div className="flex items-center">
                <FaUsers className="mr-3 text-brand-orange" />
                <span>
                  <strong>{bookingDetails.guests}</strong> Hóspede(s)
                </span>
              </div>
              <div className="flex items-center text-lg font-heading">
                <FaMoneyBillWave className="mr-3 text-brand-orange" />
                <span>
                  Valor Total:{" "}
                  <strong className="ml-2">
                    R$ {totalPrice.toFixed(2).replace(".", ",")}
                  </strong>
                </span>
              </div>
            </div>

            <div className="mb-6">
              <label className="text-main-text font-bold mb-3 text-base block">
                Escolha o Tipo de Estadia
              </label>
              <div className="space-y-3">
                {pricingTiers.map((tier) => (
                  <div
                    key={tier.id}
                    onClick={() => setBookingType(tier.id)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                      bookingType === tier.id
                        ? "border-brand-orange bg-brand-green/30"
                        : "border-brand-green/50 hover:border-brand-orange/80"
                    }`}
                  >
                    <h4 className="font-bold text-main-text">{tier.name}</h4>
                    <p className="text-xs text-secondary-text">
                      {tier.description}
                    </p>
                    <p className="font-bold text-brand-orange mt-1">
                      {tier.type === "fixed"
                        ? `R$ ${tier.price
                            .toFixed(2)
                            .replace(".", ",")} / diária`
                        : `R$ ${tier.price
                            .toFixed(2)
                            .replace(".", ",")} / pessoa por dia`}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="flex flex-col">
                  <label className="text-secondary-text mb-1 text-sm">
                    Nome Completo
                  </label>
                  <div className="relative">
                    <FaUser className="absolute top-1/2 left-3 -translate-y-1/2 text-secondary-text" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Seu nome completo"
                      required
                      className="w-full bg-transparent pl-10 pr-4 py-2 text-main-text border border-brand-green rounded focus:outline-none focus:ring-2 focus:ring-brand-orange"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="text-secondary-text mb-1 text-sm">
                    E-mail
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute top-1/2 left-3 -translate-y-1/2 text-secondary-text" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu@email.com"
                      required
                      className="w-full bg-transparent pl-10 pr-4 py-2 text-main-text border border-brand-green rounded focus:outline-none focus:ring-2 focus:ring-brand-orange"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="text-secondary-text mb-1 text-sm">
                    Telefone / WhatsApp
                  </label>
                  <div className="relative">
                    <FaPhone className="absolute top-1/2 left-3 -translate-y-1/2 text-secondary-text" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(11) 98765-4321"
                      required
                      className="w-full bg-transparent pl-10 pr-4 py-2 text-main-text border border-brand-green rounded focus:outline-none focus:ring-2 focus:ring-brand-orange"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-brand-orange text-white font-bold font-heading py-3 px-6 rounded hover:bg-opacity-90 transition-all duration-300 w-full disabled:bg-gray-500 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Confirmando..." : "CONFIRMAR RESERVA"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default BookingModal;
