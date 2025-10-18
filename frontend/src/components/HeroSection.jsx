import React from "react";
import { motion } from "framer-motion";
import backgroundImage from "../assets/hero-background.jpg";
import BookingForm from "./BookingForm"; // Importe o formulário

function HeroSection() {
  return (
    <section
      // Mudamos o flex para posicionar o conteúdo no centro E o formulário embaixo
      className="relative h-screen flex flex-col justify-center items-center text-center text-white"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>

      {/* Conteúdo Centralizado */}
      <div className="relative z-10 p-5 flex-grow flex flex-col justify-center items-center">
        <motion.h2
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-extrabold mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Viva a Aventura.
        </motion.h2>
        <motion.p
          className="text-lg sm:text-xl md:text-2xl font-sans mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Refúgio perfeito entre o verde da mata e o azul do mar.
        </motion.p>
      </div>

      {/* Formulário de Reserva Posicionado na Base */}
      <div className="relative z-10 w-full px-4 md:px-8 pb-8">
        <BookingForm />
      </div>
    </section>
  );
}

export default HeroSection;
