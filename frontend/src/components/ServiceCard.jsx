import React from "react";
import { motion } from "framer-motion";

// O cartão recebe a imagem, o título e uma função para o clique como props
function ServiceCard({ image, title, onClick }) {
  const cardVariants = {
    offscreen: {
      opacity: 0,
      y: 100,
    },
    onscreen: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
      },
    },
  };

  return (
    <motion.div
      className="relative h-96 w-full rounded-2xl shadow-lg overflow-hidden cursor-pointer group"
      onClick={onClick}
      variants={cardVariants}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ y: -10 }} // Efeito de elevação ao passar o mouse
    >
      {/* Imagem de Fundo com efeito de zoom no hover */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-in-out group-hover:scale-110"
        style={{ backgroundImage: `url(${image})` }}
      />

      {/* Gradiente escuro na base para garantir a legibilidade do texto */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

      {/* Título do Serviço */}
      <div className="relative h-full flex items-end p-6">
        <h3 className="text-3xl font-heading font-bold text-white">{title}</h3>
      </div>
    </motion.div>
  );
}

export default ServiceCard;
