import React from "react";
import { motion } from "framer-motion";

function FeatureCard({ icon, title, description, delay }) {
  const cardVariants = {
    offscreen: {
      opacity: 0,
      y: 50,
    },
    onscreen: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.8,
        delay: delay,
      },
    },
  };

  return (
    // --- MUDANÇAS DE ESTILO APLICADAS AQUI ---
    <motion.div
      className="bg-brand-green bg-opacity-20 p-8 rounded-2xl shadow-lg text-center flex flex-col items-center border border-transparent hover:border-brand-orange/50 hover:-translate-y-2 transition-all duration-300"
      variants={cardVariants}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.5 }}
    >
      {/* Ícone agora tem um fundo circular para mais destaque */}
      <div className="bg-dark-bg p-4 rounded-full mb-5 inline-block">
        <div className="text-brand-orange text-4xl">{icon}</div>
      </div>

      {/* Tipografia refinada */}
      <h3 className="text-2xl font-heading font-bold mb-3 text-main-text">
        {title}
      </h3>
      <p className="font-sans text-secondary-text leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}

export default FeatureCard;
