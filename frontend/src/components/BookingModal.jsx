import React, { useEffect, useRef, useState } from "react";
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
import { differenceInDays, parseISO } from "date-fns";
import { pricingTiers } from "../config"; // mantém o caminho original

export default function BookingModal({ show, onClose, bookingDetails }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [bookingType, setBookingType] = useState(
    pricingTiers && pricingTiers.length > 0 ? pricingTiers[0].id : null
  );
  const [totalPrice, setTotalPrice] = useState(0);
  const [isOverCapacity, setIsOverCapacity] = useState(false);
  const [isDateBlocked, setIsDateBlocked] = useState(false);
  const [isInvalidCasalGuests, setIsInvalidCasalGuests] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [buttonMessage, setButtonMessage] = useState("CONFIRMAR RESERVA");
  const timeoutsRef = useRef([]);
  const abortControllerRef = useRef(null);

  const loadingStages = [
    "🔄 Procurando vagas...",
    "🏕️ Preparando sua reserva...",
    "✅ Finalizando pré-reserva...",
  ];

  const datesOverlap = (start1, end1, start2, end2) => {
    const s1 = new Date(start1);
    const e1 = new Date(end1);
    const s2 = new Date(start2);
    const e2 = new Date(end2);
    return s1 <= e2 && e1 >= s2;
  };

  useEffect(() => {
    if (!show || !bookingDetails) return;

    const start = bookingDetails.startDate;
    const end = bookingDetails.endDate;

    if (!start || !end) {
      setTotalPrice(0);
      setIsOverCapacity(false);
      setIsDateBlocked(false);
      setIsInvalidCasalGuests(false);
      return;
    }

    let nights = differenceInDays(new Date(end), new Date(start));
    if (nights <= 0) nights = 1;

    const guests =
      bookingDetails.guests && bookingDetails.guests > 0
        ? bookingDetails.guests
        : 1;

    const selectedTier = pricingTiers.find((t) => t.id === bookingType);

    if (selectedTier) {
      let calculatedPrice = 0;
      const pricePerPerson = Number(selectedTier.pricePerPerson || 0);

      // 🏕️ Barraca casal: valida número par e calcula por pessoa
      if (selectedTier.id === "propria_casal") {
        if (guests % 2 !== 0) {
          setIsInvalidCasalGuests(true);
          calculatedPrice = 0;
        } else {
          setIsInvalidCasalGuests(false);
          calculatedPrice = nights * guests * pricePerPerson;
        }
      } else {
        setIsInvalidCasalGuests(false);
        calculatedPrice = nights * guests * pricePerPerson;
      }

      setTotalPrice(calculatedPrice);

      // lotação
      setIsOverCapacity(
        !!selectedTier.maxGuests && guests > selectedTier.maxGuests
      );

      // datas bloqueadas
      let blocked = false;
      if (Array.isArray(selectedTier.blackoutDates)) {
        const userStart = new Date(start);
        const userEnd = new Date(end);
        for (const blackout of selectedTier.blackoutDates) {
          const blackoutStart = parseISO(blackout.start);
          const blackoutEnd = parseISO(blackout.end);
          if (datesOverlap(userStart, userEnd, blackoutStart, blackoutEnd)) {
            blocked = true;
            break;
          }
        }
      }
      setIsDateBlocked(blocked);
    } else {
      setTotalPrice(0);
      setIsOverCapacity(false);
      setIsDateBlocked(false);
      setIsInvalidCasalGuests(false);
    }
  }, [show, bookingDetails, bookingType]);

  useEffect(() => {
    if (!show) {
      clearAllTimers();
      abortControllerRef.current?.abort?.();
      setIsSubmitting(false);
      setButtonMessage("CONFIRMAR RESERVA");
    }
    return () => {
      clearAllTimers();
      abortControllerRef.current?.abort?.();
    };
  }, [show]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [show]);

  function clearAllTimers() {
    (timeoutsRef.current || []).forEach((t) => clearTimeout(t));
    timeoutsRef.current = [];
  }

  function startLoadingMessages() {
    clearAllTimers();
    setButtonMessage(loadingStages[0]);
    loadingStages.forEach((msg, index) => {
      const t = setTimeout(() => setButtonMessage(msg), index * 1800);
      timeoutsRef.current.push(t);
    });
  }

  function stopLoadingMessages(finalText) {
    clearAllTimers();
    setButtonMessage(finalText);
    const t = setTimeout(() => setButtonMessage("CONFIRMAR RESERVA"), 2500);
    timeoutsRef.current.push(t);
  }

  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString("pt-BR") : "-";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isOverCapacity) {
      toast.error(
        "O tipo de estadia selecionado não suporta essa quantidade de hóspedes."
      );
      return;
    }
    if (isDateBlocked) {
      toast.error(
        "As datas selecionadas não estão disponíveis para esse tipo de estadia."
      );
      return;
    }
    if (isInvalidCasalGuests) {
      toast.error(
        "Este tipo de barraca é exclusivo para duplas 🌿 — selecione um número par de hóspedes (2, 4, 6...)."
      );
      return;
    }
    if (!name || !email || !phone) {
      toast.error("Por favor, preencha seus dados de contato.");
      return;
    }

    setIsSubmitting(true);
    startLoadingMessages();

    const payload = {
      ...bookingDetails,
      name,
      email,
      phone,
      bookingType,
      totalPrice,
    };

    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      await axios.post(`${apiUrl}/api/bookings`, payload, { signal });

      stopLoadingMessages("✅ Pré-reserva enviada!");
      toast.success(
        "Pré-reserva realizada com sucesso! Verifique seu e-mail para instruções de pagamento."
      );
      onClose();
    } catch (err) {
      console.error("Erro ao criar reserva:", err);
      stopLoadingMessages("❌ Erro ao confirmar");
      toast.error("Houve um erro ao processar sua reserva. Tente novamente.");
    } finally {
      setIsSubmitting(false);
      abortControllerRef.current = null;
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
            transition={{ type: "spring", stiffness: 120, damping: 16 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cabeçalho */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-heading text-brand-orange">
                Finalize sua reserva
              </h2>
              <button
                onClick={onClose}
                className="text-secondary-text hover:text-main-text text-2xl"
              >
                <FaTimes />
              </button>
            </div>

            {/* Resumo da reserva */}
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
                  <strong>{bookingDetails.guests || 1}</strong> Hóspede(s)
                </span>
              </div>
              <div className="flex items-center text-lg font-header">
                <FaMoneyBillWave className="mr-3 text-brand-orange" />
                <span>
                  Valor Total:{" "}
                  <strong className="ml-2">
                    R$
                    {Number(totalPrice || 0)
                      .toFixed(2)
                      .replace(".", ",")}
                  </strong>
                </span>
              </div>
            </div>

            {/* Escolha de estadia */}
            <div className="mb-6">
              <label className="text-main-text font-bold mb-3 text-base block">
                Escolha o tipo de estadia
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
                      R$
                      {Number(tier.pricePerPerson || 0)
                        .toFixed(2)
                        .replace(".", ",")}{" "}
                      / pessoa por dia
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Avisos */}
            <AnimatePresence>
              {isInvalidCasalGuests && (
                <motion.div
                  className="bg-yellow-600/30 border border-yellow-400 text-yellow-200 text-sm p-4 rounded-lg my-4"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <p className="font-bold">Aviso 🌿</p>
                  <p>
                    Este tipo de barraca é exclusivo para duplas 🌿 — selecione
                    um número par de hóspedes (2, 4, 6...).
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {isOverCapacity && (
                <motion.div
                  className="bg-red-500/20 border border-red-500 text-red-300 text-sm p-4 rounded-lg my-6"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <p className="font-bold">Lotação excedida!</p>
                  <p>
                    A capacidade máxima para esta estadia é de{" "}
                    {pricingTiers.find((t) => t.id === bookingType)
                      ?.maxGuests || "X"}{" "}
                    pessoas.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {isDateBlocked && (
                <motion.div
                  className="bg-yellow-500/20 border border-yellow-400 text-yellow-200 text-sm p-4 rounded-lg my-6"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <p className="font-bold">Período indisponível 🌿</p>
                  <p>
                    Qualquer dúvida, entre em contato conosco pelo WhatsApp 💬
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Formulário */}
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                {/* Nome */}
                <div className="flex flex-col">
                  <label className="text-secondary-text mb-1 text-sm">
                    Nome completo
                  </label>
                  <div className="relative">
                    <FaUser className="absolute top-1/2 left-3 -translate-y-1/2 text-secondary-text" />
                    <input
                      type="text"
                      value={name}
                      placeholder="Seu nome completo"
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full bg-transparent pl-10 pr-4 py-2 text-main-text border border-brand-green rounded focus:outline-none focus:ring-2 focus:ring-brand-orange"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="flex flex-col">
                  <label className="text-secondary-text mb-1 text-sm">
                    E-mail
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute top-1/2 left-3 -translate-y-1/2 text-secondary-text" />
                    <input
                      type="email"
                      value={email}
                      placeholder="seu@email.com"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-transparent pl-10 pr-4 py-2 text-main-text border border-brand-green rounded focus:outline-none focus:ring-2 focus:ring-brand-orange"
                    />
                  </div>
                </div>

                {/* Telefone */}
                <div className="flex flex-col">
                  <label className="text-secondary-text mb-1 text-sm">
                    Telefone / WhatsApp
                  </label>
                  <div className="relative">
                    <FaPhone className="absolute top-1/2 left-3 -translate-y-1/2 text-secondary-text" />
                    <input
                      type="tel"
                      value={phone}
                      placeholder="(11) 98765-4321"
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full bg-transparent pl-10 pr-4 py-2 text-main-text border border-brand-green rounded focus:outline-none focus:ring-2 focus:ring-brand-orange"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  disabled={
                    isSubmitting ||
                    isOverCapacity ||
                    isDateBlocked ||
                    isInvalidCasalGuests
                  }
                  className="bg-brand-orange text-white font-bold font-heading py-3 px-6 rounded hover:bg-opacity-90 transition-all duration-300 w-full disabled:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {buttonMessage}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
