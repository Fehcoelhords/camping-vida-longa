import React from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import ContactForm from "../components/ContactForm"; // A importação correta

function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-24 md:py-32">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-heading text-brand-orange mb-4">
            Entre em Contato
          </h1>
          <p className="text-lg text-secondary-text">
            Tem alguma dúvida ou sugestão? Preencha o formulário abaixo ou nos
            contate diretamente. Estamos aqui para ajudar!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <ContactForm />
          </div>

          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div>
              <h3 className="text-2xl font-heading text-main-text font-bold mb-4">
                Nossa Localização
              </h3>
              <div className="w-full h-64 rounded-lg overflow-hidden mb-4">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3681.777005479042!2d-44.2259648850388!3d-22.66170568513813!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9c5db5a312457b%3A0x8091a422a55f7b0b!2sPraia%20Longa%2C%20Angra%20dos%20Reis%20-%20RJ!5e0!3m2!1spt-BR!2sbr!4v1679080000000!5m2!1spt-BR!2sbr"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <div className="space-y-3 text-secondary-text">
                <div className="flex items-start">
                  <FaMapMarkerAlt className="text-brand-orange mt-1 mr-3 flex-shrink-0" />
                  <span>
                    Praia da Longa, 01
                    <br />
                    Ilha Grande, Angra dos Reis - RJ
                  </span>
                </div>
                <div className="flex items-center">
                  <FaPhone className="text-brand-orange mr-3" />
                  <span>(11) 94736-7682</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default ContactPage;
