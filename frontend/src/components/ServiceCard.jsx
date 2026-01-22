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
      className="relative h-96 w-full rounded-2xl overflow-hidden cursor-pointer group shadow-xl"
      onClick={onClick}
      variants={cardVariants}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.3 }}
      whileHover="hover" // Trigger do estado de hover
    >
      {/* Container de Imagem com Zoom Suave */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover"
          variants={{
            hover: { scale: 1.1 },
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>

      {/* Overlay Gradiente Base - Sempre visível para contraste */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />

      {/* Overlay de Cor no Hover - Efeito Flash Suave */}
      <motion.div
        className="absolute inset-0 bg-brand-orange/20 mix-blend-overlay"
        variants={{
          hover: { opacity: 1 },
        }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Conteúdo do Card */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end items-start z-10">
        {/* Linha Decorativa Animada */}
        <motion.div
          className="h-1 bg-brand-orange w-12 mb-4 rounded-full"
          variants={{
            hover: { width: 64, backgroundColor: "#FF7A00" }, // Expande a linha
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Título com Efeito de Elevação */}
        <motion.h3
          className="text-3xl font-heading font-bold text-white mb-2 shadow-black drop-shadow-lg"
          variants={{
            hover: { y: -5 },
          }}
          transition={{ duration: 0.3 }}
        >
          {title}
        </motion.h3>

        {/* Texto "Ver Detalhes" que aparece no Hover */}
        <motion.div
          className="overflow-hidden h-0"
          variants={{
            hover: { height: "auto", opacity: 1, marginTop: 8 },
          }}
          initial={{ height: 0, opacity: 0, marginTop: 0 }}
        >
          <span className="text-white/90 text-sm font-bold uppercase tracking-widest border-b border-brand-orange pb-1">
            Ver Detalhes &rarr;
          </span>
        </motion.div>
      </div>

      {/* Borda Brilhante no Hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl border-2 border-brand-orange/0 pointer-events-none"
        variants={{
          hover: { borderColor: "rgba(255, 122, 0, 0.5)" },
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

export default ServiceCard;
