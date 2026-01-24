import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { FaCalendarAlt, FaUserFriends } from "react-icons/fa";
import BookingModal from "./BookingModal";

import "react-datepicker/dist/react-datepicker.css";
import "./BookingForm.css";

function BookingForm() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(
    new Date(new Date().setDate(new Date().getDate() + 1))
  ); // Adicionando um valor padrão para endDate
  const [guests, setGuests] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleOpenModal = (event) => {
    event.preventDefault();
    if (!startDate || !endDate) {
      alert("Por favor, selecione as datas de chegada e partida.");
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <>
      <form
        className="bg-dark-bg/95 backdrop-blur-sm p-5 md:p-8 rounded-2xl shadow-2xl border-t-4 border-brand-orange w-full max-w-5xl mx-auto relative"
        onSubmit={handleOpenModal}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 items-end">
          {/* Campo Chegada */}
          <div className="flex flex-col group">
            <label className="text-secondary-text mb-2 text-xs font-bold uppercase tracking-widest pl-1">
              Chegada
            </label>
            <div className="relative transition-all duration-300 group-hover:transform group-hover:-translate-y-1">
              <FaCalendarAlt className="absolute top-1/2 left-4 -translate-y-1/2 text-brand-orange text-lg z-10" />
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                minDate={new Date()}
                className="w-full bg-brand-green/20 hover:bg-brand-green/30 transition-colors pl-12 pr-4 py-3 text-main-text border border-brand-green/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-brand-orange placeholder-gray-400 font-medium cursor-pointer"
                dateFormat="dd/MM/yyyy"
                required
                inputMode="none"
                autoComplete="off"
                onKeyDown={(e) => e.preventDefault()}
              />
            </div>
          </div>

          {/* Campo Partida */}
          <div className="flex flex-col group">
            <label className="text-secondary-text mb-2 text-xs font-bold uppercase tracking-widest pl-1">
              Partida
            </label>
            <div className="relative transition-all duration-300 group-hover:transform group-hover:-translate-y-1">
              <FaCalendarAlt className="absolute top-1/2 left-4 -translate-y-1/2 text-brand-orange text-lg z-10" />
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                className="w-full bg-brand-green/20 hover:bg-brand-green/30 transition-colors pl-12 pr-4 py-3 text-main-text border border-brand-green/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-brand-orange placeholder-gray-400 font-medium cursor-pointer"
                dateFormat="dd/MM/yyyy"
                placeholderText="Selecione a data"
                required
                inputMode="none"
                autoComplete="off"
                onKeyDown={(e) => e.preventDefault()}
              />
            </div>
          </div>

          {/* Campo Hóspedes */}
          <div className="flex flex-col group">
            <label className="text-secondary-text mb-2 text-xs font-bold uppercase tracking-widest pl-1">
              Hóspedes
            </label>
            <div className="relative transition-all duration-300 group-hover:transform group-hover:-translate-y-1">
              <FaUserFriends className="absolute top-1/2 left-4 -translate-y-1/2 text-brand-orange text-lg" />
              <input
                type="number"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                min="1"
                required
                className="w-full bg-brand-green/20 hover:bg-brand-green/30 transition-colors pl-12 pr-4 py-3 text-main-text border border-brand-green/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-brand-orange font-medium"
              />
            </div>
          </div>

          {/* Botão Reservar */}
          <div className="flex flex-col h-full justify-end">
            <button
              type="submit"
              className="w-full bg-brand-orange hover:bg-orange-600 text-white font-heading font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-orange-500/20 transform hover:-translate-y-1 active:translate-y-0 transition-all duration-300 uppercase tracking-wide text-lg border-b-4 border-orange-700 active:border-b-0 active:mt-1"
            >
              Reservar
            </button>
          </div>
        </div>
      </form>

      {/* --- MUDANÇA IMPORTANTE AQUI --- */}
      {/* Agora passamos os dados da reserva para o modal através da prop 'bookingDetails' */}
      <BookingModal
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        bookingDetails={{ startDate, endDate, guests }}
      />
    </>
  );
}

export default BookingForm;
