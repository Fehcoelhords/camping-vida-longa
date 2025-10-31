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
import { pricingTiers } from "../config"; // mantenha esse import apontando pro seu config

export default function BookingModal({ show, onClose, bookingDetails }) {
  // contato
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // reserva
  const [bookingType, setBookingType] = useState(
    pricingTiers && pricingTiers.length > 0 ? pricingTiers[0].id : null
  );
  const [totalPrice, setTotalPrice] = useState(0);
  const [isOverCapacity, setIsOverCapacity] = useState(false);
  const [isDateBlocked, setIsDateBlocked] = useState(false);

  // submit / UX stages
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStageIndex, setSubmitStageIndex] = useState(-1); // -1 = não iniciado
  const [submitStageMessage, setSubmitStageMessage] = useState("");

  const timeoutsRef = useRef([]);
  const abortControllerRef = useRef(null);

  // mensagens de estágio (você pode ajustar textos / tempos)
  const STAGES = [
    "Carregando...",
    "Verificando disponibilidade...",
    "Gerando token de pagamento...",
    "Enviando pré-reserva...",
  ];
  const STAGE_STEP_MS = 900; // tempo entre estágios se a API demorar

  // helper: checa overlap de datas
  const datesOverlap = (start1, end1, start2, end2) => {
    const s1 = new Date(start1);
    const e1 = new Date(end1);
    const s2 = new Date(start2);
    const e2 = new Date(end2);
    return s1 <= e2 && e1 >= s2;
  };

  // recalcula preço / validações sempre que variáveis mudarem
  useEffect(() => {
    if (!show || !bookingDetails) return;

    const start = bookingDetails.startDate;
    const end = bookingDetails.endDate;
    if (!start || !end) {
      setTotalPrice(0);
      setIsOverCapacity(false);
      setIsDateBlocked(false);
      return;
    }

    // calcula noites (differenceInDays espera Date ou ISO)
    let nights = differenceInDays(new Date(end), new Date(start));
    if (nights <= 0) nights = 1;

    const guests =
      bookingDetails.guests && bookingDetails.guests > 0
        ? bookingDetails.guests
        : 1;
    const selectedTier = pricingTiers.find((t) => t.id === bookingType);

    if (selectedTier) {
      let calculatedPrice = 0;
      if (selectedTier.type === "fixed" || selectedTier.type === "fixo") {
        // suporte tanto 'fixed' quanto 'fixo' caso seu config esteja em PT
        calculatedPrice = nights * Number(selectedTier.price || 0);
      } else if (
        selectedTier.type === "per_person" ||
        selectedTier.type === "por_pessoa"
      ) {
        calculatedPrice = nights * guests * Number(selectedTier.price || 0);
      } else {
        // fallback
        calculatedPrice = nights * Number(selectedTier.price || 0);
      }
      setTotalPrice(calculatedPrice);

      // lotação
      setIsOverCapacity(
        !!selectedTier.maxGuests && guests > selectedTier.maxGuests
      );

      // blackout / blocked dates
      let blocked = false;
      if (Array.isArray(selectedTier.blackoutDates)) {
        const userStart = new Date(start);
        const userEnd = new Date(end);
        for (const blackout of selectedTier.blackoutDates) {
          // espera { start: '2025-12-25', end: '2026-01-05' } (ISO strings)
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
    }
  }, [show, bookingDetails, bookingType]);

  // limpa timers/abortController quando fechar ou desmontar
  useEffect(() => {
    if (!show) {
      clearAllTimers();
      abortControllerRef.current?.abort?.();
      setIsSubmitting(false);
      setSubmitStageIndex(-1);
      setSubmitStageMessage("");
    }
    return () => {
      clearAllTimers();
      abortControllerRef.current?.abort?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  function clearAllTimers() {
    (timeoutsRef.current || []).forEach((t) => clearTimeout(t));
    timeoutsRef.current = [];
  }

  // inicia animação de estágios (progride enquanto request não terminar)
  function startStageProgress() {
    clearAllTimers();
    setSubmitStageIndex(0);
    setSubmitStageMessage(STAGES[0]);

    for (let i = 1; i < STAGES.length; i++) {
      const t = setTimeout(() => {
        setSubmitStageIndex(i);
        setSubmitStageMessage(STAGES[i]);
      }, i * STAGE_STEP_MS);
      timeoutsRef.current.push(t);
    }
  }

  function stopStageProgressAndFinish(finalMessage = "") {
    clearAllTimers();
    setSubmitStageIndex(STAGES.length - 1);
    setSubmitStageMessage(finalMessage || "Concluído");
    // limpa mensagem após um tempo
    const t = setTimeout(() => {
      setSubmitStageIndex(-1);
      setSubmitStageMessage("");
    }, 1400);
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
    if (!name || !email || !phone) {
      toast.error("Por favor, preencha seus dados de contato.");
      return;
    }
    if (
      !bookingDetails ||
      !bookingDetails.startDate ||
      !bookingDetails.endDate
    ) {
      toast.error("Datas de reserva inválidas.");
      return;
    }

    setIsSubmitting(true);
    startStageProgress();

    // prepara payload
    const payload = {
      ...bookingDetails,
      name,
      email,
      phone,
      bookingType,
      totalPrice,
    };

    // cria AbortController para cancelar se necessário
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    try {
      // Simultaneamente teremos a progressão UI; se a API responder rápido, paramos a progressão
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const response = await axios.post(`${apiUrl}/api/bookings`, payload, {
        signal,
        // se sua versão do axios não suportar signal, use cancelToken (versões antigas)
        // cancelToken: new axios.CancelToken((c) => { abortControllerRef.current.cancel = c; }),
      });

      // resposta OK — atualiza UI imediatamente
      stopStageProgressAndFinish("Pré-reserva enviada!");
      toast.success(
        "Pré-reserva realizada com sucesso! Verifique seu e-mail para instruções de pagamento."
      );
      onClose();
    } catch (err) {
      if (axios.isCancel && axios.isCancel(err)) {
        toast.error("Solicitação cancelada.");
      } else if (err?.name === "CanceledError" || err?.message === "canceled") {
        toast.error("Solicitação cancelada.");
      } else {
        console.error("Erro ao criar reserva:", err);
        toast.error("Houve um erro ao processar sua reserva. Tente novamente.");
      }
      // mostra mensagem final de erro no estágio
      stopStageProgressAndFinish("Falha ao enviar");
    } finally {
      setIsSubmitting(false);
      // limpa controller
      if (abortControllerRef.current) {
        abortControllerRef.current = null;
      }
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
                    R${" "}
                    {Number(totalPrice || 0)
                      .toFixed(2)
                      .replace(".", ",")}
                  </strong>
                </span>
              </div>
            </div>

            {/* seleção de tipo */}
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
                      {tier.type === "fixed" || tier.type === "fixo"
                        ? `R$ ${Number(tier.price || 0)
                            .toFixed(2)
                            .replace(".", ",")} /dia`
                        : `R$ ${Number(tier.price || 0)
                            .toFixed(2)
                            .replace(".", ",")} / pessoa por dia`}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* warnings */}
            <AnimatePresence>
              {isOverCapacity && (
                <motion.div
                  className="bg-red-500/20 border border-red-500 text-red-300 text-sm p-4 rounded-lg my-6"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <p className="font-bold">Lotação excedida para o Hostel!</p>
                  <p>
                    A capacidade máxima para esta estadia é de{" "}
                    {pricingTiers.find((t) => t.id === bookingType)
                      ?.maxGuests || "X"}{" "}
                    pessoas. Para grupos maiores, experimente uma opção
                    diferente.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {isDateBlocked && (
                <motion.div
                  className="bg-red-500/20 border border-red-500 text-red-300 text-sm p-4 rounded-lg my-6"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <p className="font-bold">Datas indisponíveis!</p>
                  <p>
                    O período selecionado está bloqueado para o tipo de estadia
                    escolhido. Escolha outras datas ou um tipo diferente.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* formulário */}
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
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

              {/* UX staged progress (visível quando isSubmitting) */}
              <div className="mt-6">
                <AnimatePresence>
                  {isSubmitting && submitStageIndex >= 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="mb-4"
                    >
                      <div className="text-sm text-secondary-text mb-2">
                        Status
                      </div>
                      <div className="w-full bg-gray-700 rounded overflow-hidden h-9 flex items-center px-3">
                        <div className="flex-1">
                          <div className="text-xs uppercase text-secondary-text/70">
                            {submitStageMessage}
                          </div>
                          <div className="w-full bg-gray-800 h-2 rounded mt-2 overflow-hidden">
                            <motion.div
                              className="h-2"
                              initial={{ width: 0 }}
                              animate={{
                                width: `${
                                  ((submitStageIndex + 1) / STAGES.length) * 100
                                }%`,
                              }}
                              transition={{ duration: 0.6 }}
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  disabled={isSubmitting || isOverCapacity || isDateBlocked}
                  className="bg-brand-orange text-white font-bold font-heading py-3 px-6 rounded hover:bg-opacity-90 transition-all duration-300 w-full disabled:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
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
