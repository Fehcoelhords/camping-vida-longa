import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaWhatsapp } from "react-icons/fa";

function ServiceModal({ show, onClose, serviceData }) {
  if (!serviceData) return null;

  const handleReserveClick = () => {
    onClose();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {show && (
        // --- MUDANÇA NO OVERLAY ---
        // Adicionamos overflow-y-auto aqui e mudamos para items-start
        // Isso fará a PÁGINA rolar se o modal for muito grande, em vez de o modal rolar internamente
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-80 z-40 flex justify-center items-start overflow-y-auto p-4 py-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* --- MUDANÇA NO CONTEÚDO DO MODAL --- */}
          {/* Removemos max-h-[90vh] e a estrutura flex-col interna para que ele possa crescer */}
          <motion.div
            className="relative z-50 bg-dark-bg text-main-text rounded-lg shadow-2xl w-full max-w-3xl p-6 md:p-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-3xl font-heading text-brand-orange">
                {serviceData.title}
              </h2>
              <button
                onClick={onClose}
                className="text-secondary-text hover:text-main-text text-2xl"
              >
                <FaTimes />
              </button>
            </div>

            <div className="space-y-6">
              <p className="font-sans text-secondary-text leading-relaxed whitespace-pre-wrap">
                {serviceData.description}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {serviceData.images.map((image, index) => (
                  <div
                    key={index}
                    className="overflow-hidden rounded-md aspect-w-1 aspect-h-1"
                  >
                    <img
                      src={image}
                      alt={`${serviceData.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 mt-6 border-t border-brand-green/20 flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleReserveClick}
                className="inline-flex items-center justify-center bg-brand-orange text-white font-bold font-heading py-3 px-6 rounded hover:bg-opacity-90 transition-all duration-300 w-full"
              >
                Faça sua Reserva
              </button>

              <a
                href={`https://wa.me/5511947367682?text=Olá! Gostaria de tirar uma dúvida sobre o serviço de ${serviceData.title}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-green-500 text-white font-bold font-heading py-3 px-6 rounded hover:bg-green-600 transition-all duration-300 w-full"
              >
                <FaWhatsapp className="mr-3 text-xl" />
                Tirar Dúvidas
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ServiceModal;
