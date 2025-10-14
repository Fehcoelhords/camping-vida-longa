import React, { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FaUser, FaEnvelope, FaPen } from "react-icons/fa";

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    console.log({ name, email, message });

    setTimeout(() => {
      toast.success(
        "Mensagem enviada com sucesso! Entraremos em contato em breve."
      );
      setName("");
      setEmail("");
      setMessage("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="bg-brand-green/20 p-8 rounded-2xl shadow-lg w-full space-y-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
    >
      <div className="flex flex-col">
        <label className="text-secondary-text mb-1 text-sm">Nome</label>
        <div className="relative">
          <FaUser className="absolute top-1/2 left-3 -translate-y-1/2 text-secondary-text" />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Seu nome completo"
            required
            className="w-full bg-dark-bg pl-10 pr-4 py-2 text-main-text border border-brand-green/50 rounded focus:outline-none focus:ring-2 focus:ring-brand-orange"
          />
        </div>
      </div>

      <div className="flex flex-col">
        <label className="text-secondary-text mb-1 text-sm">E-mail</label>
        <div className="relative">
          <FaEnvelope className="absolute top-1/2 left-3 -translate-y-1/2 text-secondary-text" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu.melhor@email.com"
            required
            className="w-full bg-dark-bg pl-10 pr-4 py-2 text-main-text border border-brand-green/50 rounded focus:outline-none focus:ring-2 focus:ring-brand-orange"
          />
        </div>
      </div>

      <div className="flex flex-col">
        <label className="text-secondary-text mb-1 text-sm">Sua Mensagem</label>
        <div className="relative">
          <FaPen className="absolute top-4 left-3 text-secondary-text" />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Como podemos ajudar?"
            required
            rows="5"
            className="w-full bg-dark-bg pl-10 pr-4 py-2 text-main-text border border-brand-green/50 rounded focus:outline-none focus:ring-2 focus:ring-brand-orange"
          ></textarea>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="bg-brand-orange text-white font-bold font-heading py-3 px-8 rounded hover:bg-opacity-90 transition-all duration-300 w-full disabled:bg-gray-500"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
        </button>
      </div>
    </motion.form>
  );
}

// Esta é a linha que estava faltando ou foi corrompida
export default ContactForm;
