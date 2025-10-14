import React from "react";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

function WhatsAppButton() {
  const phoneNumber = "5511947367682";

  // --- MENSAGEM ATUALIZADA AQUI ---
  const message =
    "Olá! Vim pelo site do Camping Vida Longa e gostaria de tirar algumas dúvidas sobre as reservas e os serviços. Poderia me ajudar?";

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg z-30 flex items-center justify-center"
      aria-label="Fale conosco no WhatsApp"
      initial={{ scale: 0, y: 100 }}
      animate={{ scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 15, delay: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <FaWhatsapp className="text-3xl" />
    </motion.a>
  );
}

export default WhatsAppButton;
