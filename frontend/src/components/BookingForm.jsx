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
        className="bg-dark-bg bg-opacity-80 p-6 rounded-lg shadow-2xl w-full max-w-4xl mx-auto"
        onSubmit={handleOpenModal}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <div className="flex flex-col">
            <label className="text-secondary-text mb-1 text-sm">Chegada</label>
            <div className="relative">
              <FaCalendarAlt className="absolute top-1/2 left-3 -translate-y-1/2 text-secondary-text" />
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                minDate={new Date()}
                className="w-full bg-transparent pl-10 pr-4 py-2 text-main-text border border-brand-green rounded focus:outline-none focus:ring-2 focus:ring-brand-orange"
                dateFormat="dd/MM/yyyy"
                required
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-secondary-text mb-1 text-sm">Partida</label>
            <div className="relative">
              <FaCalendarAlt className="absolute top-1/2 left-3 -translate-y-1/2 text-secondary-text" />
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                className="w-full bg-transparent pl-10 pr-4 py-2 text-main-text border border-brand-green rounded focus:outline-none focus:ring-2 focus:ring-brand-orange"
                dateFormat="dd/MM/yyyy"
                placeholderText="Selecione a data"
                required
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-secondary-text mb-1 text-sm">Hóspedes</label>
            <div className="relative">
              <FaUserFriends className="absolute top-1/2 left-3 -translate-y-1/2 text-secondary-text" />
              <input
                type="number"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                min="1"
                required
                className="w-full bg-transparent pl-10 pr-4 py-2 text-main-text border border-brand-green rounded focus:outline-none focus:ring-2 focus:ring-brand-orange"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <button
              type="submit"
              className="bg-brand-orange text-white font-bold font-heading py-2 px-6 rounded hover:bg-opacity-90 transition-all duration-300 w-full h-full"
            >
              RESERVAR
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
